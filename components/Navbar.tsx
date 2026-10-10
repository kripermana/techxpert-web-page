"use client";

import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/content";
import { CloseIcon, MenuIcon } from "./Icons";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Tutup menu mobile dengan tombol Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="on-dark sticky top-0 z-50 border-b border-white/10 bg-navy text-white">
      <nav aria-label="Navigasi utama" className="container-page flex h-16 items-center justify-between gap-4">
        <a href="#" className="inline-flex min-h-[44px] items-center text-xl font-bold tracking-tight">
          Tech<span className="text-accent">Xpert</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="inline-flex min-h-[44px] items-center rounded-md px-3 font-medium text-slate-100 hover:text-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a href="#kontak" className="btn-primary hidden sm:inline-flex">
            Konsultasi Gratis
          </a>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md hover:bg-white/10 md:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      <div id="menu-mobile" hidden={!open} className="border-t border-white/10 md:hidden">
        <ul className="container-page flex flex-col py-2">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex min-h-[44px] items-center rounded-md px-2 font-medium text-slate-100 hover:text-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="py-2">
            <a href="#kontak" onClick={() => setOpen(false)} className="btn-primary w-full">
              Konsultasi Gratis
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
