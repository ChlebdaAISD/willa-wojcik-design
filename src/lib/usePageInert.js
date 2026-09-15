import { useEffect } from 'react'

// Wycisza resztę strony, gdy otwarty jest modal (menu mobilne, lightbox galerii).
//
// Samo `role="dialog" aria-modal="true"` NIE wystarcza: blokuje interakcję myszą
// i pułapka fokusu zatrzymuje Tab, ale czytnik ekranu w trybie przeglądania
// (wirtualny kursor VoiceOver/NVDA) nadal odczytuje treść schowaną pod overlayem.
// Dopiero `inert` usuwa te elementy z drzewa dostępności.
//
// Sięgamy po DOM zamiast przenosić stan do App.jsx, bo oba modale leżą głęboko
// w drzewie i zarządzają swoim stanem samodzielnie. Warunek: sam modal musi być
// POZA tymi elementami — menu mobilne jest rodzeństwem <header>, a lightbox
// renderuje się przez portal do <body>.
export function usePageInert(active) {
  useEffect(() => {
    if (!active || typeof document === 'undefined') return
    const targets = ['header', '#tresc', 'footer']
      .map((sel) => document.querySelector(sel))
      .filter(Boolean)
    targets.forEach((el) => { el.inert = true })
    return () => targets.forEach((el) => { el.inert = false })
  }, [active])
}
