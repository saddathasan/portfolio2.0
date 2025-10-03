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

// Root Navigation Component - Lee Robinson ultra-minimal style
function Navigation({ className, children, ...props }: NavigationProps) {
	return (
		<nav
			className={cn(
				"w-full border-b border-border bg-background",
				className
			)}
			{...props}>
			<div className="container flex h-16 max-w-4xl items-center justify-between px-6 mx-auto">
				{children}
			</div>
		</nav>
	);
}

// Navigation Brand - ultra-minimal styling
function NavigationBrand({
	className,
	children,
	to = "/",
	...props
}: NavigationBrandProps) {
	return (
		<Link
			to={to}
			className={cn(
				"text-base font-medium text-foreground hover:text-muted-foreground transition-colors font-body",
				className
			)}
			{...props}>
			{children}
		</Link>
	);
}

// Navigation Links - ultra-minimal styling
function NavigationLinks({
	className,
	children,
	...props
}: NavigationLinksProps) {
	return (
		<div
			className={cn("flex items-center space-x-8", className)}
			{...props}>
			{children}
		</div>
	);
}

// Navigation Link - minimal styling
function NavigationLink({
	className,
	children,
	to,
	activeClassName = "[&.active]:text-foreground [&.active]:font-medium",
	...props
}: NavigationLinkProps) {
	return (
		<Link
			to={to}
			className={cn(
				"text-sm text-muted-foreground hover:text-foreground transition-colors",
				activeClassName,
				className
			)}
			{...props}>
			{children}
		</Link>
	);
}

// Navigation Actions - minimal styling
function NavigationActions({
	className,
	children,
	...props
}: NavigationActionsProps) {
	return (
		<div
			className={cn("flex items-center space-x-2", className)}
			{...props}>
			{children}
		</div>
	);
}

// Navigation Action - minimal button styling
function NavigationAction({
	className,
	children,
	href,
	variant = "ghost",
	size = "sm",
	external = false,
	...props
}: NavigationActionProps) {
	if (href) {
		return (
			<Button
				asChild
				variant={variant}
				size={size}
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

	return (
		<Button
			variant={variant}
			size={size}
			className={cn("", className)}
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
