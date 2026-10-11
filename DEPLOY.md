# Deploy ke Server Linux (Nginx)

Situs ini diekspor sebagai file statis (`out/`) dan disajikan langsung oleh Nginx. Server tidak perlu Node.js.

## Cara kerja

Setiap push ke `main`, GitHub Actions (`.github/workflows/deploy.yml`) akan:

1. Menjalankan `npm ci`, `npm run typecheck`, dan `npm run build`. Kalau gagal, deploy berhenti dan situs live tidak tersentuh.
2. Mengupload hasil build ke folder rilis baru lewat rsync di atas SSH.
3. Memindahkan symlink `current` ke rilis baru dalam satu langkah, sehingga pengunjung tidak pernah melihat situs setengah terupload.
4. Menyimpan 5 rilis terakhir untuk rollback dan menghapus sisanya.

Struktur di server:

```
/var/www/techxpert/
├── current -> releases/20261011093000-abc1234   (dibaca Nginx)
└── releases/
    ├── 20261011093000-abc1234/
    └── 20261010150000-def5678/
```

## Setup server (sekali saja)

Jalankan sebagai user dengan sudo.

### 1. User khusus deploy

```bash
sudo adduser --disabled-password --gecos "" deploy
sudo mkdir -p /var/www/techxpert/releases
sudo chown -R deploy:deploy /var/www/techxpert
sudo chmod 755 /var/www/techxpert
sudo apt install -y rsync
```

Nginx (user `www-data`) harus bisa membaca folder ini. Izin `755` untuk folder dan `644` untuk file sudah cukup.

### 2. SSH key khusus deploy

Buat di laptop, bukan di server. Jangan pakai key pribadi Anda.

```bash
ssh-keygen -t ed25519 -C "github-actions-deploy" -f techxpert_deploy -N ""
```

Pasang public key di server:

```bash
sudo -u deploy mkdir -p /home/deploy/.ssh
sudo -u deploy tee -a /home/deploy/.ssh/authorized_keys < techxpert_deploy.pub
sudo chmod 700 /home/deploy/.ssh && sudo chmod 600 /home/deploy/.ssh/authorized_keys
```

Uji dari laptop: `ssh -i techxpert_deploy deploy@IP_SERVER "echo ok"`.

### 3. Nginx

```bash
sudo cp deploy/nginx.conf /etc/nginx/sites-available/techxpert
# sesuaikan server_name jika perlu
sudo ln -s /etc/nginx/sites-available/techxpert /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

HTTPS dengan Let's Encrypt (setelah domain mengarah ke IP server):

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d techxpert.dev -d www.techxpert.dev
```

### 4. Secrets di GitHub

Buka repo di GitHub: Settings → Secrets and variables → Actions.

Tab **Secrets**:

| Nama | Isi |
|---|---|
| `SSH_HOST` | IP atau hostname server |
| `SSH_USER` | `deploy` |
| `SSH_PORT` | port SSH (boleh dikosongkan jika 22) |
| `SSH_PRIVATE_KEY` | isi file `techxpert_deploy` (private key) |
| `SSH_KNOWN_HOSTS` | hasil `ssh-keyscan -p PORT IP_SERVER` dari laptop |
| `DEPLOY_PATH` | `/var/www/techxpert` |

Tab **Variables**:

| Nama | Isi |
|---|---|
| `SITE_URL` | `https://techxpert.dev` |

Setelah itu hapus file `techxpert_deploy` dari laptop atau simpan di tempat aman.

### 5. Deploy pertama

Push ke `main`, atau buka tab Actions → Deploy → Run workflow.

## Sehari-hari

```
edit → npm run dev → npm run build → git commit → git push origin main
```

Pantau progres di tab Actions. Kalau centang hijau, situs sudah live.

## Rollback

Cara yang dianjurkan, lewat Git (tercatat dan otomatis ter-deploy):

```bash
git revert <hash-commit-bermasalah>
git push origin main
```

Cara darurat, langsung di server (instan, tanpa build):

```bash
ssh deploy@IP_SERVER
DEPLOY_PATH=/var/www/techxpert bash rollback.sh            # ke rilis sebelumnya
DEPLOY_PATH=/var/www/techxpert bash rollback.sh <nama-rilis>  # ke rilis tertentu
```

Salin `deploy/rollback.sh` ke home user `deploy` terlebih dahulu. Rollback darurat akan tertimpa saat push berikutnya ke `main`, jadi tetap perbaiki lewat Git.
