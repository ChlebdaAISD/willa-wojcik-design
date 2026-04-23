import { useEffect } from 'react'

export function useMagnetic(ref, strength = 14) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const mx = e.clientX - r.left
      const my = e.clientY - r.top
      const dx = (mx - r.width / 2) / (r.width / 2)
      const dy = (my - r.height / 2) / (r.height / 2)
      el.style.transform = `translate(${dx * strength}px, ${dy * strength - 2}px)`
      el.style.setProperty('--mx', `${mx}px`)
      el.style.setProperty('--my', `${my}px`)
    }
    const onLeave = () => { el.style.transform = '' }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [ref, strength])
}
