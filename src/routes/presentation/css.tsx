import { CodePreview } from "@/components/CodePreview";
import { PageHeader } from "@/components/PageHeader";
import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";

export const Route = createFileRoute("/presentation/css")({
	component: CssSlide,
});

function CssSlide() {
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
						<span className="text-foreground">Adding CSS</span>
					</nav>

					{/* Progress indicator */}
					<div className="flex items-center gap-2 mb-6">
						<div className="flex gap-2">
							<div className="h-1.5 w-12 bg-primary/30 rounded-full" />
							<div className="h-1.5 w-12 bg-primary rounded-full" />
							<div className="h-1.5 w-12 bg-muted rounded-full" />
						</div>
						<span className="text-xs text-muted-foreground font-medium">
							Slide 2 of 3
						</span>
					</div>

					<PageHeader>
						<PageHeader.Title>Slide 2: Adding CSS</PageHeader.Title>
						<PageHeader.Description>
							Transform plain HTML with the power of Cascading
							Style Sheets
						</PageHeader.Description>
					</PageHeader>

					{/* Key Concepts */}
					<div className="mb-8 p-6 rounded-lg bg-muted/50 border border-border">
						<h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
							<span className="text-primary">🎨</span> Key
							Concepts
						</h3>
						<ul className="space-y-3 text-muted-foreground">
							<li className="flex items-start gap-3">
								<span className="text-primary font-bold mt-1">
									→
								</span>
								<span>
									<strong className="text-foreground">
										CSSOM (CSS Object Model):
									</strong>{" "}
									The browser builds a CSSOM tree from your
									stylesheets, parallel to the DOM
								</span>
							</li>
							<li className="flex items-start gap-3">
								<span className="text-primary font-bold mt-1">
									→
								</span>
								<span>
									<strong className="text-foreground">
										Render Tree:
									</strong>{" "}
									DOM + CSSOM combine to create the render
									tree, which determines what appears on
									screen
								</span>
							</li>
							<li className="flex items-start gap-3">
								<span className="text-primary font-bold mt-1">
									→
								</span>
								<span>
									<strong className="text-foreground">
										Cascade & Specificity:
									</strong>{" "}
									When multiple rules target the same element,
									specificity determines which styles win
								</span>
							</li>
							<li className="flex items-start gap-3">
								<span className="text-primary font-bold mt-1">
									→
								</span>
								<span>
									<strong className="text-foreground">
										Visual Transformation:
									</strong>{" "}
									The exact same HTML now looks completely
									different with just styles!
								</span>
							</li>
						</ul>
					</div>

					{/* Before/After Note */}
					<div className="mb-4 p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
						<p className="text-sm text-foreground">
							<strong>💡 Compare:</strong> Switch between the
							Preview and HTML/CSS tabs to see how the same markup
							is enhanced with styles. Notice the colors, spacing,
							shadows, and hover effects!
						</p>
					</div>

					{/* Code Preview */}
					<div className="mb-8">
						<h3 className="text-lg font-semibold mb-4">
							Live Demo
						</h3>
						<p className="text-muted-foreground mb-4">
							The same HTML from Slide 1, now with CSS applied.
							Hover over the button to see the interactive hover
							state!
						</p>
						<CodePreview
							html={HTML_CONTENT}
							css={CSS_CONTENT}
							height={350}
						/>
					</div>

					{/* CSS Features Explained */}
					<div className="mb-8 grid md:grid-cols-2 gap-4">
						<div className="p-4 rounded-lg bg-muted/50 border border-border">
							<h4 className="font-semibold mb-2 text-primary">
								Layout & Spacing
							</h4>
							<p className="text-sm text-muted-foreground">
								CSS Grid centers content, padding creates
								breathing room, and border-radius rounds corners
								for a modern look.
							</p>
						</div>
						<div className="p-4 rounded-lg bg-muted/50 border border-border">
							<h4 className="font-semibold mb-2 text-primary">
								Colors & Typography
							</h4>
							<p className="text-sm text-muted-foreground">
								Custom fonts, colors, and text sizes make
								content readable and visually appealing.
							</p>
						</div>
						<div className="p-4 rounded-lg bg-muted/50 border border-border">
							<h4 className="font-semibold mb-2 text-primary">
								Interactive States
							</h4>
							<p className="text-sm text-muted-foreground">
								:hover and :focus pseudo-classes provide visual
								feedback when users interact with elements.
							</p>
						</div>
						<div className="p-4 rounded-lg bg-muted/50 border border-border">
							<h4 className="font-semibold mb-2 text-primary">
								Visual Effects
							</h4>
							<p className="text-sm text-muted-foreground">
								Box shadows add depth, making elements appear to
								float above the background.
							</p>
						</div>
					</div>

					{/* Navigation */}
					<div className="flex items-center justify-between pt-8 border-t border-border">
						<Link to="/presentation/html">
							<Button
								variant="outline"
								className="gap-2">
								<ArrowLeft className="h-4 w-4" />
								Previous: HTML
							</Button>
						</Link>
						<Link to="/presentation/js">
							<Button className="gap-2">
								Next: JavaScript
								<ArrowRight className="h-4 w-4" />
							</Button>
						</Link>
					</div>
				</div>
			</PageLayout.Main>
		</PageLayout.Container>
	);
}

const HTML_CONTENT = `<main>
  <h1>My First Page</h1>
  <p>Now styled with CSS.</p>
  <button>Click me (still no custom JS)</button>
</main>`;

const CSS_CONTENT = `:root {
  font-family: ui-sans-serif, system-ui, -apple-system, 
    Segoe UI, Roboto, Arial, sans-serif;
}

body {
  margin: 0;
  min-height: 100svh;
  display: grid;
  place-content: center;
  background: #f8fafc;
  color: #0f172a;
}

main {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(2, 6, 23, 0.08);
  max-width: 42rem;
}

h1 {
  margin: 0 0 0.5rem;
  font-size: 1.75rem;
}

p {
  margin: 0 0 1rem;
  line-height: 1.6;
}

button {
  appearance: none;
  border: 1px solid #0ea5e9;
  background: #0ea5e9;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover {
  background: #0284c7;
}

button:focus {
  outline: 3px solid #bae6fd;
  outline-offset: 2px;
}`;
