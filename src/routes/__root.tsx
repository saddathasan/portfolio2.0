import { Terminal } from "@/features/terminal/components/Terminal";
import { CommandPalette } from "@/shared/components/CommandPalette";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { createRootRoute, Outlet, useLocation } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { useEffect } from "react";

function RootComponent() {
	const location = useLocation();
	const isTerminalRoute = location.pathname === "/";

	// Ensure dark class is always present for terminal
	useEffect(() => {
		if (!document.documentElement.classList.contains('dark')) {
			document.documentElement.classList.add('dark');
		}
	}, []);

	return (
		<>
			{/* Keyed by path so a thrown route resets the boundary on navigation
			    instead of bricking the whole SPA until a hard reload. */}
			<ErrorBoundary key={location.pathname}>
				{isTerminalRoute ? <Terminal /> : <Outlet />}
			</ErrorBoundary>
			<CommandPalette />
			{import.meta.env.DEV && <TanStackRouterDevtools position="bottom-right" />}
		</>
	);
}

export const Route = createRootRoute({
	component: RootComponent,
});
