export interface ContactInfo {
	icon: string;
	title: string;
	description: string;
	content: string;
	link?: string;
	isExternal?: boolean;
}

export interface CurrentPosition {
	title: string;
	company: string;
	period: string;
}

export const contactInfo: ContactInfo[] = [
	{
		icon: "📧",
		title: "Email",
		description: "Drop me a line anytime",
		content: "saddathasan94@gmail.com",
		link: "mailto:saddathasan94@gmail.com",
	},
	{
		icon: "💼",
		title: "LinkedIn",
		description: "Let's connect professionally",
		content: "linkedin.com/in/saddathasan",
		link: "https://linkedin.com/in/saddathasan",
		isExternal: true,
	},
	{
		icon: "🐱",
		title: "GitHub",
		description: "Check out my repositories",
		content: "github.com/saddathasan",
		link: "https://github.com/saddathasan",
		isExternal: true,
	},
	{
		icon: "🌐",
		title: "Location",
		description: "Based in",
		content: "Dhaka, Bangladesh",
	},
];

export const currentPosition: CurrentPosition = {
	title: "Software Engineer",
	company: "InfinitiBit GmbH",
	period: "Feb 2025 - Present",
};

export const contactPageInfo = {
	title: "Get In Touch",
	description:
		"I'm always interested in new opportunities and collaborations. Let's discuss how we can work together!",
	responseTime: "I'll get back to you within 24 hours",
};
