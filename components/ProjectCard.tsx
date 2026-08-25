import type { Project } from "@/content/profile";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative flex h-full flex-col border border-line bg-surface p-6 transition-colors hover:border-detect/45 sm:p-7">
      {/* Corner brackets — the bounding-box language from the hero, on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 size-4 border-t-2 border-l-2 border-detect opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute right-0 bottom-0 size-4 border-r-2 border-b-2 border-detect opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      {project.status ? (
        <p className="mb-4 inline-flex w-fit items-center gap-2 bg-trace/12 px-2 py-1 font-mono text-[10px] tracking-[0.12em] text-trace uppercase">
          {project.status}
        </p>
      ) : null}

      <h3 className="font-display text-lg leading-snug font-semibold sm:text-xl">
        {project.name}
      </h3>

      <p className="mt-3 text-sm leading-relaxed text-muted">{project.blurb}</p>

      {project.detail ? (
        <p className="mt-3 text-sm leading-relaxed text-muted/85">{project.detail}</p>
      ) : null}

      <ul className="mt-5 flex flex-wrap gap-1.5">
        {project.stack.map((item) => (
          <li
            key={item}
            className="border border-line px-2 py-1 font-mono text-[10.5px] text-muted"
          >
            {item}
          </li>
        ))}
      </ul>

      {project.links.length > 0 ? (
        <div className="mt-auto flex flex-wrap items-center gap-4 border-t border-line pt-5">
          {project.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.06em] text-ink transition-colors hover:text-detect"
            >
              {link.label}
              <svg viewBox="0 0 24 24" className="size-3" fill="none" aria-hidden>
                <path
                  d="M7 17 17 7M17 7H9m8 0v8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </a>
          ))}
        </div>
      ) : (
        <div className="mt-auto border-t border-line pt-5">
          <p className="font-mono text-[10.5px] text-muted">Write-up in progress</p>
        </div>
      )}
    </article>
  );
}
