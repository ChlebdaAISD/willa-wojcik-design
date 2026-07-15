import { PageHero } from '../components/ui/PageHero.jsx'
import { Container } from '../components/ui/Container.jsx'
import { GalleryGrid } from '../components/ui/GalleryGrid.jsx'
import { CTASection } from '../components/ui/CTASection.jsx'
import { PHOTOS, APARTMENTS } from '../data/content.js'

// Apartamenty = realne zdjęcia (content.js). Pozostałe kategorie wciąż poglądowe.
const AP1 = APARTMENTS.find((a) => a.id === 'apartament-1')
const AP3 = APARTMENTS.find((a) => a.id === 'apartament-3')

const CATEGORIES = [
  {
    id: 'zewnatrz',
    label: 'Na zewnątrz',
    desc: 'Obiekt, ogród i taras o różnych porach roku — z widokiem na Pieniny.',
    photos: [
      { src: PHOTOS.buildingDusk, label: 'Altana z grillem i ogród', span: 'row-span-2 col-span-2' },
      { src: PHOTOS.buildingWinter, label: 'Willa zimą' },
      { src: PHOTOS.terrace, label: 'Wspólny taras' },
    ],
  },
  {
    id: 'apartamenty',
    label: 'Apartamenty',
    desc: 'Dwa apartamenty z balkonem na Trzy Korony — kameralny 38 m² i przestronny, wolnostojący 60 m² dla sześciu osób.',
    // Spany ustawiane jawnie (nie dziedziczone ze spreadu) — inaczej AP1.photos[0]
    // wnosi 'col-span-2 row-span-2' z content.js i robi dziurę w siatce.
    photos: [
      { src: AP3.photos[0].src, label: AP3.photos[0].label, span: 'row-span-2 col-span-2' }, // AP3: wnętrze/antresola (hero)
      { src: AP3.photos[1].src, label: AP3.photos[1].label, span: 'col-span-2' },             // AP3: widok na Trzy Korony
      { src: AP1.photos[0].src, label: AP1.photos[0].label },                                  // AP1: salon z aneksem
      { src: AP3.photos[2].src, label: AP3.photos[2].label },                                  // AP3: sypialnia góralska
      { src: AP3.photos[5].src, label: AP3.photos[5].label },                                  // AP3: łazienka
      { src: AP1.photos[2].src, label: AP1.photos[2].label },                                  // AP1: sypialnia
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
    ],
  },
]

export default function Galeria() {
  return (
    <>
      <PageHero
        title="Willa w obrazach"
        subtitle="Jasne wnętrza, zapach drewna i ten jeden widok na Trzy Korony. Zobaczą Państwo, zanim przyjadą."
        image={PHOTOS.heroGaleria}
        imageAlt="Ilustracja: rozświetlony pensjonat wśród domów Sromowiec Niżnych, w tle skalna korona Trzech Koron"
        crumbs={[{ label: 'Strona główna', href: '/' }, { label: 'Galeria' }]}
      />

      <section className="relative bg-charcoal text-cream py-20 md:py-28">
        <Container>
          <div className="space-y-16 md:space-y-20">
            {CATEGORIES.map((c, i) => (
              <div key={c.id}>
                <div className="reveal flex items-center gap-3 mb-3">
                  <span className="w-8 h-px bg-gold" />
                  <span className="eyebrow text-cream/75">{String(i + 1).padStart(2, '0')} — {c.label}</span>
                </div>
                <p className="reveal text-cream/70 text-[16px] leading-relaxed max-w-2xl mb-8">{c.desc}</p>
                <GalleryGrid photos={c.photos} hideThumbLabels />
              </div>
            ))}
          </div>

          <p className="mt-16 text-cream/75 text-[13px] max-w-xl">
            Zdjęcia apartamentów są aktualne. Fotografie części wspólnych i obiektu z zewnątrz uzupełnimy wkrótce.
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
