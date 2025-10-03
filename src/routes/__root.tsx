import { SkipLink } from "@/components/Accessibility";
import { AppSidebar } from "@/components/AppSidebar";
import { MobileNavigation } from "@/components/MobileNavigation";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { BRAND_CONFIG, NAVIGATION_LINKS, MOBILE_NAVIGATION_LINKS } from "@/constants";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
	component: () => (
		<>
			<SkipLink targetId="main-content">Skip to main content</SkipLink>
			<SidebarProvider className="md:pl-[3rem]">
				{/* Desktop Sidebar - visible on desktop (≥768px), positioned on left */}
				<AppSidebar
					className="hidden md:flex"
					brand={BRAND_CONFIG}
					links={NAVIGATION_LINKS}
				/>
				<SidebarInset className="">
					{/* Mobile App Bar with Hamburger Menu */}
					<div className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-border/40 bg-background/95 backdrop-blur px-4 md:hidden">
						<div className="flex items-center">
							<Link to="/" className="text-xl font-title text-foreground hover:opacity-80 transition-opacity">
								sh
							</Link>
						</div>
						<MobileNavigation
							// brand={BRAND_CONFIG}
							links={MOBILE_NAVIGATION_LINKS}
						/>
					</div>
					<main
						id="main-content"
						className="h-full w-full"
						tabIndex={-1}>
						<Outlet />
					</main>
					{/* <GlobalFooter /> */}
				</SidebarInset>
			</SidebarProvider>
			{import.meta.env.DEV && <TanStackRouterDevtools position="bottom-right" />}
		</>
	),
});
