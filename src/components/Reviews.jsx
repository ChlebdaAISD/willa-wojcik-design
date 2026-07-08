import { useEffect, useState } from 'react'
import { REVIEWS } from '../data/content.js'
import { SITE } from '../data/site.js'
import { IconChevL, IconChevR, IconStarFill } from './Icons.jsx'

// Opinie: prowadzi Google (4,9/5, 135 opinii — najmocniejszy, policzalny dowód),
// Booking i nocowanie jako chipy. Cytaty w stosie grid (wysokość = najwyższy
// cytat, zero martwej przestrzeni po starym absolute+min-height).
export function Reviews() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const r = REVIEWS

  useEffect(() => {
    if (paused) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setI((x) => (x + 1) % r.length), 7000)
    return () => clearInterval(t)
    // `i` w deps celowo: ręczna nawigacja resetuje 7-sekundowy zegar auto-przewijania
  }, [r.length, paused, i])

  return (
    <section id="opinie" data-screen-label="08 Opinie" className="relative bg-forest text-cream py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-0 grain pointer-events-none opacity-60" />
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full"
           style={{ background: 'radial-gradient(circle, rgba(184,134,75,0.22), transparent 70%)' }} />

      <div className="relative max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Lewa kolumna — liczby */}
          <div className="lg:col-span-5 reveal">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-8 h-px bg-gold" />
              <span className="eyebrow text-cream/75">06 — Opinie gości</span>
            </div>

            <div className="flex items-baseline gap-4">
              <div className="font-serif leading-[0.8] text-cream" style={{ fontSize: 'clamp(110px, 14vw, 200px)', fontWeight: 500 }}>
                4,9
              </div>
              <div className="font-serif text-cream/75 text-3xl">/ 5</div>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center gap-1 text-gold" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, k) => <IconStarFill key={k} size={17} />)}
              </div>
              <div className="eyebrow text-cream/70 text-[11px]">Google · {SITE.reviewsGoogle} opinii</div>
            </div>

            <div className="hairline-cream my-9" />

            <div className="flex flex-wrap gap-x-10 gap-y-5">
              <div className="flex items-baseline gap-2.5">
                <span className="font-serif text-cream text-3xl leading-none">9,8</span>
                <span className="eyebrow text-cream/75 text-[10.5px] leading-snug normal-case tracking-[0.14em]">/ 10 · Booking.com<br/>„Guest Choice"</span>
              </div>
              <div className="flex items-baseline gap-2.5">
                <span className="font-serif text-cream text-3xl leading-none">10</span>
                <span className="eyebrow text-cream/75 text-[10.5px] leading-snug normal-case tracking-[0.14em]">/ 10<br/>nocowanie.pl</span>
              </div>
            </div>

            <p className="mt-9 text-cream/70 text-[15px] leading-relaxed max-w-sm text-pretty">
              Takiej średniej nie da się wykłamać. Bronimy jej codziennie —
              czystością, ciszą i widokiem, dla którego warto wstać wcześniej.
            </p>
          </div>

          {/* Prawa kolumna — cytaty */}
          <div className="lg:col-span-7 reveal-lg"
               onMouseEnter={() => setPaused(true)}
               onMouseLeave={() => setPaused(false)}
               onFocusCapture={() => setPaused(true)}
               onBlurCapture={() => setPaused(false)}>
            <div className="grid">
              {r.map((rv, idx) => {
                const active = idx === i
                return (
                  <blockquote key={idx}
                              aria-hidden={!active}
                              className="col-start-1 row-start-1 transition-all duration-700"
                              style={{
                                opacity: active ? 1 : 0,
                                transform: active ? 'translateY(0)' : 'translateY(14px)',
                                pointerEvents: active ? 'auto' : 'none',
                              }}>
                    {/* „ ma tusz przy linii bazowej — ciasny line-height + margines zamiast height-hacka, żeby nie nachodził na cytat */}
                    <div className="font-serif text-gold select-none" style={{ fontSize: '84px', fontWeight: 500, lineHeight: 0.35, marginBottom: '18px' }} aria-hidden="true">„</div>
                    <p className="font-serif text-cream text-[24px] md:text-[30px] lg:text-[33px] leading-[1.4] text-pretty" style={{ fontWeight: 500 }}>
                      {rv.q}
                    </p>
                    <footer className="mt-9 flex items-center gap-5">
                      <div className="w-12 h-12 rounded-full bg-cream/10 border border-cream/20 flex items-center justify-center font-serif text-cream text-lg shrink-0" aria-hidden="true">
                        {rv.a[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-cream text-[15px] font-medium">{rv.a}</div>
                        <div className="text-cream/70 text-[13px]">{rv.origin} · {rv.date}</div>
                      </div>
                      <div className="eyebrow text-cream/75 text-[11px] shrink-0">{rv.stars}/10</div>
                    </footer>
                  </blockquote>
                )
              })}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4 sm:gap-6">
              <div className="flex gap-2 order-2 sm:order-1" aria-label="Wybór opinii">
                {r.map((_, k) => (
                  <button key={k} onClick={() => setI(k)}
                          aria-current={k === i} aria-label={`Opinia ${k + 1} z ${r.length}`}
                          className="h-6 w-8 sm:w-12 relative group/bar">
                    <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-cream/25 group-hover/bar:bg-cream/40 transition-colors" />
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-gold transition-all duration-700"
                          style={{ width: k === i ? '100%' : '0%' }} />
                  </button>
                ))}
              </div>
              <div className="eyebrow text-cream/70 order-3 sm:order-2">
                {String(i + 1).padStart(2, '0')} / {String(r.length).padStart(2, '0')}
              </div>
              <div className="flex gap-2 order-1 sm:order-3 ml-auto">
                <button onClick={() => setI((x) => (x - 1 + r.length) % r.length)}
                        aria-label="Poprzednia opinia"
                        className="w-11 h-11 rounded-full border border-cream/25 hover:bg-cream/10 flex items-center justify-center transition-colors">
                  <IconChevL size={16}/>
                </button>
                <button onClick={() => setI((x) => (x + 1) % r.length)}
                        aria-label="Następna opinia"
                        className="w-11 h-11 rounded-full border border-cream/25 hover:bg-cream/10 flex items-center justify-center transition-colors">
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
