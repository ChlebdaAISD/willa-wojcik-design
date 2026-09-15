#!/usr/bin/env python3
"""Wycina logotyp Willi Wójcik z pliku dostarczonego przez właściciela.

Źródło (`better_logo.png`, 3072×2048) wygląda na plik z przezroczystym tłem, ale
przezroczystość jest **namalowana** — to zwykła szachownica w trybie RGB, bez kanału
alfa. Trzeba ją wyciąć samemu.

Robi się to łatwo, bo szachownica jest neutralna (R=G=B), a logotyp złoty: różnica
R−B rozdziela je niemal bezbłędnie. Na półprzezroczystych krawędziach odejmujemy kolor
tła (un-premultiply), inaczej obwódki liter zostają rozjaśnione szarością i na ciemnej
stopce widać wokół znaku poświatę.

Poprzednia wersja skryptu wycinała logo z `hero_from_owner.jpeg` (wtopione w niebo,
~640 px szerokości). To źródło jest lepsze pod każdym względem — tamta ścieżka została
porzucona 15.09.2026.

    python3 scripts/extract-logo.py

Wyniki: src/assets/logo-mark.png|.webp (sam sygnet: góry, dach, okno) oraz
logo-lockup.png|.webp (całość z podpisem i ornamentem).
"""
from __future__ import annotations

import subprocess
import sys
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "src/assets/better_logo.png"
OUT = ROOT / "src/assets"

# Kadry zmierzone na oryginale 3072×2048 profilem maski złota.
# Sygnet celowo węższy niż pas gór: na wysokości ich podnóża biegną w lewo i w prawo
# cienkie kreski, które należą do pełnego lockupu, a w samym znaku byłyby myślnikami.
CROPS = {
    # Kreski boczne kończą się na x 686 i zaczynają na x 2389 — kadr musi zmieścić się
    # między nimi, inaczej przy prawej krawędzi sygnetu zostaje ogryzek poziomej linii.
    "logo-mark":   (700, 230, 2380, 820),
    "logo-lockup": (40, 230, 3045, 1870),
}
ALPHA_LO, ALPHA_HI = 10, 70   # próg „złotości" (R−B); szachownica ma R−B ≈ 0
# Sygnet wyświetla się na 32 px wysokości (ok. 96 px szerokości), lockup na maks. 215 px.
# Trzykrotny zapas wystarcza na każdy realny DPR — reszta to tylko waga pliku.
MAX_WIDTH = {"logo-mark": 480, "logo-lockup": 900}


def extract(source: Image.Image, name: str, box) -> Image.Image:
    a = np.asarray(source.crop(box)).astype(np.float32)
    alpha = np.clip((a[..., 0] - a[..., 2] - ALPHA_LO) / (ALPHA_HI - ALPHA_LO), 0, 1)

    # Tło = mediana pikseli szachownicy. Ma dwa odcienie szarości, więc jedna wartość
    # zostawia na krawędziach błąd rzędu ±16/kanał — niewidoczny w docelowej skali.
    sky = a[alpha < 0.02]
    if len(sky):
        bg = np.median(sky, axis=0)
    else:
        # Kadr bez ani jednego piksela tła = źle dobrany CROPS. Zgadujemy średnią szarość
        # szachownicy, ale krzyczymy, bo inaczej wynik jest tylko „lekko nie taki".
        print(f"UWAGA: {name} — kadr nie zawiera tła, zgaduję kolor 163/163/163",
              file=sys.stderr)
        bg = np.array([163.0, 163.0, 163.0], np.float32)

    al = alpha[..., None]
    fg = np.where(al > 0.02, (a - (1 - al) * bg) / np.maximum(al, 0.02), a)
    rgba = np.concatenate([np.clip(fg, 0, 255), al * 255], axis=2).astype(np.uint8)
    img = Image.fromarray(rgba, "RGBA")
    bbox = img.getbbox()
    if bbox is None:
        raise SystemExit("Kadr pusty po wycięciu tła — sprawdź CROPS albo ALPHA_LO/ALPHA_HI")
    return img.crop(bbox)


def main() -> None:
    if not SRC.exists():
        raise SystemExit(f"Brak pliku źródłowego: {SRC}")
    source = Image.open(SRC).convert("RGB")
    for name, box in CROPS.items():
        img = extract(source, name, box)
        cap = MAX_WIDTH[name]
        if img.width > cap:
            img = img.resize((cap, round(cap * img.height / img.width)), Image.LANCZOS)
        png = OUT / f"{name}.png"
        img.save(png)
        try:
            subprocess.run(["cwebp", "-q", "92", "-alpha_q", "100", str(png),
                            "-o", str(OUT / f"{name}.webp")], check=True, capture_output=True)
        except FileNotFoundError:
            raise SystemExit("Brak cwebp — zainstaluj: brew install webp") from None
        except subprocess.CalledProcessError as e:
            raise SystemExit(f"cwebp padł na {png.name}: "
                             f"{e.stderr.decode(errors='replace')[:200]}") from None
        # UWAGA: wymiary poniżej są wpisane na sztywno w atrybutach width/height
        # w src/components/Nav.jsx (sygnet) i src/components/Footer.jsx (lockup).
        # Po zmianie CROPS albo MAX_WIDTH trzeba je tam zaktualizować — inaczej
        # przeglądarka rezerwuje złe proporcje i wraca skok layoutu (CLS).
        print(f"{name}: {img.width}×{img.height}  "
              f"png {png.stat().st_size // 1024} KB, "
              f"webp {(OUT / f'{name}.webp').stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
