import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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

// Root Hero Section component - Lee Robinson ultra-minimal styling
function HeroSection({ className, children, ...props }: HeroSectionProps) {
	return (
		<section
			className={cn(
				"py-16 px-6 text-left max-w-4xl mx-auto",
				className,
			)}
			{...props}>
			{children}
		</section>
	);
}

// Hero title component - Lee Robinson ultra-minimal styling
function HeroTitle({ children, className, ...props }: HeroTitleProps) {
	return (
		<h1
			className={cn(
				"text-3xl md:text-4xl font-medium mb-4 text-foreground",
				className,
			)}
			{...props}>
			{children}
		</h1>
	);
}

// Hero subtitle component - Lee Robinson ultra-minimal styling
function HeroSubtitle({
	children,
	className,
	...props
}: Omit<HeroSubtitleProps, 'gradient'>) {
	return (
		<p
			className={cn(
				"text-base text-muted-foreground mb-6",
				className,
			)}
			{...props}>
			{children}
		</p>
	);
}

// Hero location component - minimal styling
function HeroLocation({ children, className, ...props }: HeroLocationProps) {
	return (
		<p
			className={cn("text-sm text-muted-foreground mb-2", className)}
			{...props}>
			{children}
		</p>
	);
}

// Hero description component - minimal styling
function HeroDescription({
	children,
	className,
	maxWidth = "2xl",
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
		<p
			className={cn(
				"text-muted-foreground mb-8 leading-relaxed",
				maxWidthClasses[maxWidth],
				className,
			)}
			{...props}>
			{children}
		</p>
	);
}

// Hero actions component - minimal styling
function HeroActions({ children, className, ...props }: HeroActionsProps) {
	return (
		<div
			className={cn("flex flex-col sm:flex-row gap-4", className)}
			{...props}>
			{children}
		</div>
	);
}

// Hero action button - minimal styling
function HeroActionButton({
	href,
	children,
	variant = "default",
	external = false,
	className,
	...props
}: HeroActionButtonProps) {
	return (
		<Button
			asChild
			variant={variant}
			size="default"
			className={cn("", className)}
			{...props}>
			<a
				href={href}
				target={external ? "_blank" : undefined}
				rel={external ? "noopener noreferrer" : undefined}>
				{children}
			</a>
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
