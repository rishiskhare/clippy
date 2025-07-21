# Clippy 📎 (Chrome Extension)

https://github.com/user-attachments/assets/e9cd9677-4e5b-4ddb-b66d-2ce7d6eff446

## Overview
Clippy is a lightweight Chrome side-panel extension that lets you save any links you need frequently and copy them to the clipboard with a single click.

## Installation (Chrome)
1. Clone or download this repository.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** in the top-right corner.
4. Click **Load unpacked** and select the root folder of this project.
5. The extension icon will appear in the toolbar. Click the side-panel icon if it does not automatically open.

## Usage
Open the side panel and click any link card to copy its URL. A small toast will confirm when the link has been copied.

## Packaging for Distribution

### Chrome
1. Ensure the scripts are executable: `chmod +x build-chrome.sh`.  
2. Run `./build-chrome.sh` (or `./build-chrome.sh myfile.zip`) to generate `clippy-chrome.zip` in the project root.  
3. Upload the ZIP to the Chrome Web Store or share it for manual installation.

### Firefox
1. Ensure the scripts are executable: `chmod +x build-firefox.sh`.  
2. Run `./build-firefox.sh` (or `./build-firefox.sh myfile.zip`) to generate `clippy-firefox.zip` in the project root.  
3. Submit this ZIP/XPI on addons.mozilla.org or load it temporarily via `about:debugging → This Firefox → Load Temporary Add-on`.

These scripts include only the runtime files (background.js, manifest, side-panel assets, and icons) so the generated packages are ready for store submission or self-distribution.
