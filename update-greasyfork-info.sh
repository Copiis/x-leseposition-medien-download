#!/bin/bash
# Kopiert die aktuelle GreasyFork-Beschreibung (DE) in die Zwischenablage.
set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
INFO_FILE="${SCRIPT_DIR}/greasyfork-info-de.html"
if [[ ! -f "$INFO_FILE" ]]; then
  echo "❌ Nicht gefunden: $INFO_FILE"
  exit 1
fi
if ! command -v xclip >/dev/null 2>&1; then
  echo "❌ xclip fehlt"
  exit 1
fi
xclip -selection clipboard < "$INFO_FILE"
echo "✅ GreasyFork-Beschreibung (DE) → Zwischenablage"
echo "   Seite: https://greasyfork.org/de/scripts/517767-twitter-x-timeline-sync"
echo "   Als Copiis einloggen → Bearbeiten → Zusätzliche Informationen → Ctrl+V"
echo ""
echo "Code-Sync-URL:"
echo "   https://raw.githubusercontent.com/Copiis/x-timeline-sync/master/Twitter-X-Timeline-Sync.js"