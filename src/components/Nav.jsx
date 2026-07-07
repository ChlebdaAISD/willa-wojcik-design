import { useEffect, useState } from 'react'
import { Link, useLocation } from 'wouter'
import { NAV_LINKS, SITE } from '../data/site.js'
import { IconClose, IconPhone } from './Icons.jsx'

function Logo({ dark }) {
  return (
    <Link href="/" className="flex items-center gap-3 group shrink-0" aria-label="Willa Wójcik — strona główna">
      <svg width="30" height="30" viewBox="0 0 40 40" className={dark ? 'text-forest' : 'text-cream'} aria-hidden="true">
        <path d="M4 32 L14 14 L20 22 L26 12 L36 32 Z" fill="currentColor" />
        <circle cx="26" cy="10" r="2" fill="var(--color-gold)" />
      </svg>
      <div className="leading-tight">
        <div className={`font-serif text-lg ${dark ? 'text-charcoal' : 'text-cream'}`} style={{ fontWeight: 500 }}>Willa Wójcik</div>
        <div className={`hidden lg:block eyebrow ${dark ? 'text-charcoal/55' : 'text-cream/70'}`} style={{ fontSize: 9, letterSpacing: '0.25em' }}>Apartamenty · Pokoje</div>
      </div>
    </Link>
  )
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [location] = useLocation()

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

  // Zamknij menu klawiszem Escape
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const isActive = (href) =>
    href === '/' ? location === '/' : (location === href || location.startsWith(href + '/'))

  const dark = scrolled // ciemny tekst na kremowym pasku po scrollu

  return (
    <>
      <header inert={menuOpen ? '' : undefined}
              className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'bg-cream/90 backdrop-blur-md border-b border-charcoal/10' : 'bg-transparent'}`}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between gap-4"
             style={{ textShadow: scrolled ? 'none' : '0 1px 16px rgba(0,0,0,0.35)' }}>
          <Logo dark={dark} />

          {/* Desktop links */}
          <nav className="hidden lg:flex items-center gap-9">
            {NAV_LINKS.map(({ label, href }) => {
              const active = isActive(href)
              return (
                <Link key={href} href={href}
                      aria-current={active ? 'page' : undefined}
                      className={`group relative text-[14px] font-semibold tracking-wide transition-colors ${
                        dark
                          ? (active ? 'text-forest' : 'text-charcoal/80 hover:text-forest')
                          : (active ? 'text-cream' : 'text-cream/85 hover:text-cream')
                      }`}>
                  {label}
                  <span className={`absolute left-0 -bottom-1.5 h-[2px] bg-gold rounded-full transition-all duration-300 ${active ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </Link>
              )
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/kontakt"
                  className={`px-5 py-2.5 rounded-full text-[13px] font-semibold tracking-wide whitespace-nowrap shrink-0 transition-colors duration-300 ${
                    dark ? 'bg-forest text-cream hover:bg-forest-2' : 'bg-cream text-forest hover:bg-white'
                  }`}>
              Zarezerwuj
            </Link>
            {/* Hamburger — tylko mobile/tablet */}
            <button onClick={() => setMenuOpen(true)}
                    aria-label="Otwórz menu" aria-expanded={menuOpen}
                    className={`lg:hidden w-11 h-11 flex flex-col items-center justify-center gap-[5px] ${dark ? 'text-charcoal' : 'text-cream'}`}>
              <span className="block w-6 h-[2px] bg-current rounded-full" />
              <span className="block w-6 h-[2px] bg-current rounded-full" />
              <span className="block w-4 h-[2px] bg-current rounded-full self-start ml-2.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div role="dialog" aria-modal="true" aria-label="Menu"
           className={`lg:hidden fixed inset-0 z-[60] transition-opacity duration-300 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
           aria-hidden={!menuOpen}>
        <div className="absolute inset-0 bg-forest">
          <div className="absolute inset-0 grain opacity-40 pointer-events-none" />
          <div className="relative h-full flex flex-col max-w-[1440px] mx-auto px-6">
            <div className="h-20 flex items-center justify-between">
              <span className="font-serif text-cream text-lg" style={{ fontWeight: 500 }}>Willa Wójcik</span>
              <button onClick={() => setMenuOpen(false)} aria-label="Zamknij menu"
                      className="w-11 h-11 -mr-2 flex items-center justify-center text-cream">
                <IconClose size={24} />
              </button>
            </div>

            <nav className="flex-1 flex flex-col justify-start gap-1 pt-6">
              {NAV_LINKS.map(({ label, href }, i) => {
                const active = isActive(href)
                return (
                  <Link key={href} href={href} onClick={() => setMenuOpen(false)}
                        className="group flex items-baseline gap-4 py-3">
                    <span className="font-mono text-gold/70 text-[13px] w-7">{String(i + 1).padStart(2, '0')}</span>
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
              <div className="text-cream/60 text-sm">{SITE.street} · {SITE.city}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
