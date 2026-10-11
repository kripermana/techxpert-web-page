# Deploy ke Server Linux (Nginx)

Situs ini diekspor sebagai file statis (`out/`) dan disajikan langsung oleh Nginx. Server tidak perlu Node.js.

Deploy dilakukan dari laptop Anda atau kolega dengan `npm run deploy`, memakai SSH key masing-masing. GitHub tidak punya akses ke server: workflow `.github/workflows/ci.yml` hanya mengecek bahwa kode bisa di-build.

## Cara kerja

`npm run deploy` akan:

1. Menjalankan `npm run build`. Kalau gagal, deploy berhenti dan situs live tidak tersentuh.
2. Mengemas folder `out/` menjadi satu arsip, lalu mengirimnya lewat `scp`.
3. Mengekstrak arsip ke folder rilis baru di server, lalu memindahkan symlink `current` ke rilis itu dalam satu langkah. Pengunjung tidak pernah melihat situs setengah terupload.
4. Menyimpan 5 rilis terakhir untuk rollback dan menghapus sisanya.

Struktur di server:

```
/var/www/techxpert/
├── current -> releases/20261011093000-abc1234   (dibaca Nginx)
└── releases/
    ├── 20261011093000-abc1234/
    └── 20261010150000-def5678/
```

Nama rilis berisi waktu dan hash commit Git. Akhiran `-dirty` berarti ada perubahan yang belum di-commit saat deploy.

## Setup server (sekali saja)

Jalankan sebagai user dengan sudo.

### 1. Folder dan user deploy

```bash
sudo adduser --disabled-password --gecos "" deploy
sudo mkdir -p /var/www/techxpert/releases
sudo chown -R deploy:deploy /var/www/techxpert
sudo chmod 755 /var/www/techxpert
```

Nginx (user `www-data`) harus bisa membaca folder ini. Skrip deploy sudah mengatur izin baca file rilis.

### 2. Daftarkan SSH key Anda dan kolega

Setiap orang memakai key sendiri, jadi akses bisa dicabut per orang. Tambahkan public key masing-masing (isi file `~/.ssh/id_ed25519.pub` di laptop mereka) ke:

```bash
sudo -u deploy mkdir -p /home/deploy/.ssh
sudo -u deploy nano /home/deploy/.ssh/authorized_keys    # satu key per baris
sudo chmod 700 /home/deploy/.ssh && sudo chmod 600 /home/deploy/.ssh/authorized_keys
```

Belum punya key? Buat di laptop: `ssh-keygen -t ed25519`.

Untuk mencabut akses seseorang, hapus baris key-nya dari `authorized_keys`.

### 3. Perketat SSH

Di `/etc/ssh/sshd_config`:

```
PasswordAuthentication no
PermitRootLogin no
AllowUsers deploy NAMA_USER_ANDA
```

Lalu `sudo systemctl reload ssh`. Pastikan Anda masih bisa login dari terminal lain sebelum menutup sesi yang sedang aktif.

Kalau IP Anda dan kolega tetap, batasi port SSH hanya untuk IP tersebut di firewall, misalnya dengan ufw:

```bash
sudo ufw allow from IP_ANDA to any port 22 proto tcp
sudo ufw allow from IP_KOLEGA to any port 22 proto tcp
sudo ufw allow 80,443/tcp
sudo ufw enable
```

Kalau IP berubah-ubah, pertimbangkan VPN (misalnya WireGuard) dan buka SSH hanya dari jaringan VPN.

### 4. Nginx

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

## Setup laptop (setiap orang yang deploy)

Butuh Node.js 22 serta `ssh`, `scp`, dan `tar`. Ketiganya sudah bawaan di Linux, macOS, dan Windows 10 ke atas.

```bash
cp .env.deploy.example .env.deploy
```

Isi `.env.deploy`:

```
DEPLOY_TARGET=deploy@IP_SERVER
DEPLOY_PORT=22
DEPLOY_PATH=/var/www/techxpert
```

File `.env.deploy` tidak ikut ke Git. Uji koneksi dengan `ssh deploy@IP_SERVER "echo ok"`.

## Sehari-hari

```bash
git pull
# edit, cek dengan npm run dev
git commit -am "Pesan perubahan"
git push origin main
npm run deploy
```

Deploy dari kode yang sudah di-commit agar setiap rilis bisa ditelusuri ke commit Git.

## Rollback

```bash
npm run deploy -- list                  # lihat rilis, tanda * = aktif
npm run deploy -- rollback              # kembali ke rilis sebelumnya
npm run deploy -- rollback <nama-rilis> # kembali ke rilis tertentu
```

Rollback bersifat instan karena hanya memindahkan symlink. Setelah itu perbaiki masalahnya di Git, lalu deploy lagi.
