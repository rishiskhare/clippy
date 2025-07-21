#!/usr/bin/env bash
# Build a minimal Firefox extension package.
# Usage: ./build-firefox.sh [zip-name]
# Produces <zip-name> (default: clippy-firefox.zip) in the current directory containing:
# background.js, manifest.json (from manifest.firefox.json), sidepanel.{html,css,js}

set -euo pipefail

ZIP_NAME="${1:-clippy-firefox.zip}"

TMP_DIR="$(mktemp -d -t clippy-firefox-XXXXXX)"
cleanup() { rm -rf "$TMP_DIR"; }
trap cleanup EXIT

# Copy core runtime files
cp background.js sidepanel.css sidepanel.html sidepanel.js "$TMP_DIR" 2>/dev/null

# Copy assets directory recursively
rsync -a assets "$TMP_DIR/" >/dev/null

# Prepare Firefox manifest
if [ -f manifest.firefox.json ]; then
  cp manifest.firefox.json "$TMP_DIR/manifest.json"
else
  echo "Error: manifest.firefox.json not found" >&2
  exit 1
fi

OUTPUT_PATH="$(pwd)/$ZIP_NAME"

# Create zip
(
  cd "$TMP_DIR"
  zip -r9 "$OUTPUT_PATH" . >/dev/null
)

echo "✅ Firefox extension package created: $OUTPUT_PATH"