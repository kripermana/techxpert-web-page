"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { WORKFLOWS } from "@/lib/content";

export default function HowItWorks() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Navigasi tab dengan tombol panah, Home, dan End sesuai pola WAI-ARIA Tabs
  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    const last = WORKFLOWS.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    if (e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <section id="cara-kerja" aria-labelledby="cara-kerja-judul" className="py-16 sm:py-20">
      <div className="container-page">
        <p className="eyebrow">Cara Kerja</p>
        <h2 id="cara-kerja-judul" className="mt-2 text-2xl font-bold text-ink sm:text-3xl">
          Alur kerja kami dari konsultasi sampai pendampingan
        </h2>
        <p className="mt-3 max-w-2xl text-ink/80">
          Kami memakai dua alur yang berbeda karena proyek software dan proyek infrastruktur membutuhkan langkah yang
          berbeda. Pilih alur yang sesuai dengan kebutuhan Anda.
        </p>

        <div role="tablist" aria-label="Pilih jenis proyek" className="mt-8 flex flex-col gap-2 sm:flex-row">
          {WORKFLOWS.map((flow, i) => {
            const selected = i === active;
            return (
              <button
                key={flow.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                id={`tab-${flow.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`panel-${flow.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={onKeyDown}
                className={`min-h-[44px] rounded-md border-2 px-4 py-2 text-left font-semibold transition-colors ${
                  selected
                    ? "border-brand bg-brand-light text-brand"
                    : "border-ink/60 bg-white text-ink hover:border-brand-dark"
                }`}
              >
                {flow.label}
              </button>
            );
          })}
        </div>

        {WORKFLOWS.map((flow, i) => (
          <div
            key={flow.id}
            id={`panel-${flow.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${flow.id}`}
            hidden={i !== active}
            tabIndex={0}
            className="mt-8"
          >
            <p className="text-ink/80">{flow.intro}</p>
            <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {flow.steps.map((step, n) => (
                <li key={step.title} className="flex gap-4 rounded-lg border border-ink/10 bg-white p-5">
                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand font-bold text-white"
                  >
                    {n + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-ink">
                      <span className="sr-only">Langkah {n + 1}: </span>
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm text-ink/80">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </section>
  );
}
