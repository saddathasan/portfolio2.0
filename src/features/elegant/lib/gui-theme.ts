import { useSyncExternalStore } from "react";

/* GUI light/dark theme — a tiny external store shared by every GUI surface
   (home, blog, git-profile) and the nav toggle, so they always agree.
   Independent of the terminal's global `.dark` shadcn theme: this only toggles
   the `gui-dark` class on each `.gui-root` element (see elegant.css).
   Defaults to "dark"; persisted to localStorage and synced across tabs. */

export type GuiTheme = "light" | "dark";

const STORAGE_KEY = "gui-theme";

function read(): GuiTheme {
	if (typeof window === "undefined") return "dark";
	try {
		return localStorage.getItem(STORAGE_KEY) === "light" ? "light" : "dark";
	} catch {
		return "dark";
	}
}

let current: GuiTheme = read();
const listeners = new Set<() => void>();

export function setGuiTheme(theme: GuiTheme): void {
	if (theme === current) return;
	current = theme;
	try {
		localStorage.setItem(STORAGE_KEY, theme);
	} catch {
		/* private mode / storage disabled — keep the in-memory value */
	}
	for (const l of listeners) l();
}

export function toggleGuiTheme(): void {
	setGuiTheme(current === "dark" ? "light" : "dark");
}

function subscribe(cb: () => void): () => void {
	listeners.add(cb);
	// Mirror changes made in another tab.
	const onStorage = (e: StorageEvent) => {
		if (e.key === STORAGE_KEY) {
			current = read();
			cb();
		}
	};
	window.addEventListener("storage", onStorage);
	return () => {
		listeners.delete(cb);
		window.removeEventListener("storage", onStorage);
	};
}

/** Active GUI theme ("dark" by default). Re-renders subscribers on change. */
export function useGuiTheme(): GuiTheme {
	return useSyncExternalStore(
		subscribe,
		() => current,
		() => "dark",
	);
}

/** Class string for a `.gui-root` element given the active theme. */
export function guiRootClass(theme: GuiTheme, extra = ""): string {
	return ["gui-root", theme === "dark" ? "gui-dark" : "", extra]
		.filter(Boolean)
		.join(" ");
}
