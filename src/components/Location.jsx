import { Link } from 'wouter'
import { ATTRACTIONS, PHOTOS } from '../data/content.js'
import { ICONS, IconArrow } from './Icons.jsx'

export function Location() {
  const nearby = [
    { icon: 'IconRaft', title: 'Spływ Dunajcem', sub: 'Tratwą przez Przełom Dunajca', img: PHOTOS.balconyView, href: '/okolica/splyw-dunajcem' },
    { icon: 'IconMountain', title: 'Trzy Korony', sub: 'Najkrótszy szlak spod obiektu', img: PHOTOS.snow, href: '/okolica/trzy-korony' },
    { icon: 'IconMapPin', title: 'Kładka na Słowację', sub: 'Czerwony Klasztor, 250 m', img: PHOTOS.buildingWinter, href: '/okolica/kladka-czerwony-klasztor' },
  ]
  return (
    <section id="lokalizacja" data-screen-label="07 Lokalizacja" className="relative bg-stone py-24 md:py-40">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 reveal">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-gold"></span>
              <span className="eyebrow text-charcoal/60">Lokalizacja</span>
            </div>
            <h2 className="font-serif text-charcoal leading-[1.05]"
                style={{ fontSize: 'clamp(36px, 4.6vw, 62px)', fontWeight: 450 }}>
              W sercu <span className="italic font-[380]">Pienin</span>.
            </h2>
            <p className="mt-6 text-charcoal/70 text-[17px] leading-[1.8] text-pretty">
              Pięć kroków do Dunajca, kwadrans od zamku w Niedzicy, pół godziny od Zakopanego.
              Idealna baza wypadowa — ale najczęściej goście zostają tu, bo nie chce im się wyjeżdżać.
            </p>

            <div className="mt-10 rounded-sm overflow-hidden aspect-[4/3] relative border border-charcoal/10">
              <iframe
                title="Mapa — Willa Wójcik, Sromowce Niżne"
                src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_EMBED_KEY}&q=Willa+Wójcik+Sobczańska+9a+Sromowce+Niżne&zoom=14`}
                className="absolute inset-0 w-full h-full"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <ul className="divide-y divide-charcoal/15">
              {ATTRACTIONS.map((a, i) => (
                <li key={a.title} className="reveal flex items-center gap-6 py-5 group"
                    style={{ transitionDelay: `${i * 50}ms` }}>
                  <div className="eyebrow text-charcoal/40 w-8">{String(i + 1).padStart(2, '0')}</div>
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
              <div className="eyebrow text-charcoal/55 mb-5">Najbliższe atrakcje — zobacz szczegóły</div>
              <div className="grid grid-cols-3 gap-2 md:gap-4">
                {nearby.map((n) => {
                  const I = ICONS[n.icon]
                  return (
                    <Link key={n.title} href={n.href}
                          className="card-lift relative overflow-hidden rounded-sm aspect-[3/4] md:aspect-[4/5] group block">
                      <div className="absolute inset-0 zoom-img bg-cover bg-center"
                           style={{ backgroundImage: `url(${n.img})` }} />
                      <div className="absolute inset-0" style={{
                        background: 'linear-gradient(180deg, rgba(28,28,28,0.25) 0%, rgba(28,28,28,0.7) 55%, rgba(28,28,28,0.95) 100%)'
                      }}/>
                      <div className="absolute top-3 left-3 md:top-4 md:left-4 text-cream/80">
                        <I size={18} stroke={1.3} />
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 md:bottom-4 md:left-4 md:right-4">
                        <div className="font-serif text-cream text-[15px] md:text-xl leading-tight">{n.title}</div>
                        <div className="text-cream/70 text-[10px] md:text-[12px] mt-1 leading-snug">{n.sub}</div>
                        <div className="mt-2 inline-flex items-center gap-1.5 text-gold text-[11px] md:text-[12px] font-semibold">
                          Zobacz <IconArrow size={13} className="transition-transform group-hover:translate-x-0.5" />
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
