import { PageHero } from '../components/ui/PageHero.jsx'
import { Container } from '../components/ui/Container.jsx'
import { BookingForm } from '../components/BookingForm.jsx'
import { MapEmbed } from '../components/ui/MapEmbed.jsx'
import { FAQ } from '../components/ui/content.jsx'
import { PHOTOS } from '../data/content.js'
import { SITE } from '../data/site.js'

// Pytania przed rezerwacją. Odpowiedzi wyłącznie z danych, które są już na stronie
// (site.js, content.js) — przy zmianie ceny, doby albo zasad poprawić też tutaj.
const faq = [
  {
    q: 'Jak zarezerwować pobyt w Willi Wójcik?',
    a: `Wystarczy wysłać zapytanie przez formularz na tej stronie albo zadzwonić pod numer ${SITE.phone}. Odpowiadamy tego samego dnia z informacją o dostępności i cenie. Rezerwację potwierdza zaliczka 30% wartości pobytu, a resztę płacą Państwo w dniu przyjazdu.`,
  },
  {
    q: 'O której godzinie jest zameldowanie i wymeldowanie?',
    a: 'Zameldowanie od 14:00, wymeldowanie do 10:00.',
  },
  {
    q: 'Czy przy obiekcie jest parking?',
    a: 'Tak. Parking na terenie obiektu jest bezpłatny i ma 10 miejsc.',
  },
  {
    q: 'Czy są śniadania?',
    a: 'Nie serwujemy śniadań, posiłki przygotowują Państwo sami. Apartamenty mają aneksy kuchenne, a goście pokoi korzystają ze wspólnej kuchni o powierzchni 45 m² połączonej z jadalnią.',
  },
  {
    q: 'Czy można przyjechać z psem?',
    a: 'Niestety nie przyjmujemy zwierząt. Cały obiekt jest też przeznaczony dla niepalących.',
  },
  {
    q: 'Czy obiekt nadaje się dla rodzin z dziećmi?',
    a: 'Tak. W ogrodzie jest plac zabaw z trampoliną i huśtawkami, a na życzenie przygotujemy łóżeczko, krzesełko do karmienia i wanienkę. Apartamenty mieszczą 4 albo 6 osób.',
  },
  {
    q: 'Ile wynosi opłata miejscowa w Sromowcach Niżnych?',
    a: `W gminie Czorsztyn opłata miejscowa wynosi ${SITE.localFee} (uchwała Rady Gminy nr XII/102/2025). Doliczamy ją do ceny pobytu i pobieramy na miejscu.`,
  },
]

export default function Kontakt() {
  return (
    <>
      <PageHero
        title="Kontakt i rezerwacja w Willi Wójcik"
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

      {/* Pytania przed rezerwacją (FAQPage schema z komponentu FAQ) */}
      <section className="relative bg-cream py-20 md:py-28">
        <Container>
          <div className="reveal flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-gold" />
            <span className="eyebrow text-charcoal/70">03 — Pytania</span>
          </div>
          <h2 className="reveal font-serif text-charcoal leading-[1.05] mb-10 max-w-3xl" style={{ fontSize: 'clamp(28px, 3.4vw, 44px)', fontWeight: 500 }}>
            Zanim Państwo <span className="italic font-normal">zarezerwują</span>.
          </h2>
          <FAQ items={faq} />
        </Container>
      </section>
    </>
  )
}
