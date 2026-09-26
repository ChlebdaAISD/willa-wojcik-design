import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distPath = path.resolve(__dirname, '../dist/public')
const serverDistPath = path.resolve(__dirname, '../dist/server')

function updateMetaTags(html, meta) {
  let result = html

  // Title
  result = result.replace(/<title>[\s\S]*?<\/title>/, () => `<title>${meta.title}</title>`)

  // Meta description
  result = result.replace(
    /<meta\s+name="description"\s+content="[\s\S]*?"\s*\/?>/,
    () => `<meta name="description" content="${meta.description}" />`
  )

  // Canonical — replace existing or inject before </head>
  const canonicalPattern = /<link rel="canonical" href="[\s\S]*?"\s*\/?>/
  if (canonicalPattern.test(result)) {
    result = result.replace(canonicalPattern, () => `<link rel="canonical" href="${meta.canonical}" />`)
  } else {
    result = result.replace('</head>', () => `  <link rel="canonical" href="${meta.canonical}" />\n  </head>`)
  }

  // Robots: strona błędu nie trafia do indeksu
  if (meta.notFound) {
    result = result.replace(/<meta\s+name="robots"\s+content="[\s\S]*?"\s*\/?>/, () => '<meta name="robots" content="noindex, follow" />')
  }

  // Open Graph — obraz per podstrona (public/og/), domyślny dla pozostałych
  result = result.replace(/<meta\s+property="og:image"\s+content="[\s\S]*?"\s*\/?>/, () => `<meta property="og:image" content="${meta.ogImage}" />`)
  result = result.replace(/<meta\s+name="twitter:image"\s+content="[\s\S]*?"\s*\/?>/, () => `<meta name="twitter:image" content="${meta.ogImage}" />`)
  result = result.replace(/<meta\s+property="og:title"\s+content="[\s\S]*?"\s*\/?>/, () => `<meta property="og:title" content="${meta.title}" />`)
  result = result.replace(/<meta\s+property="og:description"\s+content="[\s\S]*?"\s*\/?>/, () => `<meta property="og:description" content="${meta.description}" />`)
  result = result.replace(/<meta\s+property="og:url"\s+content="[\s\S]*?"\s*\/?>/, () => `<meta property="og:url" content="${meta.canonical}" />`)

  // Twitter
  result = result.replace(/<meta\s+name="twitter:title"\s+content="[\s\S]*?"\s*\/?>/, () => `<meta name="twitter:title" content="${meta.title}" />`)
  result = result.replace(/<meta\s+name="twitter:description"\s+content="[\s\S]*?"\s*\/?>/, () => `<meta name="twitter:description" content="${meta.description}" />`)

  return result
}

// Google ignoruje changefreq i priority, a lastmod wykorzystuje — stąd tylko loc + lastmod.
function generateSitemap(entries, domain) {
  const body = entries
    .map(({ route, lastmod }) => {
      const loc = route === '/' ? `${domain}/` : `${domain}${route}`
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`
    })
    .join('\n')
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`
  fs.writeFileSync(path.join(distPath, 'sitemap.xml'), xml)
  console.log('    → dist/public/sitemap.xml')
}

async function prerender() {
  console.log('Starting SSR prerendering...')

  const templatePath = path.join(distPath, 'index.html')
  const serverEntryPath = path.join(serverDistPath, 'entry-server.js')

  if (!fs.existsSync(templatePath)) {
    console.error('Template not found at', templatePath, '— run "npm run build:client" first.')
    process.exit(1)
  }
  if (!fs.existsSync(serverEntryPath)) {
    console.error('Server entry not found at', serverEntryPath, '— run "npm run build:ssr" first.')
    process.exit(1)
  }

  let template = fs.readFileSync(templatePath, 'utf-8')

  // Preload dwóch najważniejszych czcionek (tekst i nagłówki, podzbiór latin).
  // Pliki mają odcisk w nazwie, więc szukamy ich w dist/public/assets.
  const assets = fs.readdirSync(path.join(distPath, 'assets'))
  // Dokładnie 8 znaków odcisku po nazwie — inaczej „latin-" złapałby też „latin-ext-…".
  const fontPreloads = ['manrope-normal-latin', 'cormorant-garamond-normal-latin']
    .map((name) => assets.find((f) => new RegExp(`^${name}-[\\w-]{8}\\.woff2$`).test(f)))
    .filter(Boolean)
    .map((f) => `  <link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin>`)
    .join('\n')
  if (fontPreloads.split('\n').length !== 2) console.warn('  ! Nie znaleziono obu czcionek do preloadu — sprawdź nazwy plików w dist/public/assets')
  template = template.replace('</head>', () => `${fontPreloads}\n  </head>`)
  const { render, getRoutes, DOMAIN_URL, DEFAULT_UPDATED, DEFAULT_OG_IMAGE } = await import(serverEntryPath)
  const routes = getRoutes()
  const sitemapEntries = []

  for (const routePath of routes) {
    console.log(`  Prerendering: ${routePath}`)

    const { html: appHtml, meta: routeMeta } = render(routePath)
    const meta = { ogImage: DEFAULT_OG_IMAGE, ...routeMeta }
    let fullHtml = updateMetaTags(template, meta)

    // BreadcrumbList JSON-LD dla podstron (root ma pustą listę → pomijamy)
    if (meta.breadcrumb && meta.breadcrumb.length > 0) {
      const breadcrumbSchema = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: meta.breadcrumb.map((item, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: item.name,
          item: item.url,
        })),
      })
      fullHtml = fullHtml.replace('</head>', () => `  <script type="application/ld+json">${breadcrumbSchema}</script>\n  </head>`)
    }

    // Dodatkowy JSON-LD: jeden obiekt albo lista obiektów (każdy we własnym <script>)
    for (const schema of [].concat(meta.additionalSchema || [])) {
      const schemaStr = JSON.stringify(schema)
      fullHtml = fullHtml.replace('</head>', () => `  <script type="application/ld+json">${schemaStr}</script>\n  </head>`)
    }

    // Wstrzyknięcie wyrenderowanego drzewa React do #root
    fullHtml = fullHtml.replace('<div id="root"></div>', () => `<div id="root">${appHtml}</div>`)

    if (meta.notFound) {
      // Cloudflare (not_found_handling: "404-page") serwuje ten plik ze statusem 404
      fs.writeFileSync(path.join(distPath, '404.html'), fullHtml)
      console.log('    → dist/public/404.html')
      continue
    }
    sitemapEntries.push({ route: routePath, lastmod: meta.updated || DEFAULT_UPDATED })

    if (routePath === '/') {
      fs.writeFileSync(path.join(distPath, 'index.html'), fullHtml)
      console.log('    → dist/public/index.html')
    } else {
      const dirName = routePath.replace(/^\/|\/$/g, '')
      const dirPath = path.join(distPath, dirName)
      fs.mkdirSync(dirPath, { recursive: true })
      fs.writeFileSync(path.join(dirPath, 'index.html'), fullHtml)
      console.log(`    → dist/public/${dirName}/index.html`)
    }
  }

  generateSitemap(sitemapEntries, DOMAIN_URL)

  // Adres ze slashem na końcu → 301 na kanoniczny bez slasha. Bez tego Cloudflare
  // (html_handling: drop-trailing-slash) odpowiada 307, czyli przekierowaniem tymczasowym.
  const redirects = sitemapEntries
    .filter(({ route }) => route !== '/')
    .map(({ route }) => `${route}/ ${route} 301`)
    .join('\n')
  fs.writeFileSync(path.join(distPath, '_redirects'), redirects + '\n')
  console.log('    → dist/public/_redirects')
  console.log('\nPrerendering complete!')
}

prerender().catch((err) => {
  console.error('Prerender failed:', err)
  process.exit(1)
})
