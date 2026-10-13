import { Link } from 'wouter'
import { Container } from '../components/ui/Container.jsx'
import { Breadcrumbs } from '../components/ui/Breadcrumbs.jsx'
import { Button } from '../components/ui/Button.jsx'
import { ReservationWidget } from '../components/ReservationWidget.jsx'
import { IconPhone } from '../components/Icons.jsx'
import { SITE } from '../data/site.js'

// Rezerwacja online — widżet RoomAdmin (od 13.10.2026).
//
// Świadomie BEZ dużego PageHero z ilustracją: kto tu wchodzi, już się zdecydował
// i chce zobaczyć wolne terminy, a hero na 60% wysokości ekranu spychało widżet
// pod zgięcie na telefonie. Jasna góra strony = Nav ma ciemne napisy od początku
// (patrz `lightHero` w Nav.jsx).
//
// Fakty w tej sekcji pochodzą z site.js (doba ustawiona 13.10.2026 według warunków
// widżetu: zameldowanie 14:00–23:30) i z warunków rezerwacji w samym widżecie
// (30% przelewem, reszta na miejscu). Przy zmianie warunków w panelu RoomAdmin
// poprawić też tutaj.
const facts = [
  ['Zameldowanie', SITE.checkIn],
  ['Wymeldowanie', SITE.checkOut],
  ['Płatność', '30% przedpłaty, reszta na miejscu'],
  ['Opłata miejscowa', SITE.localFee],
]

const steps = [
  ['Termin i liczba osób', 'Wyszukiwarka pokazuje tylko pokoje i apartamenty wolne w wybranym terminie, z ceną za cały pobyt.'],
  ['Wybór i dane', 'Wybierają Państwo pokój lub apartament i wariant ceny, a potem wpisują dane osoby rezerwującej.'],
  ['Potwierdzenie', 'Dane do przelewu 30% przedpłaty przychodzą w potwierdzeniu rezerwacji. Resztę płacą Państwo w dniu przyjazdu.'],
]

export default function Rezerwacja() {
  return (
    <>
      <section className="relative bg-cream pt-32 md:pt-40 pb-10 md:pb-14">
        <Container>
          <Breadcrumbs tone="dark" className="mb-8"
                       items={[{ label: 'Strona główna', href: '/' }, { label: 'Rezerwacja' }]} />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
            <div className="lg:col-span-7">
              <h1 className="font-serif text-charcoal leading-[1.02] text-balance"
                  style={{ fontSize: 'clamp(40px, 5.4vw, 76px)', fontWeight: 500 }}>
                Rezerwacja online <span className="italic font-normal text-forest">w Willi Wójcik</span>
              </h1>
              <p className="mt-6 text-charcoal/70 text-[17px] leading-[1.8] max-w-xl text-pretty">
                Wolne terminy i ceny widać od razu, a rezerwacja trafia prosto do nas, bez prowizji portali.
                Wystarczy wybrać daty przyjazdu i wyjazdu oraz liczbę osób.
              </p>
            </div>
            <dl className="lg:col-span-5 grid grid-cols-2 gap-x-8 gap-y-6 pt-8 lg:pt-0 border-t lg:border-t-0 lg:border-l border-charcoal/10 lg:pl-10">
              {facts.map(([k, v]) => (
                <div key={k}>
                  <dt className="eyebrow text-charcoal/70 mb-1.5">{k}</dt>
                  <dd className="text-charcoal/85 text-[15px] leading-snug">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      <section className="relative bg-cream pb-20 md:pb-28" aria-label="Wyszukiwarka wolnych terminów">
        <Container>
          {/* 1200 px, nie mniej: widżet stoi na Bootstrapie 3 i dopiero od tej szerokości
              ramki rozkłada treść na 1170 px — przy węższej zostawiał po bokach puste pasy. */}
          <div className="max-w-[1200px] mx-auto">
            <ReservationWidget />
          </div>
        </Container>
      </section>

      <section className="relative bg-cream-2 py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-px bg-gold" />
                <span className="eyebrow text-charcoal/70">Jak wygląda rezerwacja</span>
              </div>
              <ol className="space-y-8">
                {steps.map(([title, text], i) => (
                  <li key={title} className="grid grid-cols-[44px_1fr] gap-4">
                    <span className="font-serif text-gold-3 leading-none" style={{ fontSize: 34, fontWeight: 500 }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h2 className="font-serif text-charcoal text-[24px] leading-tight" style={{ fontWeight: 500 }}>{title}</h2>
                      <p className="mt-2 text-charcoal/70 text-[15px] leading-[1.75] max-w-lg">{text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <aside className="lg:col-span-5">
              <div className="bg-forest text-cream p-8 md:p-10 rounded-sm relative overflow-hidden">
                <div className="absolute inset-0 grain opacity-50 pointer-events-none" />
                <div className="relative">
                  <h2 className="font-serif text-cream leading-[1.1]" style={{ fontSize: 'clamp(26px, 2.6vw, 34px)', fontWeight: 500 }}>
                    Wolą Państwo <span className="italic font-normal">zapytać</span>?
                  </h2>
                  <p className="mt-4 text-cream/75 text-[15px] leading-[1.7]">
                    Przy dłuższym pobycie, większej grupie albo nietypowej prośbie najlepiej zadzwonić
                    lub wysłać zapytanie. Odpowiadamy zwykle tego samego dnia.
                  </p>
                  <div className="mt-8 flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3">
                    <Button href={SITE.phoneHref} variant="cream" size="sm" icon={<IconPhone size={15} />}>
                      {SITE.phone}
                    </Button>
                    <Button href="/kontakt" variant="ghost" size="sm">Formularz zapytania</Button>
                  </div>
                </div>
              </div>
              <p className="mt-6 text-charcoal/65 text-[13px] leading-relaxed">
                Rezerwacje obsługuje system RoomAdmin. Zasady przetwarzania danych opisuje{' '}
                <Link href="/polityka-prywatnosci" className="underline underline-offset-2 hover:text-forest">polityka prywatności</Link>.
              </p>
            </aside>
          </div>
        </Container>
      </section>
    </>
  )
}
