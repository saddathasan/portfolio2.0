export interface HeroInfo {
	name: string;
	title: string;
	location: string;
	description: string;
	resumeUrl: string;
	linkedinUrl: string;
}

export interface Stat {
	value: string;
	label: string;
}

export const heroInfo: HeroInfo = {
	name: "Saddat Hasan",
	title: "Software Engineer",
	location: "📍 Dhaka, Bangladesh",
	description:
		"Building scalable frontend and backend systems with 4+ years of experience. Passionate about performance optimization and clean architecture.",
	resumeUrl: "/resume.pdf",
	linkedinUrl: "https://linkedin.com/in/saddathasan",
};

export const techStack: string[] = [
	"JavaScript (ES6)",
	"TypeScript",
	"React",
	"Node.js",
	"NestJS",
	"PostgreSQL",
	"SQL",
	"Redux",
	"Tanstack Query",
	"Tanstack Router",
	"Tailwind CSS",
	"HTML5",
	"CSS3",
	"REST APIs",
	"Git",
	"Figma",
	"Linux",
	"CI/CD",
	"Performance Optimization",
	"Clean Architecture",
	"Agile Methodologies",
	"LLM Integration",
	"Agentic AI",
	"WebSockets",
];

export const stats: Stat[] = [
	{ value: "+75%", label: "User Engagement on Talvette" },
	{ value: "99.9%", label: "Uptime on Auth System" },
	{ value: "40%", label: "Faster Load Times" },
	{ value: "<1%", label: "Email Bounce Rate" },
	{ value: "60%", label: "Faster Event Page Creation" },
];
