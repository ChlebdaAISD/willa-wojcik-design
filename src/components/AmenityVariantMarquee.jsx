import { AMENITIES } from '../data/content.js'
import { ICONS } from './Icons.jsx'

export function AmenityVariantMarquee() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
      <aside className="lg:col-span-4 reveal">
        <div className="sticky top-28">
          <div className="eyebrow text-charcoal/50 mb-4">Rozdział 05</div>
          <div className="font-serif text-charcoal italic leading-[0.95]"
               style={{ fontSize: 'clamp(72px, 9vw, 140px)', fontWeight: 340 }}>
            Detale.
          </div>
          <div className="mt-6 h-px w-16 bg-gold"/>
          <p className="mt-6 text-charcoal/65 text-[15px] leading-[1.8] max-w-[30ch]">
            Dziewięć drobiazgów, które sprawią, że poczują się Państwo jak w domu.
            Każdy z nich pomyślany, nie przypadkowy.
          </p>
        </div>
      </aside>
      <div className="lg:col-span-8">
        <div className="space-y-1">
          {AMENITIES.map((a, i) => {
            const I = ICONS[a.icon]
            return (
              <article key={i}
                       className="reveal group grid grid-cols-[auto_1fr_auto] items-baseline gap-6 md:gap-10 py-6 md:py-7 border-b border-charcoal/15 transition-all hover:pl-4 hover:border-forest/40">
                <div className="font-serif text-forest/60 tabular-nums leading-none group-hover:text-forest transition-colors"
                     style={{ fontSize: 'clamp(28px, 3.2vw, 44px)', fontWeight: 360 }}>
                  .{String(i + 1).padStart(2, '0')}
                </div>
                <div className="min-w-0">
                  <div className="font-serif text-charcoal leading-tight"
                       style={{ fontSize: 'clamp(22px, 2.4vw, 32px)', fontWeight: 460 }}>
                    {a.title}
                  </div>
                  <div className="text-charcoal/55 text-[13.5px] mt-1.5 leading-relaxed max-w-md">
                    {a.note}
                  </div>
                </div>
                <I size={20} stroke={1.2} className="text-charcoal/35 group-hover:text-gold transition-colors self-center shrink-0"/>
              </article>
            )
          })}
        </div>
      </div>
    </div>
  )
}
