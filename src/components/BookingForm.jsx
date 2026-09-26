import { useEffect, useRef, useState } from 'react'
import { IconArrow, IconCheck, IconGlobe, IconMail, IconMapPin, IconPhone } from './Icons.jsx'
import { Link } from 'wouter'
import { SITE } from '../data/site.js'

const WEBHOOK_URL = import.meta.env.VITE_WILLA_WEBHOOK
const WEBHOOK_HEADER = import.meta.env.VITE_WILLA_WEBHOOK_HEADER
const WEBHOOK_TOKEN = import.meta.env.VITE_WILLA_WEBHOOK_TOKEN

export function BookingForm({ eyebrow = '07 — Rezerwacja' }) {
  const [f, setF] = useState({
    name: '', email: '', phone: '',
    arrive: '', depart: '',
    guests: 2, type: 'Apartament 4–6 os.',
    message: ''
  })
  const [status, setStatus] = useState('idle')
  const sentTimerRef = useRef(null)
  const today = new Date().toISOString().slice(0, 10)

  useEffect(() => () => clearTimeout(sentTimerRef.current), [])

  // POST na webhook n8n → Resend wysyła dwa maile: powiadomienie do właściciela
  // i potwierdzenie do gościa. Wzorzec z klimaTY (autoryzacja nagłówkowa) plus
  // bramka na brak e-maila z Góralskiej Willi.
  //
  // UWAGA: samo `response.ok` NIE wystarcza. Webhook n8n potrafi oddać 2xx, mimo że
  // egzekucja workflow padła — zdarzyło się to już na tym koncie i zjadło leada.
  // Dlatego sprawdzamy jeszcze pole `success` z treści odpowiedzi.
  const onSubmit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(WEBHOOK_HEADER && WEBHOOK_TOKEN ? { [WEBHOOK_HEADER]: WEBHOOK_TOKEN } : {}),
        },
        body: JSON.stringify({
          name: f.name.trim(),
          email: f.email.trim(),
          phone: f.phone.trim(),
          arrive: f.arrive,
          depart: f.depart,
          guests: f.guests,
          type: f.type,
          message: f.message.trim(),
          source: 'willawojcik.pl',
          submittedAt: new Date().toISOString(),
        }),
      })
      if (!res.ok) throw new Error(`Webhook odpowiedział ${res.status}`)
      const data = await res.json().catch(() => null)
      if (data && data.success === false) throw new Error('Workflow zgłosił błąd')

      setStatus('sent')
      setF({ name: '', email: '', phone: '', arrive: '', depart: '', guests: 2,
             type: 'Apartament 4–6 os.', message: '' })
      clearTimeout(sentTimerRef.current)
      sentTimerRef.current = setTimeout(() => setStatus('idle'), 8000)
    } catch (err) {
      console.error('Nie udało się wysłać zapytania', err)
      setStatus('error')
      clearTimeout(sentTimerRef.current)
      sentTimerRef.current = setTimeout(() => setStatus('idle'), 8000)
    }
  }
  const fld = (label, children) => (
    <label className="block">
      <span className="eyebrow text-charcoal/70 mb-2 block">{label}</span>
      {children}
    </label>
  )
  // 16px — poniżej iOS przybliża stronę przy focusie; focus = zielony underline (box-shadow, bez skoku layoutu)
  // Pola jako wyraźne boxy (decyzja 2026-07-08): jasne wypełnienie + obrys, focus = zielona ramka.
  const inp = "w-full bg-white/70 border border-charcoal/20 rounded-sm px-4 py-3.5 text-charcoal text-[16px] placeholder:text-charcoal/65 outline-none focus:bg-white focus:border-forest focus:shadow-[0_0_0_1px_var(--color-forest)] transition-[border-color,box-shadow,background-color] caret-forest"

  return (
    <section id="kontakt" data-screen-label="09 Rezerwacja" className="relative bg-cream scroll-mt-24 py-24 md:py-40">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20">
          <div className="lg:col-span-7 reveal">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-gold"></span>
              <span className="eyebrow text-charcoal/70">{eyebrow}</span>
            </div>
            <h2 className="font-serif text-charcoal leading-[1.05]"
                style={{ fontSize: 'clamp(36px, 4.6vw, 62px)', fontWeight: 500 }}>
              Zapraszamy<br/><span className="italic font-normal">w Pieniny</span>.
            </h2>
            <p className="mt-6 text-charcoal/70 text-[17px] leading-[1.8] max-w-xl text-pretty">
              Prosimy o kontakt — odpowiemy tego samego dnia. Potwierdzenie po wpłacie zaliczki,
              pozostała kwota płatna w dniu przyjazdu.
            </p>

            <form onSubmit={onSubmit} className="mt-14 space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                {fld('Imię i nazwisko *',
                  <input required autoComplete="name" className={inp} placeholder="Jan Kowalski"
                         value={f.name} onChange={e => setF({...f, name: e.target.value})} />)}
                {fld('E-mail *',
                  <input type="email" required autoComplete="email" className={inp} placeholder="jan@example.com"
                         value={f.email} onChange={e => setF({...f, email: e.target.value})} />)}
                {fld('Telefon',
                  <input type="tel" autoComplete="tel" className={inp} placeholder="+48 600 000 000"
                         value={f.phone} onChange={e => setF({...f, phone: e.target.value})} />)}
                {fld('Typ zakwaterowania',
                  <select className={inp + ' inp-select'}
                          value={f.type} onChange={e => setF({...f, type: e.target.value})}>
                    <option>Apartament 4–6 os.</option>
                    <option>Pokój 2–3 os.</option>
                    <option>Nie wiem jeszcze</option>
                  </select>)}
                {fld('Przyjazd',
                  <input type="date" className={inp} min={today}
                         value={f.arrive} onChange={e => setF({...f, arrive: e.target.value})} />)}
                {fld('Wyjazd',
                  <input type="date" className={inp} min={f.arrive || today}
                         value={f.depart} onChange={e => setF({...f, depart: e.target.value})} />)}
              </div>

              {fld('Liczba gości: ' + f.guests,
                <div className="flex items-center gap-4 pt-1">
                  <input type="range" min="1" max="6" value={f.guests}
                         onChange={e => setF({...f, guests: +e.target.value})}
                         className="inp-range flex-1" />
                  <div className="flex gap-1.5" aria-hidden="true">
                    {Array.from({length: 6}).map((_, k) => (
                      <div key={k} className={`w-2 h-2 rounded-full transition-colors ${k < f.guests ? 'bg-forest' : 'bg-charcoal/15'}`} />
                    ))}
                  </div>
                </div>)}

              {fld('Wiadomość',
                <textarea rows="3" className={inp + ' resize-none'} placeholder="Coś, o czym powinniśmy wiedzieć?"
                          value={f.message} onChange={e => setF({...f, message: e.target.value})} />)}

              {/* Osobny region status: zmiana napisu na przycisku nie jest
                  wiarygodnie ogłaszana przez czytniki ekranu */}
              <div role="status" aria-live="polite" className="sr-only">
                {status === 'sent' && 'Zapytanie wysłane. Dziękujemy, odezwiemy się.'}
                {status === 'error' && 'Nie udało się wysłać zapytania. Prosimy o telefon.'}
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pt-4">
                <button type="submit" disabled={status === 'sending'}
                        className="btn-prim inline-flex items-center gap-3 px-8 py-4 rounded-full text-[14px] font-semibold tracking-wide whitespace-nowrap shrink-0 disabled:opacity-70">
                  {status === 'sending' && 'Wysyłamy…'}
                  {status === 'sent' && 'Dziękujemy — odezwiemy się!'}
                  {status === 'error' && 'Nie udało się wysłać'}
                  {status === 'idle' && 'Wyślij zapytanie'}
                  {status === 'sent' ? <IconCheck size={16} /> : status === 'idle' ? <IconArrow size={16} /> : null}
                </button>
                <div className="text-charcoal/70 text-[13px]">
                  {status === 'error' ? (
                    <span className="text-gold-3">
                      Coś poszło nie tak. Prosimy o telefon:{' '}
                      <a href={SITE.phoneHref} className="underline underline-offset-2">{SITE.phone}</a>
                    </span>
                  ) : 'Zaliczka 30%, reszta w dniu przyjazdu. Bez prowizji portali.'}
                </div>
              </div>

              {/* Informacja z art. 13 RODO w chwili zbierania danych. Checkbox zgody nie jest
                  potrzebny: podstawą jest odpowiedź na zapytanie (art. 6 ust. 1 lit. b i f). */}
              <p className="text-charcoal/70 text-[12.5px] leading-relaxed max-w-xl">
                Administratorem danych z formularza jest {SITE.owner.name}, właścicielka Willi Wójcik.
                Dane wykorzystamy wyłącznie do odpowiedzi na zapytanie i przygotowania rezerwacji.
                Szczegóły i Państwa prawa opisuje{' '}
                <Link href="/polityka-prywatnosci" className="underline underline-offset-2 hover:text-forest">polityka prywatności</Link>.
              </p>
            </form>
          </div>

          <aside className="lg:col-span-5 lg:col-start-8 reveal-lg">
            <div className="bg-forest text-cream p-8 md:p-10 rounded-sm relative overflow-hidden">
              <div className="absolute inset-0 grain opacity-50 pointer-events-none"/>
              <div className="relative">
                <div className="eyebrow text-cream/75 mb-6">Dane kontaktowe</div>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <IconMapPin size={20} stroke={1.3} className="mt-0.5 text-gold shrink-0" />
                    <div>
                      <div className="text-cream text-[15px]">{SITE.street}</div>
                      <div className="text-cream/75 text-[14px]">{SITE.postal} {SITE.city}, {SITE.country}</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <IconPhone size={20} stroke={1.3} className="mt-0.5 text-gold shrink-0" />
                    <div>
                      <a href={SITE.phoneHref} className="text-cream text-[15px] hover:text-gold transition-colors">{SITE.phone}</a>
                      <div className="text-cream/75 text-[14px]">Kontakt {SITE.contactHours}</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <IconMail size={20} stroke={1.3} className="mt-0.5 text-gold shrink-0" />
                    <div>
                      <a href={SITE.emailHref} className="text-cream text-[15px] hover:text-gold transition-colors">{SITE.email}</a>
                      <div className="text-cream/75 text-[14px]">Odpowiadamy tego samego dnia</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <IconGlobe size={20} stroke={1.3} className="mt-0.5 text-gold shrink-0" />
                    <div>
                      <div className="text-cream text-[15px]">Polski i angielski</div>
                      <div className="text-cream/75 text-[14px]">Mówimy również po czesku</div>
                    </div>
                  </li>
                </ul>

              </div>
            </div>

            <div className="mt-6 text-charcoal/70 text-[13px] leading-relaxed">
              Rezerwację potwierdza zaliczka 30% wartości pobytu, resztę płacą Państwo w dniu przyjazdu.
              Termin wpłaty i warunki anulowania ustalamy przy potwierdzeniu. Do ceny doliczamy
              opłatę miejscową: {SITE.localFee}.
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
