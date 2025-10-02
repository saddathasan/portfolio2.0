import type { Project } from '@/types';

export const projects: Project[] = [
	{
		id: 1,
		title: "Talvette Platform",
		description:
			"Job recruiting platform with JWT authentication and optimized APIs. Achieved 75% increase in user engagement.",
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
			"Migrated e-commerce site from Shopify to custom MERN stack. Improved scalability and performance.",
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
			"Automated email systems with timezone-aware delivery. Reduced email creation time by 35%.",
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
			"Data curator plugin and email verification system. Reduced development time by 60%.",
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
			"Modern, responsive portfolio with type-safe routing and animations.",
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
