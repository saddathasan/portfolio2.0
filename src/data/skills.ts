import type { SkillCategory } from "@/types";

export const skills: SkillCategory[] = [
	{
		id: "frontend",
		title: "Frontend Development",
		description: "Modern frontend technologies and frameworks",
		skills: [
			{ name: "React", level: "Expert", yearsOfExperience: 5 },
			{ name: "TypeScript", level: "Expert", yearsOfExperience: 4 },
			{ name: "Next.js", level: "Advanced", yearsOfExperience: 3 },
			{ name: "JavaScript", level: "Expert", yearsOfExperience: 6 },
			{ name: "HTML5", level: "Expert", yearsOfExperience: 6 },
			{ name: "CSS3", level: "Expert", yearsOfExperience: 6 },
			{ name: "Tailwind CSS", level: "Advanced", yearsOfExperience: 3 },
			{
				name: "Framer Motion",
				level: "Intermediate",
				yearsOfExperience: 2,
			},
		],
	},
	{
		id: "backend",
		title: "Backend Development",
		description: "Server-side technologies and APIs",
		skills: [
			{ name: "Node.js", level: "Expert", yearsOfExperience: 5 },
			{ name: "NestJS", level: "Advanced", yearsOfExperience: 3 },
			{ name: "FastAPI", level: "Advanced", yearsOfExperience: 2 },
			{ name: "PostgreSQL", level: "Advanced", yearsOfExperience: 4 },
			{ name: "MongoDB", level: "Intermediate", yearsOfExperience: 3 },
			{ name: "Redis", level: "Intermediate", yearsOfExperience: 2 },
			{ name: "REST APIs", level: "Expert", yearsOfExperience: 5 },
			{ name: "GraphQL", level: "Intermediate", yearsOfExperience: 2 },
		],
	},
	{
		id: "cloud",
		title: "Cloud & DevOps",
		description: "Cloud platforms and deployment technologies",
		skills: [
			{ name: "AWS", level: "Advanced", yearsOfExperience: 3 },
			{ name: "Docker", level: "Advanced", yearsOfExperience: 3 },
			{ name: "Kubernetes", level: "Intermediate", yearsOfExperience: 2 },
			{ name: "CI/CD", level: "Advanced", yearsOfExperience: 3 },
			{ name: "GitHub Actions", level: "Advanced", yearsOfExperience: 2 },
			{ name: "Vercel", level: "Advanced", yearsOfExperience: 2 },
			{ name: "Nginx", level: "Intermediate", yearsOfExperience: 2 },
		],
	},
	{
		id: "ai",
		title: "AI & Machine Learning",
		description: "Artificial intelligence and ML technologies",
		skills: [
			{ name: "OpenAI APIs", level: "Advanced", yearsOfExperience: 2 },
			{ name: "LangChain", level: "Intermediate", yearsOfExperience: 1 },
			{ name: "Python", level: "Advanced", yearsOfExperience: 3 },
			{ name: "TensorFlow", level: "Beginner", yearsOfExperience: 1 },
			{
				name: "Prompt Engineering",
				level: "Advanced",
				yearsOfExperience: 2,
			},
		],
	},
	{
		id: "tools",
		title: "Tools & Technologies",
		description: "Development tools and productivity software",
		skills: [
			{ name: "Git", level: "Expert", yearsOfExperience: 6 },
			{ name: "VS Code", level: "Expert", yearsOfExperience: 5 },
			{ name: "Figma", level: "Intermediate", yearsOfExperience: 3 },
			{ name: "Postman", level: "Advanced", yearsOfExperience: 4 },
			{ name: "Jira", level: "Advanced", yearsOfExperience: 4 },
			{ name: "Slack", level: "Expert", yearsOfExperience: 5 },
		],
	},
];

export default skills;
