// Shared type definitions for the portfolio application

export interface Project {
	id: number;
	title: string;
	description: string;
	technologies: string[];
	liveUrl: string | null;
	sourceUrl: string | null;
	image: string;
	impact: string;
}

export interface Experience {
	id: string;
	company: string;
	role: string;
	period: string;
	type: string;
	achievements: string[];
	technologies: string[];
	subExperiences?: {
		company: string;
		period: string;
		achievements: string[];
		technologies: string[];
	}[];
}

export interface HeroInfo {
	name: string;
	title: string;
	location: string;
	description: string;
	resumeUrl: string;
	linkedinUrl: string;
}

export interface Stat {
	value: string;
	label: string;
}

export interface Skill {
	name: string;
	level: string;
	yearsOfExperience: number;
}

export interface SkillCategory {
	id?: string;
	name?: string;
	title: string;
	description: string;
	skills: string[] | Skill[];
}

export interface Certificate {
	id: string;
	name: string;
	issuer: string;
	date: string;
	credentialUrl?: string;
	description?: string;
}

export interface ContactInfo {
	email: string;
	phone?: string;
	location: string;
	linkedin: string;
	github: string;
	responseTime: string;
}

// Component prop types
export interface BaseComponentProps {
	className?: string;
	children?: React.ReactNode;
}

export interface AnimationProps {
	animate?: boolean;
	delay?: number;
	duration?: number;
}

export interface ResponsiveProps {
	maxWidth?:
		| "sm"
		| "md"
		| "lg"
		| "xl"
		| "2xl"
		| "3xl"
		| "4xl"
		| "5xl"
		| "6xl"
		| "7xl"
		| "full";
	centered?: boolean;
}

export interface SpacingProps {
	spacing?: "sm" | "md" | "lg" | "xl";
	gap?: "sm" | "md" | "lg" | "xl";
}

export interface VariantProps {
	variant?: "default" | "primary" | "secondary" | "outline" | "ghost";
	size?: "sm" | "md" | "lg" | "xl";
}

// Navigation types
export interface NavigationLink {
	to: string;
	children: string;
	external?: boolean;
}

export interface NavigationAction {
	href: string;
	children: string;
	external?: boolean;
	variant?: "default" | "outline";
}

export interface BrandProps {
	children: string;
	href?: string;
}

// Form types
export interface FormFieldProps {
	label: string;
	id: string;
	type?: "text" | "email" | "tel" | "url";
	placeholder: string;
	required?: boolean;
	value?: string;
	onChange?: (value: string) => void;
	error?: string;
}

export interface FormState {
	isSubmitting: boolean;
	isSuccess: boolean;
	error: string | null;
}

// Theme types
export type ThemeMode = "light" | "dark" | "system";

export interface ThemeContextType {
	mode: ThemeMode;
	setMode: (mode: ThemeMode) => void;
	toggle: () => void;
}

// Error types
export interface ErrorInfo {
	message: string;
	stack?: string;
	componentStack?: string;
}

export interface ErrorBoundaryState {
	hasError: boolean;
	error: Error | null;
	errorInfo: ErrorInfo | null;
}

// API types (for future use)
export interface ApiResponse<T> {
	data: T;
	success: boolean;
	message?: string;
	error?: string;
}

export interface PaginationParams {
	page: number;
	limit: number;
	total?: number;
}

export interface SearchParams {
	query: string;
	filters?: Record<string, string>;
	sort?: string;
	order?: "asc" | "desc";
}
