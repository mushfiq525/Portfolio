import { profile, socials } from "@/content/profile";

export default function Footer() {
  const year = new Date().getFullYear();
  const visibleSocials = socials.filter((social) => social.url);

  return (
    <footer className="border-t border-line px-6 py-10 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col-reverse items-start justify-between gap-6 sm:flex-row sm:items-center">
        <p className="font-mono text-[11px] leading-relaxed text-muted">
          © {year} {profile.name}
          <span className="mx-2 text-line">·</span>
          {profile.location}
        </p>

        <ul className="flex items-center gap-5">
          {visibleSocials.map((social) => (
            <li key={social.label}>
              <a
                href={social.url}
                target={social.url.startsWith("http") ? "_blank" : undefined}
                rel={social.url.startsWith("http") ? "noreferrer" : undefined}
                className="font-mono text-[11px] tracking-[0.1em] text-muted uppercase transition-colors hover:text-detect"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
