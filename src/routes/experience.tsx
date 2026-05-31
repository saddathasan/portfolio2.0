import { createFileRoute, redirect } from "@tanstack/react-router";

// Retired — redirect to the Experience section on the single-page /home.
export const Route = createFileRoute("/experience")({
	beforeLoad: () => {
		throw redirect({ to: "/home", hash: "experience" });
	},
});
