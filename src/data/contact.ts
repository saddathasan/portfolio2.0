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
		description: "Send me a message",
		content: "saddathasan94@gmail.com",
		link: "mailto:saddathasan94@gmail.com",
	},
	{
		icon: "💼",
		title: "LinkedIn",
		description: "Connect professionally",
		content: "linkedin.com/in/saddathasan",
		link: "https://linkedin.com/in/saddathasan",
		isExternal: true,
	},
	{
		icon: "🐱",
		title: "GitHub",
		description: "View my code",
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
		"Interested in new opportunities and collaborations. Let's discuss how we can work together.",
	responseTime: "I'll respond within 24 hours",
};
