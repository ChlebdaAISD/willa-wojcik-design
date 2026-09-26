// Jedno źródło prawdy dla danych obiektu (NAP, kontakt, oceny).
// Dane zweryfikowane z Google Business Profile + nocowanie.pl (2026-07).
//               oraz doby hotelowe/zasady przed publikacją.

export const SITE = {
  name: 'Willa Wójcik',
  legalName: 'Willa Wójcik — Apartamenty i Pokoje',
  tagline: 'Apartamenty i pokoje w sercu Pienin',

  // NAP — musi być identyczne na stronie, w Google i w schema
  street: 'Sobczańska 9a',
  postal: '34-443',
  city: 'Sromowce Niżne',
  cityLocative: 'Sromowcach Niżnych',
  region: 'Powiat nowotarski, Małopolska',
  country: 'Polska',

  phone: '+48 537 446 036',
  phoneHref: 'tel:+48537446036',
  email: 'willawojcik1@gmail.com',
  emailHref: 'mailto:willawojcik1@gmail.com',

  geo: { lat: 49.3965931, lng: 20.4089415 },
  mapsEmbedQuery: 'Willa+Wójcik+Sobczańska+9a+Sromowce+Niżne',
  mapsLink: 'https://maps.google.com/?cid=3949048437519423849',

  // Kontakt / doba
  contactHours: 'codziennie 8:00–22:00',
  checkIn: '14:00–21:00',
  checkOut: 'do 10:00',
  deposit: 'zaliczka 30%',

  // Dowód społeczny
  ratingGoogle: '4.9',
  reviewsGoogle: 135,
  ratingBooking: '9.8',
  ratingNocowanie: '10',

  // Social
  instagram: 'https://www.instagram.com/willawojcik/',

  domain: 'https://willawojcik.pl',

  // Usługodawca i administrator danych (CEIDG / wykaz VAT, stan 09.2026).
  // Wymagane na stronie: art. 5 ustawy o świadczeniu usług drogą elektroniczną.
  owner: {
    name: 'Danuta Wójcik',
    nip: '7352462364',
    regon: '492812030',
  },

  // Opłata miejscowa w gminie Czorsztyn — uchwała Rady Gminy nr XII/102/2025 z 24.06.2025
  localFee: '2 zł za osobę za dobę',
  localFeeSource: 'https://czorsztyn.pl/pl/1154/0/oplata-miejscowa.html',

  // Data, na którą podajemy oceny z portali (aktualizować raz na sezon)
  ratingsAsOf: 'wrzesień 2026',
}

// Nawigacja główna (route-based)
export const NAV_LINKS = [
  { label: 'Strona główna', href: '/' },
  { label: 'Apartamenty', href: '/apartamenty' },
  { label: 'Pokoje', href: '/pokoje' },
  { label: 'Galeria', href: '/galeria' },
  { label: 'Okolica', href: '/okolica' },
  { label: 'Kontakt', href: '/kontakt' },
]
