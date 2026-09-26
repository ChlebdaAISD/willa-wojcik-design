import wymiary from '../assets/miniatury/wymiary.json'

// Miniatury z scripts/miniatury.py (640 i 1280 px szerokości) jako srcset dla <img>.
// Zdjęcia importujemy w content.js jak dotąd; tu z adresu pliku odczytujemy jego
// nazwę i dobieramy miniatury. Zdjęcie bez miniatury dostaje sam `src` — działa
// jak wcześniej, tylko jest cięższe.
const miniatury = import.meta.glob('../assets/miniatury/*.webp', { eager: true, import: 'default' })

const urlMiniatury = {}
for (const [sciezka, url] of Object.entries(miniatury)) {
  const m = sciezka.match(/\/([^/]+)-(\d+)\.webp$/)
  if (m) (urlMiniatury[m[1]] ||= []).push([Number(m[2]), url])
}

// Adres z builda ma odcisk: /assets/ap1-salon-okno--vhwlXf4.webp (8 znaków po myślniku).
// W trybie dev: /src/assets/ap1-salon-okno.webp. Nazwę sprawdzamy w wymiary.json.
function nazwa(src) {
  if (typeof src !== 'string') return null
  const plik = src.split('?')[0].split('/').pop().replace(/\.webp$/, '')
  if (wymiary[plik]) return plik
  const bezOdcisku = plik.replace(/-[\w-]{8}$/, '')
  return wymiary[bezOdcisku] ? bezOdcisku : null
}

// Atrybuty do rozłożenia na <img>: srcSet, sizes, width, height.
// `sizes` = szerokość, jaką obraz zajmuje na ekranie (składnia atrybutu sizes).
// pelny: dołącza oryginał do srcset (lightbox na dużym ekranie).
export function obraz(src, sizes, { pelny = false } = {}) {
  const n = nazwa(src)
  if (!n) return { src }
  const [w, h] = wymiary[n]
  const warianty = [...(urlMiniatury[n] || [])].sort((a, b) => a[0] - b[0])
  if (pelny || !warianty.length) warianty.push([w, src])
  return {
    src: warianty.length === 1 ? src : warianty[warianty.length - 1][1],
    srcSet: warianty.map(([sz, url]) => `${url} ${sz}w`).join(', '),
    sizes,
    width: w,
    height: h,
  }
}
