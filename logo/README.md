# Monogram WW — Willa Wójcik

Brief klienta: *„Logo to najlepiej jakieś dwie Litery WW jedna w drugiej jakoś tak."*

## Co tu leży

| Plik | Rola |
|---|---|
| `prompts.json` | 7 promptów (6 kierunków + kontrolny), format wejściowy generatora |
| `prompts-full.json` | to samo + oceny krytyka i opis geometrii (`geometry_pl`, `risk_pl`) |
| `generate.py` | generacja przez API Magnific, 5 silników |
| `contact-sheet.py` | składa `index.html` — siatka wyników na kremie i na zieleni + miniatura 32 px |
| `out/` | wygenerowane PNG, nazwa `<id-promptu>__<silnik>.png` |

## Jak odpalić

```bash
python3 generate.py prompts.json --out out                    # wszystko × wszystkie silniki
python3 generate.py prompts.json --out out --only signet-seal # jeden kierunek
python3 generate.py prompts.json --models nano-banana-pro     # jeden silnik
python3 contact-sheet.py --out out --prompts prompts.json > index.html
```

Klucz API czytany z `~/.config/magnific/token` (prefiks `MS…`) albo ze zmiennej `MAGNIFIC`.

## Pułapki API (zweryfikowane 14.09.2026)

- **Nieznane pola są ignorowane bez błędu.** `negative_prompt` nie działa na żadnym z tych
  silników — negatywy dokleja się do treści promptu (`full_prompt()`). To samo dotyczy
  `num_images` na nano-banana-pro i seedream (tylko gpt-image-2 realnie je obsługuje).
- **WAF wywala burst.** Ponad ~20 POST-ów bez przerwy → `HTTP 403 Penalty Box for WAF`
  na każdym kolejnym requeście, łącznie z pollingiem już zleconych zadań. Stąd `--delay`
  (domyślnie 4 s) i backoff 30/60/120 s.
- **Enumy różnią się per silnik.** `nano-banana-pro` chce `aspect_ratio: "1:1"` i
  `resolution: "2K"`, reszta `"square_1_1"` i `"2k"` (małe k), flux-2-pro w ogóle nie ma
  proporcji — tylko `width`/`height` ≤ 1440. Listę dozwolonych wartości najszybciej
  wyciągnąć POST-em z błędną wartością: 400 zwraca pełny enum.
- **Async wszędzie**: POST → `data.task_id` → GET aż `status == "COMPLETED"` **i**
  `generated` niepuste (status potrafi wskoczyć na COMPLETED, zanim URL się pojawi).

## Uwaga o statusie plików

PNG z `out/` to **koncepcje do wyboru kierunku, nie pliki produkcyjne**. Znak wybrany przez
klienta trzeba odrysować w wektorze (SVG) — dopiero wtedy działa favicon 32 px, haft,
tabliczka i jednokolorowe tłoczenie. Modele obrazkowe dają rastr z niedomkniętymi krzywymi
i drobnymi asymetriami, których nie widać w 2048 px, a które wychodzą przy skalowaniu.
