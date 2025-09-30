import { cn } from "@/lib/utils";

interface PageLayoutProps {
	className?: string;
	children: React.ReactNode;
	animate?: boolean;
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
	/** Optional semantic content width override (reading: ~68ch, wide: 6xl). */
	contentWidth?: 'default' | 'reading' | 'wide';
}

interface PageLayoutContainerProps {
	className?: string;
	children: React.ReactNode;
	spacing?: "sm" | "md" | "lg" | "xl";
}

interface PageLayoutMainProps {
	className?: string;
	children: React.ReactNode;
	animate?: boolean;
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
	contentWidth?: 'default' | 'reading' | 'wide';
}

// Root PageLayout Component
function PageLayout({
	className,
	children,
	animate = true,
	maxWidth = "4xl",
	centered = true,
	contentWidth = 'default',
	...props
}: PageLayoutProps) {
	const maxWidthClasses = {
		sm: "max-w-sm",
		md: "max-w-md",
		lg: "max-w-lg",
		xl: "max-w-xl",
		"2xl": "max-w-2xl",
		"3xl": "max-w-3xl",
		"4xl": "max-w-4xl",
		"5xl": "max-w-5xl",
		"6xl": "max-w-6xl",
		"7xl": "max-w-7xl",
		full: "max-w-full",
	};

	const semanticWidth =
		contentWidth === 'reading'
			? 'max-w-[68ch]'
			: contentWidth === 'wide'
				? 'max-w-6xl'
				: maxWidthClasses[maxWidth];

	const containerClasses = cn(
		semanticWidth,
		centered && "mx-auto",
		className,
	);

	if (animate) {
		return (
			<div
				className={containerClasses}
				{...props}>
				{children}
			</div>
		);
	}

	return (
		<div
			className={containerClasses}
			{...props}>
			{children}
		</div>
	);
}

// PageLayout Container (for consistent spacing)
function PageLayoutContainer({
	className,
	children,
	spacing = "lg",
	...props
}: PageLayoutContainerProps) {
	const spacingClasses = {
		sm: "py-8",
		md: "py-12",
		lg: "py-16",
		xl: "py-20",
	};

	return (
		<div
			className={cn(
				"container mx-auto px-4",
				spacingClasses[spacing],
				className,
			)}
			{...props}>
			{children}
		</div>
	);
}

// PageLayout Main (animated content wrapper)
function PageLayoutMain({
	className,
	children,
	animate = true,
	maxWidth = "4xl",
	centered = true,
	contentWidth = 'default',
	...props
}: PageLayoutMainProps) {
	const maxWidthClasses = {
		sm: "max-w-sm",
		md: "max-w-md",
		lg: "max-w-lg",
		xl: "max-w-xl",
		"2xl": "max-w-2xl",
		"3xl": "max-w-3xl",
		"4xl": "max-w-4xl",
		"5xl": "max-w-5xl",
		"6xl": "max-w-6xl",
		"7xl": "max-w-7xl",
		full: "max-w-full",
	};

	const semanticWidth =
		contentWidth === 'reading'
			? 'max-w-[68ch]'
			: contentWidth === 'wide'
				? 'max-w-6xl'
				: maxWidthClasses[maxWidth];

	const containerClasses = cn(
		semanticWidth,
		centered && "mx-auto",
		className,
	);

	if (animate) {
		return (
			<div
				className={containerClasses}
				{...props}>
				{children}
			</div>
		);
	}

	return (
		<div
			className={containerClasses}
			{...props}>
			{children}
		</div>
	);
}

// Compound exports
PageLayout.Container = PageLayoutContainer;
PageLayout.Main = PageLayoutMain;

export { PageLayout };
