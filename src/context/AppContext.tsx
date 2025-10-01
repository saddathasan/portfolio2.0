import { config } from "@/config";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useTheme } from "@/hooks/useTheme";
// Services removed - using simplified data fetching
// Removed unused type imports - components use static data imports
import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";

// Application state interface
interface AppState {
	// Theme state
	theme: "light" | "dark" | "system";
	resolvedTheme: "light" | "dark";
	setTheme: (theme: "light" | "dark" | "system") => void;

	// Accessibility preferences
	prefersReducedMotion: boolean;
	highContrast: boolean;
	setHighContrast: (enabled: boolean) => void;

	// Removed unused data, loading, and error states - components use static data imports

	// User preferences
	preferences: {
		animationsEnabled: boolean;
		notificationsEnabled: boolean;
		analyticsEnabled: boolean;
		language: string;
	};
	setPreferences: (preferences: Partial<AppState["preferences"]>) => void;

	// Navigation state
	currentPath: string;
	setCurrentPath: (path: string) => void;
	// Removed unused visitedPages and performanceMetrics - not used by any components

	// Services
	services: {
		// Services removed for simplified implementation
	};

	// Utility functions
	trackEvent: (
		action: string,
		category: string,
		label?: string,
		value?: number,
	) => void;
	trackPageView: (path: string, title?: string) => void;
	reportError: (error: Error, context?: Record<string, unknown>) => void;
	// Removed unused refreshData function
}

// Default preferences
const defaultPreferences: AppState["preferences"] = {
	animationsEnabled: config.features.animations,
	notificationsEnabled: true,
	analyticsEnabled: config.features.analytics,
	language: "en",
};

// Create context
const AppContext = createContext<AppState | undefined>(undefined);

// Context provider props
interface AppProviderProps {
	children: ReactNode;
}

// Context provider component
export function AppProvider({ children }: AppProviderProps) {
	// Theme management
	const { mode: theme, resolvedTheme, setMode: setTheme } = useTheme();

	// Accessibility preferences
	const prefersReducedMotion = usePrefersReducedMotion();
	const [highContrast, setHighContrast] = useLocalStorage(
		"high-contrast",
		false,
	);

	// User preferences
	const [preferences, setStoredPreferences] = useLocalStorage(
		"app-preferences",
		defaultPreferences,
	);

	// Navigation state
	const [currentPath, setCurrentPath] = useState(window.location.pathname);
	// Removed unused state variables - visitedPages, data states, loading states, error states, and performanceMetrics

	// Update preferences
	const setPreferences = (
		newPreferences: Partial<AppState["preferences"]>,
	) => {
		setStoredPreferences((prev) => ({ ...prev, ...newPreferences }));
	};

	// Removed unused visitedPages tracking

	// Apply high contrast mode
	useEffect(() => {
		if (highContrast) {
			document.documentElement.classList.add("high-contrast");
		} else {
			document.documentElement.classList.remove("high-contrast");
		}
	}, [highContrast]);

	// Apply reduced motion preference
	useEffect(() => {
		if (prefersReducedMotion || !preferences.animationsEnabled) {
			document.documentElement.classList.add("reduce-motion");
		} else {
			document.documentElement.classList.remove("reduce-motion");
		}
	}, [prefersReducedMotion, preferences.animationsEnabled]);

	// Removed unused data fetching functions - components use static data imports

	// Analytics and tracking functions
	const trackEvent = (
		action: string,
		category: string,
		label?: string,
		value?: number,
	) => {
		if (preferences.analyticsEnabled) {
			console.log('Track event:', { action, category, label, value });
		}
	};

	const trackPageView = (path: string, title?: string) => {
		if (preferences.analyticsEnabled) {
			console.log('Track page view:', { path, title });
		}
		setCurrentPath(path);
	};

	const reportError = (error: Error, context?: Record<string, unknown>) => {
		console.error('Error reported:', error, context);
	};

	// Removed unused performance metrics tracking

	// Context value
	const contextValue: AppState = {
		// Theme
		theme,
		resolvedTheme,
		setTheme,

		// Accessibility
		prefersReducedMotion,
		highContrast,
		setHighContrast,

		// Removed unused data, loading, and error states

		// Preferences
		preferences,
		setPreferences,

		// Navigation
		currentPath,
		setCurrentPath,
		// Removed unused visitedPages and performanceMetrics

		// Services
		services: {
			// Services removed for simplified implementation
		},

		// Utility functions
		trackEvent,
		trackPageView,
		reportError,
		// Removed unused refreshData function
	};

	return (
		<AppContext.Provider value={contextValue}>
			{children}
		</AppContext.Provider>
	);
}

// Custom hook to use the app context
export function useApp(): AppState {
	const context = useContext(AppContext);
	if (context === undefined) {
		throw new Error("useApp must be used within an AppProvider");
	}
	return context;
}

// Note: Unused selector hooks and HOC removed
