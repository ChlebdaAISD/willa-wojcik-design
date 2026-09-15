import { PageHero } from '../components/ui/PageHero.jsx'
import { Container } from '../components/ui/Container.jsx'
import { GalleryGrid } from '../components/ui/GalleryGrid.jsx'
import { CTASection } from '../components/ui/CTASection.jsx'
import { PHOTOS, getApartment, ROOMS } from '../data/content.js'

// Wszystkie zdjęcia są realne (dostarczone przez właścicieli 09.2026, content.js).
// Apartamenty i pokoje bierzemy z APARTMENTS / ROOMS, żeby podpisy nie rozjechały
// się z podstronami jednostek. Resztę składamy bezpośrednio z PHOTOS.
const AP1 = getApartment('apartament-1')
const AP2 = getApartment('apartament-2')
const AP3 = getApartment('apartament-3')

// Siatka: grid-cols-2 / md:grid-cols-4, auto-placement bez `dense`. Sumaryczna
// liczba komórek w kategorii MUSI dzielić się przez 4, inaczej ostatni rząd
// zostaje dziurawy. Sprawdzone wzory (komórki: 2×2 = 4, col-span-2 = 2, zwykły = 1):
//   7 zdjęć  → [2×2, 2w, 1, 1, 2w, 1, 1]                  = 12 komórek / 3 rzędy
//   8 zdjęć  → [2×2, 2w, 1, 1, 2×2, 2w, 1, 1]             = 16 komórek / 4 rzędy
//   9 zdjęć  → [2×2, 1, 1, 2w, 2w, 2w, 2×2, 2w, 2w]       = 20 komórek / 5 rzędów
//  10 zdjęć  → [2×2, 2w, 1, 1, 2w, 1, 1, 2w, 1, 1]        = 16 komórek / 4 rzędy
const SPAN_2x2 = 'col-span-2 row-span-2'
const SPAN_2 = 'col-span-2'

// Zdjęcia z APARTMENTS / ROOMS przepisujemy pole po polu i nadajemy span JAWNIE.
// Spread (`...AP1.photos[0]`) wciągnąłby span z content.js — inny wzór siatki,
// dziura w rzędzie. Ten błąd był tu już raz; stąd ten helper.
const tile = (photo, span) => ({ src: photo.src, label: photo.label, span })

const CATEGORIES = [
  {
    id: 'obiekt',
    label: 'Obiekt',
    desc: 'Willę pokazujemy w trzech ujęciach z drona i pięciu z poziomu ziemi: podjazd, front, szyld i elewacja od strony ogrodu. Osiem pokoi i dwa apartamenty mieszczą się w głównym budynku, trzeci apartament stoi osobno.',
    photos: [
      { src: PHOTOS.obiektDroneZmierzch, label: 'Willa Wójcik o zmierzchu, ujęcie z drona nad Sromowcami Niżnymi', span: SPAN_2x2 },
      { src: PHOTOS.obiektDronePanorama, label: 'Panorama z drona: willa, ogród i okolica Sromowiec Niżnych', span: SPAN_2 },
      { src: PHOTOS.obiektDroneElewacja, label: 'Elewacja willi z lotu ptaka, balkony pokoi na piętrze' },
      { src: PHOTOS.obiektOdOgrodu, label: 'Budynek od strony ogrodu, tarasy pokoi na parterze' },
      { src: PHOTOS.obiektFront, label: 'Front willi od strony drogi dojazdowej', span: SPAN_2x2 },
      { src: PHOTOS.obiektElewacjaOgrod, label: 'Drewniana elewacja i trawnik przed pokojami na parterze', span: SPAN_2 },
      { src: PHOTOS.obiektPodjazd, label: 'Podjazd i bezpłatny parking na terenie obiektu' },
      { src: PHOTOS.obiektSzyld, label: 'Szyld Willi Wójcik przed budynkiem' },
    ],
  },
  {
    id: 'ogrod',
    label: 'Ogród i plac zabaw',
    desc: 'Na działce stoi plac zabaw z trampoliną i altana z grillem, a w ogrodzie kwitną hortensje. Dzieci mają swoją część ogrodu, dorośli — altanę po drugiej stronie trawnika.',
    photos: [
      { src: PHOTOS.ogrodPlacZabaw, label: 'Plac zabaw w zacisznej części ogrodu', span: SPAN_2x2 },
      { src: PHOTOS.ogrodAltana, label: 'Drewniana altana z grillem', span: SPAN_2 },
      { src: PHOTOS.ogrodAltanaKwiaty, label: 'Altana otoczona rabatami kwiatowymi' },
      { src: PHOTOS.ogrodAltanaTrawnik, label: 'Altana i trawnik od strony budynku' },
      { src: PHOTOS.ogrodTarasTrampolina, label: 'Taras przy ogrodzie z widokiem na trampolinę', span: SPAN_2 },
      { src: PHOTOS.ogrodHortensje, label: 'Hortensje kwitnące w ogrodzie' },
      { src: PHOTOS.placZabawTrampolina, label: 'Trampolina na placu zabaw dla dzieci' },
    ],
  },
  {
    id: 'widok',
    label: 'Taras i widok na Trzy Korony',
    desc: 'Masyw Trzech Koron widać z tarasu, z ogrodu i z balkonów apartamentów. Zebraliśmy dziesięć kadrów z różnych miejsc na działce, żeby ocenili Państwo widok jeszcze przed rezerwacją.',
    photos: [
      { src: PHOTOS.tarasOgrodTrzyKorony, label: 'Taras i ogród z masywem Trzech Koron w tle', span: SPAN_2x2 },
      { src: PHOTOS.tarasWidokTrzyKorony, label: 'Widok na Trzy Korony prosto z tarasu', span: SPAN_2 },
      { src: PHOTOS.tarasMebleWidok, label: 'Meble tarasowe ustawione w stronę gór' },
      { src: PHOTOS.tarasKwiatyWidok, label: 'Kwiaty przy tarasie, w tle pienińskie szczyty' },
      { src: PHOTOS.widokTrzyKoronyOgrod, label: 'Trzy Korony widziane znad ogrodu', span: SPAN_2 },
      { src: PHOTOS.tarasDrzewkaWidok, label: 'Drzewka przy tarasie i panorama pienińskich szczytów' },
      { src: PHOTOS.widokTrzyKoronyZzaTui, label: 'Masyw Trzech Koron zza szpaleru tui' },
      { src: PHOTOS.ogrodWidokTrzyKorony, label: 'Ogród willi z Trzema Koronami na horyzoncie', span: SPAN_2 },
      { src: PHOTOS.widokTrzyKoronyBlisko, label: 'Trzy Korony w zbliżeniu, widok z terenu obiektu' },
      { src: PHOTOS.trzyKoronyNadDachami, label: 'Szczyty Trzech Koron nad dachami Sromowiec Niżnych' },
    ],
  },
  {
    id: 'apartamenty',
    label: 'Apartamenty',
    desc: 'Apartament 1 ma 38 m², apartament 2 ma 35 m², oba z osobną sypialnią i salonem z aneksem kuchennym. Apartament 3 zajmuje 60 m² w osobnym budynku — jedno otwarte pomieszczenie z miejscami do spania dla sześciu osób. Każdy ma balkon zwrócony w stronę Trzech Koron, a doba kosztuje od 450 zł.',
    // Spany JAWNIE przez tile() — patrz komentarz przy helperze.
    photos: [
      tile(AP1.photos[0], SPAN_2x2), // AP1: salon z rozkładaną sofą i aneksem
      tile(AP1.photos[1]),           // AP1: osobna sypialnia
      tile(AP1.photos[5]),           // AP1: salon z oknem na góry
      tile(AP2.photos[0], SPAN_2),   // AP2: salon z aneksem kuchennym
      tile(AP2.photos[1], SPAN_2),   // AP2: balkon na Trzy Korony
      tile(AP2.photos[2], SPAN_2),   // AP2: sypialnia
      tile(AP3.photos[0], SPAN_2x2), // AP3: cała otwarta przestrzeń 60 m²
      tile(AP3.photos[1], SPAN_2),   // AP3: balkon na Trzy Korony
      tile(AP3.photos[4], SPAN_2),   // AP3: jadalnia i aneks kuchenny
    ],
  },
  {
    id: 'pokoje',
    label: 'Pokoje',
    desc: 'Każdy z ośmiu pokoi ma 21 m², łóżko małżeńskie 160 × 200, małą sofę rozkładaną i własną łazienkę. Cztery pokoje na piętrze mają balkon, cztery na parterze — taras. Doba kosztuje 250 zł dla dwóch osób i 280 zł dla trzech.',
    photos: [
      tile(ROOMS.photos[0], SPAN_2x2), // pokój na piętrze z balkonem
      tile(ROOMS.photos[1], SPAN_2),   // pokój na parterze z tarasem
      tile(ROOMS.photos[2]),           // łóżko małżeńskie i sofa rozkładana
      tile(ROOMS.photos[3]),           // biurko, czajnik, telewizor
      tile(ROOMS.photos[4], SPAN_2),   // pokój na piętrze, telewizor i balkon
      tile(ROOMS.photos[5]),           // łazienka z kabiną prysznicową
      tile(ROOMS.photos[6]),           // przeszklone wyjście na taras
      { src: PHOTOS.pokojeParterTarasy, label: 'Tarasy pokoi na parterze z wyjściem wprost do ogrodu', span: SPAN_2 },
      { src: PHOTOS.lazienkaUmywalka, label: 'Łazienka w pokoju: umywalka, lustro i świeże ręczniki' },
      { src: PHOTOS.lazienkaDrewno, label: 'Łazienka wykończona drewnem, prysznic i suszarka do włosów' },
    ],
  },
  {
    id: 'wspolne',
    label: 'Części wspólne',
    desc: 'Na parterze czekają wspólna kuchnia o powierzchni 45 m² połączona z jadalnią, salon i kącik dla dzieci. Śniadania przygotowują Państwo we własnym zakresie. Naczynia, garnki i sprzęt kuchenny są na miejscu.',
    photos: [
      { src: PHOTOS.wspolneKuchnia, label: 'Wspólna kuchnia o powierzchni 45 m², w pełni wyposażona', span: SPAN_2x2 },
      { src: PHOTOS.wspolneJadalniaOgrod, label: 'Jadalnia z przeszkleniem wychodzącym na ogród', span: SPAN_2 },
      { src: PHOTOS.wspolneJadalnia, label: 'Stoły w jadalni połączonej z kuchnią' },
      { src: PHOTOS.wspolneStrefaWypoczynku, label: 'Strefa wypoczynku z fotelami na parterze' },
      { src: PHOTOS.wspolneSalonSchody, label: 'Salon i drewniane schody na piętro', span: SPAN_2 },
      { src: PHOTOS.wspolneKacikDzieciecy, label: 'Kącik dziecięcy w części wspólnej' },
      { src: PHOTOS.wspolneSalon, label: 'Salon z kanapami w części wspólnej' },
      { src: PHOTOS.wspolneHol, label: 'Hol wejściowy na parterze', span: SPAN_2 },
      { src: PHOTOS.wspolneWejscie, label: 'Wejście główne do willi' },
      { src: PHOTOS.wspolneKorytarz, label: 'Korytarz prowadzący do pokoi' },
    ],
  },
]

export default function Galeria() {
  return (
    <>
      <PageHero
        title="Willa w obrazach"
        subtitle="Jasne wnętrza, zapach drewna i ten jeden widok na Trzy Korony. Zobaczą Państwo wszystko, zanim przyjadą."
        image={PHOTOS.heroGaleria}
        imageAlt="Ilustracja: rozświetlony pensjonat wśród domów Sromowiec Niżnych, w tle skalna korona Trzech Koron"
        crumbs={[{ label: 'Strona główna', href: '/' }, { label: 'Galeria' }]}
      />

      <section className="relative bg-charcoal text-cream py-20 md:py-28">
        <Container>
          <div className="space-y-16 md:space-y-20">
            {CATEGORIES.map((c, i) => (
              <div key={c.id}>
                <div className="reveal flex items-center gap-3 mb-3">
                  <span className="w-8 h-px bg-gold" />
                  <span className="eyebrow text-cream/75">{String(i + 1).padStart(2, '0')} — {c.label}</span>
                </div>
                <p className="reveal text-cream/70 text-[16px] leading-relaxed max-w-2xl mb-8">{c.desc}</p>
                <GalleryGrid photos={c.photos} hideThumbLabels />
              </div>
            ))}
          </div>

          <p className="mt-16 text-cream/75 text-[13px] max-w-xl">
            Wszystkie fotografie pochodzą z września 2026 roku i przedstawiają Willę Wójcik w obecnym stanie.
            Kliknięcie w kafelek otwiera powiększenie z opisem.
          </p>
        </Container>
      </section>

      <CTASection
        title="Zdjęcia wyglądają zachęcająco?"
        text="Na żywo, z porannym widokiem na Trzy Korony z balkonu, willa robi jeszcze większe wrażenie."
      />
    </>
  )
}
