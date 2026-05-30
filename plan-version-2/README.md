# Portfolio 2.0 — v2 Revamp · Execution Index

This folder is the **execution plan** for the portfolio revamp. Read [`00-master-plan.md`](./00-master-plan.md) once for the full vision, decisions, and architecture. Then execute the phases below **in order** — each is a standalone doc with achievable goals, a granular checklist, file-level instructions, verification gates, and a session log you fill in as you go.

## The big picture (decided)
- **Terminal-first** at `/` (oh-my-zsh **agnoster** dark theme), with a `gui` keyword escape hatch to an **elegant, light, editorial GUI site** for non-tech visitors. Both share one data layer.
- **Static** — no Supabase, no admin, no auth, **no email backend** (just a `mailto:` link). Blog is **static MDX** mounted into the terminal's virtual filesystem *and* rendered as a GUI blog.
- **Stay Vite + TanStack Router**; add `vite-react-ssg` prerendering for SEO. Host on **Cloudflare Pages** (`https://saddathasan.dev`).
- **Keep:** Terminal (flagship) + Git Profile/Wrapped. **Cut:** blog-CMS/admin/auth, bookmarks, sudoku, presentation, ranks, writing, email.

## Phases

| # | Doc | Goal | Est. sessions | Status |
|---|-----|------|---------------|--------|
| 0 | [`01-phase-0-cleanup.md`](./01-phase-0-cleanup.md) | Strip cruft, one router, one design system, feature-based structure | 2–3 | ✅ Done (deep token-unify + `app/`/`styles/` folders deferred to Phase 1/2) |
| 1 | [`02-phase-1-terminal.md`](./02-phase-1-terminal.md) | Terminal v2: agnoster prompt, command registry, autocomplete, history, `gui` switch | 3–4 | ✅ Done (`gui`→`/about` temp; token-unify deferred to P2) |
| 2 | [`03-phase-2-elegant-gui.md`](./03-phase-2-elegant-gui.md) | Elegant GUI site: one nav/footer/hero, redesigned pages, `mailto:` contact | 3–4 | ◐ Next up |
| 3 | [`04-phase-3-blog-seo-perf.md`](./04-phase-3-blog-seo-perf.md) | MDX blog (terminal + GUI), SSG prerender, SEO, Core Web Vitals | 4–5 | ☐ Not started |
| 4 | [`05-phase-4-optional.md`](./05-phase-4-optional.md) | Optional polish: easter eggs, CRT texture, analytics, GUI dark mode | open | ☐ Not started |

## How to work this across sessions
1. **One phase at a time.** Don't start a phase until the previous one's "Definition of Done" is checked.
2. **All revamp work lives on the long-lived `version-2` branch.** Commit per task-group with clear messages; the phase docs' "branch" lines are superseded by this single branch.
3. At the **start of a session**, open the current phase doc, read its "Session log" + "Handoff notes", and pick up the first unchecked task.
4. At the **end of a session**, tick completed boxes, append a row to the phase's "Session log", and write a one-line "Handoff note" for next time.
5. **Quality gate every session:** `pnpm build` (or `npm run build`) + `pnpm lint` must stay green before you stop. Never leave the tree broken between sessions.

## Global success criteria (whole project)
- Build + typecheck + lint green; **zero** dead deps in `package.json`.
- Routes reduced ~17 → ~7; components de-duplicated (one nav, one footer, one hero).
- Lighthouse ≥ 95 (Perf/SEO/Best-Practices/A11y); LCP < 2.5s · INP < 200ms · CLS < 0.1.
- Elegant-site initial JS < 200 KB gz.
- Terminal fully keyboard-operable: agnoster prompt, autocomplete, history, `gui` switch, blog via `cat`.
- WCAG AA in both modes; `prefers-reduced-motion` honored.
