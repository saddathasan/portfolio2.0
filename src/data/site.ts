/* ═══════════════════════════════════════════════════════════════════════════
   site.ts — THE single source of truth for all profile content.

   Edit this one file and the whole portfolio (terminal + GUI) updates. The
   legacy per-domain files (about.ts, experience.ts, projects.ts, skills.ts,
   certificates.ts, contact.ts, home.ts) are now thin SELECTORS that re-shape
   this data for older consumers — don't edit those; edit here.

   Dates are stored as "YYYY-MM" strings (or "" if unknown, or null = Present).
   `formatPeriod()` renders them as e.g. "Feb 2025 – Present".
   ═══════════════════════════════════════════════════════════════════════════ */

// ── Types ────────────────────────────────────────────────────────────────────

export interface Profile {
	name: string;
	title: string;
	location: string;
	email: string;
	/** Stored for the résumé/records; intentionally NOT rendered publicly. */
	phone?: string;
	experienceYears: string;
	/** One-paragraph professional summary. */
	summary: string;
	/** Longer-form bio paragraphs for the About section. */
	bio: string[];
	/** Short "what I do" bullets. */
	focus: string[];
	resumeUrl: string;
	available: boolean;
	availabilityNote: string;
}

export interface SocialLink {
	label: string;
	href: string;
	/** Show in the GUI contact row. */
	inContact?: boolean;
}

/** A single role/title within a company — multiple = promotion history. */
export interface Role {
	title: string;
	/** "YYYY-MM" or "" if not yet filled in. */
	start: string;
	/** "YYYY-MM", or null for the current (present) role. */
	end: string | null;
	type?: string;
	highlights?: string[];
	technologies?: string[];
}

export interface Company {
	id: string;
	company: string;
	/** Previous name, e.g. "Wunderman Thompson Studios". */
	formerName?: string;
	location?: string;
	url?: string;
	/** Free-form note, e.g. "Projects: Dell & Microsoft". */
	note?: string;
	/** Ordered oldest → newest. The last entry is the current/most senior role. */
	roles: Role[];
}

export interface ProjectEntry {
	id: number;
	title: string;
	/** Short label for the compact "Selected work" list. */
	tagline: string;
	description: string;
	period?: string;
	technologies: string[];
	liveUrl?: string | null;
	sourceUrl?: string | null;
	impact: string;
	/** Appears in the GUI "Selected work" when true. */
	featured: boolean;
	/** Lower = earlier in the featured list. */
	order: number;
}

export interface SkillItem {
	name: string;
	level?: string;
	years?: number;
}

export interface SkillGroup {
	id: string;
	title: string;
	description: string;
	skills: SkillItem[];
}

export interface EducationEntry {
	degree: string;
	institution: string;
	/** "YYYY"–"YYYY" or "" — currently not rendered in the GUI. */
	period: string;
	description: string;
	url: string;
}

export interface CertificateEntry {
	name: string;
	issuer: string;
	issuingDate: string;
	credentialId?: string;
	credentialUrl?: string;
}

export interface SiteData {
	profile: Profile;
	social: SocialLink[];
	experience: Company[];
	projects: ProjectEntry[];
	skills: SkillGroup[];
	education: EducationEntry[];
	certificates: CertificateEntry[];
}

// ── Data ─────────────────────────────────────────────────────────────────────

export const siteData: SiteData = {
	profile: {
		name: "Saddat Hasan",
		title: "Full-Stack & DevOps Engineer",
		location: "Dhaka, Bangladesh",
		email: "saddathasan94@gmail.com",
		phone: "+8801737898249",
		experienceYears: "5+ Years",
		summary:
			"Full-Stack & DevOps Engineer with 5+ years of experience building scalable, cloud-native web applications using React, TypeScript, and Next.js for enterprise clients including Microsoft and Dell. Skilled in backend development with Node.js, FastAPI, and PostgreSQL, DevOps across AWS and Azure with Terraform, Docker, and GitHub Actions CI/CD, and AI product development integrating LLMs and OpenAI APIs — with a consistent focus on performance, scalable architecture, and Agile/Scrum delivery.",
		bio: [
			"I'm a full-stack & DevOps engineer with 5+ years building scalable, cloud-native web applications — React, TypeScript and Next.js on the front, Node.js, FastAPI and PostgreSQL behind them.",
			"I've delivered for enterprise clients including Microsoft and Dell, and I'm currently at InfinitiBit GmbH building AI-powered products that integrate LLMs and the OpenAI API.",
			"My focus is performance, scalable architecture, and solid DevOps — AWS and Azure infrastructure with Terraform, Docker and GitHub Actions CI/CD — delivered through Agile/Scrum.",
		],
		focus: [
			"Full-stack development with React, Next.js & TypeScript",
			"Backend services with Node.js, NestJS, FastAPI & PostgreSQL",
			"DevOps & cloud — AWS, Azure, Terraform, Docker, CI/CD",
			"AI product development — LLM & OpenAI API integration",
			"Performance optimization & scalable architecture",
		],
		resumeUrl: "/resume.pdf",
		available: true,
		availabilityNote: "Available for select work",
	},

	social: [
		{ label: "GitHub", href: "https://github.com/saddathasan", inContact: true },
		{
			label: "LinkedIn",
			href: "https://linkedin.com/in/saddathasan",
			inContact: true,
		},
		{ label: "X", href: "https://x.com/ekjongoru", inContact: true },
	],

	experience: [
		{
			id: "infinitibit",
			company: "InfinitiBit GmbH",
			location: "Remote · Dhaka",
			// Promotion history — fill the start/end dates ("YYYY-MM") when ready.
			roles: [
				{
					title: "Frontend Software Engineer",
					start: "",
					end: "",
					type: "Full-time",
				},
				{
					title: "Full-stack Engineer",
					start: "",
					end: "",
					type: "Full-time",
				},
				{
					title: "Full-stack & DevOps Engineer",
					start: "",
					end: null,
					type: "Full-time",
					highlights: [
						"Developed AI-powered web platforms using React, Next.js and TypeScript, improving load efficiency and user engagement through code splitting and performance optimization.",
						"Engineered secure RESTful backend services with Python and FastAPI, integrating LLM-based models and OpenAI APIs into scalable, production-grade products.",
						"Provisioned cloud infrastructure across AWS and Azure using Terraform (IaC) and built CI/CD pipelines with GitHub Actions and Docker, reducing deployment time and improving release reliability.",
					],
					technologies: [
						"React",
						"Next.js",
						"TypeScript",
						"Python",
						"FastAPI",
						"OpenAI API",
						"PostgreSQL",
						"AWS",
						"Azure",
						"Terraform",
						"Docker",
						"GitHub Actions",
					],
				},
			],
		},
		{
			id: "talvette",
			company: "Talvette Limited",
			location: "Remote · Dhaka",
			roles: [
				{
					title: "Software Engineer",
					start: "2023-06",
					end: "2025-01",
					type: "Full-time",
					highlights: [
						"Built and optimized a full-stack recruiting platform with Next.js, NestJS and PostgreSQL, increasing user engagement by 75% through improved UX and performance.",
						"Designed RESTful APIs, optimized SQL queries and data structures, and configured Redis caching — reducing average page load time by 40%.",
						"Drove Agile/Scrum processes (sprint planning, backlog grooming, retrospectives) for timely, high-quality releases.",
					],
					technologies: [
						"Next.js",
						"NestJS",
						"PostgreSQL",
						"REST APIs",
						"Redis",
						"SQL",
					],
				},
			],
		},
		{
			id: "wpp",
			company: "WPP Production",
			formerName: "Wunderman Thompson Studios",
			location: "Dhaka",
			note: "Projects: Dell & Microsoft",
			roles: [
				{
					title: "Web Developer",
					start: "2022-01",
					end: "2023-03",
					type: "Contract",
					highlights: [
						"Automated Dell's marketing email creation pipeline using Node.js and templating automation, reducing campaign setup time by 35%.",
						"Built Microsoft's internal data curator plugin for event management, cutting event page setup time by 60% and improving cross-team workflow.",
						"Automated QA and verification workflows, reducing scheduling overhead by 65% and improving release reliability.",
					],
					technologies: ["Node.js", "JavaScript", "SQL", "Azure"],
				},
			],
		},
		{
			id: "upb8",
			company: "Upb8",
			location: "Dhaka",
			roles: [
				{
					title: "Software Engineer",
					start: "2019-12",
					end: "2021-12",
					type: "Full-time",
					highlights: [
						"Developed and maintained a library of reusable React UI components, managing state with Redux to improve modularity and reusability.",
						"Translated Figma wireframes into responsive SPAs using Next.js and Tailwind CSS, following accessibility and performance best practices.",
					],
					technologies: ["React", "Redux", "Next.js", "Tailwind CSS"],
				},
			],
		},
	],

	projects: [
		{
			id: 1,
			title: "Ria Medic Shop — POS & ERP",
			tagline: "POS & ERP for medical retail",
			description:
				"Architected and built a full-stack POS & ERP system from scratch for a medical retail business — end-to-end UI/UX, React frontend and PostgreSQL schema design, with role-based access control, inventory management and real-time reporting dashboards.",
			period: "Nov 2024 – Present",
			technologies: ["React", "TypeScript", "PostgreSQL", "RBAC", "Node.js"],
			liveUrl: "https://riamedicshop.com",
			sourceUrl: null,
			impact: "POS, ERP, RBAC & real-time reporting dashboards",
			featured: true,
			order: 0,
		},
		{
			id: 2,
			title: "Talvette Platform",
			tagline: "Recruiting platform",
			description:
				"Job recruiting platform with JWT authentication and optimized APIs. Achieved a 75% increase in user engagement.",
			technologies: ["Next.js", "NestJS", "PostgreSQL", "JWT", "REST API"],
			liveUrl: "https://talvette.com",
			sourceUrl: null,
			impact: "+75% user engagement, 99.9% uptime",
			featured: true,
			order: 1,
		},
		{
			id: 3,
			title: "DRK-CBD Site Revamp",
			tagline: "Shopify → MERN migration",
			description:
				"Migrated an e-commerce site from Shopify to a custom MERN stack, improving scalability and performance.",
			technologies: ["MongoDB", "Express", "React", "Node.js"],
			liveUrl: "https://drk-cbd.co.uk",
			sourceUrl: null,
			impact: "Improved scalability & efficiency",
			featured: true,
			order: 2,
		},
		{
			id: 4,
			title: "Dell Email Automation",
			tagline: "Marketing email automation",
			description:
				"Automated email systems with timezone-aware delivery, reducing email creation time by 35%.",
			technologies: ["Node.js", "Bash", "SQL", "Cron Jobs"],
			liveUrl: null,
			sourceUrl: null,
			impact: "-35% email creation time, <1% bounce rate",
			featured: true,
			order: 3,
		},
		{
			id: 5,
			title: "Microsoft Event Page Toolkit",
			tagline: "Event management toolkit",
			description:
				"Data-curator plugin and email verification system that reduced development time by 60%.",
			technologies: ["Azure", "SQL", "JavaScript", "Email Automation"],
			liveUrl: null,
			sourceUrl: null,
			impact: "-60% dev time, -65% scheduling time",
			featured: false,
			order: 4,
		},
		{
			id: 6,
			title: "Portfolio (this site)",
			tagline: "Terminal + GUI portfolio",
			description:
				"Dual-mode portfolio — a terminal-first experience with an elegant GUI escape hatch. Type-safe routing, static MDX, fully static.",
			technologies: ["React", "TanStack Router", "TypeScript", "Tailwind CSS"],
			liveUrl: "https://saddathasan.dev",
			sourceUrl: "https://github.com/saddathasan/portfolio2.0",
			impact: "Terminal + GUI, single data source",
			featured: false,
			order: 5,
		},
	],

	skills: [
		{
			id: "frontend",
			title: "Frontend",
			description: "Modern UI engineering",
			skills: [
				{ name: "React", level: "Expert", years: 5 },
				{ name: "TypeScript", level: "Expert", years: 4 },
				{ name: "Next.js", level: "Advanced", years: 3 },
				{ name: "TanStack Suite", level: "Advanced", years: 2 },
				{ name: "JavaScript (ES6+)", level: "Expert", years: 6 },
				{ name: "HTML5", level: "Expert", years: 6 },
				{ name: "CSS3", level: "Expert", years: 6 },
				{ name: "Tailwind CSS", level: "Advanced", years: 3 },
			],
		},
		{
			id: "backend",
			title: "Backend",
			description: "Server-side & data",
			skills: [
				{ name: "Node.js", level: "Expert", years: 5 },
				{ name: "NestJS", level: "Advanced", years: 3 },
				{ name: "FastAPI", level: "Advanced", years: 2 },
				{ name: "Python", level: "Advanced", years: 3 },
				{ name: "PostgreSQL", level: "Advanced", years: 4 },
				{ name: "SQL", level: "Advanced", years: 4 },
				{ name: "Redis", level: "Intermediate", years: 2 },
				{ name: "REST APIs", level: "Expert", years: 5 },
			],
		},
		{
			id: "devops",
			title: "DevOps & Cloud",
			description: "Infra & delivery",
			skills: [
				{ name: "AWS", level: "Advanced", years: 3 },
				{ name: "Azure", level: "Advanced", years: 2 },
				{ name: "Docker", level: "Advanced", years: 3 },
				{ name: "Terraform", level: "Intermediate", years: 2 },
				{ name: "CI/CD (GitHub Actions)", level: "Advanced", years: 3 },
				{ name: "Bash", level: "Advanced", years: 3 },
				{ name: "IAM", level: "Intermediate", years: 2 },
				{ name: "Linux", level: "Advanced", years: 4 },
			],
		},
		{
			id: "ai",
			title: "AI & Integrations",
			description: "LLM product development",
			skills: [
				{ name: "OpenAI API", level: "Advanced", years: 2 },
				{ name: "LLM Integration", level: "Advanced", years: 2 },
				{ name: "Prompt Engineering", level: "Advanced", years: 2 },
				{ name: "Claude Code", level: "Advanced", years: 1 },
				{ name: "GitHub Copilot", level: "Advanced", years: 2 },
				{ name: "Cursor", level: "Advanced", years: 1 },
			],
		},
		{
			id: "tools",
			title: "Tools & Methods",
			description: "Workflow",
			skills: [
				{ name: "Git", level: "Expert", years: 6 },
				{ name: "Figma", level: "Intermediate", years: 3 },
				{ name: "Agile", level: "Advanced", years: 4 },
				{ name: "Scrum", level: "Advanced", years: 4 },
				{ name: "JIRA", level: "Advanced", years: 4 },
				{ name: "Code Review", level: "Advanced", years: 4 },
			],
		},
	],

	education: [
		{
			degree: "B.Sc. in Computer Science",
			institution: "BRAC University, Dhaka, Bangladesh",
			period: "2016-2020",
			description:
				"B.Sc. in Computer Science with a foundation in software engineering and programming.",
			url: "https://bracu.ac.bd",
		},
	],

	certificates: [
		{
			name: "SQL Essential Training",
			issuer: "LinkedIn",
			issuingDate: "Jul 2023",
			credentialUrl:
				"https://www.linkedin.com/learning/certificates/8377eb4f8875cf9f3e6d851b7174c7ac26bfebe586cb2dcbeeff9fae5e00ed47",
		},
		{
			name: "Prepare Data for Exploration",
			issuer: "Google · Coursera",
			issuingDate: "Jan 2023",
			credentialId: "VPQZZJDQL4LL",
			credentialUrl:
				"https://www.coursera.org/account/accomplishments/certificate/VPQZZJDQL4LL",
		},
		{
			name: "Ask Questions to Make Data-Driven Decisions",
			issuer: "Google · Coursera",
			issuingDate: "Dec 2022",
			credentialId: "JRY6N2CKEMDK",
			credentialUrl:
				"https://www.coursera.org/account/accomplishments/certificate/JRY6N2CKEMDK",
		},
		{
			name: "CSS Essential Training",
			issuer: "LinkedIn",
			issuingDate: "Nov 2022",
			credentialUrl:
				"https://www.linkedin.com/learning/certificates/2c7c2e2f90af707bb966f300d7199417ed6ad10a33c0c41514cd6e6e2df4297a",
		},
		{
			name: "HTML Essential Training",
			issuer: "LinkedIn",
			issuingDate: "Sep 2022",
			credentialUrl:
				"https://www.linkedin.com/learning/certificates/6f7123f3ebf7532e72a0111e36449bedca30be98e1a78e4ef6d7996323b406d8",
		},
		{
			name: "Foundations: Data, Data, Everywhere",
			issuer: "Google · Coursera",
			issuingDate: "Sep 2021",
			credentialId: "GPRSKXSSHBVL",
			credentialUrl:
				"https://www.coursera.org/account/accomplishments/certificate/GPRSKXSSHBVL",
		},
	],
};

// ── Helpers ──────────────────────────────────────────────────────────────────

const MONTHS = [
	"Jan", "Feb", "Mar", "Apr", "May", "Jun",
	"Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/** "2025-02" → "Feb 2025". "" → "". */
function monthYear(value: string): string {
	if (!value) return "";
	const [y, m] = value.split("-");
	const month = MONTHS[Number(m) - 1];
	return month ? `${month} ${y}` : y ?? "";
}

/**
 * Render a date range. end === null → "Present". Empty start → "" (unknown,
 * so nothing renders — e.g. the InfinitiBit roles until dates are filled in).
 */
export function formatPeriod(start: string, end: string | null): string {
	if (!start) return "";
	const tail = end === null ? "Present" : monthYear(end);
	return tail ? `${monthYear(start)} – ${tail}` : monthYear(start);
}

/** The span across all of a company's roles, e.g. "Feb 2025 – Present". */
export function companyPeriod(company: Company): string {
	const starts = company.roles.map((r) => r.start).filter(Boolean).sort();
	const hasPresent = company.roles.some((r) => r.end === null);
	const earliest = starts[0] ?? "";
	if (hasPresent) return formatPeriod(earliest, null);
	const ends = company.roles
		.map((r) => r.end)
		.filter((e): e is string => Boolean(e))
		.sort();
	const latestEnd = ends[ends.length - 1] ?? null;
	return formatPeriod(earliest, latestEnd);
}

/** Current (present) role across all companies, if any. */
export function currentRole(): { company: Company; role: Role } | null {
	for (const company of siteData.experience) {
		const role = company.roles.find((r) => r.end === null);
		if (role) return { company, role };
	}
	return null;
}

// Convenience named exports for the elegant GUI (the canonical, rich shapes).
export const profile = siteData.profile;
export const social = siteData.social;
export const experience = siteData.experience;
export const projects = siteData.projects;
export const skillGroups = siteData.skills;
export const education = siteData.education;
export const certificates = siteData.certificates;
