import { cn } from "@/lib/utils";

interface SectionProps {
	className?: string;
	children: React.ReactNode;
	animate?: boolean;
	delay?: number;
}

interface SectionHeaderProps {
	className?: string;
	children: React.ReactNode;
	centered?: boolean;
	size?: "sm" | "md" | "lg" | "xl";
	gradient?: boolean;
}

interface SectionContentProps {
	className?: string;
	children: React.ReactNode;
	grid?: boolean;
	columns?: 1 | 2 | 3 | 4;
	gap?: "sm" | "md" | "lg" | "xl";
	maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "full";
}

// Root Section Component - minimal styling
function Section({
	className,
	children,
	...props
}: Omit<SectionProps, 'animate' | 'delay'>) {
	return (
		<section
			className={cn(
				"py-16 px-4 max-w-4xl mx-auto",
				className
			)}
			{...props}>
			{children}
		</section>
	);
}

// Section Header - minimal styling
function SectionHeader({
	className,
	children,
	centered = false,
	size = "lg",
	...props
}: Omit<SectionHeaderProps, 'gradient'>) {
	const sizeClasses = {
		sm: "text-2xl md:text-3xl",
		md: "text-3xl md:text-4xl",
		lg: "text-4xl md:text-5xl",
		xl: "text-5xl md:text-6xl",
	};

	return (
		<h2
			className={cn(
				"font-bold mb-8 leading-tight font-sans text-foreground",
				sizeClasses[size],
				centered && "text-center",
				className
			)}
			{...props}>
			{children}
		</h2>
	);
}

// Section Content - minimal styling
function SectionContent({
	className,
	children,
	grid = false,
	columns = 2,
	gap = "md",
	maxWidth = "4xl",
	...props
}: SectionContentProps) {
	const gapClasses = {
		sm: "gap-4",
		md: "gap-6",
		lg: "gap-8",
		xl: "gap-12",
	};

	const maxWidthClasses = {
		sm: "max-w-sm",
		md: "max-w-md",
		lg: "max-w-lg",
		xl: "max-w-xl",
		"2xl": "max-w-2xl",
		"3xl": "max-w-3xl",
		"4xl": "max-w-4xl",
		full: "max-w-full",
	};

	const gridClasses = grid
		? `grid grid-cols-1 md:grid-cols-${columns} ${gapClasses[gap]}`
		: "";

	return (
		<div
			className={cn(
				"mx-auto",
				maxWidthClasses[maxWidth],
				gridClasses,
				className
			)}
			{...props}>
			{children}
		</div>
	);
}

// Compound exports
Section.Header = SectionHeader;
Section.Content = SectionContent;

export { Section };
