import { SITE } from "@/lib/content";
import ContactForm from "./ContactForm";
import { MailIcon } from "./Icons";

export default function Contact() {
  return (
    <section id="kontak" aria-labelledby="kontak-judul" className="py-16 sm:py-20">
      <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="eyebrow">Kontak</p>
          <h2 id="kontak-judul" className="mt-2 text-2xl font-bold text-ink sm:text-3xl">
            Ceritakan kebutuhan proyek Anda
          </h2>
          <p className="mt-4 text-ink/80">
            Konsultasi awal dengan tim kami gratis. Isi formulir ini, lalu aplikasi email Anda akan terbuka dengan pesan
            yang sudah tersusun. Anda tinggal menekan tombol kirim.
          </p>
          <div className="mt-6 rounded-lg border border-ink/10 bg-surface p-5">
            <p className="font-semibold text-ink">Tidak punya aplikasi email di perangkat ini?</p>
            <p className="mt-2 text-ink/80">Kirim pesan Anda langsung ke alamat berikut:</p>
            <p className="mt-2 select-all break-all text-lg font-semibold text-ink">{SITE.email}</p>
            <a href={`mailto:${SITE.email}`} className="btn-outline mt-4">
              <MailIcon className="h-5 w-5" />
              Kirim Email ke Tim Kami
            </a>
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
