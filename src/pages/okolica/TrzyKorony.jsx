import { PageHero } from '../../components/ui/PageHero.jsx'
import { Container } from '../../components/ui/Container.jsx'
import { SectionHeading } from '../../components/ui/SectionHeading.jsx'
import { CTASection } from '../../components/ui/CTASection.jsx'
import { FactTable, FAQ, InfoNote, RelatedLinks } from '../../components/ui/content.jsx'
import { PHOTOS } from '../../data/content.js'

const szlak = [
  ['Start', 'Schronisko PTTK, Sobczańska 91 (~15 min pieszo od obiektu)'],
  ['Szczyt', 'Okrąglica, 982 m n.p.m. — taras widokowy'],
  ['Długość (w obie strony)', '~7 km'],
  ['Czas wejścia', '~1 h 45 min – 2 h'],
  ['Czas zejścia', '~1 h 15 min – 1 h 30 min'],
  ['Przewyższenie', '~500–570 m'],
  ['Trudność', 'łatwa / łatwo-średnia (zabezpieczone schody i kładki)'],
]

const taras = [
  ['Bilet normalny', '10 zł'],
  ['Bilet ulgowy', '5 zł'],
  ['Dzieci do 7 lat', 'bezpłatnie'],
  ['Okres poboru opłat', '1 kwietnia – 15 listopada'],
  ['Płatność', 'wyłącznie gotówka (na szczycie)'],
  ['Wstęp do Pienińskiego PN', 'bezpłatny'],
]

const faq = [
  {
    q: 'Którędy jest najkrótsze wejście na Trzy Korony?',
    a: 'Najkrótszy i najłatwiejszy szlak prowadzi żółtym znakiem ze Sromowiec Niżnych, przez Wąwóz Szopczański na Przełęcz Szopka, a stamtąd metalowymi kładkami na taras na Okrąglicy (982 m). Start jest przy Schronisku PTTK „Trzy Korony” — około 15 minut pieszo od Willi Wójcik, tą samą ulicą. Warianty z Krościenka czy Szczawnicy są znacznie dłuższe.',
  },
  {
    q: 'Ile trwa wejście na Trzy Korony ze Sromowiec Niżnych?',
    a: 'Na taras wchodzi się w około 1 h 45 min – 2 h, a schodzi w 1 h 15 min – 1 h 30 min. Cała wycieczka, bez kolejki na szczycie, zajmuje mniej więcej 3 h 45 min – 4 h. W sezonie do czasu trzeba doliczyć nawet godzinę oczekiwania na wąskim tarasie.',
  },
  {
    q: 'Ile kosztuje wejście na taras na Trzech Koronach w 2026 roku?',
    a: 'Bilet normalny to 10 zł, ulgowy 5 zł, a dzieci do 7 lat wchodzą za darmo. Opłatę pobiera się od 1 kwietnia do 15 listopada, wyłącznie gotówką — na szczycie nie ma terminala ani bankomatu. Sam wstęp do parku i wejście na szczyt są bezpłatne; płaci się dopiero za wejście na platformę. Ten sam bilet jest ważny tego samego dnia także na Sokolicy.',
  },
  {
    q: 'Czy da się wejść na Trzy Korony z dziećmi?',
    a: 'Tak, to jeden z najbardziej rodzinnych szlaków w Pieninach — bez wspinaczki, z zabezpieczonymi schodami i kładkami z poręczami. Starsze dzieci idą same, najmłodsze najlepiej nieść w nosidle (wózkiem się nie da). Warto pilnować dzieci na kładkach i na tarasie.',
  },
  {
    q: 'Kiedy najlepiej wyjść na szlak?',
    a: 'Wcześnie rano — start około 7:00–8:00 oznacza mniejsze kolejki na tarasie (mieści się na nim około 30 osób) i spokojniejsze szlaki. Najbardziej oblegany bywa szczyt między 11:00 a 15:00 w weekendy i wakacje. Dobre buty i coś ciepłego na zmienną górską pogodę to podstawa.',
  },
]

export default function TrzyKorony() {
  return (
    <>
      <PageHero
        eyebrow="Atrakcje · Pieniński Park Narodowy"
        title="Trzy Korony — szlak spod naszego progu"
        subtitle="Najkrótsze wejście na najsłynniejszy szczyt Pienin zaczyna się przy tej samej ulicy co Willa Wójcik. Około 15 minut pieszo i są Państwo na szlaku — bez dojazdu autem."
        image={PHOTOS.heroTrzyKorony}
        imageAlt="Ilustracja: wapienne turnie Trzech Koron w złotym świetle, nad lasem i poranną mgłą"
        crumbs={[{ label: 'Strona główna', href: '/' }, { label: 'Okolica', href: '/okolica' }, { label: 'Trzy Korony' }]}
      />

      <section className="relative bg-cream py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7">
              <p className="text-charcoal text-lg md:text-xl leading-[1.7] text-pretty font-medium">
                Na taras na Okrąglicy (982 m) wchodzi się ze Sromowiec Niżnych w około 1 h 45 min – 2 h. To najkrótsze i najłatwiejsze wejście na Trzy Korony — a jego początek leży niecały kilometr od naszego obiektu.
              </p>
              <div className="mt-8 space-y-4 text-charcoal/75 text-[17px] leading-[1.8] text-pretty">
                <p>
                  Szlak startuje przy Schronisku PTTK „Trzy Korony” (Sobczańska 91), dokładnie u wylotu Wąwozu Szopczańskiego. To ta sama ulica, przy której stoi Willa Wójcik — goście wychodzą na szlak praktycznie spod obiektu, w około 15 minut, bez samochodu i bez opłaty za parking.
                </p>
                <p>
                  Trasa prowadzi leśnymi schodami przez wąwóz na Przełęcz Szopka, a potem zabezpieczonymi kładkami między turniami — aż na taras z panoramą na Tatry, Przełom Dunajca i Jezioro Czorsztyńskie.
                </p>
              </div>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <div className="eyebrow text-charcoal/65 mb-4">Szlak w liczbach</div>
              <FactTable rows={szlak} />
            </div>
          </div>
        </Container>
      </section>

      {/* Taras — ceny */}
      <section className="relative bg-cream-2 py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <SectionHeading eyebrow="01 — Taras widokowy" title={<>Wejście na <span className="italic font-normal">szczyt</span>.</>} />
              <p className="mt-6 text-charcoal/75 text-[17px] leading-[1.8] text-pretty">
                Sam szlak i wstęp do Pienińskiego Parku Narodowego są bezpłatne. Opłatę pobiera się tylko za wejście na platformę widokową na samym szczycie — od 1 kwietnia do 15 listopada.
              </p>
              <InfoNote label="Ważne" className="mt-8">
                Na szczycie zapłacą Państwo <strong className="text-charcoal">wyłącznie gotówką</strong> — nie ma tam terminala ani bankomatu. Warto wziąć kilka złotych na osobę. Ceny podajemy według stanu na 2026 rok; park aktualizuje cennik co roku, więc prosimy sprawdzić przed wyjściem.
              </InfoNote>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <FactTable rows={taras} />
              <p className="mt-5 text-charcoal/70 text-[14px] leading-relaxed">
                Bilet z Trzech Koron jest ważny tego samego dnia także na Sokolicy (747 m) — sąsiednim tarasie, znanym z reliktowych sosen „wiszących” nad przepaścią. W jeden dzień można zaliczyć oba widoki.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="relative bg-cream py-20 md:py-28">
        <Container>
          <SectionHeading eyebrow="02 — Najczęstsze pytania" title="Trzy Korony — w skrócie" className="max-w-2xl mb-12" />
          <FAQ items={faq} />
        </Container>
      </section>

      <RelatedLinks
        items={[
          { href: '/okolica/splyw-dunajcem', title: 'Spływ Dunajcem', note: 'Przełom Dunajca od dołu, tratwą flisacką' },
          { href: '/okolica/kladka-czerwony-klasztor', title: 'Kładka i Czerwony Klasztor', note: '250 m spacerem na Słowację' },
          { href: '/pokoje-i-apartamenty', title: 'Pokoje i apartamenty', note: 'Nocleg u podnóża Trzech Koron' },
        ]}
      />

      <CTASection
        title="Na Trzy Korony wychodzi się spod progu."
        text="Najkrótszy szlak zaczyna się przy tej samej ulicy — bez dojazdu i bez opłaty za parking."
      />
    </>
  )
}
