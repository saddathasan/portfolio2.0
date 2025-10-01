import { FooterCallToAction } from "@/components/FooterCallToAction";

export const GlobalFooter = () => {
	return (
		<FooterCallToAction>
			<FooterCallToAction.Content>
				<FooterCallToAction.Title>
					Let's work together
				</FooterCallToAction.Title>
				<FooterCallToAction.Description>
					Get in touch to discuss your next project.
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
