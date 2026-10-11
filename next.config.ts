import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",              // hasil build berupa HTML/CSS/JS di folder out/
  images: { unoptimized: true }, // optimasi gambar butuh server Node, jadi dimatikan
  trailingSlash: true,  
};

export default nextConfig;
