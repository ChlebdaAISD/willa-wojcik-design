import { PageHero } from '../components/ui/PageHero.jsx'
import { Container } from '../components/ui/Container.jsx'
import { GalleryGrid } from '../components/ui/GalleryGrid.jsx'
import { CTASection } from '../components/ui/CTASection.jsx'
import { PHOTOS } from '../data/content.js'

// Zdjęcia poglądowe — do podmiany na aktualne fotografie obiektu (patrz IMAGES_NEEDED.md).
const photos = [
  { src: PHOTOS.roomBirch, label: 'Pokój brzozowy · 2 os.', span: 'row-span-2 col-span-2' },
  { src: PHOTOS.livingRoom, label: 'Salon apartamentu' },
  { src: PHOTOS.balconyView, label: 'Widok z balkonu na Trzy Korony' },
  { src: PHOTOS.kitchen, label: 'Aneks kuchenny', span: 'row-span-1 col-span-2' },
  { src: PHOTOS.bathroom, label: 'Łazienka' },
  { src: PHOTOS.buildingDusk, label: 'Obiekt o zmierzchu' },
  { src: PHOTOS.garden, label: 'Ogród i altana z grillem', span: 'row-span-2 col-span-1' },
  { src: PHOTOS.terrace, label: 'Wspólny taras' },
  { src: PHOTOS.apartment, label: 'Apartament rodzinny' },
  { src: PHOTOS.livingRoom2, label: 'Strefa wypoczynkowa' },
  { src: PHOTOS.buildingWinter, label: 'Willa zimą' },
  { src: PHOTOS.commonArea, label: 'Wspólna kuchnia 45 m²' },
]

export default function Galeria() {
  return (
    <>
      <PageHero
        eyebrow="Galeria"
        title="Willa w obrazach"
        subtitle="Jasne wnętrza, zapach drewna i ten jeden widok na Trzy Korony. Zobaczą Państwo, zanim przyjadą."
        image={PHOTOS.balconyView}
        crumbs={[{ label: 'Strona główna', href: '/' }, { label: 'Galeria' }]}
      />

      <section className="relative bg-charcoal text-cream py-20 md:py-28">
        <Container>
          <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
            <div className="eyebrow text-cream/60">{photos.length} zdjęć · kliknij, aby powiększyć</div>
          </div>
          <GalleryGrid photos={photos} />
          <p className="mt-10 text-cream/45 text-[13px] max-w-xl">
            Zdjęcia poglądowe. Wkrótce uzupełnimy galerię o aktualne fotografie apartamentów, pokoi i okolicy.
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
