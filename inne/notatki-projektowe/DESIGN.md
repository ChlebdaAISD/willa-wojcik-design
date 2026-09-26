# Design

## Theme

Zmierzch w dolinie Dunajca: ciemna zieleń lasu + ciepły krem + przygaszone złoto. Fotografia autentyczna (realne zdjęcia obiektu), grade'owana delikatnie ku zieleni. Sekcje przeplatają jasne (krem/kamień) i ciemne (las/węgiel) plansze — rytm doliny i grani.

## Color

| Token | Wartość | Rola |
|---|---|---|
| `forest` | `#1F3A2E` | Główna zieleń — tła drench, przyciski primary |
| `forest-2` | `#2a4b3b` | Hover/wariant zieleni |
| `cream` | `#F5F1E8` | Tło jasnych sekcji, tekst na ciemnym |
| `cream-2` | `#EFE9DA` | Alternatywne jasne tło |
| `stone` | `#D9CFBF` | Trzecie jasne tło (lokalizacja) |
| `stone-2` | `#C8BCA7` | Obramowania/wyciszone na stone |
| `charcoal` | `#1C1C1C` | Tekst na jasnym; tło galerii/stopki |
| `gold` | `#B8864B` | Akcent ≤10%: linie, numeracja, gwiazdki, mikro-CTA |
| `gold-2` | `#a17738` | Hover złota |
| `dunajec` | `#3A5F7D` | Rzadki akcent chłodny (mapy/woda) |

Strategia: **Committed** — zieleń lasu niesie tożsamość (hero grade, opinie, karty kontaktu); złoto tylko jako nić przewodnia. Nigdy czysta czerń/biel — zawsze tinted.

## Typography

- **Display / nagłówki:** Cormorant Garamond 400–600 (kursywa tylko jako pojedynczy akcent w nagłówku, nie w każdym). Skala płynna `clamp()`, ratio ≥1.3.
- **Body / UI:** Manrope 400–700; body 16–17 px, line-height 1.7; maks. 70ch.
- **Liczby / metadane:** JetBrains Mono — wyłącznie funkcyjnie (odległości, numeracja, liczniki), nigdy jako „kostium".
- Eyebrow: Manrope 500, tracking 0.22em, uppercase, 11–12 px, z numerem sekcji („02 — O obiekcie").

## Layout

- Kontener max-w 1440, gutters 24/48; siatka 12-kolumnowa, kompozycje asymetryczne (5/7, 4/8).
- Rytm pionowy zróżnicowany: sekcje 96–160 px; nie każda sekcja tej samej wysokości.
- Zdjęcia pełnokrwiste (aspect-ratio stałe, `object-cover`), zaokrąglenie `rounded-sm` (2 px) — kanciasto, po góralsku, bez kart-bąbelków.

## Elevation & Texture

- Ziarno `grain` (SVG turbulence, mix-blend overlay) na ciemnych planszach — filmowość.
- Cienie tylko na hover kart (`card-lift`) i primary CTA; poza tym płasko.
- Hairlines gradientowe zamiast pełnych borderów.

## Motion

- Easing globalny: `cubic-bezier(0.22, 1, 0.36, 1)` (quint-out). Czas 0.7–1.0 s reveal, 2.4 s settle zdjęcia hero.
- Wejście hero: foto scale 1.06→1 + stagger linii nagłówka (80 ms kroki).
- Scroll reveals: IntersectionObserver dodaje `.in`; elementy startują `opacity 0 / translateY(24px)`. Działa TYLKO gdy JS ustawi `data-anim` na `<html>` — prerender i no-JS pokazują wszystko od razu.
- `prefers-reduced-motion: reduce` wyłącza wszystko (transition: none).
- Zakazy: transition-all na przyciskach; animowanie layoutu; parallax > 0.15 delty.

## Components

- **Button primary** (`btn-prim`): forest→cream tekst, pill, hover translateY(-2px) + poświata złota; zawsze `whitespace-nowrap shrink-0`.
- **Button ghost**: obrys cream/charcoal wg tła.
- **Eyebrow z numerem**: `01 — Etykieta` + linia złota 32 px.
- **Karta zdjęciowa**: `card-lift` + `zoom-img` (scale 1.06, 1.2 s).
- **Formularz**: pola liniowe (border-b), focus = złoty underline; natywne date/select ostylowane (`color-scheme`, custom chevron).
