import ReactDOMServer from 'react-dom/server'
import App from './App.jsx'

// Kanoniczna domena — trafia do canonical / og:url / sitemap.
const DOMAIN = 'https://www.willawojcik.pl'
export const DOMAIN_URL = DOMAIN

// JSON-LD LodgingBusiness (strona główna). NAP zweryfikowany z Google Business Profile
// + nocowanie.pl (2026-07). aggregateRating = Google 4.9 / 135 opinii (nie review[] —
// self-serving reviews są ignorowane przez Google).
const lodgingSchema = {
  '@context': 'https://schema.org',
  '@type': 'LodgingBusiness',
  '@id': `${DOMAIN}/#lodging`,
  name: 'Willa Wójcik — Apartamenty i Pokoje',
  description: 'Kameralny pensjonat w Sromowcach Niżnych, u podnóża Trzech Koron. Apartamenty 4–6 os. i pokoje 2–3 os. z balkonem, aneksem kuchennym i widokiem na Pieniny.',
  url: DOMAIN,
  telephone: '+48537446036',
  email: 'rezerwacja@willawojcik.pl',
  image: [`${DOMAIN}/opengraph.jpg`],
  priceRange: '210–420 zł',
  numberOfRooms: 10,
  petsAllowed: false,
  smokingAllowed: false,
  checkinTime: '14:00',
  checkoutTime: '10:00',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Sobczańska 9a',
    addressLocality: 'Sromowce Niżne',
    postalCode: '34-443',
    addressRegion: 'małopolskie',
    addressCountry: 'PL',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 49.3965931, longitude: 20.4089415 },
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '135', bestRating: '5', worstRating: '1' },
  sameAs: [
    'https://maps.google.com/?cid=3949048437519423849',
    'https://www.booking.com/hotel/pl/willa-wojcik.html',
    'https://www.nocowanie.pl/noclegi/sromowce_nizne/willa/205669',
  ],
}

const crumbHome = { name: 'Willa Wójcik', url: `${DOMAIN}/` }
const crumbOkolica = { name: 'Okolica', url: `${DOMAIN}/okolica` }

const routesMeta = {
  '/': {
    title: 'Willa Wójcik — Apartamenty i Pokoje · Sromowce Niżne, Pieniny',
    description: 'Kameralny pensjonat w sercu Pienin. Apartamenty i pokoje u podnóża Trzech Koron — Sromowce Niżne. Ocena 4,9 w Google. Rezerwacja bezpośrednia bez prowizji.',
    canonical: `${DOMAIN}/`,
    breadcrumb: [],
    additionalSchema: lodgingSchema,
  },
  '/pokoje-i-apartamenty': {
    title: 'Apartamenty i pokoje — Sromowce Niżne | Willa Wójcik',
    description: 'Apartamenty 4–6 os. i pokoje 2–3 os. w Sromowcach Niżnych, u podnóża Trzech Koron. Balkon z widokiem, aneks kuchenny, parking. Rezerwacja bez prowizji.',
    canonical: `${DOMAIN}/pokoje-i-apartamenty`,
    breadcrumb: [crumbHome, { name: 'Pokoje i apartamenty', url: `${DOMAIN}/pokoje-i-apartamenty` }],
  },
  '/galeria': {
    title: 'Galeria zdjęć — Willa Wójcik, Sromowce Niżne',
    description: 'Zdjęcia apartamentów, pokoi i okolicy Willi Wójcik w Sromowcach Niżnych — widok na Trzy Korony, jasne wnętrza, ogród i wspólny taras.',
    canonical: `${DOMAIN}/galeria`,
    breadcrumb: [crumbHome, { name: 'Galeria', url: `${DOMAIN}/galeria` }],
  },
  '/okolica': {
    title: 'Okolica i atrakcje — Sromowce Niżne, Pieniny | Willa Wójcik',
    description: 'Co zobaczyć w Sromowcach Niżnych i Pieninach: spływ Dunajcem, Trzy Korony, kładka do Czerwonego Klasztoru, zamek Niedzica, narty. Odległości od obiektu i ceny 2026.',
    canonical: `${DOMAIN}/okolica`,
    breadcrumb: [crumbHome, { name: 'Okolica', url: `${DOMAIN}/okolica` }],
  },
  '/okolica/splyw-dunajcem': {
    title: 'Spływ Dunajcem ze Sromowiec — trasy i ceny 2026 | Willa Wójcik',
    description: 'Spływ Dunajcem tratwą flisacką: trasy, czasy i ceny 2026 (od 111 zł), przystanie oraz wskazówki dla rodzin. Willa Wójcik leży w Sromowcach Niżnych, przy przystani.',
    canonical: `${DOMAIN}/okolica/splyw-dunajcem`,
    breadcrumb: [crumbHome, crumbOkolica, { name: 'Spływ Dunajcem', url: `${DOMAIN}/okolica/splyw-dunajcem` }],
  },
  '/okolica/trzy-korony': {
    title: 'Trzy Korony ze Sromowiec Niżnych — najkrótszy szlak | Willa Wójcik',
    description: 'Najkrótsze wejście na Trzy Korony (982 m) zaczyna się przy tej samej ulicy co Willa Wójcik — ok. 15 min pieszo. Trasa, czas, taras 10/5 zł, dla rodzin.',
    canonical: `${DOMAIN}/okolica/trzy-korony`,
    breadcrumb: [crumbHome, crumbOkolica, { name: 'Trzy Korony', url: `${DOMAIN}/okolica/trzy-korony` }],
  },
  '/okolica/kladka-czerwony-klasztor': {
    title: 'Kładka i Czerwony Klasztor — spacer na Słowację | Willa Wójcik',
    description: '250 m od Willi Wójcik do kładki na Dunajcu — pieszo lub rowerem do Czerwonego Klasztoru na Słowacji. Muzeum, Droga Pienińska, praktyczne wskazówki.',
    canonical: `${DOMAIN}/okolica/kladka-czerwony-klasztor`,
    breadcrumb: [crumbHome, crumbOkolica, { name: 'Kładka i Czerwony Klasztor', url: `${DOMAIN}/okolica/kladka-czerwony-klasztor` }],
  },
  '/kontakt': {
    title: 'Kontakt i rezerwacja — Willa Wójcik, Sromowce Niżne',
    description: 'Zapytaj o wolny termin w Willi Wójcik, Sromowce Niżne. Telefon +48 537 446 036, formularz, mapa i dojazd. Rezerwacja bezpośrednia bez prowizji.',
    canonical: `${DOMAIN}/kontakt`,
    breadcrumb: [crumbHome, { name: 'Kontakt', url: `${DOMAIN}/kontakt` }],
  },
}

export function getRoutes() {
  return Object.keys(routesMeta)
}

export function getRouteMeta(path) {
  return routesMeta[path] || routesMeta['/']
}

export function render(path) {
  const meta = routesMeta[path] || routesMeta['/']
  const html = ReactDOMServer.renderToString(<App ssrPath={path} />)
  return { html, meta }
}
