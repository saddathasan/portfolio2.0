import { CodePreview } from "@/components/CodePreview";
import { PageHeader } from "@/components/PageHeader";
import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";

export const Route = createFileRoute("/presentation/js")({
	component: JsSlide,
});

function JsSlide() {
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
						<span className="text-foreground">
							Adding JavaScript
						</span>
					</nav>

					{/* Progress indicator */}
					<div className="flex items-center gap-2 mb-6">
						<div className="flex gap-2">
							<div className="h-1.5 w-12 bg-primary/30 rounded-full" />
							<div className="h-1.5 w-12 bg-primary/30 rounded-full" />
							<div className="h-1.5 w-12 bg-primary rounded-full" />
						</div>
						<span className="text-xs text-muted-foreground font-medium">
							Slide 3 of 3
						</span>
					</div>

					<PageHeader>
						<PageHeader.Title>
							Slide 3: Adding JavaScript
						</PageHeader.Title>
						<PageHeader.Description>
							Bring your pages to life with interactivity and
							dynamic behavior
						</PageHeader.Description>
					</PageHeader>

					{/* Key Concepts */}
					<div className="mb-8 p-6 rounded-lg bg-muted/50 border border-border">
						<h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
							<span className="text-primary">⚡</span> Key
							Concepts
						</h3>
						<ul className="space-y-3 text-muted-foreground">
							<li className="flex items-start gap-3">
								<span className="text-primary font-bold mt-1">
									→
								</span>
								<span>
									<strong className="text-foreground">
										DOM Manipulation:
									</strong>{" "}
									JavaScript can select elements, modify their
									content, and change their styles dynamically
								</span>
							</li>
							<li className="flex items-start gap-3">
								<span className="text-primary font-bold mt-1">
									→
								</span>
								<span>
									<strong className="text-foreground">
										Event Listeners:
									</strong>{" "}
									Attach functions to events (clicks, key
									presses, etc.) to respond to user actions
								</span>
							</li>
							<li className="flex items-start gap-3">
								<span className="text-primary font-bold mt-1">
									→
								</span>
								<span>
									<strong className="text-foreground">
										State Management:
									</strong>{" "}
									Track and update data (like our click count)
									to create dynamic, stateful interfaces
								</span>
							</li>
							<li className="flex items-start gap-3">
								<span className="text-primary font-bold mt-1">
									→
								</span>
								<span>
									<strong className="text-foreground">
										Progressive Enhancement:
									</strong>{" "}
									The page works with HTML/CSS alone; JS adds
									an extra layer of functionality
								</span>
							</li>
						</ul>
					</div>

					{/* Interactive Demo Note */}
					<div className="mb-4 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
						<p className="text-sm text-foreground">
							<strong>🎮 Try it:</strong> Click the button in the
							preview below! Watch how JavaScript updates the text
							and adds visual feedback in real-time. This is the
							power of interactivity!
						</p>
					</div>

					{/* Code Preview */}
					<div className="mb-8">
						<h3 className="text-lg font-semibold mb-4">
							Live Demo
						</h3>
						<p className="text-muted-foreground mb-4">
							Now our page is fully interactive! Click the button
							to see the counter increment. Open your DevTools
							Console (F12) to see how JavaScript works.
						</p>
						<CodePreview
							html={HTML_CONTENT}
							css={CSS_CONTENT}
							js={JS_CONTENT}
							height={350}
						/>
					</div>

					{/* Code Breakdown */}
					<div className="mb-8">
						<h3 className="text-lg font-semibold mb-4">
							Understanding the JavaScript Code
						</h3>
						<div className="grid md:grid-cols-2 gap-4">
							<div className="p-4 rounded-lg bg-muted/50 border border-border">
								<h4 className="font-semibold mb-2 text-primary">
									Event Listener
								</h4>
								<code className="text-xs bg-background px-2 py-1 rounded">
									addEventListener('click', ...)
								</code>
								<p className="text-sm text-muted-foreground mt-2">
									Waits for the user to click the button, then
									runs our function.
								</p>
							</div>
							<div className="p-4 rounded-lg bg-muted/50 border border-border">
								<h4 className="font-semibold mb-2 text-primary">
									Query Selector
								</h4>
								<code className="text-xs bg-background px-2 py-1 rounded">
									document.querySelector('#id')
								</code>
								<p className="text-sm text-muted-foreground mt-2">
									Finds HTML elements in the DOM so we can
									interact with them.
								</p>
							</div>
							<div className="p-4 rounded-lg bg-muted/50 border border-border">
								<h4 className="font-semibold mb-2 text-primary">
									State Variable
								</h4>
								<code className="text-xs bg-background px-2 py-1 rounded">
									let count = 0
								</code>
								<p className="text-sm text-muted-foreground mt-2">
									Stores data that changes over time (the
									click count).
								</p>
							</div>
							<div className="p-4 rounded-lg bg-muted/50 border border-border">
								<h4 className="font-semibold mb-2 text-primary">
									DOM Update
								</h4>
								<code className="text-xs bg-background px-2 py-1 rounded">
									textContent = 'new text'
								</code>
								<p className="text-sm text-muted-foreground mt-2">
									Changes what's displayed on the page
									dynamically.
								</p>
							</div>
						</div>
					</div>

					{/* Real World Applications */}
					<div className="mb-8 p-6 rounded-lg bg-primary/5 border border-primary/20">
						<h3 className="text-lg font-semibold mb-4">
							🌍 Real-World Applications
						</h3>
						<p className="text-muted-foreground mb-3">
							This simple counter demonstrates concepts used in:
						</p>
						<ul className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground">
							<li>• Social media like buttons</li>
							<li>• Shopping cart quantity updates</li>
							<li>• Form validation and feedback</li>
							<li>• Interactive dashboards</li>
							<li>• Real-time notifications</li>
							<li>• Dynamic content loading</li>
						</ul>
					</div>

					{/* Navigation */}
					<div className="flex items-center justify-between pt-8 border-t border-border">
						<Link to="/presentation/css">
							<Button
								variant="outline"
								className="gap-2">
								<ArrowLeft className="h-4 w-4" />
								Previous: CSS
							</Button>
						</Link>
						<Link to="/presentation">
							<Button className="gap-2">
								Back to Overview
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
  <p class="muted">Now with JavaScript interactivity.</p>
  <p id="message" aria-live="polite"></p>
  <button id="helloBtn" type="button">Click me</button>
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

button {
  appearance: none;
  border: 1px solid #0ea5e9;
  background: #0ea5e9;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

button:hover {
  background: #0284c7;
}

button.active {
  transform: translateY(1px);
}

.muted {
  color: #475569;
}`;

const JS_CONTENT = `document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('#helloBtn');
  const msg = document.querySelector('#message');
  if (!btn || !msg) return;

  let count = 0;
  btn.addEventListener('click', () => {
    count++;
    msg.textContent = \`You clicked \${count} time\${count === 1 ? '' : 's'}.\`;
    btn.classList.toggle('active');
  });
});`;
