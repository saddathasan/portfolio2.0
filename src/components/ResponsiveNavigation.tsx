import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import React, { useState } from "react";

interface ResponsiveNavigationProps {
	className?: string;
}

interface NavigationLinkItem {
	to: string;
	children: React.ReactNode;
}

interface NavigationActionItem {
	href?: string;
	children: React.ReactNode;
	external?: boolean;
}

interface ResponsiveNavigationCompoundProps {
	brand?: {
		children: React.ReactNode;
		to?: string;
	};
	links?: NavigationLinkItem[];
	actions?: NavigationActionItem[];
}

// Main Responsive Navigation Component
export function ResponsiveNavigation({
	className,
	brand,
	links = [],
	actions = [],
}: ResponsiveNavigationProps & ResponsiveNavigationCompoundProps) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<nav
			className={cn(
				"border-b border-border/50 bg-background/95 backdrop-blur sticky top-0 z-50 shadow-sm",
				className,
			)}>
			<div className="container mx-auto flex h-16 items-center justify-between px-4">
				{/* Brand */}
				{brand && (
					<div className="flex-shrink-0">
						<Link
							to={brand.to || "/"}
							className="text-xl md:text-2xl font-bold text-primary hover:text-accent transition-all duration-300 font-display">
							{brand.children}
						</Link>
					</div>
				)}

				{/* Desktop Navigation */}
				<div className="hidden md:flex items-center gap-6 flex-1 justify-center">
					{links.map((link, index) => (
						<Link
							key={index}
							to={link.to}
							className="text-sm font-medium transition-all duration-300 hover:text-primary pb-4 [&.active]:text-primary [&.active]:border-b-2 [&.active]:border-primary">
							{link.children}
						</Link>
					))}
				</div>

				{/* Desktop Actions */}
				<div className="hidden md:flex items-center gap-2">
					{actions.map((action, index) => (
						<Button
							key={index}
							variant="outline"
							size="sm"
							className="border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
							asChild={!!action.href}>
							{action.href ? (
								<a
									href={action.href}
									target={
										action.external ? "_blank" : undefined
									}
									rel={
										action.external
											? "noopener noreferrer"
											: undefined
									}>
									{action.children}
								</a>
							) : (
								action.children
							)}
						</Button>
					))}
					<ThemeToggle />
				</div>

				{/* Mobile Menu Button */}
				<Button
					variant="ghost"
					size="icon"
					className="md:hidden"
					onClick={() => setIsOpen(!isOpen)}
					aria-label="Toggle menu">
					{isOpen ? (
						<X className="h-5 w-5" />
					) : (
						<Menu className="h-5 w-5" />
					)}
				</Button>
			</div>

			{/* Mobile Menu Dropdown */}
			{isOpen && (
				<div className="md:hidden border-t border-border bg-background">
					<div className="container mx-auto px-4 py-4 space-y-4">
						{/* Mobile Links */}
						<div className="flex flex-col space-y-3">
							{links.map((link, index) => (
								<Link
									key={index}
									to={link.to}
									className="text-sm font-medium transition-all duration-300 hover:text-primary py-2 px-3 rounded-md hover:bg-primary/10 [&.active]:text-primary [&.active]:bg-primary/10"
									onClick={() => setIsOpen(false)}>
									{link.children}
								</Link>
							))}
						</div>

						{/* Mobile Actions */}
						{actions.length > 0 && (
							<div className="border-t border-border pt-4 space-y-3">
								{actions.map((action, index) => (
									<Button
										key={index}
										variant="outline"
										size="sm"
										className="border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 w-full"
										asChild={!!action.href}
										onClick={() => setIsOpen(false)}>
										{action.href ? (
											<a
												href={action.href}
												target={
													action.external
														? "_blank"
														: undefined
												}
												rel={
													action.external
														? "noopener noreferrer"
														: undefined
												}>
												{action.children}
											</a>
										) : (
											action.children
										)}
									</Button>
								))}
								<div className="w-full flex justify-center">
									<ThemeToggle />
								</div>
							</div>
						)}
					</div>
				</div>
			)}
		</nav>
	);
}
