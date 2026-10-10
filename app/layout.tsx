import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { SITE } from "@/lib/content";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});

const title = `${SITE.name}: Jasa Pengembangan Software, Website, dan Infrastruktur IT`;
const description =
  "TechXpert mengembangkan software dan website, menjalankan managed service, menyewakan perangkat jaringan, serta mengelola infrastruktur IT untuk instansi dan perusahaan. Onsite di Jabodetabek, remote ke seluruh Indonesia dan luar negeri.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title,
  description,
  applicationName: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    siteName: SITE.name,
    title,
    description,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "TechXpert" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={jakarta.variable}>
      <body className="font-sans">
        <a
          href="#konten"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:inline-flex focus:min-h-[44px] focus:items-center focus:rounded-md focus:bg-white focus:px-4 focus:font-semibold focus:text-brand focus:shadow-lg"
        >
          Lompat ke konten utama
        </a>
        {children}
      </body>
    </html>
  );
}
