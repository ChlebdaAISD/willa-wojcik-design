import { Link } from 'wouter'
import { PageHero } from '../components/ui/PageHero.jsx'
import { Container } from '../components/ui/Container.jsx'
import { SITE } from '../data/site.js'

// Regulamin świadczenia usług drogą elektroniczną (art. 8 ustawy o świadczeniu usług
// drogą elektroniczną) + ogólne zasady rezerwacji. Warunki rezygnacji i zwrotu
// przedpłaty celowo NIE są tu opisane — właściciele ustalają je przy potwierdzeniu,
// a przy rezerwacji online obowiązują warunki pokazane w widżecie RoomAdmin.
function H2({ children }) {
  return <h2 className="font-serif text-charcoal text-2xl md:text-3xl leading-tight mt-12 mb-4" style={{ fontWeight: 500 }}>{children}</h2>
}

function P({ children }) {
  return <p className="text-charcoal/75 text-[16px] leading-[1.8] mb-4 text-pretty">{children}</p>
}

function LI({ children }) {
  return (
    <li className="text-charcoal/75 text-[15.5px] leading-relaxed mb-2.5 pl-5 relative">
      <span className="absolute left-0 top-[0.6em] w-1.5 h-1.5 bg-gold rotate-45" />
      {children}
    </li>
  )
}

const link = 'text-gold-3 underline underline-offset-2'

export default function Regulamin() {
  return (
    <>
      <PageHero
        title="Regulamin"
        crumbs={[{ label: 'Strona główna', href: '/' }, { label: 'Regulamin' }]}
      />

      <section className="relative bg-cream py-16 md:py-24">
        <Container>
          <div className="max-w-3xl">
            <P>Obowiązuje od 13 października 2026 roku.</P>

            <H2>1. Usługodawca</H2>
            <P>
              Stronę willawojcik.pl prowadzi {SITE.owner.name}, {SITE.street}, {SITE.postal} {SITE.city},
              NIP {SITE.owner.nip}, REGON {SITE.owner.regon}, właścicielka Willi Wójcik.
              Kontakt: telefon <a className={link} href={SITE.phoneHref}>{SITE.phone}</a>,
              e-mail <a className={link} href={SITE.emailHref}>{SITE.email}</a>.
            </P>
            <P>
              Regulamin opisuje zasady korzystania ze strony, rezerwacji online i formularza
              zapytania o termin oraz ogólne zasady rezerwacji pobytu.
            </P>

            <H2>2. Co oferuje strona</H2>
            <P>Za pośrednictwem strony świadczymy nieodpłatnie trzy usługi:</P>
            <ul className="mb-4">
              <LI>przeglądanie informacji o obiekcie, cenach i okolicy,</LI>
              <LI>sprawdzenie wolnych terminów i rezerwację online w systemie RoomAdmin,</LI>
              <LI>wysłanie zapytania o wolny termin przez formularz.</LI>
            </ul>
            <P>
              Do korzystania ze strony wystarczy urządzenie z dostępem do internetu i aktualna
              przeglądarka. Wysłanie formularza wymaga włączonej obsługi JavaScriptu i podania
              adresu e-mail. Rezerwacja online wymaga też obsługi JavaScriptu i plików cookie, bo system
              RoomAdmin zapamiętuje w nich kolejne kroki rezerwacji. Zabronione jest przesyłanie
              treści bezprawnych.
            </P>
            <P>
              Umowa o przeglądanie strony trwa od wejścia na stronę do jej opuszczenia. Umowa
              o skorzystanie z formularza zostaje zawarta z chwilą wysłania zapytania i wygasa
              z chwilą udzielenia odpowiedzi. Z formularza można w każdej chwili zrezygnować,
              po prostu go nie wysyłając. Umowa o pobyt przy rezerwacji online zostaje zawarta
              w systemie RoomAdmin, na warunkach pokazanych w formularzu rezerwacji.
            </P>

            <H2>3. Zapytanie i rezerwacja</H2>
            <ul className="mb-4">
              <LI>Pobyt można zarezerwować online na stronie „Rezerwacja” (system RoomAdmin) albo wysłać zapytanie przez formularz kontaktowy.</LI>
              <LI>Przy rezerwacji online cenę pobytu, wysokość i termin przedpłaty oraz warunki rezygnacji widać w formularzu rezerwacji przed jej złożeniem. Obowiązują warunki zaakceptowane w tym formularzu.</LI>
              <LI>Wysłanie formularza kontaktowego jest zapytaniem o dostępność, a nie rezerwacją.</LI>
              <LI>Odpowiadamy telefonicznie albo e-mailem, zwykle tego samego dnia, z informacją o dostępności i cenie pobytu.</LI>
              <LI><strong className="text-charcoal">Rezerwację potwierdza przedpłata w wysokości 30% wartości pobytu.</strong> Termin wpłaty i dane do przelewu podajemy w odpowiedzi na zapytanie.</LI>
              <LI>Pozostałą kwotę płacą Państwo w dniu przyjazdu.</LI>
              <LI>Warunki rezygnacji z pobytu i zwrotu przedpłaty ustalamy przy potwierdzeniu rezerwacji.</LI>
            </ul>
            <P>
              Ceny „od” na stronie to stawki wyjściowe za dobę za cały pokój lub apartament. Cenę pobytu
              w wybranym terminie pokazuje rezerwacja online albo podajemy ją w odpowiedzi na zapytanie.
              Ceny nie obejmują opłaty miejscowej (punkt 4).
            </P>
            <P>
              Prawo odstąpienia od umowy zawartej na odległość nie przysługuje przy usługach
              zakwaterowania, w których wskazano dzień lub okres pobytu
              (art. 38 ust. 1 pkt 12 ustawy o prawach konsumenta).
            </P>

            <H2>4. Pobyt</H2>
            <ul className="mb-4">
              <LI>Zameldowanie w godzinach {SITE.checkIn}, wymeldowanie {SITE.checkOut}.</LI>
              <LI>Obiekt jest w całości dla niepalących. Nie przyjmujemy zwierząt.</LI>
              <LI>
                Do ceny pobytu doliczamy opłatę miejscową: {SITE.localFee}, zgodnie z uchwałą
                Rady Gminy Czorsztyn nr XII/102/2025. Opłatę pobieramy na miejscu i przekazujemy
                gminie. Zwolnienia określa <a className={link} href={SITE.localFeeSource} target="_blank" rel="noopener noreferrer">uchwała gminy</a>.
              </LI>
            </ul>

            <H2>5. Reklamacje</H2>
            <P>
              Reklamacje dotyczące działania strony lub pobytu prosimy zgłaszać e-mailem na
              {' '}<a className={link} href={SITE.emailHref}>{SITE.email}</a> albo telefonicznie.
              Odpowiadamy w ciągu 14 dni. Konsument może też skorzystać z bezpłatnej pomocy
              miejskiego lub powiatowego rzecznika konsumentów.
            </P>

            <H2>6. Dane osobowe</H2>
            <P>
              Zasady przetwarzania danych z formularza opisuje{' '}
              <Link className={link} href="/polityka-prywatnosci">polityka prywatności</Link>.
            </P>

            <H2>7. Postanowienia końcowe</H2>
            <P>
              Regulamin jest dostępny bezpłatnie na tej stronie. Można go zapisać lub wydrukować.
              Zmiana regulaminu nie dotyczy rezerwacji potwierdzonych przed jej wprowadzeniem.
            </P>
          </div>
        </Container>
      </section>
    </>
  )
}
