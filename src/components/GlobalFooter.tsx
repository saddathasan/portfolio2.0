import { Button } from "@/components/ui/button";
import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const GlobalFooter = () => {
	const routerState = useRouterState();
	const currentPath = routerState.location.pathname;

	const getFooterContent = () => {
		switch (currentPath) {
			case "/":
				return {
					title: "Ready to collaborate?",
					description:
						"Let's discuss how we can work together to build something amazing.",
					buttons: [
						{
							text: "View My Work",
							href: "/projects",
							variant: "default" as const,
							isLink: true,
						},
						{
							text: "Get In Touch",
							href: "/contact",
							variant: "outline" as const,
							isLink: true,
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
							variant: "default" as const,
							isLink: false,
						},
						{
							text: "LinkedIn Profile",
							href: "https://linkedin.com/in/saddathasan",
							variant: "outline" as const,
							isLink: false,
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
							variant: "outline" as const,
							isLink: false,
						},
						{
							text: "Get In Touch",
							href: "mailto:saddathasan94@gmail.com",
							variant: "default" as const,
							isLink: false,
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
							variant: "default" as const,
							isLink: false,
						},
						{
							text: "Contact Me",
							href: "/contact",
							variant: "outline" as const,
							isLink: true,
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
							variant: "default" as const,
							isLink: false,
						},
						{
							text: "LinkedIn Profile",
							href: "https://linkedin.com/in/saddathasan",
							variant: "outline" as const,
							isLink: false,
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
							href: "/contact",
							variant: "default" as const,
							isLink: true,
						},
						{
							text: "View My Work",
							href: "/projects",
							variant: "outline" as const,
							isLink: true,
						},
					],
				};
		}
	};

	const content = getFooterContent();

	return (
		<footer className="border-t bg-background/95 backdrop-blur sticky bottom-0 z-40">
			<div className="container mx-auto flex h-16 items-center px-4">
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4 }}
					className="flex items-center justify-between w-full">
					<div className="flex items-center space-x-4">
						<h2 className="text-sm font-bold">{content.title}</h2>
						<span className="text-sm text-muted-foreground hidden sm:inline">
							{content.description}
						</span>
					</div>
					<div className="flex items-center gap-3">
						{content.buttons.map((button, index) => (
							<Button
								key={index}
								variant={button.variant}
								size="sm"
								asChild>
								{button.isLink ? (
									<Link to={button.href}>{button.text}</Link>
								) : (
									<a
										href={button.href}
										target="_blank"
										rel="noopener noreferrer">
										{button.text}
									</a>
								)}
							</Button>
						))}
					</div>
				</motion.div>
			</div>
		</footer>
	);
};
