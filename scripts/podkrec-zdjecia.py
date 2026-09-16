#!/usr/bin/env python3
"""Delikatna korekcja kolorów zdjęć plenerowych Willi Wójcik.

Powód (feedback właścicielki, 16.09.2026): „zdjęcia z tą zielenią na zewnątrz są
brzydkie szarawe […] bo są nijakie". Telefon rejestruje zieleń trawy i tuj wyraźnie
mniej nasyconą, niż widzi ją oko — zwłaszcza przy pełnym słońcu i dużej połaci
jasnej kostki brukowej, która zaniża ekspozycję całego kadru.

Co robi, świadomie zachowawczo — to nieruchomość, nie plakat:
  1. VIBRANCE, nie saturacja. Podbija głównie piksele mało nasycone (gamma na S),
     więc niebo i elewacja nie robią się kreskówkowe.
  2. DODATKOWY podbicie tylko w paśmie zieleni (odcienie 60–170°), bo o zieleń
     był konkretny zarzut.
  3. Delikatne ocieplenie — zdjęcia mają lekko niebieski odcień z cienia.
  4. Odzyskanie czerni: rozciągnięcie poziomów tak, by najciemniejszy percentyl
     trafił w zero. Usuwa „mgiełkę", która najmocniej czyta się jako szarość.

Użycie:
  python3 scripts/podkrec-zdjecia.py --lista            # pokaż nasycenie wszystkich
  python3 scripts/podkrec-zdjecia.py plik1 plik2 ...    # popraw wskazane
  python3 scripts/podkrec-zdjecia.py --podglad plik     # zapisz porównanie przed/po
"""
from __future__ import annotations

import argparse
import subprocess
import sys
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
ASSETS = ROOT / "src/assets"

VIBRANCE = 0.68      # gamma na S: <1 podbija słabo nasycone mocniej niż mocno nasycone
ZIELEN = 1.22        # dodatkowy mnożnik nasycenia dla odcieni zieleni
CIEPLO = 1.022       # mnożnik kanału R (B odwrotnie) — zdejmuje niebieski nalot
CZERN_PCT = 0.4      # percentyl, który ma trafić w zero


def rgb_na_hsv(a):
    return np.asarray(Image.fromarray(a.astype(np.uint8), "RGB").convert("HSV")).astype(np.float32)


def nasycenie(p: Path) -> float:
    im = Image.open(p).convert("RGB"); im.thumbnail((240, 240))
    hsv = rgb_na_hsv(np.asarray(im))
    return float(hsv[..., 1].mean())


def popraw(im: Image.Image) -> Image.Image:
    a = np.asarray(im.convert("RGB")).astype(np.float32)

    # 1+2 — nasycenie w przestrzeni HSV
    hsv = rgb_na_hsv(a)
    h, s, v = hsv[..., 0], hsv[..., 1] / 255.0, hsv[..., 2]
    s_new = np.power(np.clip(s, 0, 1), VIBRANCE)
    zielen = (h >= 42) & (h <= 120)          # odcień 0-255 w PIL: ~60-170° koła barw
    s_new = np.where(zielen, s_new * ZIELEN, s_new)
    hsv_new = np.stack([h, np.clip(s_new, 0, 1) * 255, v], axis=2).astype(np.uint8)
    a = np.asarray(Image.fromarray(hsv_new, "HSV").convert("RGB")).astype(np.float32)

    # 3 — ocieplenie
    a[..., 0] *= CIEPLO
    a[..., 2] /= CIEPLO

    # 4 — odzyskanie czerni (na luminancji, żeby nie przesunąć balansu bieli)
    lum = 0.2126 * a[..., 0] + 0.7152 * a[..., 1] + 0.0722 * a[..., 2]
    czern = np.percentile(lum, CZERN_PCT)
    if czern > 2:
        a = (a - czern) * (255.0 / (255.0 - czern))

    return Image.fromarray(np.clip(a, 0, 255).astype(np.uint8), "RGB")


def zapisz_webp(im: Image.Image, cel: Path, jakosc=86):
    tmp = cel.with_suffix(".tmp.png")
    im.save(tmp)
    subprocess.run(["cwebp", "-q", str(jakosc), str(tmp), "-o", str(cel)],
                   check=True, capture_output=True)
    tmp.unlink()


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("pliki", nargs="*")
    ap.add_argument("--lista", action="store_true")
    ap.add_argument("--podglad", metavar="PLIK")
    ap.add_argument("--kopia", metavar="KATALOG", help="gdzie zapisać oryginały przed nadpisaniem")
    a = ap.parse_args()

    if a.lista:
        rows = sorted(((nasycenie(p), p.name) for p in ASSETS.glob("*.webp")), key=lambda r: r[0])
        for s, n in rows:
            print(f"  {s:5.1f}  {n}")
        return

    if a.podglad:
        p = ASSETS / a.podglad
        przed = Image.open(p).convert("RGB")
        po = popraw(przed)
        w = 760
        przed.thumbnail((w, w)); po.thumbnail((w, w))
        out = Image.new("RGB", (przed.width * 2 + 12, przed.height), (255, 255, 255))
        out.paste(przed, (0, 0)); out.paste(po, (przed.width + 12, 0))
        cel = Path("/tmp/podglad.png") if not a.kopia else Path(a.kopia) / f"podglad-{p.stem}.png"
        out.save(cel); print("zapisano", cel)
        return

    if not a.pliki:
        sys.exit("Podaj pliki albo --lista / --podglad")
    for nazwa in a.pliki:
        p = ASSETS / nazwa
        if not p.exists():
            print(f"  BRAK {nazwa}"); continue
        przed = Image.open(p).convert("RGB")
        if a.kopia:
            Path(a.kopia).mkdir(parents=True, exist_ok=True)
            przed.save(Path(a.kopia) / f"{p.stem}-przed.png")
        po = popraw(przed)
        if a.kopia:
            po.save(Path(a.kopia) / f"{p.stem}-po.png")
        zapisz_webp(po, p)
        print(f"  poprawione: {nazwa}  (nasycenie {nasycenie(p):.1f})")


if __name__ == "__main__":
    main()
