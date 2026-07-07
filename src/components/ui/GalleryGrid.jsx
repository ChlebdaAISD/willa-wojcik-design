import { useEffect, useRef, useState } from 'react'
import { IconChevL, IconChevR, IconClose } from '../Icons.jsx'

// Siatka zdjęć (masonry) + lightbox z obsługą klawiatury i swipe.
// photos: [{ src, label, span? }]. Reużywana na home i na /galeria.
// SSR-safe: dostęp do window tylko w useEffect.
export function GalleryGrid({ photos, className = '' }) {
  const [open, setOpen] = useState(null)
  const [touchStartX, setTouchStartX] = useState(null)
  const swipedRef = useRef(false)
  const n = photos.length

  useEffect(() => {
    if (open === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(null)
      if (e.key === 'ArrowRight') setOpen((o) => (o + 1) % n)
      if (e.key === 'ArrowLeft') setOpen((o) => (o - 1 + n) % n)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, n])

  const onTouchStart = (e) => setTouchStartX(e.touches[0].clientX)
  const onTouchEnd = (e) => {
    if (touchStartX === null) return
    const dx = e.changedTouches[0].clientX - touchStartX
    if (Math.abs(dx) > 60) {
      swipedRef.current = true
      setOpen((o) => (dx < 0 ? (o + 1) % n : (o - 1 + n) % n))
    }
    setTouchStartX(null)
  }

  return (
    <>
      <div className={`grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-3 ${className}`}>
        {photos.map((p, i) => (
          <button key={i} onClick={() => setOpen(i)}
                  aria-label={`Powiększ zdjęcie: ${p.label}`}
                  className={`reveal relative group overflow-hidden cursor-plus ${p.span || ''}`}
                  style={{ transitionDelay: `${(i % 4) * 60}ms` }}>
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[1200ms] group-hover:scale-110"
                 style={{ backgroundImage: `url(${p.src})` }} />
            <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/30 transition-colors duration-500" />
            <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
              <div className="eyebrow text-cream/80 text-[10px]">{String(i + 1).padStart(2, '0')}</div>
              <div className="font-serif text-cream text-lg leading-tight mt-1">{p.label}</div>
            </div>
          </button>
        ))}
      </div>

      {open !== null && (
        <div className="fixed inset-0 z-[100] bg-charcoal/95 backdrop-blur-md flex items-center justify-center p-6"
             onClick={() => { if (swipedRef.current) { swipedRef.current = false; return } setOpen(null) }}
             onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <button onClick={(e) => { e.stopPropagation(); setOpen(null) }}
                  aria-label="Zamknij"
                  className="absolute top-6 right-6 w-11 h-11 rounded-full border border-cream/30 text-cream hover:bg-cream/10 flex items-center justify-center">
            <IconClose size={18} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); setOpen((o) => (o - 1 + n) % n) }}
                  aria-label="Poprzednie"
                  className="hidden sm:flex absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-cream/30 text-cream hover:bg-cream/10 items-center justify-center">
            <IconChevL size={20} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); setOpen((o) => (o + 1) % n) }}
                  aria-label="Następne"
                  className="hidden sm:flex absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-cream/30 text-cream hover:bg-cream/10 items-center justify-center">
            <IconChevR size={20} />
          </button>
          <figure className="max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full" style={{ aspectRatio: '16/10' }}>
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${photos[open].src})` }} />
            </div>
            <figcaption className="mt-5 flex items-center justify-between gap-4">
              <div className="font-serif text-cream text-lg sm:text-xl min-w-0 truncate">{photos[open].label}</div>
              <div className="flex items-center gap-3 shrink-0">
                <div className="eyebrow text-cream/50">{String(open + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</div>
                <div className="flex gap-2 sm:hidden">
                  <button onClick={(e) => { e.stopPropagation(); setOpen((o) => (o - 1 + n) % n) }}
                          aria-label="Poprzednie"
                          className="w-9 h-9 rounded-full border border-cream/30 text-cream hover:bg-cream/10 flex items-center justify-center">
                    <IconChevL size={16} />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); setOpen((o) => (o + 1) % n) }}
                          aria-label="Następne"
                          className="w-9 h-9 rounded-full border border-cream/30 text-cream hover:bg-cream/10 flex items-center justify-center">
                    <IconChevR size={16} />
                  </button>
                </div>
              </div>
            </figcaption>
          </figure>
        </div>
      )}
    </>
  )
}
