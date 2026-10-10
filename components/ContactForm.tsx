"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { LOCATION_OPTIONS, NEED_OPTIONS, SITE } from "@/lib/content";

type FormValues = {
  nama: string;
  instansi: string;
  email: string;
  telepon: string;
  kebutuhan: string;
  lokasi: string;
  pesan: string;
};

type FieldName = keyof FormValues;
type Errors = Partial<Record<FieldName, string>>;

const INITIAL: FormValues = {
  nama: "",
  instansi: "",
  email: "",
  telepon: "",
  kebutuhan: "",
  lokasi: "",
  pesan: "",
};

const FIELD_ORDER: FieldName[] = ["nama", "instansi", "email", "telepon", "kebutuhan", "lokasi", "pesan"];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(v: FormValues): Errors {
  const errors: Errors = {};
  if (v.nama.trim().length < 2) errors.nama = "Isi nama Anda, minimal 2 huruf.";
  if (v.instansi.trim().length < 2) errors.instansi = "Isi nama instansi atau perusahaan Anda.";

  if (!v.email.trim()) errors.email = "Isi alamat email Anda.";
  else if (!EMAIL_PATTERN.test(v.email.trim())) errors.email = "Format email belum benar. Contoh: nama@perusahaan.co.id";

  const digits = v.telepon.replace(/\D/g, "");
  if (!v.telepon.trim()) errors.telepon = "Isi nomor telepon Anda.";
  else if (!/^\+?[\d\s\-()]+$/.test(v.telepon.trim()))
    errors.telepon = "Nomor telepon hanya boleh berisi angka, spasi, tanda +, -, atau tanda kurung.";
  else if (digits.length < 8 || digits.length > 15) errors.telepon = "Nomor telepon harus terdiri dari 8 sampai 15 angka.";

  if (!v.kebutuhan) errors.kebutuhan = "Pilih layanan yang Anda butuhkan.";
  if (!v.lokasi) errors.lokasi = "Pilih lokasi Anda.";
  if (v.pesan.trim().length < 10) errors.pesan = "Jelaskan kebutuhan Anda, minimal 10 karakter.";
  return errors;
}

function buildMailto(v: FormValues): string {
  const subject = `Kebutuhan Proyek: ${v.kebutuhan} - ${v.instansi.trim()}`;
  const body = [
    "Halo tim TechXpert,",
    "",
    "Saya ingin berkonsultasi mengenai kebutuhan berikut.",
    "",
    `Nama: ${v.nama.trim()}`,
    `Instansi/Perusahaan: ${v.instansi.trim()}`,
    `Email: ${v.email.trim()}`,
    `Nomor telepon: ${v.telepon.trim()}`,
    `Kebutuhan: ${v.kebutuhan}`,
    `Lokasi: ${v.lokasi}`,
    "",
    "Pesan:",
    v.pesan.trim(),
  ].join("\n");
  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

const inputBase =
  "mt-1 block min-h-[44px] w-full rounded-md border bg-white px-3 py-2 text-base text-ink placeholder:text-ink/60";

export default function ContactForm() {
  const [values, setValues] = useState<FormValues>(INITIAL);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [sent, setSent] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);

  function onChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    const next = { ...values, [name]: value };
    setValues(next);
    // Setelah percobaan kirim pertama, perbarui pesan error saat pengguna mengetik
    if (submitted) setErrors(validate(next));
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    const found = validate(values);
    setErrors(found);

    const firstInvalid = FIELD_ORDER.find((f) => found[f]);
    if (firstInvalid) {
      setSent(false);
      document.getElementById(`field-${firstInvalid}`)?.focus();
      return;
    }

    window.location.href = buildMailto(values);
    setSent(true);
    // Pindahkan fokus ke pesan status agar pembaca layar mengumumkannya
    requestAnimationFrame(() => summaryRef.current?.focus());
  }

  const errorCount = Object.keys(errors).length;

  function describedBy(name: FieldName, hint?: boolean) {
    const ids = [hint ? `hint-${name}` : null, errors[name] ? `error-${name}` : null].filter(Boolean);
    return ids.length ? ids.join(" ") : undefined;
  }

  function fieldClass(name: FieldName) {
    return `${inputBase} ${errors[name] ? "border-brand" : "border-ink/60"}`;
  }

  function errorText(name: FieldName) {
    if (!errors[name]) return null;
    return (
      <p id={`error-${name}`} className="mt-1 text-sm font-medium text-brand">
        {errors[name]}
      </p>
    );
  }

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      aria-labelledby="form-judul"
      className="rounded-lg border border-ink/10 bg-white p-5 shadow-sm sm:p-8"
    >
      <h3 id="form-judul" className="text-xl font-semibold text-ink">
        Formulir kebutuhan proyek
      </h3>
      <p className="mt-1 text-sm text-ink/80">Semua kolom wajib diisi.</p>

      <div aria-live="polite">
        {submitted && errorCount > 0 && (
          <div className="mt-4 rounded-md border border-brand bg-brand-light p-4 text-sm text-brand-dark" role="alert">
            Ada {errorCount} kolom yang perlu Anda perbaiki sebelum mengirim.
          </div>
        )}
      </div>

      {sent && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="status"
          className="mt-4 rounded-md border border-ink/20 bg-surface p-4 text-sm text-ink"
        >
          Aplikasi email Anda seharusnya sudah terbuka dengan pesan yang tersusun. Tekan kirim di aplikasi tersebut. Jika
          tidak ada yang terbuka, kirim pesan Anda secara manual ke <strong className="text-ink">{SITE.email}</strong>.
        </div>
      )}

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="field-nama" className="font-medium text-ink">
            Nama
          </label>
          <input
            id="field-nama"
            name="nama"
            type="text"
            autoComplete="name"
            value={values.nama}
            onChange={onChange}
            aria-invalid={!!errors.nama}
            aria-describedby={describedBy("nama")}
            className={fieldClass("nama")}
          />
          {errorText("nama")}
        </div>

        <div>
          <label htmlFor="field-instansi" className="font-medium text-ink">
            Instansi / Perusahaan
          </label>
          <input
            id="field-instansi"
            name="instansi"
            type="text"
            autoComplete="organization"
            value={values.instansi}
            onChange={onChange}
            aria-invalid={!!errors.instansi}
            aria-describedby={describedBy("instansi")}
            className={fieldClass("instansi")}
          />
          {errorText("instansi")}
        </div>

        <div>
          <label htmlFor="field-email" className="font-medium text-ink">
            Email
          </label>
          <input
            id="field-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={values.email}
            onChange={onChange}
            aria-invalid={!!errors.email}
            aria-describedby={describedBy("email")}
            className={fieldClass("email")}
          />
          {errorText("email")}
        </div>

        <div>
          <label htmlFor="field-telepon" className="font-medium text-ink">
            Nomor telepon
          </label>
          <input
            id="field-telepon"
            name="telepon"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="Contoh: 021 1234 5678"
            value={values.telepon}
            onChange={onChange}
            aria-invalid={!!errors.telepon}
            aria-describedby={describedBy("telepon")}
            className={fieldClass("telepon")}
          />
          {errorText("telepon")}
        </div>

        <div>
          <label htmlFor="field-kebutuhan" className="font-medium text-ink">
            Kebutuhan
          </label>
          <select
            id="field-kebutuhan"
            name="kebutuhan"
            value={values.kebutuhan}
            onChange={onChange}
            aria-invalid={!!errors.kebutuhan}
            aria-describedby={describedBy("kebutuhan")}
            className={fieldClass("kebutuhan")}
          >
            <option value="">Pilih layanan</option>
            {NEED_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {errorText("kebutuhan")}
        </div>

        <div>
          <label htmlFor="field-lokasi" className="font-medium text-ink">
            Lokasi
          </label>
          <select
            id="field-lokasi"
            name="lokasi"
            value={values.lokasi}
            onChange={onChange}
            aria-invalid={!!errors.lokasi}
            aria-describedby={describedBy("lokasi", true)}
            className={fieldClass("lokasi")}
          >
            <option value="">Pilih lokasi</option>
            {LOCATION_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <p id="hint-lokasi" className="mt-1 text-sm text-ink/70">
            Layanan onsite tersedia di Jabodetabek.
          </p>
          {errorText("lokasi")}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="field-pesan" className="font-medium text-ink">
            Pesan
          </label>
          <textarea
            id="field-pesan"
            name="pesan"
            rows={5}
            value={values.pesan}
            onChange={onChange}
            aria-invalid={!!errors.pesan}
            aria-describedby={describedBy("pesan", true)}
            className={fieldClass("pesan")}
          />
          <p id="hint-pesan" className="mt-1 text-sm text-ink/70">
            Ceritakan kondisi saat ini dan hasil yang Anda harapkan.
          </p>
          {errorText("pesan")}
        </div>
      </div>

      <button type="submit" className="btn-primary mt-6 w-full sm:w-auto">
        Kirim Kebutuhan Proyek
      </button>
      <p className="mt-3 text-sm text-ink/70">
        Tombol ini membuka aplikasi email Anda. Alamat tujuan: <span className="font-semibold text-ink">{SITE.email}</span>
      </p>
    </form>
  );
}
