// Ilustracje hero (serigrafia w stylu „willawojcik"; źródła w public/images/hero/)
import heroPokoje from '../assets/hero-pokoje-illustration.webp'
import heroApartamenty from '../assets/hero-apartamenty-illustration.webp'
import heroGaleria from '../assets/hero-galeria-illustration.webp'
import heroOkolica from '../assets/hero-okolica-illustration.webp'
import heroSplyw from '../assets/hero-splyw-illustration.webp'
import heroTrzyKorony from '../assets/hero-3-korony-illustration.webp'
import heroKladka from '../assets/hero-kladka-illustration.webp'
import heroKontakt from '../assets/hero-kontakt-illustration.webp'

// ---------------------------------------------------------------------------
// REALNE ZDJĘCIA OBIEKTU (dostarczone przez właścicieli 09.2026, Google Drive:
// Projekty/Willa Wójcik). Konwersja HEIC → WebP z korektą orientacji EXIF,
// maks. 1800 px, ok. 200 KB. Wszystkie placeholdery `screenshot-*.webp` usunięte.
// ---------------------------------------------------------------------------

// Obiekt z zewnątrz
import obiektDroneZmierzch from '../assets/obiekt-drone-zmierzch.webp'
import obiektDronePanorama from '../assets/obiekt-drone-panorama.webp'
import obiektDroneElewacja from '../assets/obiekt-drone-elewacja.webp'
import obiektOdOgrodu from '../assets/obiekt-od-ogrodu.webp'
import obiektPodjazd from '../assets/obiekt-podjazd.webp'
import obiektFront from '../assets/obiekt-front.webp'
import obiektElewacjaOgrod from '../assets/obiekt-elewacja-ogrod.webp'
import pokojeParterTarasy from '../assets/pokoje-parter-tarasy.webp'
// Dosłane przez właścicieli 16.09.2026 (WhatsApp) — patrz raporty/.
import obiektFrontKwiaty from '../assets/obiekt-front-kwiaty.webp'
import obiektNaroznikHortensje from '../assets/obiekt-naroznik-hortensje.webp'
import obiektTarasSchody from '../assets/obiekt-taras-schody.webp'
import obiektDroneWiesZmierzch from '../assets/obiekt-drone-wies-zmierzch.webp'
// Realne zdjęcie budynku na tle Trzech Koron — o nie prosił Pan Wójcik 17.09.2026.
// Źródło: Dysk Google, Zdjęcia/Willa budynek/IMG_8350.heic. Z kadru usunięto słup
// energetyczny z osprzętem, napowietrzne przewody i talerz anteny (scripts/magnific-edit.py
// na wycinku + retusz miejscowy). To NIE jest grafika z ChatGPT, tylko fotografia.
import obiektTrzyKorony from '../assets/obiekt-trzy-korony.webp'
// Budynek o żółtej elewacji. Bryła jest inna niż główny budynek willi (ten jest
// biały, ze szklanymi balustradami), więc zapytaliśmy właścicieli. Potwierdzili
// 17.09.2026, że to część obiektu — stąd podpisy „drugi z budynków obiektu".
import obiektDomZoltyPodjazd from '../assets/obiekt-dom-zolty-podjazd.webp'
import obiektDomZoltyFront from '../assets/obiekt-dom-zolty-front.webp'

// Ogród, plac zabaw, altana
import ogrodPlacZabaw from '../assets/ogrod-plac-zabaw.webp'
import ogrodAltana from '../assets/ogrod-altana.webp'
import ogrodAltanaKwiaty from '../assets/ogrod-altana-kwiaty.webp'
import ogrodAltanaTrawnik from '../assets/ogrod-altana-trawnik.webp'
import ogrodHortensje from '../assets/ogrod-hortensje.webp'
import ogrodTarasTrampolina from '../assets/ogrod-taras-trampolina.webp'
import ogrodHortensjeAltana from '../assets/ogrod-hortensje-altana.webp'

// Taras i widok na Trzy Korony
import tarasOgrodTrzyKorony from '../assets/taras-ogrod-trzy-korony.webp'
import tarasWidokTrzyKorony from '../assets/taras-widok-trzy-korony.webp'
import tarasMebleWidok from '../assets/taras-meble-widok.webp'
import tarasDrzewkaWidok from '../assets/taras-drzewka-widok.webp'
import widokTrzyKoronyOgrod from '../assets/widok-trzy-korony-ogrod.webp'
import widokTrzyKoronyZzaTui from '../assets/widok-trzy-korony-zza-tui.webp'
import widokTrzyKoronyBlisko from '../assets/widok-trzy-korony-blisko.webp'
import ogrodWidokTrzyKorony from '../assets/ogrod-widok-trzy-korony.webp'
import trzyKoronyNadDachami from '../assets/trzy-korony-nad-dachami.webp'
import balkonWidokChmury from '../assets/balkon-widok-chmury.webp'
import balkonWidokHustawka from '../assets/balkon-widok-hustawka.webp'
import widokTrzyKoronyPelargonie from '../assets/widok-trzy-korony-pelargonie.webp'

// APARTAMENTY — komplet wymieniony 25.09.2026. Właścicielka: „nie podobały mi się
// zdjęcia apartamentów", nowa sesja przyszła na Dysk (Willa Wójcik / Nowe Zdjecia)
// w wersjach bez efektu Live, czyli bez rozmycia. Stare pliki `ap1-salon-*`,
// `ap2-*`, `ap3-*` zostają na dysku, ale nie są już importowane.
// Zapis w 2400 px (reszta zbioru ma 1800) — reakcja na uwagę, że w telefonie
// wyglądają lepiej niż na stronie.
//
// Rozpoznanie sypialni: apartamenty są umeblowane identycznie, więc rozstrzyga
// poziom kondygnacji widoczny w oknie — z sypialni AP1 widać taras i trawnik
// na wprost (parter), z AP2 patrzy się ponad dach sąsiada (piętro).

// Apartament 1 (38 m², osobna sypialnia + salon) — sofa ZIELONA, sypialnia na parterze
import ap1SalonZielonaSofa from '../assets/ap1-salon-zielona-sofa.webp'
import ap1SalonTvStol from '../assets/ap1-salon-tv-stol.webp'
import ap1SalonAneks from '../assets/ap1-salon-aneks.webp'
import ap1SalonOkno from '../assets/ap1-salon-okno.webp'
import ap1SalonJadalniaTv from '../assets/ap1-salon-jadalnia-tv.webp'
import ap1SypialniaTaras from '../assets/ap1-sypialnia-taras.webp'
import ap1SypialniaLawka from '../assets/ap1-sypialnia-lawka.webp'

// Apartament 2 (35 m², osobna sypialnia + salon z aneksem) — sofa ŻÓŁTA, sypialnia na piętrze
import ap2SalonZoltaSofa from '../assets/ap2-salon-zolta-sofa.webp'
import ap2SalonTv from '../assets/ap2-salon-tv.webp'
import ap2SalonAneks from '../assets/ap2-salon-aneks.webp'
import ap2SalonBiurko from '../assets/ap2-salon-biurko.webp'
import ap2SalonWejscie from '../assets/ap2-salon-wejscie.webp'
import ap2SypialniaBalkon from '../assets/ap2-sypialnia-balkon.webp'
import ap2SypialniaSzafa from '../assets/ap2-sypialnia-szafa.webp'

// Apartament 3 (60 m², jedno duże pomieszczenie, wolnostojący)
import ap3BaleLozko from '../assets/ap3-bale-lozko.webp'
import ap3PrzedpokojWejscie from '../assets/ap3-przedpokoj-wejscie.webp'
import ap3LozkoZaslony from '../assets/ap3-lozko-zaslony.webp'
import ap3LozkoMech from '../assets/ap3-lozko-mech.webp'
import ap3JadalniaSkosy from '../assets/ap3-jadalnia-skosy.webp'
import ap3StolAneks from '../assets/ap3-stol-aneks.webp'

// Pokoje 1–8 (21 m², 4 na piętrze z balkonem, 4 na parterze z tarasem)
import pokojLazienkaBiurko from '../assets/pokoj-lazienka-biurko.webp'
import pokojPietroBalkon from '../assets/pokoj-pietro-balkon.webp'
import pokojPietroWidok from '../assets/pokoj-pietro-widok.webp'
import pokojLozkoLazienka from '../assets/pokoj-lozko-lazienka.webp'
import pokojParterTaras from '../assets/pokoj-parter-taras.webp'
import pokojLozkoBiurkoBalkon from '../assets/pokoj-lozko-biurko-balkon.webp'
import pokojTarasWyjscie from '../assets/pokoj-taras-wyjscie.webp'
import pokojLazienkaSofa from '../assets/pokoj-lazienka-sofa.webp'
import pokojJasneDrewno from '../assets/pokoj-jasne-drewno.webp'
import pokojLozkoBiurko from '../assets/pokoj-lozko-biurko.webp'
import pokojSofaBiurko from '../assets/pokoj-sofa-biurko.webp'
import pokojLozkoLustro from '../assets/pokoj-lozko-lustro.webp'
import pokojLozkoFotele from '../assets/pokoj-lozko-fotele.webp'

// Łazienki w pokojach
import lazienkaPrysznic from '../assets/lazienka-prysznic.webp'
import lazienkaUmywalka from '../assets/lazienka-umywalka.webp'
import lazienkaDrewno from '../assets/lazienka-drewno.webp'
import lazienkaPokoj from '../assets/lazienka-pokoj.webp'

// Części wspólne
import wspolneJadalniaOgrod from '../assets/wspolne-jadalnia-ogrod.webp'
import wspolneSalonSchody from '../assets/wspolne-salon-schody.webp'
import wspolneKuchnia from '../assets/wspolne-kuchnia.webp'
import wspolneJadalnia from '../assets/wspolne-jadalnia.webp'
import wspolneKacikDzieciecy from '../assets/wspolne-kacik-dzieciecy.webp'
import wspolneStrefaWypoczynku from '../assets/wspolne-strefa-wypoczynku.webp'
import wspolneHol from '../assets/wspolne-hol.webp'
import wspolneSalon from '../assets/wspolne-salon.webp'
import wspolneKorytarz from '../assets/wspolne-korytarz.webp'
import wspolneKorytarzPietro from '../assets/wspolne-korytarz-pietro.webp'
import wspolneKuchniaSchody from '../assets/wspolne-kuchnia-schody.webp'
import wspolneStrefaFototapeta from '../assets/wspolne-strefa-fototapeta.webp'
import wspolneSalonJadalnia from '../assets/wspolne-salon-jadalnia.webp'
import wspolneHolZGory from '../assets/wspolne-hol-z-gory.webp'
import wspolneJadalniaWidok from '../assets/wspolne-jadalnia-widok.webp'

export const PHOTOS = {
  // Hero strony głównej: ilustracja vintage Trzech Koron (wybrana przez klienta 2026-07-07).
  // Od 09.2026 służy też jako plakat (poster) dla wideo z drona — zob. components/Hero.jsx.
  heroPokoje,
  heroApartamenty,
  heroGaleria,
  heroOkolica,
  heroSplyw,
  heroTrzyKorony,
  heroKladka,
  heroKontakt,

  // Obiekt
  obiektDroneZmierzch,
  obiektDronePanorama,
  obiektDroneElewacja,
  obiektOdOgrodu,
  obiektPodjazd,
  obiektFront,
  obiektElewacjaOgrod,
  pokojeParterTarasy,
  obiektFrontKwiaty,
  obiektNaroznikHortensje,
  obiektTarasSchody,
  obiektDroneWiesZmierzch,
  obiektTrzyKorony,
  obiektDomZoltyPodjazd,
  obiektDomZoltyFront,

  // Ogród i plac zabaw
  ogrodPlacZabaw,
  ogrodAltana,
  ogrodAltanaKwiaty,
  ogrodAltanaTrawnik,
  ogrodHortensje,
  ogrodTarasTrampolina,
  ogrodHortensjeAltana,

  // Taras i widok
  tarasOgrodTrzyKorony,
  tarasWidokTrzyKorony,
  tarasMebleWidok,
  tarasDrzewkaWidok,
  widokTrzyKoronyOgrod,
  widokTrzyKoronyZzaTui,
  widokTrzyKoronyBlisko,
  ogrodWidokTrzyKorony,
  trzyKoronyNadDachami,
  balkonWidokChmury,
  balkonWidokHustawka,
  widokTrzyKoronyPelargonie,

  // Pokoje i łazienki
  pokojLazienkaBiurko,
  pokojPietroBalkon,
  pokojPietroWidok,
  pokojLozkoLazienka,
  pokojParterTaras,
  pokojLozkoBiurkoBalkon,
  pokojTarasWyjscie,
  pokojLazienkaSofa,
  pokojJasneDrewno,
  pokojLozkoBiurko,
  pokojSofaBiurko,
  pokojLozkoLustro,
  pokojLozkoFotele,
  lazienkaPrysznic,
  lazienkaUmywalka,
  lazienkaDrewno,
  lazienkaPokoj,

  // Części wspólne
  wspolneJadalniaOgrod,
  wspolneSalonSchody,
  wspolneKuchnia,
  wspolneJadalnia,
  wspolneKacikDzieciecy,
  wspolneStrefaWypoczynku,
  wspolneHol,
  wspolneSalon,
  wspolneKorytarz,
  wspolneKorytarzPietro,
  wspolneKuchniaSchody,
  wspolneStrefaFototapeta,
  wspolneSalonJadalnia,
  wspolneHolZGory,
  wspolneJadalniaWidok,

  // Apartament 3 — budynek
}

// ---------------------------------------------------------------------------
// JEDNOSTKI
// Dane od właścicielki (Danuta, 14.09.2026, WhatsApp) — ceny, metraże,
// wyposażenie i układ pomieszczeń. Zastępują szacunki z portali.
// Siatka zdjęć: 4 kolumny, wzór [2×2, 2w, 1, 1, 2w, 1, 1] = 7 zdjęć bez dziur.
// ---------------------------------------------------------------------------

// Wyszukiwanie po id, nie po indeksie — kolejność w APARTMENTS bywa zmieniana.
// Rzucamy wyjątek zamiast oddawać undefined: strona jest budowana statycznie, więc
// literówka w id wywaliłaby prerender komunikatem „Cannot read properties of
// undefined" bez wskazania przyczyny. Tu od razu widać, czego brakuje i gdzie.
export function getApartment(id) {
  const found = APARTMENTS.find((a) => a.id === id)
  if (!found) throw new Error(`content.js: brak wpisu APARTMENTS o id '${id}'`)
  return found
}

export const APARTMENTS = [
  {
    id: 'apartament-1',
    name: 'Apartament 1',
    meta: '38 m², do 4 osób',
    price: '450 zł za dobę',
    intro:
      'Dwa osobne pomieszczenia: sypialnia z łóżkiem małżeńskim i salon z rozkładaną sofą oraz aneksem kuchennym. Z obu wychodzą Państwo na duży balkon zwrócony w stronę Trzech Koron.',
    features: [
      'Osobna sypialnia z łóżkiem małżeńskim',
      'Salon z rozkładaną sofą — razem do 4 osób',
      'Aneks kuchenny w salonie, w pełni wyposażony',
      'Duży balkon z widokiem na Trzy Korony, wyjście z obu pomieszczeń',
      'Własna łazienka z ręcznikami i suszarką do włosów',
    ],
    cover: ap1SalonZielonaSofa,
    // BLOK A + BLOK C (patrz scripts/sprawdz-siatke.py). Kadry są poziome 16:9,
    // więc trafiają w kafelki 2×2 i 1×1 — te przycinają je najmniej.
    photos: [
      { src: ap1SalonZielonaSofa, label: 'Salon z dużą rozkładaną sofą, ławą i aneksem kuchennym — Apartament 1', span: 'col-span-2 row-span-2' },
      { src: ap1SypialniaTaras, label: 'Osobna sypialnia z wyjściem na taras — Apartament 1' },
      { src: ap1SypialniaLawka, label: 'Sypialnia z łóżkiem małżeńskim i ławką — Apartament 1' },
      { src: ap1SalonTvStol, label: 'Salon z telewizorem i stołem jadalnym — Apartament 1', span: 'col-span-2' },
      { src: ap1SalonAneks, label: 'Aneks kuchenny w salonie, w pełni wyposażony — Apartament 1', span: 'col-span-2' },
      { src: ap1SalonOkno, label: 'Salon od strony okna, z fotelem i jadalnią — Apartament 1' },
      { src: ap1SalonJadalniaTv, label: 'Jadalnia i strefa telewizyjna w salonie — Apartament 1' },
    ],
  },
  {
    id: 'apartament-2',
    name: 'Apartament 2',
    meta: '35 m², do 4 osób',
    price: '450 zł za dobę',
    intro:
      'Sypialnia i salon z aneksem kuchennym — 35 m² dla czterech osób. W salonie stoi rozkładana sofa, a drzwi balkonowe otwierają się wprost na masyw Trzech Koron.',
    features: [
      'Osobna sypialnia z łóżkiem małżeńskim',
      'Salon z aneksem kuchennym i rozkładaną sofą',
      'Balkon z widokiem na Trzy Korony, wyjście z salonu',
      'Własna łazienka z ręcznikami i suszarką do włosów',
    ],
    cover: ap2SalonZoltaSofa,
    photos: [
      { src: ap2SalonZoltaSofa, label: 'Salon z żółtą rozkładaną sofą, ławą i jadalnią — Apartament 2', span: 'col-span-2 row-span-2' },
      { src: ap2SypialniaBalkon, label: 'Osobna sypialnia z wyjściem na balkon — Apartament 2' },
      { src: ap2SypialniaSzafa, label: 'Sypialnia z szafą z lustrem i przejściem do salonu — Apartament 2' },
      { src: ap2SalonTv, label: 'Salon z telewizorem i aneksem kuchennym — Apartament 2', span: 'col-span-2' },
      { src: ap2SalonAneks, label: 'Aneks kuchenny w salonie, w pełni wyposażony — Apartament 2', span: 'col-span-2' },
      { src: ap2SalonBiurko, label: 'Salon z miejscem do pracy i strefą wypoczynkową — Apartament 2' },
      { src: ap2SalonWejscie, label: 'Salon od strony wejścia, z jadalnią i aneksem — Apartament 2' },
    ],
  },
  {
    id: 'apartament-3',
    name: 'Apartament 3',
    meta: '60 m², wolnostojący, do 6 osób',
    price: 'od 500 zł za dobę',
    intro:
      'Jedno duże pomieszczenie o powierzchni 60 m² w osobnym budynku — cały dla Państwa. Pod skosami mieści się część sypialna za ścianką z brzozowych pni, salon, jadalnia i aneks kuchenny. Śpi tu sześć osób, a z balkonu widać Trzy Korony.',
    features: [
      'Jedno otwarte pomieszczenie o powierzchni 60 m², osobny budynek',
      'Łóżko, podwójna sofa rozkładana i dwa rozkładane fotele — do 6 osób',
      'Aneks kuchenny w pełni wyposażony i duża jadalnia',
      'Balkon z widokiem na Trzy Korony',
      'Łazienka z ręcznikami i suszarką do włosów',
    ],
    cover: ap3BaleLozko,
    // BLOK A + BLOK B. Przedpokój to jedyny kadr pionowy — stąd kafelek kwadratowy.
    photos: [
      { src: ap3BaleLozko, label: 'Część sypialna przy ściance z bali i strefa wypoczynkowa — Apartament 3', span: 'col-span-2 row-span-2' },
      { src: ap3PrzedpokojWejscie, label: 'Wejście i przedpokój — Apartament 3' },
      { src: ap3LozkoZaslony, label: 'Łóżko małżeńskie pod skosami, przy oknie — Apartament 3' },
      { src: ap3LozkoMech, label: 'Sypialnia przy ścianie z mchem i bali brzozowych — Apartament 3', span: 'col-span-2' },
      { src: ap3JadalniaSkosy, label: 'Jadalnia i aneks kuchenny pod skosami — Apartament 3', span: 'col-span-2' },
      { src: ap3StolAneks, label: 'Stół dla sześciu osób i w pełni wyposażony aneks — Apartament 3', span: 'col-span-2' },
    ],
  },
]

// Pokoje 1–8. Wyposażenie identyczne w każdym; różni je tylko balkon (piętro)
// albo taras (parter). Dane od właścicielki 14.09.2026.
export const ROOMS = {
  id: 'pokoje',
  name: 'Pokoje 1–8',
  meta: '21 m², 2–3 osoby',
  price: '250 zł za dobę',
  priceNote: '250 zł dla dwóch osób, 280 zł dla trzech',
  intro:
    'Osiem pokoi o tym samym wyposażeniu: łóżko małżeńskie 160 × 200, mała sofa rozkładana i własna łazienka. Cztery pokoje na piętrze mają balkon, cztery na parterze — taras wychodzący na ogród.',
  features: [
    'Łóżko małżeńskie 160 × 200 i mała sofa rozkładana',
    'Mini lodówka, czajnik elektryczny i telewizor',
    'Własna łazienka z ręcznikami i suszarką do włosów',
    'Cztery pokoje na piętrze z balkonem, cztery na parterze z tarasem',
    'Dostęp do wspólnej kuchni o powierzchni 45 m²',
  ],
  cover: pokojPietroBalkon,
  photos: [
    { src: pokojPietroBalkon, label: 'Pokój na piętrze z łóżkiem małżeńskim, biurkiem i wyjściem na balkon', span: 'col-span-2 row-span-2' },
    { src: pokojParterTaras, label: 'Pokój na parterze z wyjściem na prywatny taras', span: 'col-span-2' },
    { src: pokojLazienkaBiurko, label: 'Pokój z własną łazienką, biurkiem i wyjściem na balkon', span: 'col-span-2' },
    { src: pokojLozkoLazienka, label: 'Pokój z łóżkiem małżeńskim i wejściem do własnej łazienki' },
    { src: pokojLozkoBiurkoBalkon, label: 'Pokój z biurkiem, czajnikiem i wyjściem na balkon' },
    { src: lazienkaPrysznic, label: 'Łazienka w pokoju — kabina prysznicowa, umywalka i suszarka' },
    { src: pokojTarasWyjscie, label: 'Pokój z przeszklonym wyjściem na taras' },
    { src: pokojLazienkaSofa, label: 'Pokój z łóżkiem, sofą i własną łazienką z kabiną prysznicową', span: 'col-span-2' },
    { src: pokojJasneDrewno, label: 'Pokój z jasną podłogą, biurkiem i wyjściem na balkon' },
    { src: pokojLozkoBiurko, label: 'Przestronny pokój z łóżkiem małżeńskim i miejscem do pracy' },
    { src: pokojSofaBiurko, label: 'Pokój z rozkładaną sofą, biurkiem i wyjściem na balkon', span: 'col-span-2' },
    { src: pokojLozkoLustro, label: 'Pokój z lustrem i miejscem do pracy' },
    { src: pokojLozkoFotele, label: 'Pokój z łóżkiem, fotelami i wyjściem na balkon' },
  ],
}

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

// Wyłącznie odległości pokryte przez references/stats.md. Wcześniejsze wpisy
// „Stok Polana Sosny 4 km", „Termy Bania 22 km", „Centrum Zakopanego 38 km"
// i „Szlak na Sokolicę 1,5 km" były zmyślone i sprzeczne ze stats.md — usunięte 14.09.2026.
export const ATTRACTIONS = [
  { title: 'Szlak na Trzy Korony', dist: '~1 km', time: '15 min pieszo' },
  { title: 'Kładka pieszo-rowerowa na Słowację', dist: '250 m', time: '3 min pieszo' },
  { title: 'Kościół św. Katarzyny', dist: '467 m', time: '6 min pieszo' },
  { title: 'Przystań spływu — Kąty', dist: '~4–5 km', time: '5–7 min autem' },
  { title: 'Zapora w Niedzicy', dist: '10 km', time: '15 min autem' },
  { title: 'Zamek Dunajec w Niedzicy', dist: '11 km', time: '15 min autem' },
  { title: 'Czorsztyn-Ski, Kluszkowce', dist: '~13–15 km', time: '~20 min autem' },
  { title: 'Termy Bania (Białka Tatrzańska)', dist: '~30–33 km', time: '~45 min autem' },
]

// Opinie gości. PUSTE CELOWO od 14.09.2026.
//
// Wcześniej stało tu pięć wymyślonych cytatów z imionami, miastami i datami
// (m.in. „Rodzina Kowalskich, Wrocław"), które renderowały się w karuzeli na
// stronie głównej i lądowały w prerenderowanym HTML-u. Właściciele nie przekazali
// żadnej opinii — prezentowanie tych cytatów jako wypowiedzi gości było
// fabrykowaniem referencji (nieuczciwa praktyka rynkowa).
//
// Prawdziwe oceny zbiorcze (Google 4,9/5 ze 135 opinii, Booking 9,8/10,
// nocowanie.pl 10/10) są w `src/data/site.js` i pokazuje je components/Reviews.jsx.
//
// Aby przywrócić cytaty: wstawić tu realne wpisy od właścicieli albo pobrane
// z Places API (max 5, z imieniem, datą i oceną bez edycji) i odtworzyć karuzelę.
export const REVIEWS = []
