import { useEffect, useRef } from 'react'
import { getApartment } from '../data/content.js'
import { obraz } from '../lib/obrazy.js'
import { SITE } from '../data/site.js'

const AP3 = getApartment('apartament-3')

export function About() {
  const imgRef = useRef(null)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const update = () => {
      raf = 0
      if (!imgRef.current) return
      const r = imgRef.current.getBoundingClientRect()
      const vh = window.innerHeight
      const progress = (vh - r.top) / (vh + r.height)
      imgRef.current.style.transform = `translate3d(0, ${(progress - 0.5) * -40}px, 0)`
    }
    // odczyt layoutu tylko raz na klatkę (rAF), nie na każdy event scrolla
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf) }
  }, [])
  return (
    <section data-screen-label="03 O obiekcie" className="relative bg-cream pt-20 md:pt-32 pb-24 md:pb-36 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 items-center">
        <div className="lg:col-span-5 reveal">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-gold"></span>
            <span className="eyebrow text-charcoal/70">01 — O obiekcie</span>
          </div>
          <h2 className="font-serif text-charcoal text-balance leading-[1.05]"
              style={{ fontSize: 'clamp(36px, 4.6vw, 62px)', fontWeight: 500 }}>
            Miejsce, które<br/><span className="italic font-normal">zostaje w pamięci</span>.
          </h2>
          <div className="hairline my-8 line-in"></div>
          <div className="space-y-5 text-charcoal/75 text-[17px] leading-[1.8] text-pretty">
            <p>
              Willa Wójcik stoi w Sromowcach Niżnych, u podnóża Trzech Koron, i prowadzimy ją
              osobiście. Osiem pokoi po 21 m² dzieli się na cztery z balkonem na piętrze i cztery
              z tarasem na parterze. Do tego dochodzą dwa apartamenty w budynku głównym, 35 i 38 m²,
              oraz wolnostojący apartament 60 m² dla sześciu osób. Tuż za drzwiami zaczyna się ogród
              z altaną, trampoliną i placem zabaw.
            </p>
            <p>
              Śniadanie przygotowują Państwo sami — do dyspozycji jest wspólna kuchnia o powierzchni
              45 m², połączona z jadalnią i salonem. Czekają w niej lodówka, płyta z okapem,
              mikrofalówka, ekspres do kawy i czajnik. Przy oknach wychodzących na ogród stoją
              okrągłe stoły, obok urządziliśmy kącik dla najmłodszych.
            </p>
          </div>

        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <div className="relative reveal-lg">
            <div className="relative overflow-hidden rounded-sm" style={{ aspectRatio: '4/5' }}>
              <img
                ref={imgRef}
                {...obraz(AP3.cover, '(min-width: 1024px) 800px, 100vw')}
                alt="Apartament 3 — sypialnia, salon i jadalnia w jednej otwartej przestrzeni pod skosami, ze ścianką z brzozowych pni"
                loading="lazy" decoding="async"
                className="absolute inset-[-8%] w-[116%] h-[116%] object-cover will-change-transform"
              />
              <div className="absolute inset-0" style={{
                background: 'linear-gradient(180deg, transparent 55%, rgba(28,28,28,0.32) 100%)'
              }} />
            </div>
            <div className="absolute bottom-6 left-6 right-6 md:right-auto md:max-w-xs bg-cream/95 backdrop-blur-sm p-5 rounded-sm">
              <div className="eyebrow text-charcoal/65 mb-1">{SITE.street}</div>
              <div className="font-serif text-charcoal text-lg leading-tight">{SITE.city}, {SITE.postal}</div>
              <div className="text-charcoal/70 text-sm mt-1">{SITE.region}</div>
            </div>
            <div className="absolute -top-6 -right-6 md:-right-10 w-28 h-28 rounded-full bg-forest text-cream flex items-center justify-center rotate-[-8deg] shadow-[0_24px_50px_-24px_rgba(31,58,46,0.7)]">
              <div className="text-center">
                <div className="font-serif text-3xl leading-none">4,9</div>
                <div className="eyebrow text-cream/70 mt-1" style={{ fontSize: 9 }}>Google</div>
                <div className="text-cream/75 text-[10px] leading-none mt-0.5">135 opinii</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
