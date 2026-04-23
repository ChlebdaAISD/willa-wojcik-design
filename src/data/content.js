import heroMountain from '../assets/hero.png'
import buildingDusk from '../assets/screenshot-16-10-09.png'
import buildingWinter from '../assets/screenshot-15-40-49.png'
import apartment from '../assets/screenshot-15-41-20.png'
import livingRoom from '../assets/screenshot-15-40-04.png'
import livingRoom2 from '../assets/screenshot-15-41-35.png'
import commonArea from '../assets/screenshot-15-40-11.png'
import roomBirch from '../assets/room-interior-1.png'
import terrace from '../assets/screenshot-16-10-50.png'
import bathroom from '../assets/screenshot-15-41-03.png'
import balconyView from '../assets/screenshot-15-40-31.png'

export const PHOTOS = {
  heroMountain,
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
  { title: 'Kładka pieszo-rowerowa na Słowację', dist: '0,8 km', time: '10 min pieszo' },
  { title: 'Spływ Dunajcem — przystań', dist: '2,5 km', time: '5 min autem' },
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
