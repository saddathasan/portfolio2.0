import { createFileRoute, redirect } from "@tanstack/react-router";
import { shouldRedirectToGui } from "@/shared/lib/mode";

// "/" is the terminal — __root.tsx renders <Terminal /> directly for the index
// path, so this component never actually renders. On mobile (and when the
// visitor hasn't explicitly chosen the terminal) we redirect to the GUI before
// anything paints, so phones land on /home. Desktop always keeps the terminal.
export const Route = createFileRoute("/")({
	beforeLoad: () => {
		if (shouldRedirectToGui()) {
			throw redirect({ to: "/home" });
		}
	},
	component: () => null,
});
