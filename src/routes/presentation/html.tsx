import { CodePreview } from "@/components/CodePreview";
import { PageHeader } from "@/components/PageHeader";
import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";

export const Route = createFileRoute("/presentation/html")({
	component: HtmlSlide,
});

function HtmlSlide() {
	return (
		<PageLayout.Container>
			<PageLayout.Main maxWidth="6xl">
				<div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
					{/* Breadcrumb */}
					<nav
						className="flex items-center gap-2 text-sm text-muted-foreground mb-6"
						aria-label="Breadcrumb">
						<Link
							to="/"
							className="hover:text-foreground transition-colors flex items-center gap-1">
							<Home className="h-4 w-4" />
							Home
						</Link>
						<span>›</span>
						<Link
							to="/presentation"
							className="hover:text-foreground transition-colors">
							Presentation
						</Link>
						<span>›</span>
						<span className="text-foreground">Static HTML</span>
					</nav>

					{/* Progress indicator */}
					<div className="flex items-center gap-2 mb-6">
						<div className="flex gap-2">
							<div className="h-1.5 w-12 bg-primary rounded-full" />
							<div className="h-1.5 w-12 bg-muted rounded-full" />
							<div className="h-1.5 w-12 bg-muted rounded-full" />
						</div>
						<span className="text-xs text-muted-foreground font-medium">
							Slide 1 of 3
						</span>
					</div>

					<PageHeader>
						<PageHeader.Title>
							Slide 1: Static HTML
						</PageHeader.Title>
						<PageHeader.Description>
							How browsers request, parse, and render HTML
							documents
						</PageHeader.Description>
					</PageHeader>

					{/* Key Concepts */}
					<div className="mb-8 p-6 rounded-lg bg-muted/50 border border-border">
						<h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
							<span className="text-primary">📚</span> Key
							Concepts
						</h3>
						<ul className="space-y-3 text-muted-foreground">
							<li className="flex items-start gap-3">
								<span className="text-primary font-bold mt-1">
									→
								</span>
								<span>
									<strong className="text-foreground">
										Request → Response:
									</strong>{" "}
									Your browser makes an HTTP request to a
									server, which responds with HTML code
								</span>
							</li>
							<li className="flex items-start gap-3">
								<span className="text-primary font-bold mt-1">
									→
								</span>
								<span>
									<strong className="text-foreground">
										Parsing → DOM:
									</strong>{" "}
									The browser parses HTML into a Document
									Object Model (DOM) tree structure
								</span>
							</li>
							<li className="flex items-start gap-3">
								<span className="text-primary font-bold mt-1">
									→
								</span>
								<span>
									<strong className="text-foreground">
										Default Styling:
									</strong>{" "}
									Elements get basic styles from the browser's
									user-agent stylesheet (headings are bold,
									links are blue, etc.)
								</span>
							</li>
							<li className="flex items-start gap-3">
								<span className="text-primary font-bold mt-1">
									→
								</span>
								<span>
									<strong className="text-foreground">
										Semantic HTML:
									</strong>{" "}
									Even without CSS, proper HTML structure
									makes content accessible and meaningful
								</span>
							</li>
						</ul>
					</div>

					{/* Code Preview */}
					<div className="mb-8">
						<h3 className="text-lg font-semibold mb-4">
							Live Demo
						</h3>
						<p className="text-muted-foreground mb-4">
							Below is a minimal HTML document. Notice how the
							browser renders it with default styles - no custom
							CSS needed! Try viewing the HTML tab to see the
							source code.
						</p>
						<CodePreview
							html={HTML_ONLY}
							height={300}
						/>
					</div>

					{/* What Happens Behind the Scenes */}
					<div className="mb-8 p-6 rounded-lg bg-primary/5 border border-primary/20">
						<h3 className="text-lg font-semibold mb-4">
							🔍 What Happens Behind the Scenes
						</h3>
						<ol className="space-y-2 text-muted-foreground list-decimal list-inside">
							<li>
								Browser sends HTTP GET request to the server
							</li>
							<li>
								Server responds with HTML content (status 200
								OK)
							</li>
							<li>
								Browser's HTML parser reads the markup
								top-to-bottom
							</li>
							<li>DOM tree is constructed from HTML elements</li>
							<li>
								Default styles are applied (user-agent
								stylesheet)
							</li>
							<li>
								Content is painted to the screen - you see the
								page!
							</li>
						</ol>
					</div>

					{/* Navigation */}
					<div className="flex items-center justify-between pt-8 border-t border-border">
						<Link to="/presentation">
							<Button
								variant="outline"
								className="gap-2">
								<ArrowLeft className="h-4 w-4" />
								Back to Overview
							</Button>
						</Link>
						<Link to="/presentation/css">
							<Button className="gap-2">
								Next: Add CSS
								<ArrowRight className="h-4 w-4" />
							</Button>
						</Link>
					</div>
				</div>
			</PageLayout.Main>
		</PageLayout.Container>
	);
}

const HTML_ONLY = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Hello, Web!</title>
  </head>
  <body>
    <main>
      <h1>My First Page</h1>
      <p>Served as static HTML.</p>
      <button>Click me (does nothing yet)</button>
    </main>
  </body>
</html>`;
