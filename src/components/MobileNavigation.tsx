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
	BlogIcon,
	ExperienceIcon,
	ProjectsIcon,
	BookmarkIcon,
	GamesIcon,
	ContactIcon,
	ResumeIcon,
	LinkedinIcon,
	GithubIcon,
	TwitterIcon,
} from "@/components/icons/CustomIcons";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

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
	const iconClassName = "h-7 w-7 min-h-[28px] min-w-[28px]"; // Match desktop sidebar icon size
	
	const route = link.to || link.href || "";
	
	if (route === "/" || route.includes("home")) {
		return <HomeIcon className={iconClassName} />;
	}
	if (route.includes("about")) {
		return <AboutIcon className={iconClassName} />;
	}
	if (route.includes("experience")) {
		return <ExperienceIcon className={iconClassName} />;
	}
	if (route.includes("projects")) {
		return <ProjectsIcon className={iconClassName} />;
	}
	if (route.includes("blog")) {
		return <BlogIcon className={iconClassName} />;
	}
	if (route.includes("bookmarks")) {
		return <BookmarkIcon className={iconClassName} />;
	}
	if (route.includes("games")) {
		return <GamesIcon className={iconClassName} />;
	}
	if (route.includes("contact")) {
		return <ContactIcon className={iconClassName} />;
	}
	if (route.includes("resume")) {
		return <ResumeIcon className={iconClassName} />;
	}
	if (route.includes("linkedin")) {
		return <LinkedinIcon className={iconClassName} />;
	}
	if (route.includes("github")) {
		return <GithubIcon className={iconClassName} />;
	}
	if (route.includes("twitter") || route.includes("x.com")) {
		return <TwitterIcon className={iconClassName} />;
	}
	
	return <HomeIcon className={iconClassName} />;
}

export function MobileNavigation({
	brand,
	links = [],
	className,
}: MobileNavigationProps) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className={cn("md:hidden", className)}>
			<TooltipProvider>
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
					className="w-16 p-0 bg-background border-l border-border/40 [&>button:first-of-type]:!hidden"
				>
					<div className="flex flex-col h-full items-center">
						{/* Header with brand and close button */}
						<div className="flex items-center justify-between h-14 w-full px-2 border-b border-border/40">
							<div className="flex-1">
								{brand && (
									<Tooltip>
										<TooltipTrigger asChild>
											<Link
												to={brand.to || "/"}
												className="text-3xl font-title text-foreground sidebar-icon-hover"
												onClick={() => setIsOpen(false)}
											>
												{brand.children}
											</Link>
										</TooltipTrigger>
										<TooltipContent side="left">
											<p>{brand.children}</p>
										</TooltipContent>
									</Tooltip>
								)}
							</div>
							<Button
								variant="ghost"
								size="icon"
								onClick={() => setIsOpen(false)}
								className="h-8 w-8 flex-shrink-0"
								aria-label="Close navigation menu"
							>
								<X className="h-5 w-5" />
							</Button>
						</div>

						{/* Navigation Links - Icon Only */}
						<div className="flex-1 flex flex-col items-center justify-center gap-7 py-4">
							{links.map((link, index) => (
								<div key={index} className="flex items-center justify-center">
									<Tooltip>
										<TooltipTrigger asChild>
											{link.href ? (
												<a
													href={link.href}
													target={link.external ? "_blank" : undefined}
													rel={link.external ? "noopener noreferrer" : undefined}
													className="flex items-center justify-center w-7 h-7 !hover:bg-transparent hover:!bg-transparent sidebar-icon-hover"
													onClick={() => setIsOpen(false)}
												>
													{getIconForRoute(link)}
												</a>
											) : (
												<Link
													to={link.to || "/"}
													className="flex items-center justify-center w-7 h-7 !hover:bg-transparent hover:!bg-transparent sidebar-icon-hover"
													onClick={() => setIsOpen(false)}
												>
													{getIconForRoute(link)}
												</Link>
											)}
										</TooltipTrigger>
										<TooltipContent side="left">
											<p>{link.children}</p>
										</TooltipContent>
									</Tooltip>
								</div>
							))}
						</div>

						{/* Theme Toggle at Bottom */}
						<div className="flex items-center justify-center p-4 border-t border-border/40">
							<ThemeToggle />
						</div>
					</div>
				</SheetContent>
			</Sheet>
		</TooltipProvider>
		</div>
	);
}