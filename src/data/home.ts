import type { HeroInfo, Stat } from "@/shared/types";
import { profile, skillGroups } from "./site";

// Selector off site.ts — edit content in site.ts, not here.
export const heroInfo: HeroInfo = {
	name: profile.name,
	title: profile.title,
	location: `📍 ${profile.location}`,
	description: profile.summary,
	resumeUrl: profile.resumeUrl,
	linkedinUrl: "https://linkedin.com/in/saddathasan",
};

export const techStack: string[] = skillGroups
	.flatMap((g) => g.skills.map((s) => s.name))
	.slice(0, 12);

export const stats: Stat[] = [
	{ value: "+75%", label: "User Engagement on Talvette" },
	{ value: "40%", label: "Faster Load Times" },
	{ value: "-35%", label: "Dell Email Creation Time" },
	{ value: "-60%", label: "Microsoft Dev Time" },
];
