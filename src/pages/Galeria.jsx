import { PageHero } from '../components/ui/PageHero.jsx'
import { Container } from '../components/ui/Container.jsx'
import { GalleryGrid } from '../components/ui/GalleryGrid.jsx'
import { CTASection } from '../components/ui/CTASection.jsx'
import { PHOTOS, getApartment, ROOMS } from '../data/content.js'

// Wszystkie zdjęcia są realne (dostarczone przez właścicieli 09.2026, content.js).
// Apartamenty i pokoje bierzemy z APARTMENTS / ROOMS, żeby podpisy nie rozjechały
// się z podstronami jednostek. Resztę składamy bezpośrednio z PHOTOS.
// Sięganie po zdjęcia PO POZYCJI jest kruche: usunięcie jednego kadru w content.js
// przesuwa wszystkie kolejne indeksy, a brakujący element wywala prerender
// komunikatem „Cannot read properties of undefined". Zdarzyło się 16.09.2026 przy
// usuwaniu zdjęcia na prośbę właścicielki. Ten helper mówi wprost, czego brakuje.
function foto(grupa, i) {
  const f = grupa.photos?.[i]
  if (!f) throw new Error(`content.js: brak zdjęcia o indeksie ${i} w „${grupa.name ?? 'ROOMS'}" (ma ${grupa.photos?.length ?? 0})`)
  return f
}

const AP1 = getApartment('apartament-1')
const AP2 = getApartment('apartament-2')
const AP3 = getApartment('apartament-3')

// UKŁAD SIATKI: grid-cols-2 / md:grid-cols-4, auto-placement bez `dense`.
//
// Sama suma komórek podzielna przez 4 NIE WYSTARCZA — to był błąd poprzedniej
// wersji tego komentarza i realna przyczyna dziur na /galeria (16.09.2026).
// Przy `dense: false` kursor układania nigdy się nie cofa, więc kafelek 2×2
// blokuje dwa rzędy w swoich kolumnach, a to, co po nim idzie, musi domknąć
// OBA te rzędy w pozostałych dwóch kolumnach. Inaczej zostaje pusty prostokąt,
// którego późniejsze zdjęcia już nie zapełnią.
//
// Bezpieczne klocki (komórki: 2×2 = 4, col-span-2 = 2, zwykły = 1):
//   BLOK A (2 rzędy):  2×2, potem (2w | 1+1), potem (2w | 1+1)
//   BLOK B (1 rząd):   2w + 2w
//   BLOK C (1 rząd):   2w + 1 + 1     (albo 1 + 1 + 2w)
//   BLOK D (1 rząd):   1 + 1 + 1 + 1
// Kategoria = sklejka takich klocków. Po każdej zmianie sprawdzić zrzut całej strony.
//
// Do tego kadrowanie: zdjęcie PIONOWE wolno wstawić tylko w kafelek kwadratowy
// (1×1 albo 2×2). W kafelku 2w (szeroki) pion jest obcinany po bokach.
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
    desc: 'Willę pokazujemy w czterech ujęciach z drona i dziesięciu z poziomu ziemi: podjazd, front od drogi i od strony kwiatów, taras z wejściem na piętro oraz elewacja od ogrodu. Osiem pokoi i dwa apartamenty mieszczą się w głównym budynku, trzeci apartament stoi osobno. Dwa kadry pokazują drugi z budynków obiektu.',
    photos: [
      // BLOK A
      { src: PHOTOS.obiektDroneZmierzch, label: 'Willa Wójcik o zmierzchu, ujęcie z drona nad Sromowcami Niżnymi', span: SPAN_2x2 },
      { src: PHOTOS.obiektDronePanorama, label: 'Panorama z drona: willa, ogród i okolica Sromowiec Niżnych', span: SPAN_2 },
      { src: PHOTOS.obiektDroneElewacja, label: 'Elewacja willi z lotu ptaka, balkony pokoi na piętrze', span: SPAN_2 },
      // BLOK B — kadr panoramiczny, więc kafelek szeroki, nie kwadrat
      { src: PHOTOS.obiektTrzyKorony, label: 'Willa Wójcik pod masywem Trzech Koron', span: SPAN_2 },
      { src: PHOTOS.obiektElewacjaOgrod, label: 'Drewniana elewacja i trawnik przed pokojami na parterze', span: SPAN_2 },
      // BLOK A — oba kwadraty to zdjęcia pionowe
      { src: PHOTOS.obiektFront, label: 'Front willi od strony drogi dojazdowej', span: SPAN_2x2 },
      { src: PHOTOS.obiektTarasSchody, label: 'Taras z meblami wypoczynkowymi i schody na piętro' },
      { src: PHOTOS.obiektNaroznikHortensje, label: 'Narożnik budynku z przeszkleniem jadalni, hortensje w ogrodzie' },
      { src: PHOTOS.obiektFrontKwiaty, label: 'Front willi z pelargoniami w skrzynkach okiennych', span: SPAN_2 },
      // BLOK C
      { src: PHOTOS.obiektDroneWiesZmierzch, label: 'Willa i Sromowce Niżne o zmierzchu, szerokie ujęcie z drona', span: SPAN_2 },
      { src: PHOTOS.obiektDomZoltyFront, label: 'Drugi z budynków obiektu, widok od strony drogi' },
      { src: PHOTOS.obiektPodjazd, label: 'Podjazd i bezpłatny parking na terenie obiektu' },
      // BLOK B
      { src: PHOTOS.obiektDomZoltyPodjazd, label: 'Drugi z budynków obiektu, widok od podjazdu', span: SPAN_2 },
      { src: PHOTOS.obiektOdOgrodu, label: 'Budynek od strony ogrodu, tarasy pokoi na parterze', span: SPAN_2 },
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
      { src: PHOTOS.ogrodTarasTrampolina, label: 'Taras przy ogrodzie z widokiem na trampolinę' },
      { src: PHOTOS.ogrodHortensje, label: 'Hortensje kwitnące w ogrodzie' },
      { src: PHOTOS.ogrodHortensjeAltana, label: 'Rabata hortensji wzdłuż budynku, w głębi altana', span: SPAN_2 },
    ],
  },
  {
    id: 'widok',
    label: 'Taras i widok na Trzy Korony',
    desc: 'Masyw Trzech Koron widać z tarasu, z ogrodu i z balkonów apartamentów. Zebraliśmy dwanaście kadrów z różnych miejsc na działce, żeby ocenili Państwo widok jeszcze przed rezerwacją.',
    photos: [
      // BLOK A
      { src: PHOTOS.tarasOgrodTrzyKorony, label: 'Taras i ogród z masywem Trzech Koron w tle', span: SPAN_2x2 },
      { src: PHOTOS.tarasWidokTrzyKorony, label: 'Widok na Trzy Korony prosto z tarasu', span: SPAN_2 },
      { src: PHOTOS.widokTrzyKoronyOgrod, label: 'Trzy Korony widziane znad ogrodu', span: SPAN_2 },
      // BLOK A — kafelek 2×2 to zdjęcie pionowe, więc kwadrat mu służy
      { src: PHOTOS.widokTrzyKoronyPelargonie, label: 'Trzy Korony zza przeszklenia, pelargonie w skrzynce', span: SPAN_2x2 },
      { src: PHOTOS.tarasMebleWidok, label: 'Meble tarasowe ustawione w stronę gór' },
      { src: PHOTOS.tarasDrzewkaWidok, label: 'Drzewka przy tarasie i panorama pienińskich szczytów' },
      { src: PHOTOS.balkonWidokChmury, label: 'Trzy Korony znad balkonowej balustrady, po przejściu chmur', span: SPAN_2 },
      // BLOK C
      { src: PHOTOS.balkonWidokHustawka, label: 'Widok z balkonu na ogród z huśtawką i pienińskie szczyty', span: SPAN_2 },
      { src: PHOTOS.widokTrzyKoronyZzaTui, label: 'Masyw Trzech Koron zza szpaleru tui' },
      { src: PHOTOS.widokTrzyKoronyBlisko, label: 'Trzy Korony w zbliżeniu, widok z terenu obiektu' },
      // BLOK B
      { src: PHOTOS.ogrodWidokTrzyKorony, label: 'Ogród willi z Trzema Koronami na horyzoncie', span: SPAN_2 },
      { src: PHOTOS.trzyKoronyNadDachami, label: 'Szczyty Trzech Koron nad dachami Sromowiec Niżnych', span: SPAN_2 },
    ],
  },
  {
    id: 'apartamenty',
    label: 'Apartamenty',
    desc: 'Apartament 1 ma 38 m², apartament 2 ma 35 m², oba z osobną sypialnią i salonem z aneksem kuchennym. Apartament 3 zajmuje 60 m² w osobnym budynku — jedno otwarte pomieszczenie z miejscami do spania dla sześciu osób. Każdy ma balkon zwrócony w stronę Trzech Koron, a doba kosztuje od 450 zł.',
    // Spany JAWNIE przez tile() — patrz komentarz przy helperze.
    photos: [
      // BLOK A
      tile(foto(AP1, 0), SPAN_2x2), // AP1: salon z rozkładaną sofą i aneksem
      tile(foto(AP1, 1), SPAN_2),   // AP1: sypialnia z wyjściem na taras
      tile(foto(AP1, 5), SPAN_2),   // AP1: salon od strony okna
      // BLOK A — oba kwadraty to zdjęcia pionowe
      tile(foto(AP3, 0), SPAN_2x2), // AP3: część sypialna przy ściance z bali
      tile(foto(AP2, 2)),           // AP2: łazienka
      tile(foto(AP3, 2)),           // AP3: marmurowa łazienka (pion — kafelek kwadratowy)
      tile(foto(AP2, 0), SPAN_2),   // AP2: salon z żółtą sofą
      // BLOK C
      tile(foto(AP2, 1), SPAN_2),   // AP2: sypialnia z wyjściem na balkon
      tile(foto(AP3, 5)),           // AP3: łóżko pod skosami, przy oknie
      tile(foto(AP3, 3)),           // AP3: jadalnia pod skosami
    ],
  },
  {
    id: 'pokoje',
    label: 'Pokoje',
    desc: 'Każdy z ośmiu pokoi ma 21 m², łóżko małżeńskie 160 × 200, małą sofę rozkładaną i własną łazienkę. Cztery pokoje na piętrze mają balkon, cztery na parterze — taras. Doba kosztuje 250 zł dla dwóch osób i 280 zł dla trzech.',
    // BLOK A + dwa rzędy kwadratów. Większość kadrów pokoi jest pionowa, więc
    // poza jednym panoramicznym ujęciem tarasów nie używamy tu kafelków szerokich.
    photos: [
      tile(foto(ROOMS, 0), SPAN_2x2), // pokój na piętrze z balkonem
      tile(foto(ROOMS, 1)),           // łazienka z kabiną prysznicową
      tile(foto(ROOMS, 2)),           // pokój z jasną podłogą
      { src: PHOTOS.pokojeParterTarasy, label: 'Tarasy pokoi na parterze z wyjściem wprost do ogrodu', span: SPAN_2 },
      tile(foto(ROOMS, 3)),           // przestronny pokój z miejscem do pracy
      tile(foto(ROOMS, 4)),           // pokój z lustrem
      tile(foto(ROOMS, 5)),           // pokój z rozkładaną sofą
      tile(foto(ROOMS, 6)),           // pokój z wejściem do łazienki
      tile(foto(ROOMS, 7)),           // pokój z biurkiem i wyjściem na balkon
      tile(foto(ROOMS, 8)),           // pokój z fotelami
      { src: PHOTOS.lazienkaUmywalka, label: 'Łazienka w pokoju: umywalka, lustro i świeże ręczniki' },
      { src: PHOTOS.lazienkaDrewno, label: 'Łazienka wykończona drewnem, prysznic i suszarka do włosów' },
    ],
  },
  {
    id: 'wspolne',
    label: 'Części wspólne',
    desc: 'Na parterze czekają wspólna kuchnia o powierzchni 45 m² połączona z jadalnią, salon i kącik dla dzieci. Śniadania przygotowują Państwo we własnym zakresie. Naczynia, garnki i sprzęt kuchenny są na miejscu.',
    photos: [
      // BLOK A — oba kwadraty to zdjęcia pionowe
      { src: PHOTOS.wspolneKuchnia, label: 'Wspólna kuchnia o powierzchni 45 m², w pełni wyposażona', span: SPAN_2x2 },
      { src: PHOTOS.wspolneSalon, label: 'Salon z kanapami w części wspólnej' },
      { src: PHOTOS.wspolneHol, label: 'Hol wejściowy na parterze' },
      { src: PHOTOS.wspolneJadalniaOgrod, label: 'Jadalnia z przeszkleniem wychodzącym na ogród', span: SPAN_2 },
      // BLOK C
      { src: PHOTOS.wspolneSalonSchody, label: 'Salon i drewniane schody na piętro', span: SPAN_2 },
      { src: PHOTOS.wspolneJadalnia, label: 'Stoły w jadalni połączonej z kuchnią' },
      { src: PHOTOS.wspolneKorytarz, label: 'Korytarz prowadzący do pokoi' },
      // BLOK B
      { src: PHOTOS.wspolneStrefaWypoczynku, label: 'Strefa wypoczynku z fotelami na parterze', span: SPAN_2 },
      { src: PHOTOS.wspolneKacikDzieciecy, label: 'Kącik dziecięcy w części wspólnej', span: SPAN_2 },
      // BLOK C — oba kwadraty to zdjęcia pionowe
      { src: PHOTOS.wspolneKorytarzPietro, label: 'Korytarz na piętrze i klatka schodowa', span: SPAN_2 },
      { src: PHOTOS.wspolneHolZGory, label: 'Część wspólna widziana z półpiętra' },
      { src: PHOTOS.wspolneJadalniaWidok, label: 'Stolik w jadalni z widokiem na Trzy Korony' },
      // BLOK C
      { src: PHOTOS.wspolneKuchniaSchody, label: 'Kuchnia i jadalnia od strony schodów', span: SPAN_2 },
      { src: PHOTOS.wspolneStrefaFototapeta, label: 'Strefa wypoczynku przy fototapecie z Tatrami' },
      { src: PHOTOS.wspolneSalonJadalnia, label: 'Salon i jadalnia z przeszkleniem na ogród' },
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
                  {/* h2 zamiast span: kategorie są nagłówkami sekcji (wygląd bez zmian, styl z .eyebrow) */}
                  <h2 className="eyebrow text-cream/75">
                    <span aria-hidden="true">{String(i + 1).padStart(2, '0')} — </span>{c.label}
                  </h2>
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
