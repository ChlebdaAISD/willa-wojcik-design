import ReactDOMServer from 'react-dom/server'
import App from './App.jsx'

// Kanoniczna domena — trafia do canonical / og:url / sitemap.
// TODO(user): potwierdzić docelową domenę (www vs apex) przed publikacją.
const DOMAIN = 'https://www.willawojcik.pl'

// Meta per-route. Na razie jedna strona (landing). Kolejne podstrony
// dokładamy tutaj — prerender iteruje po getRoutes() i generuje z tego sitemap.
const routesMeta = {
  '/': {
    title: 'Willa Wójcik — Apartamenty i Pokoje · Sromowce Niżne, Pieniny',
    description:
      'Kameralny pensjonat w sercu Pienin. Apartamenty i pokoje u podnóża Trzech Koron — Sromowce Niżne.',
    canonical: `${DOMAIN}/`,
    breadcrumb: [],
    // TODO(user): dodać JSON-LD LodgingBusiness po weryfikacji NAP + oceny z klientem.
    additionalSchema: null,
  },
}

export const DOMAIN_URL = DOMAIN

export function getRoutes() {
  return Object.keys(routesMeta)
}

export function getRouteMeta(path) {
  return routesMeta[path] || routesMeta['/']
}

export function render(path) {
  const meta = routesMeta[path] || routesMeta['/']
  const html = ReactDOMServer.renderToString(<App />)
  return { html, meta }
}
