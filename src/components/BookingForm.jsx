import { useState } from 'react'
import { IconArrow, IconArrowUp, IconCheck, IconGlobe, IconMail, IconMapPin, IconPhone } from './Icons.jsx'

export function BookingForm() {
  const [f, setF] = useState({
    name: '', email: '', phone: '',
    arrive: '', depart: '',
    guests: 2, type: 'Apartament',
    message: ''
  })
  const [sent, setSent] = useState(false)
  const onSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4500)
  }
  const fld = (label, children) => (
    <label className="block">
      <span className="eyebrow text-charcoal/55 mb-2 block">{label}</span>
      {children}
    </label>
  )
  const inp = "w-full bg-transparent border-b border-charcoal/25 focus:border-forest outline-none pb-3 text-charcoal text-[15px] placeholder:text-charcoal/35 transition-colors"

  return (
    <section id="kontakt" data-screen-label="09 Rezerwacja" className="relative bg-cream py-24 md:py-40">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20">
          <div className="lg:col-span-7 reveal">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-gold"></span>
              <span className="eyebrow text-charcoal/60">Rezerwacja</span>
            </div>
            <h2 className="font-serif text-charcoal leading-[1.05]"
                style={{ fontSize: 'clamp(36px, 4.6vw, 62px)', fontWeight: 450 }}>
              Zapraszamy<br/><span className="italic font-[380]">w Pieniny</span>.
            </h2>
            <p className="mt-6 text-charcoal/70 text-[17px] leading-[1.8] max-w-xl text-pretty">
              Prosimy o kontakt — odpowiemy tego samego dnia. Potwierdzenie po wpłacie zaliczki,
              pozostała kwota płatna w dniu przyjazdu.
            </p>

            <form onSubmit={onSubmit} className="mt-14 space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                {fld('Imię i nazwisko',
                  <input required className={inp} placeholder="Jan Kowalski"
                         value={f.name} onChange={e => setF({...f, name: e.target.value})} />)}
                {fld('E-mail',
                  <input type="email" required className={inp} placeholder="jan@example.com"
                         value={f.email} onChange={e => setF({...f, email: e.target.value})} />)}
                {fld('Telefon',
                  <input className={inp} placeholder="+48 600 000 000"
                         value={f.phone} onChange={e => setF({...f, phone: e.target.value})} />)}
                {fld('Typ zakwaterowania',
                  <select className={inp + ' appearance-none'}
                          value={f.type} onChange={e => setF({...f, type: e.target.value})}>
                    <option>Apartament 4–5 os.</option>
                    <option>Pokój 2–3 os.</option>
                    <option>Nie wiem jeszcze</option>
                  </select>)}
                {fld('Przyjazd',
                  <input type="date" className={inp}
                         value={f.arrive} onChange={e => setF({...f, arrive: e.target.value})} />)}
                {fld('Wyjazd',
                  <input type="date" className={inp}
                         value={f.depart} onChange={e => setF({...f, depart: e.target.value})} />)}
              </div>

              {fld('Liczba gości: ' + f.guests,
                <div className="flex items-center gap-4 pt-1">
                  <input type="range" min="1" max="6" value={f.guests}
                         onChange={e => setF({...f, guests: +e.target.value})}
                         className="flex-1 accent-forest" />
                  <div className="flex gap-1.5">
                    {Array.from({length: 6}).map((_, k) => (
                      <div key={k} className={`w-2 h-2 rounded-full ${k < f.guests ? 'bg-forest' : 'bg-charcoal/15'}`} />
                    ))}
                  </div>
                </div>)}

              {fld('Wiadomość',
                <textarea rows="3" className={inp + ' resize-none'} placeholder="Coś, o czym powinniśmy wiedzieć?"
                          value={f.message} onChange={e => setF({...f, message: e.target.value})} />)}

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pt-4">
                <button type="submit"
                        className="btn-prim inline-flex items-center gap-3 px-8 py-4 rounded-full text-[14px] tracking-wide whitespace-nowrap shrink-0">
                  {sent ? 'Dziękujemy — odezwiemy się!' : 'Wyślij zapytanie'}
                  {!sent && <IconArrow size={16} />}
                  {sent && <IconCheck size={16} />}
                </button>
                <div className="text-charcoal/55 text-[13px]">
                  Płatność w dniu przyjazdu · Pobyt bez prowizji
                </div>
              </div>
            </form>
          </div>

          <aside className="lg:col-span-5 lg:col-start-8 reveal-lg">
            <div className="bg-forest text-cream p-8 md:p-10 rounded-sm relative overflow-hidden">
              <div className="absolute inset-0 grain opacity-50 pointer-events-none"/>
              <div className="relative">
                <div className="eyebrow text-cream/60 mb-6">Dane kontaktowe</div>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <IconMapPin size={20} stroke={1.3} className="mt-0.5 text-gold shrink-0" />
                    <div>
                      <div className="text-cream text-[15px]">ul. Pod Brzegami 18</div>
                      <div className="text-cream/65 text-[14px]">34-443 Sromowce Niżne, Polska</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <IconPhone size={20} stroke={1.3} className="mt-0.5 text-gold shrink-0" />
                    <div>
                      <div className="text-cream text-[15px]">+48 604 12 34 56</div>
                      <div className="text-cream/65 text-[14px]">Pn–Nd · 8:00–21:00</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <IconMail size={20} stroke={1.3} className="mt-0.5 text-gold shrink-0" />
                    <div>
                      <div className="text-cream text-[15px]">rezerwacja@willawojcik.pl</div>
                      <div className="text-cream/65 text-[14px]">Odpowiadamy tego samego dnia</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <IconGlobe size={20} stroke={1.3} className="mt-0.5 text-gold shrink-0" />
                    <div>
                      <div className="text-cream text-[15px]">Polski · English</div>
                      <div className="text-cream/65 text-[14px]">Mówimy również po czesku</div>
                    </div>
                  </li>
                </ul>

                <div className="hairline-cream my-8"></div>

                <div className="space-y-3">
                  <a href="#" className="flex items-center justify-between p-4 rounded-sm bg-cream/5 hover:bg-cream/10 transition-colors border border-cream/10">
                    <div>
                      <div className="eyebrow text-cream/60 text-[10px]">Rezerwuj bezpośrednio</div>
                      <div className="text-cream text-[15px] mt-0.5">Booking.com · 9.6 / 10</div>
                    </div>
                    <IconArrowUp size={18} className="text-gold" />
                  </a>
                  <div className="flex items-center gap-3 pt-2">
                    <div className="text-cream/55 text-[12px]">Check-in</div>
                    <div className="text-cream text-[13px]">15:00</div>
                    <div className="w-px h-4 bg-cream/20"></div>
                    <div className="text-cream/55 text-[12px]">Check-out</div>
                    <div className="text-cream text-[13px]">10:00</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-charcoal/55 text-[13px] leading-relaxed">
              Zaliczka 30% w terminie 3 dni od potwierdzenia.
              Bezpłatne anulowanie do 7 dni przed przyjazdem.
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
