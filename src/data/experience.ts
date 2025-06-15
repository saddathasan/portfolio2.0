export interface Experience {
	id: string;
	company: string;
	role: string;
	period: string;
	type: string;
	achievements: string[];
	technologies: string[];
	subExperiences?: {
		company: string;
		period: string;
		achievements: string[];
		technologies: string[];
	}[];
}

export interface SkillCategory {
	title: string;
	description: string;
	skills: string[];
}

export const experiences: Experience[] = [
	{
		id: "infinitibit",
		company: "InfinitiBit GmbH",
		role: "Software Engineer",
		period: "Feb 2025 – Present",
		type: "Full-time",
		achievements: [
			"Developed web-based enterprise solutions leveraging LLMs and AI-driven workflows to enhance decision automation",
			"Integrated agentic AI capabilities using OpenAI APIs to power dynamic task handling across modules",
			"Built scalable backend services using FastAPI and PostgreSQL with optimized REST API design",
			"Implemented CI/CD pipelines for automated testing, deployment, and rollback across multiple environments",
			"Collaborated in Agile sprints for rapid prototyping, iterative delivery, and team alignment",
		],
		technologies: [
			"React",
			"FastAPI",
			"Python",
			"OpenAI API",
			"PostgreSQL",
			"LLM",
			"Agentic AI Integration",
		],
	},
	{
		id: "talvette",
		company: "Talvette Limited",
		role: "Software Engineer",
		period: "Oct 2023 – Feb 2025",
		type: "Full-time",
		achievements: [
			"Built a recruiting platform (Next.js + NestJS + PostgreSQL) → +75% user engagement",
			"JWT authentication → 99.9% uptime",
			"REST API optimization → 40% load time reduction",
			"Agile project management",
		],
		technologies: ["Next.js", "NestJS", "PostgreSQL", "JWT", "REST API"],
	},
	{
		id: "drk-cbd",
		company: "DRK-CBD",
		role: "Software Engineer",
		period: "Apr 2023 – Oct 2023",
		type: "Freelance",
		achievements: [
			"Migrated site from Shopify to MERN stack",
			"Improved scalability and sprint efficiency",
			"QA-tested and resolved critical bugs",
		],
		technologies: ["MongoDB", "Express", "React", "Node.js", "Shopify"],
	},
	{
		id: "wunderman",
		company: "Wunderman Thompson Studios",
		role: "Web Developer",
		period: "Jan 2022 – Mar 2023",
		type: "Contract",
		achievements: ["Contracted for Dell and Microsoft projects"],
		technologies: ["Node.js", "JavaScript", "SQL", "Azure"],
		subExperiences: [
			{
				company: "Dell",
				period: "Dec 2022 – Mar 2023",
				achievements: [
					"Converted legacy data into email templates using Node.js → -35% email creation time",
					"Bash & Node cron scripts for timezone-aware delivery → <1% bounce rate",
					"SQL validators → improved CPL",
				],
				technologies: ["Node.js", "Bash", "SQL", "Email Templates"],
			},
			{
				company: "Microsoft",
				period: "Jan 2022 – Nov 2022",
				achievements: [
					"Built a data curator plugin → -60% dev time",
					"Automated email verification → -65% scheduling time",
					"Responsive pages using Azure stack",
					"Wrote custom SQL queries for campaign data integration",
				],
				technologies: [
					"Azure",
					"SQL",
					"JavaScript",
					"Email Automation",
				],
			},
		],
	},
	{
		id: "upb8",
		company: "Upb8",
		role: "Software Engineer",
		period: "Dec 2019 – Dec 2021",
		type: "Full-time",
		achievements: [
			"Built frontend UI from wireframes using JSX",
			"Used Redux for global state management",
			"Created SPAs using Next.js + Tailwind",
		],
		technologies: ["React", "JSX", "Redux", "Next.js", "Tailwind CSS"],
	},
];

export const skillCategories: SkillCategory[] = [
	{
		title: "Frontend",
		description: "Modern UI/UX development",
		skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux"],
	},
	{
		title: "Backend",
		description: "Scalable server solutions",
		skills: ["Node.js", "NestJS", "PostgreSQL", "SQL", "REST APIs"],
	},
	{
		title: "Tools & Others",
		description: "Development workflow",
		skills: ["Git", "Linux", "Figma", "Azure", "Bash"],
	},
];
