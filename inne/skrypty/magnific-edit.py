#!/usr/bin/env python3
"""Edycja istniejącego obrazu przez Magnific (model `nano-banana-pro`).

Do czego: usunięcie pojedynczego obiektu z gotowej grafiki, bez ruszania reszty kadru.
Tą drogą zdjęto logo z nieba na `hero-owner-clean.webp` (15.09.2026), a 17.09.2026
osprzęt z dachu na prośbę właściciela.

Pułapki (wszystkie zweryfikowane, patrz pamięć `reference_magnific_*`):
  * WAF Akamai odrzuca `Python-urllib` — transport idzie przez PRAWDZIWEGO curla.
    Stąd import `call`/`download` z `logo/generate.py`, zamiast własnego urllib.
  * `reference_images` dla `nano-banana-pro` to lista OBIEKTÓW {image, mime_type};
    modele `*-edit` biorą listę gołych stringów. Pomylenie kształtu = 400.
  * Rate limit jest karny (~9 min od OSTATNIEJ próby), więc `task_id` zapisujemy
    na dysk NATYCHMIAST po zleceniu — przerwany przebieg inaczej gubi opłacone zadanie.
  * `status` potrafi wskoczyć na COMPLETED, zanim pojawi się URL — czekamy też
    na niepuste `generated`.

Użycie:
  python3 scripts/magnific-edit.py <plik-wejściowy> <plik-wyjściowy> --prompt "…"
  python3 scripts/magnific-edit.py --odbierz <task_id> <plik-wyjściowy>
"""
from __future__ import annotations

import argparse
import base64
import importlib.util
import io
import json
import sys
import time
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
_spec = importlib.util.spec_from_file_location("mgen", ROOT / "logo/generate.py")
mgen = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(mgen)          # daje call(), download(), key()

SCIEZKA = "text-to-image/nano-banana-pro"
BASE = mgen.BASE


def na_base64(p: Path, max_bok=2048) -> str:
    im = Image.open(p).convert("RGB")
    im.thumbnail((max_bok, max_bok), Image.LANCZOS)
    buf = io.BytesIO()
    im.save(buf, "JPEG", quality=94)
    return base64.b64encode(buf.getvalue()).decode()


def zlec(wejscie: Path, prompt: str, aspect: str, res: str) -> str:
    body = {
        "prompt": prompt,
        "reference_images": [{"image": na_base64(wejscie), "mime_type": "image/jpeg"}],
        "aspect_ratio": aspect,
        "resolution": res,
    }
    res_json = mgen.call("POST", f"{BASE}/{SCIEZKA}", body)
    tid = res_json["data"]["task_id"]
    # NATYCHMIASTOWY zapis — patrz docstring
    (ROOT / "scripts/.magnific-ostatni-task").write_text(
        json.dumps({"task_id": tid, "wejscie": str(wejscie), "prompt": prompt}, ensure_ascii=False))
    print(f"  zlecone, task_id = {tid}")
    return tid


def odbierz(tid: str, wyjscie: Path, timeout=900) -> Path:
    koniec = time.time() + timeout
    while time.time() < koniec:
        d = mgen.call("GET", f"{BASE}/{SCIEZKA}/{tid}", tries=4)["data"]
        stan = d.get("status")
        if stan == "COMPLETED" and d.get("generated"):
            url = d["generated"][0]
            rozmiar = mgen.download(url, wyjscie)
            print(f"  odebrane: {wyjscie}  ({rozmiar // 1024} KB)")
            return wyjscie
        if stan == "FAILED":
            sys.exit(f"  zadanie nieudane: {d.get('error')}")
        print(f"    … status {stan}, czekam", flush=True)
        time.sleep(12)
    sys.exit(f"  przekroczony czas; task_id = {tid} (odbierz później: --odbierz {tid})")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("wejscie", nargs="?")
    ap.add_argument("wyjscie")
    ap.add_argument("--prompt")
    ap.add_argument("--odbierz", metavar="TASK_ID")
    ap.add_argument("--aspect", default="16:9")
    ap.add_argument("--res", default="2K")
    a = ap.parse_args()

    cel = Path(a.wyjscie)
    if a.odbierz:
        odbierz(a.odbierz, cel)
        return
    if not a.wejscie or not a.prompt:
        sys.exit("Podaj plik wejściowy i --prompt (albo --odbierz TASK_ID)")
    tid = zlec(Path(a.wejscie), a.prompt, a.aspect, a.res)
    time.sleep(20)          # limit WAF: nie pollujemy od razu po zleceniu
    odbierz(tid, cel)


if __name__ == "__main__":
    main()
