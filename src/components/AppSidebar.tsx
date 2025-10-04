import {
	AboutIcon,
	BookmarkIcon,
	ContactIcon,
	ExperienceIcon,
	GamesIcon,
	GithubIcon,
	HomeIcon,
	LinkedinIcon,
	ProjectsIcon,
	ResumeIcon,
	TwitterIcon,
} from "@/components/icons/CustomIcons";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

interface NavigationLinkItem {
	to?: string;
	href?: string;
	children: React.ReactNode;
	icon?: React.ReactNode;
	external?: boolean;
}

interface AppSidebarProps {
	brand?: {
		children: React.ReactNode;
		to?: string;
	};
	links?: NavigationLinkItem[];
	className?: string;
}

// Icon mapping for navigation items with minimum 36px size
const getIconForRoute = (link: NavigationLinkItem) => {
	const iconClassName = "h-7 w-7 min-h-[28px] min-w-[28px]"; // 28px minimum size

	// Handle external links
	if (link.href) {
		if (link.href.includes("linkedin")) {
			return <LinkedinIcon className={iconClassName} />;
		}
		if (link.href.includes("github")) {
			return <GithubIcon className={iconClassName} />;
		}
		if (link.href.includes("x.com") || link.href.includes("twitter")) {
			return <TwitterIcon className={iconClassName} />;
		}
		if (link.href.includes("resume")) {
			return <ResumeIcon className={iconClassName} />;
		}
		return <ResumeIcon className={iconClassName} />;
	}

	// Handle internal routes
	const to = link.to;
	switch (to) {
		case "/":
			return <HomeIcon className={iconClassName} />;
		case "/experience":
			return <ExperienceIcon className={iconClassName} />;
		case "/projects":
			return <ProjectsIcon className={iconClassName} />;
		case "/bookmarks":
			return <BookmarkIcon className={iconClassName} />;
		case "/games":
			return <GamesIcon className={iconClassName} />;
		case "/about":
			return <AboutIcon className={iconClassName} />;
		case "/contact":
			return <ContactIcon className={iconClassName} />;
		default:
			return null;
	}
};

export function AppSidebar({ brand, links = [], className }: AppSidebarProps) {
	return (
		<TooltipProvider>
			<Sidebar
				variant="sidebar"
				className={cn(
					"w-16 border-r border-border/40 bg-background shadow-none",
					"data-[side=left]:border-r data-[side=right]:border-l",
					className,
				)}
				style={
					{
						"--sidebar-width": "1rem",
						"--sidebar-width-icon": "1rem",
					} as React.CSSProperties
				}>
				<SidebarHeader className="">
					<div className="flex items-center justify-center h-full w-full">
						{brand && (
							<Tooltip>
								<TooltipTrigger asChild>
									<Link
										to={brand.to || "/"}
										className="flex items-center justify-center text-3xl font-title text-sidebar-foreground sidebar-icon-hover">
										{brand.children}
									</Link>
								</TooltipTrigger>
								<TooltipContent side="right">
									<p>{brand.children}</p>
								</TooltipContent>
							</Tooltip>
						)}
					</div>
				</SidebarHeader>
				<SidebarContent className="flex flex-col h-full justify-center items-center w-full">
					<SidebarMenu className="flex flex-col items-center justify-center gap-7">
						{links.map((link, index) => (
							<SidebarMenuItem
								key={index}
								className="items-center flex justify-center size-7">
								<Tooltip>
									<TooltipTrigger asChild>
										<SidebarMenuButton
											asChild
											className="p-0 rounded-none !hover:bg-transparent hover:!bg-transparent sidebar-icon-hover">
											{link.href ? (
												<a
													href={link.href}
													target={
														link.external
															? "_blank"
															: undefined
													}
													rel={
														link.external
															? "noopener noreferrer"
															: undefined
													}
													className="flex items-center justify-center w-full h-full">
													{getIconForRoute(link)}
												</a>
											) : (
												<Link
													to={link.to || "/"}
													className="flex items-center justify-center w-full h-full">
													{getIconForRoute(link)}
												</Link>
											)}
										</SidebarMenuButton>
									</TooltipTrigger>
									<TooltipContent side="right">
										<p>{link.children}</p>
									</TooltipContent>
								</Tooltip>
							</SidebarMenuItem>
						))}
					</SidebarMenu>
				</SidebarContent>
				<SidebarFooter className="flex items-center justify-center">
					<ThemeToggle />
				</SidebarFooter>
			</Sidebar>
		</TooltipProvider>
	);
}
