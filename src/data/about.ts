export interface Education {
	degree: string;
	institution: string;
	period: string;
	description: string;
	link: string;
}

export interface AboutInfo {
	name: string;
	title: string;
	experience: string;
	location: string;
	bio: string[];
	whatIDo: string[];
	education: Education;
}

export const aboutInfo: AboutInfo = {
	name: "Saddat Hasan",
	title: "Software Engineer",
	experience: "5+ Years Experience",
	location: "Dhaka, Bangladesh",
	bio: [
		"I'm Saddat Hasan, a software engineer with over 5+ years of experience developing scalable full-stack applications and enterprise-grade platforms. I currently work at InfinitiBit GmbH, where I build AI-powered web solutions using React, FastAPI, PostgreSQL, and large language models integrated via OpenAI APIs.",
		"Throughout my career, I've delivered impactful solutions for both startups and global enterprises like Dell and Microsoft—ranging from increasing user engagement by 75% to engineering systems with 99.9% uptime. My strengths lie in clean architecture, robust API design, and integrating AI-driven automation into modern web platforms.",
		"Outside of coding, I enjoy exploring emerging technologies, experimenting with LLM and agentic AI workflows, and contributing to open-source projects. I'm always learning, adapting, and pushing the boundaries of what technology can do.",
	],
	whatIDo: [
		"Full-stack development with React, Next.js, and NestJS",
		"Backend systems with Node.js and PostgreSQL",
		"Performance optimization and scalability improvements",
		"REST API design and authentication systems",
		"Enterprise client solutions and agile project management",
	],
	education: {
		degree: "B.Sc. in Computer Science",
		institution: "BRAC University, Dhaka, Bangladesh",
		period: "2016-2020",
		description:
			"Graduated with a comprehensive foundation in computer science fundamentals, software engineering principles, and practical programming experience.",
		link: "https://bracu.ac.bd",
	},
};
