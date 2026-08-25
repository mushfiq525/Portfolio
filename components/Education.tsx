import Section from "./Section";
import Reveal from "./Reveal";
import { education } from "@/content/profile";

export default function Education() {
  return (
    <Section id="education" eyebrow="Education" title="Academic record">
      <ol className="relative">
        {/* Spine, drawn behind the markers */}
        <span aria-hidden className="absolute top-2 bottom-2 left-[5px] w-px bg-line" />

        {education.map((entry, index) => (
          <li key={entry.institution} className="relative pb-10 pl-8 last:pb-0">
            <span
              aria-hidden
              className={`absolute top-1.5 left-0 size-[11px] rounded-full border-2 ${
                index === 0 ? "border-detect bg-detect" : "border-line bg-ground"
              }`}
            />
            <Reveal delay={index * 80}>
              <p className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
                {entry.period}
              </p>
              <h3 className="mt-2.5 font-display text-lg font-semibold sm:text-xl">
                {entry.institution}
              </h3>
              {entry.place ? (
                <p className="mt-1 text-sm text-muted">{entry.place}</p>
              ) : null}
              <p className="mt-3 text-[15px]">{entry.qualification}</p>
              <p className="mt-2.5 inline-block border border-line px-2.5 py-1 font-mono text-xs text-trace">
                {entry.grade}
              </p>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
