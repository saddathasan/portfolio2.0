import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AnimatedCardProps {
	className?: string;
	children: React.ReactNode;
	index?: number;
	delay?: number;
	hoverEffect?: boolean;
	direction?: "up" | "down" | "left" | "right";
}

interface AnimatedCardHeaderProps {
	className?: string;
	children: React.ReactNode;
	title?: string;
	description?: string;
}

interface AnimatedCardContentProps {
	className?: string;
	children: React.ReactNode;
}

interface AnimatedCardTitleProps {
	className?: string;
	children: React.ReactNode;
	variant?: "default" | "primary" | "gradient";
}

interface AnimatedCardDescriptionProps {
	className?: string;
	children: React.ReactNode;
}

// Root AnimatedCard Component - simplified without animations
function AnimatedCard({
	className,
	children,
	hoverEffect = true,
	...props
}: AnimatedCardProps) {
	return (
		<Card
			className={cn(
				"transition-colors duration-200",
				hoverEffect && "hover:bg-accent/5",
				className,
			)}
			{...props}>
			{children}
		</Card>
	);
}

// Header subcomponent
function AnimatedCardHeader({
	className,
	children,
	...props
}: AnimatedCardHeaderProps) {
	return (
		<CardHeader
			className={cn(className)}
			{...props}>
			{children}
		</CardHeader>
	);
}

// Content subcomponent
function AnimatedCardContent({
	className,
	children,
	...props
}: AnimatedCardContentProps) {
	return (
		<CardContent
			className={cn(className)}
			{...props}>
			{children}
		</CardContent>
	);
}

// Title subcomponent with variants
function AnimatedCardTitle({
	className,
	children,
	variant = "default",
	...props
}: AnimatedCardTitleProps) {
	const variantClasses = {
		default: "",
		primary: "text-gray-700 dark:text-gray-300",
		gradient: "text-primary",
	};

	return (
		<CardTitle
			className={cn(variantClasses[variant], className)}
			{...props}>
			{children}
		</CardTitle>
	);
}

// Description subcomponent
function AnimatedCardDescription({
	className,
	children,
	...props
}: AnimatedCardDescriptionProps) {
	return (
		<CardDescription
			className={cn(className)}
			{...props}>
			{children}
		</CardDescription>
	);
}

// Compound component structure
AnimatedCard.Header = AnimatedCardHeader;
AnimatedCard.Content = AnimatedCardContent;
AnimatedCard.Title = AnimatedCardTitle;
AnimatedCard.Description = AnimatedCardDescription;

export { AnimatedCard };
