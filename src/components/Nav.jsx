import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'wouter'
import { NAV_LINKS, SITE } from '../data/site.js'
import { usePageInert } from '../lib/usePageInert.js'
import { IconClose, IconPhone } from './Icons.jsx'
import logoMark from '../assets/logo-mark.webp'

function Logo({ dark, onClick }) {
  const [location] = useLocation()
  // Logo = powrót na home; gdy już jesteśmy na home, płynny scroll na górę
  // (zmianę trasy scrolluje ScrollToTop w App).
  const handleClick = () => {
    onClick?.()
    if (location === '/') window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  return (
    <Link href="/" onClick={handleClick} className="flex items-center gap-3 group shrink-0" aria-label="Willa Wójcik — strona główna">
      {/* Sygnet właściciela wycięty z jego grafiki (scripts/extract-logo.py).
          Złoto jest jasne — na kremowym pasku po scrollu przygaszamy je filtrem,
          bo w oryginale znak był projektowany na ciemne niebo. */}
      <img src={logoMark} alt="" aria-hidden="true"
           width="480" height="160" decoding="async"
           className="h-7 md:h-8 w-auto shrink-0 transition-[filter] duration-500"
           style={{ filter: dark ? 'brightness(0.72) saturate(1.25)' : 'none' }} />
      {/* Na telefonie zostaje sam sygnet — nazwa zabierała miejsce przyciskowi
          „Zarezerwuj" i hamburgerowi, a i tak powtarza się w hero oraz w stopce. */}
      <div className="hidden sm:block leading-tight">
        <div className={`font-serif text-lg ${dark ? 'text-charcoal' : 'text-cream'}`} style={{ fontWeight: 500 }}>Willa Wójcik</div>
        <div className={`hidden lg:block eyebrow ${dark ? 'text-charcoal/70' : 'text-cream/70'}`} style={{ fontSize: 9, letterSpacing: '0.25em' }}>Apartamenty i pokoje</div>
      </div>
    </Link>
  )
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [location] = useLocation()
  const dialogRef = useRef(null)
  const firstLinkRef = useRef(null)
  const burgerRef = useRef(null)
  const openedOnceRef = useRef(false)

  // Nagłówek, treść i stopka wypadają z drzewa dostępności na czas otwartego menu
  usePageInert(menuOpen)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Blokuj scroll tła gdy menu mobilne otwarte
  useEffect(() => {
    if (typeof document === 'undefined') return
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Obsługa klawiatury w otwartym menu: Escape zamyka, Tab krąży wewnątrz dialogu.
  // Bez pułapki fokus po kilku Tabach uciekał na stronę pod spodem, której użytkownik
  // nie widzi. Wzorzec skopiowany z GalleryGrid.jsx, gdzie działa poprawnie.
  useEffect(() => {
    if (!menuOpen) return
    // Hamburger w tej samej klatce dostaje `inert` (header niżej), więc przeglądarka
    // zeruje z niego fokus do <body> — trzeba go jawnie wprowadzić do dialogu.
    // Celem jest przycisk „Zamknij": to zwykły <button>, więc ref na pewno wskazuje
    // element DOM (Link z woutera nie gwarantuje przekazania ref-a dalej).
    firstLinkRef.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') { setMenuOpen(false); return }
      if (e.key !== 'Tab' || !dialogRef.current) return
      const focusable = [...dialogRef.current.querySelectorAll('a[href], button:not([disabled])')]
        .filter((el) => el.getClientRects().length > 0)
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  // Po zamknięciu fokus wraca na hamburger, a nie na początek strony
  useEffect(() => {
    if (menuOpen) return
    if (openedOnceRef.current) burgerRef.current?.focus()
    openedOnceRef.current = false
  }, [menuOpen])

  const isActive = (href) =>
    href === '/' ? location === '/' : (location === href || location.startsWith(href + '/'))

  const dark = scrolled // ciemny tekst na kremowym pasku po scrollu

  // Klik w link prowadzący do trasy, na której JUŻ jesteśmy, nie zmienia adresu,
  // więc ScrollToTop w App.jsx się nie uruchamia i strona zostaje tam, gdzie była.
  // Najbardziej bolało to przy „Zarezerwuj" na /kontakt — przycisk wyglądał na zepsuty.
  const scrollTopIfSame = (href) => () => {
    if (location === href) window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <header
              className={`fixed top-0 inset-x-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500 ${scrolled ? 'bg-cream/90 backdrop-blur-md border-b border-charcoal/10' : 'bg-transparent'}`}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between gap-4"
             style={{ textShadow: scrolled ? 'none' : '0 1px 16px rgba(0,0,0,0.35)' }}>
          <Logo dark={dark} />

          {/* Desktop links */}
          <nav aria-label="Nawigacja główna" className="hidden lg:flex items-center gap-9">
            {NAV_LINKS.map(({ label, href }) => {
              const active = isActive(href)
              return (
                <Link key={href} href={href}
                      onClick={scrollTopIfSame(href)}
                      aria-current={active ? 'page' : undefined}
                      className={`group relative text-[14px] font-semibold tracking-wide transition-colors ${
                        dark
                          ? (active ? 'text-forest' : 'text-charcoal/80 hover:text-forest')
                          : (active ? 'text-cream' : 'text-cream/85 hover:text-cream')
                      }`}>
                  {label}
                  <span className={`absolute left-0 -bottom-1.5 h-[2px] bg-gold rounded-full transition-[width] duration-300 ${active ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </Link>
              )
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/kontakt"
                  onClick={scrollTopIfSame('/kontakt')}
                  className={`inline-flex items-center min-h-12 px-5 rounded-full text-[13px] font-semibold tracking-wide whitespace-nowrap shrink-0 transition-colors duration-300 ${
                    dark ? 'bg-forest text-cream hover:bg-forest-2' : 'bg-cream text-forest hover:bg-white'
                  }`}>
              Zarezerwuj
            </Link>
            {/* Hamburger — tylko mobile/tablet */}
            <button ref={burgerRef}
                    onClick={() => { openedOnceRef.current = true; setMenuOpen(true) }}
                    aria-label="Otwórz menu" aria-expanded={menuOpen}
                    className={`lg:hidden w-12 h-12 flex flex-col items-center justify-center gap-[5px] ${dark ? 'text-charcoal' : 'text-cream'}`}>
              <span className="block w-6 h-[2px] bg-current rounded-full" />
              <span className="block w-6 h-[2px] bg-current rounded-full" />
              <span className="block w-4 h-[2px] bg-current rounded-full self-start ml-2.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-label="Menu"
           inert={!menuOpen}
           className={`lg:hidden fixed inset-0 z-[60] transition-opacity duration-300 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
           aria-hidden={!menuOpen}>
        <div className="absolute inset-0 bg-forest">
          <div className="absolute inset-0 grain opacity-40 pointer-events-none" />
          <div className="relative h-full flex flex-col max-w-[1440px] mx-auto px-6">
            <div className="h-20 flex items-center justify-between">
              <Logo dark={false} onClick={() => setMenuOpen(false)} />
              <button ref={firstLinkRef} onClick={() => setMenuOpen(false)} aria-label="Zamknij menu"
                      className="w-12 h-12 -mr-2 flex items-center justify-center text-cream">
                <IconClose size={24} />
              </button>
            </div>

            <nav aria-label="Nawigacja główna" className="flex-1 flex flex-col justify-start gap-1 pt-6">
              {NAV_LINKS.map(({ label, href }, i) => {
                const active = isActive(href)
                return (
                  <Link key={href} href={href}
                        onClick={() => { setMenuOpen(false); scrollTopIfSame(href)() }}
                        aria-current={active ? 'page' : undefined}
                        className="group flex items-baseline gap-4 py-3">
                    <span className="font-mono text-cream/55 text-[13px] w-7">{String(i + 1).padStart(2, '0')}</span>
                    <span className={`font-serif leading-none transition-colors ${active ? 'text-gold' : 'text-cream group-hover:text-gold'}`}
                          style={{ fontSize: 'clamp(30px, 9vw, 44px)', fontWeight: 400 }}>
                      {label}
                    </span>
                  </Link>
                )
              })}
            </nav>

            <div className="pb-10 pt-6 border-t border-cream/15 flex flex-col gap-4">
              <a href={SITE.phoneHref} className="flex items-center gap-3 text-cream">
                <IconPhone size={20} className="text-gold" />
                <span className="text-lg" style={{ fontWeight: 500 }}>{SITE.phone}</span>
              </a>
              <div className="text-cream/75 text-sm">{SITE.street}, {SITE.city}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
