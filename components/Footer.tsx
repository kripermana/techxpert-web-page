import { NAV_LINKS, SITE } from "@/lib/content";
import CopyrightYear from "./CopyrightYear";
import { MailIcon, MapPinIcon } from "./Icons";

export default function Footer() {
  return (
    <footer className="on-dark bg-navy-900 text-slate-200">
      <div className="container-page grid gap-8 py-12 md:grid-cols-3">
        <div>
          <p className="text-xl font-bold text-white">
            Tech<span className="text-accent">Xpert</span>
          </p>
          <p className="mt-1 text-slate-300">{SITE.tagline}</p>
        </div>

        <address className="space-y-3 not-italic">
          <p className="flex gap-3">
            <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
            <span>{SITE.address}</span>
          </p>
          <p className="flex items-center gap-3">
            <MailIcon className="h-5 w-5 shrink-0 text-accent" />
            <a
              href={`mailto:${SITE.email}`}
              className="inline-flex min-h-[44px] items-center break-all underline underline-offset-4 hover:text-accent"
            >
              {SITE.email}
            </a>
          </p>
        </address>

        <nav aria-label="Navigasi footer">
          <ul className="grid grid-cols-2 gap-x-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="inline-flex min-h-[44px] items-center hover:text-accent">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-white/10">
        <p className="container-page py-5 text-sm text-slate-300">
          &copy; <CopyrightYear /> {SITE.name}. Hak cipta dilindungi.
        </p>
      </div>
    </footer>
  );
}
