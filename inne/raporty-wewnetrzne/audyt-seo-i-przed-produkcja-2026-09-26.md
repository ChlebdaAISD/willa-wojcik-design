# Willa Wójcik — audyt SEO, formalności, grafiki, przekazanie kodu

26.09.2026. Dokument wewnętrzny (folder `inne/`, nie idzie do klienta).

Oznaczenia: **[poza stroną]** — konta i wizytówki, bez kodu. **[kod]** — zmiana techniczna, treść i wygląd bez zmian.
**[treść]** — zmiana tekstu na stronie, wymaga Twojej zgody. **[klient]** — potrzebne dane albo decyzja właścicieli.

Źródła pomiarów: zbudowany HTML wszystkich 10 podstron, Lighthouse 12 (mobile) na żywej willawojcik.pl,
`curl` nagłówków i kodów odpowiedzi.

---

## 1. SEO — czego brakuje

### Stan wyjściowy (co już jest dobrze)

- Każda podstrona ma prerenderowany HTML, jeden H1, unikalny title 51–59 znaków, description 127–157, canonical na apex,
  OG i Twitter Card, `lang="pl"`, favicony, breadcrumbs z BreadcrumbList.
- LodgingBusiness z adresem, geo, telefonem, godzinami doby, `sameAs` (Google CID, Booking, nocowanie.pl).
- FAQPage na trzech stronach atrakcji. Sitemap i robots.txt działają, www → apex 301, prawdziwe 404.
- Lighthouse SEO 100/100 na stronie głównej i galerii; alt text na 100% obrazów.

### Poza stroną — największy efekt, zero kodu

| # | Punkt | Dlaczego |
|---|---|---|
| S1 | **[poza stroną]** Google Search Console: dodać domenę, wysłać `sitemap.xml`, poprosić o indeksowanie 10 adresów. | Wyszukiwanie `site:willawojcik.pl` nie zwraca dziś żadnej podstrony. Bez GSC nie wiemy, czy i co Google zaindeksował. |
| S2 | **[poza stroną] [klient]** Wpisać `https://willawojcik.pl` jako stronę w wizytówce Google (4,9 / 135 opinii). | W lipcu pole „witryna" było puste. To najsilniejszy sygnał lokalny i jedyny sposób, żeby wizytówka kierowała ruch na rezerwację bez prowizji. |
| S3 | **[poza stroną]** Bing Webmaster Tools (import z GSC, 5 minut). | Bing zasila wyszukiwanie w ChatGPT i Copilocie. |
| S4 | **[poza stroną] [klient]** Link do strony w bio Instagrama, w bazie noclegów gminy Czorsztyn (czorsztyn.pl → hotele i pensjonaty) i w portalach, które pozwalają podać stronę (nocowanie.pl, e-turysta, lokalne portale Pienin). | Strona nie ma dziś żadnych linków przychodzących. Lokalne katalogi to najtańsze pierwsze linki i spójność NAP. |
| S5 | **[poza stroną]** Później: darmowe linki rezerwacji w Google Hotels (wymaga partnera typu Hotres). | Obiekt pojawiłby się z ceną w Mapach obok Bookingu. Etap 2, razem z silnikiem rezerwacji. |

### Technika — bez zmiany treści

| # | Punkt | Szczegóły |
|---|---|---|
| T1 | **[kod]** Szybkość ładowania na telefonie. | Lighthouse mobile (żywa strona): wydajność 66 (home) i 63 (galeria), LCP 5,7 s i 7,6 s, FCP 4,6 s. Obrazy zrobione (punkt 3). Zostaje: czcionki Google ładowane z zewnętrznego CSS (3 rodziny) — hostować je lokalnie (woff2, podzbiór latin-ext) i dać preload. To samo rozwiązuje punkt F4 o RODO. |
| T2 | **[kod]** Osobny obraz OG dla każdej podstrony. | Wszystkie 10 stron udostępnia się z tym samym ciemnym zdjęciem z drona o zmierzchu (`opengraph.jpg`) — właściciele odrzucili je jako za ciemne do hero. Wystarczy wygenerować 1200×630 z istniejących zdjęć: apartament, pokój, galeria, trzy atrakcje. |
| T3 | **[kod]** Schema dla jednostek: `Accommodation` / `HotelRoom` z `occupancy`, `floorSize`, `bed`, `offers` (cena od), `amenityFeature` na /apartamenty i /pokoje; `logo` i `hasMap` w LodgingBusiness. | Dziś /apartamenty i /pokoje mają tylko BreadcrumbList. Te dane (m², liczba osób, cena) są na stronie, tylko nie w formie, którą czyta Google i asystenci AI. |
| T4 | **[kod]** Nagłówki kategorii w galerii jako `<h2>`. | Sześć kategorii (Obiekt, Ogród, Widok…) to dziś `<span>` — galeria ma jeden H2 na 74 zdjęcia. Zmiana tagu, wygląd zostaje identyczny. |
| T5 | **[kod]** Własna strona 404. | Dziś pusta odpowiedź 404 bez nawigacji. W Cloudflare wystarczy `not_found_handling: "404-page"` + plik `404.html` (status 404 zostaje). |
| T6 | **[kod]** Sitemap: dodać `lastmod`, usunąć `changefreq` i `priority`. | Google ignoruje te dwa pola, a `lastmod` wykorzystuje. |
| T7 | **[kod]** Kontrast: podpis `text-charcoal/60`, 12,5 px na kremowym tle ma 4,31:1 (wymagane 4,5:1). | Jedyny błąd dostępności na stronie głównej (Lighthouse 97). Wystarczy `/70`. |
| T8 | **[kod]** Drobne: `/apartamenty/` przekierowuje 307 zamiast 301 (Cloudflare) — reguła przekierowania w panelu; włączyć HSTS w Cloudflare; usunąć nieużywaną zależność `gsap` z `package.json`. | Niski wpływ, porządki. |

### Treść — tylko lista, niczego nie zmieniałem

| # | Punkt | Szczegóły |
|---|---|---|
| C1 | **[treść]** Fraza „noclegi Sromowce Niżne" prawie nie występuje. | To główna fraza z SERP (same agregatory, żaden obiekt z własną domeną). Na stronie głównej pada raz. Propozycja title: „Noclegi Sromowce Niżne — apartamenty i pokoje \| Willa Wójcik". |
| C2 | **[treść]** H1 strony głównej „Balkon z widokiem na Trzy Korony." nie ma nazwy miejscowości ani obiektu. | Można zostawić hasło, a dodać nad nim mniejszy wiersz „Willa Wójcik, Sromowce Niżne" w H1 albo przenieść frazę do podtytułu. |
| C3 | **[treść]** H1 /kontakt „Zapytaj o wolny termin". | Bez frazy i w trybie rozkazującym 2. os. (reszta strony mówi „Państwo"). Propozycja: „Kontakt i rezerwacja w Willi Wójcik". |
| C4 | **[treść]** FAQ rezerwacyjne na stronie głównej albo /kontakt (zameldowanie, parking, dzieci, zwierzęta, zaliczka, opłata miejscowa) + FAQPage. | Dokładnie te pytania ludzie zadają Google i czatom AI przed rezerwacją. |
| C5 | **[treść]** 2–3 linki do źródeł zewnętrznych na stronach atrakcji (Pieniński Park Narodowy, flisacy, Czerwony Klasztor). | Dziś zero linków zewnętrznych poza Mapami i Instagramem. |
| C6 | **[treść] [klient]** Prawdziwe cytaty opinii (za zgodą, z datą i źródłem). | Są tylko oceny zbiorcze. |
| C7 | **[treść]** Opcjonalnie strona zimowa (narty Czorsztyn-Ski, termy) — była w planie z lipca. | Sezon poza latem nie ma dziś strony docelowej. |

---

## 2. Formalności przed produkcją

Strona **ma** politykę prywatności (/polityka-prywatnosci, link w stopce). Braki:

| # | Punkt | Co zrobić |
|---|---|---|
| F1 | **[klient] Kto jest administratorem danych.** | Polityka podaje „Willa Wójcik — Apartamenty i Pokoje", a to nazwa obiektu, nie osoba ani firma. Potrzebne: imię i nazwisko właściciela albo firma z CEIDG + NIP (jeśli jest działalność). Bez tego polityka jest formalnie niekompletna (RODO art. 13 ust. 1 lit. a). |
| F2 | **[klient] Dane usługodawcy na stronie** (art. 5 ustawy o świadczeniu usług drogą elektroniczną): imię i nazwisko lub firma, adres, e-mail, NIP jeśli przedsiębiorca. | Dziś w stopce jest tylko „© 2026 Willa Wójcik". Jeden wiersz w stopce albo na /kontakt. |
| F3 | **Mapa Google ładuje się sama** na stronie głównej i /kontakt, więc Google stawia cookies bez zgody. | Prawo komunikacji elektronicznej (art. 399, od 10.11.2024) wymaga zgody na cookies, które nie są niezbędne. Najprościej: mapa „kliknij, aby załadować" (statyczny podgląd + przycisk). Wtedy **baner cookies w ogóle nie jest potrzebny** — strona nie ma analityki. |
| F4 | **Czcionki z serwerów Google** przekazują IP odwiedzającego do Google (głośny wyrok LG München 2022). | Hostować lokalnie (to samo co T1). Wtedy nie trzeba ich opisywać w polityce. |
| F5 | **Polityka nie opisuje prawdziwej drogi danych z formularza.** | Wymienia Cloudflare, Resend, Google Maps. Brakuje: serwera n8n (gdzie stoi i kto go utrzymuje) oraz Gmaila jako skrzynki odbiorczej (`willawojcik1@gmail.com` → Google). Zaktualizować datę (dziś „7 lipca 2026"). |
| F6 | **Informacja pod formularzem.** | Jedno zdanie przy przycisku: „Administratorem danych jest …, szczegóły w polityce prywatności" (art. 13 — informacja w chwili zbierania danych). Checkbox zgody **nie** jest potrzebny, podstawą jest art. 6 ust. 1 lit. b i f. |
| F7 | **[klient] Umowa powierzenia (art. 28 RODO) między właścicielami a Tobą.** | Formularz idzie przez Twoje n8n i Resend, więc przetwarzasz dane gości w ich imieniu. Umowa powinna być podpisana przed startem formularza produkcyjnego. |
| F8 | **Sprzeczne warunki płatności.** | Pod przyciskiem formularza: „Płatność w dniu przyjazdu", a w trzech miejscach: „Rezerwację potwierdza zaliczka 30%". Do ujednolicenia. Warto też ustalić z właścicielami, czy to **zaliczka** (zwrotna), czy **zadatek** (art. 394 KC) — przy rezygnacji to zasadnicza różnica. |
| F9 | **[klient] Opłata miejscowa.** | Gmina Czorsztyn ją pobiera (uchwała XII/102/2025). Jeśli właściciele ją doliczają, cena „od 250 zł" powinna mówić, że jej nie obejmuje. |
| F10 | Regulamin świadczenia usług drogą elektroniczną (art. 8 UŚUDE). | Przy samym formularzu kontaktowym to sprawa sporna. Bezpieczniej mieć krótki regulamin (1 strona). Regulamin obiektu (cisza nocna, szkody) jest opcjonalny. |
| F11 | Oceny z portali. | Dopisać „stan na wrzesień 2026" przy ocenach 4,9 / 9,8 / 10 i aktualizować raz na sezon. |

Czego **nie** trzeba: baneru cookies (po F3 i F4), deklaracji dostępności (mikroprzedsiębiorca jest zwolniony z ustawy o dostępności dla usług), informacji o 14 dniach na odstąpienie (przy noclegu na konkretne daty to prawo nie przysługuje, art. 38 pkt 12 ustawy o prawach konsumenta), numeru z gminnej ewidencji na stronie.

Już przyjęte ryzyko (decyzja właściciela z 15.09): grafika w hero nie przedstawia prawdziwego budynku i nie jest podpisana jako zdjęcie.

---

## 3. Grafiki — zrobione

Problem: kafelki galerii (330–670 px na ekranie) ładowały pełne zdjęcia 1800–2400 px, 300–560 KB każde.

Rozwiązanie (bez nowych zależności, wygląd bez zmian):

- `scripts/miniatury.py` tworzy dla każdego zdjęcia wersje 640 i 1280 px (`src/assets/miniatury/`, WebP q78) oraz `wymiary.json`.
- `src/lib/obrazy.js` dokłada `srcset`/`sizes`/`width`/`height`. Przeglądarka pobiera miniaturę pasującą do kafelka;
  lightbox na dużym ekranie dalej pokazuje oryginał.
- Podpięte w: siatki galerii (home, /galeria, /apartamenty, /pokoje), karty noclegów, zdjęcia pokoi i łazienek, About, sekcja udogodnień.

Waga zdjęć po przewinięciu całej strony:

| Strona | Przed | Telefon (390 px, ×3) | Laptop (1440 px, ×1) | Retina (1440 px, ×2) |
|---|---|---|---|---|
| /galeria | 19,7 MB | 5,7 MB | 5,7 MB | 8,1 MB |
| /apartamenty | 9,2 MB | 1,4 MB | 1,4 MB | 2,2 MB |
| / | 4,3 MB | 1,2 MB | 0,9 MB | 1,6 MB |
| /pokoje | 3,8 MB | 0,8 MB | 0,7 MB | 1,2 MB |

Lighthouse na galerii (pierwsze wczytanie): 4,5 MB → 2,3 MB. Sprawdzone: build, zrzuty desktop/mobile/lightbox,
code review, 13 testów logiki nazw i srcset. **Przy każdym nowym zdjęciu uruchomić `python3 scripts/miniatury.py`**
(bez tego zdjęcie działa, tylko jest cięższe).

---

## 4. Przekazanie kodu — co zrobiłem i na co uważać

Przeniesione do `inne/` (nic nie skasowane):

- `raporty-dla-klienta/` — 5 PDF-ów wysłanych Wójcikom
- `zdjecia-zrodlowe/whatsapp-2026-09-16/` — 30 oryginałów z WhatsAppa
- `zdjecia-nieuzywane/` — 42 pliki z `src/assets`, których strona nie importuje, + `public/opengraph-ilustracja.jpg`
- `logo-projekt/` — generowanie logo (prompty, skrypty, wyniki)
- `skrypty/` — extract-logo, magnific-edit, podkrec-zdjecia, sprawdz-siatke
- `notatki-projektowe/` — DESIGN.md, PRODUCT.md, references/ (voice, stats)
- `zrzuty-ekranu/` — dwa zrzuty z kwietnia

W kodzie przepisałem komentarze, które wspominały o ChatGPT, Magnificu, `.claude/`, AI-search i o usuniętych
zmyślonych opiniach/odległościach — na neutralne notatki techniczne. Zero zmian w działaniu i treści strony.
Skan całego kodu (poza `inne/`, `node_modules`, `dist`, `.git`) na claude/anthropic/gpt/magnific/freepik/seedream/AI/prompt: czysto.
Metadane obrazów (EXIF/XMP/C2PA): czysto.

**Nie wysyłać razem z kodem:**

- **`.git/`** — historia zawiera 2 commity z „Co-Authored-By: Claude …" oraz wszystkie wcześniejsze pliki (prompty logo, skrypty Magnific, raporty). Kod dla klienta: ZIP bez `.git` albo nowe repozytorium z jednym commitem.
- `node_modules/`, `dist/`, `.wrangler/` — odtwarzalne (`npm install`, `npm run build`).
- `.DS_Store` (śmieci macOS).
- `.env` — klucz Google Maps i adres webhooka n8n. Oba są na **Twoich** kontach. Do decyzji: przekazujesz klucze, czy klient zakłada własne (wtedy formularz i mapa przestaną działać po Twojej stronie).

Do decyzji: `inne/` nie jest w `.gitignore`, więc przy następnym commicie trafi do repo na GitHubie. Jeśli repo ma kiedyś przejść na klienta, dopisz `inne/` do `.gitignore`.
