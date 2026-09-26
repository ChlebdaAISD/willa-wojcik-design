import { useState } from 'react'
import { Link } from 'wouter'
import { SITE } from '../../data/site.js'
import { IconArrow, IconMapPin } from '../Icons.jsx'

// Mapa Google ładowana dopiero po kliknięciu. Osadzona mapa zapisuje pliki cookie
// Google, a na to potrzebna jest zgoda odwiedzającego (Prawo komunikacji
// elektronicznej, art. 399). Do kliknięcia strona nie łączy się z Google,
// dlatego nie potrzebuje baneru cookies.
// Bez klucza API (VITE_GOOGLE_MAPS_EMBED_KEY) karta zostaje z samym linkiem do Map.
// Reużywana: home Location + Kontakt.
export function MapEmbed({ aspect = 'aspect-[4/3]', zoom = 14, className = '' }) {
  const mapsKey = import.meta.env.VITE_GOOGLE_MAPS_EMBED_KEY
  const [loaded, setLoaded] = useState(false)

  if (mapsKey && loaded) {
    return (
      <>
        <div className={`rounded-sm overflow-hidden ${aspect} relative border border-charcoal/10 ${className}`}>
          <iframe
            title="Mapa — Willa Wójcik, Sromowce Niżne"
            src={`https://www.google.com/maps/embed/v1/place?key=${mapsKey}&q=${SITE.mapsEmbedQuery}&zoom=${zoom}`}
            className="absolute inset-0 w-full h-full"
            style={{ border: 0 }}
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
        <a href={SITE.mapsLink} target="_blank" rel="noopener noreferrer"
           className="mt-4 inline-flex items-center gap-2 text-charcoal/70 text-[13px] hover:text-forest transition-colors">
          {SITE.street}, {SITE.postal} {SITE.city} — otwórz w Google Maps
          <IconArrow size={13} />
        </a>
      </>
    )
  }

  // Karta: na telefonie sama minimalna wysokość, proporcje dopiero od md. aspect-ratio
  // razem z min-height przelicza minimalną wysokość na szerokość i karta wychodzi poza ekran.
  // Pełne nazwy klas (nie składane z prefiksu), żeby Tailwind je wygenerował.
  const cardAspect = { 'aspect-[4/3]': 'md:aspect-[4/3]', 'aspect-[16/9]': 'md:aspect-[16/9]' }[aspect] || ''
  return (
    <div className={`relative flex flex-col items-start justify-between gap-8 rounded-sm overflow-hidden min-h-[360px] md:min-h-0 ${cardAspect} bg-forest text-cream p-8 ${className}`}>
      <div className="absolute inset-0 grain opacity-50 pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(184,134,75,0.25), transparent 70%)' }} />
      <div className="relative">
        <IconMapPin size={30} stroke={1.2} className="text-gold" />
        <div className="mt-5 font-serif text-3xl leading-tight">{SITE.street}</div>
        <div className="text-cream/70 text-[15px] mt-1">{SITE.postal} {SITE.city}</div>
        <div className="text-cream/70 text-[13px] mt-0.5">{SITE.region}</div>
      </div>
      <div className="relative w-full">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {mapsKey && (
            <button type="button" onClick={() => setLoaded(true)}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-cream text-forest text-[14px] font-semibold whitespace-nowrap shrink-0 hover:bg-white transition-colors">
              Pokaż mapę
              <IconArrow size={14} />
            </button>
          )}
          <a href={SITE.mapsLink} target="_blank" rel="noopener noreferrer"
             className="group inline-flex items-center gap-2 text-[14px] font-semibold tracking-wide border-b border-gold/60 pb-1 hover:border-gold transition-colors">
            Otwórz w Google Maps
            <IconArrow size={14} className="transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
        {mapsKey && (
          <p className="mt-4 text-cream/70 text-[12.5px] leading-snug max-w-sm">
            Mapa ładuje się z serwerów Google, które mogą zapisać pliki cookie.
            Szczegóły w <Link href="/polityka-prywatnosci" className="underline underline-offset-2 hover:text-cream">polityce prywatności</Link>.
          </p>
        )}
      </div>
    </div>
  )
}
