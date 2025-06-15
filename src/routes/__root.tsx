import { GlobalFooter } from "@/components/GlobalFooter";
import { ResponsiveNavigation } from "@/components/ResponsiveNavigation";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
	component: () => (
		<>
			<ResponsiveNavigation
				brand={{
					children: "Saddat Hasan",
				}}
				links={[
					{ to: "/", children: "Home" },
					{ to: "/experience", children: "Experience" },
					{ to: "/projects", children: "Projects" },
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
			<main className="min-h-[calc(100vh-8rem)] pb-4">
				<Outlet />
			</main>
			<GlobalFooter />
			{import.meta.env.DEV && <TanStackRouterDevtools />}
		</>
	),
});
