// Application constants and configuration

// Animation constants
export const ANIMATION_DURATION = {
	FAST: 0.2,
	NORMAL: 0.4,
	SLOW: 0.6,
	EXTRA_SLOW: 1.0,
} as const;

export const ANIMATION_DELAY = {
	NONE: 0,
	SHORT: 0.1,
	MEDIUM: 0.2,
	LONG: 0.4,
} as const;

export const ANIMATION_EASING = {
	EASE_OUT: [0.25, 0.1, 0.25, 1],
	EASE_IN_OUT: [0.4, 0, 0.2, 1],
	BOUNCE: [0.68, -0.55, 0.265, 1.55],
} as const;

// Breakpoints (matching Tailwind CSS)
export const BREAKPOINTS = {
	SM: 640,
	MD: 768,
	LG: 1024,
	XL: 1280,
	"2XL": 1536,
} as const;

// Z-index layers
export const Z_INDEX = {
	BACKGROUND: -1,
	BASE: 0,
	CONTENT: 10,
	HEADER: 20,
	OVERLAY: 30,
	MODAL: 40,
	TOOLTIP: 50,
	TOAST: 60,
} as const;

// Spacing scale
export const SPACING = {
	XS: "0.25rem",
	SM: "0.5rem",
	MD: "1rem",
	LG: "1.5rem",
	XL: "2rem",
	"2XL": "3rem",
	"3XL": "4rem",
	"4XL": "6rem",
} as const;

// Typography scale
export const FONT_SIZE = {
	XS: "0.75rem",
	SM: "0.875rem",
	BASE: "1rem",
	LG: "1.125rem",
	XL: "1.25rem",
	"2XL": "1.5rem",
	"3XL": "1.875rem",
	"4XL": "2.25rem",
	"5XL": "3rem",
	"6XL": "3.75rem",
	"7XL": "4.5rem",
} as const;

// Grid and layout
export const GRID_COLUMNS = {
	MOBILE: 1,
	TABLET: 2,
	DESKTOP: 3,
	WIDE: 4,
} as const;

export const MAX_WIDTH = {
	SM: "24rem",
	MD: "28rem",
	LG: "32rem",
	XL: "36rem",
	"2XL": "42rem",
	"3XL": "48rem",
	"4XL": "56rem",
	"5XL": "64rem",
	"6XL": "72rem",
	"7XL": "80rem",
} as const;

// Form validation
export const VALIDATION = {
	EMAIL_REGEX: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
	PHONE_REGEX: /^[+]?[1-9][\d]{0,15}$/,
	URL_REGEX: /^https?:\/\/.+/,
	MIN_NAME_LENGTH: 2,
	MAX_NAME_LENGTH: 50,
	MIN_MESSAGE_LENGTH: 10,
	MAX_MESSAGE_LENGTH: 1000,
} as const;

// API and networking
export const API = {
	TIMEOUT: 10000, // 10 seconds
	RETRY_ATTEMPTS: 3,
	RETRY_DELAY: 1000, // 1 second
	CACHE_DURATION: 300000, // 5 minutes
} as const;

// Local storage keys
export const STORAGE_KEYS = {
	THEME: "portfolio-theme",
	PREFERENCES: "portfolio-preferences",
	FORM_DRAFT: "portfolio-form-draft",
	VISITED_PAGES: "portfolio-visited-pages",
} as const;

// Social media and external links
export const SOCIAL_LINKS = {
	LINKEDIN: "https://linkedin.com/in/saddathasan",
	GITHUB: "https://github.com/saddathasan",
	TWITTER: "https://twitter.com/saddathasan",
	EMAIL: "mailto:saddat.hasan@example.com",
} as const;

// SEO and meta
export const SEO = {
	DEFAULT_TITLE: "Saddat Hasan - Software Engineer",
	TITLE_TEMPLATE: "%s | Saddat Hasan",
	DEFAULT_DESCRIPTION:
		"Building scalable frontend and backend systems with 4+ years of experience. Passionate about performance optimization and clean architecture.",
	DEFAULT_KEYWORDS: [
		"Software Engineer",
		"React",
		"TypeScript",
		"Node.js",
		"Frontend",
		"Backend",
		"Full Stack",
	],
	SITE_URL: "https://saddathasan.vercel.app",
	OG_IMAGE: "/og-image.jpg",
} as const;

// Performance thresholds
export const PERFORMANCE = {
	LAZY_LOAD_THRESHOLD: 0.1,
	DEBOUNCE_DELAY: 300,
	THROTTLE_DELAY: 100,
	IMAGE_QUALITY: 85,
	MAX_IMAGE_SIZE: 1920,
} as const;

// Error messages
export const ERROR_MESSAGES = {
	GENERIC: "Something went wrong. Please try again.",
	NETWORK: "Network error. Please check your connection.",
	VALIDATION: "Please check your input and try again.",
	NOT_FOUND: "The requested resource was not found.",
	UNAUTHORIZED: "You are not authorized to perform this action.",
	SERVER_ERROR: "Server error. Please try again later.",
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
	FORM_SUBMITTED: "Your message has been sent successfully!",
	DATA_SAVED: "Your data has been saved.",
	ACTION_COMPLETED: "Action completed successfully.",
} as const;

// Feature flags (for future use)
export const FEATURES = {
	DARK_MODE: true,
	ANIMATIONS: true,
	ANALYTICS: false,
	A11Y_FEATURES: true,
	DEVELOPMENT_TOOLS: process.env.NODE_ENV === "development",
} as const;

// Component variants
export const VARIANTS = {
	BUTTON: [
		"default",
		"destructive",
		"outline",
		"secondary",
		"ghost",
		"link",
	] as const,
	BADGE: ["default", "secondary", "destructive", "outline"] as const,
	CARD: ["default", "elevated", "outlined"] as const,
	ALERT: ["default", "destructive", "warning", "success"] as const,
} as const;

// Component sizes
export const SIZES = {
	BUTTON: ["default", "sm", "lg", "icon"] as const,
	BADGE: ["default", "sm", "lg"] as const,
	INPUT: ["default", "sm", "lg"] as const,
	SPACING: ["sm", "md", "lg", "xl"] as const,
} as const;

// Accessibility
export const A11Y = {
	FOCUS_VISIBLE_OUTLINE: "2px solid hsl(var(--ring))",
	SKIP_LINK_HEIGHT: "44px",
	MIN_TOUCH_TARGET: "44px",
	COLOR_CONTRAST_RATIO: 4.5,
	ANIMATION_DURATION_REDUCED: 0.1,
} as const;

// Development
export const DEV = {
	LOG_LEVEL: process.env.NODE_ENV === "development" ? "debug" : "error",
	SHOW_GRID: false,
	SHOW_BREAKPOINTS: false,
	ENABLE_DEVTOOLS: process.env.NODE_ENV === "development",
} as const;

// Navigation constants
export const NAVIGATION_LINKS = [
  { to: "/", children: "Home" },
  { to: "/experience", children: "Experience" },
  { to: "/projects", children: "Projects" },
  { to: "/games", children: "Games" },
  { to: "/about", children: "About" },
  { to: "/contact", children: "Contact" },
  {
    href: "/resume.pdf",
    children: "Resume",
    external: true,
  },
  {
    href: "https://linkedin.com/in/saddathasan",
    children: "LinkedIn",
    external: true,
  },
  {
    href: "https://github.com/saddathasan",
    children: "GitHub",
    external: true,
  },
  {
    href: "https://x.com/saddathasan",
    children: "X",
    external: true,
  },
];

export const MOBILE_NAVIGATION_LINKS = [
  { to: "/", children: "Home" },
  { to: "/experience", children: "Experience" },
  { to: "/projects", children: "Projects" },
  { to: "/games", children: "Games" },
  { to: "/about", children: "About" },
  { to: "/contact", children: "Contact" },
  {
    href: "/resume.pdf",
    children: "Resume",
    external: true,
  },
  {
    href: "https://linkedin.com/in/saddathasan",
    children: "LinkedIn",
    external: true,
  },
  {
    href: "https://github.com/saddathasan",
    children: "GitHub",
    external: true,
  },
  {
    href: "https://x.com/saddathasan",
    children: "X (Twitter)",
    external: true,
  },
];

export const BRAND_CONFIG = {
  children: "sh",
};
