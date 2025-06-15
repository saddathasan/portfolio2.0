import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

interface NavigationProps {
	className?: string;
	children: React.ReactNode;
}

interface NavigationBrandProps {
	className?: string;
	children: React.ReactNode;
	to?: string;
}

interface NavigationLinksProps {
	className?: string;
	children: React.ReactNode;
}

interface NavigationLinkProps {
	className?: string;
	children: React.ReactNode;
	to: string;
	activeClassName?: string;
}

interface NavigationActionsProps {
	className?: string;
	children: React.ReactNode;
}

interface NavigationActionProps {
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
}

// Root Navigation Component
function Navigation({ className, children, ...props }: NavigationProps) {
	return (
		<nav
			className={cn(
				"border-b border-border/50 bg-background/95 backdrop-blur sticky top-0 z-50 shadow-sm",
				className,
			)}
			{...props}>
			<div className="container mx-auto flex h-16 items-center px-4">
				{children}
			</div>
		</nav>
	);
}

// Brand/Logo Component
function NavigationBrand({
	className,
	children,
	to = "/",
	...props
}: NavigationBrandProps) {
	return (
		<div
			className={cn("mr-8", className)}
			{...props}>
			<Link
				to={to}
				className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hover:from-accent hover:to-primary transition-all duration-300">
				{children}
			</Link>
		</div>
	);
}

// Navigation Links Container
function NavigationLinks({
	className,
	children,
	...props
}: NavigationLinksProps) {
	return (
		<div
			className={cn("flex gap-6 flex-1 items-center", className)}
			{...props}>
			{children}
		</div>
	);
}

// Individual Navigation Link
function NavigationLink({
	className,
	children,
	to,
	activeClassName = "[&.active]:text-primary [&.active]:border-b-2 [&.active]:border-primary",
	...props
}: NavigationLinkProps) {
	return (
		<Link
			to={to}
			className={cn(
				"text-sm font-medium transition-all duration-300 hover:text-primary relative h-16 flex items-center",
				"border-b-2 border-transparent",
				activeClassName,
				className,
			)}
			{...props}>
			{children}
		</Link>
	);
}

// Navigation Actions Container
function NavigationActions({
	className,
	children,
	...props
}: NavigationActionsProps) {
	return (
		<div
			className={cn("flex items-center gap-2", className)}
			{...props}>
			{children}
		</div>
	);
}

// Navigation Action Button
function NavigationAction({
	className,
	children,
	href,
	variant = "outline",
	size = "sm",
	external = false,
	...props
}: NavigationActionProps) {
	if (href) {
		return (
			<Button
				variant={variant}
				size={size}
				className={cn(
					"border-primary/20 text-primary hover:bg-primary hover:text-primary/90 transition-all duration-300",
					className,
				)}
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
			className={cn(
				"border-primary/20 text-primary hover:bg-primary hover:text-primary/90 transition-all duration-300",
				className,
			)}
			{...props}>
			{children}
		</Button>
	);
}

// Theme Toggle as a Navigation Component
function NavigationThemeToggle() {
	return <ThemeToggle />;
}

// Compound exports
Navigation.Brand = NavigationBrand;
Navigation.Links = NavigationLinks;
Navigation.Link = NavigationLink;
Navigation.Actions = NavigationActions;
Navigation.Action = NavigationAction;
Navigation.ThemeToggle = NavigationThemeToggle;

export { Navigation };
