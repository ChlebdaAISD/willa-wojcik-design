import { Link } from 'wouter'
import { PageHero } from '../components/ui/PageHero.jsx'
import { Container } from '../components/ui/Container.jsx'
import { SectionHeading } from '../components/ui/SectionHeading.jsx'
import { Button } from '../components/ui/Button.jsx'
import { CTASection } from '../components/ui/CTASection.jsx'
import { AmenitiesSection, RulesSection } from '../components/StaySections.jsx'
import { IconArrowUp } from '../components/Icons.jsx'
import { PHOTOS } from '../data/content.js'

// Pokoje 2–3 os. — brak realnych zdjęć (zdjęcia poglądowe do podmiany,
// zob. IMAGES_NEEDED.md). Liczby zgodne z references/stats.md.
const FEATURES = [
  'Własna łazienka z prysznicem',
  'Balkon lub taras z widokiem na ogród lub góry',
  'Lodówka, czajnik, TV-SAT, WiFi',
  'Suszarka, świeża pościel i ręczniki',
  'Dostęp do wspólnej kuchni 45 m²',
]

export default function Pokoje() {
  return (
    <>
      <PageHero
        title="Pokoje w Sromowcach Niżnych"
        image={PHOTOS.heroPokoje}
        imageAlt="Ilustracja: pokój brzozowy Willi Wójcik — rzeźbione łóżko, poduszki z parzenicą i mural z górami"
        crumbs={[{ label: 'Strona główna', href: '/' }, { label: 'Pokoje' }]}
      />

      {/* Intro */}
      <section className="relative bg-cream py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-7 reveal">
              <SectionHeading eyebrow="01 — Dla par i mniejszych ekip" title={<>Osiem pokoi, każdy <span className="italic font-normal">z własną łazienką</span>.</>} />
              <div className="mt-6 space-y-4 text-charcoal/75 text-[17px] leading-[1.8] text-pretty max-w-xl">
                <p>
                  Pokoje w Sromowcach Niżnych na 2–3 osoby mają po 21 m², balkon lub taras
                  i łazienkę tylko dla Państwa. Za widok nie doliczamy nic — Trzy Korony
                  albo ogród, zależnie od pokoju.
                </p>
                <p>
                  Zamiast baru śniadaniowego jest w pełni wyposażona kuchnia wspólna 45 m².
                  Gotują Państwo co chcą i kiedy chcą, jak u siebie.
                </p>
              </div>
            </div>
            <div className="lg:col-span-4 lg:col-start-9 reveal" style={{ '--d': '.12s' }}>
              <div className="grid grid-cols-3 lg:grid-cols-1 gap-6 lg:gap-5 lg:border-l lg:border-charcoal/15 lg:pl-8">
                {[['8', 'pokoi 2–3 osobowych'], ['21', 'm² każdy'], ['4,9', 'ocena w Google (135 opinii)']].map(([n, l]) => (
                  <div key={l}>
                    <div className="font-serif text-forest leading-none" style={{ fontSize: 'clamp(34px, 4vw, 52px)', fontWeight: 500 }}>{n}</div>
                    <div className="eyebrow text-charcoal/70 mt-2 text-[10.5px]">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Karta pokoju */}
      <section className="relative bg-cream-2 py-20 md:py-28">
        <Container>
          <SectionHeading
            eyebrow="02 — Pokoje"
            title={<>Kameralnie, <span className="italic font-normal">z widokiem</span>.</>}
            className="max-w-2xl mb-14 reveal"
          />
          <article className="reveal-lg card-lift group bg-cream rounded-sm overflow-hidden grid grid-cols-1 md:grid-cols-2">
            <div className="relative overflow-hidden min-h-[280px] md:min-h-0" style={{ aspectRatio: '4/3' }}>
              <img src={PHOTOS.roomBirch} alt="Pokój z drewnianym łóżkiem i ścianą z brzozowych pni — Willa Wójcik" loading="lazy" decoding="async"
                   width="1600" height="1200"
                   className="absolute inset-0 w-full h-full object-cover zoom-img" />
            </div>
            <div className="p-8 md:p-12 flex flex-col">
              <div className="eyebrow text-charcoal/65 mb-2.5">Pokój · 21 m² · 2–3 osoby</div>
              <h3 className="font-serif text-charcoal text-2xl md:text-3xl leading-tight" style={{ fontWeight: 500 }}>Pokoje 2–3 osobowe</h3>
              <p className="mt-4 text-charcoal/70 text-[15px] leading-relaxed text-pretty">
                Każdy z ośmiu pokoi ma własną łazienkę i wyjście na balkon albo taras.
                W pokoju: lodówka, czajnik, TV-SAT i szybkie WiFi.
              </p>
              <ul className="mt-6 flex flex-col gap-y-3">
                {FEATURES.map((f) => (
                  <li key={f} className="flex items-baseline gap-3 text-charcoal/75 text-[14.5px]">
                    <span className="w-3 h-px bg-gold/70 shrink-0 translate-y-[-3px]" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="hairline my-8" />
              <div className="mt-auto flex items-end justify-between gap-5 flex-wrap">
                <div>
                  <div className="font-serif text-forest leading-none" style={{ fontSize: 'clamp(28px, 3.2vw, 40px)', fontWeight: 500 }}>
                    od 210 zł
                  </div>
                  <div className="eyebrow text-charcoal/65 mt-1.5 text-[10px]">za dobę</div>
                </div>
                <Button href="/kontakt" size="sm">Zapytaj o termin</Button>
              </div>
            </div>
          </article>
          <p className="reveal mt-8 text-charcoal/70 text-[13.5px] max-w-2xl">
            Cena zależy od sezonu i długości pobytu — stawkę potwierdzamy przy rezerwacji.
            Zaliczka 30% w ciągu 2 dni od potwierdzenia.
          </p>
        </Container>
      </section>

      {/* Kuchnia wspólna */}
      <section className="relative bg-cream py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-5 reveal">
              <div className="relative overflow-hidden rounded-sm" style={{ aspectRatio: '4/3' }}>
                <img src={PHOTOS.kitchen} alt="Wspólna kuchnia z jadalnią w Willi Wójcik" loading="lazy" decoding="async"
                     width="1600" height="1200"
                     className="absolute inset-0 w-full h-full object-cover" />
              </div>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 reveal" style={{ '--d': '.1s' }}>
              <SectionHeading eyebrow="03 — Kuchnia wspólna" title={<>45 m² kuchni <span className="italic font-normal">do Państwa dyspozycji</span>.</>} />
              <div className="mt-6 space-y-4 text-charcoal/75 text-[16px] leading-[1.8] text-pretty max-w-xl">
                <p>
                  Płyty grzewcze, piekarnik, lodówki, pełen komplet naczyń i duży stół
                  mieszczą się w jednej przestrzeni połączonej z jadalnią. Śniadanie robią
                  Państwo po swojemu, obiad po górskiej wędrówce też.
                </p>
                <p>
                  Latem mają Państwo do dyspozycji także altanę z grillem w ogrodzie —
                  wieczorem z widokiem na Pieniny.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Cross-link do apartamentów */}
      <section className="relative bg-cream-2 py-14 md:py-16">
        <Container>
          <div className="reveal flex items-baseline justify-between gap-6 flex-wrap">
            <p className="text-charcoal/75 text-[16px] max-w-xl text-pretty">
              Więcej osób albo dłuższy pobyt? Dwa apartamenty z aneksem kuchennym
              pomieszczą do 6 osób — w tym wolnostojący 60 m² tylko dla Państwa.
            </p>
            <Link href="/apartamenty" className="inline-flex items-center gap-1.5 text-forest text-[14px] font-semibold group/l whitespace-nowrap hover:text-forest-2 transition-colors">
              Apartamenty z balkonem na Trzy Korony
              <IconArrowUp size={15} className="transition-transform group-hover/l:translate-x-0.5 group-hover/l:-translate-y-0.5" />
            </Link>
          </div>
        </Container>
      </section>

      <AmenitiesSection number="04" className="bg-cream" />
      <RulesSection />
      <CTASection />
    </>
  )
}
