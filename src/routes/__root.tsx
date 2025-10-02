import { SkipLink } from "@/components/Accessibility";
import { AppSidebar } from "@/components/AppSidebar";
import { MobileNavigation } from "@/components/MobileNavigation";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
	component: () => (
		<>
			<SkipLink targetId="main-content">Skip to main content</SkipLink>
			<SidebarProvider>
				{/* Desktop Sidebar - visible on desktop (≥768px), positioned on left */}
				<AppSidebar
					className="hidden md:flex"
					brand={{
						children: "sh",
					}}
					links={[
						{ to: "/", children: "Home" },
						{ to: "/experience", children: "Experience" },
						{ to: "/projects", children: "Projects" },
						{ to: "/games", children: "Games" },
						{ to: "/about", children: "About" },
						{ to: "/contact", children: "Contact" },
						{
							href: "/resume.pdf",
							children: "Resume",
							external: true,
						},
						{
							href: "https://linkedin.com/in/saddathasan",
							children: "LinkedIn",
							external: true,
						},
						{
							href: "https://github.com/saddathasan",
							children: "GitHub",
							external: true,
						},
						{
							href: "https://x.com/saddathasan",
							children: "X",
							external: true,
						},
					]}
				/>
				<SidebarInset className="md:ml-16">
					{/* Mobile App Bar with Hamburger Menu */}
					<div className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-border/40 bg-background/95 backdrop-blur px-4 md:hidden">
						<div className="flex items-center">
							<span className="text-xl font-clash-display text-foreground">Saddat Hasan</span>
						</div>
						<MobileNavigation
							brand={{
								children: "Saddat Hasan",
							}}
							links={[
								{ to: "/", children: "Home" },
								{ to: "/experience", children: "Experience" },
								{ to: "/projects", children: "Projects" },
								{ to: "/games", children: "Games" },
								{ to: "/about", children: "About" },
								{ to: "/contact", children: "Contact" },
								{
									href: "/resume.pdf",
									children: "Resume",
									external: true,
								},
								{
									href: "https://linkedin.com/in/saddathasan",
									children: "LinkedIn",
									external: true,
								},
								{
									href: "https://github.com/saddathasan",
									children: "GitHub",
									external: true,
								},
								{
									href: "https://x.com/saddathasan",
									children: "X (Twitter)",
									external: true,
								},
							]}
						/>
					</div>
					<main
						id="main-content"
						className="min-h-[calc(100vh-8rem)] pb-4 md:min-h-[calc(100vh-4rem)]"
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
