import { createFileRoute, redirect } from "@tanstack/react-router";

// The old standalone pages are retired — the single-page /home is the GUI.
// Preserve the URL by redirecting to the matching section.
export const Route = createFileRoute("/about")({
	beforeLoad: () => {
		throw redirect({ to: "/home", hash: "about" });
	},
});
