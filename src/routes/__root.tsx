import { Terminal } from "@/components/terminal/Terminal";
import { createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { useEffect } from "react";

function RootComponent() {
	// Ensure dark class is always present for terminal
	useEffect(() => {
		if (!document.documentElement.classList.contains('dark')) {
			document.documentElement.classList.add('dark');
		}
	}, []);

	return (
		<>
			<Terminal />
			{import.meta.env.DEV && <TanStackRouterDevtools position="bottom-right" />}
		</>
	);
}

export const Route = createRootRoute({
	component: RootComponent,
});
