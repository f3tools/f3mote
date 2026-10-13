#!/usr/bin/env bash
# Gather finished bundles from the per-platform target dirs into desktop/release/.
# Run after the build scripts; it does not build anything itself.
set -euo pipefail

cd "$(dirname "$0")/.."

ROOT="src-tauri"
OUT="release"
mkdir -p "$OUT/macos" "$OUT/windows" "$OUT/linux"

# macOS — signed + notarized universal
MAC="$ROOT/target/universal-apple-darwin/release/bundle"
if ls "$MAC"/dmg/*.dmg >/dev/null 2>&1; then
  cp "$MAC"/dmg/*.dmg "$OUT/macos/"
  cp "$MAC"/dmg/*universal.dmg "$OUT/macos/f3mote-macos-universal.dmg" 2>/dev/null || true
fi

# Windows — cross-compiled x64
WIN="$ROOT/target/x86_64-pc-windows-msvc/release"
if [ -f "$WIN/f3mote.exe" ]; then
  cp "$WIN/f3mote.exe" "$OUT/windows/"
fi
if ls "$WIN"/bundle/nsis/*-setup.exe >/dev/null 2>&1; then
  cp "$WIN"/bundle/nsis/*-setup.exe "$OUT/windows/"
  cp "$WIN"/bundle/nsis/*-setup.exe "$OUT/windows/f3mote-windows-x64-setup.exe" 2>/dev/null || true
fi

# Linux — arm64 (native + AppImage) and x64 (amd64), both under target-linux
for dir in native amd64; do
  LINUX="$ROOT/target-linux/$dir"
  for f in "$LINUX"/deb/*.deb "$LINUX"/bundle/deb/*.deb; do
    [ -f "$f" ] && cp "$f" "$OUT/linux/"
  done
  for f in "$LINUX"/appimage/f3mote*.AppImage "$LINUX"/bundle/appimage/f3mote*.AppImage; do
    [ -f "$f" ] && cp "$f" "$OUT/linux/"
  done
done

# Rebuild the updater manifest so no platform is forgotten at release time
node scripts/update-latest-json.mjs

echo "[Desktop] Artifacts collected into $OUT/:"
find "$OUT" -type f | sort | while read -r f; do
  printf "  %s  %s\n" "$(du -h "$f" | cut -f1)" "${f#$OUT/}"
done
