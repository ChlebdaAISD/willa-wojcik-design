import { Link } from 'wouter'
import { ATTRACTIONS } from '../data/content.js'
import { SITE } from '../data/site.js'
import { IconArrow, IconMapPin } from './Icons.jsx'

// Lokalizacja: mapa z fallbackiem (bez klucza API pokazujemy kartę dojazdu
// zamiast błędu Google), lista odległości + typograficzne karty atrakcji
// (bez zdjęć-zapchajdziur — prawdziwe kadry okolicy dostarczy właściciel).
export function Location() {
  const mapsKey = import.meta.env.VITE_GOOGLE_MAPS_EMBED_KEY
  const nearby = [
    { idx: '01', title: 'Trzy Korony', sub: 'Najkrótszy szlak na szczyt zaczyna się 15 minut pieszo od furtki', dist: '1,1 km', href: '/okolica/trzy-korony' },
    { idx: '02', title: 'Kładka na Słowację', sub: 'Spacerem do Czerwonego Klasztoru i na Drogę Pienińską', dist: '250 m', href: '/okolica/kladka-czerwony-klasztor' },
    { idx: '03', title: 'Spływ Dunajcem', sub: 'Tratwą flisacką przez Przełom Dunajca — przystań w tej samej wsi', dist: '2,5 km', href: '/okolica/splyw-dunajcem' },
  ]

  return (
    <section id="lokalizacja" data-screen-label="07 Lokalizacja" className="relative bg-stone py-24 md:py-36">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5 reveal">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-gold"></span>
              <span className="eyebrow text-charcoal/60">05 — Lokalizacja</span>
            </div>
            <h2 className="font-serif text-charcoal leading-[1.05]"
                style={{ fontSize: 'clamp(36px, 4.6vw, 62px)', fontWeight: 500 }}>
              W sercu <span className="italic font-normal">Pienin</span>.
            </h2>
            <p className="mt-6 text-charcoal/70 text-[17px] leading-[1.8] text-pretty">
              Pięć kroków do Dunajca, kwadrans od zamku w Niedzicy, pół godziny od Zakopanego.
              Dobra baza wypadowa — choć najczęściej goście zostają na miejscu, bo nie chce im
              się wyjeżdżać.
            </p>

            <div className="mt-10 reveal-lg">
              {mapsKey ? (
                <>
                  <div className="rounded-sm overflow-hidden aspect-[4/3] relative border border-charcoal/10">
                    <iframe
                      title="Mapa — Willa Wójcik, Sromowce Niżne"
                      src={`https://www.google.com/maps/embed/v1/place?key=${mapsKey}&q=${SITE.mapsEmbedQuery}&zoom=14`}
                      className="absolute inset-0 w-full h-full"
                      style={{ border: 0 }}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      allowFullScreen
                    />
                  </div>
                  <a href={SITE.mapsLink} target="_blank" rel="noopener noreferrer"
                     className="mt-4 inline-flex items-center gap-2 text-charcoal/65 text-[13px] hover:text-forest transition-colors">
                    {SITE.street}, {SITE.postal} {SITE.city} — otwórz w Google Maps
                    <IconArrow size={13} />
                  </a>
                </>
              ) : (
                <a href={SITE.mapsLink} target="_blank" rel="noopener noreferrer"
                   className="group relative flex flex-col items-start justify-between rounded-sm overflow-hidden aspect-[4/3] bg-forest text-cream p-8">
                  <div className="absolute inset-0 grain opacity-50 pointer-events-none" />
                  <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full"
                       style={{ background: 'radial-gradient(circle, rgba(184,134,75,0.25), transparent 70%)' }} />
                  <div className="relative">
                    <IconMapPin size={30} stroke={1.2} className="text-gold" />
                    <div className="mt-5 font-serif text-3xl leading-tight">{SITE.street}</div>
                    <div className="text-cream/70 text-[15px] mt-1">{SITE.postal} {SITE.city}</div>
                    <div className="text-cream/55 text-[13px] mt-0.5">{SITE.region}</div>
                  </div>
                  <span className="relative inline-flex items-center gap-2 text-[14px] font-semibold tracking-wide border-b border-gold/60 pb-1 group-hover:border-gold transition-colors">
                    Otwórz mapę dojazdu
                    <IconArrow size={14} className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </a>
              )}
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <ul className="divide-y divide-charcoal/15">
              {ATTRACTIONS.map((a) => (
                <li key={a.title} className="reveal flex items-center gap-6 py-5">
                  <div className="flex-1 min-w-0">
                    <div className="font-serif text-charcoal text-xl md:text-2xl leading-tight">{a.title}</div>
                    <div className="text-charcoal/55 text-[13px] mt-1">{a.time}</div>
                  </div>
                  <div className="font-mono text-charcoal text-[15px] tracking-tight whitespace-nowrap">
                    {a.dist}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-12">
              <div className="reveal eyebrow text-charcoal/55 mb-5">Trzy rzeczy, dla których się tu przyjeżdża</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                {nearby.map((n, k) => (
                  <Link key={n.title} href={n.href}
                        className="reveal group flex flex-col justify-between rounded-sm border border-charcoal/20 bg-cream/40 p-5 md:p-6 min-h-[190px] transition-all duration-500 hover:bg-cream hover:border-transparent hover:-translate-y-1 hover:shadow-[0_30px_50px_-30px_rgba(31,58,46,0.35)]"
                        style={{ '--d': `${k * 0.08}s` }}>
                    <div>
                      <div className="font-mono text-gold-2 text-[12px]">.{n.idx}</div>
                      <div className="font-serif text-charcoal text-2xl leading-tight mt-2">{n.title}</div>
                      <div className="text-charcoal/60 text-[13px] mt-2 leading-relaxed">{n.sub}</div>
                    </div>
                    <div className="mt-5 flex items-center justify-between">
                      <span className="font-mono text-charcoal/70 text-[13px]">{n.dist}</span>
                      <span className="inline-flex items-center gap-1.5 text-forest text-[13px] font-semibold">
                        Zobacz
                        <IconArrow size={13} className="transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
