import { FooterCallToAction } from "@/components/FooterCallToAction";

export const GlobalFooter = () => {
	return (
		<FooterCallToAction>
			<FooterCallToAction.Content>
				<FooterCallToAction.Title>
					Let’s build something impactful.
				</FooterCallToAction.Title>
				<FooterCallToAction.Description>
					Open to collaboration & new opportunities.
				</FooterCallToAction.Description>
			</FooterCallToAction.Content>

			<FooterCallToAction.Actions>
				<FooterCallToAction.Action
					variant="default"
					href="mailto:saddathasan94@gmail.com"
					external>
					Contact
				</FooterCallToAction.Action>
				<FooterCallToAction.Action
					variant="outline"
					href="/resume.pdf"
					external>
					Resume
				</FooterCallToAction.Action>
			</FooterCallToAction.Actions>
		</FooterCallToAction>
	);
};
