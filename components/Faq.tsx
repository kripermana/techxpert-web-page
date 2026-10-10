import { FAQS } from "@/lib/content";
import { ChevronIcon } from "./Icons";

export default function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-judul" className="bg-surface py-16 sm:py-20">
      <div className="container-page max-w-3xl">
        <p className="eyebrow">FAQ</p>
        <h2 id="faq-judul" className="mt-2 text-2xl font-bold text-ink sm:text-3xl">
          Pertanyaan yang sering kami terima
        </h2>

        <div className="mt-8 divide-y divide-ink/10 rounded-lg border border-ink/10 bg-white">
          {FAQS.map((faq) => (
            // <details> bisa dibuka dan ditutup lewat keyboard (Enter/Spasi) tanpa JavaScript
            <details key={faq.question} className="group">
              <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-ink [&::-webkit-details-marker]:hidden">
                <h3 className="text-base">{faq.question}</h3>
                <ChevronIcon className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" />
              </summary>
              <p className="px-5 pb-5 text-ink/80">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
