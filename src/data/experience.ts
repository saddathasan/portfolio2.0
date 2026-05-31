import { experience as companies, companyPeriod, skillGroups } from "./site";

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

// Selector off site.ts — collapses each company's promotion roles to its most
// senior role for this legacy shape (the GUI shows the full promotion history).
export const experiences: Experience[] = companies.map((c) => {
	const senior = c.roles[c.roles.length - 1];
	return {
		id: c.id,
		company: c.formerName
			? `${c.company} (formerly ${c.formerName})`
			: c.company,
		role: senior.title,
		period: companyPeriod(c) || "—",
		type: senior.type ?? "",
		achievements: senior.highlights ?? [],
		technologies: senior.technologies ?? [],
	};
});

export const skillCategories: SkillCategory[] = skillGroups.map((g) => ({
	title: g.title,
	description: g.description,
	skills: g.skills.map((s) => s.name),
}));
