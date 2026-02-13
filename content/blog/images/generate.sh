#!/bin/bash
# Generate a blog header image, convert to optimized webp, and upload to Tigris
# Usage: bash content/blog/images/generate.sh <name> "<prompt>"
#
# Example:
#   bash content/blog/images/generate.sh my-post "A photorealistic photo of a developer at a desk..."
#
# Output: <name>.webp uploaded to Tigris, public URL printed
#
# Requires:
#   - .env.local in project root (GEMINI_API_KEY, AWS_*, BUCKET_NAME)
#   - cwebp (brew install webp)
#   - aws cli

set -e

if [ $# -lt 2 ]; then
  echo "Usage: $0 <name> \"<prompt>\""
  echo "  name:   filename without extension (e.g. my-post)"
  echo "  prompt: image generation prompt"
  exit 1
fi

NAME="$1"
PROMPT="$2"

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../../.." && pwd)"
ENV_FILE="${PROJECT_ROOT}/.env.local"
TMP_PNG="/tmp/${NAME}.png"
OUT_WEBP="${SCRIPT_DIR}/${NAME}.webp"

# --- Load env ---
if [ ! -f "$ENV_FILE" ]; then
  echo "ERROR: $ENV_FILE not found."
  exit 1
fi
set -a
source "$ENV_FILE"
set +a

if [ -z "$GEMINI_API_KEY" ]; then echo "ERROR: GEMINI_API_KEY not set"; exit 1; fi
if [ -z "$BUCKET_NAME" ]; then echo "ERROR: BUCKET_NAME not set"; exit 1; fi

GEMINI_URL="https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${GEMINI_API_KEY}"

# --- 1. Generate PNG via Gemini ---
echo "[1/3] Generating image ..."

python3 -c "
import json, sys
prompt = sys.argv[1]
req = {'contents': [{'parts': [{'text': prompt}]}], 'generationConfig': {'responseModalities': ['TEXT', 'IMAGE']}}
with open('/tmp/gemini_req.json', 'w') as f:
    json.dump(req, f)
" "$PROMPT"

curl -s -o /tmp/gemini_resp.json -X POST "$GEMINI_URL" \
  -H "Content-Type: application/json" \
  -d @/tmp/gemini_req.json

python3 -c "
import json, base64, sys
with open('/tmp/gemini_resp.json') as f:
    data = json.load(f)
candidates = data.get('candidates', [])
if not candidates:
    print('  ERROR: No candidates')
    print('  ', json.dumps(data, indent=2)[:500])
    sys.exit(1)
parts = candidates[0].get('content', {}).get('parts', [])
for part in parts:
    if 'inlineData' in part:
        img = base64.b64decode(part['inlineData']['data'])
        with open(sys.argv[1], 'wb') as f:
            f.write(img)
        size_kb = len(img) / 1024
        print(f'  PNG: {size_kb:.0f} KB')
        sys.exit(0)
    elif 'text' in part:
        print(f'  (model: {part[\"text\"][:100]})')
print('  ERROR: No image data found')
sys.exit(1)
" "$TMP_PNG"

# --- 2. Convert to optimized webp ---
echo "[2/3] Converting to webp ..."

cwebp -q 80 -resize 1456 0 "$TMP_PNG" -o "$OUT_WEBP" 2>&1 | grep -E 'output size|File'

WEBP_SIZE=$(stat -f%z "$OUT_WEBP" 2>/dev/null || stat -c%s "$OUT_WEBP")
echo "  webp: $((WEBP_SIZE / 1024)) KB"

rm -f "$TMP_PNG"

# --- 3. Upload to Tigris ---
S3_KEY="blog/${NAME}.webp"
echo "[3/3] Uploading to Tigris ..."

aws s3 cp "$OUT_WEBP" "s3://${BUCKET_NAME}/${S3_KEY}" \
  --endpoint-url "$AWS_ENDPOINT_URL_S3" \
  --content-type "image/webp" \
  --acl public-read \
  --region "$AWS_REGION" \
  --no-progress

PUBLIC_URL="https://${BUCKET_NAME}.fly.storage.tigris.dev/${S3_KEY}"
echo ""
echo "Done! $PUBLIC_URL"
