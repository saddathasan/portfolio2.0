import { createRouter, RouterProvider } from "@tanstack/react-router";
import { HelmetProvider } from "react-helmet-async";
import { routeTree } from "./routeTree.gen";
import { AppProvider } from "@/shared/context/AppContext";
import { ErrorBoundary } from "./components/ErrorBoundary";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

export default function App() {
	return (
		<HelmetProvider>
			<ErrorBoundary>
				<AppProvider>
					<RouterProvider router={router} />
				</AppProvider>
			</ErrorBoundary>
		</HelmetProvider>
	);
}
