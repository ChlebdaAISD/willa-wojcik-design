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
  description: 'Kameralny pensjonat w Sromowcach Niżnych, u podnóża Trzech Koron. Trzy apartamenty 35–60 m² dla 4–6 osób i osiem pokoi 21 m² dla 2–3 osób, z balkonem lub tarasem i widokiem na Pieniny.',
  url: DOMAIN,
  telephone: '+48537446036',
  email: 'rezerwacja@willawojcik.pl',
  // Realne zdjęcia obiektu, nie ilustracja. Leżą w public/zdjecia/ pod stałymi
  // nazwami, bo Vite hashuje pliki z src/assets i URL-e by się zmieniały co build.
  image: [
    `${DOMAIN}/zdjecia/willa-zmierzch.jpg`,
    `${DOMAIN}/zdjecia/willa-front.jpg`,
    `${DOMAIN}/zdjecia/taras-trzy-korony.jpg`,
  ],
  priceRange: '250–500 zł',
  numberOfRooms: 11,
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
    title: 'Willa Wójcik — apartamenty i pokoje, Sromowce Niżne',
    description: 'Trzy apartamenty i osiem pokoi u podnóża Trzech Koron, w Sromowcach Niżnych. Pokoje od 250 zł, apartamenty od 450 zł. Ocena 4,9 w Google. Bez prowizji.',
    canonical: `${DOMAIN}/`,
    breadcrumb: [],
    additionalSchema: lodgingSchema,
  },
  '/apartamenty': {
    title: 'Apartamenty Sromowce Niżne z balkonem na Trzy Korony',
    description: 'Trzy apartamenty w Sromowcach Niżnych: 38 i 35 m² dla 4 osób po 450 zł, wolnostojący 60 m² dla 6 osób od 500 zł. Aneks kuchenny, balkon na Trzy Korony.',
    canonical: `${DOMAIN}/apartamenty`,
    breadcrumb: [crumbHome, { name: 'Apartamenty', url: `${DOMAIN}/apartamenty` }],
  },
  '/pokoje': {
    title: 'Pokoje Sromowce Niżne, 21 m² od 250 zł — Willa Wójcik',
    description: 'Osiem pokoi 21 m² w Sromowcach Niżnych: łóżko 160 × 200, własna łazienka, balkon albo taras. 250 zł za dobę dla dwóch osób, 280 zł dla trzech.',
    canonical: `${DOMAIN}/pokoje`,
    breadcrumb: [crumbHome, { name: 'Pokoje', url: `${DOMAIN}/pokoje` }],
  },
  '/galeria': {
    title: 'Galeria zdjęć — Willa Wójcik, Sromowce Niżne, Pieniny',
    description: 'Zdjęcia trzech apartamentów, ośmiu pokoi i ogrodu Willi Wójcik w Sromowcach Niżnych: widok na Trzy Korony, jasne wnętrza, altana z grillem i plac zabaw.',
    canonical: `${DOMAIN}/galeria`,
    breadcrumb: [crumbHome, { name: 'Galeria', url: `${DOMAIN}/galeria` }],
  },
  '/okolica': {
    title: 'Okolica i atrakcje — Sromowce Niżne, Pieniny | Willa Wójcik',
    description: 'Co zobaczyć w Sromowcach Niżnych i Pieninach: spływ Dunajcem, Trzy Korony, kładka do Czerwonego Klasztoru, zamek Niedzica. Odległości od obiektu i ceny 2026.',
    canonical: `${DOMAIN}/okolica`,
    breadcrumb: [crumbHome, { name: 'Okolica', url: `${DOMAIN}/okolica` }],
  },
  '/okolica/splyw-dunajcem': {
    title: 'Spływ Dunajcem ze Sromowiec — trasy i ceny | Willa Wójcik',
    description: 'Spływ Dunajcem tratwą flisacką: trasy, czasy i ceny 2026 od 111 zł. Willa Wójcik stoi w Sromowcach Niżnych, tuż przy przystani.',
    canonical: `${DOMAIN}/okolica/splyw-dunajcem`,
    breadcrumb: [crumbHome, crumbOkolica, { name: 'Spływ Dunajcem', url: `${DOMAIN}/okolica/splyw-dunajcem` }],
  },
  '/okolica/trzy-korony': {
    title: 'Trzy Korony ze Sromowiec — najkrótszy szlak | Willa Wójcik',
    description: 'Najkrótsze wejście na Trzy Korony (982 m) zaczyna się przy tej samej ulicy co Willa Wójcik — ok. 15 min pieszo. Trasa, czas, taras 10/5 zł, dla rodzin.',
    canonical: `${DOMAIN}/okolica/trzy-korony`,
    breadcrumb: [crumbHome, crumbOkolica, { name: 'Trzy Korony', url: `${DOMAIN}/okolica/trzy-korony` }],
  },
  '/okolica/kladka-czerwony-klasztor': {
    title: 'Kładka na Słowację i Czerwony Klasztor | Willa Wójcik',
    description: '250 m od Willi Wójcik do kładki na Dunajcu — pieszo lub rowerem do Czerwonego Klasztoru na Słowacji. Muzeum, Droga Pienińska, wskazówki.',
    canonical: `${DOMAIN}/okolica/kladka-czerwony-klasztor`,
    breadcrumb: [crumbHome, crumbOkolica, { name: 'Kładka i Czerwony Klasztor', url: `${DOMAIN}/okolica/kladka-czerwony-klasztor` }],
  },
  '/kontakt': {
    title: 'Kontakt i rezerwacja — Willa Wójcik, Sromowce Niżne',
    description: 'Rezerwacja bezpośrednia w Willi Wójcik, Sromowce Niżne, bez prowizji pośredników. Telefon +48 537 446 036, formularz zapytania o wolny termin, mapa i dojazd.',
    canonical: `${DOMAIN}/kontakt`,
    breadcrumb: [crumbHome, { name: 'Kontakt', url: `${DOMAIN}/kontakt` }],
    additionalSchema: lodgingSchema,
  },
  '/polityka-prywatnosci': {
    title: 'Polityka prywatności — Willa Wójcik, Sromowce Niżne',
    description: 'Jak Willa Wójcik przetwarza dane osobowe z formularza kontaktowego — administrator, cele, dostawcy (Cloudflare, Resend, Google Maps) oraz Państwa prawa.',
    canonical: `${DOMAIN}/polityka-prywatnosci`,
    breadcrumb: [crumbHome, { name: 'Polityka prywatności', url: `${DOMAIN}/polityka-prywatnosci` }],
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
