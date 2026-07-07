import { PageHero } from '../../components/ui/PageHero.jsx'
import { Container } from '../../components/ui/Container.jsx'
import { SectionHeading } from '../../components/ui/SectionHeading.jsx'
import { CTASection } from '../../components/ui/CTASection.jsx'
import { FactTable, FAQ, InfoNote, RelatedLinks } from '../../components/ui/content.jsx'
import { PHOTOS } from '../../data/content.js'

const trasy = [
  ['Kąty → Szczawnica (najpopularniejsza)', '~18 km · ok. 2 h 15 min'],
  ['Kąty → Krościenko (najdłuższa)', '~23 km · ok. 2 h 45 min'],
  ['Sromowce Niżne → Szczawnica (najkrótsza)', '~12 km · ok. 1 h 40 min'],
]

const ceny = [
  ['Trasa do Szczawnicy — dorosły', 'od 111 zł'],
  ['Trasa do Szczawnicy — dziecko do 10 lat', 'od 78 zł'],
  ['Trasa do Krościenka — dorosły', 'od 134 zł'],
  ['Powrót busem do auta', '~18–20 zł (dziecko 15 zł)'],
  ['Powrót rowerem Drogą Pienińską', '50 zł'],
]

const faq = [
  {
    q: 'Ile kosztuje spływ Dunajcem w 2026 roku?',
    a: 'Tratwa flisacka na trasie do Szczawnicy to od 111 zł za osobę dorosłą i od 78 zł za dziecko do 10 lat (ceny zależą od sezonu). Dłuższa trasa do Krościenka jest droższa. Do tego dochodzi powrót do auta — busem ok. 18–20 zł albo rowerem 50 zł. Ceny podajemy według cennika flisaków na 2026 rok; prosimy sprawdzić aktualne stawki przed wyjściem.',
  },
  {
    q: 'Skąd startuje spływ najbliżej Willi Wójcik?',
    a: 'Główna przystań flisacka to Kąty w Sromowcach Wyżnych — około 4–5 km od obiektu. Druga oficjalna przystań działa w samych Sromowcach Niżnych i oferuje krótszą trasę — leży w tej samej wsi co Willa Wójcik. Chętnie podpowiemy Państwu najlepszy wariant na miejscu.',
  },
  {
    q: 'Czy spływ Dunajcem jest odpowiedni dla małych dzieci?',
    a: 'Tak — rzeka na tym odcinku jest spokojna, a łodzie płyną wolno. Dla najmłodszych lepsza bywa krótsza trasa ze Sromowiec Niżnych (ok. 1 h 40 min) niż pełne 2 h 15 min. Kamizelki są dostępne na życzenie. Warto zabrać dokument potwierdzający wiek dziecka do biletu ulgowego.',
  },
  {
    q: 'Czy trzeba rezerwować spływ z wyprzedzeniem?',
    a: 'Nie — bilety kupuje się na bieżąco w kasie, a tratwa wypływa po zebraniu kompletu (minimum 11 osób). W szczycie sezonu, w słoneczne weekendy lipca i sierpnia, między 10:00 a 14:00 bywają kolejki i pełne parkingi — najlepiej przyjechać rano.',
  },
  {
    q: 'Kiedy działa spływ Dunajcem?',
    a: 'Sezon flisacki trwa od 1 kwietnia do 31 października, codziennie poza Niedzielą Wielkanocną i Bożym Ciałem. Kasy otwierają się rano — w wakacje już od 8:00.',
  },
]

export default function SplywDunajcem() {
  return (
    <>
      <PageHero
        eyebrow="Atrakcje · Sromowce Niżne"
        title="Spływ Dunajcem — prosto z naszej wsi"
        subtitle="Symbol Pienin i najlepszy sposób, żeby zobaczyć Przełom Dunajca od dołu. Willa Wójcik leży w Sromowcach Niżnych, przy jednej z dwóch przystani."
        image={PHOTOS.balconyView}
        crumbs={[{ label: 'Strona główna', href: '/' }, { label: 'Okolica', href: '/okolica' }, { label: 'Spływ Dunajcem' }]}
      />

      <section className="relative bg-cream py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7">
              <p className="text-charcoal text-lg md:text-xl leading-[1.7] text-pretty font-medium">
                Spływ Dunajcem tratwą flisacką prowadzi przez Przełom Dunajca w Pienińskim Parku Narodowym, u stóp Trzech Koron. Trwa od około 1 h 40 min do 2 h 45 min, zależnie od trasy, a kosztuje od 111 zł za dorosłego.
              </p>
              <div className="mt-8 space-y-4 text-charcoal/75 text-[17px] leading-[1.8] text-pretty">
                <p>
                  To najspokojniejszy sposób, żeby zobaczyć pionowe skały wznoszące się na kilkadziesiąt metrów nad wodą. Flisak prowadzi tratwę i opowiada — Państwo tylko patrzą. Rzeka ma tu drugą, łagodną klasę trudności, więc nie trzeba umieć pływać ani nic wiosłować.
                </p>
                <p>
                  Największy atut naszej lokalizacji jest prosty: nie muszą Państwo daleko dojeżdżać. Główna przystań w Kątach to kilka kilometrów, a druga, ze Sromowiec Niżnych, leży w tej samej wsi co obiekt.
                </p>
              </div>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <div className="eyebrow text-charcoal/50 mb-4">Trasy i czas</div>
              <FactTable rows={trasy} />
              <div className="mt-6 text-charcoal/55 text-[13px]">Trasa wiedzie obok Trzech Koron; klasa wody II (spokojna).</div>
            </div>
          </div>
        </Container>
      </section>

      {/* Ceny */}
      <section className="relative bg-cream-2 py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <SectionHeading eyebrow="Cennik 2026" title={<>Ile to <span className="italic font-[380]">kosztuje</span>.</>} />
              <p className="mt-6 text-charcoal/75 text-[17px] leading-[1.8] text-pretty">
                Flisacy mają dwa progi cenowe: normalny i ulgowy (dziecko do 10 lat). Stawka zależy od trasy i sezonu — poniżej ceny wyjściowe na 2026 rok. Rower lub duży bagaż to dopłata 50 zł; mały pies na kolanach płynie za darmo.
              </p>
              <InfoNote label="Dobrze wiedzieć" className="mt-8">
                Spływ jest jednokierunkowy — kończy się w Szczawnicy lub Krościenku, więc trzeba wrócić do auta. Najprzyjemniej rowerem, malowniczą Drogą Pienińską wzdłuż przełomu (50 zł z wypożyczeniem).
              </InfoNote>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <FactTable rows={ceny} />
              <p className="mt-5 text-charcoal/55 text-[13px] leading-relaxed">
                Ceny orientacyjne, według cennika flisaków na 2026 rok — prosimy potwierdzić przed wyjściem. Bilety kupuje się w kasie na miejscu; rezerwacja z wyprzedzeniem nie jest potrzebna (poza grupami).
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Alternatywa: kajaki */}
      <section className="relative bg-cream py-20 md:py-28">
        <Container>
          <SectionHeading eyebrow="Alternatywa" title={<>Wolą Państwo <span className="italic font-[380]">wiosłować</span>?</>} className="max-w-2xl mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-charcoal/75 text-[16.5px] leading-[1.8] text-pretty">
            <p>
              Zamiast tratwy można popłynąć pontonem lub kajakiem z lokalną wypożyczalnią. To bardziej aktywna wersja tej samej przygody — z transportem na start w Sromowcach i szkoleniem w cenie. Warianty zaczynają się od 85 zł za dorosłego i od 18 km trasy.
            </p>
            <p>
              To dobra opcja dla rodzin: ponton przyjmuje dzieci już od 3 lat, kajak dwuosobowy z dorosłym od 7 lat, a maluchy do 4 lat płyną za darmo. Rezerwacja online, płatność na miejscu — bez zaliczki.
            </p>
          </div>
        </Container>
      </section>

      {/* Co zabrać */}
      <section className="relative bg-forest text-cream py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 grain opacity-50 pointer-events-none" />
        <Container className="relative">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-8 h-px bg-gold" />
            <span className="eyebrow text-cream/60">Co zabrać na spływ</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4 text-cream/85 text-[15px]">
            {['Butelka wody i nakrycie głowy', 'Kurtka przeciwdeszczowa (łodzie są odkryte)', 'Krem z filtrem', 'Coś ciepłego na zmianę pogody', 'Dokument dziecka do biletu ulgowego', 'Aparat na Przełom Dunajca'].map((x) => (
              <div key={x} className="flex items-start gap-3">
                <span className="mt-2 w-1.5 h-1.5 bg-gold rotate-45 shrink-0" />
                <span>{x}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="relative bg-cream py-20 md:py-28">
        <Container>
          <SectionHeading eyebrow="Najczęstsze pytania" title="Spływ Dunajcem — w skrócie" className="max-w-2xl mb-12" />
          <FAQ items={faq} />
        </Container>
      </section>

      <RelatedLinks
        items={[
          { href: '/okolica/trzy-korony', title: 'Trzy Korony', note: 'Najkrótszy szlak zaczyna się przy naszej ulicy' },
          { href: '/okolica/kladka-czerwony-klasztor', title: 'Kładka i Czerwony Klasztor', note: '250 m spacerem na Słowację' },
          { href: '/pokoje-i-apartamenty', title: 'Pokoje i apartamenty', note: 'Nocleg u podnóża Pienin' },
        ]}
      />

      <CTASection
        title="Spływ Dunajcem zaczyna się w naszej wsi."
        text="Zatrzymają się Państwo w Sromowcach Niżnych, kilka minut od przystani flisackiej."
      />
    </>
  )
}
