import { PageHeader } from "@/components/PageHeader";
import { PageLayout } from "@/components/PageLayout";
import { Card } from "@/components/ui/card";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Code, Palette, Zap } from "lucide-react";

export const Route = createFileRoute("/presentation/")({
	component: PresentationIndex,
});

function PresentationIndex() {
	return (
		<PageLayout.Container>
			<PageLayout.Main maxWidth="6xl">
				<div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
					<PageHeader>
						<PageHeader.Title>Frontend 101</PageHeader.Title>
						<PageHeader.Description>
							Understanding how the web works: From static HTML to
							interactive JavaScript
						</PageHeader.Description>
					</PageHeader>

					<div className="max-w-3xl mx-auto mb-12 text-center">
						<p className="text-muted-foreground leading-relaxed">
							This presentation demonstrates the fundamental
							building blocks of web development. We'll
							progressively enhance a simple webpage, showing you
							how browsers process HTML, apply CSS styling, and
							execute JavaScript to create interactive
							experiences.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
						<SlideCard
							to="/presentation/html"
							icon={<Code className="h-8 w-8" />}
							number="01"
							title="Static HTML"
							description="Learn how browsers request, parse, and render HTML documents into the DOM tree."
							duration="2-3 min"
							color="text-blue-500"
						/>

						<SlideCard
							to="/presentation/css"
							icon={<Palette className="h-8 w-8" />}
							number="02"
							title="Adding CSS"
							description="Discover how stylesheets transform plain HTML into visually appealing interfaces."
							duration="3-4 min"
							color="text-purple-500"
						/>

						<SlideCard
							to="/presentation/js"
							icon={<Zap className="h-8 w-8" />}
							number="03"
							title="Adding JavaScript"
							description="Explore how JavaScript brings pages to life with interactivity and dynamic behavior."
							duration="3-4 min"
							color="text-amber-500"
						/>
					</div>

					<div className="text-center text-sm text-muted-foreground">
						<p>Total duration: ~8-10 minutes</p>
						<p className="mt-2">
							Navigate through slides using the buttons or arrow
							keys
						</p>
					</div>
				</div>
			</PageLayout.Main>
		</PageLayout.Container>
	);
}

interface SlideCardProps {
	to: string;
	icon: React.ReactNode;
	number: string;
	title: string;
	description: string;
	duration: string;
	color: string;
}

function SlideCard({
	to,
	icon,
	number,
	title,
	description,
	duration,
	color,
}: SlideCardProps) {
	return (
		<Link
			to={to}
			className="group">
			<Card className="h-full p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-primary/50 cursor-pointer">
				<div className="flex flex-col h-full">
					<div className="flex items-start justify-between mb-4">
						<div
							className={`${color} p-3 rounded-lg bg-muted group-hover:scale-110 transition-transform duration-300`}>
							{icon}
						</div>
						<span className="text-sm font-mono text-muted-foreground">
							{number}
						</span>
					</div>

					<h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
						{title}
					</h3>

					<p className="text-muted-foreground text-sm mb-4 flex-grow leading-relaxed">
						{description}
					</p>

					<div className="flex items-center justify-between pt-4 border-t border-border">
						<span className="text-xs text-muted-foreground font-medium">
							{duration}
						</span>
						<ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
					</div>
				</div>
			</Card>
		</Link>
	);
}
