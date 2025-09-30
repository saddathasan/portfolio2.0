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
				"border-b border-border/30 bg-background/80 backdrop-blur-xl sticky top-0 z-50",
				"shadow-lg shadow-primary/5 transition-all duration-300",

				className,
			)}
			{...props}>
			<div className="container mx-auto flex h-18 items-center px-6 relative z-10">
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
			className={cn("mr-10", className)}
			{...props}>
			<Link
				to={to}
				className="group relative text-2xl font-black text-primary hover:scale-105 transition-all duration-300 font-sans">
				<span className="relative z-10">{children}</span>
				{/* Hover effect background */}

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
			className={cn("flex gap-6 flex-1", className)}
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
	activeClassName = "[&.active]:text-primary [&.active]:after:w-full [&.active]:after:bg-primary",
	...props
}: NavigationLinkProps) {
	return (
		<Link
			to={to}
			className={cn(
				"group relative px-4 py-3 text-sm font-semibold text-muted-foreground hover:text-foreground transition-all duration-300",
				"after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300",
				"hover:after:w-full hover:scale-105",
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
