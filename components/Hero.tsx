export default function Hero() {
  return (
    <section aria-labelledby="hero-judul" className="bg-white text-ink">
      <div className="container-page grid gap-10 py-16 sm:py-20 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:py-24">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand">Sinergi Teknologi Expert</p>
          <h1 id="hero-judul" className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Kami mengembangkan software dan mengelola jaringan IT untuk instansi dan perusahaan Anda
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/80">
            Teknisi kami datang langsung ke lokasi Anda di Jabodetabek, sementara tim pengembang kami mengerjakan
            software, website, dan managed service secara remote untuk klien di seluruh Indonesia maupun luar negeri.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#kontak" className="btn-primary">
              Konsultasi Gratis
            </a>
            <a href="#layanan" className="btn-outline">
              Lihat Layanan
            </a>
          </div>
        </div>

        <dl className="grid gap-4 rounded-lg border border-ink/10 bg-surface p-6">
          <div>
            <dt className="text-sm font-semibold uppercase tracking-wider text-brand">Onsite: Jabodetabek</dt>
            <dd className="mt-1 text-ink/80">
              Sewa perangkat jaringan, pengelolaan infrastruktur, dan kunjungan teknisi untuk perbaikan,
              troubleshooting, serta maintenance.
            </dd>
          </div>
          <div className="border-t border-ink/10 pt-4">
            <dt className="text-sm font-semibold uppercase tracking-wider text-brand">
              Remote: Indonesia dan luar negeri
            </dt>
            <dd className="mt-1 text-ink/80">Pengembangan software, pembuatan website, dan managed service.</dd>
          </div>
          <div className="border-t border-ink/10 pt-4">
            <dt className="text-sm font-semibold uppercase tracking-wider text-brand">Konsultasi awal</dt>
            <dd className="mt-1 text-ink/80">Gratis. Ceritakan kebutuhan Anda, tim kami akan menghubungi Anda.</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
