import { useEffect, useRef } from 'react'
import { PHOTOS } from '../data/content.js'
import { useMagnetic } from '../lib/useMagnetic.js'
import { IconArrow } from './Icons.jsx'

export function Hero() {
  const sceneRef = useRef(null)
  const heroImgRef = useRef(null)
  const ctaRef = useRef(null)
  useMagnetic(ctaRef, 10)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      if (heroImgRef.current) heroImgRef.current.style.transform = `translate3d(0, ${y * 0.35}px, 0) scale(${1 + y * 0.0003})`
      const tx1 = document.getElementById('hero-text')
      if (tx1) tx1.style.transform = `translate3d(0, ${y * 0.2}px, 0)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section ref={sceneRef} data-screen-label="01 Hero" className="relative overflow-hidden" style={{ minHeight: '100vh' }}>
      <div ref={heroImgRef} className="absolute inset-0 will-change-transform">
        <div
          className="absolute inset-0 kenburns bg-cover bg-center"
          style={{ backgroundImage: `url(${PHOTOS.heroMountain})` }}
        />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(180deg, rgba(28,28,28,0.55) 0%, rgba(28,28,28,0.25) 35%, rgba(28,28,28,0.55) 70%, rgba(28,28,28,0.92) 100%)'
        }} />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(90deg, rgba(31,58,46,0.55) 0%, rgba(31,58,46,0.25) 35%, rgba(28,28,28,0.0) 70%)'
        }} />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 70% 40%, rgba(184,134,75,0.15), transparent 55%)'
        }} />
      </div>

      <div className="absolute inset-0 grain pointer-events-none" />

      <div className="absolute top-0 left-0 right-0 h-px bg-cream/10 z-10" />

      <div className="hidden md:block absolute right-6 top-1/2 -translate-y-1/2 z-10">
        <div className="eyebrow text-cream/50" style={{ writingMode: 'vertical-rl' }}>
          49°24′N · 20°22′E
        </div>
      </div>

      <div id="hero-text" className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 pt-40 md:pt-48 pb-32 min-h-screen flex flex-col justify-end">
        <div className="max-w-4xl">
          <div className="reveal flex items-center gap-3 mb-6">
            <span className="w-10 h-px bg-gold"></span>
            <span className="eyebrow text-cream">Sromowce Niżne · Pieniny</span>
          </div>

          <h1 className="reveal font-serif text-cream text-balance leading-[0.95] font-[450]"
              style={{ fontSize: 'clamp(52px, 8.2vw, 112px)' }}>
            Twój balkon<br/>
            <span className="italic font-[350]" style={{ color: '#EADFC7' }}>z widokiem na</span><br/>
            Trzy Korony.
          </h1>

          <p className="reveal mt-8 max-w-xl text-cream text-lg md:text-xl leading-relaxed text-pretty">
            Kameralny pensjonat w sercu Pienin. Apartamenty i pokoje
            dla par, rodzin i odkrywców gór — u stóp Trzech Koron,
            pięć kroków od Dunajca.
          </p>

          <div className="reveal mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="inline-block">
              <a ref={ctaRef} href="#kontakt"
                 className="btn-prim inline-flex items-center gap-3 px-8 py-4 rounded-full text-[14px] tracking-wide whitespace-nowrap shrink-0">
                Sprawdź dostępność
                <IconArrow size={16} />
              </a>
            </div>
            <a href="#apartamenty"
               className="btn-ghost inline-flex items-center gap-2 px-7 py-4 rounded-full text-[14px] tracking-wide whitespace-nowrap shrink-0">
              Zobacz apartamenty
            </a>
          </div>

          <div className="reveal mt-16 flex flex-wrap items-center gap-8 pt-8 border-t border-cream/15 max-w-2xl">
            <div className="flex items-center gap-3">
              <div className="flex items-baseline gap-1.5">
                <span className="font-serif text-cream text-3xl">9.6</span>
                <span className="text-cream text-sm">/ 10</span>
              </div>
              <div className="eyebrow text-cream text-[11px]">
                Booking<br/>Wyjątkowe opinie
              </div>
            </div>
            <div className="h-10 w-px bg-cream/30"></div>
            <div>
              <div className="eyebrow text-cream text-[11px]">Park narodowy</div>
              <div className="text-cream text-sm mt-1">1,1 km od obiektu</div>
            </div>
            <div className="h-10 w-px bg-cream/30 hidden sm:block"></div>
            <div>
              <div className="eyebrow text-cream text-[11px]">Otwarte</div>
              <div className="text-cream text-sm mt-1">Cały rok</div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 right-12 hidden md:flex flex-col items-center gap-3">
          <div className="eyebrow text-cream/60">Przewiń</div>
          <div className="relative h-16 w-px bg-cream/30 overflow-hidden">
            <div className="absolute top-0 left-0 w-px bg-gold h-1/2" style={{ animation: 'scrollDot 2.2s ease-in-out infinite' }} />
          </div>
        </div>
      </div>
    </section>
  )
}
