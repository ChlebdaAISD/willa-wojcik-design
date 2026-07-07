// Nadtytuł: złota kreska + etykieta wersalikami. tone: 'dark' (ciemny tekst) / 'light' (jasny).
export function Eyebrow({ children, tone = 'dark', className = '' }) {
  const color = tone === 'light' ? 'text-cream/70' : 'text-charcoal/60'
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="w-8 h-px bg-gold shrink-0" />
      <span className={`eyebrow ${color}`}>{children}</span>
    </div>
  )
}
