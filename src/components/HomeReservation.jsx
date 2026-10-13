import { Link } from 'wouter'
import { SITE } from '../data/site.js'
import { ContactAside } from './BookingForm.jsx'
import { StayPicker } from './StayPicker.jsx'

// Ostatnia sekcja strony głównej. Do 13.10.2026 stał tu formularz zapytania (n8n → mail);
// od kiedy obiekt ma system rezerwacji RoomAdmin, gość wybiera termin tutaj i trafia
// na /rezerwacja z gotową listą wolnych pokoi. Formularz zapytania został na /kontakt.
export function HomeReservation() {
  return (
    <section id="rezerwacja" data-screen-label="09 Rezerwacja" className="relative bg-cream scroll-mt-24 py-24 md:py-40">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20">
          <div className="lg:col-span-7 reveal">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-gold"></span>
              <span className="eyebrow text-charcoal/70">07 — Rezerwacja</span>
            </div>
            <h2 className="font-serif text-charcoal leading-[1.05]"
                style={{ fontSize: 'clamp(36px, 4.6vw, 62px)', fontWeight: 500 }}>
              Zapraszamy<br/><span className="italic font-normal">w Pieniny</span>.
            </h2>
            <p className="mt-6 text-charcoal/70 text-[17px] leading-[1.8] max-w-xl text-pretty">
              Wolne terminy i ceny sprawdzą Państwo od ręki. Rezerwacja trafia prosto do nas,
              bez prowizji portali.
            </p>

            <StayPicker className="mt-12 md:mt-14" />

            <p className="mt-10 pt-8 border-t border-charcoal/10 text-charcoal/70 text-[14px] leading-relaxed max-w-xl">
              Wolą Państwo najpierw zapytać? Prosimy o telefon pod numer{' '}
              <a href={SITE.phoneHref} className="text-forest font-semibold whitespace-nowrap hover:underline underline-offset-4">{SITE.phone}</a>
              {' '}albo wiadomość przez{' '}
              <Link href="/kontakt" className="text-forest font-semibold underline underline-offset-4 decoration-gold hover:decoration-forest">formularz zapytania</Link>.
            </p>
          </div>

          <aside className="lg:col-span-5 lg:col-start-8 reveal-lg">
            <ContactAside />
            <div className="mt-6 text-charcoal/70 text-[13px] leading-relaxed">
              Rezerwację potwierdza przedpłata 30% wartości pobytu, resztę płacą Państwo w dniu przyjazdu.
              Opłatę miejscową, {SITE.localFee}, pobieramy na miejscu.
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
