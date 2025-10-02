import { useEffect, useState } from 'react';

const THEME_STORAGE_KEY = 'portfolio-theme';

export function useTheme() {
	const [isDark, setIsDark] = useState<boolean>(() => {
		// Check if we're in the browser
		if (typeof window === 'undefined') return true; // Default to dark on server
		
		// Get stored theme or default to dark
		const stored = localStorage.getItem(THEME_STORAGE_KEY);
		return stored ? stored === 'dark' : true; // Default to dark if no preference
	});

	// Apply theme to document
	const applyTheme = (dark: boolean) => {
		if (typeof document === 'undefined') return;
		
		const root = document.documentElement;
		if (dark) {
			root.classList.add('dark');
			root.classList.remove('light');
		} else {
			root.classList.add('light');
			root.classList.remove('dark');
		}
	};

	// Set theme
	const setTheme = (dark: boolean) => {
		setIsDark(dark);
		localStorage.setItem(THEME_STORAGE_KEY, dark ? 'dark' : 'light');
		applyTheme(dark);
	};

	// Toggle between light and dark
	const toggle = () => {
		setTheme(!isDark);
	};

	// Initialize theme on mount
	useEffect(() => {
		applyTheme(isDark);
	}, [isDark]);

	return {
		isDark,
		isLight: !isDark,
		setTheme,
		toggle,
	};
}