import { PageHero } from '../components/ui/PageHero.jsx'
import { Container } from '../components/ui/Container.jsx'
import { SectionHeading } from '../components/ui/SectionHeading.jsx'
import { Button } from '../components/ui/Button.jsx'
import { CTASection } from '../components/ui/CTASection.jsx'
import { ICONS } from '../components/Icons.jsx'
import { PHOTOS } from '../data/content.js'

const units = [
  {
    kind: 'Apartament',
    title: 'Apartamenty 4–6 osobowe',
    price: 'od 350 zł / doba',
    sqm: '35–39 m²',
    img: PHOTOS.apartment,
    intro: 'Dwa dwupokojowe apartamenty z balkonem skierowanym na Trzy Korony. Salon z sypialnią, w pełni wyposażony aneks kuchenny i miejsce dla całej rodziny.',
    features: [
      'Salon z sypialnią + możliwość dostawki',
      'Aneks kuchenny: lodówka, płyta indukcyjna, czajnik, mikrofalówka, naczynia',
      'Własna łazienka z prysznicem i suszarką',
      'Balkon z widokiem na Trzy Korony',
      'TV-SAT, szybkie WiFi',
      'Jeden z apartamentów ma klimatyzację',
    ],
  },
  {
    kind: 'Pokój',
    title: 'Pokoje 2–3 osobowe',
    price: 'od 210 zł / doba',
    sqm: '21 m²',
    img: PHOTOS.roomBirch,
    intro: 'Kameralne pokoje z własną łazienką i balkonem lub tarasem. Do dyspozycji w pełni wyposażona kuchnia wspólna — jak we własnym domu, tylko z widokiem na góry.',
    features: [
      'Własna łazienka z prysznicem',
      'Balkon lub taras z widokiem na ogród lub góry',
      'Lodówka, czajnik, TV-SAT, WiFi',
      'Suszarka do włosów, świeża pościel i ręczniki',
      'Dostęp do wspólnej kuchni 45 m²',
    ],
  },
]

const amenities = [
  { icon: 'IconKitchen', t: 'Wspólna kuchnia 45 m²', s: 'W pełni wyposażona, połączona z jadalnią — do samodzielnego gotowania' },
  { icon: 'IconFlame', t: 'Altana z grillem', s: 'W ogrodzie, do dyspozycji gości' },
  { icon: 'IconPlay', t: 'Plac zabaw dla dzieci', s: 'Trampolina, huśtawki i kącik zabaw' },
  { icon: 'IconCar', t: 'Bezpłatny parking', s: '10 miejsc na terenie, z monitoringiem' },
  { icon: 'IconWifi', t: 'WiFi w całym obiekcie', s: 'Szybki internet, bez dopłat' },
  { icon: 'IconShield', t: 'Całodobowy monitoring', s: 'Dla spokoju Państwa i dzieci' },
  { icon: 'IconUsers', t: 'Wyposażenie dla dzieci', s: 'Łóżeczko, krzesełko, wanienka, pościel dziecięca' },
  { icon: 'IconMountain', t: 'Ogród i taras', s: 'Miejsce na poranną kawę z widokiem na Pieniny' },
]

export default function PokojeApartamenty() {
  return (
    <>
      <PageHero
        eyebrow="Nocleg"
        title="Pokoje i apartamenty"
        subtitle="Dziesięć jednostek, 35 miejsc, jeden widok. Wybór zależy od tego, na jak długo Państwo zostają i czy gotują na miejscu."
        image={PHOTOS.apartment}
        crumbs={[{ label: 'Strona główna', href: '/' }, { label: 'Pokoje i apartamenty' }]}
      />

      {/* Intro */}
      <section className="relative bg-cream py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-7 reveal">
              <SectionHeading eyebrow="O obiekcie" title={<>Rodzinny pensjonat <span className="italic font-[380]">z 2019 roku</span>.</>} />
              <div className="mt-6 space-y-4 text-charcoal/75 text-[17px] leading-[1.8] text-pretty max-w-xl">
                <p>
                  Willa Wójcik to dwa apartamenty 4–6 osobowe i osiem pokoi 2–3 osobowych — łącznie 35 miejsc.
                  Każda jednostka ma własną łazienkę i balkon lub taras. Obiekt prowadzimy osobiście, od 2019 roku.
                </p>
                <p>
                  To miejsce w duchu „jak u siebie”: w pełni wyposażona wspólna kuchnia 45 m² i aneksy w apartamentach
                  pozwalają gotować na miejscu. Śniadanie robią Państwo po swojemu — kawa na tarasie z widokiem na Trzy Korony gratis.
                </p>
              </div>
            </div>
            <div className="lg:col-span-4 lg:col-start-9 reveal">
              <div className="grid grid-cols-3 lg:grid-cols-1 gap-6 lg:gap-5 lg:border-l lg:border-charcoal/15 lg:pl-8">
                {[['10', 'jednostek'], ['35', 'miejsc noclegowych'], ['4,9', 'ocena w Google (135 opinii)']].map(([n, l]) => (
                  <div key={l}>
                    <div className="font-serif text-forest leading-none" style={{ fontSize: 'clamp(34px, 4vw, 52px)', fontWeight: 420 }}>{n}</div>
                    <div className="eyebrow text-charcoal/55 mt-2 text-[10.5px]">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Jednostki */}
      <section className="relative bg-cream-2 py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {units.map((u) => (
              <article key={u.kind} className="reveal-lg card-lift group bg-cream rounded-sm overflow-hidden flex flex-col">
                <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                  <div className="absolute inset-0 zoom-img bg-cover bg-center" style={{ backgroundImage: `url(${u.img})` }} />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(28,28,28,0) 55%, rgba(28,28,28,0.55) 100%)' }} />
                  <div className="absolute top-5 left-5 flex items-center gap-3">
                    <span className="px-3 py-1.5 rounded-full bg-cream/95 text-forest eyebrow text-[11px]">{u.kind}</span>
                    <span className="px-3 py-1.5 rounded-full bg-charcoal/40 backdrop-blur-md text-cream eyebrow text-[11px]">{u.sqm}</span>
                  </div>
                  <div className="absolute bottom-5 right-5 text-cream eyebrow text-[11px]">{u.price}</div>
                </div>
                <div className="p-8 md:p-10 flex flex-col flex-1">
                  <h3 className="font-serif text-charcoal text-3xl md:text-4xl leading-tight">{u.title}</h3>
                  <p className="mt-4 text-charcoal/70 text-[15px] leading-relaxed text-pretty">{u.intro}</p>
                  <ul className="mt-6 flex flex-col gap-y-3">
                    {u.features.map((f) => (
                      <li key={f} className="text-charcoal/75 text-[14.5px] pl-5 relative">
                        <span className="absolute left-0 top-[0.55em] w-1.5 h-1.5 bg-gold rotate-45" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="hairline my-8" />
                  <div className="mt-auto">
                    <Button href="/kontakt" size="sm">Zapytaj o termin</Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-8 text-charcoal/55 text-[13.5px] max-w-2xl">
            Ceny orientacyjne, zależą od sezonu i długości pobytu. Aktualną stawkę i dostępność potwierdzamy telefonicznie lub mailem — prosimy o kontakt.
            Zaliczka 30% w ciągu 2 dni od potwierdzenia rezerwacji.
          </p>
        </Container>
      </section>

      {/* Udogodnienia */}
      <section className="relative bg-cream py-20 md:py-28">
        <Container>
          <SectionHeading eyebrow="Udogodnienia" title={<>Wszystko, czego trzeba <span className="italic font-[380]">na miejscu</span>.</>} className="max-w-2xl mb-14" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-10">
            {amenities.map((a) => {
              const I = ICONS[a.icon]
              return (
                <div key={a.t} className="reveal">
                  <div className="w-12 h-12 rounded-full bg-forest/5 border border-forest/15 flex items-center justify-center text-forest mb-4">
                    <I size={20} stroke={1.3} />
                  </div>
                  <div className="font-serif text-charcoal text-xl leading-tight">{a.t}</div>
                  <div className="text-charcoal/60 text-[14px] mt-2 leading-relaxed">{a.s}</div>
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Zasady */}
      <section className="relative bg-stone py-16 md:py-20">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              ['Zameldowanie', 'od 14:00'],
              ['Wymeldowanie', 'do 10:00'],
              ['Zwierzęta', 'niestety nie przyjmujemy'],
              ['Cisza i czystość', 'obiekt w całości dla niepalących'],
            ].map(([k, v]) => (
              <div key={k}>
                <div className="eyebrow text-charcoal/50 mb-2">{k}</div>
                <div className="text-charcoal/85 text-[15px] leading-snug">{v}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  )
}
