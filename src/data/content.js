import heroMountain from '../assets/hero.webp'
import heroIllustration from '../assets/hero-trzy-korony-illustration.webp'
import heroPokoje from '../assets/hero-pokoje-illustration.webp'
import heroApartamenty from '../assets/hero-apartamenty-illustration.webp'
import heroGaleria from '../assets/hero-galeria-illustration.webp'
import heroOkolica from '../assets/hero-okolica-illustration.webp'
import heroSplyw from '../assets/hero-splyw-illustration.webp'
import heroTrzyKorony from '../assets/hero-3-korony-illustration.webp'
import heroKladka from '../assets/hero-kladka-illustration.webp'
import heroKontakt from '../assets/hero-kontakt-illustration.webp'
import buildingDusk from '../assets/screenshot-16-10-09.webp'
import buildingWinter from '../assets/screenshot-15-40-49.webp'
import apartment from '../assets/screenshot-15-41-20.webp'
import livingRoom from '../assets/screenshot-15-40-04.webp'
import livingRoom2 from '../assets/screenshot-15-41-35.webp'
import commonArea from '../assets/screenshot-15-40-11.webp'
import roomBirch from '../assets/room-interior-1.webp'
import terrace from '../assets/screenshot-16-10-50.webp'
import bathroom from '../assets/screenshot-15-41-03.webp'
import balconyView from '../assets/screenshot-15-40-31.webp'
// Realne zdjęcia apartamentów (dostarczone przez klienta 2026-07, źródła w public/images/apartament_1|3)
import ap1SalonAneks from '../assets/ap1-salon-aneks.webp'
import ap1SalonWidok from '../assets/ap1-salon-widok.webp'
import ap1Sypialnia from '../assets/ap1-sypialnia.webp'
import ap3Antresola from '../assets/ap3-wnetrze-antresola.webp'
import ap3SalonJadalnia from '../assets/ap3-salon-jadalnia.webp'
import ap3JadalniaTv from '../assets/ap3-jadalnia-tv.webp'
import ap3SypialniaGoralska from '../assets/ap3-sypialnia-goralska.webp'
import ap3WidokTrzyKorony from '../assets/ap3-widok-trzy-korony.webp'
import ap3Lazienka from '../assets/ap3-lazienka.webp'
import ap3BudynekZewnatrz from '../assets/ap3-budynek-zewnatrz.webp'

export const PHOTOS = {
  heroMountain,
  // Hero strony głównej: ilustracja vintage Trzech Koron (wybrana przez klienta 2026-07-07);
  // źródło: public/images/hero/, zoptymalizowana kopia w src/assets/
  heroIllustration,
  // Hero /pokoje: pokój brzozowy jako ilustracja (Seedream, styl willawojcik)
  heroPokoje,
  // Hero /apartamenty: ilustracja wnętrza Apartamentu 3 w stylu willawojcik
  // (Freepik wg prompta, 2026-07-15; źródło: public/images/hero/apartamenty_new.png)
  heroApartamenty,
  // Heroes podstron — ilustracje w stylu willawojcik (źródła: public/images/hero/)
  heroGaleria,
  heroOkolica,
  heroSplyw,
  heroTrzyKorony,
  heroKladka,
  heroKontakt,
  // Prawdziwe ujęcie z drona: budynek + Trzy Korony w tle (zima)
  exteriorWinter: balconyView,
  buildingDusk,
  buildingWinter,
  apartment,
  livingRoom,
  livingRoom2,
  commonArea,
  roomBirch,
  terrace,
  garden: terrace,
  kitchen: commonArea,
  bathroom,
  balconyView,
  dunajec: buildingWinter,
  forestWalk: terrace,
  snow: buildingWinter,
  thermal: buildingDusk,
  zakopane: balconyView,
  pienin1: livingRoom,
  pienin2: livingRoom2,
}

// Dwa apartamenty z realnymi zdjęciami. Ceny = placeholder „od XXXX zł" —
// klient nie podał stawek (do uzupełnienia). Pojemność Apartamentu 1 (2–4 os.)
// wynika ze zdjęć/opisu — do potwierdzenia z właścicielem.
export const APARTMENTS = [
  {
    id: 'apartament-1',
    name: 'Apartament 1',
    // Pojemność wg portali (Booking/nocowanie): 4 os. + możliwość dostawki
    meta: '38 m² · do 4 osób',
    price: 'od XXXX zł',
    intro:
      'Osobna sypialnia i salon z w pełni wyposażonym aneksem kuchennym — razem 38 m² dla czterech osób. Poranną kawę piją Państwo na dużym balkonie, z widokiem na Trzy Korony.',
    features: [
      'Sypialnia z podwójnym łóżkiem, w salonie możliwość dostawki',
      'Aneks kuchenny: płyta indukcyjna, lodówka, czajnik, naczynia',
      'Własna łazienka z prysznicem, TV-SAT, szybkie WiFi',
      'Duży balkon od strony Trzech Koron',
    ],
    cover: ap1SalonWidok,
    photos: [
      { src: ap1SalonWidok, label: 'Salon z aneksem kuchennym i oknem z widokiem na góry — Apartament 1', span: 'col-span-2 row-span-2' },
      { src: ap1SalonAneks, label: 'Salon z zieloną sofą i w pełni wyposażony aneks kuchenny — Apartament 1', span: 'col-span-2' },
      { src: ap1Sypialnia, label: 'Osobna sypialnia z podwójnym łóżkiem i wyjściem na balkon — Apartament 1', span: 'col-span-2' },
    ],
  },
  {
    id: 'apartament-3',
    name: 'Apartament 3',
    meta: '60 m² · wolnostojący · do 6 osób',
    price: 'od XXXX zł',
    intro:
      'Wolnostojący apartament 60 m² — cały budynek tylko dla Państwa. Jedna otwarta przestrzeń pod skosami: sypialnia za ścianką z brzozowych pni, salon, jadalnia i aneks. Śpi tu wygodnie sześć osób, a z balkonu widać Trzy Korony.',
    features: [
      'Miejsca do spania dla 6 osób',
      'Góralskie rzeźbione łóżko i ścianka z brzozowych pni',
      'W pełni wyposażony aneks kuchenny i duża jadalnia',
      'Marmurowa łazienka z prysznicem',
    ],
    cover: ap3Antresola,
    // 7 zdjęć = pełna siatka bez dziur (2x2 + 2w | 1 + 1 | 2w + 1 + 1).
    // Wycięte (za gęsto na stronie): przedpokój, balkon od ogrodu.
    photos: [
      { src: ap3Antresola, label: 'Otwarte wnętrze pod skosami z brzozową ścianką i częścią sypialną — Apartament 3', span: 'col-span-2 row-span-2' },
      { src: ap3WidokTrzyKorony, label: 'Widok na masyw Trzech Koron z balkonu apartamentu — Apartament 3', span: 'col-span-2' },
      { src: ap3SypialniaGoralska, label: 'Góralskie rzeźbione łóżko przy ściance z brzozowych pni — Apartament 3' },
      { src: ap3JadalniaTv, label: 'Jadalnia dla sześciu osób i strefa TV ze ścianą z plastrów drewna — Apartament 3' },
      { src: ap3SalonJadalnia, label: 'Salon z szarą sofą i jadalnia w jednej przestrzeni — Apartament 3', span: 'col-span-2' },
      { src: ap3Lazienka, label: 'Marmurowa łazienka ze złotymi dodatkami — Apartament 3' },
      { src: ap3BudynekZewnatrz, label: 'Wolnostojący budynek apartamentu o zmierzchu — Apartament 3' },
    ],
  },
]

export const AMENITIES = [
  { icon: 'IconMountain', title: 'Widok na Trzy Korony', note: 'Z balkonu każdego apartamentu' },
  { icon: 'IconWifi', title: 'WiFi w całym obiekcie', note: 'Szybki internet, darmowy' },
  { icon: 'IconParking', title: 'Bezpłatny parking', note: 'Na terenie obiektu, monitoring' },
  { icon: 'IconFlame', title: 'Altana z grillem', note: 'W otoczeniu ogrodu i gór' },
  { icon: 'IconPlay', title: 'Plac zabaw dla dzieci', note: 'W zacisznej części ogrodu' },
  { icon: 'IconKitchen', title: 'Wspólna kuchnia', note: 'Połączona z lobby, w pełni wyposażona' },
  { icon: 'IconBalcony', title: 'Balkony i tarasy', note: 'Z widokiem na Pieniny' },
  { icon: 'IconShield', title: 'Całodobowy monitoring', note: 'Dla Państwa bezpieczeństwa' },
  { icon: 'IconTowel', title: 'Pościel i ręczniki', note: 'Świeże, wysokiej jakości' },
]

export const ATTRACTIONS = [
  { title: 'Pieniński Park Narodowy', dist: '1,1 km', time: '15 min pieszo' },
  { title: 'Kładka pieszo-rowerowa na Słowację', dist: '250 m', time: '3 min pieszo' },
  { title: 'Przystań spływu — Kąty', dist: '~4–5 km', time: '5–7 min autem' },
  { title: 'Zamek w Niedzicy', dist: '11 km', time: '15 min autem' },
  { title: 'Stok Polana Sosny', dist: '4 km', time: '5 min autem' },
  { title: 'Termy Bania (Białka Tatrzańska)', dist: '22 km', time: '20 min autem' },
  { title: 'Centrum Zakopanego', dist: '38 km', time: '35 min autem' },
  { title: 'Szlak na Sokolicę', dist: '1,5 km', time: 'Od recepcji' },
]

export const REVIEWS = [
  {
    q: 'Czysty, nowoczesny, ładnie urządzony pokój z przepięknym widokiem na Trzy Korony. Gospodarze niezwykle mili i pomocni.',
    a: 'Katarzyna', origin: 'Warszawa', date: 'Październik 2025', stars: 10,
  },
  {
    q: 'Cisza, spokój i ten widok. Wstajesz, otwierasz balkon — i rozumiesz, po co tu przyjechałeś. Na pewno wrócimy.',
    a: 'Michał & Anna', origin: 'Kraków', date: 'Sierpień 2025', stars: 10,
  },
  {
    q: 'Dzieci zakochały się w placu zabaw, a my w altanie z grillem. Idealna baza na zwiedzanie Pienin i Tatr.',
    a: 'Rodzina Kowalskich', origin: 'Wrocław', date: 'Lipiec 2025', stars: 9,
  },
  {
    q: 'Apartament przestronny, świetnie wyposażony, bardzo czysty. Gospodarze służyli radą i świetnymi wskazówkami.',
    a: 'Tomasz', origin: 'Poznań', date: 'Wrzesień 2025', stars: 10,
  },
  {
    q: 'Wyjątkowe miejsce. Stylowe wnętrza, zapach drewna, o poranku mgła w dolinie. Polecamy całym sercem.',
    a: 'Joanna', origin: 'Gdańsk', date: 'Maj 2025', stars: 10,
  },
]
