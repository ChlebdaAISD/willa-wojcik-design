import ReactDOMServer from 'react-dom/server'
import App from './App.jsx'

// Kanoniczna domena — trafia do canonical / og:url / sitemap.
const DOMAIN = 'https://willawojcik.pl'
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
  email: 'willawojcik1@gmail.com',
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
    'https://www.instagram.com/willawojcik/',
  ],
  logo: `${DOMAIN}/logo.png`,
  hasMap: 'https://maps.google.com/?cid=3949048437519423849',
  amenityFeature: [
    'Bezpłatne WiFi', 'Bezpłatny parking na terenie obiektu', 'Altana z grillem',
    'Plac zabaw dla dzieci', 'Wspólna kuchnia 45 m²', 'Balkony i tarasy',
    'Monitoring', 'Pościel i ręczniki',
  ].map((name) => ({ '@type': 'LocationFeatureSpecification', name, value: true })),
}

// Jednostki noclegowe (/apartamenty, /pokoje). Liczby jak w src/data/content.js
// (dane od właścicielki z 14.09.2026) — przy zmianie ceny lub metrażu poprawić oba miejsca.
const lodgingRef = { '@id': `${DOMAIN}/#lodging` }
function unit({ id, type, name, description, m2, maxGuests, rooms, price, page }) {
  return {
    '@type': type,
    '@id': `${DOMAIN}${page}#${id}`,
    name,
    description,
    floorSize: { '@type': 'QuantitativeValue', value: m2, unitCode: 'MTK' },
    occupancy: { '@type': 'QuantitativeValue', maxValue: maxGuests },
    numberOfRooms: rooms,
    containedInPlace: lodgingRef,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'PLN',
      priceSpecification: {
        '@type': 'UnitPriceSpecification', price, priceCurrency: 'PLN', unitText: 'doba',
      },
    },
  }
}
const apartmentsSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    unit({ id: 'apartament-1', type: 'Apartment', name: 'Apartament 1', page: '/apartamenty',
      description: 'Sypialnia z łóżkiem małżeńskim, salon z rozkładaną sofą i aneksem kuchennym, duży balkon z widokiem na Trzy Korony.',
      m2: 38, maxGuests: 4, rooms: 2, price: 450 }),
    unit({ id: 'apartament-2', type: 'Apartment', name: 'Apartament 2', page: '/apartamenty',
      description: 'Sypialnia i salon z aneksem kuchennym oraz rozkładaną sofą, balkon z widokiem na Trzy Korony.',
      m2: 35, maxGuests: 4, rooms: 2, price: 450 }),
    unit({ id: 'apartament-3', type: 'Apartment', name: 'Apartament 3', page: '/apartamenty',
      description: 'Wolnostojący apartament 60 m² pod skosami: część sypialna, salon, jadalnia i aneks kuchenny, balkon z widokiem na Trzy Korony.',
      m2: 60, maxGuests: 6, rooms: 1, price: 500 }),
  ],
}
const roomsSchema = {
  '@context': 'https://schema.org',
  ...unit({ id: 'pokoj', type: 'HotelRoom', name: 'Pokój dwu- lub trzyosobowy (pokoje 1–8)', page: '/pokoje',
    description: 'Pokój 21 m² z łóżkiem małżeńskim 160 × 200, małą sofą rozkładaną i własną łazienką; cztery pokoje z balkonem, cztery z tarasem.',
    m2: 21, maxGuests: 3, rooms: 1, price: 250 }),
  bed: { '@type': 'BedDetails', typeOfBed: 'łóżko małżeńskie 160 × 200', numberOfBeds: 1 },
}

const crumbHome = { name: 'Willa Wójcik', url: `${DOMAIN}/` }
const crumbOkolica = { name: 'Okolica', url: `${DOMAIN}/okolica` }

// ogImage: pliki 1200×630 w public/og/ (stałe adresy, bez odcisku).
const og = (name) => `${DOMAIN}/og/${name}.jpg`

const routesMeta = {
  '/': {
    title: 'Noclegi Sromowce Niżne — apartamenty i pokoje | Willa Wójcik',
    description: 'Noclegi w Sromowcach Niżnych u podnóża Trzech Koron: trzy apartamenty i osiem pokoi. Pokoje od 250 zł, apartamenty od 450 zł. Ocena 4,9 w Google.',
    canonical: `${DOMAIN}/`,
    ogImage: og('strona-glowna'),
    breadcrumb: [],
    additionalSchema: lodgingSchema,
  },
  '/apartamenty': {
    title: 'Apartamenty Sromowce Niżne z balkonem na Trzy Korony',
    description: 'Trzy apartamenty w Sromowcach Niżnych: 38 i 35 m² dla 4 osób po 450 zł, wolnostojący 60 m² dla 6 osób od 500 zł. Aneks kuchenny, balkon na Trzy Korony.',
    canonical: `${DOMAIN}/apartamenty`,
    ogImage: og('apartamenty'),
    breadcrumb: [crumbHome, { name: 'Apartamenty', url: `${DOMAIN}/apartamenty` }],
    // lodgingSchema obok: containedInPlace jednostek wskazuje na jego @id
    additionalSchema: [lodgingSchema, apartmentsSchema],
  },
  '/pokoje': {
    title: 'Pokoje Sromowce Niżne, 21 m² od 250 zł — Willa Wójcik',
    description: 'Osiem pokoi 21 m² w Sromowcach Niżnych: łóżko 160 × 200, własna łazienka, balkon albo taras. 250 zł za dobę dla dwóch osób, 280 zł dla trzech.',
    canonical: `${DOMAIN}/pokoje`,
    ogImage: og('pokoje'),
    breadcrumb: [crumbHome, { name: 'Pokoje', url: `${DOMAIN}/pokoje` }],
    additionalSchema: [lodgingSchema, roomsSchema],
  },
  '/galeria': {
    title: 'Galeria zdjęć — Willa Wójcik, Sromowce Niżne, Pieniny',
    description: 'Zdjęcia trzech apartamentów, ośmiu pokoi i ogrodu Willi Wójcik w Sromowcach Niżnych: widok na Trzy Korony, jasne wnętrza, altana z grillem i plac zabaw.',
    canonical: `${DOMAIN}/galeria`,
    ogImage: og('galeria'),
    breadcrumb: [crumbHome, { name: 'Galeria', url: `${DOMAIN}/galeria` }],
  },
  '/okolica': {
    title: 'Okolica i atrakcje — Sromowce Niżne, Pieniny | Willa Wójcik',
    description: 'Co zobaczyć w Sromowcach Niżnych i Pieninach: spływ Dunajcem, Trzy Korony, kładka do Czerwonego Klasztoru, zamek Niedzica. Odległości od obiektu i ceny 2026.',
    canonical: `${DOMAIN}/okolica`,
    ogImage: og('okolica'),
    breadcrumb: [crumbHome, { name: 'Okolica', url: `${DOMAIN}/okolica` }],
  },
  '/okolica/splyw-dunajcem': {
    title: 'Spływ Dunajcem ze Sromowiec — trasy i ceny | Willa Wójcik',
    description: 'Spływ Dunajcem tratwą flisacką: trasy, czasy i ceny 2026 od 111 zł. Willa Wójcik stoi w Sromowcach Niżnych, tuż przy przystani.',
    canonical: `${DOMAIN}/okolica/splyw-dunajcem`,
    ogImage: og('splyw-dunajcem'),
    breadcrumb: [crumbHome, crumbOkolica, { name: 'Spływ Dunajcem', url: `${DOMAIN}/okolica/splyw-dunajcem` }],
  },
  '/okolica/trzy-korony': {
    title: 'Trzy Korony ze Sromowiec — najkrótszy szlak | Willa Wójcik',
    description: 'Najkrótsze wejście na Trzy Korony (982 m) zaczyna się przy tej samej ulicy co Willa Wójcik — ok. 15 min pieszo. Trasa, czas, taras 10/5 zł, dla rodzin.',
    canonical: `${DOMAIN}/okolica/trzy-korony`,
    ogImage: og('trzy-korony'),
    breadcrumb: [crumbHome, crumbOkolica, { name: 'Trzy Korony', url: `${DOMAIN}/okolica/trzy-korony` }],
  },
  '/okolica/kladka-czerwony-klasztor': {
    title: 'Kładka na Słowację i Czerwony Klasztor | Willa Wójcik',
    description: '250 m od Willi Wójcik do kładki na Dunajcu — pieszo lub rowerem do Czerwonego Klasztoru na Słowacji. Muzeum, Droga Pienińska, wskazówki.',
    canonical: `${DOMAIN}/okolica/kladka-czerwony-klasztor`,
    ogImage: og('kladka-czerwony-klasztor'),
    breadcrumb: [crumbHome, crumbOkolica, { name: 'Kładka i Czerwony Klasztor', url: `${DOMAIN}/okolica/kladka-czerwony-klasztor` }],
  },
  '/kontakt': {
    title: 'Kontakt i rezerwacja — Willa Wójcik, Sromowce Niżne',
    description: 'Rezerwacja bezpośrednia w Willi Wójcik, Sromowce Niżne, bez prowizji pośredników. Telefon +48 537 446 036, formularz zapytania o wolny termin, mapa i dojazd.',
    canonical: `${DOMAIN}/kontakt`,
    ogImage: og('kontakt'),
    breadcrumb: [crumbHome, { name: 'Kontakt', url: `${DOMAIN}/kontakt` }],
    additionalSchema: lodgingSchema,
  },
  '/polityka-prywatnosci': {
    title: 'Polityka prywatności — Willa Wójcik, Sromowce Niżne',
    description: 'Jak Willa Wójcik przetwarza dane osobowe z formularza zapytania: administrator, cele, podstawy prawne, dostawcy usług, okres przechowywania i Państwa prawa.',
    canonical: `${DOMAIN}/polityka-prywatnosci`,
    breadcrumb: [crumbHome, { name: 'Polityka prywatności', url: `${DOMAIN}/polityka-prywatnosci` }],
  },
  '/regulamin': {
    title: 'Regulamin strony i rezerwacji — Willa Wójcik, Sromowce Niżne',
    description: 'Regulamin korzystania ze strony willawojcik.pl i formularza zapytania oraz zasady rezerwacji w Willi Wójcik: zaliczka 30%, doba, opłata miejscowa.',
    canonical: `${DOMAIN}/regulamin`,
    breadcrumb: [crumbHome, { name: 'Regulamin', url: `${DOMAIN}/regulamin` }],
  },
  // Strona błędu: prerender zapisuje ją jako 404.html, poza sitemapą, z noindex.
  '/404': {
    title: 'Nie znaleźliśmy tej strony — Willa Wójcik',
    description: 'Ta strona nie istnieje. Zapraszamy na stronę główną Willi Wójcik w Sromowcach Niżnych.',
    canonical: `${DOMAIN}/`,
    breadcrumb: [],
    notFound: true,
  },
}

// Data ostatniej zmiany treści (lastmod w sitemap.xml). Przy zmianie treści podstrony
// wpisać jej `updated` w routesMeta albo przestawić tę datę dla wszystkich.
export const DEFAULT_UPDATED = '2026-09-26'
export const DEFAULT_OG_IMAGE = og('strona-glowna')

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
