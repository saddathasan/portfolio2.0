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

// Main Responsive Navigation Component - Only visible on mobile (< 640px)
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
				"border-b bg-background/95 backdrop-blur sticky top-0 z-50 sm:hidden",
				className,
			)}>
			<div className="container mx-auto flex h-16 items-center justify-between px-4">
				{/* Brand */}
				{brand && (
					<div className="flex-shrink-0">
						<Link
						to={brand.to || "/"}
						className="text-xl font-bold text-foreground hover:text-foreground/80 transition-colors">
						{brand.children}
					</Link>
					</div>
				)}

				{/* Mobile Menu Button */}
				<Button
					variant="ghost"
					size="icon"
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
				<div className="border-t border-border bg-background">
					<div className="container mx-auto px-4 py-4 space-y-4">
						{/* Mobile Links */}
						<div className="flex flex-col space-y-3">
							{links.map((link, index) => (
								<Link
									key={index}
									to={link.to}
									className="text-sm font-medium transition-colors hover:text-foreground/80 py-2 px-3 rounded [&.active]:text-foreground"
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
										className="w-full"
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
