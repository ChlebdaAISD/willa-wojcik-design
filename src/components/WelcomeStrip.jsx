import { ICONS } from './Icons.jsx'

export function WelcomeStrip() {
  const items = [
    { icon: 'IconMountain', t: 'Widok na Trzy Korony', s: 'Panorama z każdego balkonu' },
    { icon: 'IconMapPin', t: '1 km od PPN', s: 'U wrót Pienińskiego Parku' },
    { icon: 'IconHome', t: 'Obiekt z 2019 r.', s: 'Nowoczesny, w autorskim stylu' },
  ]
  return (
    <section className="relative bg-cream py-20 md:py-24">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-12">
        {items.map((it, i) => {
          const I = ICONS[it.icon]
          return (
            <div key={i} className="reveal flex items-start gap-5">
              <div className="shrink-0 w-14 h-14 rounded-full bg-forest/5 border border-forest/15 flex items-center justify-center text-forest">
                <I size={22} stroke={1.3} />
              </div>
              <div>
                <div className="font-serif text-charcoal text-2xl leading-tight">{it.t}</div>
                <div className="text-charcoal/60 text-[15px] mt-2 leading-relaxed">{it.s}</div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
