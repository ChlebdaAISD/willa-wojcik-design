#!/usr/bin/env python3
"""Generacja koncepcji monogramu WW dla Willi Wójcik przez API Magnific.

Klucz: ~/.config/magnific/token (prefiks MS…), nagłówek x-magnific-api-key.
Wszystkie endpointy są ASYNC: POST -> data.task_id -> GET aż status=COMPLETED
ORAZ generated niepuste (status potrafi wskoczyć na COMPLETED zanim URL się pojawi).

TRZY PUŁAPKI zweryfikowane 14.09.2026:
1. WAF (Akamai) blokuje domyślny User-Agent `Python-urllib/3.x` — 403 "Penalty Box for WAF".
   Ten sam request z UA `curl/8.7.1` przechodzi. Stąd jawny nagłówek User-Agent.
2. API po cichu IGNORUJE nieznane pola w body (negative_prompt, num_images na części
   silników) — żadnego błędu, po prostu nic nie robi. Negatywy doklejamy do treści promptu.
3. Enumy różnią się per silnik; POST z błędną wartością zwraca 400 z pełną listą dozwolonych.

Użycie:
  python3 generate.py prompts.json --out out
  python3 generate.py prompts.json --out out --models nano-banana-pro,gpt-image-2
  python3 generate.py prompts.json --only serif-interlock
  python3 generate.py --harvest harvest.json --out out      # odbiór osieroconych task_id
"""
from __future__ import annotations

import argparse
import json
import os
import subprocess
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

BASE = "https://api.magnific.com/v1/ai"
TOKEN = Path.home() / ".config/magnific/token"
UA = "curl/8.7.1"  # NIE usuwać — domyślne Python-urllib leci w WAF, patrz docstring

ENGINES = {
    "nano-banana-pro": {
        "_path": "text-to-image/nano-banana-pro",
        "aspect_ratio": "1:1", "resolution": "2K",
    },
    "gpt-image-2": {
        "_path": "text-to-image/gpt-image-2",
        "aspect_ratio": "square_1_1", "quality": "high", "num_images": 2,
    },
    "seedream-v5-pro": {
        "_path": "text-to-image/seedream-v5-pro",
        "aspect_ratio": "square_1_1", "resolution": "2k",
    },
    "flux-2-pro": {
        "_path": "text-to-image/flux-2-pro",
        "width": 1440, "height": 1440,
    },
    "mystic-fluid": {
        # Mystic z model=fluid — do płaskiej grafiki; realism robi z tego rozmytą fotkę.
        "_path": "mystic",
        "aspect_ratio": "square_1_1", "resolution": "2k",
        "model": "fluid", "creative_detailing": 15, "adherence": 65,
    },
}


def key() -> str:
    if os.environ.get("MAGNIFIC"):
        return os.environ["MAGNIFIC"].strip()
    if TOKEN.exists():
        return TOKEN.read_text().strip()
    sys.exit(f"Brak klucza: ustaw MAGNIFIC albo {TOKEN}")


def call(method, url, body=None, tries=6):
    """Transport przez PRAWDZIWEGO curla, nie urllib.

    WAF Magnifica (Akamai) odrzuca urllib: domyślny UA `Python-urllib/3.x` leci w 403
    natychmiast, a podszycie się pod `User-Agent: curl` przy pythonowym handshake TLS
    daje niezgodność UA i JA3 — czyli jeszcze mocniejszy sygnał bota, blokowany po kilku
    requestach ("Penalty Box for WAF"). curl jako podproces ma spójny fingerprint.
    """
    cmd = ["curl", "-sS", "-X", method, url,
           "-H", f"x-magnific-api-key: {key()}",
           "-H", "Accept: application/json",
           "--max-time", "120", "-w", "\n%{http_code}"]
    if body is not None:
        cmd += ["-H", "Content-Type: application/json", "-d", json.dumps(body)]
    for attempt in range(tries):
        proc = subprocess.run(cmd, capture_output=True, text=True)
        raw = proc.stdout.rsplit("\n", 1)
        if len(raw) != 2 or not raw[1].strip().isdigit():
            if attempt < tries - 1:
                time.sleep(8)
                continue
            raise RuntimeError(f"curl: {proc.stderr[:200] or proc.stdout[:200]}")
        payload, code = raw[0], int(raw[1])
        if code < 300:
            return json.loads(payload)
        if code in (403, 429) and attempt < tries - 1:
            wait = 45 * (2 ** attempt)
            print(f"    … {code}, czekam {wait}s", flush=True)
            time.sleep(wait)
            continue
        raise RuntimeError(f"HTTP {code}: {payload[:300]}")
    raise RuntimeError("wyczerpane próby")


def full_prompt(p):
    text = p["prompt_en"].strip()
    neg = (p.get("negative_en") or "").strip().rstrip(".")
    return f"{text}\n\nAbsolutely avoid: {neg}." if neg else text


def submit(engine, prompt):
    cfg = {k: v for k, v in ENGINES[engine].items() if not k.startswith("_")}
    res = call("POST", f"{BASE}/{ENGINES[engine]['_path']}", {"prompt": full_prompt(prompt), **cfg})
    return res["data"]["task_id"]


def download(url, dest):
    subprocess.run(["curl", "-sS", "-L", "--max-time", "240", "-o", str(dest), url], check=True)
    return dest.stat().st_size


def harvest(jobs, out, timeout=900):
    """Polling round-robin — jedno zawieszone zadanie nie blokuje odbioru reszty."""
    pending, made, failed = list(jobs), [], []
    deadline = time.time() + timeout
    while pending and time.time() < deadline:
        still = []
        for pid, engine, tid in pending:
            try:
                d = call("GET", f"{BASE}/{ENGINES[engine]['_path']}/{tid}", tries=3)["data"]
                time.sleep(2)  # polling też wlicza się do limitu WAF
            except Exception as exc:
                failed.append((pid, engine, str(exc)))
                continue
            if d["status"] == "COMPLETED" and d.get("generated"):
                for i, u in enumerate(d["generated"]):
                    suffix = f"-{i + 1}" if len(d["generated"]) > 1 else ""
                    dest = out / f"{pid}__{engine}{suffix}.png"
                    size = download(u, dest)
                    made.append(dest.name)
                    print(f"  ✓ {dest.name}  ({size // 1024} KB)", flush=True)
            elif d["status"] == "FAILED":
                failed.append((pid, engine, f"FAILED: {d.get('error')}"))
                print(f"  ✗ {pid} / {engine}: FAILED", flush=True)
            else:
                still.append((pid, engine, tid))
        pending = still
        if pending:
            time.sleep(8)
    for pid, engine, tid in pending:
        failed.append((pid, engine, f"timeout, task_id={tid}"))
    return made, failed


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("prompts", type=Path, nargs="?")
    ap.add_argument("--out", type=Path, default=Path("out"))
    ap.add_argument("--models", default=",".join(ENGINES))
    ap.add_argument("--only", default="")
    ap.add_argument("--delay", type=float, default=25.0,
                    help="przerwa między zleceniami; poniżej ~20 s WAF wrzuca w penalty box")
    ap.add_argument("--harvest", type=Path, help="JSON [[id, engine, task_id], …] — sam odbiór")
    ap.add_argument("--submit-only", action="store_true",
                    help="tylko zleć i zapisz task_id do out/_tasks.json; odbiór osobnym wywołaniem")
    a = ap.parse_args()
    a.out.mkdir(parents=True, exist_ok=True)

    if a.harvest:
        jobs = [tuple(j) for j in json.loads(a.harvest.read_text())]
        print(f"Odbieram {len(jobs)} osieroconych zadań…\n", flush=True)
    else:
        if not a.prompts:
            sys.exit("Podaj plik z promptami albo --harvest")
        prompts = json.loads(a.prompts.read_text())
        if a.only:
            wanted = {s.strip() for s in a.only.split(",")}
            prompts = [p for p in prompts if p["id"] in wanted]
        engines = [m.strip() for m in a.models.split(",") if m.strip()]
        for m in engines:
            if m not in ENGINES:
                sys.exit(f"Nieznany silnik: {m}. Dostępne: {', '.join(ENGINES)}")

        store = a.out / "_tasks.json"
        jobs, failed_submit = [], []
        first = True
        for p in prompts:
            for e in engines:
                if not first:
                    time.sleep(a.delay)
                first = False
                try:
                    tid = submit(e, p)
                    jobs.append((p["id"], e, tid))
                    prev = json.loads(store.read_text()) if store.exists() else []
                    store.write_text(json.dumps(prev + [[p["id"], e, tid]], indent=2))
                    print(f"  → {p['id']:24s} {e:16s} {tid}", flush=True)
                except Exception as exc:
                    failed_submit.append((p["id"], e, str(exc)))
                    print(f"  ✗ {p['id']:24s} {e:16s} {exc}", flush=True)
        # task_id-y na dysk ZANIM zaczniemy czekać — inaczej przerwany polling
        # gubi (opłacone) zadania bezpowrotnie
        print(f"\nZlecone: {len(jobs)}, odrzucone: {len(failed_submit)}.", flush=True)
        if a.submit_only:
            print(f"task_id zapisane w {a.out / '_tasks.json'} — odbiór: "
                  f"python3 generate.py --harvest {a.out / '_tasks.json'} --out {a.out}")
            return
        print("Czekam…\n", flush=True)

    made, failed = harvest(jobs, a.out)
    print(f"\nGotowe: {len(made)} plików w {a.out}/")
    if failed:
        print(f"Nieudane ({len(failed)}):")
        for pid, e, why in failed:
            print(f"  - {pid} / {e}: {why[:140]}")


if __name__ == "__main__":
    main()
