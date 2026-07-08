import { PageHero } from '../components/ui/PageHero.jsx'
import { Container } from '../components/ui/Container.jsx'
import { BookingForm } from '../components/BookingForm.jsx'
import { MapEmbed } from '../components/ui/MapEmbed.jsx'
import { PHOTOS } from '../data/content.js'

export default function Kontakt() {
  return (
    <>
      <PageHero
        title="Zapytaj o wolny termin"
        subtitle="Odpowiadamy tego samego dnia. Rezerwując bezpośrednio, płacą Państwo mniej niż przez portale — u nas bez prowizji."
        image={PHOTOS.heroKontakt}
        imageAlt="Ilustracja: wspólna kuchnia z jadalnią w Willi Wójcik — rattanowe lampy, okrągłe stoliki i musztardowe fotele"
        crumbs={[{ label: 'Strona główna', href: '/' }, { label: 'Kontakt' }]}
      />

      {/* Formularz zapytania + dane kontaktowe (współdzielony z home) */}
      <BookingForm eyebrow="01 — Rezerwacja" />

      {/* Mapa i dojazd */}
      <section className="relative bg-stone py-20 md:py-28">
        <Container>
          <div className="reveal flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-gold" />
            <span className="eyebrow text-charcoal/70">02 — Dojazd</span>
          </div>
          <h2 className="reveal font-serif text-charcoal leading-[1.05] mb-8" style={{ fontSize: 'clamp(28px, 3.4vw, 44px)', fontWeight: 500 }}>
            Sobczańska 9a, <span className="italic font-normal">Sromowce Niżne</span>
          </h2>
          <div className="reveal-lg">
            <MapEmbed aspect="aspect-[16/9]" zoom={15} />
          </div>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-[15px]">
            {[
              ['Zameldowanie', 'od 14:00'],
              ['Wymeldowanie', 'do 10:00'],
              ['Parking', 'bezpłatny, 10 miejsc na terenie'],
            ].map(([k, v], i) => (
              <div key={k} className="reveal" style={{ '--d': `${i * 0.06}s` }}>
                <div className="eyebrow text-charcoal/70 mb-2">{k}</div>
                <div className="text-charcoal/80">{v}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
