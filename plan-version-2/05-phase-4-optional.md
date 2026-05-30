# Phase 4 — Optional Polish (only if wanted)

> **Goal:** Nice-to-haves with **no core dependency**. Pick any subset, any time, after Phases 0–3 ship. Each item is independent — treat them as a backlog, not a sequence.
>
> **Prerequisites:** Phases 0–3 merged. · **Estimated sessions:** open / à la carte. · **Branch:** one per item, e.g. `feat/polish-<item>`.

---

## Backlog (each independently shippable)

### Terminal delight
- [ ] **Easter-egg commands:** `sudo` jokes, `matrix`, `coffee`, `neofetch`-style system card, `fortune`. Keep them discoverable but not in `help`'s main list.
- [ ] **Mini-game as a command:** resurrect a small game (e.g. a snake or a guessing game) behind a command like `play` — a wink to the cut Sudoku, but lightweight.
- [ ] **Subtle CRT texture/scanlines** for the terminal, default OFF, toggle via `crt on|off`, always gated on `prefers-reduced-motion`.
- [ ] **`Ctrl+R` reverse-search** through command history.

### GUI polish
- [ ] **GUI dark variant** — a refined dark theme for the elegant site (distinct from the terminal's agnoster dark), toggle in nav. Keep it editorial, not neon.
- [ ] **View transitions / scroll-driven animations** on the GUI, tasteful, reduced-motion aware.
- [ ] **OG image generation** per blog post (dynamic, branded) via a build step or CF function.

### Content & growth
- [ ] **Blog search** (client-side fuzzy over the post index) in both modes.
- [ ] **RSS → newsletter** hook; "subscribe" link.
- [ ] **Analytics** — wire the `AppContext` analytics stubs to a privacy-friendly provider (Plausible/Umami/CF Web Analytics). Respect the `analyticsEnabled` preference already in `AppContext`.

### Engineering signal (DevOps flavor)
- [ ] **Live status/uptime widget** or a `status` command pulling from a health endpoint.
- [ ] **"Now" page** / changelog of the site itself (eat-your-own-dogfood blog post on building this).
- [ ] **CI badges / build provenance** surfaced somewhere subtle.

---

## Guardrails for anything added here
- Don't regress the Phase 3 CWV budgets or Lighthouse ≥ 95.
- Don't reintroduce the "AI slop" look on the GUI (no cyan-on-dark/neon/glass).
- Keep each addition behind its own PR with build/lint green.

## Session log
| Date | Item shipped | Build green? | Notes |
|------|--------------|--------------|-------|
| | | | |
