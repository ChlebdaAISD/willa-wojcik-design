import { Link } from 'wouter'

// Okruszki. items: [{label, href?}] — ostatni bez href = bieżąca strona.
// Wersja wizualna; BreadcrumbList JSON-LD wstrzykuje prerender z routesMeta.breadcrumb.
export function Breadcrumbs({ items, tone = 'light', className = '' }) {
  const base = tone === 'light' ? 'text-cream/70' : 'text-charcoal/70'
  const hover = tone === 'light' ? 'hover:text-cream' : 'hover:text-charcoal'
  const current = tone === 'light' ? 'text-cream/90' : 'text-charcoal/90'
  const sep = tone === 'light' ? 'text-cream/40' : 'text-charcoal/40'
  return (
    <nav aria-label="Ścieżka nawigacji" className={`flex flex-wrap items-center gap-2 font-mono text-[12px] ${base} ${className}`}>
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-2">
          {it.href
            ? <Link href={it.href} className={`${hover} transition-colors`}>{it.label}</Link>
            : <span className={current}>{it.label}</span>}
          {i < items.length - 1 && <span className={sep} aria-hidden="true">/</span>}
        </span>
      ))}
    </nav>
  )
}
