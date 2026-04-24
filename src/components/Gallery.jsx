import { useEffect, useRef, useState } from 'react'
import { PHOTOS } from '../data/content.js'
import { IconChevL, IconChevR, IconClose } from './Icons.jsx'

export function Gallery() {
  const [open, setOpen] = useState(null)
  const [touchStartX, setTouchStartX] = useState(null)
  const swipedRef = useRef(false)
  const photos = [
    { src: PHOTOS.roomBirch, label: 'Pokój brzozowy · 2 os.', span: 'row-span-2 col-span-2' },
    { src: PHOTOS.livingRoom, label: 'Salon apartamentu' },
    { src: PHOTOS.balconyView, label: 'Widok z balkonu' },
    { src: PHOTOS.kitchen, label: 'Aneks kuchenny', span: 'row-span-1 col-span-2' },
    { src: PHOTOS.bathroom, label: 'Łazienka' },
    { src: PHOTOS.buildingDusk, label: 'Obiekt o zmierzchu' },
    { src: PHOTOS.garden, label: 'Ogród i altana', span: 'row-span-2 col-span-1' },
    { src: PHOTOS.terrace, label: 'Taras wspólny' },
    { src: PHOTOS.apartment, label: 'Apartament rodzinny' },
    { src: PHOTOS.livingRoom2, label: 'Strefa wypoczynkowa' },
    { src: PHOTOS.buildingWinter, label: 'Willa zimą' },
  ]

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(null)
      if (open !== null) {
        if (e.key === 'ArrowRight') setOpen((o) => (o + 1) % photos.length)
        if (e.key === 'ArrowLeft') setOpen((o) => (o - 1 + photos.length) % photos.length)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, photos.length])

  const onTouchStart = (e) => setTouchStartX(e.touches[0].clientX)
  const onTouchEnd = (e) => {
    if (touchStartX === null) return
    const dx = e.changedTouches[0].clientX - touchStartX
    if (Math.abs(dx) > 60) {
      swipedRef.current = true
      if (dx < 0) setOpen((o) => (o + 1) % photos.length)
      else setOpen((o) => (o - 1 + photos.length) % photos.length)
    }
    setTouchStartX(null)
  }

  return (
    <section id="galeria" data-screen-label="06 Galeria" className="relative bg-charcoal text-cream py-24 md:py-40">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
          <div className="reveal max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-gold"></span>
              <span className="eyebrow text-cream/60">Galeria</span>
            </div>
            <h2 className="font-serif text-cream leading-[1.05]"
                style={{ fontSize: 'clamp(36px, 4.6vw, 62px)', fontWeight: 450 }}>
              Willa <span className="italic font-[380]">w obrazach</span>.
            </h2>
          </div>
          <div className="reveal eyebrow text-cream/50">
            {photos.length} zdjęć · kliknij, aby powiększyć
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-3">
          {photos.map((p, i) => (
            <button key={i}
                    onClick={() => setOpen(i)}
                    className={`reveal relative group overflow-hidden cursor-plus ${p.span || ''}`}
                    style={{ transitionDelay: `${(i % 4) * 60}ms` }}>
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[1200ms] group-hover:scale-110"
                   style={{ backgroundImage: `url(${p.src})` }} />
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/30 transition-colors duration-500" />
              <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                <div className="eyebrow text-cream/80 text-[10px]">0{i + 1}</div>
                <div className="font-serif text-cream text-lg leading-tight mt-1">{p.label}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {open !== null && (
        <div className="fixed inset-0 z-[100] bg-charcoal/95 backdrop-blur-md flex items-center justify-center p-6"
             onClick={() => {
               if (swipedRef.current) { swipedRef.current = false; return }
               setOpen(null)
             }}
             onTouchStart={onTouchStart}
             onTouchEnd={onTouchEnd}>
          <button onClick={(e) => { e.stopPropagation(); setOpen(null) }}
                  className="absolute top-6 right-6 w-11 h-11 rounded-full border border-cream/30 text-cream hover:bg-cream/10 flex items-center justify-center">
            <IconClose size={18} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); setOpen((o) => (o - 1 + photos.length) % photos.length) }}
                  className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-cream/30 text-cream hover:bg-cream/10 flex items-center justify-center">
            <IconChevL size={20} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); setOpen((o) => (o + 1) % photos.length) }}
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-cream/30 text-cream hover:bg-cream/10 flex items-center justify-center">
            <IconChevR size={20} />
          </button>
          <figure className="max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full" style={{ aspectRatio: '16/10' }}>
              <div className="absolute inset-0 bg-cover bg-center"
                   style={{ backgroundImage: `url(${photos[open].src})` }} />
            </div>
            <figcaption className="mt-5 flex items-center justify-between">
              <div className="font-serif text-cream text-xl">{photos[open].label}</div>
              <div className="eyebrow text-cream/50">
                {String(open + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
              </div>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  )
}
