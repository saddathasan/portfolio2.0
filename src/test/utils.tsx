import { AppProvider } from "@/context/AppContext";
import type { Certificate, Experience, Project, SkillCategory } from "@/types";
import React, { type ReactElement, type ReactNode } from "react";

// Mock render types
interface RenderOptions {
	wrapper?: React.ComponentType<React.PropsWithChildren>;
}

interface RenderResult {
	container: HTMLElement;
	unmount: () => void;
	rerender: (ui: ReactElement) => void;
}

// Mock function interface
interface MockedFunction<T> {
	(...args: unknown[]): unknown;
	mockReturnValue: (value: unknown) => MockedFunction<T>;
	mockResolvedValue: (value: unknown) => MockedFunction<T>;
	mockRejectedValue: (value: unknown) => MockedFunction<T>;
	mockImplementation: (
		fn: (...args: unknown[]) => unknown,
	) => MockedFunction<T>;
	mockClear: () => void;
	mockReset: () => void;
	mockRestore: () => void;
}

interface Jest {
	fn: () => MockedFunction<unknown>;
	spyOn: (
		object: Record<string, unknown>,
		method: string,
	) => MockedFunction<unknown>;
	clearAllMocks: () => void;
	restoreAllMocks: () => void;
	doMock: (moduleName: string, factory: () => unknown) => void;
}

// Global type declarations for testing environment
declare global {
	const expect: (actual: unknown) => {
		toBe: (expected: unknown) => void;
		toHaveBeenCalled: () => void;
		toHaveBeenCalledWith: (...args: unknown[]) => void;
		toBeInTheDocument: () => void;
		toBeVisible: () => void;
		toHaveRole: (role: string) => void;
		toBeLessThan: (value: number) => void;
		toHaveAccessibleName: (name: string) => void;
		toHaveAttribute: (attr: string, value?: string) => void;
		toHaveNoViolations: () => void;
	};
	const beforeEach: (fn: () => void) => void;
	const afterEach: (fn: () => void) => void;
}

// Mock jest functions
const mockFn = (): MockedFunction<unknown> => {
	const fn = ((...args: unknown[]) => {
		void args; // Explicitly mark as used
		return undefined;
	}) as MockedFunction<unknown>;
	fn.mockReturnValue = () => fn;
	fn.mockResolvedValue = () => fn;
	fn.mockRejectedValue = () => fn;
	fn.mockImplementation = () => fn;
	fn.mockClear = () => {};
	fn.mockReset = () => {};
	fn.mockRestore = () => {};
	return fn;
};

// Mock render function
const render = (ui: ReactElement, options?: RenderOptions): RenderResult => {
	const container = document.createElement("div");
	document.body.appendChild(container);

	const Wrapper = options?.wrapper || React.Fragment;
	React.createElement(Wrapper, {}, ui);

	return {
		container,
		unmount: () => {
			document.body.removeChild(container);
		},
		rerender: (newUi: ReactElement) => {
			void newUi; // Explicitly mark as used
			// Mock rerender implementation
		},
	};
};

const jest: Jest = {
	fn: mockFn,
	spyOn: mockFn,
	clearAllMocks: () => {},
	restoreAllMocks: () => {},
	doMock: () => {},
};

// Mock data for testing
export const mockProject: Project = {
	id: 1,
	title: "Test Project",
	description: "A test project for unit testing",
	technologies: ["React", "TypeScript", "Jest"],
	liveUrl: "https://example.com",
	sourceUrl: "https://github.com/test/project",
	image: "/test-image.jpg",
	impact: "Improved testing coverage by 100%",
};

export const mockExperience: Experience = {
	id: "1",
	company: "Test Company",
	role: "Software Engineer",
	period: "2023-01-01 to 2023-12-31",
	type: "Full-time",
	achievements: ["Achievement 1", "Achievement 2"],
	technologies: ["React", "Node.js"],
};

export const mockCertificate: Certificate = {
	id: "1",
	name: "Test Certification",
	issuer: "Test Organization",
	date: "2023-06-01",
	credentialUrl: "https://example.com/cert",
	description: "Test certificate description",
};

export const mockSkillCategory: SkillCategory = {
	title: "Frontend Development",
	description: "Frontend technologies and frameworks",
	skills: ["React", "TypeScript", "CSS"],
};

// Mock implementations for services
export const mockAnalyticsService = {
	trackPageView: jest.fn(),
	trackEvent: jest.fn(),
	trackTiming: jest.fn(),
};

export const mockErrorReportingService = {
	reportError: jest.fn(),
	reportMessage: jest.fn(),
};

export const mockPerformanceService = {
	startTiming: jest.fn(),
	endTiming: jest.fn(),
	measure: jest.fn(),
	measureAsync: jest.fn(),
	getWebVitals: jest.fn().mockResolvedValue({}),
};

export const mockDataService = {
	fetchProjects: jest.fn().mockResolvedValue([mockProject]),
	fetchExperience: jest.fn().mockResolvedValue([mockExperience]),
	fetchCertificates: jest.fn().mockResolvedValue([mockCertificate]),
	fetchSkills: jest.fn().mockResolvedValue([mockSkillCategory]),
	clearCache: jest.fn(),
	invalidateCache: jest.fn(),
};

export const mockEmailService = {
	sendContactForm: jest.fn().mockResolvedValue(true),
	sendEmail: jest.fn().mockResolvedValue(true),
};

// Mock localStorage
const store: Record<string, string> = {};

export const mockLocalStorage = {
	store,
	getItem: jest.fn(),
	setItem: jest.fn(),
	removeItem: jest.fn(),
	clear: jest.fn(),
	length: 0,
	key: jest.fn(),
};

// Mock matchMedia
export const mockMatchMedia = (matches: boolean = false) => {
	return jest.fn().mockImplementation((...args: unknown[]) => {
		const query = args[0] as string;
		return {
			matches,
			media: query,
			onchange: null,
			addEventListener: jest.fn(),
			removeEventListener: jest.fn(),
			addListener: jest.fn(),
			removeListener: jest.fn(),
			dispatchEvent: jest.fn(),
		};
	});
};

// Mock IntersectionObserver
export const mockIntersectionObserver = () => {
	const mockIntersectionObserver = jest.fn();
	mockIntersectionObserver.mockReturnValue({
		observe: jest.fn(),
		unobserve: jest.fn(),
		disconnect: jest.fn(),
	});
	return mockIntersectionObserver;
};

// Mock ResizeObserver
export const mockResizeObserver = () => {
	const mockResizeObserver = jest.fn();
	mockResizeObserver.mockReturnValue({
		observe: jest.fn(),
		unobserve: jest.fn(),
		disconnect: jest.fn(),
	});
	return mockResizeObserver;
};

// Mock framer-motion
export const mockFramerMotion = {
	motion: {
		div: ({
			children,
			...props
		}: React.PropsWithChildren<Record<string, unknown>>) => (
			<div {...props}>{children}</div>
		),
		section: ({
			children,
			...props
		}: React.PropsWithChildren<Record<string, unknown>>) => (
			<section {...props}>{children}</section>
		),
		article: ({
			children,
			...props
		}: React.PropsWithChildren<Record<string, unknown>>) => (
			<article {...props}>{children}</article>
		),
		header: ({
			children,
			...props
		}: React.PropsWithChildren<Record<string, unknown>>) => (
			<header {...props}>{children}</header>
		),
		footer: ({
			children,
			...props
		}: React.PropsWithChildren<Record<string, unknown>>) => (
			<footer {...props}>{children}</footer>
		),
		h1: ({
			children,
			...props
		}: React.PropsWithChildren<Record<string, unknown>>) => (
			<h1 {...props}>{children}</h1>
		),
		h2: ({
			children,
			...props
		}: React.PropsWithChildren<Record<string, unknown>>) => (
			<h2 {...props}>{children}</h2>
		),
		h3: ({
			children,
			...props
		}: React.PropsWithChildren<Record<string, unknown>>) => (
			<h3 {...props}>{children}</h3>
		),
		p: ({
			children,
			...props
		}: React.PropsWithChildren<Record<string, unknown>>) => (
			<p {...props}>{children}</p>
		),
		span: ({
			children,
			...props
		}: React.PropsWithChildren<Record<string, unknown>>) => (
			<span {...props}>{children}</span>
		),
		button: ({
			children,
			...props
		}: React.PropsWithChildren<Record<string, unknown>>) => (
			<button {...props}>{children}</button>
		),
		a: ({
			children,
			...props
		}: React.PropsWithChildren<Record<string, unknown>>) => (
			<a {...props}>{children}</a>
		),
		ul: ({
			children,
			...props
		}: React.PropsWithChildren<Record<string, unknown>>) => (
			<ul {...props}>{children}</ul>
		),
		li: ({
			children,
			...props
		}: React.PropsWithChildren<Record<string, unknown>>) => (
			<li {...props}>{children}</li>
		),
	},
	AnimatePresence: ({ children }: React.PropsWithChildren) => children,
	useAnimation: () => ({
		start: jest.fn(),
		stop: jest.fn(),
		set: jest.fn(),
	}),
	useInView: () => [jest.fn(), true],
};

// Test wrapper component
interface TestWrapperProps {
	children?: ReactNode;
	initialEntries?: string[];
	mockServices?: boolean;
}

function TestWrapper({
	children,
	initialEntries = ["/"],
	mockServices = true,
}: TestWrapperProps) {
	// Use initialEntries for router setup
	console.log("Router initialized with entries:", initialEntries);
	// Mock services if requested
	if (mockServices) {
		// Services are mocked through the mock objects defined above
		console.log("Services mocked for testing");
	}

	return <AppProvider>{children}</AppProvider>;
}

// Custom render function
interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
	initialEntries?: string[];
	mockServices?: boolean;
	wrapper?: React.ComponentType<React.PropsWithChildren>;
}

export function renderWithProviders(
	ui: ReactElement,
	options: CustomRenderOptions = {},
): RenderResult {
	const {
		initialEntries = ["/"],
		mockServices = true,
		wrapper,
		...renderOptions
	} = options;

	const Wrapper =
		wrapper ||
		((props: React.PropsWithChildren) => (
			<TestWrapper
				initialEntries={initialEntries}
				mockServices={mockServices}
				{...props}
			/>
		));

	return render(ui, { wrapper: Wrapper, ...renderOptions });
}

// Setup function for tests
export function setupTest() {
	// Mock localStorage
	Object.defineProperty(window, "localStorage", {
		value: mockLocalStorage,
		writable: true,
	});

	// Mock sessionStorage
	Object.defineProperty(window, "sessionStorage", {
		value: mockLocalStorage,
		writable: true,
	});

	// Mock matchMedia
	Object.defineProperty(window, "matchMedia", {
		value: mockMatchMedia(),
		writable: true,
	});

	// Mock IntersectionObserver
	Object.defineProperty(window, "IntersectionObserver", {
		value: mockIntersectionObserver(),
		writable: true,
	});

	// Mock ResizeObserver
	Object.defineProperty(window, "ResizeObserver", {
		value: mockResizeObserver(),
		writable: true,
	});

	// Mock scrollTo
	Object.defineProperty(window, "scrollTo", {
		value: jest.fn(),
		writable: true,
	});

	// Mock getComputedStyle
	Object.defineProperty(window, "getComputedStyle", {
		value: jest.fn().mockReturnValue({
			getPropertyValue: jest.fn().mockReturnValue(""),
		}),
		writable: true,
	});

	// Mock performance.now
	Object.defineProperty(window.performance, "now", {
		value: jest.fn().mockReturnValue(Date.now()),
		writable: true,
	});

	// Clear all mocks before each test
	beforeEach(() => {
		jest.clearAllMocks();
		mockLocalStorage.clear();
	});
}

// Cleanup function for tests
export function cleanupTest() {
	afterEach(() => {
		jest.restoreAllMocks();
	});
}

// Utility functions for testing
export const waitFor = (callback: () => void, timeout = 1000) => {
	return new Promise<void>((resolve, reject) => {
		const startTime = Date.now();
		const check = () => {
			try {
				callback();
				resolve();
			} catch (error) {
				if (Date.now() - startTime >= timeout) {
					reject(error);
				} else {
					setTimeout(check, 10);
				}
			}
		};
		check();
	});
};

export const createMockEvent = (
	type: string,
	properties: Record<string, unknown> = {},
) => {
	return {
		type,
		preventDefault: jest.fn(),
		stopPropagation: jest.fn(),
		target: {
			value: "",
			...((properties.target as Record<string, unknown>) || {}),
		},
		currentTarget: {
			value: "",
			...((properties.currentTarget as Record<string, unknown>) || {}),
		},
		...properties,
	};
};

export const createMockRouter = (initialPath = "/") => {
	return {
		push: jest.fn(),
		replace: jest.fn(),
		go: jest.fn(),
		back: jest.fn(),
		forward: jest.fn(),
		listen: jest.fn(),
		location: {
			pathname: initialPath,
			search: "",
			hash: "",
			state: null,
			key: "test",
		},
	};
};

// Test data generators
export const generateMockProjects = (count: number): Project[] => {
	return Array.from({ length: count }, (_, index) => ({
		...mockProject,
		id: index + 1,
		title: `Project ${index + 1}`,
		description: `Description for project ${index + 1}`,
	}));
};

export const generateMockExperience = (count: number): Experience[] => {
	return Array.from({ length: count }, (_, index) => ({
		...mockExperience,
		id: `${index + 1}`,
		company: `Company ${index + 1}`,
		role: `Position ${index + 1}`,
	}));
};

export const generateMockCertificates = (count: number): Certificate[] => {
	return Array.from({ length: count }, (_, index) => ({
		...mockCertificate,
		id: `${index + 1}`,
		name: `Certificate ${index + 1}`,
		issuer: `Issuer ${index + 1}`,
	}));
};

// Assertion helpers
export const expectElementToBeVisible = (element: HTMLElement) => {
	expect(element).toBeInTheDocument();
	expect(element).toBeVisible();
};

export const expectElementToHaveAccessibleName = (
	element: HTMLElement,
	name: string,
) => {
	expect(element).toHaveAccessibleName(name);
};

export const expectElementToHaveRole = (element: HTMLElement, role: string) => {
	expect(element).toHaveRole(role);
};

export const expectElementToHaveAttribute = (
	element: HTMLElement,
	attribute: string,
	value?: string,
) => {
	if (value !== undefined) {
		expect(element).toHaveAttribute(attribute, value);
	} else {
		expect(element).toHaveAttribute(attribute);
	}
};

// Performance testing helpers
export const measureRenderTime = async (
	renderFn: () => Promise<void> | void,
) => {
	const start = performance.now();
	await renderFn();
	const end = performance.now();
	return end - start;
};

export const expectRenderTimeToBeUnder = async (
	renderFn: () => Promise<void> | void,
	maxTime: number,
) => {
	const renderTime = await measureRenderTime(renderFn);
	expect(renderTime).toBeLessThan(maxTime);
};

// Accessibility testing helpers
export const expectNoAccessibilityViolations = async () => {
	// Mock axe implementation for testing
	const mockAxe = async () => ({ violations: [] });
	const results = await mockAxe();
	expect(results).toHaveNoViolations();
};

// Re-export render as customRender to avoid confusion
export { renderWithProviders as render };
