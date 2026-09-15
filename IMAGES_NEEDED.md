# Zdjęcia — stan i czego jeszcze brakuje

**Aktualizacja 14.09.2026: zdjęcia obiektu są już realne.** Właściciele dostarczyli materiał
przez Google Drive (`Projekty/Willa Wójcik`), 77 wybranych zdjęć trafiło do `src/assets/`.
Wszystkie placeholdery `screenshot-*.webp` zostały odpięte od kodu.

## Co jest zrobione

- **Obiekt z zewnątrz** — ujęcia dzienne i z drona o zmierzchu, elewacja z szyldem, podjazd.
- **Ogród** — altana z grillem, plac zabaw (trampolina, huśtawki), hortensje, tarasy.
- **Widok na Trzy Korony** — z ogrodu, z tarasu i z balkonów.
- **Apartament 1** (38 m²), **Apartament 2** (35 m²), **Apartament 3** (60 m²) — po 7 zdjęć każdy.
- **Pokoje 1–8** — wnętrza z balkonem (piętro) i tarasem (parter) oraz łazienki.
- **Części wspólne** — kuchnia 45 m², jadalnia, strefa wypoczynkowa, kącik dziecięcy, hol, korytarz.
- **Wideo hero** — `public/video/willa-wojcik-pieniny.{mp4,webm}`, pętla 20 s, plakat
  `src/assets/hero-video-poster.webp`. Na telefonie i przy `prefers-reduced-motion`
  pokazuje się sam plakat (zob. `src/lib/useHeroVideo.js`).

Konwencja: WebP, maks. 1800 px, ok. 200 KB, nazwy opisowe po polsku bez ogonków
(`ap2-salon-aneks.webp`, `pokoj-pietro-balkon.webp`). Źródła HEIC zostają na Google Drive.

## Czego wciąż brakuje

### Priorytet 1 — treść, nie zdjęcia
- **Prawdziwe opinie gości.** Zmyślone cytaty zostały **usunięte 14.09.2026** (decyzja Łukasza).
  `REVIEWS` w `src/data/content.js` to teraz pusta tablica, a sekcja opinii pokazuje wyłącznie
  prawdziwe oceny zbiorcze (Google 4,9/5 ze 135 opinii, Booking 9,8/10, nocowanie.pl 10/10)
  plus link do opinii w Google. Żeby wrócić do cytatów, potrzebne są realne wpisy od właścicieli
  albo pobrane z Places API (max 5, z imieniem, datą i oceną bez edycji).

### Priorytet 2 — okolica (własne lub licencjonowane)
Podstrony atrakcji mają dziś ilustracje w stylu „willawojcik" jako hero. Zdjęcia byłyby lepsze:
- **Spływ Dunajcem** (`/okolica/splyw-dunajcem`) — tratwa flisacka na Przełomie.
- **Trzy Korony** (`/okolica/trzy-korony`) — panorama ze szczytu, taras widokowy, szlak.
- **Kładka i Czerwony Klasztor** (`/okolica/kladka-czerwony-klasztor`) — kładka, klasztor, Droga Pienińska.
- **Okolica (hub)** — zamek Niedzica, Jezioro Czorsztyńskie, stok Czorsztyn-Ski.

### Priorytet 3 — sezon
Cały materiał jest letni (wrzesień). Zimowe ujęcia obiektu przydadzą się pod sezon narciarski.

## Do rozstrzygnięcia z właścicielami

- **Żółty budynek z drewnianą elewacją** — na Drive jest ok. 12 zdjęć budynku o zupełnie innej
  architekturze, stojącego przy tym samym podjeździe. Wygląda na sąsiada, więc **nie użyto go
  nigdzie na stronie**. Jeśli należy do obiektu, zdjęcia czekają gotowe.
- **Zdjęcia z ludźmi** — pominięto kadr z nastolatką przy motocyklu (wizerunek osoby małoletniej).
  Na jednym ujęciu z drona o zmierzchu na balkonie siedzi rozpoznawalna osoba — do decyzji,
  czy zostaje.

## Źródła obrazów — gdzie są

**`public/` nie zawiera już źródeł.** 14.09.2026 usunięto stamtąd 21 plików (~53 MB):
`public/images/hero/*.png` (mastery ilustracji hero) oraz `public/images/apartament_1|3/*.jpeg`
(oryginalne zdjęcia apartamentów z lipca). Wszystko w `public/` ląduje w `dist/`, więc te pliki
jechały na produkcję przy każdym deployu, mimo że nic ich nie używa — deploy spadł **z 76 MB do 19 MB**.

Są odzyskiwalne z historii gita (`git checkout <commit> -- public/images/`). Zdjęcia apartamentów
mamy dodatkowo na Google Drive. Zoptymalizowane wersje używane przez stronę leżą w `src/assets/`
(`hero-*-illustration.webp`, `ap1-*`, `ap3-*`).

**Nowe ilustracje hero** wrzucać do `src/assets/` już jako WebP — nie do `public/`.

## Nieużywane pliki w `src/assets/`

Bez referencji po podmianie: `screenshot-*.webp` (10 plików), `room-interior-1.webp`, `hero.webp`.
Vite ich nie zbuduje (nie są importowane), więc nie obciążają deployu — zajmują tylko miejsce
w repo. Do skasowania przy okazji.
