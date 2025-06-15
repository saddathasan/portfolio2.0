import { BiographySection } from "@/components/BiographySection";
import { CertificatesList } from "@/components/CertificatesList";
import { ContentGrid } from "@/components/ContentGrid";
import { InfoCard } from "@/components/InfoCard";
import { PageHeader } from "@/components/PageHeader";
import { PageLayout } from "@/components/PageLayout";
import { Section } from "@/components/Section";
import { aboutInfo, certificates } from "@/data";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
	component: () => (
		<PageLayout.Container>
			<PageLayout.Main>
				{/* Page Header */}
				<PageHeader>
					<PageHeader.Title>About {aboutInfo.name}</PageHeader.Title>
					<PageHeader.Description>
						{aboutInfo.title} • {aboutInfo.experience} •{" "}
						{aboutInfo.location}
					</PageHeader.Description>
				</PageHeader>

				{/* Biography Section */}
				<ContentGrid
					columns={2}
					gap="lg"
					className="mb-12">
					<ContentGrid.Item>
						<BiographySection direction="left">
							<BiographySection.Title>
								My Story
							</BiographySection.Title>
							<BiographySection.Content
								paragraphs={aboutInfo.bio}
								renderAs="paragraphs"
							/>
						</BiographySection>
					</ContentGrid.Item>

					<ContentGrid.Item>
						<BiographySection direction="right">
							<BiographySection.Title>
								What I Do
							</BiographySection.Title>
							<BiographySection.Content
								listItems={aboutInfo.whatIDo}
								renderAs="list"
							/>
						</BiographySection>
					</ContentGrid.Item>
				</ContentGrid>

				{/* Education Section */}
				<Section>
					<Section.Header
						size="md"
						centered
						className="mb-8">
						<span className="bg-gradient-to-r from-vibrant-orange to-orange-600 bg-clip-text text-transparent font-bold">
							Education
						</span>
					</Section.Header>
					<Section.Content maxWidth="2xl">
						<InfoCard
							animate
							hover
							variant="vibrant-orange">
							<InfoCard.Header className="relative">
								<div className="absolute -top-2 -right-2 w-4 h-4 bg-vibrant-orange/20 rounded-full animate-ping"></div>
								<InfoCard.Title
									badge={aboutInfo.education.period}
									badgeVariant="default">
									<span className="bg-gradient-to-r from-vibrant-orange to-orange-600 bg-clip-text text-transparent font-bold">
										{aboutInfo.education.degree}
									</span>
								</InfoCard.Title>
								<InfoCard.Description>
									<span className="font-semibold text-vibrant-orange dark:text-orange-400 text-base">
										{aboutInfo.education.institution}
									</span>
								</InfoCard.Description>
							</InfoCard.Header>
							<InfoCard.Content>
								<p className="text-sm text-foreground/80 mb-6 leading-relaxed font-medium">
									{aboutInfo.education.description}
								</p>
								<InfoCard.Actions>
									<InfoCard.Action
										href={aboutInfo.education.link}
										external
										variant="default"
										className="bg-gradient-to-r from-vibrant-orange to-orange-600 hover:from-orange-600 hover:to-vibrant-orange text-white border-none shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
										Visit BRAC University
									</InfoCard.Action>
								</InfoCard.Actions>
							</InfoCard.Content>
						</InfoCard>
					</Section.Content>
				</Section>

				{/* Certifications Section */}
				<Section>
					<Section.Header
						size="md"
						centered
						className="mb-8">
						<span className="bg-gradient-to-r from-vibrant-orange to-orange-600 bg-clip-text text-transparent font-bold">
							Certifications
						</span>
					</Section.Header>
					<Section.Content maxWidth="3xl">
						<CertificatesList certificates={certificates} />
					</Section.Content>
				</Section>
			</PageLayout.Main>
		</PageLayout.Container>
	),
});
