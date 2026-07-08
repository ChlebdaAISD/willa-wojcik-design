import { AMENITIES, PHOTOS } from '../data/content.js'

export function AmenityVariantMarquee() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
      <aside className="lg:col-span-4 reveal">
        <div className="lg:sticky lg:top-28">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-px bg-gold"></span>
            <span className="eyebrow text-charcoal/70">03 — Udogodnienia</span>
          </div>
          <div className="font-serif text-charcoal italic leading-[0.95]"
               style={{ fontSize: 'clamp(64px, 8vw, 120px)', fontWeight: 400 }}>
            Detale.
          </div>
          <p className="mt-6 text-charcoal/65 text-[15px] leading-[1.8] max-w-[32ch]">
            Dziewięć drobiazgów, które sprawią, że poczują się Państwo jak w domu.
            Każdy z nich pomyślany, nie przypadkowy.
          </p>
          <figure className="mt-9 hidden lg:block">
            <div className="relative overflow-hidden rounded-sm" style={{ aspectRatio: '4/3' }}>
              <img src={PHOTOS.buildingDusk}
                   alt="Altana z grillem w ogrodzie Willi Wójcik — obok domek zabaw i zjeżdżalnia dla dzieci"
                   loading="lazy" decoding="async" width="1920" height="1441"
                   className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <figcaption className="mt-3 text-charcoal/65 text-[12.5px]">
              Altana z grillem i plac zabaw — w głębi ogrodu
            </figcaption>
          </figure>
        </div>
      </aside>
      <div className="lg:col-span-8">
        <div className="space-y-1">
          {AMENITIES.map((a, i) => (
            <article key={i}
                     className="reveal group grid grid-cols-[auto_1fr] items-baseline gap-6 md:gap-10 py-6 md:py-7 border-b border-charcoal/15 transition-all hover:pl-4 hover:border-forest/40"
                     style={{ '--d': `${(i % 3) * 0.07}s` }}>
              <div className="font-serif text-forest/60 tabular-nums leading-none group-hover:text-forest transition-colors"
                   style={{ fontSize: 'clamp(28px, 3.2vw, 44px)', fontWeight: 400 }}>
                .{String(i + 1).padStart(2, '0')}
              </div>
              <div className="min-w-0">
                <div className="font-serif text-charcoal leading-tight"
                     style={{ fontSize: 'clamp(22px, 2.4vw, 32px)', fontWeight: 500 }}>
                  {a.title}
                </div>
                <div className="text-charcoal/70 text-[13.5px] mt-1.5 leading-relaxed max-w-md">
                  {a.note}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
