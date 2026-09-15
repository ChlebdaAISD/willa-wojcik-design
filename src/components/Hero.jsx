import { useState } from 'react'
import { PHOTOS } from '../data/content.js'
import { IconArrow } from './Icons.jsx'
import { useHeroStage } from '../lib/useHeroStage.js'
import { useHeroVideo } from '../lib/useHeroVideo.js'
import heroVideoPoster from '../assets/hero-video-poster.webp'
import heroOwner from '../assets/hero-owner.webp'
import heroOwnerMobile from '../assets/hero-owner-clean-mobile.webp'

// Hero: ujęcie z drona — Trzy Korony nad Sromowcami Niżnymi o zmierzchu
// (materiał właścicieli z 05.09.2025, 20-sekundowa pętla tam i z powrotem).
// Na telefonie i przy prefers-reduced-motion zostaje sam kadr — zob. useHeroVideo.
// Choreografia wejścia sterowana klasą .on (style w index.css pod html[data-anim]).
// TYMCZASOWY podgląd dla właściciela — pigułka w prawym górnym rogu hero,
// pod paskiem nawigacji. Usunąć razem z obsługą `source` w <Hero/>.
function HeroSourceSwitch({ value, onChange }) {
  const options = [['video', 'Wideo'], ['image', 'Obrazek']]
  return (
    <div className="absolute top-24 right-6 md:right-12 z-20 flex items-center gap-1 p-1
                    rounded-full bg-charcoal/55 backdrop-blur-md border border-cream/20"
         role="group" aria-label="Podgląd tła hero">
      {options.map(([key, label]) => (
        <button key={key} type="button" onClick={() => onChange(key)}
                aria-pressed={value === key}
                className={`inline-flex items-center justify-center min-h-12 min-w-12 px-5
                            rounded-full text-[12px] font-semibold tracking-wide
                            transition-colors duration-300 ${
                  value === key ? 'bg-cream text-forest' : 'text-cream/80 hover:text-cream'
                }`}>
          {label}
        </button>
      ))}
    </div>
  )
}

export function Hero() {
  const on = useHeroStage()
  const playVideo = useHeroVideo()
  // TYMCZASOWE (do decyzji właściciela): przełącznik tła hero — ujęcie z drona
  // kontra grafika wygenerowana przez właściciela. Do usunięcia razem z
  // <HeroSourceSwitch/> i importem heroOwner, gdy wariant zostanie wybrany.
  const [source, setSource] = useState('video')
  const showVideo = playVideo && source === 'video'

  return (
    <section className={`hero-stage relative overflow-hidden bg-charcoal ${on ? 'on' : ''}`}
             style={{ minHeight: '100svh' }}>
      {/* Plakat leży pod spodem także przy odtwarzaniu — zakrywa moment,
          w którym wideo jest jeszcze buforowane (to dokładnie jego pierwsza klatka) */}
      {source === 'image' ? (
        // Na telefonie kadr pionowy BEZ wypalonego logotypu — w wersji szerokiej
        // logo zasłaniało pół ekranu i biło się z nagłówkiem. Logotyp zdjęty
        // z nieba modelem edycyjnym, plik `hero-owner-clean.webp` to ten sam
        // kadr w poziomie, gdyby wersja bez logo miała pójść też na desktop.
        <picture>
          <source media="(max-width: 767px)" srcSet={heroOwnerMobile} />
          <img
            src={heroOwner}
            alt="Willa Wójcik pod masywem Trzech Koron — grafika właściciela"
            width="1290" height="727"
            fetchPriority="high" decoding="async"
            className="hero-photo absolute inset-0 w-full h-full object-cover object-center"
          />
        </picture>
      ) : (
        <img
          src={heroVideoPoster}
          alt="Masyw Trzech Koron nad Sromowcami Niżnymi o zmierzchu, widok z lotu ptaka"
          width="1600" height="900"
          fetchPriority="high" decoding="async"
          className="hero-photo absolute inset-0 w-full h-full object-cover object-center max-md:object-[50%_38%]"
        />
      )}

      {showVideo && (
        <video
          className="hero-photo absolute inset-0 w-full h-full object-cover object-center"
          poster={heroVideoPoster}
          autoPlay muted loop playsInline preload="metadata"
          aria-hidden="true" tabIndex={-1}
        >
          <source src="/video/willa-wojcik-pieniny.webm" type="video/webm" />
          <source src="/video/willa-wojcik-pieniny.mp4" type="video/mp4" />
        </video>
      )}

      {/* Materiał jest ciemny sam z siebie, więc scrimy są lżejsze niż pod ilustrację —
          kolumna tekstu dostaje pionowy scrim od lewej, prawa strona zostaje żywa */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(8,16,12,0.46) 0%, rgba(8,16,12,0.14) 18%, transparent 34%)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(8,14,11,0.60) 0%, rgba(8,14,11,0.30) 34%, rgba(8,14,11,0.06) 56%, transparent 70%)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 44%, rgba(9,15,12,0.40) 68%, rgba(7,13,10,0.88) 100%)' }} />
      {/* Mobile: wąski kadr podnosi jasne niebo pod eyebrow/nagłówek — dociążenie górnej połowy */}
      <div className="absolute inset-0 md:hidden" style={{ background: 'linear-gradient(180deg, rgba(8,14,11,0.46) 0%, rgba(8,14,11,0.22) 42%, transparent 60%)' }} />
      <div className="absolute inset-0 grain opacity-15 pointer-events-none" />

      <HeroSourceSwitch value={source} onChange={setSource} />

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
              <span className="eyebrow text-cream/75 text-[10.5px] leading-snug normal-case tracking-[0.14em]">/ 5 Google<br/>135 opinii</span>
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
          <span className="eyebrow text-cream/70 text-[10px]">
            {source === 'image'
              ? 'Grafika właściciela — wariant do oceny'
              : 'Trzy Korony nad Sromowcami Niżnymi, wrzesień 2025'}
          </span>
        </div>
      </div>
    </section>
  )
}
