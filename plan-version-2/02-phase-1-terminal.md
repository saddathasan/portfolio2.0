# Phase 1 — Terminal v2 (the flagship)

> **Goal:** Turn the current basic terminal into a genuinely capable, beautiful, accessible CLI that *demonstrates* engineering skill. Authentic oh-my-zsh **agnoster** dark prompt, a clean **command registry**, autocomplete + history, and the `gui` **escape hatch**. This is the centerpiece of the site.
>
> **Prerequisites:** Phase 0 merged. · **Estimated sessions:** 3–4. · **Branch:** `feat/revamp-phase-1`.

---

## Objectives
1. The prompt renders as an authentic agnoster powerline (segments + arrow separators, CSS-drawn) in a single tuned dark theme, in **JetBrains Mono**.
2. Commands live in a **registry** (one file per command); adding a command = adding one file.
3. Autocomplete (`Tab`) and history (`↑/↓`, persisted) work with full ARIA.
4. `gui` (+ aliases) switches to the elegant site via **client-side router navigation** (no full reload); a discoverable hint is visible.
5. `⌘K`/`Ctrl+K` command palette works.

## Out of scope
- Building the GUI pages themselves (Phase 2) — `gui` just needs to `navigate('/home')`.
- The blog `cat` rendering (Phase 3) — but design the FS so blog nodes will slot in.

## Pre-flight
- [ ] `git checkout -b feat/revamp-phase-1` from updated `main`.
- [ ] Re-read [`00-master-plan.md`](./00-master-plan.md) §6.1 (agnoster skin) and §7 (commands/UX).

---

## Task group A — Fonts & agnoster theme
- [ ] Add **JetBrains Mono** (variable or weights 400/500/700) to `src/fonts/` + `@font-face` in `src/styles/`. `font-display: swap`, preload.
- [ ] Define the agnoster dark palette as scoped tokens (segment bg/fg colors, accent). Deep slate/near-black background (not pure black), readable segment colors.
- [ ] Build the **prompt as composable segments**: `context (user@host)` → `dir` → `git (branch + dirty marker)`. Render the `` separators with **CSS** (clip-path / borders), NOT font glyphs — verify it works without a Nerd Font installed.
- [ ] Each segment = `prompt_segment(bg, fg, content)` equivalent; segments chain so each separator inherits the previous bg → next bg (the agnoster look).
- [ ] Apply to the active input line AND each history entry's prompt.

## Task group B — Command registry refactor
- [ ] Create `src/features/terminal/engine/` with: `types.ts` (`Command { name; description; aliases?; usage?; group?; run(ctx, args): Output }`), `registry.ts` (map of commands), and a pure `parse(input)` + `execute(input, ctx)`.
- [ ] Move FS logic (`resolvePath`, `getDirectoryContents`, `initialFileSystem`) into `engine/fs.ts` (keep pure/testable).
- [ ] Refactor `useTerminal` to delegate to the registry instead of the big `switch`.
- [ ] Port existing commands into `commands/`: `help`, `ls`, `cd`, `cat`, `pwd`, `clear`, `whoami`, `open`, `resume`/`cv`, `git`, `sudo`, `echo`.

## Task group C — New commands
- [ ] `help` — grouped, columnar list with one-line descriptions (auto-generated from the registry).
- [ ] `about`, `skills`, `experience`, `projects [name]`, `social`, `contact`/`email` (prints address + opens `mailto:saddathasan94@gmail.com`), `history`, `banner`.
- [ ] `resume`/`cv` — open `/resume.pdf` in a new tab + offer download.
- [ ] `git profile` / `git wrapped` / `git log` — **client-side** `router.navigate('/git-profile')` (fix the current `window.location.href` hard reload).
- [ ] `gui` (aliases `simple`, `web`, `exit`) — `router.navigate('/home')`; persist `preferredMode='gui'` in localStorage.
- [ ] Leave a `blog`/`posts` stub that prints "coming soon" (wired for real in Phase 3) OR scaffold the empty `/blog` FS node now.

## Task group D — Autocomplete
- [ ] `Tab` completes the **command name** at position 0, and **FS paths** as arguments (for `cd`/`cat`/`ls`). Reuse/extend `src/features/terminal/.../autocomplete.ts`.
- [ ] Suggestion dropdown: `role="listbox"`, items `role="option"`, `aria-autocomplete="list"`, `aria-expanded`, arrow-key navigation, `Enter` to accept, `Esc` to dismiss. Focus must not be trapped.
- [ ] Visible "no match" state. Cycle suggestions on repeated `Tab`.

## Task group E — History & input UX
- [ ] `↑/↓` recall previous commands; persist history to `localStorage`.
- [ ] `Ctrl+L` clears scrollback (alias of `clear`).
- [ ] Auto-focus input on load and after each command; click-anywhere refocus (already present — keep, but don't steal focus during text selection).
- [ ] Render each command+output as a navigable **block**; `aria-live="polite"` region announces new output to screen readers.

## Task group F — Command palette (shared)
- [ ] Build `shared/components/CommandPalette` opened with `⌘K`/`Ctrl+K`. Fuzzy list of commands/destinations. Works in both modes (terminal: runs the command; GUI: navigates).
- [ ] Keyboard operable; `Esc` closes; focus returns to prior element.

## Task group G — Escape-hatch discoverability
- [ ] Under the ASCII banner, show a persistent friendly line: `Not a developer? Type 'gui' ↵ for the visual site →` plus a clickable `[ GUI mode ]` chip.
- [ ] On the GUI side (stub for Phase 2), ensure a `>_ terminal` affordance exists to return.

## Task group H — Tests (engine is pure → easy wins)
- [ ] Unit-test `parse`, `resolvePath`, and a few command `run()` outputs. (Use the existing `src/test/utils.tsx` setup.)

---

## Verification / quality gates
- [ ] `pnpm build` + `pnpm lint` green.
- [ ] Keyboard-only walkthrough: type `help`, `ls`, `cd projects`, `cat <tab>`, `↑` recall, `Ctrl+L`, `⌘K`, `gui`. All work.
- [ ] Agnoster prompt renders correctly **without** a Nerd Font (test in a clean browser profile).
- [ ] `gui` and `git profile` navigate **without** a full page reload (Network tab: no document re-request).
- [ ] Screen-reader smoke test: new output is announced; suggestions are operable.

## Definition of Done
All objectives met, gates green, no `window.location.href` left in terminal code, registry in place. Open PR `feat/revamp-phase-1`.

---

## Session log
| Date | What got done | Build green? | Handoff note |
|------|---------------|--------------|--------------|
| | | | |

## Handoff notes
_(next-session pointer)_
