# Zdjęcia do podmiany — Willa Wójcik

Strona używa **zdjęć poglądowych** (istniejące pliki z `src/assets/`) jako placeholderów.
Poniżej lista, co warto dostać od właściciela i gdzie trafi. Docelowo: WebP, ≤200 KB, z `width/height`.

## Priorytet 1 — obiekt i jednostki (od właściciela)
- **Heroes (WSZYSTKIE strony) = ilustracje vintage** (serigrafia, styl „willawojcik"; źródła w `public/images/hero/`, zoptymalizowane WebP w `src/assets/hero-*-illustration.webp`, klucze `PHOTOS.hero*`): home (`home.jpeg`), pokoje (`apartamenty.png`), galeria, okolica, splyw, 3-korony, kladka, kontakt. OG image (`public/opengraph.jpg`) z kadru home. Zimowe ujęcie z drona zostało w galerii („Willa i Trzy Korony z lotu ptaka"). Nowa ilustracja = ten sam workflow: plik do `public/images/hero/` → cwebp → import w `content.js` → `PageHero image=`.
- **Apartamenty** (`/pokoje-i-apartamenty`) — 3–5 zdjęć apartamentu 4–6 os.: salon, sypialnia, aneks kuchenny, balkon z widokiem.
- **Pokoje** — 3–5 zdjęć pokoju 2–3 os.: wnętrze, łazienka, balkon/taras.
- **Części wspólne** — wspólna kuchnia 45 m², altana z grillem, plac zabaw, ogród, taras, parking.
- **Galeria** (`/galeria`) — 12–20 najlepszych zdjęć (mix wnętrz + obiekt + okolica).
- **OG image** (`public/opengraph.jpg`, 1200×630) — obecnie wygenerowany z hero; można podmienić na dedykowany.

## Priorytet 2 — okolica (mogą być własne lub licencjonowane)
- **Spływ Dunajcem** (`/okolica/splyw-dunajcem`) — tratwa flisacka na Przełomie Dunajca.
- **Trzy Korony** (`/okolica/trzy-korony`) — panorama ze szczytu / taras / szlak.
- **Kładka i Czerwony Klasztor** (`/okolica/kladka-czerwony-klasztor`) — kładka na Dunajcu, klasztor, Droga Pienińska.
- **Okolica (hub)** — kadry: zamek Niedzica, jezioro Czorsztyńskie, stok Czorsztyn-Ski.

## Jak podmienić
Zdjęcia obiektu wrzucić do `src/assets/` (import w `src/data/content.js`) lub — dla stron atrakcji —
do `public/images/okolica/` i podmienić ścieżki w komponentach `PageHero`/kartach. Po podmianie: `npm run build:static`.

## Do potwierdzenia z właścicielem (treść, nie zdjęcia)
- **Ceny** pokoi/apartamentów per sezon (teraz „od 210 / od 350 zł" z nocowania — oznaczone jako orientacyjne).
- **Śniadanie** — czy dostępne/opcjonalne, czy czysty self-catering (teraz: self-catering, bez deklaracji śniadań).
- **Godzina końca zameldowania** (14:00–21:00 czy do 23:30).
- **Opinie/testimoniale** na home — obecne są placeholderami; podmienić na prawdziwe cytaty gości (Google/Booking).
- **E-mail** `rezerwacja@willawojcik.pl` — do założenia z domeną.
- **Linki social** (Instagram, Facebook) — wstawić realne w `src/data/site.js`.
