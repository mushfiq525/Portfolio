"use client";

import { useState } from "react";
import Section from "./Section";
import { profile } from "@/content/profile";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked; the mailto link beside this still works.
    }
  };

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Get in touch"
      lede="Open to research positions and Python development roles."
    >
      {/* Capped rather than full-width: three label/value rows stretched across
          a 1200px page would leave the pairs too far apart to scan. */}
      <div className="max-w-2xl">
        <dl className="divide-y divide-line border-y border-line">
          <div className="flex flex-wrap items-center justify-between gap-3 py-5">
            <dt className="eyebrow">Email</dt>
            <dd className="flex items-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="font-mono text-sm break-all transition-colors hover:text-detect"
              >
                {profile.email}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="shrink-0 border border-line px-2 py-1 font-mono text-[10px] tracking-[0.1em] text-muted uppercase transition-colors hover:border-detect hover:text-detect"
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </dd>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 py-5">
            <dt className="eyebrow">Phone</dt>
            <dd>
              <a
                href={`tel:${profile.phone}`}
                className="font-mono text-sm transition-colors hover:text-detect"
              >
                {profile.phone}
              </a>
            </dd>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 py-5">
            <dt className="eyebrow">Location</dt>
            <dd className="font-mono text-sm">{profile.location}</dd>
          </div>
        </dl>

        <a
          href={`mailto:${profile.email}`}
          className="mt-8 inline-flex items-center gap-2 bg-ink px-5 py-3 font-mono text-xs tracking-[0.12em] uppercase transition-colors hover:bg-detect"
          style={{ color: "var(--ground)" }}
        >
          Send an email
          <svg viewBox="0 0 24 24" className="size-3.5" fill="none" aria-hidden>
            <path
              d="M4 12h15m0 0-5.5-5.5M19 12l-5.5 5.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </a>
      </div>
    </Section>
  );
}
