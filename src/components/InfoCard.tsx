import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface InfoCardProps {
	className?: string;
	children: React.ReactNode;
	animate?: boolean;
	delay?: number;
	hover?: boolean;
	variant?:
		| "default"
		| "primary"
		| "accent"
		| "secondary"
		| "vibrant-orange"
		| "vibrant-blue"
		| "vibrant-teal";
}

interface InfoCardHeaderProps {
	className?: string;
	children: React.ReactNode;
}

interface InfoCardTitleProps {
	className?: string;
	children: React.ReactNode;
	badge?: string;
	badgeVariant?: "default" | "secondary" | "destructive" | "outline";
}

interface InfoCardDescriptionProps {
	className?: string;
	children: React.ReactNode;
}

interface InfoCardContentProps {
	className?: string;
	children: React.ReactNode;
}

interface InfoCardActionsProps {
	className?: string;
	children: React.ReactNode;
}

interface InfoCardActionProps {
	className?: string;
	children: React.ReactNode;
	href?: string;
	variant?:
		| "default"
		| "outline"
		| "ghost"
		| "link"
		| "destructive"
		| "secondary";
	size?: "default" | "sm" | "lg" | "icon";
	external?: boolean;
	fullWidth?: boolean;
}

// Root InfoCard Component
function InfoCard({
	className,
	children,
	animate = true,
	delay = 0,
	hover = true,
	variant = "default",
	...props
}: InfoCardProps) {
	const variantClasses = {
		default: "",
		primary:
			"border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 shadow-primary/10",
		accent: "border-accent/20 bg-gradient-to-br from-accent/5 to-accent/10 shadow-accent/10",
		secondary:
			"border-secondary/30 bg-gradient-to-br from-secondary/10 to-secondary/20 shadow-secondary/15",
		"vibrant-orange":
			"border-vibrant-orange/30 bg-gradient-to-br from-orange-50/80 to-orange-100/60 dark:from-orange-950/30 dark:to-orange-900/20 shadow-lg shadow-orange-200/30 dark:shadow-orange-900/20",
		"vibrant-blue":
			"border-vibrant-blue/30 bg-gradient-to-br from-blue-50/80 to-blue-100/60 dark:from-blue-950/30 dark:to-blue-900/20 shadow-lg shadow-blue-200/30 dark:shadow-blue-900/20",
		"vibrant-teal":
			"border-vibrant-teal/30 bg-gradient-to-br from-teal-50/80 to-teal-100/60 dark:from-teal-950/30 dark:to-teal-900/20 shadow-lg shadow-teal-200/30 dark:shadow-teal-900/20",
	};

	const cardClasses = cn(
		variantClasses[variant],
		hover &&
			"hover:shadow-xl hover:shadow-current/25 hover:-translate-y-1 transition-all duration-300 hover:border-current/40",
		className,
	);

	if (animate) {
		return (
			<motion.div
				initial={{ opacity: 0, y: 20, scale: 0.95 }}
				whileInView={{ opacity: 1, y: 0, scale: 1 }}
				transition={{
					duration: 0.5,
					delay,
					type: "spring",
					stiffness: 100,
					damping: 15,
				}}
				viewport={{ once: true }}
				whileHover={hover ? { y: -4, scale: 1.02 } : undefined}
				{...props}>
				<Card className={cardClasses}>{children}</Card>
			</motion.div>
		);
	}

	return (
		<Card
			className={cardClasses}
			{...props}>
			{children}
		</Card>
	);
}

// InfoCard Header
function InfoCardHeader({
	className,
	children,
	...props
}: InfoCardHeaderProps) {
	return (
		<CardHeader
			className={className}
			{...props}>
			{children}
		</CardHeader>
	);
}

// InfoCard Title with optional badge
function InfoCardTitle({
	className,
	children,
	badge,
	badgeVariant = "secondary",
	...props
}: InfoCardTitleProps) {
	if (badge) {
		return (
			<CardTitle
				className={cn("flex items-center justify-between", className)}
				{...props}>
				<span>{children}</span>
				<Badge variant={badgeVariant}>{badge}</Badge>
			</CardTitle>
		);
	}

	return (
		<CardTitle
			className={className}
			{...props}>
			{children}
		</CardTitle>
	);
}

// InfoCard Description
function InfoCardDescription({
	className,
	children,
	...props
}: InfoCardDescriptionProps) {
	return (
		<CardDescription
			className={className}
			{...props}>
			{children}
		</CardDescription>
	);
}

// InfoCard Content
function InfoCardContent({
	className,
	children,
	...props
}: InfoCardContentProps) {
	return (
		<CardContent
			className={className}
			{...props}>
			{children}
		</CardContent>
	);
}

// InfoCard Actions
function InfoCardActions({
	className,
	children,
	...props
}: InfoCardActionsProps) {
	return (
		<div
			className={cn("flex gap-2", className)}
			{...props}>
			{children}
		</div>
	);
}

// InfoCard Action Button
function InfoCardAction({
	className,
	children,
	href,
	variant = "outline",
	size = "sm",
	external = false,
	fullWidth = false,
	...props
}: InfoCardActionProps) {
	const buttonClasses = cn(fullWidth && "w-full", className);

	if (href) {
		return (
			<Button
				variant={variant}
				size={size}
				className={buttonClasses}
				asChild
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

	return (
		<Button
			variant={variant}
			size={size}
			className={buttonClasses}
			{...props}>
			{children}
		</Button>
	);
}

// Compound exports
InfoCard.Header = InfoCardHeader;
InfoCard.Title = InfoCardTitle;
InfoCard.Description = InfoCardDescription;
InfoCard.Content = InfoCardContent;
InfoCard.Actions = InfoCardActions;
InfoCard.Action = InfoCardAction;

export { InfoCard };
