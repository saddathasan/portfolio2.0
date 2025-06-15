import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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

// Root Section Component
function Section({
	className,
	children,
	animate = true,
	delay = 0,
	...props
}: SectionProps) {
	if (animate) {
		return (
			<motion.section
				className={cn("mb-20", className)}
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay }}
				viewport={{ once: true }}
				{...props}>
				{children}
			</motion.section>
		);
	}

	return (
		<section
			className={cn("mb-20", className)}
			{...props}>
			{children}
		</section>
	);
}

// Section Header
function SectionHeader({
	className,
	children,
	centered = true,
	size = "lg",
	gradient = true,
	...props
}: SectionHeaderProps) {
	const sizeClasses = {
		sm: "text-lg md:text-xl",
		md: "text-xl md:text-2xl",
		lg: "text-2xl md:text-3xl",
		xl: "text-3xl md:text-4xl",
	};

	const baseClasses = cn(
		"font-bold mb-12",
		sizeClasses[size],
		centered && "text-center",
		gradient &&
			"bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent",
	);

	return (
		<h2
			className={cn(baseClasses, className)}
			{...props}>
			{children}
		</h2>
	);
}

// Section Content
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
		? {
				1: "grid-cols-1",
				2: "grid md:grid-cols-2",
				3: "grid md:grid-cols-2 lg:grid-cols-3",
				4: "grid md:grid-cols-2 lg:grid-cols-4",
			}
		: {};

	const baseClasses = cn(
		maxWidthClasses[maxWidth],
		"mx-auto",
		grid && "grid",
		grid && gridClasses[columns],
		gapClasses[gap],
	);

	return (
		<div
			className={cn(baseClasses, className)}
			{...props}>
			{children}
		</div>
	);
}

// Compound exports
Section.Header = SectionHeader;
Section.Content = SectionContent;

export { Section };
