"use client";

// Dirender di browser agar tahun selalu mengikuti tanggal saat halaman dibuka, bukan saat build.
export default function CopyrightYear() {
  return <span suppressHydrationWarning>{new Date().getFullYear()}</span>;
}
