import { Container } from './Container.jsx'
import { Breadcrumbs } from './Breadcrumbs.jsx'
import { useHeroStage } from '../../lib/useHeroStage.js'

// Nagłówek podstrony — ten sam język co hero na home: obraz (zdjęcie lub
// ilustracja) + system overlayów (scrim pod nav, pionowy scrim pod kolumną
// tekstu, dociążony dół) + choreografia wejścia. Bez obrazu: plansza forest.
// `eyebrow` przyjmujemy dla kompatybilności, ale nie renderujemy (decyzja
// z home: mniej rzeczy nad nagłówkiem; kontekst dają okruszki).
export function PageHero({ title, subtitle, image, imageAlt = '', crumbs, children, eyebrow: _ignored }) {
  const on = useHeroStage()
  return (
    <section className={`hero-stage ${on ? 'on' : ''} relative bg-charcoal text-cream overflow-hidden`}>
      {image
        ? <img
            src={image} alt={imageAlt}
            width="1920" height="1278"
            fetchPriority="high" decoding="async"
            className="hero-photo absolute inset-0 w-full h-full object-cover object-[62%_42%]"
          />
        : <div className="absolute inset-0 bg-forest" />}

      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(8,16,12,0.5) 0%, rgba(8,16,12,0.16) 26%, transparent 46%)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(8,14,11,0.6) 0%, rgba(8,14,11,0.32) 36%, rgba(8,14,11,0.06) 58%, transparent 72%)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 46%, rgba(9,15,12,0.4) 72%, rgba(7,13,10,0.84) 100%)' }} />
      <div className={`absolute inset-0 grain pointer-events-none ${image ? 'opacity-20' : 'opacity-50'}`} />

      <Container className="relative min-h-[56svh] md:min-h-[62svh] flex flex-col justify-end pt-36 md:pt-44 pb-12 md:pb-16">
        {crumbs && (
          <div className="hero-el" style={{ '--d': '.05s' }}>
            <Breadcrumbs items={crumbs} tone="light" className="mb-6" />
          </div>
        )}
        <h1 className="hero-el font-serif text-cream leading-[1.0] text-balance max-w-4xl"
            style={{ fontSize: 'clamp(40px, 5.8vw, 84px)', fontWeight: 500, '--d': '.12s' }}>
          {title}
        </h1>
        {subtitle && (
          <p className="hero-el mt-6 text-cream/85 text-[16px] md:text-lg leading-[1.75] max-w-2xl text-pretty"
             style={{ '--d': '.2s' }}>
            {subtitle}
          </p>
        )}
        {children && <div className="hero-el mt-8" style={{ '--d': '.28s' }}>{children}</div>}
      </Container>
    </section>
  )
}
