# Portfolio 2.0 — Revamp Master Plan (v2)

> **Author:** Saddat Hasan · **Date:** 2026-05-31
> **Status:** Approved direction, ready for phased execution
> **One-line vision:** A dual-personality portfolio — an interactive, **terminal-first** experience for engineers, with a one-keyword **escape hatch** into a clean, elegant GUI site for recruiters and non-technical visitors. Lean codebase, top-tier performance, strong SEO.

---

## 0. Decisions locked (from kickoff Q&A)

| # | Decision | Choice | Consequence |
|---|----------|--------|-------------|
| 1 | Dual-mode model | **Terminal-first, escape hatch** | `/` is the terminal. A visible hint lets non-tech visitors type a keyword (e.g. `gui`) to enter the elegant site. |
| 2 | Backend / CMS | **Go static (MDX/Markdown)** | Rip out Supabase, admin dashboard, auth. Content becomes file-based. No DB to run. |
| 3 | Tech stack | **Stay Vite SPA, optimize hard** | Keep Vite + TanStack Router. Add SSG/prerendering for SEO, aggressive code-splitting. Lowest migration risk. |
| 4 | Features to KEEP | **Terminal (core) + Git Profile / Wrapped** | Everything else is cut or demoted (see §4). Core portfolio pages (about/projects/experience/contact) are not "features" — they stay as the elegant site's content. |

### Round 2 refinements (2026-05-31, follow-up)

| Topic | Decision |
|-------|----------|
| **Terminal theme** | Single **oh-my-zsh `agnoster`-style** prompt on a **dark** theme. Powerline segmented prompt (context → dir → git) with arrow separators. **Drop** the multi-theme (matrix/cyberpunk/etc.) idea — one beautiful, authentic theme instead. |
| **Fonts** | **Terminal:** a real, terminal-friendly **monospace** (none in repo today — add one, e.g. JetBrains Mono / Geist Mono / IBM Plex Mono). **GUI:** use the repo's distinctive display/text fonts (Clash Display, Cabinet Grotesk, Panchang, Space Grotesk, Uncut Sans) — **not** Inter, **not** mono. |
| **Contact** | **Remove ALL email infrastructure** (nodemailer, `dev-server.js`, any serverless form). Just show the email address as a `mailto:` link. |
| **Blog** | **IN scope** as **static MDX** (promoted from optional). Must be **SEO-friendly** (prerendered HTML, per-post metadata, JSON-LD). **MDX frontmatter format to be confirmed before build** — see §17. |

> **Resolution of earlier Q2 ↔ Q4 note:** Supabase is still fully removed. The blog returns as **file-based MDX** (no DB, no admin UI) and is now **core scope**, not deferred.

---

## 1. Executive summary

The site today is two unintentional UIs bolted together: a terminal at `/`, and a conventional React site at every other route, with no designed bridge between them, a conflicting design system (light "minimal" vs forced-dark "terminal green"), a heavy Supabase CMS, and a large amount of duplicated/dead code.

This plan turns that accident into a **deliberate, polished product**:

1. **Two first-class, intentionally designed modes** that share data but not chrome.
2. **A real terminal** — authentic oh-my-zsh `agnoster` prompt, expanded command set, autocomplete, history, accessibility — that *demonstrates* engineering skill rather than just decorating the page.
3. **An elegant GUI site** that a recruiter can scan in 20 seconds and a hiring manager can read in 5 minutes.
4. **A ruthless cleanup**: remove Supabase, dead routes, duplicate components, and one of the two routers.
5. **Performance + SEO as features**: SSG-prerendered HTML, CWV budgets, < 200 KB initial JS for the elegant site.

---

## 2. Research findings (and how they shape this plan)

### 2.1 Terminal portfolios — what the good ones do
The canonical references (satnaing/terminal-portfolio, iamdhakrey, navnee1h) converge on a feature set worth adopting:

- **Discoverable command set** — small, memorable, with readable output. `help` is the anchor.
- **Multiple themes** — dark, light, matrix, cyberpunk, ubuntu, espresso. Theme switching *is itself* a command.
- **Keyboard-first**: immediate focus, `↑/↓` history, `Tab` autocomplete, `Ctrl+L` clear.
- **Config-driven content** — one source of truth feeds both the terminal and (for us) the GUI.

**Applied here:** our terminal already has a virtual filesystem (`ls`/`cd`/`cat`). We expand it into a *capable* CLI (see §7) and make content single-sourced from `src/data` (already true for projects/skills/experience — extend it).

### 2.2 Terminal UX & accessibility
From UX Patterns (command palette / autocomplete) and Warp's accessibility docs:

- Every action must be **keyboard reachable**; assign keybindings up front.
- Autocomplete needs `aria-autocomplete`, `aria-expanded`, non-trapped focus, and a clear "no results" state.
- Group **command + output as blocks** for navigable scrollback (we already render history as blocks — formalize it).
- A **command palette** (`Ctrl/Cmd+K`) is the expected power-user affordance — add one that works in *both* modes.

### 2.3 Vite SSG / SEO
React SPAs ship an empty HTML shell, which hurts LCP and SEO. Fix without leaving Vite:

- Adopt **`vite-react-ssg`** (Daydreamer-riri) — prerenders routes to static HTML at build time, same Vite pipeline, `getStaticPaths()` for dynamic routes, auto style-extraction to avoid FOUC.
- Per-route `<head>` via `react-helmet-async` (already installed) → unique title/description/OG per page.
- Prerender the **elegant** routes (great for crawlers); the terminal at `/` stays an interactive island but still ships meaningful prerendered fallback content + meta.

### 2.4 Core Web Vitals (2024+ targets)
INP replaced FID. Targets: **LCP < 2.5 s, INP < 200 ms, CLS < 0.1.**

- Biggest ROI = **bundle size**. Keep elegant-site initial JS **< 200 KB**; route-split everything else.
- INP: `useTransition` / `useDeferredValue` for expensive renders (terminal output, project filtering), `React.memo`/`useCallback` on hot paths, web worker for the Sudoku solver *if* kept (it isn't — cut).
- CLS: reserve space for fonts (we already use `font-display: swap` + variable fonts — add `size-adjust`/fallback metrics), images get explicit dimensions.
- LCP: SSG returns the hero in the first HTML response.

### 2.5 Frontend architecture
2025 consensus = **feature-based / colocated** structure (Feature-Sliced Design, "screaming architecture"), max 2–3 levels of nesting, `shared/` for cross-cutting code. Our current `components/` is a flat 36-file dump — restructure into features (see §5).

**Sources**
- [satnaing/terminal-portfolio](https://github.com/satnaing/terminal-portfolio) · [iamdhakrey/terminal-portfolio](https://github.com/iamdhakrey/terminal-portfolio) · [freeCodeCamp: interactive terminal portfolio](https://www.freecodecamp.org/news/how-to-create-an-interactive-terminal-portfolio-website/)
- [vite-react-ssg](https://github.com/Daydreamer-riri/vite-react-ssg) · [Vite SSR/SSG guide](https://vite.dev/guide/ssr) · [SEO for React+Vite](https://dev.to/ali_dz/optimizing-seo-in-a-react-vite-project-the-ultimate-guide-3mbh)
- [Core Web Vitals 2025 guide](https://www.digitalapplied.com/blog/core-web-vitals-optimization-guide-2025) · [CWV for SPAs](https://www.stackmatix.com/blog/core-web-vitals-optimization-spa)
- [Feature-Sliced Design folder structure](https://feature-sliced.design/blog/frontend-folder-structure) · [Scalable React structure 2025](https://dev.to/pramod_boda/recommended-folder-structure-for-react-2025-48mc)
- [Command Palette pattern](https://uxpatterns.dev/patterns/advanced/command-palette) · [Autocomplete pattern](https://uxpatterns.dev/patterns/forms/autocomplete) · [Warp accessibility](https://docs.warp.dev/terminal/more-features/accessibility/)

---

## 3. Current-state audit

**Stack:** Vite 6, React 18, TS 5.8, TanStack Router (file-based), Tailwind 3, shadcn/ui, framer-motion, Supabase, TipTap, react-query.

**What works and stays:** the virtual-filesystem terminal core, the git-profile feature (octokit + GraphQL), the shadcn/ui primitives, the data-driven content in `src/data`, react-helmet-async, web-vitals.

**Problems identified:**

1. **Two routers installed** — `react-router-dom@6` *and* `@tanstack/react-router`. Only TanStack is used. `react-router-dom` is dead weight.
2. **Conflicting design systems** — `index.css` defines a light "Lee Robinson minimal" palette *and* a dark "terminal green" palette, while `__root.tsx` force-adds `.dark` globally. No coherent identity.
3. **Heavy unused/over-scoped infra** — Supabase client, `AuthContext`, admin dashboard (`admin.tsx`, 14.8 KB), TipTap rich-text editor, blog CRUD — all to be removed per Decision 2/4.
4. **Component duplication** — navigation: `Navbar`, `Navigation`, `ResponsiveNavigation`, `MobileNavigation`, `AppSidebar` (5 components for one job). Heroes: `Hero` + `HeroSection`. Footers: `Footer`, `GlobalFooter`, `FooterCallToAction`, `Copyright`. Cards: `AnimatedCard`, `InfoCard`, `ProjectCard`, `ContentGrid`.
5. **Dev cruft committed** — `FontTestComponent`, `FontIntegrationTest`, `fontVerification.ts`, root scripts `test-blog-crud.js`, `test_auth.js`, `create_admin_user.js`, `create_admin_profile.cjs`, `create_user_simple.js`, `dev-server.js` (email server).
6. **6 variable fonts loaded** (Inter, Cabinet Grotesk, Clash Display, Panchang, Space Grotesk, Uncut Sans) — heavy, only ~3 referenced. Bundle + CLS risk.
7. **No designed bridge** between terminal and the rest; navigation between modes is implicit/`window.location.href` hard reloads (see `useTerminal` `git` case).
8. **No SSG** — pure CSR shell; weak SEO and LCP.

---

## 4. Feature decisions: KEEP / REFACTOR / REMOVE

| Feature | Verdict | Action |
|---------|---------|--------|
| **Terminal** (`/`, virtual FS) | ✅ **KEEP — expand** | Becomes the flagship. New commands, autocomplete, themes, command palette, mode-switch keyword. See §7. |
| **Git Profile / Wrapped** (`/git-profile`) | ✅ **KEEP — refactor** | Move token behind a serverless proxy (don't ship `VITE_GITHUB_TOKEN` to client). Accessible from terminal (`git profile`) and elegant site. Add SSG-cached fallback. |
| **About / Projects / Experience / Contact** | ✅ **KEEP — these ARE the elegant site** | Redesign as the non-tech GUI (§8). Single-source data from `src/data`. |
| **Contact form + email** (`dev-server.js`, nodemailer) | ❌ **REMOVE entirely** | No form, no email server, no serverless. Replace with a plain `mailto:` link showing the address (+ copy-to-clipboard). Delete `dev-server.js`, nodemailer/express/cors. |
| **Blog** (was Supabase + TipTap + admin) | ♻️ **REBUILD as static MDX** | Delete the Supabase/TipTap/admin implementation, but **rebuild the blog as file-based MDX** — core scope, SEO-friendly. Readable from both modes (`blog` / `posts` command in terminal; `/blog` in GUI). |
| **Bookmarks** (`/bookmarks`, `bookmarks.json`) | ❌ **REMOVE** | Cut. Not selected. (Data preserved in git history if ever revived.) |
| **Sudoku game** (`/games`, `sudokuGame/*`, `useSudoku`) | ❌ **REMOVE** | Cut. Big surface area, off-message. Optionally resurface as a fun terminal easter-egg command later. |
| **Presentation** (`/presentation/*`, Frontend 101 slides) | ❌ **REMOVE from portfolio** | Cut from the site. Keep the markdown in `feature-description/` as teaching material. |
| **Ranks** (`/ranks`) | ❌ **REMOVE** | Cut (unclear purpose, thin route). |
| **Writing** (`/writing`) | ❌ **REMOVE / fold** | Cut now; becomes the optional MDX Writing section in Phase 4 if desired. |
| **Admin** (`/admin`) + Auth | ❌ **REMOVE** | Deleted with Supabase. |
| **Supabase / react-query / TipTap / react-router-dom** | ❌ **REMOVE deps** | Uninstall. react-query only existed for blog/bookmarks data fetching; git-profile can use a small fetch + cache. |

**Net effect:** routes drop from ~17 to ~6; dependencies shrink substantially; one router, one design system.

---

## 5. Target architecture

### 5.1 Mental model — two modes, one data layer

```
                         ┌──────────────────────────────┐
                         │        src/data (SoT)         │
                         │ profile · projects · skills · │
                         │ experience · contact · social │
                         └───────────────┬───────────────┘
                ┌────────────────────────┴────────────────────────┐
                ▼                                                  ▼
        ENGINEER MODE                                       VISITOR MODE
     (Terminal, route "/")                              (Elegant GUI site)
   ┌────────────────────────┐                     ┌────────────────────────────┐
   │ virtual FS · commands · │   ── "gui" ──▶      │ /home /about /projects ... │
   │ autocomplete · themes   │   ◀── "cli" ──      │ nav · hero · cards · footer│
   └────────────────────────┘                     └────────────────────────────┘
                └───────────── shared: command palette (⌘K), theme, SEO ─────────┘
```

- **Single source of truth:** all content lives in `src/data/*` as typed objects. The terminal renders it as files/JSON; the GUI renders it as components. Edit once, both update.
- **Mode is a route concern, not a global flag:** `/` = terminal; `/home`, `/about`, etc. = elegant. Switching modes = navigating (client-side, no full reload — fix the current `window.location.href` hard nav).

### 5.2 Folder structure (Feature-Sliced-lite)

```
src/
├── app/                      # composition root: router, providers, global styles
│   ├── App.tsx
│   ├── providers.tsx         # Helmet, Theme, ErrorBoundary, Announcer
│   └── router.tsx
├── routes/                   # TanStack file-based routes (thin; delegate to features)
│   ├── __root.tsx
│   ├── index.tsx             # terminal mode
│   ├── home.tsx  about.tsx  projects.tsx  experience.tsx  contact.tsx
│   └── git-profile.tsx
├── features/
│   ├── terminal/             # engine, commands, FS, autocomplete, themes, UI
│   │   ├── engine/           # command parser, registry, fs resolver (pure, testable)
│   │   ├── commands/         # one file per command (help, ls, cat, theme, gui, ...)
│   │   ├── components/       # Terminal, CommandInput, OutputDisplay, Suggestions
│   │   └── hooks/            # useTerminal, useCommandHistory, useAutocomplete
│   ├── git-profile/          # existing components/git-profile, refactored
│   └── elegant/              # GUI-mode sections: Hero, ProjectGrid, Timeline, Contact
├── shared/
│   ├── ui/                   # shadcn primitives (button, card, dialog, ...)
│   ├── components/           # CommandPalette, ThemeToggle, SEO, ModeSwitch
│   ├── hooks/                # useMediaQuery, useLocalStorage, usePrefersReducedMotion
│   ├── lib/                  # utils, github client, cn()
│   └── types/
├── data/                     # SINGLE SOURCE OF TRUTH (profile, projects, ...)
├── styles/                   # index.css (one design system, tokens for both modes)
└── main.tsx
```

Rules: max 3 levels deep; features never import from each other (only from `shared/` and `data/`); engine logic is pure and unit-testable.

### 5.3 Routing & rendering

- **TanStack Router** stays (drop `react-router-dom`).
- Add **`vite-react-ssg`** for build-time prerendering of elegant routes + a prerendered terminal fallback.
- Each route owns its `<head>` (title/description/canonical/OG) via a shared `<SEO>` component.

### 5.4 State

- No global state library needed. Terminal state is local to its feature (reducer); theme + mode preference in `localStorage` via `useLocalStorage`.
- Git-profile data: `fetch` + in-memory + `localStorage` TTL cache (replaces react-query for this single use).

---

## 6. Design system — two deliberately opposite skins

The two modes should feel like **two different products that happen to share data**. The terminal is dark, monospace, and authentically CLI; the GUI is its refined opposite. Define design tokens once (modern CSS: `oklch`, `color-mix`, `light-dark()`), expose two skins.

> **Anti-slop guardrail (from `/frontend-design`):** the cyan-on-dark / neon-glow / mono-as-decoration look is the #1 fingerprint of AI-generated sites. It's *correct and intentional* inside the terminal (it really is a terminal). It is **banned from the GUI** — the GUI must read as hand-designed and editorial.

### 6.1 Engineer skin — Terminal (agnoster, dark)
- **Authentic oh-my-zsh `agnoster` prompt.** Segmented, powerline-style: `context (user@host)` → `dir` → `git branch/status`, each a colored segment with the signature **arrow `` separators**. Render separators as **CSS shapes**, *not* font glyphs, so it's reliable without a Nerd Font.
- **Single dark theme**, tuned to the real agnoster palette (deep slate/near-black bg, segment blues/greens/greys, a single readable accent). No theme switcher.
- **Mono font:** add a genuine terminal font — **JetBrains Mono** (recommended), Geist Mono, or IBM Plex Mono. Ligatures on. This is the *one* place monospace is correct.
- Optional, *very* subtle CRT/scanline texture gated behind `prefers-reduced-motion` (default off; can ship later).

### 6.2 Visitor skin — Elegant GUI (light, editorial)
- **Mood:** brutally simple, editorial, text-first, generous whitespace, asymmetric left-aligned layouts (research: best minimal eng portfolios open on a single left-aligned text column, 3–6 projects, whitespace as the separator — not borders/cards everywhere).
- **Light-first** (off-white/warm-neutral bg, near-black tinted text, **one** restrained accent used only for links/CTAs), with an optional dark variant. **No glassmorphism, no identical card grids, no hero-metric template, no big rounded icons over headings.**
- **Fonts (from the repo, not Inter, not mono):**
  - Display / headings: **Clash Display** (or **Panchang** for more character).
  - Body / long-form: **Uncut Sans** (clean, neutral, readable).
  - Optional UI/eyebrow accent: **Space Grotesk** or **Cabinet Grotesk**.
  - Drop unused faces; subset + `preload` the LCP heading font; add fallback `size-adjust` metrics to kill CLS.
- **Motion:** one well-orchestrated load (staggered reveal) beats scattered micro-interactions; framer-motion used sparingly, gated on `usePrefersReducedMotion`. Exponential ease-out only — no bounce/elastic.

### 6.3 Shared
Tokens, spacing scale, fluid type (`clamp`), `<SEO>`, command palette (⌘K), and the mode-switch live in `shared/` and are consumed by both skins.

---

## 7. Engineer mode — the Terminal (flagship)

### 7.1 Command set (expanded)

| Command | Purpose |
|---------|---------|
| `help` | List commands, grouped, with one-line descriptions |
| `ls` / `cd` / `cat` / `pwd` | Virtual FS navigation (exists — keep, harden) |
| `about` | Render bio (shortcut for `cat about.md`) |
| `projects [name]` | List or open a project; `open <name>` launches live/repo URL |
| `skills` | Grouped skill matrix |
| `experience` | Timeline |
| `contact` / `email` | Print email address + open `mailto:` (no form) |
| `blog` / `posts` | `cd` into `/blog` and `ls` it — list posts as a TUI table; then `cat <slug>` renders a post inline (see §7.4) |
| `git profile` / `git wrapped` | Launch git-profile (client-side nav, no reload) |
| `gui` (aliases: `simple`, `exit`, `web`) | **Escape hatch → elegant site** |
| `resume` / `cv` | Open `public/resume.pdf` in a **new tab** (viewable) + offer download |
| `social` | Links (GitHub, LinkedIn, X) |
| `clear` (`Ctrl+L`) | Clear scrollback |
| `history` | Show command history |
| `whoami`, `sudo`, `echo` | Personality / easter eggs |
| `banner` | Reprint ASCII banner |

Commands implemented as a **registry** (`Record<string, Command>` with `name`, `description`, `aliases`, `run()`), so adding one = one file. This is itself a clean-architecture showpiece.

### 7.2 Terminal UX (from research §2.1–2.2)

- **Autocomplete:** `Tab` completes commands and FS paths; suggestion list has `aria-autocomplete`/`aria-expanded`, arrow-key nav, `Esc` to dismiss, visible "no match" state.
- **History:** `↑/↓` recall; persisted to `localStorage`.
- **Command palette (`Ctrl/Cmd+K`):** fuzzy command launcher, available in *both* modes.
- **Blocks:** each command+output is a navigable block; scrollback searchable (`Ctrl+R` future).
- **Performance:** virtualize history if it grows; wrap heavy output rendering in `useDeferredValue`.

### 7.3 Discoverability of the escape hatch
A persistent, friendly line under the banner:
> `Not a developer? Type `gui` and press Enter for the visual site →`
Plus a small clickable `[ GUI mode ]` chip for mouse users (keyboard-first, but not keyboard-only).

### 7.4 Blog inside the terminal (virtual filesystem)
The blog is mounted into the existing virtual FS — so it reuses the `ls` / `cd` / `cat` engine and the path autocomplete that already works today. **No new bespoke UI; the blog *is* the filesystem.**

- At build time, the MDX posts are indexed into FS nodes under a `/blog` directory. With categories, each category is a **subdirectory**:
  ```
  /blog
  ├── devops/
  │   ├── ci-cd-pipelines.md
  │   └── k8s-on-a-budget.md
  ├── react/
  │   └── dual-mode-portfolio.md
  └── general/
      └── hello-world.md
  ```
- `blog` (or `posts`) = sugar for `cd /blog` + `ls`. **`ls` renders a TUI-style table**, not just names: e.g. `DATE        CATEGORY   READ   TITLE` columns, aligned, with the slug highlighted — readable scannable list output.
- `cd devops` then `ls` drills into a category; **`cat <slug>` (`.md` optional) fully renders the post inline with proper terminal formatting** — *not* raw Markdown text. The MDX is compiled to richly styled terminal output: weighted headings, **bold**/*italic*, bulleted/numbered lists, indented blockquotes, inline `code`, clickable links, horizontal rules, tables, and **syntax-highlighted fenced code blocks** themed for the agnoster dark palette. (Embedded React components degrade to a sensible inline representation, with an `open` hint for the full interactive GUI version.) Long posts scroll within the existing scrollback; a footer line offers `open` to read it in the GUI.
- **Autocomplete already covers this:** typing `cat ci<Tab>` completes against the post filenames in the current directory, exactly like file completion works now (`src/lib/autocomplete.ts` + `CommandInput`). Because posts are real FS nodes, this comes "for free" once they're indexed.
- **Single source of truth:** the *same* compiled MDX feeds the GUI blog (§8) and this terminal view — authored once in `src/blog/`, rendered two ways (rich GUI article vs. terminal `cat`). The GUI gets the full magazine treatment; the terminal gets the authentic `cat a-file` experience.

Implementation note: extend `buildProjectsDirectory()` in `src/lib/terminal.ts` with a parallel `buildBlogDirectory()` that reads the MDX index; the resolver/`cat`/`ls`/autocomplete paths need no changes since they already operate on generic FS nodes.

---

## 8. Visitor mode — the elegant GUI site

Designed for recruiters/clients: scannable, fast, trustworthy. Routes: `/home`, `/about`, `/projects`, `/experience`, `/contact` (and `/git-profile`).

- **Home:** hero (name, role: *Full-Stack & DevOps Engineer*, one-line value prop, CTA), highlights strip (years, stack, notable clients — Dell/Microsoft per `about.ts`), featured projects (3), contact CTA. A discreet `> back to terminal` link/⌘K entry.
- **About:** bio, "what I do", education, and a clear **"Download résumé"** button (a primary, visible affordance — standard on strong engineer portfolios per the research; links to `public/resume.pdf`, opens in a new tab / downloads). The résumé CTA also appears in the hero and footer.
- **Projects:** filterable grid (filter via `useDeferredValue` for INP), each card → live + repo links.
- **Experience:** clean vertical timeline.
- **Contact:** **no form** — a prominent email address as a `mailto:` link with copy-to-clipboard, plus social links.
- **Blog:** a proper GUI blog — `/blog` (post list with category sections + tag filters), `/blog/<category>` (category landing), `/blog/<slug>` (full article: rich MDX, Shiki code blocks, reading time, prev/next, share). Same MDX source as the terminal view (§7.4), prerendered for SEO (§17).
- **Consistency:** one nav, one footer (replacing the 5 nav / 4 footer components), shared `<SEO>`.

---

## 9. The mode-switching mechanism

- **Terminal → Elegant:** `gui` command (+ aliases) → `router.navigate('/home')`. Remember preference in `localStorage` (`preferredMode`).
- **Elegant → Terminal:** persistent `>_` button in the nav + ⌘K → "Open terminal" → navigate `/`.
- **First visit:** always lands on terminal (`/`) per Decision 1. Returning visitors who previously chose `gui` get a subtle banner offering to continue in GUI (non-intrusive; never auto-redirect — protects SEO and respects intent).
- **No hard reloads** — fix `window.location.href` usages to use the router.

---

## 10. Performance & SEO plan

**Budgets / targets:** LCP < 2.5 s · INP < 200 ms · CLS < 0.1 · elegant-site initial JS < 200 KB · Lighthouse ≥ 95 (Perf/SEO/Best-Practices/A11y).

- **SSG:** `vite-react-ssg` prerenders elegant routes + terminal fallback HTML.
- **Per-route metadata:** unique title/description/canonical/OG/Twitter; `sitemap.xml` + `robots.txt`; JSON-LD `Person` schema on Home/About.
- **Code-splitting:** terminal engine, git-profile, and framer-motion lazy-loaded; route-level `lazy`.
- **Fonts:** 2 fonts, subset, preload LCP font, `font-display: swap` + fallback metrics.
- **Images:** explicit dimensions, lazy below the fold, modern formats.
- **INP:** `useTransition`/`useDeferredValue` on terminal output & project filtering; `React.memo` hot paths.
- **Monitoring:** wire the already-present `web-vitals` to log/report; keep Sentry (already installed) for errors.

---

## 11. Accessibility plan

- Terminal: full keyboard reachability, ARIA on autocomplete, `aria-live="polite"` for new output, visible focus rings, `prefers-reduced-motion` disables scanlines/heavy motion.
- Elegant: semantic landmarks, skip-to-content, WCAG AA contrast in both themes, focus management on route change (move focus to `<h1>`), labeled form fields + error announcements.
- Keep/extend the existing `Accessibility.tsx` announcer and `useFocusManagement`.

---

## 12. Cleanup / refactor checklist (concrete)

**Delete (files/dirs):**
- `src/routes/admin.tsx`, `blog.tsx`, `blog.$slug.tsx`, `blog.index.tsx`, `bookmarks.tsx`, `games.tsx`, `ranks.tsx`, `writing.tsx`, `presentation.tsx`, `presentation/*`
- `src/pages/Blog.tsx`, `BlogPost.tsx`, `pages/admin/*`
- `src/components/blog/*`, `bookmarks/*`, `sudokuGame/*`, `auth/*`
- `src/context/AuthContext.tsx`, `src/hooks/useBlog.ts`, `useBookmarks.ts`, `useBookmarkFilters.ts`, `useSudoku.ts`, `useAuth.ts`
- `src/lib/supabase.ts`, `src/components/FontTestComponent.tsx`, `FontIntegrationTest.tsx`, `src/utils/fontVerification.ts`
- Duplicates: `HeroSection.tsx` (keep `Hero`), `Navigation.tsx`/`ResponsiveNavigation.tsx`/`MobileNavigation.tsx`/`AppSidebar.tsx` (consolidate into one `Nav`), `GlobalFooter.tsx`/`FooterCallToAction.tsx`/`Copyright.tsx` (consolidate into one `Footer`)
- Root scripts: `test-blog-crud.js`, `test_auth.js`, `create_admin_user.js`, `create_admin_profile.cjs`, `create_user_simple.js`, `dev-server.js` (email server — gone entirely), `EMAIL_SETUP_GUIDE.md`, `deployment-commands.txt`
- `src/data/bookmarks.json`, unused SVGs in `src/assets`, unused font files (keep only the 2–3 GUI faces + the new mono)

**Uninstall deps:** `@supabase/supabase-js`, `react-router-dom`, `@tanstack/react-query`, all `@tiptap/*`, `lowlight`, **`nodemailer` + `express` + `cors` + `concurrently`** (email removed entirely), `prism-react-renderer` (unless reused for MDX/git-profile code highlighting), `@radix-ui/*` not used after feature cuts.
**Add deps:** an MDX toolchain (e.g. `@mdx-js/rollup` + `remark`/`rehype` plugins + `gray-matter`), a syntax highlighter for code blocks (`rehype-pretty-code` / Shiki), and a mono webfont (JetBrains Mono).

**Refactor:** consolidate nav/footer/hero/cards; move components into `features/` + `shared/`; convert terminal commands to a registry; replace `window.location.href` with router navigation; unify design tokens in one CSS file; contact = `mailto:` link only.

---

## 13. Phased roadmap

> Each phase is independently shippable and leaves the site in a working state.

**Phase 0 — Cleanup & foundation (highest ROI, lowest risk)**
Remove Supabase/blog/bookmarks/games/admin/presentation/ranks/writing; uninstall dead deps; delete root scripts & dev cruft; collapse to one router; unify design tokens; restructure into `app/`, `features/`, `shared/`. *Exit: smaller bundle, green build, ~6 routes.*

**Phase 1 — Terminal v2 (flagship)**
Command registry; new commands; autocomplete + ARIA; persisted history; theme command + 4–5 themes; ⌘K palette; fix client-side nav; `gui` escape hatch + discoverable hint. *Exit: terminal is genuinely useful and accessible.*

**Phase 2 — Elegant site redesign**
One nav/footer/hero; redesign Home/About/Projects/Experience/Contact against the visitor skin (§6.2); single-sourced data; mode-switch UX both directions; contact = `mailto:` link only. *Exit: a recruiter-ready GUI site.*

**Phase 3 — MDX blog + Performance & SEO**
Build the **static MDX blog** (confirmed format §17): MDX pipeline, post list + post page, code highlighting, reading time. Integrate `vite-react-ssg` to prerender all elegant routes **and every blog post**; per-route meta + `BlogPosting`/`Person` JSON-LD + sitemap/robots/RSS; font diet + preload; code-split; wire web-vitals; hit Lighthouse ≥ 95 and CWV budgets. Refactor git-profile token behind a serverless proxy + cached fallback. *Exit: fast, crawlable, measured, with a working blog.*

**Phase 4 — Optional polish (only if wanted)**
Terminal easter eggs (e.g. resurface a mini-game as a command); subtle CRT texture; analytics; dark variant of the GUI. *Exit: nice-to-haves, no core dependency.*

---

## 14. Risks & trade-offs

- **Terminal-first hurts non-tech bounce/SEO** → mitigated by prerendered meaningful content at `/`, a *loud* `gui` hint, remembered preference, and fully crawlable elegant routes. Never auto-redirect.
- **SSG + an interactive terminal at `/`** → prerender a static fallback (banner + help text + content), hydrate the interactive engine on load; keep terminal JS lazy.
- **Removing Supabase loses the CMS** → accepted; content is code (single source of truth), which is *better* for a portfolio and for the dual-mode data sharing.
- **Scope creep on terminal commands** → registry keeps it cheap; ship the table in §7.1 and stop.

---

## 15. Success metrics / quality gates

- Build + typecheck + lint green; **zero** dead deps in `package.json`.
- Routes reduced to ~6; components de-duplicated (one nav, one footer, one hero).
- Lighthouse ≥ 95 across categories; LCP < 2.5 s, INP < 200 ms, CLS < 0.1.
- Initial elegant-site JS < 200 KB gz.
- Terminal: keyboard-only operable end-to-end; autocomplete + history + themes + `gui` switch all working.
- Mode switching both ways with no full-page reload; preference remembered.
- WCAG AA in both themes; `prefers-reduced-motion` honored.

---

## 16. Open questions (non-blocking — sensible defaults assumed)

1. ~~Terminal themes~~ — **Resolved:** single agnoster dark theme.
2. ~~Fonts~~ — **Resolved:** GUI = Clash Display + Uncut Sans (+ optional Space Grotesk accent); terminal = JetBrains Mono.
3. ~~Contact email~~ — **Resolved:** `mailto:` link only, no infra. → *Confirm the email to display* (default: `saddathasan94@gmail.com`).
4. ~~Hosting~~ — **Resolved: Cloudflare Pages** (as today). The git-profile GitHub token proxy will be a **Cloudflare Pages Function** (`/functions`), consistent with the existing `wrangler.toml`.
5. ~~MDX blog format~~ — **Resolved** — see §17.
6. ~~Résumé asset~~ — **Resolved:** lives at `public/resume.pdf`. Terminal `resume`/`cv` opens it in a new tab (+ download); GUI shows a "Download résumé" button (hero/about/footer).

**All resolved:**
- **Production / canonical domain:** `https://saddathasan.dev` (Cloudflare Pages custom domain). Used for `<link rel=canonical>`, OG `url`, sitemap, RSS, JSON-LD `Person.url`.
- **Email:** `saddathasan94@gmail.com` · **LinkedIn:** `linkedin.com/in/saddathasan` · **GitHub:** `github.com/saddathasan` · **X:** `https://x.com/ekjongoru` · **Location:** Dhaka, Bangladesh. (These feed the footer + JSON-LD `sameAs`; sourced from `src/data/contact.ts`, add the X handle there.)

---

## 17. MDX blog format — PROPOSAL (needs your confirmation)

Each post = one file at **`src/blog/<slug>.mdx`** (or `src/blog/<category>/<slug>.mdx` — the category folder becomes a terminal subdirectory, see §7.4). The slug is the filename. Frontmatter is parsed with `gray-matter`; the body is **MDX, a superset of Markdown** — a plain-Markdown post is valid MDX and renders as-is; embed React components (`<Callout>`, charts, demos) only when a post needs it. Same pipeline for both.

Schema is validated with **Zod `.passthrough()`** at build time: a malformed *known* field fails the build (not production), while **unknown fields pass through untouched** — so you can add or remove frontmatter fields freely now and later; promoting a field to "first-class" (validated + wired into UI/SEO) is a one-line schema change. Proposed starting fields:

```mdx
---
title: "Designing a Dual-Mode Portfolio"        # required — <title> + OG + h1
description: "Why I built a terminal-first site." # required — meta description + OG (≤160 chars)
publishedAt: "2026-05-31"                         # required — ISO date
updatedAt: "2026-06-02"                           # optional — shows "updated" + JSON-LD dateModified
category: "devops"                                 # optional — single primary bucket (defaults to "general"); = terminal subdir + GUI section
tags: ["react", "architecture", "ci-cd"]           # optional — fine-grained keywords for filtering/search
draft: false                                       # optional — true = excluded from build/list
cover: "/blog/dual-mode/cover.png"                 # optional — OG image + hero
coverAlt: "Split screen: terminal and elegant site"# required if cover set (a11y)
canonical: "https://saddathasan.dev/blog/..."      # optional — if cross-posted elsewhere
---

## Intro

Normal **Markdown** works. Code blocks get Shiki highlighting:

\`\`\`ts
export const greet = (name: string) => `hi ${name}`;
\`\`\`

You can also drop in React components:

<Callout type="tip">MDX lets me embed interactive demos.</Callout>
```

**Derived automatically (not in frontmatter):** `readingTime` (computed from content), `slug` (from filename), `wordCount`.

**SEO handling for every post:**
- Prerendered to static HTML via `vite-react-ssg` `getStaticPaths()` (real content in the initial response — crawlable, fast LCP).
- Unique `<title>`, `<meta description>`, `<link rel=canonical>`, Open Graph + Twitter Card tags from frontmatter.
- **`BlogPosting` JSON-LD** (headline, datePublished, dateModified, author=Person, image) injected per post.
- Auto-generated `sitemap.xml` (includes every post) + `rss.xml` + per-tag pages.

**Confirmed (round 3):** location = `src/blog/`; full MDX (with plain-Markdown posts as the simple case); extensible frontmatter via Zod `.passthrough()`; model = **single optional `category` + flat `tags`** (category powers the terminal subdirectory + GUI section).

---

*This is the master plan. Phase-level detail docs (e.g. `01-phase0-cleanup.md`, `02-terminal-v2.md`) can be split out from here as execution begins.*
