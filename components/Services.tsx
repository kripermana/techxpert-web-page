import { SERVICES } from "@/lib/content";
import { ServiceIconView } from "./Icons";

export default function Services() {
  return (
    <section id="layanan" aria-labelledby="layanan-judul" className="bg-navy-50 py-16 sm:py-20">
      <div className="container-page">
        <p className="eyebrow">Layanan</p>
        <h2 id="layanan-judul" className="mt-2 text-2xl font-bold text-navy sm:text-3xl">
          Lima layanan yang kami kerjakan untuk organisasi Anda
        </h2>
        <p className="mt-3 max-w-2xl text-slate-700">
          Setiap kartu menunjukkan masalah yang kami selesaikan dan cara kami melayaninya: langsung di lokasi Anda
          (Onsite) atau dari jarak jauh (Remote).
        </p>

        <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <li key={service.id} className="flex flex-col rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-navy-100 text-navy">
                <ServiceIconView name={service.icon} className="h-7 w-7" />
              </span>
              <h3 className="mt-4 text-xl font-semibold text-navy">{service.name}</h3>
              <p className="mt-2 text-slate-700">{service.problem}</p>
              {service.extra && (
                <p className="mt-3 rounded-md bg-accent-100 p-3 text-sm text-slate-800">{service.extra}</p>
              )}

              <ul aria-label={`Cakupan ${service.name}`} className="mt-4 flex flex-wrap gap-2">
                {service.scopes.map((scope) => (
                  <li
                    key={scope.type}
                    className={
                      scope.type === "Onsite"
                        ? "rounded-full bg-navy px-3 py-1 text-sm font-medium text-white"
                        : "rounded-full border border-navy px-3 py-1 text-sm font-medium text-navy"
                    }
                  >
                    {scope.type}: {scope.note}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-5">
                <p className="text-sm font-semibold text-slate-700">Contoh pekerjaan</p>
                {/* Ganti placeholder ini dengan proyek nyata. Jangan isi dengan contoh rekaan. */}
                <p className="placeholder-tag mt-2">[CONTOH PROYEK BELUM DIISI]</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
