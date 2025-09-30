import { ContactForm } from "@/components/ContactForm";
import { ContactInfo } from "@/components/ContactInfo";
import { PageHeader } from "@/components/PageHeader";
import { PageLayout } from "@/components/PageLayout";
import { contactInfo, contactPageInfo } from "@/data";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
	component: () => (
		<PageLayout.Container>
			<PageLayout.Main contentWidth="reading">
				{/* Page Header */}
				<PageHeader>
					<PageHeader.Title>{contactPageInfo.title}</PageHeader.Title>
					<PageHeader.Description>
						{contactPageInfo.description}
					</PageHeader.Description>
				</PageHeader>

				{/* Main Content Grid */}
				<div className="space-y-10">
					<section>
						<h2 className="text-xl font-semibold mb-6">Get in touch</h2>
						<ContactInfo>
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
					</section>
					<section>
						<ContactForm responseTime={contactPageInfo.responseTime} />
					</section>
				</div>
			</PageLayout.Main>
		</PageLayout.Container>
	),
});
