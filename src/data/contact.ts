import { profile, social, currentRole, formatPeriod } from "./site";

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

// Selector off site.ts — edit content in site.ts, not here.
const ICONS: Record<string, string> = {
	GitHub: "🐱",
	LinkedIn: "💼",
	X: "🐦",
};

export const contactInfo: ContactInfo[] = [
	{
		icon: "📧",
		title: "Email",
		description: "Send me a message",
		content: profile.email,
		link: `mailto:${profile.email}`,
	},
	...social.map((s) => ({
		icon: ICONS[s.label] ?? "🔗",
		title: s.label,
		description: "Connect with me",
		content: s.href.replace(/^https?:\/\//, ""),
		link: s.href,
		isExternal: true,
	})),
	{
		icon: "🌐",
		title: "Location",
		description: "Based in",
		content: profile.location,
	},
];

const current = currentRole();
export const currentPosition: CurrentPosition = current
	? {
			title: current.role.title,
			company: current.company.company,
			period: formatPeriod(current.role.start, current.role.end) || "Present",
		}
	: { title: profile.title, company: "", period: "Present" };

export const contactPageInfo = {
	title: "Get In Touch",
	description:
		"Interested in new opportunities and collaborations. Let's discuss how we can work together.",
	responseTime: "I'll respond within 24 hours",
};
