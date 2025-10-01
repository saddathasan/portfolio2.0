import { SkipLink } from "@/components/Accessibility";
import { AppSidebar } from "@/components/AppSidebar";
import { ResponsiveNavigation } from "@/components/ResponsiveNavigation";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
	component: () => (
		<>
			<SkipLink targetId="main-content">Skip to main content</SkipLink>
			<SidebarProvider>
				{/* Sidebar - visible on desktop/tablet (≥640px) */}
				<AppSidebar
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
					]}
					actions={[
						{
							href: "/resume.pdf",
							children: "Resume",
							external: true,
						},
					]}
				/>
				<SidebarInset>
					{/* Mobile Navigation - visible on mobile (<640px) */}
					<ResponsiveNavigation
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
						]}
						actions={[
							{
								href: "/resume.pdf",
								children: "Resume",
								external: true,
							},
						]}
					/>
					<main
						id="main-content"
						className="min-h-[calc(100vh-8rem)] pb-4"
						tabIndex={-1}>
						<Outlet />
					</main>
					{/* <GlobalFooter /> */}
				</SidebarInset>
			</SidebarProvider>
			{import.meta.env.DEV && <TanStackRouterDevtools />}
		</>
	),
});
