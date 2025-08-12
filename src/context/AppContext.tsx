import { config } from "@/config";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useTheme } from "@/hooks/useTheme";
// Services removed - using simplified data fetching
import type { Certificate, Experience, Project, SkillCategory } from "@/types";
import React, {
	createContext,
	type ReactNode,
	useCallback,
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

	// Data state
	projects: Project[];
	experience: Experience[];
	certificates: Certificate[];
	skills: SkillCategory[];

	// Loading states
	isLoading: {
		projects: boolean;
		experience: boolean;
		certificates: boolean;
		skills: boolean;
	};

	// Error states
	errors: {
		projects: string | null;
		experience: string | null;
		certificates: string | null;
		skills: string | null;
	};

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
	visitedPages: string[];

	// Performance metrics
	performanceMetrics: Record<string, number>;

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
	refreshData: (
		type?: "projects" | "experience" | "certificates" | "skills",
	) => Promise<void>;
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
	const [visitedPages, setVisitedPages] = useLocalStorage<string[]>(
		"visited-pages",
		[],
	);

	// Data state
	const [projects, setProjects] = useState<Project[]>([]);
	const [experience, setExperience] = useState<Experience[]>([]);
	const [certificates, setCertificates] = useState<Certificate[]>([]);
	const [skills, setSkills] = useState<SkillCategory[]>([]);

	// Loading states
	const [isLoading, setIsLoading] = useState({
		projects: true,
		experience: true,
		certificates: true,
		skills: true,
	});

	// Error states
	const [errors, setErrors] = useState({
		projects: null as string | null,
		experience: null as string | null,
		certificates: null as string | null,
		skills: null as string | null,
	});

	// Performance metrics
	const [performanceMetrics, setPerformanceMetrics] = useState<
		Record<string, number>
	>({});

	// Update preferences
	const setPreferences = (
		newPreferences: Partial<AppState["preferences"]>,
	) => {
		setStoredPreferences((prev) => ({ ...prev, ...newPreferences }));
	};

	// Track page visits
	useEffect(() => {
		if (!visitedPages.includes(currentPath)) {
			setVisitedPages((prev) => [...prev, currentPath]);
		}
	}, [currentPath, visitedPages, setVisitedPages]);

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

	// Data fetching functions
	const fetchData = async <T,>(
		type: "projects" | "experience" | "certificates" | "skills",
		fetcher: () => Promise<T>,
		setter: (data: T) => void,
	) => {
		try {
			setIsLoading((prev) => ({ ...prev, [type]: true }));
			setErrors((prev) => ({ ...prev, [type]: null }));

			const data = await fetcher();
			setter(data);
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Failed to fetch data";
			setErrors((prev) => ({ ...prev, [type]: errorMessage }));
			console.error(`Error fetching ${type}:`, error);
		} finally {
			setIsLoading((prev) => ({ ...prev, [type]: false }));
		}
	};

	// Refresh data function
	const refreshData = useCallback(async (
		type?: "projects" | "experience" | "certificates" | "skills",
	) => {
		// Simplified implementation - just reset loading states
		if (!type) {
			setIsLoading({
				projects: false,
				experience: false,
				certificates: false,
				skills: false,
			});
		} else {
			setIsLoading((prev) => ({ ...prev, [type]: false }));
		}
	}, []);

	// Initial data loading
	useEffect(() => {
		// Set initial loading to false since we're not fetching data
		setIsLoading({
			projects: false,
			experience: false,
			certificates: false,
			skills: false,
		});
	}, []);

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

	// Performance monitoring
	useEffect(() => {
		const updatePerformanceMetrics = () => {
			// Simplified performance metrics
			setPerformanceMetrics({
				loadTime: performance.now(),
				timestamp: Date.now()
			});
		};

		// Collect metrics after initial load
		const timer = setTimeout(updatePerformanceMetrics, 2000);
		return () => clearTimeout(timer);
	}, []);

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

		// Data
		projects,
		experience,
		certificates,
		skills,

		// Loading states
		isLoading,

		// Error states
		errors,

		// Preferences
		preferences,
		setPreferences,

		// Navigation
		currentPath,
		setCurrentPath,
		visitedPages,

		// Performance
		performanceMetrics,

		// Services
		services: {
			// Services removed for simplified implementation
		},

		// Utility functions
		trackEvent,
		trackPageView,
		reportError,
		refreshData,
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

// Selector hooks for specific parts of the state
export function useAppTheme() {
	const { theme, resolvedTheme, setTheme } = useApp();
	return { theme, resolvedTheme, setTheme };
}

export function useAppData() {
	const {
		projects,
		experience,
		certificates,
		skills,
		isLoading,
		errors,
		refreshData,
	} = useApp();
	return {
		projects,
		experience,
		certificates,
		skills,
		isLoading,
		errors,
		refreshData,
	};
}

export function useAppPreferences() {
	const {
		preferences,
		setPreferences,
		highContrast,
		setHighContrast,
		prefersReducedMotion,
	} = useApp();
	return {
		preferences,
		setPreferences,
		highContrast,
		setHighContrast,
		prefersReducedMotion,
	};
}

export function useAppNavigation() {
	const { currentPath, setCurrentPath, visitedPages, trackPageView } =
		useApp();
	return { currentPath, setCurrentPath, visitedPages, trackPageView };
}

export function useAppServices() {
	const { services, trackEvent, reportError } = useApp();
	return { services, trackEvent, reportError };
}

export function useAppPerformance() {
	const { performanceMetrics } = useApp();
	return { performanceMetrics };
}

// HOC for components that need app context
export function withAppContext<P extends object>(
	Component: React.ComponentType<P>,
) {
	return function WrappedComponent(props: P) {
		return (
			<AppProvider>
				<Component {...props} />
			</AppProvider>
		);
	};
}
