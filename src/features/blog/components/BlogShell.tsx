import "@/features/elegant/elegant.css";
import { Link } from "@tanstack/react-router";

// Slim top bar — wordmark + escape hatches. Mirrors the git-profile chrome so
// the secondary pages feel like one site. Solid paper + hairline, no glass.
function BlogTopBar() {
	return (
		<div className="sticky top-0 z-20 border-b border-line bg-[var(--surface-nav)] backdrop-blur-md">
			<nav className="mx-auto flex max-w-[44rem] items-center justify-between px-6 py-3.5 text-[0.85rem]">
				<Link
					to="/home"
					className="font-display font-medium tracking-[-0.01em] text-ink"
				>
					Saddat Hasan
				</Link>
				<div className="flex items-center gap-x-5">
					<Link to="/blog" className="gui-link text-ink-soft">
						Writing
					</Link>
					<Link to="/home" className="gui-link text-ink-muted">
						← Home
					</Link>
					<Link to="/" className="gui-link text-ink-muted">
						terminal ↗
					</Link>
				</div>
			</nav>
		</div>
	);
}

// Shared dark warm-paper shell for every blog page (list, category, article).
// `seo` is rendered here so it covers every page that uses the shell.
export function BlogShell({
	children,
	seo,
}: {
	children: React.ReactNode;
	seo?: React.ReactNode;
}) {
	return (
		<div className="gui-root gui-dark min-h-screen">
			{seo}
			<BlogTopBar />
			<main
				id="main-content"
				tabIndex={-1}
				className="mx-auto max-w-[44rem] px-6 focus:outline-none"
			>
				{children}
			</main>
			<footer className="border-t border-line">
				<div className="mx-auto flex max-w-[44rem] flex-wrap items-center justify-between gap-2 px-6 py-8 text-[0.8rem] text-ink-muted">
					<span>© 2026 Saddat Hasan</span>
					<Link to="/blog" className="gui-link">
						All writing
					</Link>
				</div>
			</footer>
		</div>
	);
}
