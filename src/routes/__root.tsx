import { GlobalFooter } from "@/components/GlobalFooter";
import { Navigation } from "@/components/Navigation";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
	component: () => (
		<>
			<Navigation>
				<Navigation.Brand>Saddat Hasan</Navigation.Brand>
				<Navigation.Links>
					<Navigation.Link to="/">Home</Navigation.Link>
					<Navigation.Link to="/experience">
						Experience
					</Navigation.Link>
					<Navigation.Link to="/projects">Projects</Navigation.Link>
					<Navigation.Link to="/about">About</Navigation.Link>
					<Navigation.Link to="/contact">Contact</Navigation.Link>
				</Navigation.Links>
				<Navigation.Actions>
					<Navigation.Action
						href="/resume.pdf"
						external>
						Resume
					</Navigation.Action>
					<Navigation.ThemeToggle />
				</Navigation.Actions>
			</Navigation>
			<main className="min-h-[calc(100vh-8rem)] pb-4">
				<Outlet />
			</main>
			<GlobalFooter />
			<TanStackRouterDevtools />
		</>
	),
});
