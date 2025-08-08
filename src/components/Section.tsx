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
				className={cn(
					"relative mb-24 px-4 py-12 overflow-hidden",
					"before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/3 before:via-transparent before:to-accent/3",
					"before:rounded-2xl before:blur-3xl before:-z-10",
					className
				)}
				initial={{ opacity: 0, y: 40, scale: 0.95 }}
				whileInView={{ opacity: 1, y: 0, scale: 1 }}
				transition={{ 
					duration: 0.8, 
					delay,
					ease: [0.25, 0.46, 0.45, 0.94]
				}}
				viewport={{ once: true, margin: "-100px" }}
				{...props}>
				{/* Decorative elements */}
				<div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full blur-2xl" />
				<div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-primary/10 to-vibrant-blue/10 rounded-full blur-xl" />
				
				<div className="relative z-10">
					{children}
				</div>
			</motion.section>
		);
	}

	return (
		<section
			className={cn(
				"relative mb-24 px-4 py-12 overflow-hidden",
				"before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/3 before:via-transparent before:to-accent/3",
				"before:rounded-2xl before:blur-3xl before:-z-10",
				className
			)}
			{...props}>
			{/* Decorative elements */}
			<div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full blur-2xl" />
			<div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-primary/10 to-vibrant-blue/10 rounded-full blur-xl" />
			
			<div className="relative z-10">
				{children}
			</div>
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
		sm: "text-xl md:text-2xl",
		md: "text-2xl md:text-3xl",
		lg: "text-3xl md:text-4xl lg:text-5xl",
		xl: "text-4xl md:text-5xl lg:text-6xl",
	};

	const baseClasses = cn(
		"relative font-black mb-16 leading-tight tracking-tight",
		sizeClasses[size],
		centered && "text-center",
		gradient &&
			"bg-gradient-to-r from-primary via-accent to-vibrant-blue bg-clip-text text-transparent",
	);

	return (
		<motion.h2
			className={cn(baseClasses, className)}
			initial={{ opacity: 0, y: 20, rotateX: -10 }}
			whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
			transition={{ 
				duration: 0.7,
				ease: "easeOut"
			}}
			viewport={{ once: true }}
			{...props}>
			{children}
			{/* Animated underline */}
			{gradient && (
				<motion.div
					className={cn(
						"absolute -bottom-4 h-1 bg-gradient-to-r from-primary via-accent to-vibrant-blue rounded-full",
						centered ? "left-1/2 -translate-x-1/2" : "left-0"
					)}
					initial={{ width: 0 }}
					whileInView={{ width: centered ? "60%" : "100%" }}
					transition={{ duration: 0.8, delay: 0.3 }}
					viewport={{ once: true }}
				/>
			)}
		</motion.h2>
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
