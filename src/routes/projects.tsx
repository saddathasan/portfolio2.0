import { PageHeader } from "@/components/PageHeader";
import { PageLayout } from "@/components/PageLayout";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/projects")({
	component: () => (
		<PageLayout.Container>
			<PageLayout.Main>
				<PageHeader>
					<PageHeader.Title>Featured Projects</PageHeader.Title>
					<PageHeader.Description>
						A showcase of my work spanning enterprise clients,
						freelance projects, and personal development
					</PageHeader.Description>
				</PageHeader>

				<div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8 mb-16">
					{projects.map((project, index) => (
						<div key={project.id}>
							<ProjectCard
								project={project}
								index={index}
							/>
						</div>
					))}
				</div>
			</PageLayout.Main>
		</PageLayout.Container>
	),
});
