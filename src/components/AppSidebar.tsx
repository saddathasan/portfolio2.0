import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { Home, User, Briefcase, FolderOpen, Gamepad2, Mail, FileText } from "lucide-react";

interface NavigationLinkItem {
	to: string;
	children: React.ReactNode;
	icon?: React.ReactNode;
}

interface NavigationActionItem {
	href?: string;
	children: React.ReactNode;
	external?: boolean;
	icon?: React.ReactNode;
}

interface AppSidebarProps {
	brand?: {
		children: React.ReactNode;
		to?: string;
	};
	links?: NavigationLinkItem[];
	actions?: NavigationActionItem[];
	className?: string;
}

// Icon mapping for navigation items
const getIconForRoute = (to: string) => {
	switch (to) {
		case "/":
			return <Home className="h-4 w-4" />;
		case "/experience":
			return <Briefcase className="h-4 w-4" />;
		case "/projects":
			return <FolderOpen className="h-4 w-4" />;
		case "/games":
			return <Gamepad2 className="h-4 w-4" />;
		case "/about":
			return <User className="h-4 w-4" />;
		case "/contact":
			return <Mail className="h-4 w-4" />;
		default:
			return null;
	}
};

export function AppSidebar({
	brand,
	links = [],
	actions = [],
	className,
}: AppSidebarProps) {
	return (
		<Sidebar variant="inset" className={cn("border-r", className)}>
			<SidebarHeader className="border-b border-sidebar-border">
				<div className="flex h-16 items-center px-4">
					{brand && (
						<Link
							to={brand.to || "/"}
							className="text-lg font-bold font- text-sidebar-foreground hover:text-sidebar-foreground/80 transition-colors"
						>
							{brand.children}
						</Link>
					)}
				</div>
			</SidebarHeader>
			<SidebarContent>
				<SidebarMenu>
					{links.map((link, index) => (
						<SidebarMenuItem key={index}>
							<SidebarMenuButton asChild>
								<Link
									to={link.to}
									className="flex items-center gap-2 w-full"
								>
									{getIconForRoute(link.to)}
									<span>{link.children}</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
				
				{/* Actions Section */}
				{actions.length > 0 && (
					<div className="mt-auto p-4 border-t border-sidebar-border">
						<div className="space-y-2">
							{actions.map((action, index) => (
								<Button
									key={index}
									variant="outline"
									size="sm"
									className="w-full justify-start"
									asChild={!!action.href}
								>
									{action.href ? (
										<a
											href={action.href}
											target={action.external ? "_blank" : undefined}
											rel={action.external ? "noopener noreferrer" : undefined}
											className="flex items-center gap-2"
										>
											<FileText className="h-4 w-4" />
											{action.children}
										</a>
									) : (
										<span className="flex items-center gap-2">
											{action.icon}
											{action.children}
										</span>
									)}
								</Button>
							))}
							<div className="pt-2">
								<ThemeToggle />
							</div>
						</div>
					</div>
				)}
			</SidebarContent>
		</Sidebar>
	);
}