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
						"Let's build something amazing together.",
					buttons: [
						{
							text: "View Work",
							to: "/projects",
							variant: "default",
						},
						{
							text: "Contact",
							to: "/contact",
							variant: "outline",
						},
					],
				};

			case "/experience":
				return {
					title: "Interested in my work?",
					description:
						"Download my resume or connect on LinkedIn.",
					buttons: [
						{
							text: "Resume",
							href: "/resume.pdf",
							variant: "default",
							external: true,
						},
						{
							text: "LinkedIn",
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
						"Check out my GitHub or get in touch.",
					buttons: [
						{
							text: "GitHub",
							href: "https://github.com/saddathasan",
							variant: "outline",
							external: true,
						},
						{
							text: "Contact",
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
						"Download my resume or get in touch.",
					buttons: [
						{
							text: "Resume",
							href: "/resume.pdf",
							variant: "default",
							external: true,
						},
						{
							text: "Contact",
							to: "/contact",
							variant: "outline",
						},
					],
				};

			case "/contact":
				return {
					title: "Looking for my resume?",
					description:
						"Download my resume or check LinkedIn.",
					buttons: [
						{
							text: "Resume",
							href: "/resume.pdf",
							variant: "default",
							external: true,
						},
						{
							text: "LinkedIn",
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
						"Ready to work together?",
					buttons: [
						{
							text: "Contact",
							to: "/contact",
							variant: "default",
						},
						{
							text: "Projects",
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
