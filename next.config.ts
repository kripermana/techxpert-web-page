import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Placeholder memakai SVG lokal. Hapus baris ini jika semua gambar sudah berupa foto JPG/PNG/WebP.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
