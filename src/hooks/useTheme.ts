import { useEffect, useState } from 'react';
import type { ThemeMode } from '@/types';

const THEME_STORAGE_KEY = 'portfolio-theme';
const THEME_ATTRIBUTE = 'data-theme';

export function useTheme() {
	const [mode, setMode] = useState<ThemeMode>(() => {
		// Check if we're in the browser
		if (typeof window === 'undefined') return 'system';
		
		// Get stored theme or default to system
		const stored = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode;
		return stored || 'system';
	});

	const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

	// Get system theme preference
	const getSystemTheme = (): 'light' | 'dark' => {
		if (typeof window === 'undefined') return 'light';
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	};

	// Resolve the actual theme to apply
	const resolveTheme = (themeMode: ThemeMode): 'light' | 'dark' => {
		if (themeMode === 'system') {
			return getSystemTheme();
		}
		return themeMode;
	};

	// Apply theme to document
	const applyTheme = (theme: 'light' | 'dark') => {
		if (typeof document === 'undefined') return;
		
		const root = document.documentElement;
		root.classList.remove('light', 'dark');
		root.classList.add(theme);
		root.setAttribute(THEME_ATTRIBUTE, theme);
	};

	// Set theme mode
	const setThemeMode = (newMode: ThemeMode) => {
		setMode(newMode);
		localStorage.setItem(THEME_STORAGE_KEY, newMode);
		
		const resolved = resolveTheme(newMode);
		setResolvedTheme(resolved);
		applyTheme(resolved);
	};

	// Toggle between light and dark (skips system)
	const toggle = () => {
		const newMode = resolvedTheme === 'light' ? 'dark' : 'light';
		setThemeMode(newMode);
	};

	// Initialize theme on mount
	useEffect(() => {
		const resolved = resolveTheme(mode);
		setResolvedTheme(resolved);
		applyTheme(resolved);
	}, [mode, resolveTheme]);

	// Listen for system theme changes
	useEffect(() => {
		if (typeof window === 'undefined') return;

		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		
		const handleChange = () => {
			if (mode === 'system') {
				const resolved = getSystemTheme();
				setResolvedTheme(resolved);
				applyTheme(resolved);
			}
		};

		mediaQuery.addEventListener('change', handleChange);
		return () => mediaQuery.removeEventListener('change', handleChange);
	}, [mode]);

	return {
		mode,
		resolvedTheme,
		setMode: setThemeMode,
		toggle,
		isSystem: mode === 'system',
		isLight: resolvedTheme === 'light',
		isDark: resolvedTheme === 'dark',
	};
}