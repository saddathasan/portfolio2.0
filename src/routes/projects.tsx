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

				{/* Project Cards Grid - 3 per row, consistent sizing */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
					{projects.map((project, index) => (
						<ProjectCard
							key={project.id}
							project={project}
							index={index}
							className="w-full h-full"
						/>
					))}
				</div>
			</PageLayout.Main>
		</PageLayout.Container>
	),
});
