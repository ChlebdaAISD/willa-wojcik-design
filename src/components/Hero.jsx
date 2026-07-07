import { useEffect, useState } from 'react'
import { PHOTOS } from '../data/content.js'
import { IconArrow } from './Icons.jsx'

// Hero: prawdziwe zdjęcie z drona (budynek + Trzy Korony), grade ku zieleni lasu
// na dole dla czytelności typografii. Choreografia wejścia sterowana klasą .on
// (style w index.css pod html[data-anim] — prerender/no-JS widzi wszystko od razu).
export function Hero() {
  const [on, setOn] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setOn(true))
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <section className={`hero-stage relative overflow-hidden bg-charcoal ${on ? 'on' : ''}`}
             style={{ minHeight: '100svh' }}>
      {/* Zdjęcie */}
      <img
        src={PHOTOS.exteriorWinter}
        alt="Willa Wójcik z lotu ptaka — w tle skalne szczyty Trzech Koron nad Sromowcami Niżnymi"
        width="1920" height="1278"
        fetchPriority="high" decoding="async"
        className="hero-photo absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: '62% 30%' }}
      />

      {/* Grade: scrim pod nawigację, zejście w zieleń lasu na dole, delikatny tint marki */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(12,17,11,0.52) 0%, rgba(12,17,11,0.14) 18%, transparent 32%)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 30%, rgba(13,20,16,0.42) 56%, rgba(10,16,12,0.95) 100%)' }} />
      {/* Winieta pod kolumną tekstu — czytelność na jasnych dachach */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(115% 85% at 16% 86%, rgba(10,16,12,0.62) 0%, rgba(10,16,12,0.3) 42%, transparent 66%)' }} />
      <div className="absolute inset-0" style={{ background: 'rgba(31,58,46,0.10)' }} />
      <div className="absolute inset-0 grain opacity-30 pointer-events-none" />

      {/* Treść */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 pt-40 md:pt-48 pb-16 md:pb-20 min-h-[100svh] flex flex-col justify-end">
        <div className="max-w-4xl">
          <div className="hero-el flex items-center gap-3 mb-7" style={{ '--d': '.05s' }}>
            <span className="w-8 h-px bg-gold" />
            <span className="eyebrow text-cream/80 text-[11px]">Sromowce Niżne · Pieniny</span>
          </div>

          <h1 className="font-serif text-cream text-balance leading-[0.98] font-medium"
              style={{ fontSize: 'clamp(46px, 7.6vw, 106px)' }}>
            <span className="hero-el block" style={{ '--d': '.12s' }}>Balkon z widokiem</span>
            <span className="hero-el block italic font-normal" style={{ '--d': '.2s', color: '#EADFC7' }}>
              na Trzy Korony.
            </span>
          </h1>

          <p className="hero-el mt-7 text-cream/85 text-[16px] md:text-[17px] leading-[1.75] max-w-xl text-pretty"
             style={{ '--d': '.28s' }}>
            Rodzinny pensjonat w Sromowcach Niżnych. Najkrótszy szlak na szczyt zaczyna się
            15 minut pieszo od furtki, kładka do Czerwonego Klasztoru — 250 metrów.
          </p>

          <div className="hero-el mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4"
               style={{ '--d': '.36s' }}>
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
               style={{ '--d': '.44s' }}>
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
             style={{ '--d': '.55s' }}>
          <span className="w-8 h-px bg-cream/30" />
          <span className="eyebrow text-cream/55 text-[10px]">Willa Wójcik i Trzy Korony — ujęcie z drona</span>
        </div>
      </div>
    </section>
  )
}
