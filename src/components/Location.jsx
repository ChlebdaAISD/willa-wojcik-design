import { ATTRACTIONS, PHOTOS } from '../data/content.js'
import { ICONS } from './Icons.jsx'

export function Location() {
  const nearby = [
    { icon: 'IconSki', title: 'Termy Bania', sub: 'Białka Tatrzańska · baseny geotermalne', img: PHOTOS.thermal },
    { icon: 'IconMountain', title: 'Białka Tatrzańska', sub: 'Stoki, karczmy, Tatry Bielskie', img: PHOTOS.snow },
    { icon: 'IconHome', title: 'Zakopane', sub: 'Krupówki, kolejka na Gubałówkę', img: PHOTOS.zakopane },
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
                src="https://www.google.com/maps?q=Sromowce+Ni%C5%BCne+Pod+Brzegami+18&output=embed&z=13"
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
              <div className="eyebrow text-charcoal/55 mb-5">W 20 minut dojedziesz do…</div>
              <div className="grid grid-cols-3 gap-2 md:gap-4">
                {nearby.map((n, i) => {
                  const I = ICONS[n.icon]
                  return (
                    <div key={n.title} className="reveal card-lift relative overflow-hidden rounded-sm aspect-[3/4] md:aspect-[4/5] group cursor-pointer"
                         style={{ transitionDelay: `${i * 80}ms` }}>
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
                      </div>
                    </div>
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
