import Section from "./Section";
import Reveal from "./Reveal";
import { research } from "@/content/profile";

export default function Research() {
  return (
    <Section
      id="research"
      eyebrow="Research"
      title="Peer-reviewed work"
      lede="Graph-based anomaly detection for financial transaction data."
    >
      <Reveal>
        <article className="relative border border-line bg-surface p-7 sm:p-10">
          {/* Corner bracket, echoing the hero's detection box */}
          <span
            aria-hidden
            className="absolute top-0 left-0 size-5 border-t-2 border-l-2 border-detect"
          />

          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-detect px-2 py-1 font-mono text-[10px] font-medium tracking-[0.14em] text-on-detect uppercase">
              {research.status}
            </span>
            <span className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
              {research.venue}
            </span>
          </div>

          <h3 className="mt-6 max-w-3xl font-display text-2xl leading-tight font-semibold sm:text-3xl">
            {research.title}
          </h3>

          <p className="mt-5 max-w-3xl leading-relaxed text-muted">{research.abstract}</p>

          <ul className="mt-8 grid gap-3 border-t border-line pt-7 sm:grid-cols-3">
            {research.contributions.map((contribution) => (
              <li key={contribution} className="flex gap-3 text-sm leading-relaxed">
                <span aria-hidden className="mt-1.5 size-1.5 shrink-0 bg-trace" />
                {contribution}
              </li>
            ))}
          </ul>
        </article>
      </Reveal>
    </Section>
  );
}
