import { PHOTOS } from '../data/content.js'
import { IconArrow, IconArrowUp } from './Icons.jsx'

export function Apartments() {
  const cards = [
    {
      kind: 'Apartament',
      title: 'Apartamenty 4–5 osobowe',
      price: 'od 420 zł / doba',
      sqm: '~42 m²',
      img: PHOTOS.apartment,
      features: [
        'Własna łazienka',
        'Aneks kuchenny z lodówką',
        'TV-SAT, szybkie WiFi',
        'Balkon z widokiem na Trzy Korony',
        'Salon z sypialnią',
      ],
    },
    {
      kind: 'Pokój',
      title: 'Pokoje 2–3 osobowe',
      price: 'od 240 zł / doba',
      sqm: '~24 m²',
      img: PHOTOS.roomBirch,
      features: [
        'Własna łazienka',
        'Lodówka, TV-SAT, WiFi',
        'Balkon lub taras',
        'Pościel i ręczniki',
        'Dostęp do wspólnej kuchni',
      ],
    },
  ]
  return (
    <section id="apartamenty" data-screen-label="04 Apartamenty" className="relative bg-cream-2 py-24 md:py-40">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-16 md:mb-20">
          <div className="reveal max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-gold"></span>
              <span className="eyebrow text-charcoal/60">Nocleg</span>
            </div>
            <h2 className="font-serif text-charcoal leading-[1.05]"
                style={{ fontSize: 'clamp(36px, 4.6vw, 62px)', fontWeight: 450 }}>
              Apartamenty <span className="italic font-[380]">i pokoje</span>.
            </h2>
            <p className="mt-6 text-charcoal/70 text-[17px] leading-[1.8] text-pretty max-w-lg">
              Dwa formaty pobytu — każdy z balkonem i własną łazienką.
              Wybór zależy od tego, na jak długo Państwo zostają i czy gotują na miejscu.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {cards.map((c, i) => (
            <article key={i} className="reveal-lg card-lift group bg-cream rounded-sm overflow-hidden"
                     style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                <div className="absolute inset-0 zoom-img bg-cover bg-center"
                     style={{ backgroundImage: `url(${c.img})` }} />
                <div className="absolute inset-0" style={{
                  background: 'linear-gradient(180deg, rgba(28,28,28,0) 50%, rgba(28,28,28,0.55) 100%)'
                }}/>
                <div className="absolute top-5 left-5 flex items-center gap-3">
                  <span className="px-3 py-1.5 rounded-full bg-cream/95 text-forest eyebrow text-[11px]">{c.kind}</span>
                  <span className="px-3 py-1.5 rounded-full bg-charcoal/40 backdrop-blur-md text-cream eyebrow text-[11px]">{c.sqm}</span>
                </div>
                <div className="absolute bottom-5 right-5 text-cream eyebrow text-[11px]">{c.price}</div>
              </div>
              <div className="p-8 md:p-10">
                <h3 className="font-serif text-charcoal text-3xl md:text-4xl leading-tight">{c.title}</h3>
                <ul className="mt-6 flex flex-col gap-y-3">
                  {c.features.map((f) => (
                    <li key={f} className="text-charcoal/75 text-[14.5px]">{f}</li>
                  ))}
                </ul>
                <div className="hairline my-8"></div>
                <div className="flex items-center justify-between">
                  <a href="#kontakt"
                     className="btn-prim inline-flex items-center gap-2 px-6 py-3 rounded-full text-[13px] tracking-wide whitespace-nowrap shrink-0">
                    Zarezerwuj <IconArrow size={14} />
                  </a>
                  <a href="#galeria" className="inline-flex items-center gap-1.5 text-charcoal/70 text-[13px] group/l">
                    Zobacz wnętrza
                    <IconArrowUp size={14} className="transition-transform group-hover/l:translate-x-0.5 group-hover/l:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
