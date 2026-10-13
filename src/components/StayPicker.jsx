import { useState } from 'react'
import { useLocation } from 'wouter'
import { addDays, isoDate, MAX_DAYS_AHEAD, MAX_GUESTS, MAX_NIGHTS, nightsBetween, stayHref } from '../data/booking.js'
import { inputClass } from '../lib/formClasses.js'
import { IconArrow } from './Icons.jsx'

// 1 noc, 2–4 noce, 5–21 nocy, 22–24 noce…
function nightsLabel(n) {
  const mod10 = n % 10, mod100 = n % 100
  if (n === 1) return '1 noc'
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return `${n} noce`
  return `${n} nocy`
}

// Szybki wybór terminu w stylu strony. Nie rezerwuje niczego sam — przenosi na
// /rezerwacja z datami i liczbą osób w adresie, a widżet RoomAdmin od razu pokazuje
// tam wolne pokoje i apartamenty z cenami za cały pobyt.
//
// Działa też bez JavaScriptu: to zwykły formularz GET z tymi samymi nazwami pól,
// które czyta parseStay() w data/booking.js.
export function StayPicker({ className = '' }) {
  const [, navigate] = useLocation()
  const today = isoDate(new Date())
  const [arrival, setArrival] = useState('')
  const [departure, setDeparture] = useState('')
  const [guests, setGuests] = useState('2')
  const nights = nightsBetween(arrival, departure)

  // Po wyborze przyjazdu podpowiadamy wyjazd następnego dnia, a jeśli wyjazd był
  // już ustawiony wcześniej niż nowy przyjazd — przesuwamy go, zamiast zostawić
  // formularz w stanie, którego nie da się wysłać.
  const onArrival = (value) => {
    setArrival(value)
    if (value && (!departure || departure <= value)) setDeparture(addDays(value, 1))
  }

  // Sam wyjazd bez przyjazdu przepadłby po drodze (widżet potrzebuje obu dat),
  // więc dopowiadamy przyjazd dzień wcześniej — o ile nie wypada w przeszłości.
  const onDeparture = (value) => {
    setDeparture(value)
    if (value && !arrival) {
      const before = addDays(value, -1)
      if (before >= today) setArrival(before)
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    navigate(stayHref({ arrival, departure, guests: Number(guests) || 0 }))
  }

  const label = 'eyebrow text-charcoal/70 mb-2 block'

  return (
    <form action="/rezerwacja" method="get" onSubmit={onSubmit} className={className}>
      <div className="grid grid-cols-2 lg:grid-cols-[1fr_1fr_0.8fr] gap-x-4 md:gap-x-6 gap-y-6">
        <label className="block">
          <span className={label}>Przyjazd</span>
          {/* Te same granice co parseStay() — inaczej przeglądarka przepuściłaby termin,
              który /rezerwacja po cichu odrzuci, i widżet otworzyłby się pusty */}
          <input type="date" name="przyjazd" className={inputClass}
                 min={today} max={addDays(today, MAX_DAYS_AHEAD)}
                 value={arrival} onChange={(e) => onArrival(e.target.value)} />
        </label>
        <label className="block">
          <span className={label}>Wyjazd</span>
          <input type="date" name="wyjazd" className={inputClass}
                 min={arrival ? addDays(arrival, 1) : addDays(today, 1)}
                 max={addDays(arrival || today, MAX_NIGHTS)}
                 value={departure} onChange={(e) => onDeparture(e.target.value)} />
        </label>
        <label className="block col-span-2 lg:col-span-1">
          <span className={label}>Liczba osób</span>
          <select name="osoby" className={inputClass + ' inp-select'}
                  value={guests} onChange={(e) => setGuests(e.target.value)}>
            {Array.from({ length: MAX_GUESTS }, (_, i) => i + 1).map((n) => (
              <option key={n} value={String(n)}>{n} {n === 1 ? 'osoba' : n < 5 ? 'osoby' : 'osób'}</option>
            ))}
            {/* Bez liczby w adresie widżet sam otworzy wybór gości i pozwoli podzielić grupę na kilka pokoi */}
            <option value="">więcej niż {MAX_GUESTS}</option>
          </select>
        </label>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        <button type="submit"
                className="btn-prim inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-[14px] font-semibold tracking-wide whitespace-nowrap text-cream">
          Sprawdź wolne terminy
          <IconArrow size={16} />
        </button>
        <p className="text-charcoal/70 text-[13px]">
          <span aria-live="polite">
            {nights > 0 && <>Pobyt: <strong className="text-charcoal font-semibold">{nightsLabel(nights)}</strong>. </>}
          </span>
          Pokażemy wolne pokoje i apartamenty z ceną za cały pobyt.
        </p>
      </div>
    </form>
  )
}
