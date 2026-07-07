import { Link } from 'wouter'
import { IconArrow } from '../Icons.jsx'

// Wstrzykuje JSON-LD do drzewa — renderToString łapie to do prerenderu.
export function JsonLd({ data }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

// Tabela faktów (etykieta → wartość). rows: [[label, value]]
export function FactTable({ rows, className = '' }) {
  return (
    <dl className={`border-y border-charcoal/12 ${className}`}>
      {rows.map(([k, v], i) => (
        <div key={i} className={`flex items-baseline justify-between gap-6 py-3.5 ${i > 0 ? 'border-t border-charcoal/10' : ''}`}>
          <dt className="text-charcoal/60 text-[14px] leading-snug">{k}</dt>
          <dd className="text-charcoal/90 text-[14.5px] font-medium text-right leading-snug">{v}</dd>
        </div>
      ))}
    </dl>
  )
}

// FAQ jako <div> (nie <details>) — lepsze dla SEO/AI-search. Opcjonalnie generuje FAQPage schema.
export function FAQ({ items, withSchema = true }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }
  return (
    <div className="border-t border-charcoal/12">
      {withSchema && <JsonLd data={schema} />}
      {items.map(({ q, a }) => (
        <div key={q} className="reveal py-6 border-b border-charcoal/10">
          <h3 className="font-serif text-charcoal text-xl md:text-[26px] leading-tight">{q}</h3>
          <p className="mt-3 text-charcoal/70 text-[15.5px] leading-relaxed text-pretty max-w-3xl">{a}</p>
        </div>
      ))}
    </div>
  )
}

// Callout z praktyczną wskazówką lub ostrzeżeniem.
export function InfoNote({ label = 'Dobrze wiedzieć', children, className = '' }) {
  return (
    <div className={`bg-cream border border-charcoal/10 border-l-[3px] border-l-gold rounded-sm p-6 ${className}`}>
      <div className="eyebrow text-gold-2 text-[10.5px] mb-2">{label}</div>
      <div className="text-charcoal/75 text-[15px] leading-relaxed text-pretty">{children}</div>
    </div>
  )
}

// Linki do powiązanych stron (internal graph). items: [{href, title, note}]
export function RelatedLinks({ title = 'Zobacz też', items }) {
  return (
    <section className="relative bg-cream-2 py-16 md:py-20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="eyebrow text-charcoal/50 mb-8">{title}</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map((it) => (
            <Link key={it.href} href={it.href}
                  className="group card-lift bg-cream rounded-sm p-6 flex items-start justify-between gap-4 border border-charcoal/8">
              <div>
                <div className="font-serif text-charcoal text-xl leading-tight">{it.title}</div>
                {it.note && <div className="text-charcoal/55 text-[13.5px] mt-1.5 leading-snug">{it.note}</div>}
              </div>
              <IconArrow size={18} className="text-gold shrink-0 mt-1 transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
