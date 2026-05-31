import { resolvePath } from "../lib/terminal";
import type { Command, TerminalOutput } from "../engine/types";

export const filesystemCommands: Command[] = [
	{
		name: "ls",
		description: "List directory contents",
		usage: "ls [path]",
		group: "Filesystem",
		run: ({ argStr, currentPath, fileSystem }) => {
			const target = argStr || ".";
			const { node } = resolvePath(currentPath, target, fileSystem);
			if (!node) return `ls: cannot access '${target}': No such file or directory`;
			if (node.type === "file") return node.name;
			if (!node.children) return "";
			return Object.values(node.children)
				.map((child) => (child.type === "directory" ? `${child.name}/` : child.name))
				.join("  ");
		},
	},
	{
		name: "cd",
		description: "Change directory",
		usage: "cd [path]",
		group: "Filesystem",
		run: ({ argStr, currentPath, fileSystem, setPath }) => {
			const target = argStr || "/";
			const { node, newPath } = resolvePath(currentPath, target, fileSystem);
			if (!node) return `cd: ${target}: No such file or directory`;
			if (node.type !== "directory") return `cd: ${target}: Not a directory`;
			setPath(newPath);
			return "";
		},
	},
	{
		name: "cat",
		description: "Print a file's contents",
		usage: "cat <file>",
		group: "Filesystem",
		run: ({ argStr, currentPath, fileSystem }) => {
			if (!argStr) return "cat: missing operand";
			const { node } = resolvePath(currentPath, argStr, fileSystem);
			if (!node) return `cat: ${argStr}: No such file or directory`;
			if (node.type === "directory") return `cat: ${argStr}: Is a directory`;
			return node.content as TerminalOutput;
		},
	},
	{
		name: "pwd",
		description: "Print the current directory",
		group: "Filesystem",
		run: ({ currentPath }) => "/" + currentPath.join("/"),
	},
];
