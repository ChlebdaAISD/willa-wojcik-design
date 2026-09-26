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
        crumbs={[{ label: 'Strona główna', href: '/' }, { label: 'Polityka prywatności' }]}
      />

      <section className="relative bg-cream py-16 md:py-24">
        <Container>
          <div className="max-w-3xl">
            <P>Ostatnia aktualizacja: 26 września 2026 roku.</P>

            <H2>1. Administrator danych</H2>
            <P>
              Administratorem Państwa danych osobowych jest {SITE.owner.name}, właścicielka Willi Wójcik,
              {' '}{SITE.street}, {SITE.postal} {SITE.city}, NIP {SITE.owner.nip}, REGON {SITE.owner.regon}.
              W sprawach dotyczących danych osobowych prosimy o kontakt: telefon <a className="text-gold-3 underline underline-offset-2" href={SITE.phoneHref}>{SITE.phone}</a>,
              e-mail <a className="text-gold-3 underline underline-offset-2" href={SITE.emailHref}>{SITE.email}</a>.
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
            <P>
              Serwer strony automatycznie zapisuje też dane techniczne: adres IP, typ przeglądarki
              i czas wizyty. Nie zbieramy danych wrażliwych i nie profilujemy Państwa danych.
            </P>

            <H2>3. Cel i podstawa prawna</H2>
            <ul className="mb-4">
              <LI>
                Odpowiedź na zapytanie, sprawdzenie dostępności i przygotowanie rezerwacji — działania
                przed zawarciem umowy na Państwa żądanie (art. 6 ust. 1 lit. b RODO).
              </LI>
              <LI>
                Realizacja pobytu po potwierdzeniu rezerwacji (art. 6 ust. 1 lit. b RODO) oraz obowiązki
                wynikające z przepisów, m.in. podatkowych i dotyczących opłaty miejscowej (art. 6 ust. 1 lit. c RODO).
              </LI>
              <LI>
                Kontakt w sprawie zapytania oraz bezpieczeństwo strony (dane techniczne) — nasz prawnie
                uzasadniony interes (art. 6 ust. 1 lit. f RODO).
              </LI>
            </ul>

            <H2>4. Jak długo przechowujemy dane</H2>
            <P>
              Dane z zapytań, które nie zakończyły się rezerwacją, usuwamy najpóźniej po zakończeniu sezonu, którego dotyczyły.
              Dane związane z rezerwacją i pobytem przechowujemy przez okres wymagany przepisami (m.in. podatkowymi).
              Kopie techniczne u dostawców (logi serwera, historia wysyłki wiadomości) są usuwane najpóźniej po 30 dniach.
            </P>

            <H2>5. Komu powierzamy dane</H2>
            <P>
              Wiadomość z formularza trafia do nas przez serwer automatyzacji i serwis wysyłki poczty.
              W niezbędnym zakresie Państwa dane mogą trafić do:
            </P>
            <ul className="mb-4">
              <LI><strong className="text-charcoal">Firma obsługująca stronę technicznie</strong> (Nowy Targ) — utrzymanie strony i formularza, na podstawie umowy powierzenia przetwarzania danych.</LI>
              <LI><strong className="text-charcoal">Cloudflare, Inc.</strong> (USA) — hosting strony i ochrona przed atakami, logi serwera.</LI>
              <LI><strong className="text-charcoal">Railway Corporation</strong> (serwer w Unii Europejskiej, Amsterdam) — serwer automatyzacji, który przekazuje wiadomość z formularza.</LI>
              <LI><strong className="text-charcoal">Resend, Inc.</strong> (USA) — wysyłka wiadomości e-mail do nas oraz potwierdzenia do Państwa; treść jest przechowywana do 30 dni.</LI>
              <LI><strong className="text-charcoal">Google Ireland Ltd / Google LLC</strong> — skrzynka pocztowa, na którą przychodzą zapytania.</LI>
              <LI>Dostawcy narzędzi informatycznych, z których korzysta firma obsługująca stronę — wyłącznie w zakresie niezbędnym do jej utrzymania.</LI>
            </ul>
            <P>
              Część z tych podmiotów ma siedzibę poza Europejskim Obszarem Gospodarczym (USA). Przekazanie danych
              odbywa się na podstawie standardowych klauzul umownych zatwierdzonych przez Komisję Europejską
              oraz — tam gdzie ma to zastosowanie — programu Data Privacy Framework.
            </P>

            <H2>6. Pliki cookie i mapa Google</H2>
            <P>
              Strona nie używa plików cookie ani narzędzi analitycznych. Czcionki ładują się z naszego
              serwera, bez łączenia z Google.
            </P>
            <P>
              Mapa Google na stronie głównej i na stronie kontaktu ładuje się dopiero wtedy, gdy klikną Państwo
              „Pokaż mapę". Wtedy Google otrzymuje adres IP Państwa urządzenia i może zapisać własne pliki cookie.
              Google działa w tym zakresie jako odrębny administrator, zgodnie ze swoją{' '}
              <a className="text-gold-3 underline underline-offset-2" href="https://policies.google.com/privacy?hl=pl" target="_blank" rel="noopener noreferrer">polityką prywatności</a>.
              Kliknięcie oznacza zgodę na załadowanie mapy (art. 6 ust. 1 lit. a RODO). Przy kolejnej wizycie
              mapa znów jest wyłączona, a zapisane pliki cookie mogą Państwo usunąć w ustawieniach przeglądarki.
            </P>

            <H2>7. Państwa prawa</H2>
            <P>Mają Państwo prawo do:</P>
            <ul className="mb-4">
              <LI>dostępu do swoich danych oraz otrzymania ich kopii,</LI>
              <LI>sprostowania (poprawienia) danych,</LI>
              <LI>usunięcia danych lub ograniczenia przetwarzania,</LI>
              <LI>wniesienia sprzeciwu wobec przetwarzania,</LI>
              <LI>przenoszenia danych,</LI>
              <LI>wycofania zgody na załadowanie mapy w dowolnym momencie, bez wpływu na wcześniejsze przetwarzanie,</LI>
              <LI>wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych (ul. Stawki 2, 00-193 Warszawa).</LI>
            </ul>
            <P>
              Aby skorzystać z tych praw, wystarczy napisać do nas na
              {' '}<a className="text-gold-3 underline underline-offset-2" href={SITE.emailHref}>{SITE.email}</a> lub zadzwonić.
            </P>

            <P>
              Podanie danych jest dobrowolne, ale niezbędne, aby odpowiedzieć na zapytanie i przygotować rezerwację.
            </P>
          </div>
        </Container>
      </section>
    </>
  )
}
