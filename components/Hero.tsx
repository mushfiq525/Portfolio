import Portrait from "./Portrait";
import { profile, socials } from "@/content/profile";

const iconPaths: Record<string, string> = {
  GitHub:
    "M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.89-2.78.62-3.37-1.2-3.37-1.2-.45-1.18-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05a9.4 9.4 0 0 1 5.01 0c1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.35 4.81-4.58 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.6.69.49A10.06 10.06 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z",
  Email:
    "M3 5.5h18a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1Zm.9 2 8.1 5.4 8.1-5.4H3.9Z",
  LinkedIn:
    "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75V21h-4v-5.7c0-1.36-.02-3.1-1.9-3.1-1.9 0-2.2 1.47-2.2 3v5.8h-3.9V9Z",
};

export default function Hero() {
  const visibleSocials = socials.filter((social) => social.url && iconPaths[social.label]);

  return (
    <header className="relative overflow-hidden px-6 pt-28 pb-20 sm:px-8 md:pt-36 md:pb-28">
      <div aria-hidden className="instrument-grid absolute inset-0 opacity-50" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-[1.15fr_0.85fr] md:gap-16">
        <div className="anim-fade-up">
          <p className="eyebrow flex items-center gap-2.5">
            <span aria-hidden className="size-1.5 bg-trace" />
            {profile.location}
          </p>

          <h1 className="mt-5 font-display text-[clamp(2.5rem,8vw,4.75rem)] leading-[0.95] font-semibold">
            Mushfiqur
            <br />
            <span className="text-detect">Rahman</span>
          </h1>

          <p className="mt-6 font-mono text-xs tracking-[0.14em] text-muted uppercase">
            {profile.role}
          </p>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            {profile.summary}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href={profile.resume}
              // Saves the file rather than opening the browser's PDF viewer.
              // Works because the PDF is served same-origin from /public.
              download={profile.resumeFilename}
              className="inline-flex items-center gap-2 bg-ink px-5 py-3 font-mono text-xs tracking-[0.12em] uppercase transition-colors hover:bg-detect"
              style={{ color: "var(--ground)" }}
            >
              Résumé
              <svg viewBox="0 0 24 24" className="size-3.5" fill="none" aria-hidden>
                <path
                  d="M12 4v12m0 0 4.5-4.5M12 16l-4.5-4.5M4 20h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </a>

            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 border border-line px-5 py-3 font-mono text-xs tracking-[0.12em] uppercase transition-colors hover:border-detect hover:text-detect"
            >
              Get in touch
            </a>
          </div>

          {visibleSocials.length > 0 && (
            <ul className="mt-8 flex items-center gap-1">
              {visibleSocials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.url}
                    target={social.url.startsWith("http") ? "_blank" : undefined}
                    rel={social.url.startsWith("http") ? "noreferrer" : undefined}
                    className="grid size-10 place-items-center text-muted transition-colors hover:text-detect"
                    title={social.label}
                  >
                    <span className="sr-only">{social.label}</span>
                    <svg viewBox="0 0 24 24" className="size-[18px]" fill="currentColor" aria-hidden>
                      <path d={iconPaths[social.label]} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <Portrait />
      </div>
    </header>
  );
}
