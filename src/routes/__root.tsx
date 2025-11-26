import { Layout } from "@/components/Layout";
import { Terminal } from "@/components/terminal/Terminal";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { useState, useEffect, createContext, useContext } from "react";

// UI Mode Context
interface UIModeContextType {
	mode: "terminal" | "gui";
	setMode: (mode: "terminal" | "gui") => void;
}

const UIModeContext = createContext<UIModeContextType>({
	mode: "terminal",
	setMode: () => {},
});

export const useUIMode = () => useContext(UIModeContext);

function RootComponent() {
	const [mode, setModeState] = useState<"terminal" | "gui">("terminal");

	// Load preference from localStorage only if it was explicitly set
	useEffect(() => {
		const saved = localStorage.getItem("ui-mode");
		// Only switch to GUI if user explicitly selected it before
		if (saved === "gui") {
			setModeState("gui");
		}
		// Otherwise, always default to terminal

		// Listen for mode switch requests
		const handleModeSwitch = (event: Event) => {
			const customEvent = event as CustomEvent<string>;
			if (customEvent.detail === "gui" || customEvent.detail === "terminal") {
				setMode(customEvent.detail);
			}
		};

		window.addEventListener("requestModeSwitch", handleModeSwitch);
		return () => window.removeEventListener("requestModeSwitch", handleModeSwitch);
	}, []);

	const setMode = (newMode: "terminal" | "gui") => {
		setModeState(newMode);
		localStorage.setItem("ui-mode", newMode);
	};

	return (
		<UIModeContext.Provider value={{ mode, setMode }}>
			{mode === "terminal" ? (
				<Terminal />
			) : (
				<>
					<DarkModeEnsurer />
					<Layout>
						<Outlet />
					</Layout>
				</>
			)}
			{import.meta.env.DEV && <TanStackRouterDevtools position="bottom-right" />}
		</UIModeContext.Provider>
	);
}

// Component to ensure dark mode is applied
function DarkModeEnsurer() {
	useEffect(() => {
		// Ensure dark class is present
		if (!document.documentElement.classList.contains('dark')) {
			document.documentElement.classList.add('dark');
		}
	}, []);
	
	return null;
}

export const Route = createRootRoute({
	component: RootComponent,
});
