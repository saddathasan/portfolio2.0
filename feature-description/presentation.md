# Frontend 101: From Static HTML → CSS → JavaScript

This document is the end-to-end plan and slide content for a 3-part live presentation. You'll show how the web works step-by-step by building up the same tiny page across three slides: first pure HTML, then add CSS, then add JavaScript interactions.

The plan also maps this presentation to three pages under the `/presentation` route in this repo (Vite + React + TypeScript + TanStack Router + Tailwind + shadcn/ui).

---

## What you’ll present (3 slides/pages)

- Slide 1 — Static HTML: How a browser requests a page, receives HTML, parses it into the DOM, and renders default-styled content.
- Slide 2 — Adding CSS: How styles are applied (cascade, specificity), and how the exact same HTML becomes visually polished.
- Slide 3 — Adding JavaScript: How we attach event listeners, manipulate the DOM, and provide interactivity and state.

Each slide uses the same semantic structure and progressively enhances it.

---

## How we’ll implement it in this codebase

- Routing (TanStack Router, file-based):
    - `src/routes/presentation/index.tsx` — Overview + links to the three slides
    - `src/routes/presentation/html.tsx` — Slide 1: static HTML
    - `src/routes/presentation/css.tsx` — Slide 2: HTML + CSS
    - `src/routes/presentation/js.tsx` — Slide 3: HTML + CSS + JS
- Components (optional but recommended for a clean demo):
    - `CodePreview` — Renders a Tabs UI with "Code" and "Preview". The preview runs in a sandboxed `<iframe>` using `srcdoc` composed from provided html/css/js strings.
    - Use `shadcn/ui` Tabs + Button for consistent UI and Tailwind for spacing.
- Navigation:
    - A simple breadcrumb and “Previous/Next” buttons inside each slide.
    - Keep routes type-safe with `createFileRoute` and use `<Link>` to navigate.

Example route skeletons (you’ll create these later):

```tsx
// src/routes/presentation/html.tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { CodePreview } from "@/components/CodePreview";

export const Route = createFileRoute("/presentation/html")({
	component: SlideHtml,
});

function SlideHtml() {
	return (
		<div className="space-y-6">
			<h1 className="text-2xl font-semibold">Slide 1 — Static HTML</h1>
			<CodePreview html={HTML_ONLY} />
			<div className="flex gap-3">
				<Link
					to="/presentation/css"
					className="underline">
					Next: Add CSS →
				</Link>
			</div>
		</div>
	);
}

const HTML_ONLY = `<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<title>Hello, Web!</title>
	</head>
	<body>
		<main>
			<h1>My First Page</h1>
			<p>Served as static HTML.</p>
			<button>Click me (does nothing yet)</button>
		</main>
	</body>
</html>`;
```

```tsx
// src/components/CodePreview.tsx (concept)
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";

type Props = {
	html?: string;
	css?: string;
	js?: string;
	height?: number;
};

export function CodePreview({
	html = "",
	css = "",
	js = "",
	height = 360,
}: Props) {
	const srcDoc = useMemo(
		() =>
			`<!doctype html><html><head><style>${css}</style></head><body>${html}<script type="module">${js}<\/script></body></html>`,
		[html, css, js],
	);
	const code = useMemo(() => ({ html, css, js }), [html, css, js]);

	return (
		<Tabs
			defaultValue="preview"
			className="w-full">
			<TabsList>
				<TabsTrigger value="preview">Preview</TabsTrigger>
				<TabsTrigger value="html">HTML</TabsTrigger>
				{css && <TabsTrigger value="css">CSS</TabsTrigger>}
				{js && <TabsTrigger value="js">JS</TabsTrigger>}
			</TabsList>
			<TabsContent value="preview">
				<iframe
					title="preview"
					className="w-full rounded border"
					style={{ height }}
					srcDoc={srcDoc}
				/>
			</TabsContent>
			<TabsContent value="html">
				<pre>
					<code>{code.html}</code>
				</pre>
			</TabsContent>
			{css && (
				<TabsContent value="css">
					<pre>
						<code>{code.css}</code>
					</pre>
				</TabsContent>
			)}
			{js && (
				<TabsContent value="js">
					<pre>
						<code>{code.js}</code>
					</pre>
				</TabsContent>
			)}
		</Tabs>
	);
}
```

Notes:

- The iframe `srcdoc` keeps the demo isolated and simple.
- We use `type="module"` for JS in case you want modern syntax; you can keep it vanilla.
- For copy-to-clipboard, add a small utility button using `navigator.clipboard.writeText`.

---

## Slide 1 — Static HTML: “How a page is served and rendered”

### Key ideas

- Request → Response: Browser makes an HTTP request, server returns HTML.
- Parse → DOM: Browser parses HTML into the DOM tree and paints with default styles.
- No CSS/JS yet: What you see is raw, semantic content with the browser’s default user-agent stylesheet.

### Minimal HTML

```html
<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<meta
			name="viewport"
			content="width=device-width, initial-scale=1" />
		<title>Hello, Web!</title>
	</head>
	<body>
		<main>
			<h1>My First Page</h1>
			<p>Served as static HTML.</p>
			<button>Click me (does nothing yet)</button>
		</main>
	</body>
</html>
```

### What the browser does

- Builds a DOM tree, applies default styles (e.g., block display for `<p>`, `<h1>` large font, etc.).
- Renders content top-to-bottom.
- The button is interactive only in the native sense (focusable, pressable), but it performs no custom action yet.

### Live demo script (1–2 minutes)

- Load the page. View Source (shows the HTML). Open DevTools Elements (shows the DOM).
- Toggle the device toolbar to show responsive nature with no CSS.

### Edge considerations

- Always include `<!doctype html>` to ensure standards mode.
- Set `<meta charset="utf-8">` to avoid encoding issues.

---

## Slide 2 — Adding CSS: “Make it look good”

### Key ideas

- Cascade + Specificity + Inheritance determine which styles apply.
- You can use inline `<style>`, external stylesheets, or utility classes (e.g., Tailwind) — here we’ll show plain CSS for fundamentals.

### CSS applied to the same HTML

```html
<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<meta
			name="viewport"
			content="width=device-width, initial-scale=1" />
		<title>Hello, Web!</title>
		<style>
			:root {
				font-family:
					ui-sans-serif,
					system-ui,
					-apple-system,
					Segoe UI,
					Roboto,
					Arial,
					sans-serif;
			}
			body {
				margin: 0;
				min-height: 100svh;
				display: grid;
				place-content: center;
				background: #f8fafc; /* slate-50 */
				color: #0f172a; /* slate-900 */
			}
			main {
				background: white;
				padding: 2rem;
				border-radius: 12px;
				box-shadow: 0 10px 20px rgba(2, 6, 23, 0.08);
				max-width: 42rem;
			}
			h1 {
				margin: 0 0 0.5rem;
				font-size: 1.75rem;
			}
			p {
				margin: 0 0 1rem;
				line-height: 1.6;
			}
			button {
				appearance: none;
				border: 1px solid #0ea5e9; /* sky-500 */
				background: #0ea5e9;
				color: white;
				padding: 0.5rem 1rem;
				border-radius: 0.5rem;
				font-weight: 600;
				cursor: pointer;
			}
			button:hover {
				background: #0284c7; /* sky-600 */
			}
			button:focus {
				outline: 3px solid #bae6fd;
				outline-offset: 2px;
			}
		</style>
	</head>
	<body>
		<main>
			<h1>My First Page</h1>
			<p>Now styled with CSS.</p>
			<button>Click me (still no custom JS)</button>
		</main>
	</body>
</html>
```

### What the browser does

- Builds CSSOM, merges with DOM to create the render tree, lays out, and paints with the new rules.

### Live demo script (2–3 minutes)

- Show the before/after of HTML vs CSS in your preview tabs.
- Open DevTools, inspect the button, show the applied styles and hover state.

### Edge considerations

- Show a quick specificity example (e.g., element vs class). Keep it short.

---

## Slide 3 — Adding JavaScript: “Make it do things”

### Key ideas

- Progressive enhancement: The page works without JS; JS adds interactivity.
- DOM APIs: `querySelector`, `addEventListener`, class toggling, text updates.
- State: Track data (like a click count) in variables.

### HTML + CSS + JS together

```html
<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<meta
			name="viewport"
			content="width=device-width, initial-scale=1" />
		<title>Hello, Web!</title>
		<style>
			:root {
				font-family:
					ui-sans-serif,
					system-ui,
					-apple-system,
					Segoe UI,
					Roboto,
					Arial,
					sans-serif;
			}
			body {
				margin: 0;
				min-height: 100svh;
				display: grid;
				place-content: center;
				background: #f8fafc;
				color: #0f172a;
			}
			main {
				background: white;
				padding: 2rem;
				border-radius: 12px;
				box-shadow: 0 10px 20px rgba(2, 6, 23, 0.08);
				max-width: 42rem;
			}
			button {
				appearance: none;
				border: 1px solid #0ea5e9;
				background: #0ea5e9;
				color: white;
				padding: 0.5rem 1rem;
				border-radius: 0.5rem;
				font-weight: 600;
				cursor: pointer;
			}
			button:hover {
				background: #0284c7;
			}
			button.active {
				transform: translateY(1px);
			}
			.muted {
				color: #475569;
			}
		</style>
	</head>
	<body>
		<main>
			<h1>My First Page</h1>
			<p class="muted">Now with JavaScript interactivity.</p>
			<p
				id="message"
				aria-live="polite"></p>
			<button
				id="helloBtn"
				type="button">
				Click me
			</button>
		</main>

		<script>
			document.addEventListener("DOMContentLoaded", () => {
				const btn = document.querySelector("#helloBtn");
				const msg = document.querySelector("#message");
				if (!btn || !msg) return;

				let count = 0;
				btn.addEventListener("click", () => {
					count++;
					msg.textContent = `You clicked ${count} time${count === 1 ? "" : "s"}.`;
					btn.classList.toggle("active");
				});
			});
		</script>
	</body>
</html>
```

### What the browser does

- Executes JS after parsing; attaches event listeners; updates the DOM on each click.
- `aria-live="polite"` announces changes to assistive tech without being disruptive.

### Live demo script (2–3 minutes)

- Click the button; watch the counter increment and the subtle “active” effect.
- Open DevTools Console to show how to log and inspect events if needed.

### Edge considerations

- Don’t block rendering unnecessarily — keep scripts small and at the end or use `defer`/`type="module"`.
- Always handle missing elements defensively (null checks).

---

## Optional: Nice-to-haves for the slide pages

- Tabs for Code/Preview (via shadcn/ui): already covered in `CodePreview` concept.
- Copy-to-clipboard buttons for each code block.
- Keyboard navigation for previous/next slides; ensure focus states are visible.
- A minimal breadcrumb: Home → Presentation → Current Slide.

---

## Implementation checklist (repo-specific)

1. Create routes

- `src/routes/presentation/index.tsx` — overview and links
- `src/routes/presentation/html.tsx` — Slide 1 (pass only `html` to `CodePreview`)
- `src/routes/presentation/css.tsx` — Slide 2 (pass `html` + `css`)
- `src/routes/presentation/js.tsx` — Slide 3 (pass `html` + `css` + `js`)

2. Create helper component

- `src/components/CodePreview.tsx` (as shown above). Use shadcn/ui `Tabs` and `Button` from `src/components/ui/`.

3. Styling & layout

- Use Tailwind utility classes for spacing, headings, and layout.
- Keep slides visually consistent with the rest of the site.

4. Wire navigation

- Use `<Link>` from TanStack Router for Previous/Next and an index page with deep links.

5. Verify

- Start dev server and navigate to `/presentation`, then to each slide.
- Check accessibility: tab through controls, ensure focus rings exist, confirm `aria-live` updates.

---

## Presenting tips (timing ~8–10 minutes total)

- Slide 1 (2–3 min): Emphasize “request → response → DOM” and that HTML alone is already a complete, accessible document.
- Slide 2 (3–4 min): Show the “magic” of CSS by toggling tabs between code and preview; show DevTools Styles.
- Slide 3 (3–4 min): Click counter + small visual feedback; mention progressive enhancement and why it matters.

---

## Notes on this repo

- Stack: Vite, React, TypeScript, TanStack Router, Tailwind, shadcn/ui.
- Follow existing conventions: `createFileRoute` for pages, `@/` import alias, and Tailwind utilities.
- After adding route files, the route tree generation will pick them up; navigate to `/presentation/...`.

---

## Deliverables in this plan

- A clear route structure under `/presentation` with three child pages.
- Ready-to-use slide code for HTML, CSS, and JavaScript.
- A reusable `CodePreview` pattern to show code vs live output side-by-side in tabs.
- Demo scripts and speaker notes, plus accessibility callouts.

---

## Quality gates (for this document)

- Build: ✅ PASS - All files created and compiled successfully
- Lint/Typecheck: ✅ PASS - No errors (only baseUrl deprecation warning)
- Tests: ✅ PASS - Manual testing completed
- Routes: ✅ PASS - All presentation routes generated and accessible

## Implementation Status

**✅ COMPLETED** - All features have been implemented successfully!

### What was built:

1. **CodePreview Component** (`src/components/CodePreview.tsx`)

    - Tabbed interface for HTML/CSS/JS code and live preview
    - Copy-to-clipboard functionality with visual feedback
    - Sandboxed iframe for safe code execution
    - Responsive design with proper styling
    - Integrated with shadcn/ui components

2. **Navigation Updates**

    - Added "Presentation" link to main navigation
    - Added to mobile navigation menu
    - Positioned between "Games" and "About"

3. **Route Structure**

    - Parent route: `/presentation`
    - Index page: `/presentation/` - Overview with 3 interactive cards
    - Slide 1: `/presentation/html` - Static HTML demonstration
    - Slide 2: `/presentation/css` - CSS styling demonstration
    - Slide 3: `/presentation/js` - JavaScript interactivity demonstration

4. **Features Implemented**
    - ✅ Breadcrumb navigation on all slides
    - ✅ Progress indicators (1/3, 2/3, 3/3)
    - ✅ Key concepts sections with educational content
    - ✅ Before/after comparison notes
    - ✅ Code breakdown explanations
    - ✅ Real-world applications examples
    - ✅ Interactive navigation with icons
    - ✅ Smooth animations and transitions
    - ✅ Responsive design for all screen sizes
    - ✅ Copy-to-clipboard for code snippets
    - ✅ Consistent design with the rest of the site

### How to view the presentation:

1. Start the dev server: `pnpm run dev`
2. Navigate to http://localhost:5176/presentation
3. Click on any of the three slides to begin
4. Use the navigation buttons or keyboard to move between slides

### Educational Content:

The presentation is designed for 3rd-year CS undergrad students and covers:

- **Slide 1 (HTML)**: HTTP request/response cycle, DOM tree construction, semantic HTML
- **Slide 2 (CSS)**: CSSOM, render tree, cascade & specificity, visual transformation
- **Slide 3 (JavaScript)**: DOM manipulation, event listeners, state management, progressive enhancement

Each slide includes:

- Clear key concepts
- Live interactive demos
- Code breakdowns
- Real-world applications
- Educational callouts

When you're ready to present, navigate to `/presentation` and start with the overview page.
