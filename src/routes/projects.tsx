import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/Section";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export const Route = createFileRoute("/projects")({
	component: Projects,
});

function Projects() {
	return (
		<div className="flex flex-col min-h-screen pt-10">
			<Section 
				title="All Projects" 
				subtitle="My Work"
				className="min-h-screen"
			>
				<p className="text-muted-foreground text-lg mb-12 max-w-2xl">
					A collection of projects I've worked on, ranging from web applications 
					and open source tools to experiments and prototypes.
				</p>
				
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{projects.map((project) => (
						<ProjectCard
							key={project.id}
							title={project.title}
							description={project.description}
							tags={project.technologies}
							githubUrl={project.sourceUrl || undefined}
							liveUrl={project.liveUrl || undefined}
							image={project.image}
						/>
					))}
				</div>
			</Section>
		</div>
	);
}

