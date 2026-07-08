import { PageHero } from '../components/ui/PageHero.jsx'
import { Container } from '../components/ui/Container.jsx'
import { SITE } from '../data/site.js'

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

export default function PolitykaPrywatnosci() {
  return (
    <>
      <PageHero
        title="Polityka prywatności"
        subtitle="Kto przetwarza Państwa dane, w jakim celu i na jakiej podstawie. Ostatnia aktualizacja: 7 lipca 2026."
        crumbs={[{ label: 'Strona główna', href: '/' }, { label: 'Polityka prywatności' }]}
      />

      <section className="relative bg-cream py-16 md:py-24">
        <Container>
          <div className="max-w-3xl">
            <H2>1. Administrator danych</H2>
            <P>
              Administratorem Państwa danych osobowych jest Willa Wójcik — Apartamenty i Pokoje,
              {' '}{SITE.street}, {SITE.postal} {SITE.city}. W sprawach dotyczących danych osobowych
              prosimy o kontakt: telefon <a className="text-gold-2 underline underline-offset-2" href={SITE.phoneHref}>{SITE.phone}</a>,
              e-mail <a className="text-gold-2 underline underline-offset-2" href={SITE.emailHref}>{SITE.email}</a>.
            </P>

            <H2>2. Jakie dane zbieramy</H2>
            <P>
              Zbieramy tylko te dane, które Państwo sami podają, wypełniając formularz zapytania o termin
              lub kontaktując się z nami telefonicznie albo mailowo:
            </P>
            <ul className="mb-4">
              <LI>imię i nazwisko,</LI>
              <LI>adres e-mail i numer telefonu,</LI>
              <LI>termin i szczegóły planowanego pobytu (daty, liczba osób, wybrany pokój lub apartament),</LI>
              <LI>treść Państwa wiadomości.</LI>
            </ul>
            <P>Nie zbieramy danych wrażliwych i nie profilujemy Państwa danych.</P>

            <H2>3. Cel i podstawa prawna</H2>
            <P>
              Dane przetwarzamy, aby odpowiedzieć na zapytanie, sprawdzić dostępność terminu i przygotować rezerwację —
              czyli w celu podjęcia działań przed zawarciem umowy na Państwa żądanie (art. 6 ust. 1 lit. b RODO)
              oraz w celu kontaktu i obsługi zapytania, co stanowi nasz prawnie uzasadniony interes (art. 6 ust. 1 lit. f RODO).
            </P>

            <H2>4. Jak długo przechowujemy dane</H2>
            <P>
              Dane z zapytań, które nie zakończyły się rezerwacją, usuwamy najpóźniej po zakończeniu sezonu, którego dotyczyły.
              Dane związane z rezerwacją i pobytem przechowujemy przez okres wymagany przepisami (m.in. podatkowymi).
            </P>

            <H2>5. Komu powierzamy dane</H2>
            <P>
              Aby strona działała i aby dotarła do nas Państwa wiadomość, korzystamy z zaufanych dostawców.
              W niezbędnym zakresie Państwa dane mogą trafić do:
            </P>
            <ul className="mb-4">
              <LI><strong className="text-charcoal">Cloudflare, Inc.</strong> (USA) — hosting strony (Cloudflare Pages).</LI>
              <LI><strong className="text-charcoal">Resend</strong> (USA) — dostarczenie do nas wiadomości e-mail wysłanej z formularza.</LI>
              <LI><strong className="text-charcoal">Google Ireland Ltd / Google LLC</strong> — mapa Google Maps osadzona na stronie kontaktu.</LI>
            </ul>
            <P>
              Część z tych podmiotów ma siedzibę poza Europejskim Obszarem Gospodarczym (USA). Przekazanie danych
              odbywa się na podstawie standardowych klauzul umownych zatwierdzonych przez Komisję Europejską
              oraz — tam gdzie ma to zastosowanie — programu Data Privacy Framework.
            </P>

            <H2>6. Pliki cookie i mapa Google</H2>
            <P>
              Sama strona nie używa plików cookie do śledzenia ani do analityki. Wyjątkiem jest mapa Google Maps
              na stronie kontaktu — po jej załadowaniu Google może zapisać własne pliki cookie. Mapa ładuje się
              tylko na tej podstronie. Ustawienia plików cookie mogą Państwo zmienić w swojej przeglądarce.
            </P>

            <H2>7. Państwa prawa</H2>
            <P>Mają Państwo prawo do:</P>
            <ul className="mb-4">
              <LI>dostępu do swoich danych oraz otrzymania ich kopii,</LI>
              <LI>sprostowania (poprawienia) danych,</LI>
              <LI>usunięcia danych lub ograniczenia przetwarzania,</LI>
              <LI>wniesienia sprzeciwu wobec przetwarzania,</LI>
              <LI>przenoszenia danych,</LI>
              <LI>wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych (ul. Stawki 2, 00-193 Warszawa).</LI>
            </ul>
            <P>
              Aby skorzystać z tych praw, wystarczy napisać do nas na
              {' '}<a className="text-gold-2 underline underline-offset-2" href={SITE.emailHref}>{SITE.email}</a> lub zadzwonić.
            </P>

            <P className="mt-10 text-charcoal/65 text-[13.5px]">
              Podanie danych jest dobrowolne, ale niezbędne, aby odpowiedzieć na zapytanie i przygotować rezerwację.
            </P>
          </div>
        </Container>
      </section>
    </>
  )
}
