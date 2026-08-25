import Section from "./Section";
import Reveal from "./Reveal";
import { achievements, certifications } from "@/content/profile";

export default function Achievements() {
  return (
    <Section id="achievements" eyebrow="Achievements" title="Certifications & recognition">
      <div className="grid gap-10 md:grid-cols-2 md:gap-14">
        <div>
          <h3 className="eyebrow">Certifications</h3>
          <ul className="mt-5 space-y-3">
            {certifications.map((certificate, index) => (
              <Reveal key={certificate.title} delay={index * 70}>
                <li className="border border-line bg-surface p-5">
                  <p className="font-medium">{certificate.title}</p>
                  <p className="mt-1.5 font-mono text-[11px] tracking-[0.12em] text-muted uppercase">
                    {certificate.issuer}
                  </p>
                  {certificate.url ? (
                    <a
                      href={certificate.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 font-mono text-[11px] text-detect transition-opacity hover:opacity-70"
                    >
                      View certificate
                      <svg viewBox="0 0 24 24" className="size-3" fill="none" aria-hidden>
                        <path
                          d="M7 17 17 7M17 7H9m8 0v8"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </a>
                  ) : null}
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="eyebrow">Recognition</h3>
          <ul className="mt-5 divide-y divide-line border-y border-line">
            {achievements.map((achievement, index) => (
              <Reveal key={achievement.title} delay={index * 70}>
                <li className="flex gap-4 py-5">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 bg-detect" />
                  <div>
                    <p className="font-medium">{achievement.title}</p>
                    <p className="mt-1 text-sm text-muted">{achievement.context}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
