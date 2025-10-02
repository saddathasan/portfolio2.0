import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
	HomeIcon,
	AboutIcon,
	ExperienceIcon,
	ProjectsIcon,
	GamesIcon,
	ContactIcon,
	ResumeIcon,
	LinkedinIcon,
	GithubIcon,
	TwitterIcon,
} from "@/components/icons/CustomIcons";

interface LinkItem {
	to?: string;
	href?: string;
	children: React.ReactNode;
	external?: boolean;
}

interface BrandItem {
	to?: string;
	children: React.ReactNode;
}

interface MobileNavigationProps {
	brand?: BrandItem;
	links?: LinkItem[];
	className?: string;
}

function getIconForRoute(link: LinkItem) {
	const route = link.to || link.href || "";
	
	if (route === "/" || route.includes("home")) {
		return <HomeIcon className="h-6 w-6 min-h-[24px] min-w-[24px]" />;
	}
	if (route.includes("about")) {
		return <AboutIcon className="h-6 w-6 min-h-[24px] min-w-[24px]" />;
	}
	if (route.includes("experience")) {
		return <ExperienceIcon className="h-6 w-6 min-h-[24px] min-w-[24px]" />;
	}
	if (route.includes("projects")) {
		return <ProjectsIcon className="h-6 w-6 min-h-[24px] min-w-[24px]" />;
	}
	if (route.includes("games")) {
		return <GamesIcon className="h-6 w-6 min-h-[24px] min-w-[24px]" />;
	}
	if (route.includes("contact")) {
		return <ContactIcon className="h-6 w-6 min-h-[24px] min-w-[24px]" />;
	}
	if (route.includes("resume")) {
		return <ResumeIcon className="h-6 w-6 min-h-[24px] min-w-[24px]" />;
	}
	if (route.includes("linkedin")) {
		return <LinkedinIcon className="h-6 w-6 min-h-[24px] min-w-[24px]" />;
	}
	if (route.includes("github")) {
		return <GithubIcon className="h-6 w-6 min-h-[24px] min-w-[24px]" />;
	}
	if (route.includes("twitter")) {
		return <TwitterIcon className="h-6 w-6 min-h-[24px] min-w-[24px]" />;
	}
	
	return <HomeIcon className="h-6 w-6 min-h-[24px] min-w-[24px]" />;
}

export function MobileNavigation({
	brand,
	links = [],
	className,
}: MobileNavigationProps) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className={cn("md:hidden", className)}>
			<Sheet open={isOpen} onOpenChange={setIsOpen}>
				<SheetTrigger asChild>
					<Button
						variant="ghost"
						size="icon"
						className="h-10 w-10"
						aria-label="Open navigation menu"
					>
						<Menu className="h-6 w-6" />
					</Button>
				</SheetTrigger>
				<SheetContent 
					side="right" 
					className="w-80 p-0 bg-background border-l border-border/40"
				>
					<div className="flex flex-col h-full">
						{/* Header with close button and brand */}
						<div className="flex items-center justify-between p-4 border-b border-border/40">
							{brand && (
								<Link
									to={brand.to || "/"}
									className="text-2xl font-clash-display text-foreground hover:text-foreground/80 transition-colors"
									onClick={() => setIsOpen(false)}
								>
									{brand.children}
								</Link>
							)}
							<Button
								variant="ghost"
								size="icon"
								onClick={() => setIsOpen(false)}
								className="h-8 w-8"
								aria-label="Close navigation menu"
							>
								<X className="h-5 w-5" />
							</Button>
						</div>

						{/* Navigation Links */}
						<div className="flex-1 p-4">
							<nav className="space-y-2">
								{links.map((link, index) => (
									<div key={index}>
										{link.href ? (
											<a
												href={link.href}
												target={link.external ? "_blank" : undefined}
												rel={link.external ? "noopener noreferrer" : undefined}
												className="flex items-center gap-3 px-3 py-3 rounded-md text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
												onClick={() => setIsOpen(false)}
											>
												{getIconForRoute(link)}
												<span className="text-base font-medium">{link.children}</span>
											</a>
										) : (
											<Link
												to={link.to || "/"}
												className="flex items-center gap-3 px-3 py-3 rounded-md text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
												onClick={() => setIsOpen(false)}
											>
												{getIconForRoute(link)}
												<span className="text-base font-medium">{link.children}</span>
											</Link>
										)}
									</div>
								))}
							</nav>
						</div>

						{/* Theme Toggle at Bottom */}
						<div className="p-4 border-t border-border/40">
							<div className="flex items-center justify-between">
								<span className="text-sm font-medium text-muted-foreground">Theme</span>
								<ThemeToggle />
							</div>
						</div>
					</div>
				</SheetContent>
			</Sheet>
		</div>
	);
}