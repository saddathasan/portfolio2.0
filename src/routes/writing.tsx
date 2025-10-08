import { PageHeader } from "@/components/PageHeader";
import { PageLayout } from "@/components/PageLayout";
import { SEO } from "@/components/SEO";
import { createFileRoute } from "@tanstack/react-router";

// Placeholder posts (could be swapped for MDX or external data later)
const drafts: Array<{ id: string; title: string; summary: string; date: string }> = [
  {
    id: "design-system-notes",
    title: "Design System Notes",
    summary: "Thoughts on building a lean, evolvable design system without over-engineering.",
    date: "2025-09-12",
  },
  {
    id: "perf-budget-mindset",
    title: "A Performance Budget Mindset",
    summary: "Approaching web performance as a product constraint rather than an optimization afterthought.",
    date: "2025-08-03",
  },
];

export const Route = createFileRoute("/writing")({
  component: WritingPage,
});

function WritingPage() {
	return (
		<PageLayout.Container>
			<SEO
				title="Writing"
				description="Articles & notes on engineering, performance, and product-minded development." />
			<PageLayout.Main maxWidth="3xl">
				<PageHeader>
					<PageHeader.Title>Writing</PageHeader.Title>
					<PageHeader.Description>
						Occasional essays, implementation notes, and distilled lessons from building real products.
					</PageHeader.Description>
				</PageHeader>
				<div className="space-y-10">
					{drafts.map((post) => (
						<article key={post.id} className="group border-b border-border/60 pb-8 last:border-none">
							<h2 className="text-lg font-semibold tracking-tight mb-1 group-hover:text-accent transition-colors">
								{post.title}
							</h2>
							<p className="text-xs text-muted-foreground mb-3">{new Date(post.date).toLocaleDateString()}</p>
							<p className="text-sm text-muted-foreground leading-relaxed">{post.summary}</p>
						</article>
					))}
				</div>
			</PageLayout.Main>
		</PageLayout.Container>
	);
}
