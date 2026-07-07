import { PageHero } from '../components/ui/PageHero.jsx'
import { Container } from '../components/ui/Container.jsx'
import { SectionHeading } from '../components/ui/SectionHeading.jsx'
import { ImageCard } from '../components/ui/ImageCard.jsx'
import { CTASection } from '../components/ui/CTASection.jsx'
import { ICONS } from '../components/Icons.jsx'
import { PHOTOS } from '../data/content.js'

// Trzy główne atrakcje — mają własne, szczegółowe podstrony.
const featured = [
  {
    href: '/okolica/splyw-dunajcem',
    image: PHOTOS.balconyView,
    eyebrow: 'Przystań w Sromowcach Niżnych',
    title: 'Spływ Dunajcem',
    note: 'Tratwą flisacką przez Przełom Dunajca — od 111 zł. Startują Państwo praktycznie z naszej wsi.',
  },
  {
    href: '/okolica/trzy-korony',
    image: PHOTOS.snow,
    eyebrow: '~15 minut pieszo od obiektu',
    title: 'Trzy Korony',
    note: 'Najkrótszy szlak na szczyt (982 m) zaczyna się przy tej samej ulicy co Willa Wójcik.',
  },
  {
    href: '/okolica/kladka-czerwony-klasztor',
    image: PHOTOS.buildingWinter,
    eyebrow: '250 m od obiektu',
    title: 'Kładka i Czerwony Klasztor',
    note: 'Spacerem lub rowerem na Słowację — bez kontroli granicznych, w kilka minut.',
  },
]

// Pozostałe atrakcje — w formie hubu z odległościami (bez osobnych podstron).
const more = [
  { icon: 'IconCastle', t: 'Zamek Dunajec w Niedzicy', d: '11 km · ~15 min autem', s: 'Najbardziej znany zamek okolicy, z legendą o skarbie Inków i tarasem nad jeziorem. Bilet od 35 zł.' },
  { icon: 'IconRaft', t: 'Jezioro Czorsztyńskie i rejsy', d: '11–13 km', s: 'Rejs statkiem „Harnaś” (ok. 40 zł), przeprawa między zamkami Niedzica i Czorsztyn, plaża w Niedzicy.' },
  { icon: 'IconSki', t: 'Czorsztyn-Ski, Kluszkowce', d: '~13–15 km · ~20 min', s: 'Stok na górze Wdżar: 8 tras, wyciągi krzesełkowe. Łagodne, niebieskie zjazdy — dobre dla rodzin i dzieci uczących się jeździć.' },
  { icon: 'IconSpa', t: 'Termy Bania i inne baseny', d: '~30–35 km · ~45 min', s: 'Terma Bania w Białce, Gorący Potok w Szaflarach, Bukovina — ciepła woda o każdej porze roku. Plan na deszczowy dzień.' },
  { icon: 'IconHome', t: 'Kościół św. Katarzyny', d: '467 m · spacer', s: 'Drewniany kościół z ok. 1513 roku na Szlaku Architektury Drewnianej — dziś galeria sztuki. Najbliższy zabytek, za rogiem.' },
  { icon: 'IconMountain', t: 'Wąwóz Homole', d: '~25 km · ~35 min', s: 'Najbardziej efektowny łatwy szlak w okolicy — kładki, mostki i wodospad. Ok. 1 km spokojnym tempem, idealny z dziećmi.' },
]

const distances = [
  ['Kładka na Słowację (Czerwony Klasztor)', '250 m'],
  ['Kościół św. Katarzyny', '467 m'],
  ['Szlak na Trzy Korony (schronisko)', '~1 km · 15 min pieszo'],
  ['Przystań spływu — Kąty', '~4–5 km'],
  ['Zapora i elektrownia w Niedzicy', '10 km'],
  ['Zamek w Niedzicy', '11 km'],
  ['Ruiny zamku Czorsztyn', '13 km'],
  ['Stok Czorsztyn-Ski, Kluszkowce', '~13–15 km'],
]

export default function Okolica() {
  return (
    <>
      <PageHero
        eyebrow="Okolica i atrakcje"
        title="Blisko do wszystkiego, co w Pieninach najlepsze"
        subtitle="Sromowce Niżne leżą u zbiegu trzech atrakcji: spływu Dunajcem, najkrótszego wejścia na Trzy Korony i kładki na Słowację. Wszystko w zasięgu spaceru lub krótkiej jazdy."
        image={PHOTOS.snow}
        crumbs={[{ label: 'Strona główna', href: '/' }, { label: 'Okolica' }]}
      />

      {/* 3 główne atrakcje */}
      <section className="relative bg-cream py-20 md:py-28">
        <Container>
          <SectionHeading
            eyebrow="Trzy powody, dla których tu jest wyjątkowo"
            title={<>Wszystko zaczyna się <span className="italic font-[380]">pod obiektem</span>.</>}
            className="max-w-2xl mb-14"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map((a) => (
              <ImageCard key={a.href} {...a} arrow aspect="aspect-[3/4]" className="reveal-lg" />
            ))}
          </div>
        </Container>
      </section>

      {/* Pozostałe atrakcje */}
      <section className="relative bg-cream-2 py-20 md:py-28">
        <Container>
          <SectionHeading eyebrow="W okolicy" title={<>Na cały dzień <span className="italic font-[380]">i na złą pogodę</span>.</>} className="max-w-2xl mb-14" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {more.map((m) => {
              const I = ICONS[m.icon]
              return (
                <div key={m.t} className="reveal flex gap-5">
                  <div className="shrink-0 w-12 h-12 rounded-full bg-forest/5 border border-forest/15 flex items-center justify-center text-forest">
                    <I size={20} stroke={1.3} />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-baseline gap-x-3">
                      <div className="font-serif text-charcoal text-xl md:text-2xl leading-tight">{m.t}</div>
                      <div className="font-mono text-gold-2 text-[12px]">{m.d}</div>
                    </div>
                    <div className="text-charcoal/65 text-[14.5px] mt-2 leading-relaxed text-pretty max-w-md">{m.s}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Tabela odległości */}
      <section className="relative bg-forest text-cream py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 grain opacity-50 pointer-events-none" />
        <Container className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-px bg-gold" />
                <span className="eyebrow text-cream/60">Odległości od obiektu</span>
              </div>
              <h2 className="font-serif text-cream leading-[1.05]" style={{ fontSize: 'clamp(28px, 3.4vw, 44px)', fontWeight: 440 }}>
                Ile stąd <span className="italic font-[380]">dokąd</span>.
              </h2>
              <p className="mt-5 text-cream/70 text-[15px] leading-relaxed max-w-xs">
                Wszystko liczone od naszego progu przy Sobczańskiej 9a. Dwie najbliższe atrakcje osiągną Państwo pieszo.
              </p>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <ul className="divide-y divide-cream/15">
                {distances.map(([place, dist]) => (
                  <li key={place} className="reveal flex items-center justify-between gap-6 py-4">
                    <span className="text-cream/90 text-[15px] md:text-lg">{place}</span>
                    <span className="font-mono text-gold text-[13px] md:text-[15px] whitespace-nowrap">{dist}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-cream/45 text-[12px]">Odległości drogowe orientacyjne — przez ukształtowanie doliny bywają dłuższe niż w linii prostej.</p>
            </div>
          </div>
        </Container>
      </section>

      <CTASection
        title="Zrobią Państwo z tego bazę wypadową?"
        text="Najlepiej zwiedza się Pieniny, wracając wieczorem w to samo miejsce. Sprawdzimy wolny termin."
      />
    </>
  )
}
