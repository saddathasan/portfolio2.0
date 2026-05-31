import { createFileRoute, redirect } from "@tanstack/react-router";

// Retired — redirect to the Work section on the single-page /home.
export const Route = createFileRoute("/projects")({
	beforeLoad: () => {
		throw redirect({ to: "/home", hash: "work" });
	},
});
