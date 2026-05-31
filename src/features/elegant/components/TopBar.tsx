import { Link } from "@tanstack/react-router";
import { homeSections } from "../sections.config";

// Nav items derive from the same registry — any section with a `navLabel`
// appears here, in the registry's order. Reorder once, updates everywhere.
const navItems = homeSections.filter((s) => s.navLabel);

// Minimal sticky bar: wordmark + anchor links + terminal escape hatch. Solid
// paper background + a hairline (no glassy blur). Quiet by design.
export function TopBar() {
	return (
		<div className="sticky top-0 z-20 border-b border-line bg-paper/95">
			<nav className="mx-auto flex max-w-[44rem] items-center justify-between px-6 py-3.5 text-[0.85rem]">
				<a
					href="#top"
					className="font-display font-medium tracking-[-0.01em] text-ink"
				>
					Saddat Hasan
				</a>

				<div className="flex items-center gap-x-5">
					<div className="hidden items-center gap-x-5 sm:flex">
						{navItems.map((s) => (
							<a key={s.id} href={`#${s.id}`} className="gui-link text-ink-soft">
								{s.navLabel}
							</a>
						))}
					</div>
					<Link to="/blog" className="gui-link text-ink-soft">
						Writing
					</Link>
					<Link to="/git-profile" className="gui-link text-ink-soft">
						GitHub
					</Link>
					<Link to="/" className="gui-link text-ink-muted">
						terminal ↗
					</Link>
				</div>
			</nav>
		</div>
	);
}
