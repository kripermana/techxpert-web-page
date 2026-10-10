// Semua data konten halaman dikumpulkan di sini supaya mudah diperbarui tanpa menyentuh komponen.

export const SITE = {
  name: "TechXpert",
  tagline: "Sinergi Teknologi Expert",
  email: "inquiry@techxpert.dev",
  // [ALAMAT BELUM LENGKAP] Ganti bagian dalam kurung siku dengan data asli.
  address: "Jalan Matraman Jaya [NOMOR], Kelurahan [KELURAHAN], Jakarta Timur [KODE POS]",
  // [URL SITUS] Ganti lewat environment variable NEXT_PUBLIC_SITE_URL saat deploy.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://techxpert.dev",
};

export const NAV_LINKS = [
  { href: "#layanan", label: "Layanan" },
  { href: "#cara-kerja", label: "Cara Kerja" },
  { href: "#tentang", label: "Tentang" },
  { href: "#kontak", label: "Kontak" },
] as const;

export type ServiceIcon = "code" | "globe" | "monitor" | "router" | "server";
export type Scope = "Onsite" | "Remote";

export type Service = {
  id: string;
  name: string;
  icon: ServiceIcon;
  problem: string;
  scopes: { type: Scope; note: string }[];
  extra?: string;
};

export const SERVICES: Service[] = [
  {
    id: "software",
    name: "Pengembangan Software",
    icon: "code",
    problem:
      "Kami membuat aplikasi custom yang mengikuti proses bisnis Anda, sehingga tim Anda tidak perlu memaksakan alur kerja ke software jadi yang tidak cocok.",
    scopes: [{ type: "Remote", note: "Seluruh Indonesia dan luar negeri" }],
  },
  {
    id: "website",
    name: "Pembuatan Website",
    icon: "globe",
    problem:
      "Kami membangun website perusahaan, landing page, dan aplikasi web agar calon klien dapat mengenal organisasi Anda dan menghubungi Anda secara online.",
    scopes: [{ type: "Remote", note: "Seluruh Indonesia dan luar negeri" }],
  },
  {
    id: "managed-service",
    name: "Managed Service",
    icon: "monitor",
    problem:
      "Tim kami memantau infrastruktur IT Anda secara berkala dan menangani gangguan yang muncul, sehingga staf Anda tidak harus berjaga sendiri.",
    scopes: [
      { type: "Remote", note: "Pemantauan untuk seluruh Indonesia dan luar negeri" },
      { type: "Onsite", note: "Kunjungan teknisi di Jabodetabek" },
    ],
    extra:
      "Kami menjalankan pemantauan secara remote. Untuk perbaikan, troubleshooting, dan maintenance, teknisi kami datang ke lokasi Anda di Jabodetabek.",
  },
  {
    id: "sewa-perangkat",
    name: "Sewa Perangkat Jaringan",
    icon: "router",
    problem:
      "Kami menyewakan router, switch, access point, CCTV, dan perangkat jaringan lainnya, sehingga Anda bisa memakai perangkat yang dibutuhkan tanpa harus membelinya.",
    scopes: [{ type: "Onsite", note: "Jabodetabek" }],
  },
  {
    id: "infrastruktur",
    name: "Pengelolaan Infrastruktur",
    icon: "server",
    problem:
      "Tim kami memasang, mengonfigurasi, dan merawat jaringan serta server Anda, sehingga Anda punya satu tim yang menangani infrastruktur dari awal sampai perawatan.",
    scopes: [{ type: "Onsite", note: "Jabodetabek" }],
  },
];

export const NEED_OPTIONS = [...SERVICES.map((s) => s.name), "Lainnya"];

export const LOCATION_OPTIONS = ["Jabodetabek", "Luar Jabodetabek", "Luar negeri"];

export type Step = { title: string; description: string };

export const WORKFLOWS: { id: string; label: string; intro: string; steps: Step[] }[] = [
  {
    id: "software-website",
    label: "Proyek Software dan Website",
    intro: "Tim kami mengerjakan proyek ini secara remote, sehingga Anda bisa memulai dari kota atau negara mana pun.",
    steps: [
      {
        title: "Konsultasi kebutuhan",
        description: "Kami mendengarkan kebutuhan dan proses bisnis Anda. Konsultasi awal ini gratis.",
      },
      {
        title: "Penawaran",
        description: "Kami mengirimkan penawaran berisi lingkup pekerjaan, jadwal, dan biaya untuk Anda tinjau.",
      },
      {
        title: "Desain",
        description: "Tim kami menyusun rancangan tampilan dan alur aplikasi, lalu Anda memberi masukan sebelum kami mulai membangun.",
      },
      {
        title: "Pengembangan",
        description: "Pengembang kami membangun aplikasi atau website sesuai desain yang sudah Anda setujui.",
      },
      {
        title: "Uji coba bersama klien",
        description: "Anda dan tim kami menguji hasilnya bersama. Kami memperbaiki temuan dari uji coba ini.",
      },
      {
        title: "Peluncuran",
        description: "Kami memasang aplikasi atau website ke lingkungan produksi agar pengguna Anda bisa mulai memakainya.",
      },
      {
        title: "Pemeliharaan",
        description: "Tim kami tetap mendampingi Anda untuk perbaikan dan pembaruan setelah peluncuran.",
      },
    ],
  },
  {
    id: "infrastruktur-sewa",
    label: "Proyek Infrastruktur dan Sewa Perangkat",
    intro: "Teknisi kami mengerjakan proyek ini langsung di lokasi Anda di wilayah Jabodetabek.",
    steps: [
      {
        title: "Survei lokasi",
        description: "Teknisi kami datang ke lokasi Anda untuk memeriksa kondisi ruangan, jaringan, dan kebutuhan perangkat.",
      },
      {
        title: "Penawaran",
        description: "Kami mengirimkan penawaran berdasarkan hasil survei, termasuk daftar perangkat dan biaya.",
      },
      {
        title: "Pengiriman dan instalasi",
        description: "Tim kami mengirim perangkat ke lokasi Anda, lalu memasang dan mengonfigurasinya.",
      },
      {
        title: "Uji fungsi",
        description: "Teknisi kami menguji setiap perangkat dan koneksi untuk memastikan semuanya berjalan sesuai rencana.",
      },
      {
        title: "Serah terima",
        description: "Kami menyerahkan hasil pekerjaan beserta dokumentasinya kepada tim Anda.",
      },
      {
        title: "Dukungan purnajual",
        description: "Tim kami tetap siap membantu jika Anda membutuhkan perbaikan, troubleshooting, atau maintenance.",
      },
    ],
  },
];

export const FAQS: { question: string; answer: string }[] = [
  {
    question: "Berapa lama pengerjaan sebuah website?",
    answer:
      "Kami menentukan durasi pengerjaan setelah konsultasi kebutuhan, karena lingkup tiap website berbeda.",
  },
  {
    question: "Apakah ada garansi untuk pekerjaan TechXpert?",
    answer: "Garansi berlaku sesuai dengan kesepakatan kerja sama atau tender.",
  },
  {
    question: "Apakah tersedia SLA untuk Managed Service?",
    answer: "SLA tersedia melalui ketentuan dan kebijakan proyek yang dikerjakan.",
  },
  {
    question: "Wilayah mana yang TechXpert layani secara onsite?",
    answer:
      "Kami melayani pekerjaan onsite di Jabodetabek, yaitu Sewa Perangkat Jaringan, Pengelolaan Infrastruktur, serta kunjungan teknisi untuk perbaikan, troubleshooting, dan maintenance. Kami mengerjakan Pengembangan Software, Pembuatan Website, dan Managed Service secara remote untuk klien di seluruh Indonesia dan luar negeri. Untuk Managed Service, kami memantau infrastruktur Anda secara remote, dan teknisi kami datang ke lokasi jika Anda berada di Jabodetabek.",
  },
  {
    question: "Bagaimana sistem pembayarannya?",
    answer: "Sistem pembayaran ditentukan berdasarkan ketentuan proyek.",
  },
];

// PORTOFOLIO
// Bagian Portofolio masih berisi slot kosong. Untuk menyembunyikannya sampai data tersedia,
// ubah SHOW_PORTFOLIO menjadi false. Komponen <Portfolio /> tidak akan dirender sama sekali.
// Setelah data ada, isi CLIENT_LOGOS dan CASE_STUDIES di bawah lalu ubah kembali menjadi true.
export const SHOW_PORTFOLIO = false;

export const CLIENT_LOGOS: { name: string; src: string }[] = [
  { name: "[DATA BELUM DIISI]", src: "/images/placeholder-logo.svg" },
  { name: "[DATA BELUM DIISI]", src: "/images/placeholder-logo.svg" },
  { name: "[DATA BELUM DIISI]", src: "/images/placeholder-logo.svg" },
  { name: "[DATA BELUM DIISI]", src: "/images/placeholder-logo.svg" },
];

export const CASE_STUDIES: { title: string; client: string; service: string; summary: string; image: string }[] = [
  {
    title: "[DATA BELUM DIISI]",
    client: "[DATA BELUM DIISI]",
    service: "[DATA BELUM DIISI]",
    summary: "[DATA BELUM DIISI]",
    image: "/images/placeholder-foto.svg",
  },
  {
    title: "[DATA BELUM DIISI]",
    client: "[DATA BELUM DIISI]",
    service: "[DATA BELUM DIISI]",
    summary: "[DATA BELUM DIISI]",
    image: "/images/placeholder-foto.svg",
  },
];
