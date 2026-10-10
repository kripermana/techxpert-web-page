import Image from "next/image";

export default function About() {
  return (
    <section id="tentang" aria-labelledby="tentang-judul" className="bg-navy-50 py-16 sm:py-20">
      <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="eyebrow">Tentang</p>
          <h2 id="tentang-judul" className="mt-2 text-2xl font-bold text-navy sm:text-3xl">
            Satu tim untuk software dan infrastruktur jaringan Anda
          </h2>
          <div className="mt-5 space-y-4 text-slate-700">
            <p>
              TechXpert menggabungkan pengembangan software dan pengelolaan infrastruktur jaringan dalam satu tim. Anda
              tidak perlu mencari satu vendor untuk aplikasi dan vendor lain untuk jaringan, lalu menjembatani keduanya
              sendiri saat terjadi masalah.
            </p>
            <p>
              Itulah arti <strong className="text-navy">Sinergi Teknologi Expert</strong> bagi kami. Pengembang kami
              memahami jaringan tempat aplikasi Anda berjalan, dan teknisi kami memahami aplikasi yang bergantung pada
              jaringan tersebut. Karena kedua keahlian itu bekerja bersama, kami bisa menelusuri gangguan dari sisi
              aplikasi maupun perangkat tanpa saling lempar tanggung jawab.
            </p>
            <p>
              Kami melayani instansi pemerintah, perbankan, hospitality, perusahaan swasta, dan UMKM.
            </p>
          </div>
        </div>

        {/* Ganti dengan foto asli pekerjaan tim. Jangan memakai foto stok. */}
        <div className="overflow-hidden rounded-lg border border-slate-200">
          <Image
            src="/images/placeholder-foto.svg"
            alt="Tempat foto pekerjaan tim TechXpert, belum diisi"
            width={800}
            height={600}
            className="h-auto w-full"
          />
        </div>
      </div>
    </section>
  );
}
