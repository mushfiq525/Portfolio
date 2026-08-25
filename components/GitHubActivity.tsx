"use client";

import { useEffect, useState } from "react";
import Section from "./Section";
import Reveal from "./Reveal";
import { githubUsername } from "@/content/profile";

type Repo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  archived: boolean;
  pushed_at: string;
};

type State =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; repos: Repo[]; publicRepos: number };

const FEATURED_COUNT = 6;

/*
 * Repos Mushfiqur asked to keep out of this section: the certificate upload,
 * the profile README, and the coursework builds. Lowercased for comparison
 * because GitHub preserves case in names but doesn't require it in matches.
 */
const HIDDEN_REPOS = new Set([
  "bubt-tafe-certificate",
  "mushfiq525",
  "blog-site",
  "multi-vendor-ecommerce-database",
  "student-task-tracker-application",
  "basic-calculator",
]);

/** Catches future coursework too — each of those repos says so in its own description. */
function isCoursework(repo: Repo) {
  return (repo.description ?? "").toLowerCase().includes("ostad");
}

function formatMonth(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
  });
}

export default function GitHubActivity() {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const [userResponse, reposResponse] = await Promise.all([
          fetch(`https://api.github.com/users/${githubUsername}`, {
            signal: controller.signal,
          }),
          fetch(
            `https://api.github.com/users/${githubUsername}/repos?per_page=100&sort=pushed`,
            { signal: controller.signal },
          ),
        ]);

        if (!userResponse.ok || !reposResponse.ok) {
          // 403 here is almost always the unauthenticated hourly rate limit.
          throw new Error(
            userResponse.status === 403 || reposResponse.status === 403
              ? "GitHub's rate limit is in effect. Try again shortly."
              : "GitHub didn't return a response.",
          );
        }

        const user: { public_repos: number } = await userResponse.json();
        const allRepos: Repo[] = await reposResponse.json();

        // Forks and archives aren't authored work; HIDDEN_REPOS and the
        // coursework test drop the rest by name and by description.
        const owned = allRepos.filter(
          (repo) =>
            !repo.fork &&
            !repo.archived &&
            !HIDDEN_REPOS.has(repo.name.toLowerCase()) &&
            !isCoursework(repo),
        );

        const featured = [...owned]
          .sort(
            (a, b) =>
              b.stargazers_count - a.stargazers_count ||
              new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime(),
          )
          .slice(0, FEATURED_COUNT);

        setState({
          status: "ready",
          repos: featured,
          publicRepos: user.public_repos,
        });
      } catch (error) {
        if (controller.signal.aborted) return;
        setState({
          status: "error",
          message: error instanceof Error ? error.message : "Something went wrong.",
        });
      }
    }

    void load();
    return () => controller.abort();
  }, []);

  return (
    <Section
      id="github"
      eyebrow="GitHub"
      title="Live from the repos"
      lede="Fetched from the public GitHub API when this page loads."
    >
      {state.status === "loading" ? (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" aria-busy="true">
          <p className="sr-only">Loading repositories from GitHub.</p>
          {Array.from({ length: FEATURED_COUNT }).map((_, index) => (
            <div
              key={index}
              className="h-40 animate-pulse border border-line bg-surface-2"
            />
          ))}
        </div>
      ) : null}

      {state.status === "error" ? (
        <div className="border border-line bg-surface p-7">
          <p className="font-mono text-[11px] tracking-[0.14em] text-detect uppercase">
            Couldn&apos;t load
          </p>
          <p className="mt-3 text-muted">{state.message}</p>
          <a
            href={`https://github.com/${githubUsername}?tab=repositories`}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-1.5 font-mono text-[11px] text-ink transition-colors hover:text-detect"
          >
            Browse the repositories on GitHub
            <svg viewBox="0 0 24 24" className="size-3" fill="none" aria-hidden>
              <path
                d="M7 17 17 7M17 7H9m8 0v8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </a>
        </div>
      ) : null}

      {state.status === "ready" ? (
        <>
          <Reveal>
            <dl className="mb-10 grid grid-cols-2 gap-px border border-line bg-line">
              {[
                { label: "Public repositories", value: state.publicRepos },
                { label: "Shown below", value: state.repos.length },
              ].map((stat) => (
                // dt first to keep the <dl> valid; reversed visually so the
                // number reads first.
                <div
                  key={stat.label}
                  className="flex flex-col-reverse bg-surface p-5 sm:p-6"
                >
                  <dt className="mt-2 font-mono text-[10.5px] tracking-[0.12em] text-muted uppercase">
                    {stat.label}
                  </dt>
                  <dd className="font-display text-3xl font-semibold sm:text-4xl">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {state.repos.map((repo, index) => (
              <Reveal key={repo.id} delay={index * 55}>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-full flex-col border border-line bg-surface p-6 transition-colors hover:border-detect/45"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-mono text-sm break-words text-ink transition-colors group-hover:text-detect">
                      {repo.name}
                    </h3>
                    {repo.stargazers_count > 0 ? (
                      <span className="flex shrink-0 items-center gap-1 font-mono text-[11px] text-muted">
                        <svg viewBox="0 0 24 24" className="size-3" fill="currentColor" aria-hidden>
                          <path d="m12 3 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3-5.8 3 1.1-6.5L2.6 9.8l6.5-.9L12 3Z" />
                        </svg>
                        {repo.stargazers_count}
                      </span>
                    ) : null}
                  </div>

                  {repo.description ? (
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {repo.description}
                    </p>
                  ) : null}

                  <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-5 font-mono text-[10.5px] text-muted">
                    {repo.language ? (
                      <span className="flex items-center gap-1.5">
                        <span aria-hidden className="size-1.5 bg-trace" />
                        {repo.language}
                      </span>
                    ) : null}
                    <span>Updated {formatMonth(repo.pushed_at)}</span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <a
              href={`https://github.com/${githubUsername}?tab=repositories`}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 border border-line px-5 py-3 font-mono text-[11px] tracking-[0.1em] uppercase transition-colors hover:border-detect hover:text-detect"
            >
              All repositories
              <svg viewBox="0 0 24 24" className="size-3.5" fill="none" aria-hidden>
                <path
                  d="M7 17 17 7M17 7H9m8 0v8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </a>
          </Reveal>
        </>
      ) : null}
    </Section>
  );
}
