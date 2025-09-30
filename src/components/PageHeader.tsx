import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface PageHeaderProps {
	className?: string;
	children: React.ReactNode;
}

interface PageHeaderTitleProps {
	className?: string;
	children: React.ReactNode;
	gradient?: boolean;
}

interface PageHeaderDescriptionProps {
	className?: string;
	children: React.ReactNode;
	maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
}

// Root compound component
function PageHeader({ className, children, ...props }: PageHeaderProps) {
	return (
		<motion.div
			className={cn("text-center mb-12", className)}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
			{...props}>
			{children}
		</motion.div>
	);
}

// Title subcomponent
function PageHeaderTitle({
	className,
	children,
	gradient = true,
	...props
}: PageHeaderTitleProps) {
	const baseClasses = "text-3xl md:text-4xl font-bold mb-4 font-sans";
	const gradientClasses = gradient
		? "text-primary"
		: "";

	return (
		<h1
			className={cn(baseClasses, gradientClasses, className)}
			{...props}>
			{children}
		</h1>
	);
}

// Description subcomponent
function PageHeaderDescription({
	className,
	children,
	maxWidth = "2xl",
	...props
}: PageHeaderDescriptionProps) {
	const maxWidthClasses = {
		sm: "max-w-sm",
		md: "max-w-md",
		lg: "max-w-lg",
		xl: "max-w-xl",
		"2xl": "max-w-2xl",
		"3xl": "max-w-3xl",
		"4xl": "max-w-4xl",
	};

	return (
		<p
			className={cn(
				"text-lg md:text-xl text-muted-foreground mx-auto",
				maxWidthClasses[maxWidth],
				className,
			)}
			{...props}>
			{children}
		</p>
	);
}

// Compound component structure
PageHeader.Title = PageHeaderTitle;
PageHeader.Description = PageHeaderDescription;

export { PageHeader };
