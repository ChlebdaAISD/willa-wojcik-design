#!/usr/bin/env python3
"""Arkusz podglądowy wygenerowanych monogramów — jeden HTML, siatka wg kierunku i silnika.

Każdy znak pokazany na kremie i na zieleni lasu (kontrola kontrastu w obu trybach)
oraz w miniaturze 32 px (test favicona — tu odpada większość „ładnych" koncepcji).

  python3 contact-sheet.py --out out --prompts prompts.json > index.html
"""

from __future__ import annotations
import argparse
import base64
import json
import subprocess
from pathlib import Path

CSS = """
:root { --forest:#1F3A2E; --cream:#F5F1E8; --gold:#B8864B; --charcoal:#1C1C1C; --stone:#D9CFBF; }
* { box-sizing: border-box; }
body { margin:0; background:var(--cream); color:var(--charcoal);
       font:15px/1.6 "Manrope", system-ui, sans-serif; }
header { padding:48px 32px 24px; border-bottom:1px solid rgba(28,28,28,.12); }
h1 { font-family:"Cormorant Garamond", Georgia, serif; font-weight:500;
     font-size:clamp(32px,5vw,56px); margin:0 0 8px; }
.sub { color:rgba(28,28,28,.6); max-width:70ch; }
section { padding:40px 32px; border-bottom:1px solid rgba(28,28,28,.12); }
h2 { font-family:"Cormorant Garamond", Georgia, serif; font-weight:500;
     font-size:30px; margin:0 0 4px; }
.eyebrow { font-size:11px; letter-spacing:.22em; text-transform:uppercase;
           color:var(--gold); font-weight:600; margin-bottom:10px; }
.concept { max-width:75ch; color:rgba(28,28,28,.72); margin:0 0 22px; }
.grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:20px; }
.card { border:1px solid rgba(28,28,28,.14); background:#fff; overflow:hidden; }
.card .name { font-size:11px; letter-spacing:.12em; text-transform:uppercase;
              padding:8px 10px; background:var(--stone); color:var(--charcoal); }
.pair { display:grid; grid-template-columns:1fr 1fr; }
.pair div { aspect-ratio:1; display:grid; place-items:center; }
.pair .on-cream { background:var(--cream); }
.pair .on-forest { background:var(--forest); }
.pair img { width:100%; height:100%; object-fit:contain; }
.fav { display:flex; align-items:center; gap:10px; padding:8px 10px;
       border-top:1px solid rgba(28,28,28,.1); font-size:11px; color:rgba(28,28,28,.55); }
.fav img { width:32px; height:32px; object-fit:contain; border:1px solid rgba(28,28,28,.12); }
details { margin-top:14px; font-size:13px; }
summary { cursor:pointer; color:var(--gold); font-weight:600; }
pre { white-space:pre-wrap; background:#fff; border:1px solid rgba(28,28,28,.12);
      padding:14px; font:12px/1.55 "JetBrains Mono", monospace; overflow-x:auto; }
@media (max-width:520px){ section,header{padding-left:18px;padding-right:18px;} }
"""


THUMBS = Path(".thumbs")


def data_uri(p: Path) -> str:
    """Miniatura zamiast oryginału — 35 plików po 2–4 MB w base64 dałoby HTML nie do otwarcia.
    sips jest wbudowany w macOS, więc nie dokładamy zależności (Pillow nie jest tu zainstalowany)."""
    THUMBS.mkdir(exist_ok=True)
    thumb = THUMBS / p.name
    if not thumb.exists() or thumb.stat().st_mtime < p.stat().st_mtime:
        subprocess.run(["sips", "-Z", "560", str(p), "--out", str(thumb)],
                       check=True, capture_output=True)
    return "data:image/png;base64," + base64.b64encode(thumb.read_bytes()).decode()


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", type=Path, default=Path("out"))
    ap.add_argument("--prompts", type=Path, default=Path("prompts.json"))
    a = ap.parse_args()

    prompts = {p["id"]: p for p in json.loads(a.prompts.read_text())}
    files = sorted(a.out.glob("*.png"))
    by_id: dict[str, list[Path]] = {}
    for f in files:
        by_id.setdefault(f.stem.split("__")[0], []).append(f)

    out = [f"<!doctype html><meta charset=utf-8><title>Monogram WW — Willa Wójcik</title>",
           "<link rel='preconnect' href='https://fonts.googleapis.com'>",
           "<link rel='stylesheet' href='https://fonts.googleapis.com/css2?"
           "family=Cormorant+Garamond:wght@400;500&family=Manrope:wght@400;600&"
           "family=JetBrains+Mono&display=swap'>",
           f"<style>{CSS}</style>",
           "<header><h1>Monogram <span style='font-style:italic'>WW</span></h1>",
           "<p class=sub>Koncepcje znaku dla Willi Wójcik — sześć kierunków projektowych, "
           "każdy wygenerowany kilkoma modelami. Każdy znak pokazany na kremie i na zieleni "
           "lasu, obok miniatura 32 px (test favicona).</p></header>"]

    for pid, imgs in by_id.items():
        meta = prompts.get(pid, {})
        out.append("<section>")
        out.append(f"<div class=eyebrow>{pid}</div>")
        out.append(f"<h2>{meta.get('name_pl', pid)}</h2>")
        if meta.get("concept_pl"):
            out.append(f"<p class=concept>{meta['concept_pl']}</p>")
        out.append("<div class=grid>")
        for f in sorted(imgs):
            uri = data_uri(f)
            engine = f.stem.split("__", 1)[1]
            out.append(
                f"<div class=card><div class=name>{engine}</div>"
                f"<div class=pair><div class=on-cream><img src='{uri}' alt=''></div>"
                f"<div class=on-forest><img src='{uri}' alt=''></div></div>"
                f"<div class=fav><img src='{uri}' alt=''><span>32 px — test favicona</span></div></div>")
        out.append("</div>")
        if meta.get("prompt_en"):
            out.append(f"<details><summary>Prompt</summary><pre>{meta['prompt_en']}\n\n"
                       f"NEGATYWY: {meta.get('negative_en','—')}</pre></details>")
        out.append("</section>")

    print("\n".join(out))


if __name__ == "__main__":
    main()
