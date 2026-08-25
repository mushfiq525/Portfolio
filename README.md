# Portfolio — Mushfiqur Rahman

Personal portfolio. Next.js App Router, TypeScript, Tailwind CSS v4.

## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

Requires Node.js 20.9 or newer.

## Editing content

**Everything you'd want to change lives in one file: [`content/profile.ts`](content/profile.ts).**

Projects, skills, education, achievements, contact details and navigation are all
plain typed data there. No component needs touching to update the site's content.

A few things degrade gracefully rather than breaking:

| What | Where | Effect while empty |
|---|---|---|
| A social URL | `socials` | That icon is hidden |
| Profile photo | `public/mushfiq.jpg` | Hero shows a `MUSHFIQ` wordmark |
| Project links | a project's `links` array | Card reads "Write-up in progress" |

To add a project, append to the `projects` array. Give it at least one tag from
`ProjectTag` so it appears under the right filter.

## The GitHub section

[`components/GitHubActivity.tsx`](components/GitHubActivity.tsx) fetches the
public API at page load and shows the six repos with the most stars. It skips
forks, archives, and anything in its `HIDDEN_REPOS` set — the profile README,
the certificate upload, and the coursework builds. Repos whose description
mentions "ostad" are skipped too, so future coursework needs no edit here.

## Theme

Dark is the default and ships in the server-rendered HTML. The inline script in
[`app/layout.tsx`](app/layout.tsx) only *removes* the `dark` class, and only for
a returning visitor who has chosen light — so the correct theme is in place
before first paint either way. The toggle persists to `localStorage` under
`theme` and retints the `theme-color` meta tag.

## Assets

- `public/resume.pdf` — served by the hero's Résumé button, which carries
  `download` so it saves rather than opening the browser's PDF viewer. Replace
  the file to update it; the name it saves as is `profile.resumeFilename`.
- `public/mushfiq.jpg` — hero portrait. Should be a **3:4 portrait crop** (e.g.
  900×1200); the frame in [`components/Portrait.tsx`](components/Portrait.tsx)
  is fixed at that ratio and `object-cover` will centre-crop anything else.

## Design notes

The visual language is drawn from computer-vision inference overlays — thin
hairlines, mono class labels, hard corners — because that's what the work in
this portfolio actually is. Two accents carry it: magenta (`--detect`) for
strokes and links, teal (`--trace`) for markers and data. All tokens are
defined once in [`app/globals.css`](app/globals.css) and swap on `.dark`.

## Accessibility

- Skip link, visible focus rings on everything focusable
- Command palette is fully keyboard-driven (⌘K / Ctrl+K, arrows, enter, escape)
- Project filtering announces its result count via `aria-live`
- `prefers-reduced-motion` renders every final state with no travel

## Deploying

**Vercel** — import the repo, accept the defaults, done.

**GitHub Pages** — needs a static export. Add to `next.config.ts`:

```ts
output: "export",
images: { unoptimized: true },
```

then `npm run build` and publish the `out/` directory. Note that `output: "export"`
disables image optimisation, so `public/mushfiq.jpg` should be pre-sized.

## Content provenance

Every string on the site comes from `Mushfiqur Rahman (Research) CV.pdf` or the
public `github.com/mushfiq525` account, including project READMEs. Nothing is
invented — no proficiency percentages, no fabricated metrics. The GitHub section
fetches live from the public API at page load, unauthenticated.
