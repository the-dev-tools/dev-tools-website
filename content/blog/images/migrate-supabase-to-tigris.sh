#!/bin/bash
# Migrate all Supabase-hosted blog images to Tigris and update MDX references
# Usage: bash content/blog/images/migrate-supabase-to-tigris.sh
#
# Requires:
#   - .env.local in project root (AWS_*, BUCKET_NAME) — or env vars set directly (CI)
#   - aws cli

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../../.." && pwd)"
BLOG_DIR="${PROJECT_ROOT}/content/blog"
ENV_FILE="${PROJECT_ROOT}/.env.local"

# --- Load env (skip if vars already set, e.g. in CI) ---
if [ -z "${BUCKET_NAME:-}" ]; then
  if [ ! -f "$ENV_FILE" ]; then
    echo "ERROR: $ENV_FILE not found and BUCKET_NAME not set in environment."
    exit 1
  fi
  set -a
  source "$ENV_FILE"
  set +a
fi

if [ -z "${BUCKET_NAME:-}" ]; then echo "ERROR: BUCKET_NAME not set"; exit 1; fi

TIGRIS_BASE="https://${BUCKET_NAME}.fly.storage.tigris.dev"

# Step 1: Collect all unique Supabase URLs and map to Tigris paths
echo "=== Scanning for Supabase images ==="

# Extract unique URLs with their source files
URLS_FILE=$(mktemp)
grep -roh 'https://kccqmbkylzrrhibpxtbk[.]supabase[.]co/storage/v1/object/public/public-user-assets/[^")*  ]*\.webp' "$BLOG_DIR"/*.mdx | sort -u > "$URLS_FILE" || true

URL_COUNT=$(wc -l < "$URLS_FILE" | tr -d ' ')
echo "Found ${URL_COUNT} unique Supabase images"
echo ""

if [ "$URL_COUNT" -eq 0 ]; then
  echo "=== No Supabase images to migrate ==="
  rm -f "$URLS_FILE"
  exit 0
fi

# Step 2: Download and upload each unique image
UPLOADED=0
SKIPPED=0
FAILED=0

while IFS= read -r SUPA_URL; do
  # Extract the UUID folder and image name from the URL
  # URL pattern: .../public-user-assets/<user-uuid>/<post-uuid>/<image>.webp
  POST_UUID=$(echo "$SUPA_URL" | grep -oE '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/[^/]+\.webp$' | cut -d/ -f1)
  IMG_NAME=$(basename "$SUPA_URL")

  # Find which MDX file contains this URL to get the slug
  MDX_FILE=$(grep -rl "$POST_UUID/$IMG_NAME" "$BLOG_DIR"/*.mdx | head -1)
  if [ -z "$MDX_FILE" ]; then
    echo "[warn] No MDX file found for: $IMG_NAME (uuid: $POST_UUID)"
    continue
  fi
  SLUG=$(basename "$MDX_FILE" .mdx)

  # Tigris path: blog/<slug>/<image>.webp
  S3_KEY="blog/${SLUG}/${IMG_NAME}"
  TIGRIS_URL="${TIGRIS_BASE}/${S3_KEY}"
  TMP_FILE="/tmp/migrate-${SLUG}-${IMG_NAME}"

  # Check if already on Tigris
  if aws s3 ls "s3://${BUCKET_NAME}/${S3_KEY}" \
    --endpoint-url "$AWS_ENDPOINT_URL_S3" \
    --region "$AWS_REGION" > /dev/null 2>&1; then
    echo "[skip] ${S3_KEY}"
    SKIPPED=$((SKIPPED + 1))
  else
    # Download
    echo "[download] ${SLUG}/${IMG_NAME}"
    if ! curl -fsSL -o "$TMP_FILE" "$SUPA_URL"; then
      echo "  FAILED to download: $SUPA_URL"
      FAILED=$((FAILED + 1))
      continue
    fi

    FILE_SIZE=$(stat -f%z "$TMP_FILE" 2>/dev/null || stat -c%s "$TMP_FILE")
    echo "  ${IMG_NAME}: $((FILE_SIZE / 1024)) KB"

    # Upload
    if ! aws s3 cp "$TMP_FILE" "s3://${BUCKET_NAME}/${S3_KEY}" \
      --endpoint-url "$AWS_ENDPOINT_URL_S3" \
      --content-type "image/webp" \
      --acl public-read \
      --region "$AWS_REGION" \
      --no-progress; then
      echo "  FAILED to upload"
      FAILED=$((FAILED + 1))
      rm -f "$TMP_FILE"
      continue
    fi

    rm -f "$TMP_FILE"
    UPLOADED=$((UPLOADED + 1))
    echo "[uploaded] ${TIGRIS_URL}"
  fi
  echo ""
done < "$URLS_FILE"

echo "=== Upload phase complete ==="
echo "  Uploaded: $UPLOADED"
echo "  Skipped:  $SKIPPED"
echo "  Failed:   $FAILED"
echo ""

# Step 3: Replace all Supabase URLs in MDX files
echo "=== Replacing URLs in MDX files ==="

while IFS= read -r SUPA_URL; do
  POST_UUID=$(echo "$SUPA_URL" | grep -oE '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/[^/]+\.webp$' | cut -d/ -f1)
  IMG_NAME=$(basename "$SUPA_URL")

  MDX_FILE=$(grep -rl "$POST_UUID/$IMG_NAME" "$BLOG_DIR"/*.mdx | head -1)
  if [ -z "$MDX_FILE" ]; then continue; fi
  SLUG=$(basename "$MDX_FILE" .mdx)

  TIGRIS_URL="${TIGRIS_BASE}/blog/${SLUG}/${IMG_NAME}"

  # Replace in ALL files that contain this URL (some images might be referenced from multiple files)
  grep -rl "$SUPA_URL" "$BLOG_DIR"/*.mdx | while IFS= read -r f; do
    # macOS sed requires -i '', GNU sed requires -i without argument
    if sed --version >/dev/null 2>&1; then
      sed -i "s|${SUPA_URL}|${TIGRIS_URL}|g" "$f"
    else
      sed -i '' "s|${SUPA_URL}|${TIGRIS_URL}|g" "$f"
    fi
    echo "[replaced] $(basename "$f"): ${IMG_NAME} -> Tigris"
  done
done < "$URLS_FILE"

rm -f "$URLS_FILE"

echo ""
echo "=== Migration complete ==="
echo "Run 'grep -r supabase content/blog/' to verify no references remain"
