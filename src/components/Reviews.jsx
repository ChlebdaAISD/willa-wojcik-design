import { useEffect, useState } from 'react'
import { REVIEWS } from '../data/content.js'
import { IconChevL, IconChevR, IconStar } from './Icons.jsx'

export function Reviews() {
  const [i, setI] = useState(0)
  const r = REVIEWS
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % r.length), 7000)
    return () => clearInterval(t)
  }, [r.length])

  return (
    <section id="opinie" data-screen-label="08 Opinie" className="relative bg-forest text-cream py-24 md:py-40 overflow-hidden">
      <div className="absolute inset-0 grain pointer-events-none opacity-60" />
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full"
           style={{ background: 'radial-gradient(circle, rgba(184,134,75,0.25), transparent 70%)' }} />

      <div className="relative max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 reveal">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-gold"></span>
              <span className="eyebrow text-cream/60">Opinie gości</span>
            </div>
            <div className="flex items-baseline gap-4 mb-2">
              <div className="font-serif leading-[0.85]" style={{ fontSize: 'clamp(120px, 18vw, 260px)', fontWeight: 350 }}>
                9.6
              </div>
              <div className="eyebrow text-cream/60">/ 10</div>
            </div>
            <div className="flex items-center gap-1.5 text-gold mb-5">
              {Array.from({ length: 5 }).map((_, k) => <IconStar key={k} size={18} stroke={1.2} />)}
            </div>
            <div className="eyebrow text-cream/70 mb-3">Wyjątkowe opinie na</div>
            <div className="font-serif text-cream text-3xl italic">Booking.com</div>
            <div className="hairline-cream my-8"></div>
            <div className="text-cream/70 text-[15px] leading-relaxed max-w-sm">
              Ponad 140 opinii z lat 2022–2026. Średnia, którą bronimy codziennie — serdecznością, świeżą pościelą i filiżanką kawy na tarasie.
            </div>
          </div>

          <div className="lg:col-span-7 lg:col-start-6 reveal-lg">
            <div className="relative min-h-[380px]">
              {r.map((rv, idx) => (
                <blockquote key={idx}
                            className="absolute inset-0 transition-all duration-1000"
                            style={{
                              opacity: idx === i ? 1 : 0,
                              transform: idx === i ? 'translateY(0)' : 'translateY(20px)',
                              pointerEvents: idx === i ? 'auto' : 'none',
                            }}>
                  <div className="font-serif text-gold text-7xl leading-none mb-4" style={{ fontWeight: 350 }}>"</div>
                  <div className="font-serif text-cream text-2xl md:text-3xl lg:text-[34px] leading-[1.35] text-balance italic" style={{ fontWeight: 380 }}>
                    {rv.q}
                  </div>
                  <footer className="mt-10 flex items-center gap-5">
                    <div className="w-12 h-12 rounded-full bg-cream/10 border border-cream/20 flex items-center justify-center font-serif text-cream text-lg">
                      {rv.a[0]}
                    </div>
                    <div className="flex-1">
                      <div className="text-cream text-[15px]">{rv.a}</div>
                      <div className="text-cream/55 text-[13px]">{rv.origin} · {rv.date}</div>
                    </div>
                    <div className="eyebrow text-cream/60 text-[11px]">
                      {rv.stars}/10
                    </div>
                  </footer>
                </blockquote>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-6">
              <div className="flex gap-2">
                {r.map((_, k) => (
                  <button key={k} onClick={() => setI(k)}
                          className="h-px w-12 bg-cream/20 relative overflow-hidden">
                    <div className="absolute inset-y-0 left-0 bg-gold transition-all duration-700"
                         style={{ width: k === i ? '100%' : '0%' }} />
                  </button>
                ))}
              </div>
              <div className="eyebrow text-cream/50">
                {String(i + 1).padStart(2, '0')} / {String(r.length).padStart(2, '0')}
              </div>
              <div className="ml-auto flex gap-2">
                <button onClick={() => setI((x) => (x - 1 + r.length) % r.length)}
                        className="w-10 h-10 rounded-full border border-cream/25 hover:bg-cream/10 flex items-center justify-center">
                  <IconChevL size={16}/>
                </button>
                <button onClick={() => setI((x) => (x + 1) % r.length)}
                        className="w-10 h-10 rounded-full border border-cream/25 hover:bg-cream/10 flex items-center justify-center">
                  <IconChevR size={16}/>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
