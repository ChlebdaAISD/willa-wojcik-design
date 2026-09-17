#!/usr/bin/env python3
"""Kontrola siatek zdjęć: dziury w układzie i piony w szerokich kafelkach.

Po co: `GalleryGrid` używa CSS Grid z auto-placementem BEZ `dense`. Kursor
układania nigdy się nie cofa, więc kafelek 2×2 blokuje dwa rzędy w swoich
kolumnach — jeżeli kolejne zdjęcia nie domkną obu tych rzędów, zostaje pusty
prostokąt, którego nic już nie zapełni. Sama suma komórek podzielna przez 4
tego NIE wykrywa: 16.09.2026 pięć kategorii miało poprawną sumę i mimo to
dziury na stronie.

Druga kontrola: zdjęcie pionowe w kafelku `col-span-2` (szerokim) jest
przycinane po bokach — wolno je wstawiać tylko w kafelek kwadratowy.

Użycie:  python3 scripts/sprawdz-siatke.py     (kod wyjścia 1, gdy coś nie gra)
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
ASSETS = ROOT / "src/assets"
KOLUMN = 4


def uloz(elementy, kolumn=KOLUMN):
    """Auto-placement CSS Grid, sparse packing. Zwraca (pozycje, wysokość, dziury)."""
    zajete: dict[tuple[int, int], bool] = {}
    kur_r = kur_c = 0
    pozycje = []
    for w, h in elementy:
        r, c = kur_r, kur_c
        while True:
            if c + w > kolumn:
                r, c = r + 1, 0
                continue
            if all((r + dr, c + dc) not in zajete for dr in range(h) for dc in range(w)):
                break
            c += 1
        for dr in range(h):
            for dc in range(w):
                zajete[(r + dr, c + dc)] = True
        pozycje.append((r, c, w, h))
        kur_r, kur_c = r, c + w
        if kur_c >= kolumn:
            kur_r, kur_c = kur_r + 1, 0
    wys = max((r + h for r, c, w, h in pozycje), default=0)
    dziury = [(r, c) for r in range(wys) for c in range(kolumn) if (r, c) not in zajete]
    return pozycje, wys, dziury


def rysuj(pozycje, wys, kolumn=KOLUMN):
    siatka = [["."] * kolumn for _ in range(wys)]
    for i, (r, c, w, h) in enumerate(pozycje):
        for dr in range(h):
            for dc in range(w):
                siatka[r + dr][c + dc] = chr(ord("a") + i % 26)
    return "\n".join("      " + " ".join(row) for row in siatka)


def ksztalt(linia):
    if "SPAN_2x2" in linia or "row-span-2" in linia:
        return (2, 2)
    if "SPAN_2" in linia or "col-span-2" in linia:
        return (2, 1)
    return (1, 1)


def main():
    content = (ROOT / "src/data/content.js").read_text()
    galeria = (ROOT / "src/pages/Galeria.jsx").read_text()
    importy = dict(re.findall(r"import (\w+) from '\.\./assets/([\w.-]+)'", content))

    def pion(ident):
        plik = importy.get(ident)
        if not plik or not (ASSETS / plik).exists():
            return False
        im = Image.open(ASSETS / plik)
        return im.height > im.width

    def zdjecia_grupy(nazwa):
        wzor = (r"export const ROOMS = \{[\s\S]*?photos: \[\n([\s\S]*?)\n  \],"
                if nazwa == "ROOMS"
                else rf"id: '{nazwa}',[\s\S]*?photos: \[\n([\s\S]*?)\n    \],")
        blok = re.search(wzor, content).group(1)
        return [(i, l.strip()) for l, i in
                ((l, re.match(r"\{ src: (\w+),", l.strip()).group(1))
                 for l in blok.split("\n") if l.strip().startswith("{"))]

    grupy = {n: zdjecia_grupy(n) for n in
             ("apartament-1", "apartament-2", "apartament-3", "ROOMS")}
    alias = {"AP1": "apartament-1", "AP2": "apartament-2", "AP3": "apartament-3", "ROOMS": "ROOMS"}

    problemy = 0

    def sprawdz(nazwa, pary):
        nonlocal problemy
        _, wys, dziury = uloz([ksztalt(l) for _, l in pary])
        pozycje = uloz([ksztalt(l) for _, l in pary])[0]
        zle_kadry = [i for i, l in pary if pion(i) and ksztalt(l) == (2, 1)]
        ok = not dziury and not zle_kadry
        print(f"  {nazwa:<26} {len(pary):>2} zdjęć, {wys} rzędów — {'OK' if ok else 'BŁĄD'}")
        if dziury:
            problemy += 1
            print(f"    {len(dziury)} pustych komórek w układzie:")
            print(rysuj(pozycje, wys))
        for i in zle_kadry:
            problemy += 1
            print(f"    zdjęcie pionowe w szerokim kafelku: {i}")

    print("GALERIA (/galeria)")
    for kat, blok in re.findall(
            r"id: '([a-z0-9]+)',\s*\n\s*label: '[^']+',[\s\S]*?photos: \[\n([\s\S]*?)\n    \],", galeria):
        pary = []
        for linia in (l.strip() for l in blok.split("\n")):
            if m := re.match(r"\{ src: PHOTOS\.(\w+)", linia):
                pary.append((m.group(1), linia))
            elif m := re.match(r"tile\(foto\((\w+), (\d+)\)", linia):
                pary.append((grupy[alias[m.group(1)]][int(m.group(2))][0], linia))
        sprawdz(kat, pary)

    print("\nPODSTRONY JEDNOSTEK")
    for nazwa, pary in grupy.items():
        sprawdz(nazwa, pary)

    print("\n" + ("Wszystkie siatki w porządku." if not problemy
                  else f"Do poprawy: {problemy}"))
    return 1 if problemy else 0


if __name__ == "__main__":
    sys.exit(main())
