import { Link } from 'wouter'
import { PageHero } from '../components/ui/PageHero.jsx'
import { Container } from '../components/ui/Container.jsx'
import { SectionHeading } from '../components/ui/SectionHeading.jsx'
import { Button } from '../components/ui/Button.jsx'
import { CTASection } from '../components/ui/CTASection.jsx'
import { GalleryGrid } from '../components/ui/GalleryGrid.jsx'
import { GalleryLink } from '../components/ui/GalleryLink.jsx'
import { AmenitiesSection, RulesSection } from '../components/StaySections.jsx'
import { IconArrowUp } from '../components/Icons.jsx'
import { PHOTOS, APARTMENTS, ROOMS } from '../data/content.js'
import { SITE } from '../data/site.js'

export default function Apartamenty() {
  return (
    <>
      <PageHero
        title="Apartamenty w Sromowcach Niżnych"
        image={PHOTOS.heroApartamenty}
        imageAlt="Ilustracja: wnętrze wolnostojącego apartamentu Willi Wójcik — góralskie łóżko za ścianką z brzóz, salon i widok na zielone wzgórza"
        crumbs={[{ label: 'Strona główna', href: '/' }, { label: 'Apartamenty' }]}
      />

      {/* Intro */}
      <section className="relative bg-cream py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-7 reveal">
              <SectionHeading eyebrow="01 — Dla rodzin i grup" title={<>Trzy apartamenty: <span className="italic font-normal">35, 38 i 60 m²</span>.</>} />
              <div className="mt-6 space-y-4 text-charcoal/75 text-[17px] leading-[1.8] text-pretty max-w-xl">
                <p>
                  Każdy z trzech apartamentów ma własny aneks kuchenny i balkon zwrócony
                  na Trzy Korony. Apartamenty 1 i 2 — 38 i 35 m² — mają osobną sypialnię
                  oraz salon z rozkładaną sofą, śpią w nich cztery osoby. Apartament 3 to
                  60 m² w wolnostojącym budynku, dla sześciu osób, bez sąsiadów za ścianą.
                </p>
                <p>
                  Śniadania przygotowują Państwo u siebie — w aneksie kuchennym albo
                  we wspólnej kuchni o powierzchni 45 m².
                </p>
                <p>
                  Kładka na Słowację stoi 250 m od furtki, szlak na Trzy Korony zaczyna się
                  15 minut pieszo od domu, a przystań spływu Dunajcem leży w tej samej wsi.
                </p>
              </div>
            </div>
            <div className="lg:col-span-4 lg:col-start-9 reveal" style={{ '--d': '.12s' }}>
              <div className="grid grid-cols-3 lg:grid-cols-1 gap-6 lg:gap-5 lg:border-l lg:border-charcoal/15 lg:pl-8">
                {[['3', 'apartamenty'], ['4–6', 'osób w apartamencie'], ['4,9', 'ocena w Google (135 opinii)']].map(([n, l]) => (
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

      {/* Apartamenty 1–3 — każdy we własnej sekcji, w tym samym układzie: oszczędny
          nagłówek (sam numer), metraż, intro w jednej kolumnie, cechy w dwóch,
          cena z przyciskiem, na końcu galeria. Tła naprzemienne cream-2 / stone —
          ten sam rytm co na pozostałych podstronach pobytu. */}
      {APARTMENTS.map((apt, i) => {
        // W danych cena brzmi „450 zł za dobę" — podpis „za dobę" niesie osobny wiersz,
        // więc ucinamy końcówkę, żeby nie powtórzyć jej dwa razy pod sobą.
        const perNight = apt.price.replace(/\s*za dobę\s*$/i, '')
        return (
          <section key={apt.id} id={apt.id}
                   className={`relative scroll-mt-24 py-24 md:py-36 ${i % 2 === 1 ? 'bg-stone' : 'bg-cream-2'}`}>
            <Container>
              <div className="max-w-3xl reveal">
                <SectionHeading eyebrow={String(i + 2).padStart(2, '0')} title={apt.name} />
                <div className="eyebrow mt-5 text-[10.5px] text-charcoal/65">{apt.meta}</div>
                <p className="mt-6 text-[17px] leading-[1.85] text-pretty text-charcoal/75">
                  {apt.intro}
                </p>
              </div>

              <ul className="reveal mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4 max-w-3xl" style={{ '--d': '.08s' }}>
                {apt.features.map((f) => (
                  <li key={f} className="flex items-baseline gap-3 text-[14.5px] leading-snug text-charcoal/80">
                    <span className="w-3 h-px bg-gold/70 shrink-0 translate-y-[-3px]" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="reveal mt-12 md:mt-14 flex items-end justify-between gap-6 flex-wrap max-w-3xl" style={{ '--d': '.14s' }}>
                <div>
                  <div className="font-serif leading-none text-forest"
                       style={{ fontSize: 'clamp(28px, 3.2vw, 40px)', fontWeight: 500 }}>
                    {perNight}
                  </div>
                  <div className="eyebrow mt-1.5 text-[10px] text-charcoal/65">za dobę</div>
                </div>
                <Button href="/kontakt" size="sm">Zapytaj o termin</Button>
              </div>

              <GalleryGrid photos={apt.photos} className="mt-14 md:mt-20" hideThumbLabels />
              <GalleryLink />

              {i === APARTMENTS.length - 1 && (
                <p className="reveal mt-12 text-[13.5px] max-w-2xl text-charcoal/70">
                  Stawkę na wybrany termin i dostępność potwierdzamy telefonicznie albo mailem —
                  prosimy o kontakt. Rezerwację potwierdza zaliczka 30% wartości pobytu, resztę płacą
                  Państwo w dniu przyjazdu. Do ceny doliczamy opłatę miejscową: {SITE.localFee}.
                </p>
              )}
            </Container>
          </section>
        )
      })}

      {/* Cross-link do pokoi */}
      <section className="relative bg-cream py-14 md:py-16">
        <Container>
          <div className="reveal flex items-baseline justify-between gap-6 flex-wrap">
            <p className="text-charcoal/75 text-[16px] max-w-xl text-pretty">
              Podróżują Państwo we dwoje albo we troje? Każdy z ośmiu pokoi ma 21 m²,
              własną łazienkę i wyjście na balkon albo taras. Doba kosztuje {ROOMS.priceNote}.
            </p>
            <Link href="/pokoje" className="inline-flex items-center gap-1.5 text-forest text-[14px] font-semibold group/l whitespace-nowrap hover:text-forest-2 transition-colors">
              Pokoje 2–3 osobowe
              <IconArrowUp size={15} className="transition-transform group-hover/l:translate-x-0.5 group-hover/l:-translate-y-0.5" />
            </Link>
          </div>
        </Container>
      </section>

      <AmenitiesSection number="05" className="bg-cream-2" />
      <RulesSection />
      <CTASection />
    </>
  )
}
