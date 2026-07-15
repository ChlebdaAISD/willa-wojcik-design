import { Container } from './ui/Container.jsx'
import { SectionHeading } from './ui/SectionHeading.jsx'
import { ICONS } from './Icons.jsx'

// Sekcje wspólne dla /apartamenty i /pokoje (udogodnienia obiektu + zasady pobytu).
// `number` = numer eyebrow w sekwencji danej strony (np. "04").

const AMENITIES = [
  { icon: 'IconKitchen', t: 'Wspólna kuchnia 45 m²', s: 'W pełni wyposażona, połączona z jadalnią — do samodzielnego gotowania' },
  { icon: 'IconFlame', t: 'Altana z grillem', s: 'W ogrodzie, do dyspozycji gości' },
  { icon: 'IconPlay', t: 'Plac zabaw dla dzieci', s: 'Trampolina, huśtawki i kącik zabaw' },
  { icon: 'IconCar', t: 'Bezpłatny parking', s: '10 miejsc na terenie, z monitoringiem' },
  { icon: 'IconWifi', t: 'WiFi w całym obiekcie', s: 'Szybki internet, bez dopłat' },
  { icon: 'IconShield', t: 'Całodobowy monitoring', s: 'Dla spokoju Państwa i dzieci' },
  { icon: 'IconUsers', t: 'Wyposażenie dla dzieci', s: 'Łóżeczko, krzesełko, wanienka, pościel dziecięca' },
  { icon: 'IconMountain', t: 'Ogród i taras', s: 'Miejsce na poranną kawę z widokiem na Pieniny' },
]

export function AmenitiesSection({ number = '04', className = 'bg-cream-2' }) {
  return (
    <section className={`relative py-20 md:py-28 ${className}`}>
      <Container>
        <SectionHeading eyebrow={`${number} — Udogodnienia`} title={<>Wszystko, czego trzeba <span className="italic font-normal">na miejscu</span>.</>} className="max-w-2xl mb-14 reveal" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
          {AMENITIES.map((a, i) => {
            const I = ICONS[a.icon]
            return (
              <div key={a.t} className="reveal flex gap-5" style={{ '--d': `${(i % 2) * 0.08}s` }}>
                <div className="shrink-0 w-12 h-12 rounded-full bg-forest/5 border border-forest/15 flex items-center justify-center text-forest">
                  <I size={20} stroke={1.3} />
                </div>
                <div>
                  <div className="font-serif text-charcoal text-xl leading-tight" style={{ fontWeight: 500 }}>{a.t}</div>
                  <div className="text-charcoal/70 text-[14px] mt-1.5 leading-relaxed">{a.s}</div>
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

export function RulesSection() {
  return (
    <section className="relative bg-stone py-16 md:py-20">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            ['Zameldowanie', 'od 14:00'],
            ['Wymeldowanie', 'do 10:00'],
            ['Zwierzęta', 'niestety nie przyjmujemy'],
            ['Palenie', 'obiekt w całości dla niepalących'],
          ].map(([k, v], i) => (
            <div key={k} className="reveal" style={{ '--d': `${i * 0.06}s` }}>
              <div className="eyebrow text-charcoal/70 mb-2">{k}</div>
              <div className="text-charcoal/85 text-[15px] leading-snug">{v}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
