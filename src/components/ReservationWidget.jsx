import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearch } from 'wouter'
import { buildWidgetUrl, parseStay, ROOMADMIN_ORIGIN } from '../data/booking.js'
import { SITE } from '../data/site.js'
import { IconArrow, IconPhone } from './Icons.jsx'

// Nagłówek strony ma 80 px (h-20) i jest przyklejony — tyle plus oddech zostawiamy
// nad ramką, gdy przewijamy do początku widżetu.
const HEADER_OFFSET = 104
// Zabezpieczenie przed absurdalną wartością z cudzej wiadomości (np. Infinity)
const MAX_HEIGHT = 20000

const scrollBehavior = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'

// Widżet RoomAdmin w ramce, która rośnie razem z treścią — bez drugiego paska przewijania.
//
// Jak to działa (IframeHelper.js widżetu, sprawdzone 13.10.2026):
// - widżet co 40 ms wysyła do rodzica postMessage z polem `height`, a przy zmianach
//   kroku także `event.name` (np. „reservation.step.change", „widget.scrollup.requested");
// - wiadomość `{ setup: { autoHeight: true } }` od rodzica wyłącza mu wewnętrzny scroll.
// Dlatego wysokość ramki ustawiamy z wiadomości, a po zmianie kroku przewijamy stronę
// do góry widżetu — inaczej gość, który kliknął „wybieram" przy siódmym pokoju,
// zostałby pod krótkim już formularzem i widział pustkę.
export function ReservationWidget() {
  const search = useSearch()
  // Adres widżetu składamy dopiero w przeglądarce: prerender nie zna parametrów
  // z adresu strony, a przy budowaniu widżet i tak nie powinien się ładować.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const stay = useMemo(() => parseStay(search), [search])
  const src = mounted ? buildWidgetUrl(stay) : null

  return (
    <div>
      {/* Na telefonie ramka idzie od krawędzi do krawędzi: widżet ma własne marginesy,
          a każdy piksel szerokości to mniej zawiniętych nazw pokoi i cen. */}
      <div className="relative -mx-6 md:mx-0">
        {/* key = adres: nowa ramka (i świeży stan ładowania) tylko wtedy, gdy adres
            widżetu naprawdę się zmienia. Zmiana samego adresu strony, która nie zmienia
            widżetu (np. ?fbclid= z Facebooka znika po kliknięciu „Zarezerwuj"), nie może
            zostawić zasłony „Wczytujemy" nad ramką, która już nie wyśle zdarzenia load. */}
        {src
          ? <WidgetFrame key={src} src={src} scrollToResults={Boolean(stay.arrival && stay.departure)} />
          : <WidgetSkeleton />}
      </div>

      {/* Zapasowe wyjście: przeglądarki z blokadą ciasteczek stron trzecich (Safari w trybie
          ścisłym, Brave) potrafią zgubić sesję widżetu w ramce. W nowej karcie działa zawsze.
          Link jest też w prerenderze, więc działa bez JavaScriptu. */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-x-8 gap-y-3 text-center text-[13px] text-charcoal/70">
        <a href={src ?? buildWidgetUrl()} target="_blank" rel="noopener noreferrer"
           className="group inline-flex items-center gap-2 underline underline-offset-4 decoration-charcoal/25 hover:text-forest hover:decoration-forest">
          Formularz się nie wczytuje? Prosimy otworzyć go w nowej karcie
          <IconArrow size={14} className="transition-transform group-hover:translate-x-0.5" />
        </a>
        <a href={SITE.phoneHref} className="inline-flex items-center gap-2 hover:text-forest">
          <IconPhone size={14} className="text-gold-3" />
          {SITE.phone}
        </a>
      </div>
    </div>
  )
}

function WidgetFrame({ src, scrollToResults }) {
  const frameRef = useRef(null)
  const [height, setHeight] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const setupSentRef = useRef(false)
  const scrolledRef = useRef(false)

  useEffect(() => {
    const scrollToWidget = () => {
      const top = frameRef.current?.getBoundingClientRect().top
      if (top != null && top < HEADER_OFFSET) {
        window.scrollTo({ top: window.scrollY + top - HEADER_OFFSET, behavior: scrollBehavior() })
      }
    }
    const onMessage = (e) => {
      // Tylko nasza ramka i tylko z domeny RoomAdmin
      const win = frameRef.current?.contentWindow
      if (e.origin !== ROOMADMIN_ORIGIN || !win || e.source !== win) return
      const data = e.data
      if (!data || typeof data !== 'object') return
      // Pierwsza wiadomość = widżet żyje. Siatka bezpieczeństwa na wypadek, gdyby
      // nasłuch widżetu wstał dopiero po zdarzeniu load i zgubił ustawienie autoHeight.
      if (!setupSentRef.current) {
        setupSentRef.current = true
        win.postMessage({ setup: { autoHeight: true } }, ROOMADMIN_ORIGIN)
      }
      setLoaded(true)
      if (typeof data.height === 'number' && data.height > 0) {
        setHeight(Math.min(Math.ceil(data.height), MAX_HEIGHT))
      }
      const name = data.event?.name
      if (name === 'reservation.step.change' || name === 'widget.scrollup.requested'
          || name === 'reservation.submit.success') scrollToWidget()
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  const onLoad = () => {
    setLoaded(true)
    frameRef.current?.contentWindow?.postMessage({ setup: { autoHeight: true } }, ROOMADMIN_ORIGIN)
    // Gość przyszedł z datami (np. z wyboru terminu na stronie głównej) — chce wyników,
    // nie nagłówka. Na telefonie ramka zaczyna się prawie pod zgięciem, więc ją podsuwamy.
    // Tylko raz: load odpala się też przy każdym przejściu wewnątrz widżetu.
    if (!scrollToResults || scrolledRef.current) return
    scrolledRef.current = true
    const top = frameRef.current?.getBoundingClientRect().top
    if (top != null && top > window.innerHeight * 0.45) {
      window.scrollTo({ top: window.scrollY + top - HEADER_OFFSET, behavior: scrollBehavior() })
    }
  }

  return (
    <div className="relative" style={{ minHeight: loaded ? undefined : 560 }}>
      <iframe
        ref={frameRef}
        src={src}
        onLoad={onLoad}
        title="Rezerwacja online Willi Wójcik — wolne terminy i ceny"
        allow="payment"
        // `invisible` do czasu załadowania: przezroczysta ramka byłaby i tak w kolejności tabulacji
        className={`block w-full border-0 transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0 invisible'}`}
        // Zanim widżet poda wysokość: tyle, żeby zmieścił się otwarty kalendarz.
        // Gdyby wiadomości nie dochodziły, ramka ma własny pasek przewijania.
        style={{ height: height ?? 560 }}
      />
      {!loaded && <WidgetSkeleton overlay />}
    </div>
  )
}

function WidgetSkeleton({ overlay = false }) {
  return (
    <div className={`${overlay ? 'absolute inset-0' : 'min-h-[560px]'} px-6 md:px-0 pointer-events-none`} aria-hidden="true">
      <div className="h-[76px] rounded-sm bg-white/80 border border-charcoal/10 flex items-center gap-4 px-5 animate-pulse">
        <div className="h-9 flex-1 rounded-sm bg-cream-2" />
        <div className="h-9 flex-1 rounded-sm bg-cream-2 hidden sm:block" />
        <div className="h-9 flex-1 rounded-sm bg-cream-2 hidden md:block" />
        <div className="h-11 w-40 rounded-sm bg-forest/25" />
      </div>
    </div>
  )
}
