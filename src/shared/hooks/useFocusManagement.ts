import { useEffect, useRef } from 'react';

interface UseFocusManagementOptions {
	restoreFocus?: boolean;
	autoFocus?: boolean;
	trapFocus?: boolean;
}

export function useFocusManagement({
	restoreFocus = true,
	autoFocus = false,
	trapFocus = false
}: UseFocusManagementOptions = {}) {
	const containerRef = useRef<HTMLElement>(null);
	const previousActiveElement = useRef<Element | null>(null);

	// Store the previously focused element
	useEffect(() => {
		if (restoreFocus) {
			previousActiveElement.current = document.activeElement;
		}

		return () => {
			if (restoreFocus && previousActiveElement.current) {
				(previousActiveElement.current as HTMLElement).focus?.();
			}
		};
	}, [restoreFocus]);

	// Auto focus the container or first focusable element
	useEffect(() => {
		if (autoFocus && containerRef.current) {
			const firstFocusable = getFocusableElements(containerRef.current)[0];
			if (firstFocusable) {
				firstFocusable.focus();
			} else {
				containerRef.current.focus();
			}
		}
	}, [autoFocus]);

	// Trap focus within the container
	useEffect(() => {
		if (!trapFocus || !containerRef.current) return;

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key !== 'Tab' || !containerRef.current) return;

			const focusableElements = getFocusableElements(containerRef.current);
			const firstElement = focusableElements[0];
			const lastElement = focusableElements[focusableElements.length - 1];

			if (event.shiftKey) {
				// Shift + Tab
				if (document.activeElement === firstElement) {
					event.preventDefault();
					lastElement?.focus();
				}
			} else {
				// Tab
				if (document.activeElement === lastElement) {
					event.preventDefault();
					firstElement?.focus();
				}
			}
		};

		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [trapFocus]);

	return {
		containerRef,
		focusFirst: () => {
			if (containerRef.current) {
				const firstFocusable = getFocusableElements(containerRef.current)[0];
				firstFocusable?.focus();
			}
		},
		focusLast: () => {
			if (containerRef.current) {
				const focusableElements = getFocusableElements(containerRef.current);
				const lastFocusable = focusableElements[focusableElements.length - 1];
				lastFocusable?.focus();
			}
		}
	};
}

// Helper function to get focusable elements
function getFocusableElements(container: HTMLElement): HTMLElement[] {
	const focusableSelectors = [
		'button:not([disabled])',
		'[href]',
		'input:not([disabled])',
		'select:not([disabled])',
		'textarea:not([disabled])',
		'[tabindex]:not([tabindex="-1"])'
	].join(', ');

	return Array.from(container.querySelectorAll(focusableSelectors)) as HTMLElement[];
}