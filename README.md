# Willa Wójcik — strona willawojcik.pl

Strona pensjonatu Willa Wójcik w Sromowcach Niżnych. React 19, Vite 6, Tailwind CSS 4.
Każda podstrona jest generowana do statycznego HTML-a (prerender), więc wyszukiwarki
dostają pełną treść bez uruchamiania JavaScriptu. Hosting: Cloudflare (Workers, static assets).

## Uruchomienie

Wymagany Node.js 22 lub nowszy.

```bash
npm install
cp .env.example .env      # uzupełnić wartości
npm run build             # buduje stronę do dist/public
npx wrangler dev          # podgląd builda lokalnie, z regułami Cloudflare (404, przekierowania, nagłówki)
```

`npm run dev` uruchamia serwer deweloperski Vite. Podstrony działają w nim poprawnie
dopiero po buildzie — do sprawdzania całej strony lepszy jest `npx wrangler dev`.

## Wdrożenie

Cloudflare buduje stronę sam z repozytorium:

- polecenie budowania: `npm run build`
- katalog wynikowy: `dist/public`
- zmienne środowiskowe: jak w `.env.example`, plus `NODE_VERSION=22`

Ręcznie: `npm run deploy` (wymaga zalogowania `npx wrangler login`).

## Gdzie co jest

| Co | Plik |
|---|---|
| Adres, telefon, e-mail, dane właścicielki, oceny z portali, opłata miejscowa | `src/data/site.js` |
| Zdjęcia, opisy i ceny apartamentów i pokoi, udogodnienia | `src/data/content.js` |
| Tytuły i opisy stron (SEO), dane strukturalne schema.org, obrazy do udostępniania | `src/entry-server.jsx` |
| Podstrony | `src/pages/` |
| Sekcje strony głównej i wspólne komponenty | `src/components/`, `src/components/ui/` |
| Galeria (/galeria) i zasady układania kafelków | `src/pages/Galeria.jsx` |
| Nagłówki HTTP, cache, bezpieczeństwo | `public/_headers` |
| Obrazy do udostępniania w social media (1200 × 630) | `public/og/` |
| Konfiguracja Cloudflare | `wrangler.jsonc` |
| Generowanie HTML, sitemap.xml, 404.html, _redirects | `scripts/prerender.js` |

## Zmiana ceny lub metrażu

Ceny i metraże stoją w dwóch miejscach: w treści (`src/data/content.js`) i w danych
strukturalnych (`src/entry-server.jsx`, funkcja `unit`). Zmieniać oba. Przy zmianie
treści podstrony warto przestawić `DEFAULT_UPDATED` w `src/entry-server.jsx` — to data
`lastmod` w sitemap.xml.

## Dodawanie zdjęć

1. Zdjęcie w formacie WebP, dłuższy bok do 2400 px, do `src/assets/`.
2. Import i wpis w `src/data/content.js` (albo w `src/pages/Galeria.jsx`).
3. Wygenerować miniatury (wymaga Pythona 3 i `pip install Pillow`):

   ```bash
   python3 scripts/miniatury.py
   ```

   Skrypt tworzy wersje 640 i 1280 px w `src/assets/miniatury/`. Przeglądarka pobiera
   wtedy miniaturę pasującą do kafelka, a pełne zdjęcie dopiero w powiększeniu.
   Bez tego kroku zdjęcie też działa, tylko strona jest cięższa.

W siatkach galerii zdjęcie pionowe wstawiać tylko w kafelek kwadratowy — zasady układu
są opisane w komentarzu w `src/pages/Galeria.jsx`.

## Mapa i pliki cookie

Mapa Google ładuje się dopiero po kliknięciu „Pokaż mapę" (`src/components/ui/MapEmbed.jsx`).
Strona nie używa plików cookie ani analityki, a czcionki są hostowane lokalnie
(`src/assets/fonts/`), dlatego nie potrzebuje baneru cookies. Dodanie analityki albo
osadzeń z innych serwisów oznacza konieczność zbierania zgody i aktualizacji polityki prywatności.
