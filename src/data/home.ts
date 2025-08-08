import type { HeroInfo, Stat } from '@/types';

export const heroInfo: HeroInfo = {
	name: "Saddat Hasan",
	title: "Full-Stack Engineer",
	location: "📍 Dhaka, Bangladesh",
	description:
		"Crafting exceptional digital experiences with cutting-edge technologies. Specializing in scalable full-stack solutions, performance optimization, and modern architecture patterns. Passionate about building products that make a difference.",
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
	"Redis",
	"GraphQL",
	"REST APIs",
	"Docker",
	"AWS",
	"Kubernetes",
	"Microservices",
	"Tailwind CSS",
	"Framer Motion",
	"Prisma",
	"tRPC",
	"Zustand",
	"React Query",
	"WebSockets",
	"CI/CD",
	"Testing (Jest/Cypress)",
	"Performance Optimization",
	"System Design",
	"AI/ML Integration",
	"DevOps",
	"Agile/Scrum",
];

export const stats: Stat[] = [
	{ value: "+75%", label: "User Engagement on Talvette" },
	{ value: "99.9%", label: "Uptime on Auth System" },
	{ value: "40%", label: "Faster Load Times" },
	{ value: "<1%", label: "Email Bounce Rate" },
	{ value: "60%", label: "Faster Event Page Creation" },
];
