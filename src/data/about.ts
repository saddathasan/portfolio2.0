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
		"Software engineer with 5+ years of experience building scalable full-stack applications. Currently at InfinitiBit GmbH, developing AI-powered web solutions with React, FastAPI, and PostgreSQL.",
		"I've delivered solutions for startups and enterprises like Dell and Microsoft, focusing on clean architecture and robust API design.",
		"Passionate about emerging technologies, LLM integration, and contributing to open-source projects.",
	],
	whatIDo: [
		"Full-stack development with React and Next.js",
		"Backend systems with Node.js and PostgreSQL",
		"Performance optimization and scalability",
		"REST API design and authentication",
		"Enterprise solutions and project management",
	],
	education: {
		degree: "B.Sc. in Computer Science",
		institution: "BRAC University, Dhaka, Bangladesh",
		period: "2016-2020",
		description:
			"B.Sc. in Computer Science with foundation in software engineering and programming.",
		link: "https://bracu.ac.bd",
	},
};
