import type { HeroInfo, Stat } from '@/types';

export const heroInfo: HeroInfo = {
	name: "Saddat Hasan",
	title: "Software Engineer",
	location: "📍 Dhaka, Bangladesh",
	description:
		"Building scalable web applications with modern technologies. Focused on clean code, performance, and user experience.",
	resumeUrl: "/resume.pdf",
	linkedinUrl: "https://linkedin.com/in/saddathasan",
};

export const techStack: string[] = [
	"TypeScript",
	"React",
	"Next.js",
	"Node.js",
	"NestJS",
	"PostgreSQL",
	"MongoDB",
	"Docker",
	"AWS",
	"REST APIs",
	"GraphQL",
	"Tailwind CSS",
];

export const stats: Stat[] = [
	{ value: "+75%", label: "User Engagement on Talvette" },
	{ value: "99.9%", label: "Uptime on Auth System" },
	{ value: "40%", label: "Faster Load Times" },
	{ value: "<1%", label: "Email Bounce Rate" },
	{ value: "60%", label: "Faster Event Page Creation" },
];
