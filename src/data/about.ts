import { profile, education } from "./site";

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

// Selector off site.ts — edit content in site.ts, not here.
const edu = education[0];

export const aboutInfo: AboutInfo = {
	name: profile.name,
	title: profile.title,
	experience: profile.experienceYears,
	location: profile.location,
	bio: profile.bio,
	whatIDo: profile.focus,
	education: {
		degree: edu.degree,
		institution: edu.institution,
		period: edu.period,
		description: edu.description,
		link: edu.url,
	},
};
