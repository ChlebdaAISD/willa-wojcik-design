import { Container } from './Container.jsx'
import { Breadcrumbs } from './Breadcrumbs.jsx'

// Nagłówek podstrony — ciemny pas pod fixed nav (obraz albo forest), okruszki + H1 + podtytuł.
// Daje nawigacji ciemne tło u góry, więc zachowanie nav jest spójne z home.
export function PageHero({ eyebrow, title, subtitle, image, crumbs, children }) {
  return (
    <section className="relative bg-charcoal text-cream overflow-hidden">
      {image
        ? <>
            <div className="absolute inset-0 kenburns bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(28,28,28,0.72) 0%, rgba(31,58,46,0.72) 100%)' }} />
          </>
        : <div className="absolute inset-0 bg-forest" />}
      <div className="absolute inset-0 grain opacity-50 pointer-events-none" />
      <Container className="relative pt-36 md:pt-44 pb-16 md:pb-24">
        {crumbs && <Breadcrumbs items={crumbs} tone="light" className="mb-6" />}
        <h1 className="font-serif text-cream leading-[1.02] text-balance"
            style={{ fontSize: 'clamp(38px, 6vw, 82px)', fontWeight: 420 }}>
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 text-cream/80 text-lg md:text-xl leading-relaxed max-w-2xl text-pretty">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </Container>
    </section>
  )
}
