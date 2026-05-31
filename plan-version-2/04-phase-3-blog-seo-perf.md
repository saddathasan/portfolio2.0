# Phase 3 — MDX Blog + SEO + Performance

> **Goal:** Ship the **static MDX blog** rendered two ways (terminal `cat` + GUI article), make the whole site **SEO-strong** (prerendered HTML, per-route metadata, JSON-LD, sitemap/RSS), and hit the **Core Web Vitals** budgets. Also move the git-profile GitHub token behind a Cloudflare Pages Function.
>
> **Prerequisites:** Phases 0–2 merged. · **Estimated sessions:** 4–5. · **Branch:** `feat/revamp-phase-3`.

---

## Objectives
1. Author posts as `src/blog/<category>/<slug>.mdx`; a build-time index feeds both renderers.
2. GUI blog: `/blog`, `/blog/<category>`, `/blog/<slug>` with rich MDX, Shiki code highlighting, reading time.
3. Terminal blog: `/blog` mounted in the virtual FS — `blog`→`cd /blog`+`ls` (TUI table), categories as subdirs, `cat <slug>` renders fully-formatted output, autocomplete on post names.
4. Every page prerendered to static HTML (`vite-react-ssg`); unique meta + canonical + OG/Twitter; `BlogPosting`/`Person` JSON-LD; `sitemap.xml` + `rss.xml` + per-tag pages.
5. CWV met: LCP < 2.5s, INP < 200ms, CLS < 0.1; elegant-site initial JS < 200 KB gz; Lighthouse ≥ 95 all categories.
6. Git-profile token served via Cloudflare Pages Function (not shipped to client) + cached fallback.

## Out of scope
- New blog features beyond list/category/post/tag (comments, search-as-you-type → Phase 4 if wanted).

## Pre-flight
- [ ] `git checkout -b feat/revamp-phase-3`.
- [ ] Re-read [`00-master-plan.md`](./00-master-plan.md) §7.4 (terminal blog FS), §10 (perf/SEO), §17 (MDX format).
- [ ] Canonical base URL = `https://saddathasan.dev`.

---

## Task group A — MDX pipeline & content
- [ ] Add deps: `@mdx-js/rollup`, `remark-gfm`, `remark-frontmatter`, `gray-matter`, `rehype-pretty-code` (+ `shiki`), `reading-time`.
- [ ] Wire MDX into `vite.config.ts`.
- [ ] Create `src/blog/` with a `general/hello-world.mdx` seed post using the §17 frontmatter.
- [ ] Build `src/features/blog/lib/index.ts`: glob-import all `.mdx`, parse frontmatter (Zod `.passthrough()` schema — known fields validated, unknown allowed), derive `slug`/`readingTime`/`wordCount`, exclude `draft`, sort by `publishedAt`. Export a typed post index + helpers (`getByslug`, `byCategory`, `byTag`).
- [ ] Zod schema fails the build on a malformed known field.

## Task group B — GUI blog
- [ ] Routes: `routes/blog.index.tsx` (list, grouped by category, tag filter), `routes/blog.$category.tsx` (category landing), `routes/blog.$slug.tsx` (article).
- [ ] Article: render compiled MDX with a component map (`<Callout>`, headings with anchor links, `pre`/`code` via Shiki), reading time, published/updated, tags, prev/next, share, cover image.
- [ ] Add `/blog` to the GUI `Nav`.
- [ ] Empty/no-results states that teach, not just "nothing here".

## Task group C — Terminal blog (virtual FS)
- [ ] Add `buildBlogDirectory()` in the terminal engine (parallel to `buildProjectsDirectory()`), mounting posts as FS nodes under `/blog`, categories as subdirectories.
- [ ] `blog`/`posts` command = `cd /blog` + `ls`. Make `ls` of `/blog` render a **TUI table** (`DATE · CATEGORY · READ · TITLE`), aligned.
- [ ] `cat <slug>` (`.md` optional) **fully renders** the post in terminal style: weighted headings, bold/italic, lists, blockquotes, inline code, links, tables, hr, **syntax-highlighted code blocks** (agnoster palette). React components degrade gracefully + show an `open` hint.
- [ ] Confirm path autocomplete completes post filenames "for free" (they're real FS nodes).
- [ ] Footer line after a rendered post: `open` → GUI article (client-side nav).

## Task group D — SSG & metadata
- [ ] Add `vite-react-ssg`; convert the app entry to its `createRoot`/`ViteReactSSG` form.
- [ ] `getStaticPaths()` returns every blog slug + category so each prerenders to static HTML.
- [ ] Prerender `/`, `/home`, `/about`, `/projects`, `/experience`, `/contact`, `/git-profile`, and all blog routes. The `/` terminal prerenders a meaningful fallback (banner + help text + content) then hydrates the interactive engine (kept lazy).
- [ ] `<SEO>` shared component: per-route `<title>`, `<meta description>`, `<link rel=canonical>` (base `https://saddathasan.dev`), OG + Twitter tags. X card uses `@ekjongoru`.
- [ ] JSON-LD: `Person` on Home/About (with `sameAs` = GitHub/LinkedIn/X); `BlogPosting` per article (headline, datePublished, dateModified, author, image).
- [ ] Generate `sitemap.xml` (all routes + posts), `robots.txt`, `rss.xml` at build.

## Task group E — Performance / CWV
- [ ] Update `manualChunks`/lazy-loading: terminal engine, git-profile, framer-motion, Shiki all code-split. Route-level lazy.
- [ ] Font diet finalized: 2–3 GUI faces + JetBrains Mono, subset + preload LCP font, fallback metrics for CLS.
- [ ] Images: explicit width/height, lazy below fold, modern formats; cover images sized.
- [ ] INP: `useTransition`/`useDeferredValue` on terminal output rendering + project/blog filtering; `React.memo`/`useCallback` on hot paths.
- [ ] Wire the existing `web-vitals` dep to report LCP/INP/CLS (console in dev, optional endpoint in prod). Keep Sentry for errors.

## Task group F — Git-profile token proxy
> **Also unlocks the full contribution count.** Investigated 2026-05-31: the client token (correctly `saddathasan`) only sees PUBLIC activity (634/yr) — private & org work (InfinitiBit; the real ~1,521) is invisible because a `repo`/`read:org` SSO-authorized token can't be shipped to the browser. The git-profile is currently labelled "public activity" honestly. A server-side token here will let it show the true totals (use a `repo` + `read:org` PAT, SSO-authorized for the orgs; then drop the "public only" disclaimers in git-profile).
- [ ] Create a Cloudflare Pages Function in `functions/api/github.ts` that holds the GitHub token (env var in CF dashboard) and proxies the GraphQL query. Client calls the function, not GitHub directly.
- [ ] Remove any `VITE_GITHUB_TOKEN` from client code/env.
- [ ] Add a build-time cached fallback (SSG snapshot) so the page renders even if the API rate-limits.

---

## Verification / quality gates
- [ ] `pnpm build` produces static HTML per route (inspect `dist/` — each route has real content in the HTML, not an empty shell).
- [ ] `pnpm lint` green; Zod rejects a deliberately-broken test post.
- [ ] View-source on a blog post shows full content + correct `<title>`/meta/canonical/JSON-LD.
- [ ] Terminal: `blog` lists the TUI table; `cat hello-world` renders formatted; `cat hel<Tab>` autocompletes.
- [ ] Lighthouse ≥ 95 (Perf/SEO/Best-Practices/A11y) on Home + a blog post; LCP < 2.5s, INP < 200ms, CLS < 0.1.
- [ ] Initial elegant-site JS < 200 KB gz.
- [ ] git-profile works through the CF function with no token in the client bundle (`grep -ri "ghp_\|VITE_GITHUB_TOKEN" dist` → nothing).
- [ ] `sitemap.xml`, `robots.txt`, `rss.xml` present and valid.

## Definition of Done
Blog works in both modes from one MDX source; all routes prerendered + SEO-complete; CWV budgets met; token proxied. Open PR `feat/revamp-phase-3`.

---

## Session log
| Date | What got done | Build green? | Handoff note |
|------|---------------|--------------|--------------|
| | | | |

## Handoff notes
_(next-session pointer)_
