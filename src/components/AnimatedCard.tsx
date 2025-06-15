import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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

// Root animated card component
function AnimatedCard({
	className,
	children,
	index = 0,
	delay,
	hoverEffect = true,
	direction = "up",
	...props
}: AnimatedCardProps) {
	const directionMap = {
		up: { opacity: 0, y: 20 },
		down: { opacity: 0, y: -20 },
		left: { opacity: 0, x: -20 },
		right: { opacity: 0, x: 20 },
	};

	const calculateDelay = delay !== undefined ? delay : index * 0.1;

	const hoverProps = hoverEffect
		? {
				whileHover: { scale: 1.02 },
				transition: { duration: 0.3 },
			}
		: {};

	return (
		<motion.div
			initial={directionMap[direction]}
			whileInView={{ opacity: 1, x: 0, y: 0 }}
			transition={{ duration: 0.5, delay: calculateDelay }}
			viewport={{ once: true }}
			{...hoverProps}
			{...props}>
			<Card
				className={cn(
					"hover:shadow-lg transition-all duration-300",
					hoverEffect && "hover:border-primary/20",
					className,
				)}>
				{children}
			</Card>
		</motion.div>
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
		primary: "text-primary",
		gradient:
			"bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent",
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
