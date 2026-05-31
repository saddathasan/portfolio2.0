import { aboutInfo } from "@/data/about";
import { skills } from "@/data/skills";
import { experiences } from "@/data/experience";
import { projects } from "@/data/projects";
import { contactInfo } from "@/data/contact";
import type { Command } from "../engine/types";

const EMAIL = "saddathasan94@gmail.com";

export const infoCommands: Command[] = [
	{
		name: "about",
		description: "Who I am",
		group: "Profile",
		run: () => ({ ...aboutInfo, displayType: "about" }),
	},
	{
		name: "whoami",
		description: "Short one-liner",
		group: "Profile",
		run: () => `${aboutInfo.name} — ${aboutInfo.title} (type 'about' for more)`,
	},
	{
		name: "skills",
		description: "Technical skills",
		group: "Profile",
		run: () => skills,
	},
	{
		name: "experience",
		description: "Work history",
		group: "Profile",
		run: () => experiences,
	},
	{
		name: "projects",
		description: "List projects, or open one: projects <name>",
		usage: "projects [name]",
		group: "Profile",
		run: ({ argStr }) => {
			if (!argStr) {
				return (
					"Projects:\n" +
					projects.map((p) => `  • ${p.title}`).join("\n") +
					"\n\nType 'projects <name>' for details."
				);
			}
			const match = projects.find((p) =>
				p.title.toLowerCase().includes(argStr.toLowerCase())
			);
			return match
				? { ...match, displayType: "project" }
				: `projects: '${argStr}' not found (type 'projects' to list)`;
		},
	},
	{
		name: "contact",
		description: "How to reach me",
		group: "Profile",
		run: () =>
			contactInfo
				.map((c) => `  ${c.title.padEnd(10)} ${c.content}`)
				.join("\n") + "\n\nType 'email' to compose a message.",
	},
	{
		name: "email",
		description: "Open your mail client to email me",
		group: "Profile",
		run: ({ openUrl }) => {
			openUrl(`mailto:${EMAIL}`);
			return `Opening your mail client to ${EMAIL}…`;
		},
	},
	{
		name: "social",
		description: "Social links",
		group: "Profile",
		run: () =>
			[
				"  GitHub    https://github.com/saddathasan",
				"  LinkedIn  https://linkedin.com/in/saddathasan",
				"  X         https://x.com/ekjongoru",
			].join("\n"),
	},
];
