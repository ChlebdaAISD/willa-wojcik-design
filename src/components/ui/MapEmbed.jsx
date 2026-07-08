import { SITE } from '../../data/site.js'
import { IconArrow, IconMapPin } from '../Icons.jsx'

// Mapa Google z fallbackiem: bez klucza API (VITE_GOOGLE_MAPS_EMBED_KEY)
// renderuje kartę dojazdu zamiast błędu Google. Reużywana: home Location + Kontakt.
export function MapEmbed({ aspect = 'aspect-[4/3]', zoom = 14, className = '' }) {
  const mapsKey = import.meta.env.VITE_GOOGLE_MAPS_EMBED_KEY
  if (!mapsKey) {
    return (
      <a href={SITE.mapsLink} target="_blank" rel="noopener noreferrer"
         className={`group relative flex flex-col items-start justify-between rounded-sm overflow-hidden ${aspect} bg-forest text-cream p-8 ${className}`}>
        <div className="absolute inset-0 grain opacity-50 pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full"
             style={{ background: 'radial-gradient(circle, rgba(184,134,75,0.25), transparent 70%)' }} />
        <div className="relative">
          <IconMapPin size={30} stroke={1.2} className="text-gold" />
          <div className="mt-5 font-serif text-3xl leading-tight">{SITE.street}</div>
          <div className="text-cream/70 text-[15px] mt-1">{SITE.postal} {SITE.city}</div>
          <div className="text-cream/70 text-[13px] mt-0.5">{SITE.region}</div>
        </div>
        <span className="relative inline-flex items-center gap-2 text-[14px] font-semibold tracking-wide border-b border-gold/60 pb-1 group-hover:border-gold transition-colors">
          Otwórz mapę dojazdu
          <IconArrow size={14} className="transition-transform group-hover:translate-x-0.5" />
        </span>
      </a>
    )
  }
  return (
    <>
      <div className={`rounded-sm overflow-hidden ${aspect} relative border border-charcoal/10 ${className}`}>
        <iframe
          title="Mapa — Willa Wójcik, Sromowce Niżne"
          src={`https://www.google.com/maps/embed/v1/place?key=${mapsKey}&q=${SITE.mapsEmbedQuery}&zoom=${zoom}`}
          className="absolute inset-0 w-full h-full"
          style={{ border: 0 }}
          loading="lazy"
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
