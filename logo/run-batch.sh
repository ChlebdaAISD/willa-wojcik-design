#!/bin/bash
# Czeka aż WAF Magnifica zwolni, potem zleca podaną partię w wolnym tempie.
# Rate limit jest agresywny (token bucket): po serii szybkich requestów wpadamy
# w penalty box na ~9 min, więc najpierw sondujemy, a potem trzymamy 60 s odstępu.
cd "$(dirname "$0")"
KEY=$(cat ~/.config/magnific/token)
for i in $(seq 1 45); do
  code=$(curl -s -o /dev/null -w "%{http_code}" -X POST \
    "https://api.magnific.com/v1/ai/text-to-image/nano-banana-pro" \
    -H "x-magnific-api-key: $KEY" -H "Content-Type: application/json" -d '{}')
  [ "$code" != "403" ] && { echo "WAF wolny po ${i} sondach"; break; }
  echo "  … WAF blokuje, sonda $i"
  sleep 60
done
sleep 60
exec python3 generate.py prompts.json --out out --submit-only --delay 60 \
  --models nano-banana-pro,gpt-image-2,seedream-v5-pro --only "$1"
