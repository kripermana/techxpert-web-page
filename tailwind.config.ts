import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Warna utama brand
        navy: {
          DEFAULT: "#0B2545",
          900: "#071A31",
          800: "#0B2545",
          700: "#13345E",
          600: "#1D4677",
          100: "#E3EAF3",
          50: "#F2F5F9",
        },
        // Warna aksen: hanya dipakai sebagai latar tombol (teks navy) atau teks di atas latar navy.
        accent: {
          DEFAULT: "#F4B942",
          600: "#E0A22A",
          100: "#FDF1D8",
        },
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "72rem",
      },
    },
  },
  plugins: [],
};

export default config;
