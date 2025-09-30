import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { PageHeader } from "@/components/PageHeader";
import { PageLayout } from "@/components/PageLayout";
import { SkillsSidebar } from "@/components/SkillsSidebar";
import { Badge } from "@/components/ui/badge";
import { experiences, skillCategories } from "@/data";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/experience")({
	component: () => (
		<PageLayout.Container>
			<PageLayout.Main contentWidth="reading">
				<PageHeader>
					<PageHeader.Title>Professional Experience</PageHeader.Title>
					<PageHeader.Description>
						5+ years of building scalable systems and delivering
						results for enterprise clients
					</PageHeader.Description>
				</PageHeader>

				{/* Two Column Layout - Responsive */}
				<div className="flex flex-col lg:flex-row gap-8">
					<ExperienceTimeline experiences={experiences} />
					<SkillsSidebar skillCategories={skillCategories} />
				</div>

				{/* Mobile Skills Section */}
				<div className="lg:hidden mt-12">
					<h3 className="text-xl font-semibold mb-6">
						Technical Skills
					</h3>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						{skillCategories.map((category) => (
							<div
								key={category.title}
								className="space-y-2">
								<h4 className="font-medium text-gray-900 dark:text-gray-100">
									{category.title}
								</h4>
								<p className="text-sm text-muted-foreground mb-3">
									{category.description}
								</p>
								<div className="flex flex-wrap gap-1">
									{category.skills.map((skill) => (
										<Badge
											key={skill}
											variant="secondary"
											className="text-xs">
											{skill}
										</Badge>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			</PageLayout.Main>
		</PageLayout.Container>
	),
});
