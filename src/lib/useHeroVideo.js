import { useEffect, useState } from 'react'

// Decyduje, czy hero ma odtworzyć wideo z drona, czy zostać przy statycznym kadrze.
//
// Wideo (ok. 1 MB) pobieramy TYLKO wtedy, gdy ma to sens:
//   - użytkownik nie prosił o ograniczenie animacji (prefers-reduced-motion),
//   - przeglądarka nie zgłasza trybu oszczędzania danych (Save-Data).
//
// Do 15.09.2026 wideo leciało wyłącznie od 768 px w górę, żeby nie zjadać transferu
// na telefonie. Decyzja Łukasza: na mobile też ma być ruch, statyczny kadr wyglądał
// słabo. Gate na Save-Data zostaje, więc użytkownik w trybie oszczędzania nadal
// dostaje sam plakat.
//
// ŚWIADOMY KOMPROMIS: Network Information API nie istnieje w Safari ani w żadnej
// przeglądarce na iOS (wszystkie stoją na WebKicie), więc `saveData` jest tam zawsze
// undefined i wideo pobierze się niezależnie od ustawień oszczędzania danych.
// Na iPhonie jedyną realną furtką zostaje prefers-reduced-motion.
//
// Zwraca false przy pierwszym renderze, więc prerender, wyłączony JS i czytniki
// zawsze dostają statyczny obraz — <video> dokłada się dopiero po stronie klienta.
export function useHeroVideo() {
  const [play, setPlay] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return

    const calm = window.matchMedia('(prefers-reduced-motion: reduce)')
    const saveData = navigator.connection?.saveData === true

    const decide = () => setPlay(!calm.matches && !saveData)
    decide()

    calm.addEventListener('change', decide)
    return () => calm.removeEventListener('change', decide)
  }, [])

  return play
}
