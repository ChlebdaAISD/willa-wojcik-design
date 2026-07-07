import { SITE } from '../../data/site.js'
import { IconStar } from '../Icons.jsx'

// Pasek dowodu społecznego — trzy realne oceny. tone: 'dark' (na jasnym) / 'light' (na ciemnym).
export function TrustStrip({ tone = 'dark', className = '' }) {
  const isLight = tone === 'light'
  const big = isLight ? 'text-cream' : 'text-charcoal'
  const lab = isLight ? 'text-cream/60' : 'text-charcoal/55'
  const line = isLight ? 'bg-cream/20' : 'bg-charcoal/15'

  const stats = [
    { big: SITE.ratingGoogle, small: '★', label: `Google · ${SITE.reviewsGoogle} opinii` },
    { big: SITE.ratingBooking, small: '/10', label: 'Booking · „Guest Choice”' },
    { big: SITE.ratingNocowanie, small: '/10', label: 'nocowanie.pl' },
  ]

  return (
    <div className={`flex flex-wrap items-center gap-x-8 gap-y-5 ${className}`}>
      {stats.map((s, i) => (
        <div key={s.label} className="flex items-center gap-8">
          <div>
            <div className="flex items-baseline gap-1">
              <span className={`font-serif ${big} text-3xl md:text-4xl leading-none`} style={{ fontWeight: 420 }}>{s.big}</span>
              <span className={`${lab} text-sm`}>{s.small}</span>
              {i === 0 && (
                <span className="flex items-center gap-0.5 text-gold ml-1.5">
                  <IconStar size={15} stroke={1.2} />
                </span>
              )}
            </div>
            <div className={`eyebrow ${lab} text-[10.5px] mt-2`}>{s.label}</div>
          </div>
          {i < stats.length - 1 && <span className={`hidden sm:block w-px h-10 ${line}`} aria-hidden="true" />}
        </div>
      ))}
    </div>
  )
}
