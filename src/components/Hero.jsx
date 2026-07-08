import { PHOTOS } from '../data/content.js'
import { IconArrow } from './Icons.jsx'
import { useHeroStage } from '../lib/useHeroStage.js'

// Hero: ilustracja vintage Trzech Koron. Choreografia wejścia sterowana klasą .on
// (style w index.css pod html[data-anim] — prerender/no-JS widzi wszystko od razu).
export function Hero() {
  const on = useHeroStage()

  return (
    <section className={`hero-stage relative overflow-hidden bg-charcoal ${on ? 'on' : ''}`}
             style={{ minHeight: '100svh' }}>
      {/* Ilustracja vintage — ma własne ciemne niebo i ciemny lewy dolny róg,
          więc overlaye są dużo lżejsze niż przy zdjęciu */}
      <img
        src={PHOTOS.heroIllustration}
        alt="Ilustracja: skalna korona Trzech Koron nad zamgloną doliną Dunajca w Pieninach"
        width="2544" height="1456"
        fetchPriority="high" decoding="async"
        className="hero-photo absolute inset-0 w-full h-full object-cover object-[68%_42%] max-md:object-[44%_42%]"
      />

      {/* Ilustracja ma jasną mgłę i kremowe turnie w strefie tekstu — kolumna tekstu
          dostaje pionowy scrim od lewej, prawa strona (szczyty, rzeka) zostaje żywa */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(8,16,12,0.5) 0%, rgba(8,16,12,0.16) 18%, transparent 34%)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(8,14,11,0.66) 0%, rgba(8,14,11,0.36) 34%, rgba(8,14,11,0.08) 56%, transparent 70%)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 44%, rgba(9,15,12,0.38) 68%, rgba(7,13,10,0.86) 100%)' }} />
      {/* Mobile: wąski kadr trafia jasnymi turniami pod eyebrow/nagłówek — dodatkowe dociążenie górnej połowy */}
      <div className="absolute inset-0 md:hidden" style={{ background: 'linear-gradient(180deg, rgba(8,14,11,0.5) 0%, rgba(8,14,11,0.24) 42%, transparent 60%)' }} />
      <div className="absolute inset-0 grain opacity-15 pointer-events-none" />

      {/* Treść */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 pt-40 md:pt-48 pb-16 md:pb-20 min-h-[100svh] flex flex-col justify-end">
        <div className="max-w-4xl">
          <h1 className="font-serif text-cream text-balance leading-[0.98] font-medium"
              style={{ fontSize: 'clamp(46px, 7.6vw, 106px)' }}>
            <span className="hero-el block" style={{ '--d': '.08s' }}>Balkon z widokiem</span>
            <span className="hero-el block italic font-normal" style={{ '--d': '.16s', color: '#EADFC7' }}>
              na Trzy Korony.
            </span>
          </h1>

          <div className="hero-el mt-11 flex flex-col sm:flex-row items-start sm:items-center gap-4"
               style={{ '--d': '.28s' }}>
            <a href="#kontakt"
               className="inline-flex shrink-0 items-center gap-3 px-8 py-4 rounded-full text-[14px] font-semibold tracking-wide whitespace-nowrap bg-cream text-forest hover:bg-white transition-colors duration-300 shadow-lg shadow-charcoal/30">
              Sprawdź dostępność
              <IconArrow size={16} />
            </a>
            <a href="#apartamenty"
               className="btn-ghost inline-flex shrink-0 items-center gap-2 px-7 py-4 rounded-full text-[14px] font-semibold tracking-wide whitespace-nowrap backdrop-blur-sm">
              Zobacz apartamenty
            </a>
          </div>

          <div className="hero-el mt-12 flex flex-wrap items-center gap-x-8 gap-y-5 pt-7 border-t border-cream/20 max-w-2xl"
               style={{ '--d': '.38s' }}>
            <div className="flex items-baseline gap-2.5">
              <span className="font-serif text-cream text-3xl leading-none">4,9</span>
              <span className="eyebrow text-cream/75 text-[10.5px] leading-snug normal-case tracking-[0.14em]">/ 5 · Google<br/>135 opinii</span>
            </div>
            <div className="h-9 w-px bg-cream/25" />
            <div className="flex items-baseline gap-2.5">
              <span className="font-serif text-cream text-3xl leading-none">9,8</span>
              <span className="eyebrow text-cream/75 text-[10.5px] leading-snug normal-case tracking-[0.14em]">/ 10<br/>Booking.com</span>
            </div>
            <div className="h-9 w-px bg-cream/25 hidden sm:block" />
            <div className="hidden sm:flex items-baseline gap-2.5">
              <span className="font-serif text-cream text-3xl leading-none">10</span>
              <span className="eyebrow text-cream/75 text-[10.5px] leading-snug normal-case tracking-[0.14em]">/ 10<br/>nocowanie.pl</span>
            </div>
          </div>
        </div>

        {/* Podpis zdjęcia — sygnał autentyczności */}
        <div className="hero-el absolute bottom-7 right-12 hidden lg:flex items-center gap-3"
             style={{ '--d': '.48s' }}>
          <span className="w-8 h-px bg-cream/30" />
          <span className="eyebrow text-cream/70 text-[10px]">Trzy Korony nad przełomem Dunajca</span>
        </div>
      </div>
    </section>
  )
}
