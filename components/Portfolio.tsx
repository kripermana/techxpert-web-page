import Image from "next/image";
import { CASE_STUDIES, CLIENT_LOGOS } from "@/lib/content";

// Bagian ini masih berisi placeholder.
// Cara menyembunyikan: buka lib/content.ts lalu ubah `SHOW_PORTFOLIO = true` menjadi `false`.
// app/page.tsx hanya merender komponen ini jika SHOW_PORTFOLIO bernilai true.
// Jangan menambahkan testimoni, rating, atau angka yang belum terverifikasi.
export default function Portfolio() {
  return (
    <section id="portofolio" aria-labelledby="portofolio-judul" className="py-16 sm:py-20">
      <div className="container-page">
        <p className="eyebrow">Portofolio</p>
        <h2 id="portofolio-judul" className="mt-2 text-2xl font-bold text-navy sm:text-3xl">
          Klien dan proyek kami
        </h2>

        <h3 className="mt-10 text-lg font-semibold text-navy">Klien</h3>
        <ul className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {CLIENT_LOGOS.map((logo, i) => (
            <li key={i} className="flex items-center justify-center">
              <Image src={logo.src} alt={`Logo klien: ${logo.name}`} width={240} height={96} className="h-auto w-full" />
            </li>
          ))}
        </ul>

        <h3 className="mt-12 text-lg font-semibold text-navy">Studi kasus</h3>
        <ul className="mt-4 grid gap-6 md:grid-cols-2">
          {CASE_STUDIES.map((item, i) => (
            <li key={i} className="overflow-hidden rounded-lg border border-slate-200 bg-white">
              <Image
                src={item.image}
                alt={`Foto studi kasus: ${item.title}`}
                width={800}
                height={600}
                className="h-auto w-full"
              />
              <div className="p-5">
                <h4 className="text-lg font-semibold text-navy">{item.title}</h4>
                <dl className="mt-3 space-y-1 text-sm text-slate-700">
                  <div className="flex gap-2">
                    <dt className="font-semibold">Klien:</dt>
                    <dd>{item.client}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="font-semibold">Layanan:</dt>
                    <dd>{item.service}</dd>
                  </div>
                </dl>
                <p className="mt-3 text-slate-700">{item.summary}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
