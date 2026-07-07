import { Container } from './Container.jsx'

const BG = {
  cream: 'bg-cream text-charcoal',
  'cream-2': 'bg-cream-2 text-charcoal',
  stone: 'bg-stone text-charcoal',
  forest: 'bg-forest text-cream',
  charcoal: 'bg-charcoal text-cream',
}

// Standardowa sekcja: tło z palety + pionowy padding + opcjonalny Container.
export function Section({ id, bg = 'cream', py = 'py-24 md:py-36', container = true, className = '', containerClassName = '', children }) {
  return (
    <section id={id} className={`relative ${BG[bg] || BG.cream} ${py} ${className}`}>
      {container ? <Container className={containerClassName}>{children}</Container> : children}
    </section>
  )
}
