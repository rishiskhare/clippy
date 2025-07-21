#!/usr/bin/env bash
# Build a Chrome-ready ZIP containing only the extension runtime files.
# Usage: ./build-chrome.sh [zip-name]
# Produces <zip-name> (default: clippy-chrome.zip) in the current directory.

set -euo pipefail

ZIP_NAME="${1:-clippy-chrome.zip}"

TMP_DIR="$(mktemp -d -t clippy-chrome-XXXXXX)"
cleanup() { rm -rf "$TMP_DIR"; }
trap cleanup EXIT

# Copy core files
cp background.js manifest.json sidepanel.css sidepanel.html sidepanel.js "$TMP_DIR" 2>/dev/null

# Copy assets directory recursively
rsync -a assets "$TMP_DIR/" >/dev/null

OUTPUT_PATH="$(pwd)/$ZIP_NAME"

# Create the zip archive
(
  cd "$TMP_DIR"
  zip -r9 "$OUTPUT_PATH" . >/dev/null
)

echo "✅ Chrome extension package created: $OUTPUT_PATH"