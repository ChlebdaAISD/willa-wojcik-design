import { PageHero } from '../../components/ui/PageHero.jsx'
import { Container } from '../../components/ui/Container.jsx'
import { SectionHeading } from '../../components/ui/SectionHeading.jsx'
import { CTASection } from '../../components/ui/CTASection.jsx'
import { FactTable, FAQ, InfoNote, RelatedLinks } from '../../components/ui/content.jsx'
import { PHOTOS } from '../../data/content.js'

const kladka = [
  ['Odległość od obiektu', '~250 m · 3–4 min pieszo'],
  ['Rok otwarcia', '2006 (w 2026 mija 20 lat)'],
  ['Długość', 'ok. 150 m, przęsło główne 90 m'],
  ['Dla kogo', 'piesi i rowerzyści (bez ruchu aut)'],
  ['Przejście', 'bezpłatne, całodobowe, bez kontroli'],
]

const muzeum = [
  ['Bilet — dorosły', '6 €'],
  ['Bilet — senior / student', '4 €'],
  ['Bilet — uczeń', '3 €'],
  ['Dzieci do 6 lat', 'bezpłatnie'],
  ['Godziny (lato: VI–VIII)', '8:00 – 19:00'],
  ['Godziny (wiosna/jesień)', '9:00 – 17:00'],
]

const faq = [
  {
    q: 'Jak z Willi Wójcik dostać się na Słowację?',
    a: 'Pieszo lub rowerem przez kładkę na Dunajcu — to około 250 metrów od obiektu, kilka minut spacerem. Kładka łączy Sromowce Niżne z Czerwonym Klasztorem po słowackiej stronie. Przejście jest bezpłatne, całodobowe i bez żadnych kontroli granicznych.',
  },
  {
    q: 'Czy potrzebny jest paszport, żeby przejść na Słowację?',
    a: 'Nie — Polska i Słowacja należą do strefy Schengen, więc granicę przekracza się swobodnie. Paszport nie jest potrzebny, ale warto mieć przy sobie dowód osobisty (także dla dzieci), bo służby mogą wyrywkowo sprawdzić tożsamość. Na Słowacji płaci się w euro.',
  },
  {
    q: 'Co warto zobaczyć w Czerwonym Klasztorze?',
    a: 'Dawny klasztor Kartuzów z 1330 roku, dziś muzeum z audioprzewodnikiem w cenie biletu (dorosły 6 €). To tutaj żył brat Cyprian — mnich zielarz, który według legendy przeleciał na własnoręcznie zbudowanych skrzydłach z Trzech Koron. Na miejscu jest też karczma z regionalną kuchnią, pokazy ptaków drapieżnych i wypożyczalnia rowerów.',
  },
  {
    q: 'Czy Drogą Pienińską można jechać rowerem z dziećmi?',
    a: 'Tak — to jedna z najładniejszych i najłatwiejszych tras rowerowych w Pieninach. Około 10 km wzdłuż Przełomu Dunajca, szutrowa, bez ruchu samochodowego, z łagodnymi podjazdami. Spokojnie przejedzie ją rodzina z dziećmi w 30–60 minut w jedną stronę. Rowery można wypożyczyć przy klasztorze.',
  },
]

export default function KladkaCzerwonyKlasztor() {
  return (
    <>
      <PageHero
        eyebrow="Atrakcje · granica polsko-słowacka"
        title="Kładka na Dunajcu i Czerwony Klasztor"
        subtitle="250 metrów od naszego progu do kładki, a stamtąd kilka minut na Słowację — pieszo lub rowerem, bez kontroli granicznych. To najbliższa i najbardziej niecodzienna atrakcja Sromowiec Niżnych."
        image={PHOTOS.buildingWinter}
        crumbs={[{ label: 'Strona główna', href: '/' }, { label: 'Okolica', href: '/okolica' }, { label: 'Kładka i Czerwony Klasztor' }]}
      />

      <section className="relative bg-cream py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7">
              <p className="font-serif text-charcoal text-2xl md:text-3xl leading-[1.4] text-balance">
                Kładka pieszo-rowerowa na Dunajcu łączy Sromowce Niżne z Czerwonym Klasztorem na Słowacji. Leży około 250 metrów od Willi Wójcik — na Słowację wychodzi się więc dosłownie na spacer, bez samochodu.
              </p>
              <div className="mt-8 space-y-4 text-charcoal/75 text-[17px] leading-[1.8] text-pretty">
                <p>
                  To niepozorny, a rekordowy most: drewniana konstrukcja wantowa z 2006 roku, której główne przęsło ma 90 metrów — najwięcej wśród tego typu drewnianych mostów w Europie. W 2026 roku mija dwadzieścia lat od jej otwarcia.
                </p>
                <p>
                  Do 2007 roku było tu przejście graniczne. Dziś, w strefie Schengen, przechodzi się swobodnie — na drugim brzegu czeka klasztor, karczma i jedna z najpiękniejszych tras rowerowych w Pieninach.
                </p>
              </div>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <div className="eyebrow text-charcoal/50 mb-4">Kładka w liczbach</div>
              <FactTable rows={kladka} />
            </div>
          </div>
        </Container>
      </section>

      {/* Czerwony Klasztor */}
      <section className="relative bg-cream-2 py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <SectionHeading eyebrow="Za kładką · Słowacja" title={<>Czerwony <span className="italic font-[380]">Klasztor</span>.</>} />
              <div className="mt-6 space-y-4 text-charcoal/75 text-[16.5px] leading-[1.8] text-pretty">
                <p>
                  Dawny klasztor Kartuzów, założony w 1330 roku, później zamieszkany przez Kamedułów. Dziś to muzeum z audioprzewodnikiem w cenie — i miejsce, w którym żył legendarny brat Cyprian, zielarz, który miał przelecieć na skrzydłach z Trzech Koron.
                </p>
                <p>
                  Na miejscu warto zajrzeć do „Karczmy pod Lipami” na smażony ser i klasztorne piwo, obejrzeć pokaz ptaków drapieżnych albo wypożyczyć rower na Drogę Pienińską.
                </p>
              </div>
              <InfoNote label="Praktycznie" className="mt-8">
                Na Słowacji płaci się w <strong className="text-charcoal">euro</strong> — warto mieć gotówkę lub kartę. Godziny i ceny pokazów sokolniczych bywają sezonowe; najlepiej potwierdzić je na miejscu.
              </InfoNote>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <div className="eyebrow text-charcoal/50 mb-4">Muzeum — bilety i godziny 2026</div>
              <FactTable rows={muzeum} />
              <p className="mt-5 text-charcoal/60 text-[14px] leading-relaxed">
                Muzeum czynne przez cały rok, siedem dni w tygodniu. Ceny i godziny według oficjalnych danych na 2026 rok — prosimy potwierdzić przed wizytą.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Droga Pienińska */}
      <section className="relative bg-forest text-cream py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 grain opacity-50 pointer-events-none" />
        <Container className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-px bg-gold" />
                <span className="eyebrow text-cream/60">Droga Pienińska rowerem</span>
              </div>
              <h2 className="font-serif text-cream leading-[1.1]" style={{ fontSize: 'clamp(26px, 3.2vw, 42px)', fontWeight: 440 }}>
                Dziesięć kilometrów wzdłuż <span className="italic font-[380]">przełomu</span>.
              </h2>
              <p className="mt-5 text-cream/75 text-[16.5px] leading-[1.8] text-pretty max-w-xl">
                Za kładką zaczyna się słowacka Droga Pienińska — płaska, szutrowa trasa wzdłuż Przełomu Dunajca do Szczawnicy. Bez ruchu aut, z widokiem na pionowe skały. Rodzina z dziećmi przejedzie ją w 30–60 minut w jedną stronę, wracając tą samą drogą lub przez kładkę.
              </p>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <div className="grid grid-cols-2 gap-6">
                {[['~10 km', 'wzdłuż przełomu'], ['0', 'ruchu samochodów'], ['30–60', 'minut rowerem'], ['tak', 'z dziećmi']].map(([n, l]) => (
                  <div key={l}>
                    <div className="font-serif text-cream leading-none" style={{ fontSize: 'clamp(28px, 3.4vw, 40px)', fontWeight: 420 }}>{n}</div>
                    <div className="eyebrow text-cream/55 mt-2 text-[10px]">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="relative bg-cream py-20 md:py-28">
        <Container>
          <SectionHeading eyebrow="Najczęstsze pytania" title="Kładka i Słowacja — w skrócie" className="max-w-2xl mb-12" />
          <FAQ items={faq} />
        </Container>
      </section>

      <RelatedLinks
        items={[
          { href: '/okolica/splyw-dunajcem', title: 'Spływ Dunajcem', note: 'Przełom Dunajca od dołu, tratwą flisacką' },
          { href: '/okolica/trzy-korony', title: 'Trzy Korony', note: 'Najkrótszy szlak zaczyna się przy naszej ulicy' },
          { href: '/okolica', title: 'Wszystkie atrakcje', note: 'Zamki, jezioro, narty i termy w okolicy' },
        ]}
      />

      <CTASection
        title="Śniadanie w Polsce, obiad na Słowacji?"
        text="Z Willi Wójcik to kwestia krótkiego spaceru przez kładkę. Sprawdzimy wolny termin."
      />
    </>
  )
}
