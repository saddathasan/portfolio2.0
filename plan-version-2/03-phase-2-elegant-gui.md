# Phase 2 — Elegant GUI Site (visitor mode)

> **Goal:** Build the refined, **light, editorial** GUI site a recruiter can scan in 20 seconds and a hiring manager can read in 5 minutes. One nav, one footer, one hero. Distinctive non-Inter type, generous whitespace, asymmetric layouts. Contact is a `mailto:` link — no form. This is the deliberate opposite of the terminal.
>
> **Prerequisites:** Phase 1 merged. · **Estimated sessions:** 3–4. · **Branch:** `feat/revamp-phase-2`.

---

## Objectives
1. A cohesive **light editorial** design system (tokens, type scale, spacing rhythm) that passes the "AI slop" test — no cyan-on-dark, no glassmorphism, no identical card grids, no big rounded icons over headings.
2. Pages `/home`, `/about`, `/projects`, `/experience`, `/contact` redesigned and consistent.
3. **One** `Nav` and **one** `Footer`, single-sourced from `src/data`.
4. Mode-switching works both ways (terminal ⇄ GUI), no full reloads, preference remembered.
5. Visible **"Download résumé"** CTA (hero/about/footer); contact = prominent `mailto:` + copy-to-clipboard + socials.

## Out of scope
- Blog (Phase 3) — but leave a `/blog` nav slot/placeholder.
- SSG/SEO tooling and JSON-LD (Phase 3) — though write semantic, accessible HTML now so Phase 3 is easy.

## Pre-flight
- [ ] `git checkout -b feat/revamp-phase-2`.
- [ ] Re-read [`00-master-plan.md`](./00-master-plan.md) §6.2 (visitor skin) and §8 (pages). Skim the `/frontend-design` guidance: commit to ONE bold-but-refined direction.
- [ ] Add the X handle to `src/data/contact.ts` (`https://x.com/ekjongoru`).

---

## Task group A — Design system (light, editorial)
- [ ] Define GUI tokens with modern CSS (`oklch`, `color-mix`, optional `light-dark()`): warm off-white bg, near-black tinted text, ONE restrained accent (links/CTAs only). Tint neutrals toward the accent hue.
- [ ] Type: **Clash Display** (display/headings) + **Uncut Sans** (body), optional **Space Grotesk** eyebrow/UI. Fluid sizes via `clamp()`. Modular scale. Preload the LCP heading font; add fallback `size-adjust` to prevent CLS.
- [ ] Spacing rhythm: varied, not uniform padding. Establish a scale and use tight groupings + generous separations.
- [ ] Motion: framer-motion, sparingly; one orchestrated page-load stagger; exponential ease-out; all gated on `usePrefersReducedMotion`.

## Task group B — Shared chrome
- [ ] Build ONE `Nav` (`shared/components/Nav`): brand, links (Home/About/Projects/Experience/Contact, + Blog slot), résumé button, a `>_ terminal` affordance, ⌘K hook. Responsive (adapt, don't amputate — no hidden critical actions on mobile).
- [ ] Build ONE `Footer`: socials (GitHub/LinkedIn/X), email `mailto:`, résumé, copyright. Single-sourced from `src/data/contact.ts`.
- [ ] Delete any leftover duplicate nav/footer components missed in Phase 0.

## Task group C — Pages
**Home** (`/home`)
- [ ] Hero: name, role (**Full-Stack & DevOps Engineer**), one-line value prop, primary CTA + résumé. Text-first, left-aligned, asymmetric — not a centered template.
- [ ] Highlights strip: years of experience, core stack, notable clients (Dell/Microsoft per `data/about.ts`) — woven in, NOT a hero-metric template.
- [ ] Featured projects (3) → cards linking live + repo. Contact CTA. A discreet `> back to terminal` link.

**About** (`/about`)
- [ ] Bio, "what I do", education, **Download résumé** button.

**Projects** (`/projects`)
- [ ] Filterable grid; filter uses `useDeferredValue` for snappy INP. Each card → live + repo. 3–6 emphasized, not 20.

**Experience** (`/experience`)
- [ ] Clean vertical timeline from `data/experience.ts`.

**Contact** (`/contact`)
- [ ] **No form.** Prominent email as `mailto:` with copy-to-clipboard; social links; location. Friendly, simple.
- [ ] **Toasts (`sonner`):** fire a concise toast on copy-email ("Email copied") and on résumé download ("Downloading résumé…"). Auto-dismiss, bottom or top-right, styled to the light theme, reduced-motion aware. Don't toast navigation or anything the user can already see.

## Task group D — Mode switching
- [ ] GUI → terminal: `>_ terminal` button + ⌘K "Open terminal" → `navigate('/')`.
- [ ] Terminal → GUI: already wired in Phase 1 (`gui`). Verify round-trip with no full reload.
- [ ] Returning-visitor nicety: if `preferredMode==='gui'`, show a subtle, dismissible banner on `/` offering to continue in GUI — **never auto-redirect** (protects SEO + intent).

## Task group E — Accessibility
- [ ] Semantic landmarks (`header`/`main`/`footer`/`nav`), skip-to-content link.
- [ ] On route change, move focus to the page `<h1>` (use existing `useFocusManagement`).
- [ ] WCAG AA contrast in the light theme; visible focus rings; labeled interactive elements.

---

## Verification / quality gates
- [ ] `pnpm build` + `pnpm lint` green.
- [ ] **AI-slop test:** would someone say "an AI made this"? If yes, revise. It should look hand-designed/editorial.
- [ ] Keyboard-only: nav, links, résumé, mode-switch, copy-email all reachable.
- [ ] Mobile (≤375px) and tablet layouts adapt (not just shrink); no horizontal scroll.
- [ ] Terminal ⇄ GUI round-trips with no full document reload; preference persists.
- [ ] Lighthouse a11y ≥ 95 on the GUI pages (perf tuned in Phase 3).

## Definition of Done
All pages redesigned + consistent, one nav/one footer, mode-switch both ways, contact is `mailto:`, résumé CTA present, a11y green. Open PR `feat/revamp-phase-2`.

---

## Session log
| Date | What got done | Build green? | Handoff note |
|------|---------------|--------------|--------------|
| | | | |

## Handoff notes
_(next-session pointer)_
