import Image from "next/image";
import { NAV_LINKS, SITE } from "@/lib/content";
import CopyrightYear from "./CopyrightYear";
import { MailIcon, MapPinIcon } from "./Icons";

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-surface text-ink">
      <div className="container-page grid gap-8 py-12 md:grid-cols-3">
        <div>
          {/* Footer berlatar terang, jadi memakai logo.svg. Pakai /logo-white.svg jika latar diganti gelap. */}
          <a href="#" className="inline-flex min-h-[44px] items-center">
            <Image src="/logo.svg" alt="TechXpert" width={187} height={40} className="h-8 w-auto md:h-10" />
          </a>
          <p className="mt-1 text-ink/80">{SITE.tagline}</p>
        </div>

        <address className="space-y-3 not-italic">
          <p className="flex gap-3">
            <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
            <span>{SITE.address}</span>
          </p>
          <p className="flex items-center gap-3">
            <MailIcon className="h-5 w-5 shrink-0 text-brand" />
            <a
              href={`mailto:${SITE.email}`}
              className="link inline-flex min-h-[44px] items-center break-all underline"
            >
              {SITE.email}
            </a>
          </p>
        </address>

        <nav aria-label="Navigasi footer">
          <ul className="grid grid-cols-2 gap-x-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="link inline-flex min-h-[44px] items-center">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-ink/10">
        <p className="container-page py-5 text-sm text-ink/70">
          &copy; <CopyrightYear /> {SITE.name}. Hak cipta dilindungi.
        </p>
      </div>
    </footer>
  );
}
