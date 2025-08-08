import { config } from "@/config";
import { errorUtils } from "@/utils";

// Define ContactFormData type locally since it's missing from @/types
interface ContactFormData {
	name: string;
	email: string;
	message: string;
	subject?: string;
}

// Extend Window interface for dataLayer
declare global {
	interface Window {
		dataLayer: unknown[];
		gtag: (...args: unknown[]) => void;
	}
}

// Base API client
class ApiClient {
	private baseUrl: string;
	private timeout: number;
	private retryAttempts: number;
	private retryDelay: number;

	constructor() {
		this.baseUrl = config.api.baseUrl;
		this.timeout = config.api.timeout;
		this.retryAttempts = config.api.retryAttempts;
		this.retryDelay = config.api.retryDelay;
	}

	private async fetchWithRetry(
		url: string,
		options: RequestInit = {},
		attempt = 1,
	): Promise<Response> {
		try {
			const controller = new AbortController();
			const timeoutId = setTimeout(
				() => controller.abort(),
				this.timeout,
			);

			const response = await fetch(url, {
				...options,
				signal: controller.signal,
				headers: {
					"Content-Type": "application/json",
					...options.headers,
				},
			});

			clearTimeout(timeoutId);

			if (!response.ok) {
				throw new Error(
					`HTTP ${response.status}: ${response.statusText}`,
				);
			}

			return response;
		} catch (error) {
			if (attempt < this.retryAttempts) {
				await new Promise((resolve) =>
					setTimeout(resolve, this.retryDelay * attempt),
				);
				return this.fetchWithRetry(url, options, attempt + 1);
			}
			throw error;
		}
	}

	async get<T>(endpoint: string): Promise<T> {
		const url = `${this.baseUrl}${endpoint}`;
		const response = await this.fetchWithRetry(url);
		return response.json();
	}

	async post<T>(endpoint: string, data: unknown): Promise<T> {
		const url = `${this.baseUrl}${endpoint}`;
		const response = await this.fetchWithRetry(url, {
			method: "POST",
			body: JSON.stringify(data),
		});
		return response.json();
	}

	async put<T>(endpoint: string, data: unknown): Promise<T> {
		const url = `${this.baseUrl}${endpoint}`;
		const response = await this.fetchWithRetry(url, {
			method: "PUT",
			body: JSON.stringify(data),
		});
		return response.json();
	}

	async delete<T>(endpoint: string): Promise<T> {
		const url = `${this.baseUrl}${endpoint}`;
		const response = await this.fetchWithRetry(url, {
			method: "DELETE",
		});
		return response.json();
	}
}

// Create API client instance
const apiClient = new ApiClient();

// Cache implementation
class CacheService {
	private cache = new Map<
		string,
		{ data: unknown; timestamp: number; ttl: number }
	>();
	private maxSize: number;
	private defaultTTL: number;

	constructor() {
		this.maxSize = config.cache.maxSize;
		this.defaultTTL = config.cache.defaultTTL;
	}

	set<T>(key: string, data: T, ttl = this.defaultTTL): void {
		if (!config.cache.enabled) return;

		// Remove oldest entries if cache is full
		if (this.cache.size >= this.maxSize) {
			const oldestKey = this.cache.keys().next().value;
			if (oldestKey) {
				this.cache.delete(oldestKey);
			}
		}

		this.cache.set(key, {
			data,
			timestamp: Date.now(),
			ttl,
		});
	}

	get<T>(key: string): T | null {
		if (!config.cache.enabled) return null;

		const entry = this.cache.get(key);
		if (!entry) return null;

		const isExpired = Date.now() - entry.timestamp > entry.ttl;
		if (isExpired) {
			this.cache.delete(key);
			return null;
		}

		return entry.data as T;
	}

	delete(key: string): void {
		this.cache.delete(key);
	}

	clear(): void {
		this.cache.clear();
	}

	has(key: string): boolean {
		if (!config.cache.enabled) return false;
		return this.cache.has(key) && this.get(key) !== null;
	}
}

// Create cache service instance
const cacheService = new CacheService();

// Email service using EmailJS
export class EmailService {
	private serviceId: string;
	private templateId: string;
	private publicKey: string;
	private isInitialized = false;

	constructor() {
		this.serviceId = config.email.serviceId;
		this.templateId = config.email.templateId;
		this.publicKey = config.email.publicKey;
	}

	private async initEmailJS(): Promise<void> {
		if (this.isInitialized || !config.email.enabled) return;

		try {
			// Dynamically import EmailJS
			const emailjs = await import("@emailjs/browser");
			emailjs.init(this.publicKey);
			this.isInitialized = true;
		} catch (error) {
			errorUtils.logError(error, "EmailJS initialization");
			throw new Error("Failed to initialize email service");
		}
	}

	async sendContactForm(data: ContactFormData): Promise<boolean> {
		if (!config.email.enabled) {
			throw new Error("Email service is not configured");
		}

		try {
			await this.initEmailJS();
			const emailjs = await import("@emailjs/browser");

			const templateParams = {
				from_name: data.name,
				from_email: data.email,
				subject: data.subject || "Contact Form Submission",
				message: data.message,
				to_name: "Saddat Hasan",
			};

			await emailjs.send(this.serviceId, this.templateId, templateParams);

			return true;
		} catch (error) {
			errorUtils.logError(error, "Email sending");
			return false;
		}
	}

	async sendEmail(
		to: string,
		subject: string,
		message: string,
	): Promise<boolean> {
		return this.sendContactForm({
			name: "Portfolio Contact",
			email: to,
			subject,
			message,
		});
	}
}

// Analytics service
export class AnalyticsService {
	private isInitialized = false;


	private async initGoogleAnalytics(): Promise<void> {
		if (this.isInitialized || !config.analytics.enabled || typeof window === "undefined") return;

		try {
			// Load Google Analytics script
			const script = document.createElement("script");
			script.async = true;
			script.src = `https://www.googletagmanager.com/gtag/js?id=${config.analytics.googleAnalyticsId || ''}`;
			document.head.appendChild(script);

			// Initialize gtag
			window.dataLayer = window.dataLayer || [];
			function gtag(...args: unknown[]) {
				window.dataLayer.push(args);
			}
			// gtag is available globally after initialization
			window.gtag = gtag;
			gtag("js", new Date());
			gtag("config", config.analytics.googleAnalyticsId || '');

			this.isInitialized = true;
		} catch (error) {
			errorUtils.logError(error, "Google Analytics initialization");
		}
	}

	async trackPageView(path: string, title?: string): Promise<void> {
		if (!config.analytics.enabled) return;

		try {
			await this.initGoogleAnalytics();
			if (typeof window !== 'undefined' && window.gtag) {
				window.gtag("config", config.analytics.googleAnalyticsId, {
					page_path: path,
					page_title: title,
				});
			}
		} catch (error) {
			errorUtils.logError(error, "Page view tracking");
		}
	}

	async trackEvent(
		action: string,
		category: string,
		label?: string,
		value?: number,
	): Promise<void> {
		if (!config.analytics.enabled) return;

		try {
			await this.initGoogleAnalytics();
			if (typeof window !== 'undefined' && window.gtag) {
				window.gtag("event", action, {
					event_category: category,
					event_label: label,
					value: value,
				});
			}
		} catch (error) {
			errorUtils.logError(error, "Event tracking");
		}
	}

	async trackTiming(
		category: string,
		variable: string,
		value: number,
		label?: string,
	): Promise<void> {
		if (!config.analytics.enabled) return;

		try {
			await this.initGoogleAnalytics();
			if (typeof window !== 'undefined' && window.gtag) {
				window.gtag("event", "timing_complete", {
					name: variable,
					value: value,
					event_category: category,
					event_label: label,
				});
			}
		} catch (error) {
			errorUtils.logError(error, "Timing tracking");
		}
	}
}

// Error reporting service
export class ErrorReportingService {
	private isInitialized = false;

	private async initSentry(): Promise<void> {
		if (this.isInitialized || !config.errorReporting.enabled || typeof window === "undefined") return;

		try {
			// Dynamically import Sentry
			const Sentry = await import("@sentry/browser");

			Sentry.init({
				dsn: config.errorReporting.sentryDsn,
				environment: config.errorReporting.environment,
				sampleRate: config.errorReporting.sampleRate,
				// integrations: [new Sentry.BrowserTracing()], // Commented out due to import issues
				tracesSampleRate: 0.1,
			});

			this.isInitialized = true;
		} catch (error) {
			console.error("Failed to initialize Sentry:", error);
		}
	}

	async reportError(
		error: Error,
		context?: Record<string, unknown>,
	): Promise<void> {
		if (!config.errorReporting.enabled) {
			console.error("Error:", error, context);
			return;
		}

		try {
			await this.initSentry();
			const Sentry = await import("@sentry/browser");

			Sentry.withScope((scope) => {
				if (context) {
					Object.entries(context).forEach(([key, value]) => {
						scope.setContext(key, value as Record<string, unknown>);
					});
				}
				Sentry.captureException(error);
			});
		} catch (initError) {
			console.error("Error reporting failed:", initError);
			console.error("Original error:", error, context);
		}
	}

	async reportMessage(
		message: string,
		level: "info" | "warning" | "error" = "info",
	): Promise<void> {
		if (!config.errorReporting.enabled) {
			if (level === 'warning') {
				console.warn(message);
			} else if (level === 'error') {
				console.error(message);
			} else {
				console.log(message);
			}
			return;
		}

		try {
			await this.initSentry();
			const Sentry = await import("@sentry/browser");
			Sentry.captureMessage(message, level);
		} catch (error) {
			console.error("Message reporting failed:", error);
			if (level === 'warning') {
				console.warn("Original message:", message);
			} else {
				console[level]("Original message:", message);
			}
		}
	}
}

// Performance monitoring service
export class PerformanceService {
	private metrics = new Map<string, number>();

	startTiming(label: string): void {
		this.metrics.set(label, performance.now());
	}

	endTiming(label: string): number | null {
		const startTime = this.metrics.get(label);
		if (!startTime) return null;

		const duration = performance.now() - startTime;
		this.metrics.delete(label);

		if (config.development.enableDevtools) {
			console.log(`⏱️ ${label}: ${duration.toFixed(2)}ms`);
		}

		return duration;
	}

	measure<T>(label: string, fn: () => T): T {
		this.startTiming(label);
		const result = fn();
		this.endTiming(label);
		return result;
	}

	async measureAsync<T>(label: string, fn: () => Promise<T>): Promise<T> {
		this.startTiming(label);
		const result = await fn();
		this.endTiming(label);
		return result;
	}

	async getWebVitals(): Promise<Record<string, number>> {
		try {
			if (typeof window === "undefined") {
				return {};
			}

			const { onCLS, onFCP, onLCP, onTTFB } =
				await import("web-vitals");

			const vitals: Record<string, number> = {};

			return new Promise((resolve) => {
				onCLS((metric: { value: number }) => {
					vitals.cls = metric.value;
				});
				// onFID is deprecated in newer versions of web-vitals
				onFCP((metric: { value: number }) => {
					vitals.fcp = metric.value;
				});
				onLCP((metric: { value: number }) => {
					vitals.lcp = metric.value;
				});
				onTTFB((metric: { value: number }) => {
					vitals.ttfb = metric.value;
				});

				// Wait a bit for metrics to be collected
				setTimeout(() => resolve(vitals), 1000);
			});
		} catch (error) {
			errorReportingService.reportError(
				error as Error,
				{ service: "PerformanceService", method: "getWebVitals" },
			);
			return {};
		}
	}
}

// Create service instances
export const emailService = new EmailService();
export const analyticsService = new AnalyticsService();
export const errorReportingService = new ErrorReportingService();
export const performanceService = new PerformanceService();

// Data fetching service with caching
export class DataService {
	async fetchWithCache<T>(
		key: string,
		fetcher: () => Promise<T>,
		ttl?: number,
	): Promise<T> {
		// Check cache first
		const cached = cacheService.get<T>(key);
		if (cached) {
			return cached;
		}

		// Fetch data
		const data = await performanceService.measureAsync(
			`fetch-${key}`,
			fetcher,
		);

		// Cache the result
		cacheService.set(key, data, ttl);

		return data;
	}

	async fetchProjects() {
		return this.fetchWithCache("projects", async () => {
			// In a real app, this would fetch from an API
			const { projects } = await import("@/data/projects");
			return projects;
		});
	}

	async fetchExperience() {
		return this.fetchWithCache("experience", async () => {
			// In a real app, this would fetch from an API
			try {
				const { experiences } = await import("@/data/experience");
				return experiences;
			} catch {
				return [];
			}
		});
	}

	async fetchCertificates() {
		return this.fetchWithCache("certificates", async () => {
			// In a real app, this would fetch from an API
			const { certificates } = await import("@/data/certificates");
			return certificates;
		});
	}

	async fetchSkills() {
		return this.fetchWithCache("skills", async () => {
			// In a real app, this would fetch from an API
			try {
				const { skills } = await import("@/data/skills");
				return skills;
			} catch {
				return [];
			}
		});
	}

	clearCache(): void {
		cacheService.clear();
	}

	invalidateCache(key: string): void {
		cacheService.delete(key);
	}
}

// Create data service instance
export const dataService = new DataService();

// Export cache service for direct use
export { cacheService };

// Export API client for direct use
export { apiClient };

// Utility functions
export const createSafeAsyncService = <T extends unknown[], R>(
	fn: (...args: T) => Promise<R>,
	serviceName: string,
) => {
	return errorUtils.safeAsync(fn, (error) => {
		errorReportingService.reportError(
			error instanceof Error ? error : new Error(String(error)),
			{ service: serviceName },
		);
	});
};

export const withPerformanceTracking = <T extends unknown[], R>(
	fn: (...args: T) => Promise<R>,
	label: string,
) => {
	return async (...args: T): Promise<R> => {
		return performanceService.measureAsync(label, () => fn(...args));
	};
};
