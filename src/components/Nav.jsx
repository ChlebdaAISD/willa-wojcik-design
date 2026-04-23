import { useEffect, useState } from 'react'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onS = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onS)
    return () => window.removeEventListener('scroll', onS)
  }, [])
  const links = [
    ['Apartamenty', '#apartamenty'],
    ['Udogodnienia', '#udogodnienia'],
    ['Galeria', '#galeria'],
    ['Lokalizacja', '#lokalizacja'],
    ['Opinie', '#opinie'],
    ['Kontakt', '#kontakt'],
  ]
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'bg-cream/90 backdrop-blur-md border-b border-charcoal/10' : 'bg-transparent'}`}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <svg width="28" height="28" viewBox="0 0 40 40" className={scrolled ? 'text-forest' : 'text-cream'}>
            <path d="M4 32 L14 14 L20 22 L26 12 L36 32 Z" fill="currentColor"/>
            <circle cx="26" cy="10" r="2" fill="currentColor"/>
          </svg>
          <div className="leading-tight">
            <div className={`font-serif text-lg ${scrolled ? 'text-charcoal' : 'text-cream'}`}>Willa Wójcik</div>
            <div className={`eyebrow ${scrolled ? 'text-charcoal/60' : 'text-cream/70'}`} style={{ fontSize: 9, letterSpacing: '0.25em' }}>Apartamenty · Pokoje</div>
          </div>
        </a>
        <nav className="hidden lg:flex items-center gap-8">
          {links.map(([l, h]) => (
            <a key={l} href={h}
               className={`text-[13px] tracking-wide transition-colors ${scrolled ? 'text-charcoal/70 hover:text-forest' : 'text-cream/80 hover:text-cream'}`}>
              {l}
            </a>
          ))}
        </nav>
        <a href="#kontakt"
           className={`px-5 py-2.5 rounded-full text-[13px] tracking-wide transition-all whitespace-nowrap shrink-0
            ${scrolled ? 'bg-forest text-cream hover:bg-forest-2' : 'bg-cream text-forest hover:bg-white'}`}>
          Zarezerwuj
        </a>
      </div>
    </header>
  )
}
