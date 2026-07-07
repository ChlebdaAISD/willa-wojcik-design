// Jedno źródło prawdy dla danych obiektu (NAP, kontakt, oceny).
// Dane zweryfikowane z Google Business Profile + nocowanie.pl (2026-07).
// TODO(klient): potwierdzić e-mail (rezerwacja@willawojcik.pl — do założenia z domeną)
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
  region: 'Powiat nowotarski · Małopolska',
  country: 'Polska',

  phone: '+48 537 446 036',
  phoneHref: 'tel:+48537446036',
  email: 'rezerwacja@willawojcik.pl',
  emailHref: 'mailto:rezerwacja@willawojcik.pl',

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

  // Social (do uzupełnienia realnymi linkami)
  instagram: '#',
  facebook: '#',

  domain: 'https://www.willawojcik.pl',
}

// Nawigacja główna (route-based)
export const NAV_LINKS = [
  { label: 'Strona główna', href: '/' },
  { label: 'Pokoje i apartamenty', href: '/pokoje-i-apartamenty' },
  { label: 'Galeria', href: '/galeria' },
  { label: 'Okolica', href: '/okolica' },
  { label: 'Kontakt', href: '/kontakt' },
]
