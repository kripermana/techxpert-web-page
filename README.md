# TechXpert Landing Page

Landing page satu halaman untuk TechXpert, "Sinergi Teknologi Expert". Dibangun dengan Next.js (App Router, TypeScript) dan Tailwind CSS.

## Menjalankan

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build produksi
npm run typecheck  # cek TypeScript
```

`npm run build` menghasilkan situs statis di folder `out/`. Panduan deploy ke server Linux dengan Nginx ada di [DEPLOY.md](DEPLOY.md).

Atur `NEXT_PUBLIC_SITE_URL` (misalnya `https://techxpert.dev`) saat build agar URL Open Graph benar.

## Struktur

```
app/
  layout.tsx            Metadata SEO, font Plus Jakarta Sans, lang="id", skip link
  page.tsx              Menyusun semua section
  globals.css           Tailwind + gaya fokus dan tombol
  icon.svg, apple-icon.png  Favicon dan ikon aplikasi
components/
  Navbar.tsx            Navigasi + menu mobile (client)
  Hero.tsx
  Services.tsx          Lima kartu layanan
  HowItWorks.tsx        Dua alur kerja dalam tab (client, navigasi panah)
  About.tsx
  Portfolio.tsx         Slot logo klien dan studi kasus (bisa disembunyikan)
  Faq.tsx               <details>/<summary>, bisa dipakai lewat keyboard
  Contact.tsx           CTA penutup + email teks
  ContactForm.tsx       Form dengan validasi, membuka mailto (client)
  Footer.tsx, CopyrightYear.tsx, Icons.tsx
deploy/
  nginx.conf            Contoh konfigurasi Nginx
  rollback.sh           Kembali ke rilis sebelumnya di server
.github/workflows/
  deploy.yml            Build dan deploy otomatis setiap push ke main
lib/content.ts          Seluruh teks, data layanan, FAQ, dan placeholder
public/images/          Blok warna netral pengganti foto/logo
```

## Placeholder yang perlu diisi

Cari `[` di `lib/content.ts` untuk menemukan semuanya.

- Alamat: nomor, kelurahan, kode pos (`SITE.address`)
- Contoh proyek di tiap kartu layanan (`components/Services.tsx`)
- Foto pekerjaan tim di bagian Tentang (`components/About.tsx`, `public/images/placeholder-foto.svg`)
- Logo klien dan studi kasus (`CLIENT_LOGOS`, `CASE_STUDIES`); sembunyikan dengan `SHOW_PORTFOLIO = false`
- FAQ: durasi website, garansi, SLA Managed Service, sistem pembayaran
- URL situs (`NEXT_PUBLIC_SITE_URL`)
