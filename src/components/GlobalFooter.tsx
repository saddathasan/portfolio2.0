import { FooterCallToAction } from "@/components/FooterCallToAction";
import { useRouterState } from "@tanstack/react-router";

type ButtonConfig = {
	text: string;
	variant: "default" | "outline";
} & (
	| { to: string; href?: never; external?: never }
	| { href: string; external: boolean; to?: never }
);

export const GlobalFooter = () => {
	const routerState = useRouterState();
	const currentPath = routerState.location.pathname;

	const getFooterContent = (): {
		title: string;
		description: string;
		buttons: ButtonConfig[];
	} => {
		switch (currentPath) {
			case "/":
				return {
					title: "Ready to collaborate?",
					description:
						"Let's discuss how we can work together to build something amazing.",
					buttons: [
						{
							text: "View My Work",
							to: "/projects",
							variant: "default",
						},
						{
							text: "Get In Touch",
							to: "/contact",
							variant: "outline",
						},
					],
				};

			case "/experience":
				return {
					title: "Interested in my work?",
					description:
						"Download my full resume or connect with me on LinkedIn.",
					buttons: [
						{
							text: "Download Resume",
							href: "/resume.pdf",
							variant: "default",
							external: true,
						},
						{
							text: "LinkedIn Profile",
							href: "https://linkedin.com/in/saddathasan",
							variant: "outline",
							external: true,
						},
					],
				};

			case "/projects":
				return {
					title: "Want to see more?",
					description:
						"Check out my GitHub profile or get in touch to discuss collaborations.",
					buttons: [
						{
							text: "GitHub Profile",
							href: "https://github.com/saddathasan",
							variant: "outline",
							external: true,
						},
						{
							text: "Get In Touch",
							href: "mailto:saddathasan94@gmail.com",
							variant: "default",
							external: true,
						},
					],
				};

			case "/about":
				return {
					title: "Get My Resume",
					description:
						"Download my detailed resume to learn more about my experience and skills.",
					buttons: [
						{
							text: "Download Resume",
							href: "/resume.pdf",
							variant: "default",
							external: true,
						},
						{
							text: "Contact Me",
							to: "/contact",
							variant: "outline",
						},
					],
				};

			case "/contact":
				return {
					title: "Looking for my resume?",
					description:
						"Download my detailed resume or check out my latest projects.",
					buttons: [
						{
							text: "Download Resume",
							href: "/resume.pdf",
							variant: "default",
							external: true,
						},
						{
							text: "LinkedIn Profile",
							href: "https://linkedin.com/in/saddathasan",
							variant: "outline",
							external: true,
						},
					],
				};

			default:
				return {
					title: "Let's Connect",
					description:
						"Interested in working together? Let's discuss your next project.",
					buttons: [
						{
							text: "Get In Touch",
							to: "/contact",
							variant: "default",
						},
						{
							text: "View My Work",
							to: "/projects",
							variant: "outline",
						},
					],
				};
		}
	};

	const content = getFooterContent();

	return (
		<FooterCallToAction>
			<FooterCallToAction.Content>
				<FooterCallToAction.Title>
					{content.title}
				</FooterCallToAction.Title>
				<FooterCallToAction.Description>
					{content.description}
				</FooterCallToAction.Description>
			</FooterCallToAction.Content>

			<FooterCallToAction.Actions>
				{content.buttons.map((button, index) => (
					<FooterCallToAction.Action
						key={index}
						variant={button.variant}
						{...(button.to ? { to: button.to } : {})}
						{...(button.href
							? { href: button.href, external: button.external }
							: {})}>
						{button.text}
					</FooterCallToAction.Action>
				))}
			</FooterCallToAction.Actions>
		</FooterCallToAction>
	);
};
