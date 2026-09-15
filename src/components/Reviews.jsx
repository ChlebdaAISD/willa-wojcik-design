import { SITE } from '../data/site.js'
import { IconArrow, IconStarFill } from './Icons.jsx'

// Opinie: WYŁĄCZNIE policzalne, prawdziwe oceny z portali — Google prowadzi
// (4,9/5 ze 135 opinii), Booking i nocowanie.pl obok.
//
// Karuzela cytatów została usunięta 14.09.2026. Stało w niej pięć zmyślonych
// opinii z imionami, miastami i datami („Rodzina Kowalskich, Wrocław"), które
// trafiały do prerenderowanego HTML-a. Właściciele nie przekazali ani jednego
// cytatu, więc prezentowanie ich jako opinii gości było fabrykowaniem referencji.
// Cytaty wracają dopiero z realnymi wpisami od klienta albo pobrane z Places API.
export function Reviews() {
  const portale = [
    // Przecinek dziesiętny, nie kropka — polska konwencja zapisu liczb
    { big: SITE.ratingBooking.replace('.', ','), scale: '/ 10', name: 'Booking.com', note: '„Guest Choice"' },
    { big: SITE.ratingNocowanie.replace('.', ','), scale: '/ 10', name: 'nocowanie.pl', note: 'Ocena maksymalna' },
  ]

  return (
    <section id="opinie" data-screen-label="08 Opinie" className="relative bg-forest text-cream py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-0 grain pointer-events-none opacity-60" />
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full"
           style={{ background: 'radial-gradient(circle, rgba(184,134,75,0.22), transparent 70%)' }} />

      <div className="relative max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Lewa kolumna — ocena wiodąca */}
          <div className="lg:col-span-6 reveal">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-8 h-px bg-gold" />
              <span className="eyebrow text-cream/75">06 — Opinie gości</span>
            </div>

            <div className="flex items-baseline gap-4">
              <div className="font-serif leading-[0.8] text-cream" style={{ fontSize: 'clamp(110px, 14vw, 200px)', fontWeight: 500 }}>
                {SITE.ratingGoogle.replace('.', ',')}
              </div>
              <div className="font-serif text-cream/75 text-3xl">/ 5</div>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center gap-1 text-gold" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, k) => <IconStarFill key={k} size={17} />)}
              </div>
              <div className="eyebrow text-cream/70 text-[11px]">Google, {SITE.reviewsGoogle} opinii</div>
            </div>

            <div className="hairline-cream my-9" />

            <p className="text-cream/70 text-[15px] leading-relaxed max-w-md text-pretty">
              Takiej średniej nie da się wykłamać. Bronimy jej codziennie —
              czystością, ciszą i widokiem, dla którego warto wstać wcześniej.
            </p>
          </div>

          {/* Prawa kolumna — pozostałe portale i odesłanie do źródła */}
          <div className="lg:col-span-5 lg:col-start-8 reveal-lg">
            <div className="border-t border-cream/20">
              {portale.map((p) => (
                <div key={p.name} className="flex items-baseline gap-5 py-7 border-b border-cream/20">
                  <span className="font-serif text-cream leading-none shrink-0" style={{ fontSize: 'clamp(40px, 5vw, 58px)', fontWeight: 500 }}>
                    {p.big}
                  </span>
                  <span className="font-serif text-cream/60 text-xl shrink-0">{p.scale}</span>
                  <span className="ml-auto text-right">
                    <span className="block text-cream text-[15px] font-medium">{p.name}</span>
                    <span className="block text-cream/65 text-[13px]">{p.note}</span>
                  </span>
                </div>
              ))}
            </div>

            <a href={SITE.mapsLink} target="_blank" rel="noopener noreferrer"
               className="mt-9 inline-flex items-center gap-3 text-cream text-[15px] font-medium group">
              <span className="border-b border-cream/40 group-hover:border-cream transition-colors pb-0.5">
                Przeczytaj opinie w Google
              </span>
              <IconArrow size={15} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
