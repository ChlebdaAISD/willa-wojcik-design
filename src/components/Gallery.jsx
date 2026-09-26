import { Link } from 'wouter'
import { PHOTOS, getApartment } from '../data/content.js'
import { GalleryGrid } from './ui/GalleryGrid.jsx'

// Apartament 3 (60 m², wolnostojący) — szukamy po id, bo kolejność w APARTMENTS
// może się jeszcze zmienić. Od 09.2026 apartamenty są trzy, nie dwa.
const AP3 = getApartment('apartament-3')

// Skrót całego obiektu w ośmiu realnych zdjęciach: budynek, widok, pokój, kuchnia,
// ogród, apartament. Układ to dwa bloki [2×2, 1, 1, 2w] = 16 komórek w 4 rzędach,
// bez dziur (zasady w komentarzu nad siatką w pages/Galeria.jsx).
//
// 21.09.2026 wypadło `ogrodPlacZabaw`: pokazywało tę samą altanę, huśtawkę i trawnik
// co `ogrodAltana`, tylko z paru kroków dalej. Plac zabaw został na /galeria.
// Jego miejsce zajęło zdjęcie willi pod Trzema Koronami — w kafelku 2×2, bo o duży
// prosił właściciel, a przy okazji kadr 16:9 traci w nim najmniej: kafelek 2×2 ma
// proporcję 1,47, a szeroki 2×1 aż 3,03 i obciąłby zdjęciu 41% wysokości.
const GALLERY_PHOTOS = [
  { src: PHOTOS.obiektDroneZmierzch, label: 'Willa Wójcik o zmierzchu, ujęcie z drona', span: 'col-span-2 row-span-2' },
  { src: PHOTOS.pokojPietroBalkon, label: 'Pokój na piętrze z balkonem, 21 m²' },
  { src: PHOTOS.wspolneKuchnia, label: 'Wspólna kuchnia o powierzchni 45 m²' },
  { src: PHOTOS.tarasWidokTrzyKorony, label: 'Trzy Korony widziane z tarasu willi', span: 'col-span-2' },
  { src: PHOTOS.obiektTrzyKorony, label: 'Willa Wójcik pod masywem Trzech Koron', span: 'col-span-2 row-span-2' },
  { src: PHOTOS.ogrodAltana, label: 'Altana z grillem w ogrodzie' },
  { src: PHOTOS.obiektOdOgrodu, label: 'Willa od strony ogrodu' },
  { src: AP3.cover, label: 'Apartament 3, 60 m² w jednym pomieszczeniu', span: 'col-span-2' },
]

export function Gallery() {
  return (
    <section id="galeria" data-screen-label="06 Galeria" className="relative bg-charcoal text-cream py-24 md:py-40">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
          <div className="reveal max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-gold"></span>
              <span className="eyebrow text-cream/75">04 — Galeria</span>
            </div>
            <h2 className="font-serif text-cream leading-[1.05]"
                style={{ fontSize: 'clamp(36px, 4.6vw, 62px)', fontWeight: 500 }}>
              Willa <span className="italic font-normal">w obrazach</span>.
            </h2>
          </div>
          <div className="reveal eyebrow text-cream/70">
            {GALLERY_PHOTOS.length} zdjęć, kliknięcie powiększa
          </div>
        </div>

        <GalleryGrid photos={GALLERY_PHOTOS} hideThumbLabels />

        <div className="reveal mt-12 flex justify-center">
          <Link href="/galeria"
                className="group inline-flex items-center gap-3 eyebrow text-cream/80 hover:text-cream transition-colors">
            <span className="border-b border-gold/60 group-hover:border-gold pb-1 transition-colors">
              Wszystkie zdjęcia willi
            </span>
            <span aria-hidden="true" className="text-gold transition-transform duration-500 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
