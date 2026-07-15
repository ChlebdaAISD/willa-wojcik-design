import { useEffect, useRef, useState } from 'react'
import { IconChevL, IconChevR, IconClose } from '../Icons.jsx'

// Siatka zdjęć (masonry) + lightbox: klawiatura, swipe, focus-trap, blokada
// scrolla, powrót fokusa. photos: [{ src, label, span? }]. Reużywana na home
// i na /galeria. SSR-safe: dostęp do window/document tylko w useEffect.
// hideThumbLabels: ukrywa podpisy na miniaturach (opisy pokazujemy dopiero w
// lightboxie). Alt text zostaje na <img> — a11y/SEO bez zmian.
export function GalleryGrid({ photos, className = '', hideThumbLabels = false }) {
  const [open, setOpen] = useState(null)
  const [touchStartX, setTouchStartX] = useState(null)
  const swipedRef = useRef(false)
  const dialogRef = useRef(null)
  const closeBtnRef = useRef(null)
  const lastFocusedRef = useRef(null)
  const n = photos.length

  useEffect(() => {
    if (open === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(null)
      if (e.key === 'ArrowRight') setOpen((o) => (o + 1) % n)
      if (e.key === 'ArrowLeft') setOpen((o) => (o - 1 + n) % n)
      // Pułapka fokusa w dialogu (Tab / Shift+Tab zapętlone).
      // Filtr widoczności: strzałki mobile (sm:hidden) / desktop (hidden sm:flex)
      // istnieją w DOM równocześnie — bez filtra "last" bywa niewidoczny i Tab ucieka.
      if (e.key === 'Tab' && dialogRef.current) {
        const focusables = [...dialogRef.current.querySelectorAll('button')]
          .filter((el) => el.getClientRects().length > 0)
        if (!focusables.length) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, n])

  // Otwarcie lightboxa: fokus na Zamknij + blokada scrolla; zamknięcie: powrót fokusa.
  // Dep = boolean otwarcia (celowo): efekt ma działać raz na otwarcie/zamknięcie,
  // nie przy nawigacji między zdjęciami. Poprzedni overflow zapamiętujemy (mobile
  // menu w Nav też blokuje scroll — nie nadpisujemy się nawzajem).
  useEffect(() => {
    if (open !== null) {
      lastFocusedRef.current = document.activeElement
      const prevOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      closeBtnRef.current?.focus()
      return () => {
        document.body.style.overflow = prevOverflow
        lastFocusedRef.current?.focus?.()
      }
    }
  }, [open !== null])

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
                  style={{ '--d': `${(i % 4) * 0.06}s` }}>
            <img src={p.src} alt={p.label} loading="lazy" decoding="async"
                 className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-110" />
            {hideThumbLabels ? (
              // Bez podpisu — sam delikatny cień na hover (desktop) dla afordancji klikalności
              <div className="absolute inset-0 hidden md:block bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-500" />
            ) : (
              <>
                {/* mobile: stały gradient pod podpisem; desktop: przyciemnienie na hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent md:hidden" />
                <div className="absolute inset-0 hidden md:block bg-charcoal/0 group-hover:bg-charcoal/30 transition-colors duration-500" />
                <div className="absolute bottom-4 left-4 right-4 opacity-100 translate-y-0 md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-500 text-left">
                  <div className="eyebrow text-cream/80 text-[10px]">{String(i + 1).padStart(2, '0')}</div>
                  <div className="font-serif text-cream text-lg leading-tight mt-1">{p.label}</div>
                </div>
              </>
            )}
          </button>
        ))}
      </div>

      {open !== null && (
        <div ref={dialogRef}
             role="dialog" aria-modal="true"
             aria-label={`Podgląd zdjęcia: ${photos[open].label}`}
             className="fixed inset-0 z-[100] bg-charcoal/95 backdrop-blur-md flex items-center justify-center p-6"
             onClick={() => { if (swipedRef.current) { swipedRef.current = false; return } setOpen(null) }}
             onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <button ref={closeBtnRef}
                  onClick={(e) => { e.stopPropagation(); setOpen(null) }}
                  aria-label="Zamknij podgląd"
                  className="absolute top-6 right-6 w-11 h-11 rounded-full border border-cream/30 text-cream hover:bg-cream/10 flex items-center justify-center">
            <IconClose size={18} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); setOpen((o) => (o - 1 + n) % n) }}
                  aria-label="Poprzednie zdjęcie"
                  className="hidden sm:flex absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-cream/30 text-cream hover:bg-cream/10 items-center justify-center">
            <IconChevL size={20} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); setOpen((o) => (o + 1) % n) }}
                  aria-label="Następne zdjęcie"
                  className="hidden sm:flex absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-cream/30 text-cream hover:bg-cream/10 items-center justify-center">
            <IconChevR size={20} />
          </button>
          <figure className="max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full" style={{ aspectRatio: '16/10' }}>
              <img src={photos[open].src} alt={photos[open].label} decoding="async"
                   className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <figcaption className="mt-5 flex items-start justify-between gap-4">
              <div className="font-serif text-cream text-base sm:text-xl min-w-0 leading-snug text-pretty">{photos[open].label}</div>
              <div className="flex items-center gap-3 shrink-0">
                <div className="eyebrow text-cream/70">{String(open + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</div>
                <div className="flex gap-2 sm:hidden">
                  <button onClick={(e) => { e.stopPropagation(); setOpen((o) => (o - 1 + n) % n) }}
                          aria-label="Poprzednie zdjęcie"
                          className="w-9 h-9 rounded-full border border-cream/30 text-cream hover:bg-cream/10 flex items-center justify-center">
                    <IconChevL size={16} />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); setOpen((o) => (o + 1) % n) }}
                          aria-label="Następne zdjęcie"
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
