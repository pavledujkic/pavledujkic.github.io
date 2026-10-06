# pavledujkic.github.io

Pavle Dujkic's site: [pavledujkic.github.io](https://pavledujkic.github.io). Static
[Astro](https://astro.build), no client framework: HTML and inlined CSS, self-hosted fonts, and one
small inline script that starts the project clips once the page has loaded.

```bash
bun install
bun run dev      # http://localhost:4321
bun run build    # → dist/
```

Pushing to `main` publishes it (GitHub Pages, Source: GitHub Actions).

## Editing

- **About you:** `src/site.ts` (name, role, location, intro, links, email).
- **Projects:** `src/projects.ts`. A project with `page: true` gets a case study at
  `src/pages/work/<slug>.astro` (copy `twain.astro`). Media goes in `public/media/`.
- **Share images and icon:** `node scripts/og.mjs` renders `public/og*.png` and
  `public/apple-touch-icon.png` from HTML with the site's fonts.

## Twain's clip

Recorded by the Twain repository's `demo` workflow (a real conversation against the live model,
with natural voices and the translated voice mixed in). Download its artifact, then:

```bash
scripts/twain-media.sh path/to/dark-take [path/to/light-take]
```

## Speed

Lighthouse (mobile, throttled), both pages: Performance 99, Accessibility 100, Best Practices 100,
SEO 100. The home page is ~6 KB of HTML and CSS (gzipped) plus ~90 KB of fonts and a 21 KB poster
before the clip starts; text doesn't move when the fonts arrive (metric-matched local fallbacks,
`scripts/fallbacks.mjs`).
