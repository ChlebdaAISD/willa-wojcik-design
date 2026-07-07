import { Link } from 'wouter'
import { IconArrow } from '../Icons.jsx'

// Karta ze zdjęciem + gradientem + tytułem. Klikalna (Link/anchor) lub statyczna.
// Używana m.in. w sekcji „Okolica" i kartach atrakcji.
export function ImageCard({
  image, eyebrow, title, note, href, cta,
  aspect = 'aspect-[4/5]', arrow = false, className = '',
}) {
  const inner = (
    <>
      <div className="absolute inset-0 zoom-img bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, rgba(28,28,28,0.10) 0%, rgba(28,28,28,0.5) 55%, rgba(28,28,28,0.92) 100%)',
      }} />
      <div className="absolute inset-x-0 bottom-0 p-6">
        {eyebrow && <div className="eyebrow text-cream/70 text-[10px] mb-2">{eyebrow}</div>}
        <div className="flex items-end justify-between gap-3">
          <div className="font-serif text-cream text-xl md:text-2xl leading-tight">{title}</div>
          {arrow && <IconArrow size={18} className="text-gold shrink-0 mb-1 transition-transform group-hover:translate-x-1" />}
        </div>
        {note && <div className="text-cream/70 text-[13px] mt-2 leading-snug">{note}</div>}
        {cta && (
          <div className="mt-4 inline-flex shrink-0 items-center gap-2 px-4 py-2 rounded-full text-[12.5px] font-semibold text-cream border border-cream/60 bg-charcoal/25 backdrop-blur-sm group-hover:bg-cream/15 transition-colors duration-300">
            {cta} <IconArrow size={13} className="transition-transform group-hover:translate-x-0.5" />
          </div>
        )}
      </div>
    </>
  )
  const cls = `card-lift group relative block overflow-hidden rounded-sm ${aspect} ${href ? 'cursor-pointer' : ''} ${className}`
  if (href && href.startsWith('/')) return <Link href={href} className={cls}>{inner}</Link>
  if (href) return <a href={href} className={cls}>{inner}</a>
  return <div className={cls}>{inner}</div>
}
