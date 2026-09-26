#!/usr/bin/env python3
"""Miniatury zdjęć do siatek i kart: src/assets/miniatury/<nazwa>-640.webp i -1280.webp.

Po co: kafelek galerii ma na ekranie 330–670 px szerokości, a pełne zdjęcie
1800–2400 px i 300–560 KB. Przeglądarka dostaje przez srcset miniaturę pasującą
do kafelka, a pełny plik dopiero w powiększeniu (lightbox) na dużym ekranie.

Uruchamiać po dodaniu lub podmianie zdjęcia w src/assets/:

    python3 scripts/miniatury.py

Wymaga Pillow (pip install Pillow). Pomija logo-* i hero-*. Plik, którego
miniatura jest nowsza od źródła, pomija. Zapisuje też wymiary.json z wymiarami
oryginałów (atrybuty width/height i opis srcset). Zdjęcie bez miniatury nadal
działa — komponent pokazuje wtedy pełny plik.

Tylko zdjęcia bez przezroczystości: konwersja do RGB spłaszcza kanał alfa.
"""
import json
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
ASSETS = ROOT / 'src' / 'assets'
OUT = ASSETS / 'miniatury'
SZEROKOSCI = (640, 1280)
JAKOSC = 78


def main():
    OUT.mkdir(exist_ok=True)
    wymiary = {}
    nowe = 0
    for src in sorted(ASSETS.glob('*.webp')):
        if src.name.startswith(('logo-', 'hero-')):
            continue
        with Image.open(src) as im:
            w, h = im.size
            wymiary[src.stem] = [w, h]
            for tw in SZEROKOSCI:
                if tw >= w:
                    continue  # nie powiększamy
                dst = OUT / f'{src.stem}-{tw}.webp'
                if dst.exists() and dst.stat().st_mtime >= src.stat().st_mtime:
                    continue
                im.convert('RGB').resize((tw, round(h * tw / w)), Image.LANCZOS) \
                  .save(dst, 'WEBP', quality=JAKOSC, method=6)
                nowe += 1
    linie = [f'  {json.dumps(k)}: [{w}, {h}]' for k, (w, h) in sorted(wymiary.items())]
    (OUT / 'wymiary.json').write_text('{\n' + ',\n'.join(linie) + '\n}\n')
    print(f'{len(wymiary)} zdjęć, nowych miniatur: {nowe}')


if __name__ == '__main__':
    main()
