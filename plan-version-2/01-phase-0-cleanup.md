# Phase 0 — Cleanup & Foundation

> **Goal:** Get the codebase lean, coherent, and correctly structured *before* building features. Remove every cut feature, kill dead dependencies, collapse to one router and one design system, and reshape `src/` into the feature-based layout. **No new features in this phase** — just subtraction and restructuring. This is the highest-ROI, lowest-risk work.
>
> **Prerequisites:** none (start here). · **Estimated sessions:** 2–3. · **Branch:** `feat/revamp-phase-0`.

---

## Objectives (achievable, measurable)
1. App boots with **zero references** to Supabase, auth, react-query, TipTap, email, or any cut feature.
2. `package.json` has **no dead dependencies**; `pnpm build` + `pnpm lint` green.
3. Routes reduced from ~17 to the target set: `/`, `/home`, `/about`, `/projects`, `/experience`, `/contact`, `/git-profile`, `/ib-extension/privacy-policy`. (`/blog*` arrives in Phase 3.)
4. **One** design-token system in one CSS file (no light/dark conflict).
5. `src/` reorganized into `app/ · routes/ · features/ · shared/ · data/ · styles/`.

## Out of scope (do NOT do here)
- Redesigning the terminal (Phase 1) or the GUI pages (Phase 2).
- Building the blog (Phase 3).
- Adding the agnoster prompt, autocomplete, or new commands (Phase 1).
- Perf/SEO tooling like `vite-react-ssg` (Phase 3).

## Pre-flight
- [ ] `git checkout -b feat/revamp-phase-0`
- [ ] Confirm baseline builds today: `pnpm install && pnpm build` (note any pre-existing failures in the session log).
- [ ] Snapshot current route list and bundle size for before/after comparison.

---

## Task group A — Remove cut features (routes, pages, components)
> After deleting, run `pnpm build` to surface broken imports; fix by deleting the importing code too (it's all cut). Work top-down: routes → pages → components → hooks → data.

**Routes** (`src/routes/`)
- [ ] Delete `admin.tsx`, `blog.tsx`, `blog.$slug.tsx`, `blog.index.tsx`, `bookmarks.tsx`, `games.tsx`, `ranks.tsx`, `writing.tsx`, `presentation.tsx`, and the `presentation/` directory.
- [ ] **KEEP** `ib-extension/privacy-policy.tsx` — actively maintained (recent commits + `feat/privacy-page` branch). It's a standalone legal page for the IB browser extension; leave it untouched. Add it to the target route list: `/`, `/home`, `/about`, `/projects`, `/experience`, `/contact`, `/git-profile`, `/ib-extension/privacy-policy` (+ `/blog*` in Phase 3).
- [ ] Regenerate the route tree: `pnpm generate-routes` (updates `src/routeTree.gen.ts`).

**Pages** (`src/pages/`)
- [ ] Delete `Blog.tsx`, `BlogPost.tsx`, and `pages/admin/` (entire dir). Remove `src/pages/` if it ends up empty.

**Feature component dirs** (`src/components/`)
- [ ] Delete `blog/`, `bookmarks/`, `sudokuGame/`, `auth/`.
- [ ] Delete `CodePreview.tsx` (presentation-only), `FontTestComponent.tsx`, `FontIntegrationTest.tsx`.

**Hooks** (`src/hooks/`)
- [ ] Delete `useBlog.ts`, `useBookmarks.ts`, `useBookmarkFilters.ts`, `useSudoku.ts`, `useAuth.ts`.
- [ ] Edit `src/hooks/index.ts` — remove the `export { useSudoku }` line (it's the only cut export there).

**Context / lib / utils**
- [ ] Delete `src/context/AuthContext.tsx` and `src/lib/supabase.ts`.
- [ ] Delete `src/utils/fontVerification.ts` (and remove its references).
- [ ] Delete `src/types/database.ts` (Supabase types).

**Data**
- [ ] Delete `src/data/bookmarks.json`. Edit `src/data/index.ts` if it re-exports it.

---

## Task group B — Remove the email backend entirely
- [ ] Delete `api/send-email.ts` (Vercel function) and the `functions/api/` directory (Cloudflare function).
- [ ] Delete `dev-server.js`, `EMAIL_SETUP_GUIDE.md`, `deployment-commands.txt`.
- [ ] In `vite.config.ts`, **remove the `server.proxy` block** for `/api/send-email-dev`.
- [ ] In `wrangler.toml`, remove the commented email env vars (GMAIL_*, SMTP_*, EMAILJS_*, RATE_LIMIT_MAX). Keep the `[functions]` dir for the future git-profile proxy (Phase 3).
- [ ] Delete `src/components/ContactForm.tsx` (replaced by a `mailto:` link in Phase 2).

---

## Task group C — Remove dead root scripts & duplicate config
- [ ] Delete `test-blog-crud.js`, `test_auth.js`, `create_admin_user.js`, `create_admin_profile.cjs`, `create_user_simple.js`.
- [ ] Delete `supabase/` (the `migrations/` dir) — no DB anymore.
- [ ] Delete `vercel.json` (hosting is Cloudflare Pages; keep the repo single-target). *Note in log if you want to retain for redundancy.*
- [ ] Remove the `dev:email` and `dev:full` scripts from `package.json` (they depend on the deleted email server). Keep `dev`, `build`, `lint`, `preview`, `generate-routes`, `watch-routes`.

---

## Task group D — Uninstall dead dependencies
> Remove, then `pnpm build` to confirm nothing still imports them.
- [ ] Uninstall: `@supabase/supabase-js`, `react-router-dom`, `@tanstack/react-query`, `@tiptap/*` (all 9 packages), `lowlight`, `nodemailer`, `@types/nodemailer`, `express`, `cors`, `concurrently`, `@vercel/node`.
- [ ] Review `@radix-ui/*`: keep only primitives still used after cuts (likely `dropdown-menu`, `tooltip`, `separator`, `slot`, `dialog`; **drop** `accordion`, `checkbox`, `select`, `switch`, `tabs`, `label`, `alert-dialog` if their only users were cut features — verify with a grep before removing each).
- [ ] Review `prism-react-renderer` — keep **only** if reused for code highlighting; otherwise remove (Phase 3 will choose Shiki).
- [ ] Remove `react-hook-form` + `@hookform/resolvers` (confirmed — only used by the deleted forms). Keep `zod` (blog frontmatter validation in Phase 3).
- [ ] **Keep `sonner`** (toasts) — keep the `<Toaster>` in `main.tsx`. Usage spots defined in Phase 2/3: copy-email confirmation, "résumé downloading", "link copied" on blog share. Transient, non-critical, auto-dismiss, reduced-motion aware — never for critical errors needing action.

---

## Task group E — Unwire removed providers
- [ ] `src/main.tsx`: remove `QueryClientProvider`/`QueryClient` (react-query) and `AuthProvider`. Keep `StrictMode`, `App`, and `Toaster` (sonner) if you still want toasts (terminal/GUI can use them). Result should be roughly `createRoot(...).render(<StrictMode><App/><Toaster/></StrictMode>)`.
- [ ] `src/App.tsx`: keep `HelmetProvider`, `ErrorBoundary`, `AppProvider`, `AnnouncementProvider`, `RouterProvider`. Confirm none import removed code.
- [ ] `src/context/AppContext.tsx`: keep, but it's fine as-is (theme + a11y + console-stub analytics). Leave the analytics stubs for Phase 4.

---

## Task group F — Consolidate duplicate components
> Goal: **one** of each. Pick the best implementation, delete the rest, update imports.
- [ ] **Navigation:** keep ONE (recommend building a fresh single `Nav` in Phase 2). For now, delete `Navigation.tsx`, `ResponsiveNavigation.tsx`, `MobileNavigation.tsx`, `AppSidebar.tsx`, `Navbar.tsx` **only if unused after route cuts** — otherwise leave the one currently wired and delete the others. Verify each with grep first.
- [ ] **Hero:** keep `Hero.tsx`, delete `HeroSection.tsx` (and its barrel export).
- [ ] **Footer:** consolidate `Footer.tsx`, `GlobalFooter.tsx`, `FooterCallToAction.tsx`, `Copyright.tsx` → keep one `Footer` (Phase 2 will finalize). Delete the others once unreferenced.
- [ ] **Cards:** keep `ProjectCard.tsx`; evaluate `AnimatedCard.tsx`/`InfoCard.tsx`/`ContentGrid.tsx` — delete unused.
- [ ] Rewrite `src/components/index.ts` barrel to export only the survivors (it currently exports many cut components: `CodePreview`, `ContentGrid`, `FooterCallToAction`, `Navigation`, `AnimatedCard`, `HeroSection`, `InfoCard`, `BiographySection`, `ContactForm`, `SkillsSidebar`, `SudokuGame`, `GlobalFooter`).

---

## Task group G — Unify the design system
- [ ] In `src/index.css` (→ moves to `src/styles/index.css` in group H): remove the light "Lee Robinson" palette **conflict**. Define tokens once. The terminal owns the dark agnoster palette; the GUI owns the light editorial palette. Keep them as clearly-scoped token sets (e.g. `:root` = GUI light default, `.terminal` scope or `/` route wrapper = agnoster dark), not a global forced `.dark`.
- [ ] Remove the global force-dark in `src/routes/__root.tsx` (`document.documentElement.classList.add('dark')`). Mode/skin will be scoped per route in Phase 1/2. *(If removing it breaks the terminal's look mid-phase, scope the dark class to the terminal container instead.)*
- [ ] Trim `@font-face` blocks: keep the GUI faces (Clash Display, Uncut Sans, optionally Space Grotesk) and remove unused ones (Inter, Cabinet Grotesk, Panchang — unless chosen). **Don't** add the mono font yet (Phase 1). Delete the corresponding `.ttf` files in `src/fonts/`.
- [ ] Reconcile `tailwind.config.js` font families with the survivors.

---

## Task group H — Reshape the folder structure (do LAST, in one focused pass)
> Move files, fix `@/` imports. The `@` alias points at `src/`, so updates are mechanical. Commit before and after this group so it's easy to bisect.
- [ ] Create `src/app/`, `src/features/`, `src/shared/`, `src/styles/`.
- [ ] Move `App.tsx` + providers → `src/app/`. Move `index.css` → `src/styles/`.
- [ ] Move terminal code → `src/features/terminal/` (`components/terminal/*`, `hooks/useTerminal.tsx`, `lib/terminal.ts`, `lib/autocomplete.ts`).
- [ ] Move git-profile → `src/features/git-profile/` (`components/git-profile/*`, `routes/git-profile.tsx` stays in `routes/` but imports from the feature, `lib/github.ts`).
- [ ] Move cross-cutting hooks/components/ui/lib/types → `src/shared/`.
- [ ] Keep `src/routes/` thin (TanStack file routes that delegate to features) and `src/data/` as the single source of truth.
- [ ] Update `tsconfig` paths only if you add sub-aliases (optional; `@/` covers it).

---

## Verification / quality gates (run before ending every session)
- [ ] `pnpm generate-routes` succeeds and `routeTree.gen.ts` lists only the target routes.
- [ ] `pnpm build` green (no broken imports, no missing modules).
- [ ] `pnpm lint` green.
- [ ] `pnpm dev` → `/` still shows the terminal; `/home`, `/about`, `/projects`, `/experience`, `/contact`, `/git-profile` still render (even if not yet redesigned).
- [ ] `grep -ri "supabase\|react-query\|tiptap\|nodemailer\|react-router-dom" src` returns nothing.
- [ ] Bundle size noticeably smaller than baseline (record the number).

## Definition of Done
- All checkboxes above ticked; build/lint/typecheck green; dev server runs all target routes; no references to any cut tech; folder structure reshaped; one design-token file. Open PR `feat/revamp-phase-0` → review → merge.

---

## Session log
| Date | What got done | Build green? | Handoff note (start here next time) |
|------|---------------|--------------|-------------------------------------|
| 2026-05-31 (cont.) | Ran `pnpm install --no-frozen-lockfile` (migrated v10→v11 store, reconciled `pnpm-lock.yaml`, approved esbuild, auto-created `pnpm-workspace.yaml`); dropped stale `package-lock.json`. **Group H done:** moved terminal + git-profile into `features/`, shared code into `shared/`; rewrote all `@/` imports; fixed `App.tsx`/barrel/GitProfile. `app/` + `styles/` folders + deep token-unification deferred to Phase 1/2 (intertwined with skins). **Verified:** `pnpm build` + `pnpm lint` (0 err) green; running dev server (:5175) transforms all 13 key modules → 200; grep-clean. Commits: 446b056, 579fdfc, e7854cd. | ✅ | **Phase 0 COMPLETE.** Start **Phase 1** ([`02-phase-1-terminal.md`](./02-phase-1-terminal.md)). When Phase 1/2 build the terminal/GUI skins, also finish Group G deep token-unification + scope the global `.dark` in `__root.tsx`, and (optionally) add `app/`+`styles/` folders. |
| 2026-05-31 | Branch `version-2` created from `feat/privacy-page` HEAD (main was stale). Groups A–F complete + G fonts. Removed all cut routes/pages/components/hooks/context/lib/data; deleted both email backends (`api/`, `functions/api/`) + `dev-server.js`; contact route now a `mailto:` CTA (ContactForm deleted); removed `supabase/`, `vercel.json`, dead root scripts; trimmed dead deps from `package.json` manifest; unwired QueryClient+AuthProvider from `main.tsx`; refactored `GitProfile` off react-query → module-cached fetch hook; rewrote `components/index.ts` barrel; deleted 11 orphan components; cut 3 unused fonts (Inter/Cabinet/Panchang). **Bundle: 1,299 kB → 271 kB JS (379 → 70 kB gz); fonts 1.5 MB → 423 kB.** | ✅ (via `./node_modules/.bin/tsc -b && vite build`; lint 0 errors / 13 pre-existing warnings) | **START HERE:** (1) Run `pnpm install` in a real terminal to migrate the pnpm v10→v11 store, prune node_modules, and sync `pnpm-lock.yaml`/`package-lock.json` to the trimmed manifest — `pnpm <script>` currently fails in non-TTY because of this. (2) Then do **Group H** (folder restructure) as a focused pass. (3) Decide Group G deep token-unification timing (currently intertwined with Phase 1 terminal skin / Phase 2 GUI skin — may be cleaner to do alongside those). |

## Handoff notes
- **Lockfiles are intentionally out of sync** with `package.json` (deps removed from manifest, still physically in `node_modules`). Build/lint verified via direct `./node_modules/.bin/*` binaries. A `pnpm install` (with TTY) is required to reconcile — do this first next session.
- **Group F consolidation was scoped down on purpose:** only dead (0-importer) components were deleted. The remaining nav/footer/hero duplicates (`Navbar`/`Navigation`/`Layout`, `Hero`/`HeroSection`, `Footer`/`FooterCallToAction`) are still imported by current routes and will be replaced by single components during the **Phase 2** GUI redesign — don't force-delete them now.
- **`__root.tsx` still force-adds `.dark` globally** (terminal depends on it). Scoping this to the terminal container is a Phase 1/2 task, not done yet.
- `functions/` dir is now empty (Phase 3 recreates `functions/api/github.ts`). Empty dirs aren't tracked by git.
- The `dist/` build artifacts are present from verification — gitignored, ignore.
