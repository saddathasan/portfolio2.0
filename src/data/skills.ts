import type { SkillCategory } from "@/shared/types";
import { skillGroups } from "./site";

// Selector off site.ts — edit skills in site.ts, not here.
export const skills: SkillCategory[] = skillGroups.map((g) => ({
	id: g.id,
	title: g.title,
	description: g.description,
	skills: g.skills.map((s) => ({
		name: s.name,
		level: s.level ?? "",
		yearsOfExperience: s.years ?? 0,
	})),
}));

export default skills;
