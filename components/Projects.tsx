"use client";

import { useMemo, useState } from "react";
import Section from "./Section";
import Reveal from "./Reveal";
import ProjectCard from "./ProjectCard";
import { projects, projectTags, type ProjectTag } from "@/content/profile";

type Filter = ProjectTag | "All";

export default function Projects() {
  const [filter, setFilter] = useState<Filter>("All");

  const counts = useMemo(() => {
    const tally = new Map<Filter, number>([["All", projects.length]]);
    for (const tag of projectTags) {
      tally.set(tag, projects.filter((project) => project.tags.includes(tag)).length);
    }
    return tally;
  }, []);

  const visible = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((project) => project.tags.includes(filter)),
    [filter],
  );

  const filters: Filter[] = ["All", ...projectTags];

  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Things I've built"
      lede="Mostly vision models and the systems around them. Filter by area."
    >
      <Reveal>
        <div
          role="group"
          aria-label="Filter projects by area"
          className="mb-10 flex flex-wrap gap-2"
        >
          {filters.map((option) => {
            const isActive = filter === option;
            return (
              <button
                key={option}
                type="button"
                onClick={() => setFilter(option)}
                aria-pressed={isActive}
                className={`inline-flex items-center gap-2 border px-3 py-2 font-mono text-[11px] tracking-[0.08em] transition-colors ${
                  isActive
                    ? "border-detect bg-detect text-on-detect"
                    : "border-line text-muted hover:border-detect hover:text-ink"
                }`}
              >
                {option}
                {/* Inherits the button's colour in both states; element opacity
                    dims it reliably, unlike an alpha modifier on the token. */}
                <span className="opacity-70">
                  {counts.get(option) ?? 0}
                </span>
              </button>
            );
          })}
        </div>
      </Reveal>

      {/* aria-live so filtering is announced to screen readers */}
      <p aria-live="polite" className="sr-only">
        Showing {visible.length} of {projects.length} projects.
      </p>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((project, index) => (
          // Keying on filter restarts the reveal when the set changes.
          // h-full so the wrapper stretches and cards in a row match height.
          <Reveal key={`${filter}-${project.name}`} delay={index * 55} className="h-full">
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
