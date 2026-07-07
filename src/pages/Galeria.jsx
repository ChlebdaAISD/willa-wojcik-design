import { PageHero } from '../components/ui/PageHero.jsx'
import { Container } from '../components/ui/Container.jsx'
import { GalleryGrid } from '../components/ui/GalleryGrid.jsx'
import { CTASection } from '../components/ui/CTASection.jsx'
import { PHOTOS } from '../data/content.js'

// Galeria tematyczna — wszystkie zdjęcia na stronie, każda kategoria jako osobna sekcja.
// Kategorie i zdjęcia PLACEHOLDER (istniejące webp) — podział i finalne foto poda klient (IMAGES_NEEDED.md).
const CATEGORIES = [
  {
    id: 'zewnatrz',
    label: 'Na zewnątrz',
    desc: 'Obiekt, ogród i taras o różnych porach roku — z widokiem na Pieniny.',
    photos: [
      { src: PHOTOS.buildingDusk, label: 'Obiekt o zmierzchu', span: 'row-span-2 col-span-2' },
      { src: PHOTOS.buildingWinter, label: 'Willa zimą' },
      { src: PHOTOS.garden, label: 'Ogród i altana z grillem' },
      { src: PHOTOS.terrace, label: 'Wspólny taras' },
    ],
  },
  {
    id: 'apartamenty',
    label: 'Apartamenty',
    desc: 'Przestronne apartamenty 4–6 osobowe z balkonem i w pełni wyposażonym aneksem kuchennym.',
    photos: [
      { src: PHOTOS.apartment, label: 'Apartament rodzinny', span: 'row-span-2 col-span-2' },
      { src: PHOTOS.livingRoom, label: 'Salon apartamentu' },
      { src: PHOTOS.balconyView, label: 'Widok z balkonu na Trzy Korony' },
      { src: PHOTOS.livingRoom2, label: 'Strefa wypoczynkowa', span: 'col-span-2' },
    ],
  },
  {
    id: 'pokoje',
    label: 'Pokoje',
    desc: 'Kameralne pokoje 2–3 osobowe z własną łazienką i balkonem lub tarasem.',
    photos: [
      { src: PHOTOS.roomBirch, label: 'Pokój brzozowy · 2 os.', span: 'col-span-2' },
      { src: PHOTOS.bathroom, label: 'Łazienka' },
    ],
  },
  {
    id: 'wspolne',
    label: 'Części wspólne',
    desc: 'Wspólna kuchnia 45 m² połączona z jadalnią — serce obiektu w duchu „jak u siebie”.',
    photos: [
      { src: PHOTOS.commonArea, label: 'Wspólna kuchnia 45 m²', span: 'col-span-2' },
      { src: PHOTOS.kitchen, label: 'Aneks kuchenny' },
    ],
  },
]

export default function Galeria() {
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
          <div className="space-y-16 md:space-y-20">
            {CATEGORIES.map((c) => (
              <div key={c.id}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-px bg-gold" />
                  <span className="eyebrow text-cream/60">{c.label}</span>
                </div>
                <p className="text-cream/70 text-[16px] leading-relaxed max-w-2xl mb-8">{c.desc}</p>
                <GalleryGrid photos={c.photos} />
              </div>
            ))}
          </div>

          <p className="mt-16 text-cream/45 text-[13px] max-w-xl">
            Zdjęcia poglądowe, podział na kategorie jest wstępny. Uzupełnimy galerię o aktualne fotografie i finalne kategorie.
          </p>
        </Container>
      </section>

      <CTASection
        title="Zdjęcia wyglądają zachęcająco?"
        text="Na żywo, z porannym widokiem na Trzy Korony z balkonu, robi to jeszcze większe wrażenie."
      />
    </>
  )
}
