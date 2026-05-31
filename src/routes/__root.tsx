import { Terminal } from "@/features/terminal/components/Terminal";
import { CommandPalette } from "@/shared/components/CommandPalette";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { createRootRoute, Outlet, useLocation } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

// `.dark` is set statically on <html> in index.html — the whole site is dark
// (terminal + GUI), so no runtime class juggling is needed.
function RootComponent() {
	const location = useLocation();
	const isTerminalRoute = location.pathname === "/";

	return (
		<>
			{/* Keyboard/screen-reader users can jump straight to content. */}
			<a
				href="#main-content"
				className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-[100] focus:rounded-none focus:border focus:border-gray-500 focus:bg-gray-900 focus:px-3 focus:py-2 focus:text-sm focus:text-gray-100"
			>
				Skip to content
			</a>

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
