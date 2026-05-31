import { createFileRoute, redirect } from "@tanstack/react-router";

// Retired — redirect to the Contact section on the single-page /home.
export const Route = createFileRoute("/contact")({
	beforeLoad: () => {
		throw redirect({ to: "/home", hash: "contact" });
	},
});
