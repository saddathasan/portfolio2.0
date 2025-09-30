import { PageHeader } from "@/components/PageHeader";
import { PageLayout } from "@/components/PageLayout";
import { projects } from "@/data";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/projects")({
	component: () => (
		<PageLayout.Container>
			<PageLayout.Main contentWidth="reading">
				<PageHeader>
					<PageHeader.Title>Projects</PageHeader.Title>
					<PageHeader.Description>
						Selected work with brief impact summaries.
					</PageHeader.Description>
				</PageHeader>

				<div className="space-y-10 mb-20">
					{projects.map((project) => (
						<article
							key={project.id}
							className="group border-b border-border/60 pb-8 last:border-none">
							<h2 className="text-xl font-semibold tracking-tight mb-2 group-hover:text-accent transition-colors">
								{project.title}
							</h2>
							{project.technologies?.length ? (
								<p className="text-sm text-muted-foreground mb-3">
									{project.technologies.slice(0, 5).join(" • ")}
								</p>
							) : null}
							<p className="text-base leading-relaxed text-muted-foreground">
								{project.description}
							</p>
						</article>
					))}
				</div>
			</PageLayout.Main>
		</PageLayout.Container>
	),
});
