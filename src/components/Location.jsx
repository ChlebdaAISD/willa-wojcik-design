import { Link } from 'wouter'
import { ATTRACTIONS } from '../data/content.js'
import { IconArrow } from './Icons.jsx'
import { MapEmbed } from './ui/MapEmbed.jsx'

// Lokalizacja: mapa z fallbackiem (MapEmbed), lista odległości + typograficzne
// karty atrakcji (bez zdjęć-zapchajdziur — prawdziwe kadry dostarczy właściciel).
export function Location() {
  const nearby = [
    { idx: '01', title: 'Trzy Korony', sub: 'Najkrótszy szlak na szczyt zaczyna się 15 minut pieszo od furtki', dist: '~1 km', href: '/okolica/trzy-korony' },
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
              <span className="eyebrow text-charcoal/70">05 — Lokalizacja</span>
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
              <MapEmbed aspect="aspect-[4/3]" zoom={14} />
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <ul className="divide-y divide-charcoal/15">
              {ATTRACTIONS.map((a) => (
                <li key={a.title} className="reveal flex items-center gap-6 py-5">
                  <div className="flex-1 min-w-0">
                    <div className="font-serif text-charcoal text-xl md:text-2xl leading-tight">{a.title}</div>
                    <div className="text-charcoal/70 text-[13px] mt-1">{a.time}</div>
                  </div>
                  <div className="font-mono text-charcoal text-[15px] tracking-tight whitespace-nowrap">
                    {a.dist}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-12">
              <div className="reveal eyebrow text-charcoal/70 mb-5">Trzy rzeczy, dla których się tu przyjeżdża</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                {nearby.map((n, k) => (
                  <Link key={n.title} href={n.href}
                        className="reveal group flex flex-col justify-between rounded-sm border border-charcoal/20 bg-cream/40 p-5 md:p-6 min-h-[190px] transition-all duration-500 hover:bg-cream hover:border-transparent hover:-translate-y-1 hover:shadow-[0_30px_50px_-30px_rgba(31,58,46,0.35)]"
                        style={{ '--d': `${k * 0.08}s` }}>
                    <div>
                      <div className="font-mono text-gold-2 text-[12px]">.{n.idx}</div>
                      <div className="font-serif text-charcoal text-2xl leading-tight mt-2">{n.title}</div>
                      <div className="text-charcoal/70 text-[13px] mt-2 leading-relaxed">{n.sub}</div>
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
