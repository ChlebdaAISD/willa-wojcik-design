import { PHOTOS, APARTMENTS } from '../data/content.js'
import { GalleryGrid } from './ui/GalleryGrid.jsx'

const AP1 = APARTMENTS[0]
const AP3 = APARTMENTS[1]

// Wnętrza apartamentów = realne zdjęcia (2026-07). Ujęcia z zewnątrz/części
// wspólnych wciąż poglądowe — podmiana: IMAGES_NEEDED.md.
const GALLERY_PHOTOS = [
  { src: PHOTOS.roomBirch, label: 'Pokój brzozowy · 2 os.', span: 'row-span-2 col-span-2' },
  { src: AP1.photos[0].src, label: 'Salon apartamentu 1 z aneksem kuchennym' },
  { src: PHOTOS.balconyView, label: 'Willa i Trzy Korony z lotu ptaka' },
  { src: PHOTOS.kitchen, label: 'Wspólna kuchnia 45 m²', span: 'row-span-1 col-span-2' },
  { src: AP3.photos[5].src, label: 'Marmurowa łazienka apartamentu' },
  { src: PHOTOS.buildingDusk, label: 'Altana i ogród' },
  { src: PHOTOS.terrace, label: 'Taras wspólny', span: 'row-span-2 col-span-1' },
  { src: AP3.cover, label: 'Wolnostojący apartament — wnętrze z antresolą' },
  { src: AP3.photos[2].src, label: 'Sypialnia z góralskim rzeźbionym łóżkiem' },
  { src: PHOTOS.buildingWinter, label: 'Willa zimą' },
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
            {GALLERY_PHOTOS.length} zdjęć · kliknij, aby powiększyć
          </div>
        </div>

        <GalleryGrid photos={GALLERY_PHOTOS} hideThumbLabels />
      </div>
    </section>
  )
}
