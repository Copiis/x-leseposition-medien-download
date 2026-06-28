#!/bin/bash
# Kopiert das lokale Script in die Zwischenablage (Tampermonkey Copy & Paste).
# Standard-Schritt nach jeder Code-Änderung (AI-Pflicht).
# Einzige Remote-Spiegelung: GitHub (git push/pull) — nicht automatisch.
#
# Tampermonkey: Tab „Quellcode“ → Ctrl+A → Ctrl+V → Speichern → X neu laden
#
# Verwendung:
#   ./update-tampermonkey.sh          # nur Zwischenablage (nach Änderung + Befehl „install“)
#   ./update-tampermonkey.sh --open   # Zwischenablage + Editor in Vivaldi öffnen

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SCRIPT_FILE="${SCRIPT_DIR}/Twitter-X-Timeline-Sync.js"
TM_UUID="${TM_UUID:-5faf18f7-a35d-4722-9a99-67c6557c9f26}"
TM_EXT_ID="${TM_EXT_ID:-dhdgffkkebhmkfjojejmpbldmpobfkfo}"
VIVALDI="${VIVALDI:-/opt/vivaldi/vivaldi-bin}"
OPEN_EDITOR=false

if [[ "${1:-}" == "--open" ]]; then
  OPEN_EDITOR=true
elif [[ -n "${1:-}" ]]; then
  echo "Verwendung: $0 [--open]"
  exit 1
fi

if [[ ! -f "$SCRIPT_FILE" ]]; then
  echo "❌ Script nicht gefunden: $SCRIPT_FILE"
  exit 1
fi

if ! command -v xclip >/dev/null 2>&1; then
  echo "❌ xclip fehlt (für Zwischenablage)"
  exit 1
fi

VERSION=$(grep -o '@version [0-9.]*[a-z]*' "$SCRIPT_FILE" | head -1 | awk '{print $2}')
LINES=$(wc -l < "$SCRIPT_FILE")

xclip -selection clipboard < "$SCRIPT_FILE"

echo "✅ Version $VERSION ($LINES Zeilen) → Zwischenablage"
echo "   Quelle: $SCRIPT_FILE"
echo ""
echo "In Tampermonkey einfügen:"
echo "  1. Script „X Leseposition & Medien-Download“ bearbeiten"
echo "  2. Tab „Quellcode“ (nicht „Änderungen“)"
echo "  3. Ctrl+A → Ctrl+V"
echo "  4. Speichern (Diskette oder Ctrl+S)"
echo "  5. X-Tab neu laden"
echo ""
echo "Hinweis: Einzige Spiegelung → git push / git pull (GitHub)"

if $OPEN_EDITOR; then
  if [[ -x "$VIVALDI" ]]; then
    editor_url="chrome-extension://${TM_EXT_ID}/options.html#nav=${TM_UUID}+editor"
    echo ""
    echo "→ Öffne Tampermonkey-Editor in Vivaldi..."
    "$VIVALDI" "$editor_url" >/dev/null 2>&1 &
  else
    echo ""
    echo "⚠️  Vivaldi nicht gefunden — Editor manuell öffnen"
  fi
fi