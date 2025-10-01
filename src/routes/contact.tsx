import { ContactForm } from "@/components/ContactForm";
import { ContactInfo } from "@/components/ContactInfo";
import { ContentGrid } from "@/components/ContentGrid";
import { PageHeader } from "@/components/PageHeader";
import { PageLayout } from "@/components/PageLayout";
import { contactInfo, contactPageInfo } from "@/data";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
	component: () => (
		<PageLayout.Container>
			<PageLayout.Main>
				{/* Page Header */}
				<PageHeader>
					<PageHeader.Title>{contactPageInfo.title}</PageHeader.Title>
					<PageHeader.Description>
						{contactPageInfo.description}
					</PageHeader.Description>
				</PageHeader>

				{/* Main Content Grid */}
				<ContentGrid
					columns={2}
					gap="lg">
					{/* Contact Information */}
					<ContentGrid.Item>
						<ContactInfo>
							<h2 className="text-2xl font-semibold mb-6">
								Let's Connect
							</h2>

							<ContactInfo.Card>
								{contactInfo.map((info) => (
									<ContactInfo.Item
										key={info.title}
										icon={info.icon}
										title={info.title}
										description={info.description}
										content={info.content}
										link={info.link}
										isExternal={info.isExternal}
										additionalInfo={
											info.title === "Location"
												? "Available for remote work"
												: undefined
										}
									/>
								))}
							</ContactInfo.Card>
						</ContactInfo>
					</ContentGrid.Item>

					{/* Contact Form */}
					<ContentGrid.Item>
						<div className="space-y-6">
							<ContactForm responseTime={contactPageInfo.responseTime} />
						</div>
					</ContentGrid.Item>
				</ContentGrid>
			</PageLayout.Main>
		</PageLayout.Container>
	),
});
