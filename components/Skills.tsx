import Section from "./Section";
import Reveal from "./Reveal";
import { skills } from "@/content/profile";

export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="What I work with"
      lede="Grouped as they appear on my CV — no self-assigned scores."
    >
      <div className="grid gap-px border border-line bg-line sm:grid-cols-2">
        {skills.map((group, index) => (
          <Reveal key={group.category} delay={index * 70} className="h-full">
            <div className="h-full bg-surface p-6 sm:p-8">
              <h3 className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
                {group.category}
              </h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="border border-line px-2.5 py-1.5 font-mono text-xs text-ink"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
