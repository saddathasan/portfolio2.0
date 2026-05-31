import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { rememberMode } from "@/shared/lib/mode";
import { homeSections } from "../sections.config";
import { ThemeToggle } from "./ThemeToggle";

// Nav items derive from the same registry — any section with a `navLabel`
// appears here, in the registry's order. Reorder once, updates everywhere.
const navItems = homeSections.filter((s) => s.navLabel);

// The page links, shared by the desktop row and the mobile panel.
function NavLinks({
	onNavigate,
	stacked = false,
}: {
	onNavigate?: () => void;
	stacked?: boolean;
}) {
	const item = stacked
		? "block py-3 text-[1rem] text-ink-soft"
		: "gui-link text-ink-soft";
	return (
		<>
			{navItems.map((s) => (
				<a
					key={s.id}
					href={`#${s.id}`}
					onClick={onNavigate}
					className={stacked ? item : "gui-link text-ink-soft"}
				>
					{s.navLabel}
				</a>
			))}
			<Link to="/blog" onClick={onNavigate} className={item}>
				Writing
			</Link>
			<Link to="/git-profile" onClick={onNavigate} className={item}>
				GitHub
			</Link>
			<Link
				to="/"
				onClick={() => {
					rememberMode("terminal");
					onNavigate?.();
				}}
				className={stacked ? "block py-3 text-[1rem] text-ink-muted" : "gui-link text-ink-muted"}
			>
				terminal ↗
			</Link>
		</>
	);
}

// Minimal sticky bar: wordmark + links + terminal escape hatch, over a blurred
// near-opaque surface. On phones the links collapse into a toggle panel so they
// never crowd the wordmark.
export function TopBar() {
	const [open, setOpen] = useState(false);
	const close = () => setOpen(false);

	return (
		<div className="sticky top-0 z-20 border-b border-line bg-[var(--surface-nav)] backdrop-blur-md">
			<nav className="mx-auto flex max-w-[44rem] items-center justify-between px-6 py-3.5 text-[0.85rem]">
				<a
					href="#top"
					onClick={close}
					className="font-display font-medium tracking-[-0.01em] text-ink"
				>
					Saddat Hasan
				</a>

				{/* Desktop: inline links + theme toggle */}
				<div className="hidden items-center gap-x-5 sm:flex">
					<NavLinks />
					<ThemeToggle className="-mr-1" />
				</div>

				{/* Mobile: theme toggle + menu toggle */}
				<div className="flex items-center gap-1 sm:hidden">
					<ThemeToggle />
					<button
						type="button"
						aria-label={open ? "Close menu" : "Open menu"}
						aria-expanded={open}
						aria-controls="mobile-nav"
						onClick={() => setOpen((v) => !v)}
						className="flex h-9 w-9 items-center justify-center text-ink"
					>
						{open ? (
							<svg width="18" height="18" viewBox="0 0 18 18" aria-hidden fill="none">
								<path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.4" />
							</svg>
						) : (
							<svg width="18" height="18" viewBox="0 0 18 18" aria-hidden fill="none">
								<path d="M2 5h14M2 9h14M2 13h14" stroke="currentColor" strokeWidth="1.4" />
							</svg>
						)}
					</button>
				</div>
			</nav>

			{/* Mobile panel */}
			{open && (
				<div
					id="mobile-nav"
					className="border-t border-line bg-[var(--surface-nav)] backdrop-blur-md sm:hidden"
				>
					<div className="mx-auto max-w-[44rem] divide-y divide-line px-6 py-1">
						<NavLinks stacked onNavigate={close} />
					</div>
				</div>
			)}
		</div>
	);
}
