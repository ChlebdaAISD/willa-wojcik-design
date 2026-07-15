import { PHOTOS, APARTMENTS } from '../data/content.js'
import { Button } from './ui/Button.jsx'

// Liczby (metraże, pojemność) zgodne z references/stats.md i realnymi opisami
// apartamentów od właściciela (2026-07). Ceny apartamentów = placeholder „od XXXX zł"
// (właściciel nie podał stawek). Pokoje „od 210 zł" ze stats.md.
export function Apartments() {
  const cards = [
    {
      kind: 'Apartament',
      title: 'Apartamenty',
      href: '/apartamenty',
      price: 'od XXXX zł',
      sqm: '38–60 m²',
      img: APARTMENTS[1].cover,
      alt: 'Wnętrze wolnostojącego apartamentu z antresolą i ścianką z brzozowych pni — Willa Wójcik',
      features: [
        'Dwa apartamenty: 38 m² i wolnostojący 60 m²',
        'W pełni wyposażony aneks kuchenny',
        'Balkon z widokiem na Trzy Korony',
        'Własna łazienka, TV-SAT, WiFi',
        'Większy apartament — miejsca dla 6 osób',
      ],
    },
    {
      kind: 'Pokój',
      title: 'Pokoje 2–3 osobowe',
      href: '/pokoje',
      price: 'od 210 zł',
      sqm: '21 m²',
      img: PHOTOS.roomBirch,
      alt: 'Pokój z łóżkiem z drewna i ścianą z brzozowych pni — Willa Wójcik',
      features: [
        'Balkon lub taras',
        'Własna łazienka',
        'Lodówka, TV-SAT, WiFi',
        'Pościel i ręczniki w cenie',
        'Dostęp do wspólnej kuchni 45 m²',
      ],
    },
  ]
  return (
    <section id="apartamenty" data-screen-label="04 Apartamenty" className="relative bg-cream-2 py-24 md:py-36">
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
              Dziesięć jednostek, 35 miejsc — każda z balkonem albo tarasem i własną łazienką.
              Wybór zależy od liczby osób i od tego, czy gotują Państwo na miejscu.
            </p>
          </div>
          <div className="reveal eyebrow text-charcoal/65 hidden md:block" style={{ '--d': '.15s' }}>
            2 apartamenty · 8 pokoi
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {cards.map((c, i) => (
            <article key={c.href} className="reveal-lg card-lift group bg-cream rounded-sm overflow-hidden flex flex-col"
                     style={{ '--d': `${i * 0.12}s` }}>
              <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                <img src={c.img} alt={c.alt} loading="lazy" decoding="async"
                     width="1920" height="1440"
                     className="absolute inset-0 w-full h-full object-cover zoom-img" />
              </div>
              <div className="p-8 md:p-10 flex flex-col flex-1">
                <div className="eyebrow text-charcoal/65 mb-2.5">{c.kind} · {c.sqm}</div>
                <h3 className="font-serif text-charcoal text-3xl md:text-4xl leading-tight" style={{ fontWeight: 500 }}>{c.title}</h3>
                <ul className="mt-6 flex flex-col gap-y-3">
                  {c.features.map((f) => (
                    <li key={f} className="flex items-baseline gap-3 text-charcoal/75 text-[14.5px]">
                      <span className="w-3 h-px bg-gold/70 shrink-0 translate-y-[-3px]" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="hairline my-8"></div>
                <div className="mt-auto flex items-end justify-between gap-5 flex-wrap">
                  <div>
                    <div className="font-serif text-forest leading-none" style={{ fontSize: 'clamp(30px, 3.4vw, 44px)', fontWeight: 500 }}>
                      {c.price}
                    </div>
                    <div className="eyebrow text-charcoal/65 mt-1.5 text-[10px]">za dobę</div>
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <Button href="#kontakt" size="sm">Zarezerwuj</Button>
                    <Button href={c.href} size="sm" variant="ghostDark">Szczegóły</Button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="reveal mt-8 text-charcoal/65 text-[13px]">
          Ceny orientacyjne, zależne od sezonu i długości pobytu — stawkę potwierdzimy przy rezerwacji. Zaliczka 30%.
        </p>
      </div>
    </section>
  )
}
