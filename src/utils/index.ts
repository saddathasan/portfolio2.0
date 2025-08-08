import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { VALIDATION, ERROR_MESSAGES } from '@/constants';

// Re-export the existing cn function
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// String utilities
export const stringUtils = {
	/**
	 * Capitalizes the first letter of a string
	 */
	capitalize: (str: string): string => {
		return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
	},

	/**
	 * Converts a string to title case
	 */
	toTitleCase: (str: string): string => {
		return str.replace(/\w\S*/g, (txt) => 
			txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
		);
	},

	/**
	 * Truncates a string to a specified length
	 */
	truncate: (str: string, length: number, suffix = '...'): string => {
		if (str.length <= length) return str;
		return str.slice(0, length - suffix.length) + suffix;
	},

	/**
	 * Converts a string to a URL-friendly slug
	 */
	slugify: (str: string): string => {
		return str
			.toLowerCase()
			.trim()
			.replace(/[^\w\s-]/g, '')
			.replace(/[\s_-]+/g, '-')
			.replace(/^-+|-+$/g, '');
	},

	/**
	 * Extracts initials from a name
	 */
	getInitials: (name: string): string => {
		return name
			.split(' ')
			.map(word => word.charAt(0))
			.join('')
			.toUpperCase()
			.slice(0, 2);
	}
};

// Number utilities
export const numberUtils = {
	/**
	 * Formats a number with commas
	 */
	formatNumber: (num: number): string => {
		return new Intl.NumberFormat().format(num);
	},

	/**
	 * Formats a number as currency
	 */
	formatCurrency: (amount: number, currency = 'USD'): string => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency
		}).format(amount);
	},

	/**
	 * Formats a number as percentage
	 */
	formatPercentage: (value: number, decimals = 1): string => {
		return `${(value * 100).toFixed(decimals)}%`;
	},

	/**
	 * Clamps a number between min and max values
	 */
	clamp: (value: number, min: number, max: number): number => {
		return Math.min(Math.max(value, min), max);
	},

	/**
	 * Generates a random number between min and max
	 */
	random: (min: number, max: number): number => {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
};

// Date utilities
export const dateUtils = {
	/**
	 * Formats a date to a readable string
	 */
	formatDate: (date: Date | string, options?: Intl.DateTimeFormatOptions): string => {
		const dateObj = typeof date === 'string' ? new Date(date) : date;
		return new Intl.DateTimeFormat('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			...options
		}).format(dateObj);
	},

	/**
	 * Gets relative time (e.g., "2 hours ago")
	 */
	getRelativeTime: (date: Date | string): string => {
		const dateObj = typeof date === 'string' ? new Date(date) : date;
		const now = new Date();
		const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

		const intervals = [
			{ label: 'year', seconds: 31536000 },
			{ label: 'month', seconds: 2592000 },
			{ label: 'week', seconds: 604800 },
			{ label: 'day', seconds: 86400 },
			{ label: 'hour', seconds: 3600 },
			{ label: 'minute', seconds: 60 }
		];

		for (const interval of intervals) {
			const count = Math.floor(diffInSeconds / interval.seconds);
			if (count >= 1) {
				return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
			}
		}

		return 'just now';
	},

	/**
	 * Checks if a date is today
	 */
	isToday: (date: Date | string): boolean => {
		const dateObj = typeof date === 'string' ? new Date(date) : date;
		const today = new Date();
		return dateObj.toDateString() === today.toDateString();
	},

	/**
	 * Gets the duration between two dates
	 */
	getDuration: (startDate: Date | string, endDate: Date | string): string => {
		const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
		const end = typeof endDate === 'string' ? new Date(endDate) : endDate;
		const diffInMonths = (end.getFullYear() - start.getFullYear()) * 12 + 
			(end.getMonth() - start.getMonth());

		if (diffInMonths < 12) {
			return `${diffInMonths} month${diffInMonths !== 1 ? 's' : ''}`;
		}

		const years = Math.floor(diffInMonths / 12);
		const months = diffInMonths % 12;

		if (months === 0) {
			return `${years} year${years !== 1 ? 's' : ''}`;
		}

		return `${years} year${years !== 1 ? 's' : ''}, ${months} month${months !== 1 ? 's' : ''}`;
	}
};

// Array utilities
export const arrayUtils = {
	/**
	 * Removes duplicates from an array
	 */
	unique: <T>(array: T[]): T[] => {
		return [...new Set(array)];
	},

	/**
	 * Groups array items by a key
	 */
	groupBy: <T, K extends keyof T>(array: T[], key: K): Record<string, T[]> => {
		return array.reduce((groups, item) => {
			const groupKey = String(item[key]);
			if (!groups[groupKey]) {
				groups[groupKey] = [];
			}
			groups[groupKey].push(item);
			return groups;
		}, {} as Record<string, T[]>);
	},

	/**
	 * Shuffles an array
	 */
	shuffle: <T>(array: T[]): T[] => {
		const shuffled = [...array];
		for (let i = shuffled.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
		}
		return shuffled;
	},

	/**
	 * Chunks an array into smaller arrays
	 */
	chunk: <T>(array: T[], size: number): T[][] => {
		const chunks: T[][] = [];
		for (let i = 0; i < array.length; i += size) {
			chunks.push(array.slice(i, i + size));
		}
		return chunks;
	},

	/**
	 * Finds the intersection of two arrays
	 */
	intersection: <T>(array1: T[], array2: T[]): T[] => {
		return array1.filter(item => array2.includes(item));
	}
};

// Object utilities
export const objectUtils = {
	/**
	 * Deep clones an object
	 */
	deepClone: <T>(obj: T): T => {
		if (obj === null || typeof obj !== 'object') return obj;
		if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T;
		if (obj instanceof Array) return obj.map(item => objectUtils.deepClone(item)) as unknown as T;
		if (typeof obj === 'object') {
			const cloned = {} as T;
			for (const key in obj) {
				if (Object.prototype.hasOwnProperty.call(obj, key)) {
					cloned[key] = objectUtils.deepClone(obj[key]);
				}
			}
			return cloned;
		}
		return obj;
	},

	/**
	 * Omits specified keys from an object
	 */
	omit: <T extends Record<string, unknown>, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> => {
		const result = { ...obj };
		keys.forEach(key => delete result[key]);
		return result;
	},

	/**
	 * Picks specified keys from an object
	 */
	pick: <T extends Record<string, unknown>, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
		const result = {} as Pick<T, K>;
		keys.forEach(key => {
			if (Object.prototype.hasOwnProperty.call(obj, key)) {
				result[key] = obj[key];
			}
		});
		return result;
	},

	/**
	 * Checks if an object is empty
	 */
	isEmpty: (obj: Record<string, unknown>): boolean => {
		return Object.keys(obj).length === 0;
	}
};

// Validation utilities
export const validationUtils = {
	/**
	 * Validates an email address
	 */
	isValidEmail: (email: string): boolean => {
		return VALIDATION.EMAIL_REGEX.test(email);
	},

	/**
	 * Validates a phone number
	 */
	isValidPhone: (phone: string): boolean => {
		return VALIDATION.PHONE_REGEX.test(phone);
	},

	/**
	 * Validates a URL
	 */
	isValidUrl: (url: string): boolean => {
		return VALIDATION.URL_REGEX.test(url);
	},

	/**
	 * Validates a name
	 */
	isValidName: (name: string): boolean => {
		const trimmed = name.trim();
		return trimmed.length >= VALIDATION.MIN_NAME_LENGTH && 
			   trimmed.length <= VALIDATION.MAX_NAME_LENGTH;
	},

	/**
	 * Validates a message
	 */
	isValidMessage: (message: string): boolean => {
		const trimmed = message.trim();
		return trimmed.length >= VALIDATION.MIN_MESSAGE_LENGTH && 
			   trimmed.length <= VALIDATION.MAX_MESSAGE_LENGTH;
	}
};

// URL utilities
export const urlUtils = {
	/**
	 * Extracts domain from URL
	 */
	getDomain: (url: string): string => {
		try {
			return new URL(url).hostname;
		} catch {
			return '';
		}
	},

	/**
	 * Adds query parameters to URL
	 */
	addQueryParams: (url: string, params: Record<string, string>): string => {
		const urlObj = new URL(url);
		Object.entries(params).forEach(([key, value]) => {
			urlObj.searchParams.set(key, value);
		});
		return urlObj.toString();
	},

	/**
	 * Checks if URL is external
	 */
	isExternalUrl: (url: string): boolean => {
		try {
			const urlObj = new URL(url);
			return urlObj.origin !== window.location.origin;
		} catch {
			return false;
		}
	}
};

// Error handling utilities
export const errorUtils = {
	/**
	 * Gets user-friendly error message
	 */
	getErrorMessage: (error: unknown): string => {
		if (error instanceof Error) {
			return error.message;
		}
		if (typeof error === 'string') {
			return error;
		}
		return ERROR_MESSAGES.GENERIC;
	},

	/**
	 * Logs error with context
	 */
	logError: (error: unknown, context?: string): void => {
		const message = errorUtils.getErrorMessage(error);
		const logMessage = context ? `[${context}] ${message}` : message;
		console.error(logMessage, error);
	},

	/**
	 * Creates a safe async function that catches errors
	 */
	safeAsync: <T extends unknown[], R>(
		fn: (...args: T) => Promise<R>,
		onError?: (error: unknown) => void
	) => {
		return async (...args: T): Promise<R | null> => {
			try {
				return await fn(...args);
			} catch (error) {
				if (onError) {
					onError(error);
				} else {
					errorUtils.logError(error, fn.name);
				}
				return null;
			}
		};
	}
};

// Performance utilities
export const performanceUtils = {
	/**
	 * Debounces a function
	 */
	debounce: <T extends unknown[]>(fn: (...args: T) => void, delay: number) => {
		let timeoutId: NodeJS.Timeout;
		return (...args: T) => {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => fn(...args), delay);
		};
	},

	/**
	 * Throttles a function
	 */
	throttle: <T extends unknown[]>(fn: (...args: T) => void, delay: number) => {
		let lastCall = 0;
		return (...args: T) => {
			const now = Date.now();
			if (now - lastCall >= delay) {
				lastCall = now;
				fn(...args);
			}
		};
	},

	/**
	 * Measures function execution time
	 */
	measureTime: async <T>(fn: () => Promise<T> | T, label?: string): Promise<T> => {
		const start = performance.now();
		const result = await fn();
		const end = performance.now();
		const duration = end - start;
		
		if (label) {
			console.log(`${label}: ${duration.toFixed(2)}ms`);
		}
		
		return result;
	}
};

// Browser utilities
export const browserUtils = {
	/**
	 * Checks if code is running in browser
	 */
	isBrowser: (): boolean => {
		return typeof window !== 'undefined';
	},

	/**
	 * Copies text to clipboard
	 */
	copyToClipboard: async (text: string): Promise<boolean> => {
		if (!browserUtils.isBrowser()) return false;
		
		try {
			await navigator.clipboard.writeText(text);
			return true;
		} catch {
			// Fallback for older browsers
			const textArea = document.createElement('textarea');
			textArea.value = text;
			document.body.appendChild(textArea);
			textArea.select();
			try {
				document.execCommand('copy');
				return true;
			} catch {
				return false;
			} finally {
				document.body.removeChild(textArea);
			}
		}
	},

	/**
	 * Gets user's preferred color scheme
	 */
	getPreferredColorScheme: (): 'light' | 'dark' => {
		if (!browserUtils.isBrowser()) return 'light';
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	},

	/**
	 * Scrolls to element smoothly
	 */
	scrollToElement: (elementId: string, offset = 0): void => {
		if (!browserUtils.isBrowser()) return;
		
		const element = document.getElementById(elementId);
		if (element) {
			const elementPosition = element.offsetTop - offset;
			window.scrollTo({
				top: elementPosition,
				behavior: 'smooth'
			});
		}
	}
};