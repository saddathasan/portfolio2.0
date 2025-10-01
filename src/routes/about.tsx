import { BiographySection } from "@/components/BiographySection";
import { ContentGrid } from "@/components/ContentGrid";
import { InfoCard } from "@/components/InfoCard";
import { PageHeader } from "@/components/PageHeader";
import { PageLayout } from "@/components/PageLayout";
import { Section } from "@/components/Section";
import { aboutInfo, certificates } from "@/data";
import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";

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
					className="mb-8">
					<ContentGrid.Item>
						<BiographySection>
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
						<BiographySection>
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
						centered>
						Education
					</Section.Header>
					<Section.Content maxWidth="2xl">
						<InfoCard>
							<InfoCard.Header>
								<InfoCard.Title
									badge={aboutInfo.education.period}>
									{aboutInfo.education.degree}
								</InfoCard.Title>
								<InfoCard.Description>
									{aboutInfo.education.institution}
								</InfoCard.Description>
							</InfoCard.Header>
							<InfoCard.Content>
								<p className="text-sm text-muted-foreground mb-4">
									{aboutInfo.education.description}
								</p>
								<InfoCard.Actions>
									<InfoCard.Action
										href={aboutInfo.education.link}
										external>
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
						centered>
						Certifications
					</Section.Header>
					<Section.Content>
						<ContentGrid columns={2}>
							{certificates.map((cert, index) => (
								<ContentGrid.Item key={index}>
									<InfoCard>
										<InfoCard.Header>
											<InfoCard.Title className="text-lg leading-tight">
												{cert.name}
											</InfoCard.Title>
											<InfoCard.Description className="flex items-center justify-between">
												<span>{cert.issuer}</span>
												<span className="text-xs border border-border/50 bg-background px-2 py-1 rounded-md">
													{cert.issuingDate}
												</span>
											</InfoCard.Description>
										</InfoCard.Header>
										<InfoCard.Content className="pt-0">
											{cert.credentialId && (
												<p className="text-sm text-muted-foreground mb-3">
													Credential ID:{" "}
													{cert.credentialId}
												</p>
											)}
											<InfoCard.Actions>
												<InfoCard.Action
													href={cert.credentialUrl}
													external
													fullWidth
													className="flex items-center gap-2">
													<ExternalLink className="h-4 w-4" />
													View Certificate
												</InfoCard.Action>
											</InfoCard.Actions>
										</InfoCard.Content>
									</InfoCard>
								</ContentGrid.Item>
							))}
						</ContentGrid>
					</Section.Content>
				</Section>
			</PageLayout.Main>
		</PageLayout.Container>
	),
});
