import { Link } from 'wouter'

// Odesłanie do pełnej galerii spod siatki zdjęć na /apartamenty i /pokoje.
// Ten sam idiom wizualny co link pod galerią na stronie głównej
// (components/Gallery.jsx), tylko w wersji na jasne tło (cream-2 / stone).
//
// Anchor text niesie nazwę obiektu zamiast „kliknij tutaj" — link wewnętrzny
// ma wskazywać encję, zob. .claude/rules/on-page-seo.md (Internal Graph).
export function GalleryLink({ label = 'Zobacz pełną galerię Willi Wójcik', className = '' }) {
  return (
    <div className={`reveal mt-10 ${className}`}>
      <Link href="/galeria"
            className="group inline-flex items-center gap-3 eyebrow text-charcoal/70 hover:text-charcoal transition-colors">
        <span className="border-b border-gold/60 group-hover:border-gold pb-1 transition-colors">
          {label}
        </span>
        <span aria-hidden="true" className="text-gold transition-transform duration-500 group-hover:translate-x-1">→</span>
      </Link>
    </div>
  )
}
