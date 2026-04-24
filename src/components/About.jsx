import { useEffect, useRef } from 'react'
import { PHOTOS } from '../data/content.js'

export function About() {
  const imgRef = useRef(null)
  useEffect(() => {
    const onScroll = () => {
      if (!imgRef.current) return
      const r = imgRef.current.getBoundingClientRect()
      const vh = window.innerHeight
      const progress = (vh - r.top) / (vh + r.height)
      imgRef.current.style.transform = `translate3d(0, ${(progress - 0.5) * -40}px, 0)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <section data-screen-label="03 O obiekcie" className="relative bg-cream pt-20 md:pt-32 pb-24 md:pb-40 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 items-center">
        <div className="lg:col-span-5 reveal">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-gold"></span>
            <span className="eyebrow text-charcoal/60">O obiekcie</span>
          </div>
          <h2 className="font-serif text-charcoal text-balance leading-[1.05]"
              style={{ fontSize: 'clamp(36px, 4.6vw, 62px)', fontWeight: 450 }}>
            Miejsce, które<br/><span className="italic font-[380]">zapamiętasz</span>.
          </h2>
          <div className="hairline my-8 line-in"></div>
          <div className="space-y-5 text-charcoal/75 text-[17px] leading-[1.8] text-pretty">
            <p>
              Willa Wójcik to rodzinny pensjonat, zbudowany w 2019 roku u podnóża Trzech Koron.
              Łączymy spokojną, pienińską autentyczność z nowoczesnym komfortem: jasne wnętrza,
              zapach drewna, ciepłe światło o zmierzchu i ten jeden widok, dla którego warto
              wstać wcześniej.
            </p>
            <p>
              Prowadzimy obiekt osobiście — polski, angielski, wiele serdeczności. Chętnie
              podpowiemy Państwu szlaki, restauracje i nieoczywiste miejsca w okolicy.
            </p>
          </div>

          <figure className="mt-12 pl-6 border-l-2 border-gold/50">
            <blockquote className="font-serif text-charcoal/80 text-xl md:text-2xl italic leading-snug text-balance">
              „Czysty, nowoczesny, ładnie urządzony pokój z&nbsp;przepięknym widokiem na Trzy Korony."
            </blockquote>
            <figcaption className="mt-4 eyebrow text-charcoal/55">
              Gość · Booking.com · 10/10
            </figcaption>
          </figure>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <div className="relative reveal-lg">
            <div className="relative overflow-hidden rounded-sm" style={{ aspectRatio: '4/5' }}>
              <div
                ref={imgRef}
                className="absolute inset-[-8%] bg-cover bg-center will-change-transform"
                style={{ backgroundImage: `url(${PHOTOS.roomBirch})` }}
              />
              <div className="absolute inset-0" style={{
                background: 'linear-gradient(180deg, transparent 50%, rgba(28,28,28,0.35) 100%)'
              }} />
            </div>
            <div className="absolute bottom-6 left-6 right-6 md:right-auto md:max-w-xs bg-cream/95 backdrop-blur-sm p-5 rounded-sm">
              <div className="eyebrow text-charcoal/50 mb-1">ul. Pod Brzegami 18</div>
              <div className="font-serif text-charcoal text-lg leading-tight">Sromowce Niżne, 34-443</div>
              <div className="text-charcoal/60 text-sm mt-1">Powiat nowotarski · Małopolska</div>
            </div>
            <div className="absolute -top-6 -right-6 md:-right-10 w-28 h-28 rounded-full bg-forest text-cream flex items-center justify-center rotate-[-12deg]">
              <div className="text-center">
                <div className="font-serif text-3xl leading-none">9.6</div>
                <div className="eyebrow text-cream/70 mt-1" style={{ fontSize: 9 }}>Booking</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
