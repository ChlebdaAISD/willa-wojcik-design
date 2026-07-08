import { Link } from 'wouter'
import { PageHero } from '../components/ui/PageHero.jsx'
import { Container } from '../components/ui/Container.jsx'
import { SectionHeading } from '../components/ui/SectionHeading.jsx'
import { CTASection } from '../components/ui/CTASection.jsx'
import { ICONS, IconArrow } from '../components/Icons.jsx'
import { PHOTOS } from '../data/content.js'

// Trzy główne atrakcje — mają własne, szczegółowe podstrony.
// Karty typograficzne (wzorzec z home) — bez zdjęć-zapchajdziur;
// ilustracje per atrakcja wskoczą tu po dostarczeniu (public/images/hero/).
const featured = [
  {
    href: '/okolica/trzy-korony',
    idx: '01',
    title: 'Trzy Korony',
    note: 'Najkrótszy szlak na szczyt (982 m) zaczyna się przy tej samej ulicy co Willa Wójcik — około 15 minut pieszo.',
    dist: '~1 km',
  },
  {
    href: '/okolica/kladka-czerwony-klasztor',
    idx: '02',
    title: 'Kładka i Czerwony Klasztor',
    note: 'Spacerem lub rowerem na Słowację — bez kontroli granicznych, w kilka minut.',
    dist: '250 m',
  },
  {
    href: '/okolica/splyw-dunajcem',
    idx: '03',
    title: 'Spływ Dunajcem',
    note: 'Tratwą flisacką przez Przełom Dunajca — od 111 zł. Druga przystań działa w tej samej wsi.',
    dist: 'Kąty · ~4–5 km',
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
        title="Blisko do wszystkiego, co w Pieninach najlepsze"
        subtitle="Sromowce Niżne leżą u zbiegu trzech atrakcji: spływu Dunajcem, najkrótszego wejścia na Trzy Korony i kładki na Słowację. Wszystko w zasięgu spaceru lub krótkiej jazdy."
        image={PHOTOS.heroOkolica}
        imageAlt="Ilustracja: dolina Dunajca w Pieninach — rzeka wije się między zalesionymi zboczami pod Trzema Koronami"
        crumbs={[{ label: 'Strona główna', href: '/' }, { label: 'Okolica' }]}
      />

      {/* 3 główne atrakcje */}
      <section className="relative bg-cream py-20 md:py-28">
        <Container>
          <SectionHeading
            eyebrow="01 — Trzy powody"
            title={<>Wszystko zaczyna się <span className="italic font-normal">pod obiektem</span>.</>}
            className="max-w-2xl mb-14 reveal"
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
            {featured.map((n, k) => (
              <Link key={n.href} href={n.href}
                    className="reveal group flex flex-col justify-between rounded-sm border border-charcoal/20 bg-cream-2/60 p-6 md:p-8 min-h-[230px] transition-all duration-500 hover:bg-cream-2 hover:border-transparent hover:-translate-y-1 hover:shadow-[0_30px_50px_-30px_rgba(31,58,46,0.35)]"
                    style={{ '--d': `${k * 0.08}s` }}>
                <div>
                  <div className="font-mono text-gold-2 text-[12px]" aria-hidden="true">.{n.idx}</div>
                  <div className="font-serif text-charcoal text-2xl md:text-3xl leading-tight mt-2" style={{ fontWeight: 500 }}>{n.title}</div>
                  <div className="text-charcoal/70 text-[14px] mt-3 leading-relaxed text-pretty">{n.note}</div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <span className="font-mono text-charcoal/70 text-[13px]">{n.dist}</span>
                  <span className="inline-flex items-center gap-1.5 text-forest text-[13.5px] font-semibold">
                    Zobacz szczegóły
                    <IconArrow size={13} className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Pozostałe atrakcje */}
      <section className="relative bg-cream-2 py-20 md:py-28">
        <Container>
          <SectionHeading eyebrow="02 — W okolicy" title={<>Na cały dzień <span className="italic font-normal">i na złą pogodę</span>.</>} className="max-w-2xl mb-14" />
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
                      <div className="font-mono text-charcoal/70 text-[12px]">{m.d}</div>
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
      <section className="relative bg-stone py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-px bg-gold" />
                <span className="eyebrow text-charcoal/70">03 — Odległości od obiektu</span>
              </div>
              <h2 className="font-serif text-charcoal leading-[1.05]" style={{ fontSize: 'clamp(28px, 3.4vw, 44px)', fontWeight: 500 }}>
                Ile stąd <span className="italic font-normal">dokąd</span>.
              </h2>
              <p className="mt-5 text-charcoal/65 text-[15px] leading-relaxed max-w-xs">
                Wszystko liczone od naszego progu przy Sobczańskiej 9a. Dwie najbliższe atrakcje osiągną Państwo pieszo.
              </p>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <ul className="divide-y divide-charcoal/15">
                {distances.map(([place, dist]) => (
                  <li key={place} className="flex items-center justify-between gap-6 py-4">
                    <span className="text-charcoal/85 text-[15px] md:text-lg">{place}</span>
                    <span className="font-mono text-charcoal/75 text-[13px] md:text-[15px] whitespace-nowrap">{dist}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-charcoal/65 text-[12px]">Odległości drogowe orientacyjne — przez ukształtowanie doliny bywają dłuższe niż w linii prostej.</p>
            </div>
          </div>
        </Container>
      </section>

      <CTASection
        title="Willa Wójcik jako baza wypadowa?"
        text="Najlepiej zwiedza się Pieniny, wracając wieczorem w to samo miejsce — kilka minut od spływu, szlaku i kładki."
      />
    </>
  )
}
