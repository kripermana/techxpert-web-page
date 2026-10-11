#!/usr/bin/env bash
# Kembali ke rilis sebelumnya. Jalankan di server:
#   bash rollback.sh                 # ke rilis sebelum yang aktif
#   bash rollback.sh 20261011093000-abc1234   # ke rilis tertentu
set -euo pipefail

DEPLOY_PATH="${DEPLOY_PATH:-/var/www/techxpert}"
cd "$DEPLOY_PATH"

ACTIVE=$(basename "$(readlink current)")
if [[ $# -ge 1 ]]; then
  TARGET="$1"
else
  TARGET=$(ls -1t releases | grep -vx "$ACTIVE" | head -n 1 || true)
fi

if [[ -z "${TARGET:-}" || ! -d "releases/$TARGET" ]]; then
  echo "Rilis tujuan tidak ditemukan. Daftar rilis:"
  ls -1t releases
  exit 1
fi

ln -sfn "releases/$TARGET" current.tmp
mv -Tf current.tmp current
echo "Aktif sekarang: $TARGET (sebelumnya: $ACTIVE)"
