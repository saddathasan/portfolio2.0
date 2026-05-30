import type { Command } from "../engine/types";

export const navigationCommands: Command[] = [
	{
		name: "gui",
		description: "Switch to the visual (non-terminal) site",
		aliases: ["simple", "web", "exit"],
		group: "Navigation",
		run: ({ navigate }) => {
			try {
				localStorage.setItem("preferredMode", "gui");
			} catch {
				/* ignore storage errors */
			}
			// TODO(phase-2): retarget to "/home" once the GUI landing page exists.
			navigate("/about");
			return "Launching the visual site… use the nav (or the ⌘K palette) to return to the terminal.";
		},
	},
	{
		name: "git",
		description: "git profile | git wrapped — open my GitHub stats",
		usage: "git <profile|wrapped|log>",
		group: "Navigation",
		run: ({ args, navigate }) => {
			const sub = args[0];
			if (["profile", "wrapped", "log", "status"].includes(sub)) {
				navigate("/git-profile");
				return "Opening Git Profile…";
			}
			return "Usage: git profile | git wrapped | git log";
		},
	},
	{
		name: "blog",
		description: "Read my writing",
		aliases: ["posts"],
		group: "Navigation",
		run: () =>
			"📝 The blog ships in Phase 3 — it'll live right here in the filesystem (cd /blog, then cat a post).",
	},
];
