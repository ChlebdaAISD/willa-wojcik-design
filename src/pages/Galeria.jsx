import { useState } from 'react'
import { PageHero } from '../components/ui/PageHero.jsx'
import { Container } from '../components/ui/Container.jsx'
import { GalleryGrid } from '../components/ui/GalleryGrid.jsx'
import { CTASection } from '../components/ui/CTASection.jsx'
import { PHOTOS } from '../data/content.js'

// Kategorie galerii — PLACEHOLDER. Docelowe nazwy/podział poda klient.
// Zdjęcia poglądowe (istniejące webp) — do podmiany, patrz IMAGES_NEEDED.md.
const CATEGORIES = [
  { id: 'all', label: 'Wszystkie', desc: 'Cała willa i okolica w jednym miejscu.' },
  { id: 'zewnatrz', label: 'Na zewnątrz', desc: 'Obiekt, ogród, altana i taras — o różnych porach roku.' },
  { id: 'apartamenty', label: 'Apartamenty', desc: 'Przestronne apartamenty 4–6 osobowe z balkonem i aneksem kuchennym.' },
  { id: 'pokoje', label: 'Pokoje', desc: 'Kameralne pokoje 2–3 osobowe z własną łazienką.' },
  { id: 'wspolne', label: 'Części wspólne', desc: 'Wspólna kuchnia 45 m², strefy wypoczynku i miejsca dla dzieci.' },
]

const PHOTOS_ALL = [
  { src: PHOTOS.buildingDusk, label: 'Obiekt o zmierzchu', cat: 'zewnatrz' },
  { src: PHOTOS.buildingWinter, label: 'Willa zimą', cat: 'zewnatrz' },
  { src: PHOTOS.garden, label: 'Ogród i altana z grillem', cat: 'zewnatrz' },
  { src: PHOTOS.terrace, label: 'Wspólny taras', cat: 'zewnatrz' },
  { src: PHOTOS.apartment, label: 'Apartament rodzinny', cat: 'apartamenty' },
  { src: PHOTOS.livingRoom, label: 'Salon apartamentu', cat: 'apartamenty' },
  { src: PHOTOS.livingRoom2, label: 'Strefa wypoczynkowa', cat: 'apartamenty' },
  { src: PHOTOS.balconyView, label: 'Widok z balkonu na Trzy Korony', cat: 'apartamenty' },
  { src: PHOTOS.roomBirch, label: 'Pokój brzozowy · 2 os.', cat: 'pokoje' },
  { src: PHOTOS.bathroom, label: 'Łazienka', cat: 'pokoje' },
  { src: PHOTOS.kitchen, label: 'Aneks kuchenny', cat: 'wspolne' },
  { src: PHOTOS.commonArea, label: 'Wspólna kuchnia 45 m²', cat: 'wspolne' },
]

// Warianty rozmiaru dla urozmaicenia siatki (masonry) — nadawane po filtrowaniu.
const SPANS = ['row-span-2 col-span-2', '', '', 'col-span-2', '', 'row-span-2 col-span-1', '', '', '', '', '', '']

export default function Galeria() {
  const [cat, setCat] = useState('all')
  const active = CATEGORIES.find((c) => c.id === cat) || CATEGORIES[0]
  const photos = (cat === 'all' ? PHOTOS_ALL : PHOTOS_ALL.filter((p) => p.cat === cat))
    .map((p, i) => ({ ...p, span: SPANS[i] || '' }))

  return (
    <>
      <PageHero
        title="Willa w obrazach"
        subtitle="Jasne wnętrza, zapach drewna i ten jeden widok na Trzy Korony. Zobaczą Państwo, zanim przyjadą."
        image={PHOTOS.balconyView}
        crumbs={[{ label: 'Strona główna', href: '/' }, { label: 'Galeria' }]}
      />

      <section className="relative bg-charcoal text-cream py-20 md:py-28">
        <Container>
          {/* Zakładki kategorii */}
          <div className="flex flex-wrap gap-2.5 mb-6">
            {CATEGORIES.map((c) => (
              <button key={c.id} onClick={() => setCat(c.id)}
                      aria-pressed={cat === c.id}
                      className={`px-4 py-2 rounded-full text-[13px] font-semibold tracking-wide transition-colors duration-300 ${
                        cat === c.id ? 'bg-cream text-forest' : 'text-cream/70 border border-cream/25 hover:bg-cream/10'
                      }`}>
                {c.label}
              </button>
            ))}
          </div>
          <p className="text-cream/60 text-[15px] mb-10 max-w-2xl leading-relaxed">{active.desc}</p>

          <GalleryGrid key={cat} photos={photos} />

          <p className="mt-10 text-cream/45 text-[13px] max-w-xl">
            Zdjęcia poglądowe, podział na kategorie jest wstępny. Uzupełnimy galerię o aktualne fotografie i finalne kategorie.
          </p>
        </Container>
      </section>

      <CTASection
        title="Spodobało się Państwu to, co widać?"
        text="Reszty nie widać na zdjęciach — ciszy o poranku i mgły w dolinie. Prosimy o kontakt, sprawdzimy wolny termin."
      />
    </>
  )
}
