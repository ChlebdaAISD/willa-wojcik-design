// Nadtytuł: złota kreska + etykieta wersalikami. tone: 'dark' (ciemny tekst) / 'light' (jasny).
// Konwencja z home: etykieta z numerem sekcji, np. "01 — O obiekcie".
export function Eyebrow({ children, tone = 'dark', className = '' }) {
  const color = tone === 'light' ? 'text-cream/75' : 'text-charcoal/70'
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="w-8 h-px bg-gold shrink-0" />
      <span className={`eyebrow ${color}`}>{children}</span>
    </div>
  )
}
