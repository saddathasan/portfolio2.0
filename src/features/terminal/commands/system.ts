import { BANNER } from "../banner";
import type { Command, CommandGroup } from "../engine/types";

const GROUP_ORDER: CommandGroup[] = ["Navigation", "Profile", "Filesystem", "System"];

export const systemCommands: Command[] = [
	{
		name: "help",
		description: "List available commands",
		group: "System",
		run: ({ commands }) => {
			const byGroup = new Map<string, Command[]>();
			for (const cmd of commands) {
				if (cmd.hidden) continue;
				const g = cmd.group ?? "System";
				if (!byGroup.has(g)) byGroup.set(g, []);
				byGroup.get(g)!.push(cmd);
			}
			const groups = [...byGroup.keys()].sort(
				(a, b) => GROUP_ORDER.indexOf(a as CommandGroup) - GROUP_ORDER.indexOf(b as CommandGroup)
			);
			let out = "";
			for (const g of groups) {
				out += `\n${g.toUpperCase()}\n`;
				for (const cmd of byGroup.get(g)!) {
					out += `  ${cmd.name.padEnd(12)} ${cmd.description}\n`;
				}
			}
			out += "\nTip: Tab autocompletes · ↑/↓ recalls history · ⌘K / Ctrl+K opens the palette";
			return out.trimStart();
		},
	},
	{
		name: "clear",
		description: "Clear the screen (Ctrl+L)",
		group: "System",
		run: ({ clear }) => {
			clear();
		},
	},
	{
		name: "banner",
		description: "Reprint the banner",
		group: "System",
		run: () => BANNER,
	},
	{
		name: "history",
		description: "Show command history",
		group: "System",
		run: ({ history }) =>
			history.length
				? history.map((h, i) => `  ${String(i + 1).padStart(3)}  ${h}`).join("\n")
				: "No history yet.",
	},
	{
		name: "resume",
		description: "Open my résumé (PDF, new tab)",
		aliases: ["cv"],
		group: "Profile",
		run: ({ openUrl }) => {
			openUrl("/resume.pdf");
			return "Opening résumé in a new tab…";
		},
	},
	{
		name: "open",
		description: "Open a URL in a new tab",
		usage: "open <url>",
		group: "System",
		run: ({ argStr, openUrl }) => {
			if (!argStr) return "open: missing operand";
			if (argStr.startsWith("http") || argStr.startsWith("/")) {
				openUrl(argStr);
				return `Opening ${argStr}…`;
			}
			return `open: ${argStr}: invalid URL`;
		},
	},
	{
		name: "echo",
		description: "Print text",
		usage: "echo <text>",
		group: "System",
		run: ({ argStr }) => argStr,
	},
	{
		name: "sudo",
		description: "Try it",
		group: "System",
		hidden: true,
		run: () => "Permission denied: you are not the owner of this portfolio. 🔒",
	},
];
