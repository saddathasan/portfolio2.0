import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

interface HeroSectionProps {
	className?: string;
	children: React.ReactNode;
}

interface HeroTitleProps {
	children: React.ReactNode;
	className?: string;
}

interface HeroSubtitleProps {
	children: React.ReactNode;
	gradient?: boolean;
	className?: string;
}

interface HeroLocationProps {
	children: React.ReactNode;
	className?: string;
}

interface HeroDescriptionProps {
	children: React.ReactNode;
	className?: string;
	maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
}

interface HeroActionsProps {
	children: React.ReactNode;
	className?: string;
}

interface HeroActionButtonProps {
	href: string;
	children: React.ReactNode;
	variant?: "default" | "outline";
	external?: boolean;
	className?: string;
}

// Root Hero Section component
function HeroSection({ className, children, ...props }: HeroSectionProps) {
	return (
		<motion.section
			className={cn("text-center mb-20", className)}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
			{...props}>
			{children}
		</motion.section>
	);
}

// Hero title component
function HeroTitle({ children, className, ...props }: HeroTitleProps) {
	return (
		<motion.h1
			className={cn("text-5xl md:text-7xl font-bold mb-4", className)}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, delay: 0.1 }}
			{...props}>
			{children}
		</motion.h1>
	);
}

// Hero subtitle component
function HeroSubtitle({
	children,
	gradient = true,
	className,
	...props
}: HeroSubtitleProps) {
	const gradientClasses = gradient
		? "bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
		: "text-primary";

	return (
		<motion.h2
			className={cn(
				"text-2xl md:text-3xl font-semibold mb-4",
				gradientClasses,
				className,
			)}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, delay: 0.2 }}
			{...props}>
			{children}
		</motion.h2>
	);
}

// Hero location component
function HeroLocation({ children, className, ...props }: HeroLocationProps) {
	return (
		<motion.p
			className={cn("text-lg text-muted-foreground mb-2", className)}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, delay: 0.3 }}
			{...props}>
			{children}
		</motion.p>
	);
}

// Hero description component
function HeroDescription({
	children,
	className,
	maxWidth = "3xl",
	...props
}: HeroDescriptionProps) {
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
		<motion.p
			className={cn(
				"text-xl md:text-2xl text-muted-foreground mb-8 mx-auto",
				maxWidthClasses[maxWidth],
				className,
			)}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, delay: 0.4 }}
			{...props}>
			{children}
		</motion.p>
	);
}

// Hero actions container
function HeroActions({ children, className, ...props }: HeroActionsProps) {
	return (
		<motion.div
			className={cn("flex flex-wrap gap-4 justify-center", className)}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, delay: 0.5 }}
			{...props}>
			{children}
		</motion.div>
	);
}

// Hero action button component
function HeroActionButton({
	href,
	children,
	variant = "default",
	external = false,
	className,
	...props
}: HeroActionButtonProps) {
	const buttonClasses = {
		default:
			"bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300",
		outline:
			"border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300",
	};

	if (external) {
		return (
			<Button
				size="lg"
				variant={variant}
				className={cn(buttonClasses[variant], className)}
				asChild
				{...props}>
				<a
					href={href}
					target="_blank"
					rel="noopener noreferrer">
					{children}
				</a>
			</Button>
		);
	}

	return (
		<Button
			size="lg"
			variant={variant}
			className={cn(buttonClasses[variant], className)}
			asChild
			{...props}>
			<Link
				to={
					href as "/contact" | "/experience" | "/projects" | "/about"
				}>
				{children}
			</Link>
		</Button>
	);
}

// Compound component structure
HeroSection.Title = HeroTitle;
HeroSection.Subtitle = HeroSubtitle;
HeroSection.Location = HeroLocation;
HeroSection.Description = HeroDescription;
HeroSection.Actions = HeroActions;
HeroSection.ActionButton = HeroActionButton;

export { HeroSection };
