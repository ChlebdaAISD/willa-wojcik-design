import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distPath = path.resolve(__dirname, '../dist/public')
const serverDistPath = path.resolve(__dirname, '../dist/server')

function updateMetaTags(html, meta) {
  let result = html

  // Title
  result = result.replace(/<title>[\s\S]*?<\/title>/, `<title>${meta.title}</title>`)

  // Meta description
  result = result.replace(
    /<meta\s+name="description"\s+content="[\s\S]*?"\s*\/?>/,
    `<meta name="description" content="${meta.description}" />`
  )

  // Canonical — replace existing or inject before </head>
  const canonicalPattern = /<link rel="canonical" href="[\s\S]*?"\s*\/?>/
  if (canonicalPattern.test(result)) {
    result = result.replace(canonicalPattern, `<link rel="canonical" href="${meta.canonical}" />`)
  } else {
    result = result.replace('</head>', `  <link rel="canonical" href="${meta.canonical}" />\n  </head>`)
  }

  // Open Graph (og:image/twitter:image pozostają statyczne — nie ruszamy ich)
  result = result.replace(/<meta\s+property="og:title"\s+content="[\s\S]*?"\s*\/?>/, `<meta property="og:title" content="${meta.title}" />`)
  result = result.replace(/<meta\s+property="og:description"\s+content="[\s\S]*?"\s*\/?>/, `<meta property="og:description" content="${meta.description}" />`)
  result = result.replace(/<meta\s+property="og:url"\s+content="[\s\S]*?"\s*\/?>/, `<meta property="og:url" content="${meta.canonical}" />`)

  // Twitter
  result = result.replace(/<meta\s+name="twitter:title"\s+content="[\s\S]*?"\s*\/?>/, `<meta name="twitter:title" content="${meta.title}" />`)
  result = result.replace(/<meta\s+name="twitter:description"\s+content="[\s\S]*?"\s*\/?>/, `<meta name="twitter:description" content="${meta.description}" />`)

  return result
}

function generateSitemap(routes, domain) {
  const body = routes
    .map((r) => {
      const loc = r === '/' ? `${domain}/` : `${domain}${r}`
      const priority = r === '/' ? '1.0' : '0.8'
      return `  <url>\n    <loc>${loc}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>`
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

  const template = fs.readFileSync(templatePath, 'utf-8')
  const { render, getRoutes, DOMAIN_URL } = await import(serverEntryPath)
  const routes = getRoutes()

  for (const routePath of routes) {
    console.log(`  Prerendering: ${routePath}`)

    const { html: appHtml, meta } = render(routePath)
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
      fullHtml = fullHtml.replace('</head>', `  <script type="application/ld+json">${breadcrumbSchema}</script>\n  </head>`)
    }

    // Dodatkowy JSON-LD (np. LodgingBusiness) jeśli route go definiuje
    if (meta.additionalSchema) {
      const additionalSchemaStr = JSON.stringify(meta.additionalSchema)
      fullHtml = fullHtml.replace('</head>', `  <script type="application/ld+json">${additionalSchemaStr}</script>\n  </head>`)
    }

    // Wstrzyknięcie wyrenderowanego drzewa React do #root
    fullHtml = fullHtml.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)

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

  generateSitemap(routes, DOMAIN_URL)
  console.log('\nPrerendering complete!')
}

prerender().catch((err) => {
  console.error('Prerender failed:', err)
  process.exit(1)
})
