#!/usr/bin/env node
// Deploy situs statis (folder out/) ke server Linux lewat SSH, dijalankan dari laptop.
// Hanya memakai ssh, scp, dan tar, yang sudah tersedia di Linux, macOS, dan Windows 10+.
//
//   npm run deploy               build lalu deploy rilis baru
//   npm run deploy -- list       daftar rilis di server
//   npm run deploy -- rollback   kembali ke rilis sebelumnya
//   npm run deploy -- rollback <nama-rilis>
//
// Konfigurasi dibaca dari file .env.deploy (lihat .env.deploy.example) atau environment variable.

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const KEEP_RELEASES = 5;

function loadConfig() {
  const config = {};
  if (existsSync(".env.deploy")) {
    for (const line of readFileSync(".env.deploy", "utf8").split(/\r?\n/)) {
      const match = line.match(/^\s*([A-Z_]+)\s*=\s*(.*?)\s*$/);
      if (match) config[match[1]] = match[2].replace(/^["']|["']$/g, "");
    }
  }
  const get = (key, fallback) => process.env[key] ?? config[key] ?? fallback;
  const target = get("DEPLOY_TARGET");
  if (!target) {
    fail("DEPLOY_TARGET belum diatur. Salin .env.deploy.example menjadi .env.deploy lalu isi.");
  }
  return {
    target,
    port: get("DEPLOY_PORT", "22"),
    path: get("DEPLOY_PATH", "/var/www/techxpert"),
  };
}

function fail(message) {
  console.error(`\nGagal: ${message}`);
  process.exit(1);
}

function run(cmd, args, options = {}) {
  return execFileSync(cmd, args, { stdio: "inherit", ...options });
}

function capture(cmd, args) {
  return execFileSync(cmd, args, { encoding: "utf8" }).trim();
}

// Menjalankan skrip shell di server. Skrip dikirim lewat stdin agar tidak bermasalah dengan quoting.
function remote(cfg, script) {
  run("ssh", ["-p", cfg.port, cfg.target, "bash -s"], { input: `set -euo pipefail\n${script}`, stdio: ["pipe", "inherit", "inherit"] });
}

function quote(value) {
  return `'${String(value).replace(/'/g, `'\\''`)}'`;
}

function releaseName() {
  const stamp = new Date().toISOString().replace(/[-:T]/g, "").slice(0, 14);
  let sha = "nogit";
  try {
    sha = capture("git", ["rev-parse", "--short", "HEAD"]);
    if (capture("git", ["status", "--porcelain"])) sha += "-dirty";
  } catch {
    // Folder bukan repo git; nama rilis cukup memakai waktu.
  }
  return `${stamp}-${sha}`;
}

function deploy(cfg) {
  const release = releaseName();
  if (release.endsWith("-dirty")) {
    console.warn("Peringatan: ada perubahan yang belum di-commit. Rilis ini ditandai -dirty.\n");
  }

  console.log("1/4 Build...");
  run("npm", ["run", "build"], { shell: process.platform === "win32" });
  if (!existsSync(join("out", "index.html"))) fail("out/index.html tidak ditemukan setelah build.");

  const archive = join(tmpdir(), `techxpert-${release}.tar.gz`);
  // Diupload ke dalam DEPLOY_PATH (milik user deploy), bukan /tmp yang dipakai bersama.
  const remoteArchive = `${cfg.path}/.upload-${release}.tar.gz`;

  try {
    console.log("2/4 Mengemas out/...");
    run("tar", ["-czf", archive, "-C", "out", "."]);

    console.log(`3/4 Upload ke ${cfg.target}...`);
    run("scp", ["-P", cfg.port, "-q", archive, `${cfg.target}:${remoteArchive}`]);
  } finally {
    rmSync(archive, { force: true });
  }

  console.log("4/4 Mengaktifkan rilis...");
  remote(
    cfg,
    `
cd ${quote(cfg.path)}
mkdir -p releases/${quote(release)}
tar -xzf ${quote(remoteArchive)} -C releases/${quote(release)}
rm -f ${quote(remoteArchive)}
chmod -R a+rX releases/${quote(release)}
ln -sfn releases/${quote(release)} current.tmp
mv -Tf current.tmp current
ls -1dt releases/*/ | tail -n +${KEEP_RELEASES + 1} | xargs -r rm -rf
echo "Aktif: $(readlink current)"
`,
  );
  console.log("\nSelesai.");
}

function list(cfg) {
  remote(
    cfg,
    `
cd ${quote(cfg.path)}
ACTIVE=$(basename "$(readlink current 2>/dev/null)" 2>/dev/null || true)
for r in $(ls -1t releases); do
  if [ "$r" = "$ACTIVE" ]; then echo "* $r (aktif)"; else echo "  $r"; fi
done
`,
  );
}

function rollback(cfg, target) {
  remote(
    cfg,
    `
cd ${quote(cfg.path)}
ACTIVE=$(basename "$(readlink current)")
TARGET=${target ? quote(target) : `$(ls -1t releases | grep -vx "$ACTIVE" | head -n 1 || true)`}
if [ -z "$TARGET" ] || [ ! -d "releases/$TARGET" ]; then
  echo "Rilis tujuan tidak ditemukan. Daftar rilis:"; ls -1t releases; exit 1
fi
ln -sfn "releases/$TARGET" current.tmp
mv -Tf current.tmp current
echo "Aktif sekarang: $TARGET (sebelumnya: $ACTIVE)"
`,
  );
}

const [command = "deploy", arg] = process.argv.slice(2);
const cfg = loadConfig();

try {
  if (command === "deploy") deploy(cfg);
  else if (command === "list") list(cfg);
  else if (command === "rollback") rollback(cfg, arg);
  else fail(`Perintah tidak dikenal: ${command}. Pilihan: deploy, list, rollback.`);
} catch (error) {
  fail(error.message);
}
