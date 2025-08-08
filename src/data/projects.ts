import type { Project } from '@/types';

export const projects: Project[] = [
	{
		id: 1,
		title: "Talvette Platform",
		description:
			"A comprehensive job/recruiting platform built with modern technologies. Features JWT authentication, optimized REST APIs, and maintains 99.9% uptime. Achieved 75% increase in user engagement through performance optimizations.",
		technologies: ["Next.js", "NestJS", "PostgreSQL", "JWT", "REST API"],
		liveUrl: "https://talvette.com",
		sourceUrl: null,
		image: "/api/placeholder/400/250",
		impact: "+75% user engagement, 99.9% uptime",
	},
	{
		id: 2,
		title: "DRK-CBD Site Revamp",
		description:
			"Successfully migrated an e-commerce site from Shopify to a custom MERN stack solution. Improved scalability, sprint efficiency, and resolved critical bugs through comprehensive QA testing.",
		technologies: [
			"MongoDB",
			"Express",
			"React",
			"Node.js",
			"Shopify Migration",
		],
		liveUrl: "https://drk-cbd.co.uk",
		sourceUrl: null,
		image: "/api/placeholder/400/250",
		impact: "Improved scalability & efficiency",
	},
	{
		id: 3,
		title: "Dell Email Automation",
		description:
			"Developed automated email systems with timezone-aware delivery using Node.js and Bash scripts. Created SQL validators that improved campaign performance and reduced email creation time by 35%.",
		technologies: [
			"Node.js",
			"Bash",
			"SQL",
			"Email Templates",
			"Cron Jobs",
		],
		liveUrl: null,
		sourceUrl: null,
		image: "/api/placeholder/400/250",
		impact: "-35% email creation time, <1% bounce rate",
	},
	{
		id: 4,
		title: "Microsoft Event Page Toolkit",
		description:
			"Built a comprehensive data curator plugin and automated email verification system. Developed rapid-deploy components using Microsoft Azure stack, reducing development time by 60%.",
		technologies: [
			"Microsoft Azure",
			"SQL",
			"JavaScript",
			"Email Automation",
		],
		liveUrl: null,
		sourceUrl: null,
		image: "/api/placeholder/400/250",
		impact: "-60% dev time, -65% scheduling time",
	},
	{
		id: 5,
		title: "Current Portfolio Site",
		description:
			"A modern, responsive portfolio website built with cutting-edge React technologies. Features type-safe routing, beautiful animations, and dark/light mode support.",
		technologies: [
			"React",
			"TanStack Router",
			"Tailwind CSS",
			"TypeScript",
			"shadcn/ui",
			"Framer Motion",
		],
		liveUrl: "https://saddathasan.vercel.app",
		sourceUrl: "https://github.com/saddathasan/portfolio",
		image: "/api/placeholder/400/250",
		impact: "Modern tech stack showcase",
	},
];
