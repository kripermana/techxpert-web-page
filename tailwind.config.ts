import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Warna brand. Merah hanya untuk aksen: tombol, link, ikon, label, dan fokus.
        brand: {
          DEFAULT: "#A3021C",
          dark: "#7F0116",
          light: "#FBEAEC",
        },
        // Warna teks utama (charcoal)
        ink: "#1A1A1A",
        // Latar abu sangat muda untuk section berselang-seling
        surface: "#F7F7F7",
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
