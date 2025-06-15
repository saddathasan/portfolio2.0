import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

interface FooterCallToActionProps {
	className?: string;
	children: React.ReactNode;
	animate?: boolean;
}

interface FooterTitleProps {
	className?: string;
	children: React.ReactNode;
	size?: "sm" | "md" | "lg";
}

interface FooterDescriptionProps {
	className?: string;
	children: React.ReactNode;
	hideOnMobile?: boolean;
}

interface FooterActionsProps {
	className?: string;
	children: React.ReactNode;
	gap?: "sm" | "md" | "lg";
}

interface FooterActionProps {
	className?: string;
	children: React.ReactNode;
	variant?:
		| "default"
		| "outline"
		| "ghost"
		| "link"
		| "destructive"
		| "secondary";
	size?: "default" | "sm" | "lg" | "icon";
	href?: string;
	to?: string;
	external?: boolean;
}

// Root FooterCallToAction Component
function FooterCallToAction({
	className,
	children,
	animate = true,
	...props
}: FooterCallToActionProps) {
	if (animate) {
		return (
			<motion.footer
				className={cn(
					"border-t bg-background/95 backdrop-blur sticky bottom-0 z-40",
					className,
				)}
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4 }}
				{...props}>
				<div className="container mx-auto flex h-16 items-center px-4">
					<div className="flex items-center justify-between w-full">
						{children}
					</div>
				</div>
			</motion.footer>
		);
	}

	return (
		<footer
			className={cn(
				"border-t bg-background/95 backdrop-blur sticky bottom-0 z-40",
				className,
			)}
			{...props}>
			<div className="container mx-auto flex h-16 items-center px-4">
				<div className="flex items-center justify-between w-full">
					{children}
				</div>
			</div>
		</footer>
	);
}

// Footer Title
function FooterTitle({
	className,
	children,
	size = "sm",
	...props
}: FooterTitleProps) {
	const sizeClasses = {
		sm: "text-sm",
		md: "text-base",
		lg: "text-lg",
	};

	return (
		<h2
			className={cn("font-bold", sizeClasses[size], className)}
			{...props}>
			{children}
		</h2>
	);
}

// Footer Description
function FooterDescription({
	className,
	children,
	hideOnMobile = true,
	...props
}: FooterDescriptionProps) {
	return (
		<span
			className={cn(
				"text-sm text-muted-foreground",
				hideOnMobile && "hidden sm:inline",
				className,
			)}
			{...props}>
			{children}
		</span>
	);
}

// Footer Actions Container
function FooterActions({
	className,
	children,
	gap = "md",
	...props
}: FooterActionsProps) {
	const gapClasses = {
		sm: "gap-2",
		md: "gap-3",
		lg: "gap-4",
	};

	return (
		<div
			className={cn("flex items-center", gapClasses[gap], className)}
			{...props}>
			{children}
		</div>
	);
}

// Footer Action Button
function FooterAction({
	className,
	children,
	variant = "outline",
	size = "sm",
	href,
	to,
	external = false,
	...props
}: FooterActionProps) {
	if (to) {
		return (
			<Button
				variant={variant}
				size={size}
				className={className}
				asChild
				{...props}>
				<Link to={to}>{children}</Link>
			</Button>
		);
	}

	if (href) {
		return (
			<Button
				variant={variant}
				size={size}
				className={className}
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
			className={className}
			{...props}>
			{children}
		</Button>
	);
}

// Content container for title and description
function FooterContent({
	className,
	children,
	...props
}: {
	className?: string;
	children: React.ReactNode;
}) {
	return (
		<div
			className={cn("flex items-center space-x-4", className)}
			{...props}>
			{children}
		</div>
	);
}

// Compound exports
FooterCallToAction.Title = FooterTitle;
FooterCallToAction.Description = FooterDescription;
FooterCallToAction.Content = FooterContent;
FooterCallToAction.Actions = FooterActions;
FooterCallToAction.Action = FooterAction;

export { FooterCallToAction };
