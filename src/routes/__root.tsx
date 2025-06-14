import { GlobalFooter } from "@/components/GlobalFooter";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
	component: () => (
		<>
			<nav className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
				<div className="container mx-auto flex h-16 items-center px-4">
					<div className="mr-8">
						<Link
							to="/"
							className="text-2xl font-bold text-primary">
							Saddat Hasan
						</Link>
					</div>
					<div className="flex gap-6 flex-1">
						<Link
							to="/"
							className="text-sm font-medium transition-colors hover:text-primary [&.active]:text-primary">
							Home
						</Link>
						<Link
							to="/experience"
							className="text-sm font-medium transition-colors hover:text-primary [&.active]:text-primary">
							Experience
						</Link>
						<Link
							to="/projects"
							className="text-sm font-medium transition-colors hover:text-primary [&.active]:text-primary">
							Projects
						</Link>
						<Link
							to="/about"
							className="text-sm font-medium transition-colors hover:text-primary [&.active]:text-primary">
							About
						</Link>
						<Link
							to="/contact"
							className="text-sm font-medium transition-colors hover:text-primary [&.active]:text-primary">
							Contact
						</Link>
					</div>
					<div className="flex items-center gap-2">
						<Button
							variant="outline"
							size="sm"
							asChild>
							<a
								href="/resume.pdf"
								target="_blank"
								rel="noopener noreferrer">
								Resume
							</a>
						</Button>
						<ThemeToggle />
					</div>
				</div>
			</nav>
			<main className="min-h-[calc(100vh-8rem)] pb-4">
				<Outlet />
			</main>
			<GlobalFooter />
			<TanStackRouterDevtools />
		</>
	),
});
