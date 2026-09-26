import { APARTMENTS, ROOMS } from '../data/content.js'
import { obraz } from '../lib/obrazy.js'
import { Button } from './ui/Button.jsx'
import { SITE } from '../data/site.js'

// Metraże, pojemność i ceny mają jedno źródło: src/data/content.js (dane od
// właścicielki z 14.09.2026). W tym pliku nie powtarzamy żadnej z tych liczb.
// Pokoje 1–8 idą jako jedna karta — wszystkie mają identyczne wyposażenie,
// różni je tylko balkon (piętro) albo taras (parter).
const UNITS = [
  ...APARTMENTS.map((apt) => ({ ...apt, href: '/apartamenty' })),
  { ...ROOMS, href: '/pokoje' },
]

// Alt bierzemy z podpisu tego samego zdjęcia w galerii jednostki — jeden opis
// do utrzymania zamiast dwóch.
function coverAlt(unit) {
  const photo = unit.photos.find((p) => p.src === unit.cover)
  return photo ? photo.label : `${unit.name} — Willa Wójcik, Sromowce Niżne`
}

// Na kartę wystarczy pierwsze zdanie intro; całość czeka na podstronie.
function lead(intro) {
  const end = intro.indexOf('. ')
  return end === -1 ? intro : intro.slice(0, end + 1)
}

export function Apartments() {
  return (
    <section id="apartamenty" data-screen-label="04 Apartamenty" className="relative bg-cream-2 scroll-mt-24 py-24 md:py-36">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-14 md:mb-18">
          <div className="max-w-2xl reveal">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-gold"></span>
              <span className="eyebrow text-charcoal/70">02 — Nocleg</span>
            </div>
            <h2 className="font-serif text-charcoal leading-[1.05]"
                style={{ fontSize: 'clamp(36px, 4.6vw, 62px)', fontWeight: 500 }}>
              Apartamenty <span className="italic font-normal">i pokoje</span>.
            </h2>
            <p className="mt-6 text-charcoal/70 text-[17px] leading-[1.8] text-pretty max-w-lg">
              Do wyboru są trzy apartamenty z własnym aneksem kuchennym i osiem pokoi dla dwóch
              albo trzech osób. Każda jednostka ma balkon albo taras i własną łazienkę. Śniadania
              przygotowują Państwo we własnym zakresie — w aneksie albo we wspólnej kuchni
              o powierzchni 45 m².
            </p>
          </div>
          {/* 8 = pokoje 1–8 z ROOMS; liczba apartamentów wprost z danych */}
          <div className="reveal eyebrow text-charcoal/65 hidden md:block" style={{ '--d': '.15s' }}>
            {APARTMENTS.length} apartamenty, 8 pokoi
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
          {UNITS.map((u, i) => (
            <article key={u.id} className="reveal-lg card-lift group bg-cream rounded-sm overflow-hidden flex flex-col"
                     style={{ '--d': `${i * 0.1}s` }}>
              <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                <img {...obraz(u.cover, '(min-width: 1280px) 330px, (min-width: 640px) 50vw, 100vw')}
                     alt={coverAlt(u)} loading="lazy" decoding="async"
                     className="absolute inset-0 w-full h-full object-cover zoom-img" />
              </div>
              <div className="p-7 md:p-8 flex flex-col flex-1">
                <div className="eyebrow text-charcoal/65 text-[10.5px] mb-2.5">{u.meta}</div>
                <h3 className="font-serif text-charcoal text-[26px] md:text-[30px] leading-tight" style={{ fontWeight: 500 }}>
                  {u.name}
                </h3>
                <p className="mt-4 text-charcoal/75 text-[14.5px] leading-[1.75] text-pretty">
                  {lead(u.intro)}
                </p>
                <div className="mt-auto pt-7">
                  <div className="hairline mb-7"></div>
                  <div className="flex items-end justify-between gap-4 flex-wrap">
                    <div>
                      <div className="font-serif text-forest leading-none text-[24px] md:text-[27px]" style={{ fontWeight: 500 }}>
                        {u.price}
                      </div>
                      {u.priceNote && (
                        <div className="text-charcoal/70 text-[12.5px] leading-snug mt-2">{u.priceNote}</div>
                      )}
                    </div>
                    <Button href={u.href} size="sm" variant="ghostDark">Szczegóły</Button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="reveal mt-10 md:mt-14 flex items-end justify-between gap-6 flex-wrap">
          <p className="text-charcoal/65 text-[13px] leading-[1.8] max-w-xl">
            Śniadania we własnym zakresie. Rezerwację potwierdza zaliczka 30%, resztę płacą Państwo
            w dniu przyjazdu. Do ceny doliczamy opłatę miejscową: {SITE.localFee}.
          </p>
          <Button href="#kontakt" size="sm">Zapytaj o termin</Button>
        </div>
      </div>
    </section>
  )
}
