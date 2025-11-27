import { createFileRoute, Link } from "@tanstack/react-router";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { ProjectCard } from "@/components/ProjectCard";
import { SkillBadge } from "@/components/SkillBadge";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
import { ArrowRight, Code, Database, Cloud, Brain, Wrench } from "lucide-react";

export const Route = createFileRoute("/")({
	component: Index,
});

function Index() {
	// Get top 3 projects
	const featuredProjects = projects.slice(0, 3);

	// Flatten skills for display or pick categories
	const skillCategories = [
		{ id: 'frontend', icon: <Code className="w-4 h-4" /> },
		{ id: 'backend', icon: <Database className="w-4 h-4" /> },
		{ id: 'cloud', icon: <Cloud className="w-4 h-4" /> },
		{ id: 'ai', icon: <Brain className="w-4 h-4" /> },
		{ id: 'tools', icon: <Wrench className="w-4 h-4" /> },
	];

	return (
		<div className="flex flex-col min-h-screen">
			<Hero />

			{/* Skills Section */}
			<Section id="skills" title="Technical Expertise" subtitle="My Stack">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{skills.map((category) => {
						const categoryIcon = skillCategories.find(c => c.id === category.id)?.icon;
						return (
							<div key={category.id} className="p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30 transition-colors">
								<div className="flex items-center gap-3 mb-6">
									<div className="p-2 rounded-lg bg-primary/10 text-primary">
										{categoryIcon}
									</div>
									<h3 className="text-xl font-bold">{category.title}</h3>
								</div>
								<div className="flex flex-wrap gap-2">
									{category.skills.map((skill) => {
										const skillName = typeof skill === 'string' ? skill : skill.name;
										return <SkillBadge key={skillName} name={skillName} />;
									})}
								</div>
							</div>
						);
					})}
				</div>
			</Section>

			{/* Projects Section */}
			<Section id="projects" title="Featured Work" subtitle="Portfolio" className="bg-secondary/20">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{featuredProjects.map((project) => (
						<ProjectCard
							key={project.id}
							title={project.title}
							description={project.description}
							tags={project.technologies}
							githubUrl={project.sourceUrl || undefined}
							liveUrl={project.liveUrl || undefined}
							image={project.image}
							featured={true}
						/>
					))}
				</div>
				<div className="mt-12 text-center">
					<Link
						to="/projects"
						className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
					>
						View All Projects <ArrowRight className="w-4 h-4" />
					</Link>
				</div>
			</Section>

			{/* Contact CTA */}
			<Section id="contact" className="text-center">
				<div className="max-w-2xl mx-auto p-8 md:p-12 rounded-3xl bg-gradient-to-b from-secondary/50 to-background border border-border/50">
					<h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to start a project?</h2>
					<p className="text-muted-foreground text-lg mb-8">
						I'm currently available for freelance work and open to full-time opportunities.
						Let's build something amazing together.
					</p>
					<Link
						to="/contact"
						className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all"
					>
						Get in Touch
					</Link>
				</div>
			</Section>
		</div>
	);
}
