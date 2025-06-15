import { HeroSection } from "@/components/HeroSection";
import { PageLayout } from "@/components/PageLayout";
import { Section } from "@/components/Section";
import { TechBadgeList } from "@/components/TechBadgeList";
import { heroInfo, techStack } from "@/data";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: () => (
		<PageLayout.Container>
			{/* Hero Section */}
			<HeroSection>
				<HeroSection.Title>{heroInfo.name}</HeroSection.Title>
				<HeroSection.Subtitle>{heroInfo.title}</HeroSection.Subtitle>
				<HeroSection.Location>{heroInfo.location}</HeroSection.Location>
				<HeroSection.Description>
					{heroInfo.description}
				</HeroSection.Description>
				<HeroSection.Actions>
					<HeroSection.ActionButton
						href={heroInfo.resumeUrl}
						external>
						View Resume
					</HeroSection.ActionButton>
					<HeroSection.ActionButton
						href={heroInfo.linkedinUrl}
						variant="outline"
						external>
						LinkedIn
					</HeroSection.ActionButton>
					<HeroSection.ActionButton
						href="/contact"
						variant="outline">
						Contact
					</HeroSection.ActionButton>
				</HeroSection.Actions>
			</HeroSection>

			{/* Tech Stack Section */}
			<Section>
				<Section.Header>Tech Stack</Section.Header>
				<Section.Content maxWidth="4xl">
					<div className="flex justify-center">
						<TechBadgeList
							technologies={techStack}
							variant="secondary"
							size="md"
							animated
							hoverable
							gap="md"
						/>
					</div>
				</Section.Content>
			</Section>
		</PageLayout.Container>
	),
});
