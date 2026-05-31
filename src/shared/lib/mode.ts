/* Which mode does `/` show? Desktop = terminal (the flagship); mobile defaults
   to the GUI (the terminal is cramped on a phone). A saved preference always
   wins, so a mobile user who deliberately opens the terminal isn't bounced
   back, and a desktop user who switched to GUI is remembered. */

export const MOBILE_MAX_PX = 767;

type Mode = "terminal" | "gui";

function savedMode(): Mode | null {
	try {
		const v = localStorage.getItem("preferredMode");
		return v === "terminal" || v === "gui" ? v : null;
	} catch {
		return null;
	}
}

export function rememberMode(mode: Mode): void {
	try {
		localStorage.setItem("preferredMode", mode);
	} catch {
		/* ignore storage errors (private mode, etc.) */
	}
}

/** True when landing on `/` should redirect to the GUI (/home).
 *  Desktop always keeps the terminal; mobile gets the GUI unless the visitor
 *  explicitly chose the terminal. */
export function shouldRedirectToGui(): boolean {
	if (typeof window === "undefined") return false;
	if (savedMode() === "terminal") return false; // explicit terminal intent wins
	return window.innerWidth <= MOBILE_MAX_PX;
}
