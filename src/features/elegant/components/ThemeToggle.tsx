import { Moon, Sun } from "lucide-react";
import { toggleGuiTheme, useGuiTheme } from "../lib/gui-theme";

// Sun/moon switch for the GUI nav. Shows the icon of the theme you'd switch TO
// (sun while dark → click for light, and vice-versa). Toggles the shared
// gui-theme store, so the whole surface flips in sync.
export function ThemeToggle({ className = "" }: { className?: string }) {
	const isDark = useGuiTheme() === "dark";
	return (
		<button
			type="button"
			onClick={toggleGuiTheme}
			aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
			title={isDark ? "Light mode" : "Dark mode"}
			className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-ink-muted transition-colors hover:text-ink ${className}`}
		>
			{isDark ? <Sun size={16} aria-hidden /> : <Moon size={16} aria-hidden />}
		</button>
	);
}
