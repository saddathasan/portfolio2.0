import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { PageHeader } from "@/components/PageHeader";
import { PageLayout } from "@/components/PageLayout";
import { SkillsSidebar } from "@/components/SkillsSidebar";
import { experiences, skillCategories } from "@/data";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/experience")({
	component: () => (
		<PageLayout.Container>
			<PageLayout.Main maxWidth="7xl">
				<PageHeader>
					<PageHeader.Title>Professional Experience</PageHeader.Title>
					<PageHeader.Description>
						5+ years of building scalable systems and delivering
						results for enterprise clients
					</PageHeader.Description>
				</PageHeader>

				{/* Two Column Layout */}
				<div className="flex gap-8">
					<ExperienceTimeline experiences={experiences} />
					<SkillsSidebar skillCategories={skillCategories} />
				</div>
			</PageLayout.Main>
		</PageLayout.Container>
	),
});
