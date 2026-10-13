// Rezerwacja online — widżet systemu RoomAdmin (link od właścicielki, 13.10.2026).
//
// Widżet to zwykła strona HTML osadzana w <iframe>. Sterujemy nim adresem:
//   arrival / departure          — daty RRRR-MM-DD; gdy są obie i liczba gości,
//                                  widżet od razu pokazuje wolne pokoje z cenami
//   rooms[0][numberOfGuests]     — liczba gości w jednej jednostce
//   style                        — kolory (JSON); domyślna magenta RoomAdmin
//                                  podmieniona na paletę strony
// Parametry sprawdzone na żywym widżecie 13.10.2026 (data-initial-state w HTML-u).
//
// Na naszej stronie adres ma polskie parametry: /rezerwacja?przyjazd=…&wyjazd=…&osoby=…
// Tłumaczy je buildWidgetUrl().

export const ROOMADMIN_ORIGIN = 'https://roomadmin.pl'
const FACILITY_HASH = '192e573915dac7c6b2d8e4190e9338ce5a6aa343'

// Kolory z @theme w index.css: forest jako akcent (przyciski), tło kremowe jak sekcja,
// w której stoi ramka — dzięki temu widżet nie odcina się białym prostokątem.
const WIDGET_STYLE = {
  color_accent: '#1F3A2E',
  color_bg: '#F5F1E8',
  color_panel_header: '#FFFFFF',
  color_panel_body: '#FFFFFF',
  rounded_corners: 'true',
}

// Największy apartament mieści 6 osób (dane od właścicielki z 14.09.2026,
// widżet zgłasza to samo: data-facility-max-room-capacity="6").
export const MAX_GUESTS = 6

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/
// Granice zdrowego rozsądku dla parametrów z adresu (link może przyjść z dowolnego miejsca)
export const MAX_DAYS_AHEAD = 730
export const MAX_NIGHTS = 60

// Data lokalna, nie UTC: toISOString() po północy polskiego czasu zwracałby wczorajszy dzień.
export function isoDate(d) {
  const p = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
}

export function addDays(iso, days) {
  const [y, m, d] = iso.split('-').map(Number)
  return isoDate(new Date(y, m - 1, d + days))
}

// Format RRRR-MM-DD i prawdziwy dzień kalendarza (odrzuca 2026-02-31, 2026-13-01)
function isValidDate(iso) {
  if (!DATE_RE.test(iso)) return false
  const [y, m, d] = iso.split('-').map(Number)
  return isoDate(new Date(y, m - 1, d)) === iso
}

export function nightsBetween(arrival, departure) {
  if (!DATE_RE.test(arrival) || !DATE_RE.test(departure)) return 0
  const [y1, m1, d1] = arrival.split('-').map(Number)
  const [y2, m2, d2] = departure.split('-').map(Number)
  return Math.round((Date.UTC(y2, m2 - 1, d2) - Date.UTC(y1, m1 - 1, d1)) / 86400000)
}

// Parametry z adresu strony. Wszystko, co się nie zgadza (zły format albo nieistniejący
// dzień, przeszłość, ponad 2 lata naprzód, wyjazd przed przyjazdem, ponad 60 nocy,
// liczba gości poza zakresem), po prostu pomijamy —
// widżet otworzy się wtedy z pustym polem i gość wybierze sam.
export function parseStay(search) {
  const q = new URLSearchParams(search)
  const today = isoDate(new Date())
  let arrival = q.get('przyjazd') || ''
  let departure = q.get('wyjazd') || ''
  if (!isValidDate(arrival) || arrival < today || arrival > addDays(today, MAX_DAYS_AHEAD)) arrival = ''
  if (!arrival || !isValidDate(departure) || departure <= arrival
      || departure > addDays(arrival, MAX_NIGHTS)) departure = ''
  const n = Number(q.get('osoby'))
  const guests = Number.isInteger(n) && n >= 1 && n <= MAX_GUESTS ? n : 0
  return { arrival, departure, guests }
}

export function stayHref({ arrival, departure, guests }) {
  const q = new URLSearchParams()
  if (arrival) q.set('przyjazd', arrival)
  if (arrival && departure) q.set('wyjazd', departure)
  if (guests) q.set('osoby', String(guests))
  const s = q.toString()
  return s ? `/rezerwacja?${s}` : '/rezerwacja'
}

export function buildWidgetUrl({ arrival, departure, guests } = {}) {
  const q = new URLSearchParams({
    fh: FACILITY_HASH,
    style: JSON.stringify(WIDGET_STYLE),
    filter: '{}',
    lang: 'pl',
  })
  if (arrival && departure) {
    q.set('arrival', arrival)
    q.set('departure', departure)
  }
  if (guests) q.set('rooms[0][numberOfGuests]', String(guests))
  return `${ROOMADMIN_ORIGIN}/widget/reservation-v2/start?${q}`
}
