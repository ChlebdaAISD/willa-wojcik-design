import { PageHero } from '../components/ui/PageHero.jsx'
import { Container } from '../components/ui/Container.jsx'
import { BookingForm } from '../components/BookingForm.jsx'
import { SITE } from '../data/site.js'
import { PHOTOS } from '../data/content.js'

export default function Kontakt() {
  return (
    <>
      <PageHero
        eyebrow="Kontakt i rezerwacja"
        title="Zapytaj o wolny termin"
        subtitle="Odpowiadamy tego samego dnia. Rezerwując bezpośrednio, płacą Państwo mniej niż przez portale — u nas bez prowizji."
        image={PHOTOS.buildingDusk}
        crumbs={[{ label: 'Strona główna', href: '/' }, { label: 'Kontakt' }]}
      />

      {/* Formularz zapytania + dane kontaktowe (współdzielony z home) */}
      <BookingForm />

      {/* Mapa i dojazd */}
      <section className="relative bg-stone py-20 md:py-28">
        <Container>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-gold" />
            <span className="eyebrow text-charcoal/60">Dojazd</span>
          </div>
          <h2 className="font-serif text-charcoal leading-[1.05] mb-8" style={{ fontSize: 'clamp(28px, 3.4vw, 44px)', fontWeight: 450 }}>
            Sobczańska 9a, <span className="italic font-[380]">Sromowce Niżne</span>
          </h2>
          <div className="rounded-sm overflow-hidden aspect-[16/9] border border-charcoal/10">
            <iframe
              title="Mapa dojazdu — Willa Wójcik, Sromowce Niżne"
              src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_EMBED_KEY}&q=${SITE.mapsEmbedQuery}&zoom=15`}
              className="w-full h-full" style={{ border: 0 }}
              loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen
            />
          </div>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-[15px]">
            <div>
              <div className="eyebrow text-charcoal/50 mb-2">Zameldowanie</div>
              <div className="text-charcoal/80">od 14:00</div>
            </div>
            <div>
              <div className="eyebrow text-charcoal/50 mb-2">Wymeldowanie</div>
              <div className="text-charcoal/80">do 10:00</div>
            </div>
            <div>
              <div className="eyebrow text-charcoal/50 mb-2">Parking</div>
              <div className="text-charcoal/80">bezpłatny, 10 miejsc na terenie</div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
