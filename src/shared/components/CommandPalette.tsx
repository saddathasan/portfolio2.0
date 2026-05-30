import { useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogTitle,
} from "@/shared/ui/dialog";

interface Action {
	group: string;
	label: string;
	hint?: string;
	perform: () => void;
}

const EMAIL = "saddathasan94@gmail.com";

/**
 * Global ⌘K / Ctrl+K command palette. Mounted once at the root so it works in
 * both the terminal and the GUI site. Navigation + quick actions (mode-agnostic).
 */
export function CommandPalette() {
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState("");
	const [active, setActive] = useState(0);
	const listRef = useRef<HTMLUListElement>(null);

	const go = (to: string) => () => navigate({ to: to as never });
	const openUrl = (url: string) => () => window.open(url, "_blank", "noopener,noreferrer");

	const actions: Action[] = useMemo(
		() => [
			{ group: "Go to", label: "Terminal", hint: "/", perform: go("/") },
			{ group: "Go to", label: "About", perform: go("/about") },
			{ group: "Go to", label: "Projects", perform: go("/projects") },
			{ group: "Go to", label: "Experience", perform: go("/experience") },
			{ group: "Go to", label: "Contact", perform: go("/contact") },
			{ group: "Go to", label: "Git Profile", perform: go("/git-profile") },
			{ group: "Actions", label: "Download résumé", perform: openUrl("/resume.pdf") },
			{ group: "Actions", label: "Email me", perform: openUrl(`mailto:${EMAIL}`) },
			{ group: "Social", label: "GitHub", perform: openUrl("https://github.com/saddathasan") },
			{ group: "Social", label: "LinkedIn", perform: openUrl("https://linkedin.com/in/saddathasan") },
			{ group: "Social", label: "X", perform: openUrl("https://x.com/ekjongoru") },
		],
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	const filtered = useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q) return actions;
		return actions.filter(
			(a) => a.label.toLowerCase().includes(q) || a.group.toLowerCase().includes(q)
		);
	}, [query, actions]);

	// Global hotkey
	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((o) => !o);
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);

	// Reset state when opening
	useEffect(() => {
		if (open) {
			setQuery("");
			setActive(0);
		}
	}, [open]);

	useEffect(() => {
		setActive(0);
	}, [query]);

	const run = (action?: Action) => {
		if (!action) return;
		setOpen(false);
		action.perform();
	};

	const onInputKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "ArrowDown") {
			e.preventDefault();
			setActive((i) => (i + 1) % Math.max(filtered.length, 1));
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			setActive((i) => (i <= 0 ? filtered.length - 1 : i - 1));
		} else if (e.key === "Enter") {
			e.preventDefault();
			run(filtered[active]);
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="p-0 gap-0 overflow-hidden top-[20%] translate-y-0 max-w-lg">
				<DialogTitle className="sr-only">Command palette</DialogTitle>
				<input
					autoFocus
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					onKeyDown={onInputKeyDown}
					placeholder="Type a command or search…"
					aria-label="Command palette search"
					aria-activedescendant={filtered[active] ? `palette-opt-${active}` : undefined}
					className="w-full px-4 py-3 bg-transparent border-b border-border outline-none text-base"
				/>
				<ul ref={listRef} role="listbox" aria-label="Commands" className="max-h-80 overflow-y-auto p-2">
					{filtered.length === 0 && (
						<li className="px-3 py-6 text-center text-sm text-muted-foreground">No results</li>
					)}
					{filtered.map((action, i) => (
						<li
							key={`${action.group}-${action.label}`}
							id={`palette-opt-${i}`}
							role="option"
							aria-selected={i === active}
							onMouseEnter={() => setActive(i)}
							onMouseDown={(e) => {
								e.preventDefault();
								run(action);
							}}
							className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer text-sm ${
								i === active ? "bg-primary/15 text-foreground" : "text-muted-foreground"
							}`}
						>
							<span>{action.label}</span>
							<span className="text-xs opacity-60">{action.hint ?? action.group}</span>
						</li>
					))}
				</ul>
			</DialogContent>
		</Dialog>
	);
}
