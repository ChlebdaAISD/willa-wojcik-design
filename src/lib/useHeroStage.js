import { useEffect, useState } from 'react'

// Choreografia wejścia hero: klasa .on odpala przejścia .hero-el / .hero-photo
// (style w index.css pod html[data-anim]). Wspólny dla Hero (home) i PageHero.
export function useHeroStage() {
  const [on, setOn] = useState(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => setOn(true))
    return () => cancelAnimationFrame(id)
  }, [])
  return on
}
