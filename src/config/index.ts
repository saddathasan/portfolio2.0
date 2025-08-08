import { FEATURES, SEO, API, SOCIAL_LINKS } from '@/constants';

// Environment variables with defaults
const env = {
	NODE_ENV: import.meta.env.MODE || 'development',
	VITE_APP_TITLE: import.meta.env.VITE_APP_TITLE || SEO.DEFAULT_TITLE,
	VITE_APP_DESCRIPTION: import.meta.env.VITE_APP_DESCRIPTION || SEO.DEFAULT_DESCRIPTION,
	VITE_APP_URL: import.meta.env.VITE_APP_URL || SEO.SITE_URL,
	VITE_API_URL: import.meta.env.VITE_API_URL || '',
	VITE_ANALYTICS_ID: import.meta.env.VITE_ANALYTICS_ID || '',
	VITE_SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN || '',
	VITE_EMAILJS_SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
	VITE_EMAILJS_TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
	VITE_EMAILJS_PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ''
};

// Application configuration
export const config = {
	// Environment
	env: {
		isDevelopment: env.NODE_ENV === 'development',
		isProduction: env.NODE_ENV === 'production',
		isTest: env.NODE_ENV === 'test'
	},

	// Application metadata
	app: {
		name: env.VITE_APP_TITLE,
		description: env.VITE_APP_DESCRIPTION,
		url: env.VITE_APP_URL,
		version: '1.0.0',
		author: 'Saddat Hasan',
		keywords: SEO.DEFAULT_KEYWORDS
	},

	// API configuration
	api: {
		baseUrl: env.VITE_API_URL,
		timeout: API.TIMEOUT,
		retryAttempts: API.RETRY_ATTEMPTS,
		retryDelay: API.RETRY_DELAY,
		cacheDuration: API.CACHE_DURATION
	},

	// Feature flags
	features: {
		darkMode: FEATURES.DARK_MODE,
		animations: FEATURES.ANIMATIONS,
		analytics: FEATURES.ANALYTICS && !!env.VITE_ANALYTICS_ID,
		a11yFeatures: FEATURES.A11Y_FEATURES,
		developmentTools: FEATURES.DEVELOPMENT_TOOLS,
		errorReporting: !!env.VITE_SENTRY_DSN,
		contactForm: !!(env.VITE_EMAILJS_SERVICE_ID && env.VITE_EMAILJS_TEMPLATE_ID && env.VITE_EMAILJS_PUBLIC_KEY)
	},

	// Social media links
	social: {
		linkedin: SOCIAL_LINKS.LINKEDIN,
		github: SOCIAL_LINKS.GITHUB,
		twitter: SOCIAL_LINKS.TWITTER,
		email: SOCIAL_LINKS.EMAIL
	},

	// SEO configuration
	seo: {
		defaultTitle: SEO.DEFAULT_TITLE,
		titleTemplate: SEO.TITLE_TEMPLATE,
		defaultDescription: SEO.DEFAULT_DESCRIPTION,
		siteUrl: SEO.SITE_URL,
		ogImage: SEO.OG_IMAGE,
		twitterHandle: '@saddathasan'
	},

	// Analytics configuration
	analytics: {
		googleAnalyticsId: env.VITE_ANALYTICS_ID,
		enabled: env.NODE_ENV === 'production' && !!env.VITE_ANALYTICS_ID
	},

	// Error reporting configuration
	errorReporting: {
		sentryDsn: env.VITE_SENTRY_DSN,
		enabled: env.NODE_ENV === 'production' && !!env.VITE_SENTRY_DSN,
		environment: env.NODE_ENV,
		sampleRate: env.NODE_ENV === 'production' ? 0.1 : 1.0
	},

	// Email configuration
	email: {
		serviceId: env.VITE_EMAILJS_SERVICE_ID,
		templateId: env.VITE_EMAILJS_TEMPLATE_ID,
		publicKey: env.VITE_EMAILJS_PUBLIC_KEY,
		enabled: !!(env.VITE_EMAILJS_SERVICE_ID && env.VITE_EMAILJS_TEMPLATE_ID && env.VITE_EMAILJS_PUBLIC_KEY)
	},

	// Theme configuration
	theme: {
		defaultMode: 'system' as const,
		storageKey: 'portfolio-theme',
		attribute: 'data-theme',
		enableDarkMode: FEATURES.DARK_MODE
	},

	// Animation configuration
	animation: {
		enabled: FEATURES.ANIMATIONS,
		reducedMotionQuery: '(prefers-reduced-motion: reduce)',
		defaultDuration: 0.4,
		defaultEasing: 'ease-out'
	},

	// Performance configuration
	performance: {
		lazyLoadThreshold: 0.1,
		debounceDelay: 300,
		throttleDelay: 100,
		imageQuality: 85,
		maxImageSize: 1920,
		enableServiceWorker: env.NODE_ENV === 'production'
	},

	// Accessibility configuration
	a11y: {
		enabled: FEATURES.A11Y_FEATURES,
		focusVisible: true,
		skipLinks: true,
		announcements: true,
		highContrast: false,
		reducedMotion: false
	},

	// Development configuration
	development: {
		showGrid: false,
		showBreakpoints: false,
		enableDevtools: env.NODE_ENV === 'development',
		logLevel: env.NODE_ENV === 'development' ? 'debug' : 'error',
		enableHotReload: env.NODE_ENV === 'development'
	},

	// Routes configuration
	routes: {
		home: '/',
		about: '/about',
		experience: '/experience',
		projects: '/projects',
		certificates: '/certificates',
		contact: '/contact'
	},

	// Navigation configuration
	navigation: {
		main: [
			{ name: 'Home', href: '/', icon: 'home' },
			{ name: 'About', href: '/about', icon: 'user' },
			{ name: 'Experience', href: '/experience', icon: 'briefcase' },
			{ name: 'Projects', href: '/projects', icon: 'code' },
			{ name: 'Certificates', href: '/certificates', icon: 'award' },
			{ name: 'Contact', href: '/contact', icon: 'mail' }
		],
		social: [
			{ name: 'LinkedIn', href: SOCIAL_LINKS.LINKEDIN, icon: 'linkedin' },
			{ name: 'GitHub', href: SOCIAL_LINKS.GITHUB, icon: 'github' },
			{ name: 'Twitter', href: SOCIAL_LINKS.TWITTER, icon: 'twitter' },
			{ name: 'Email', href: SOCIAL_LINKS.EMAIL, icon: 'mail' }
		]
	},

	// Content configuration
	content: {
		maxProjectsPerPage: 9,
		maxExperienceItems: 10,
		maxCertificates: 20,
		maxSkillsPerCategory: 15,
		defaultProjectImage: '/images/project-placeholder.jpg',
		defaultAvatarImage: '/images/avatar-placeholder.jpg'
	},

	// Cache configuration
	cache: {
		defaultTTL: 300000, // 5 minutes
		maxSize: 100, // Maximum number of cached items
		storageType: 'memory' as const, // 'memory' | 'localStorage' | 'sessionStorage'
		enabled: true
	},

	// Security configuration
	security: {
		csp: {
			enabled: env.NODE_ENV === 'production',
			directives: {
				defaultSrc: ["'self'"],
				scriptSrc: ["'self'", "'unsafe-inline'", 'https://www.googletagmanager.com'],
				styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
				fontSrc: ["'self'", 'https://fonts.gstatic.com'],
				imgSrc: ["'self'", 'data:', 'https:'],
				connectSrc: ["'self'", 'https://api.emailjs.com']
			}
		},
		hsts: {
			enabled: env.NODE_ENV === 'production',
			maxAge: 31536000,
			includeSubDomains: true,
			preload: true
		}
	}
} as const;

// Type exports for better TypeScript support
export type Config = typeof config;
export type FeatureFlags = typeof config.features;
export type ThemeConfig = typeof config.theme;
export type NavigationItem = typeof config.navigation.main[0];

// Helper functions
export const getFeatureFlag = (flag: keyof FeatureFlags): boolean => {
	return config.features[flag];
};

export const getRoute = (route: keyof typeof config.routes): string => {
	return config.routes[route];
};

export const isProduction = (): boolean => {
	return config.env.isProduction;
};

export const isDevelopment = (): boolean => {
	return config.env.isDevelopment;
};

export const getApiUrl = (endpoint: string = ''): string => {
	return `${config.api.baseUrl}${endpoint}`;
};

export const getSocialLink = (platform: keyof typeof config.social): string => {
	return config.social[platform];
};