import { aboutInfo } from "@/data/about";
import { contactInfo } from "@/data/contact";
import { experiences } from "@/data/experience";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";

// --- Types ---

export type FileType = "file" | "directory";

export interface FileSystemNode {
	name: string;
	type: FileType;
	content?: string | object;
	children?: Record<string, FileSystemNode>;
}

export interface TerminalState {
	history: CommandHistory[];
	currentPath: string[];
	fileSystem: FileSystemNode;
}

export interface CommandHistory {
	command: string;
	output: React.ReactNode | string;
	path: string;
	timestamp: number;
}

// --- Virtual File System Construction ---

const buildProjectsDirectory = (): Record<string, FileSystemNode> => {
	const projectFiles: Record<string, FileSystemNode> = {};
	projects.forEach((project) => {
		const fileName = project.title.toLowerCase().replace(/[^a-z0-9]/g, "-") + ".md";
		projectFiles[fileName] = {
			name: fileName,
			type: "file",
			content: {
				...project,
				displayType: "project", // Custom marker for rendering
			},
		};
	});
	return projectFiles;
};

export const initialFileSystem: FileSystemNode = {
	name: "root",
	type: "directory",
	children: {
		"about.md": {
			name: "about.md",
			type: "file",
			content: {
				...aboutInfo,
				displayType: "about",
			},
		},
		"skills.json": {
			name: "skills.json",
			type: "file",
			content: skills,
		},
		"experience.json": {
			name: "experience.json",
			type: "file",
			content: experiences,
		},
		"contact.txt": {
			name: "contact.txt",
			type: "file",
			content: contactInfo,
		},
		projects: {
			name: "projects",
			type: "directory",
			children: buildProjectsDirectory(),
		},
		"README.md": {
			name: "README.md",
			type: "file",
			content: `
# Welcome to Saddat's Terminal Portfolio

Type 'help' to see available commands.
Type 'ls' to list files.
Type 'cat [filename]' to view content.
Type 'cd [directory]' to navigate.
			`.trim(),
		},
	},
};

// --- Logic Helpers ---

export const resolvePath = (
	currentPath: string[],
	targetPath: string,
	fileSystem: FileSystemNode
): { node: FileSystemNode | null; newPath: string[] } => {
	if (targetPath === "/") {
		return { node: fileSystem, newPath: [] };
	}

	const parts = targetPath.split("/").filter(Boolean);
	const tempPath = targetPath.startsWith("/") ? [] : [...currentPath];
	
	// Handle '..' and '.'
	const finalParts: string[] = [];
	for (const part of tempPath) finalParts.push(part);
	
	for (const part of parts) {
		if (part === ".") continue;
		if (part === "..") {
			finalParts.pop();
		} else {
			finalParts.push(part);
		}
	}

	// Traverse
	let currentNode = fileSystem;
	for (const part of finalParts) {
		if (currentNode.type !== "directory" || !currentNode.children?.[part]) {
			return { node: null, newPath: currentPath };
		}
		currentNode = currentNode.children[part];
	}

	return { node: currentNode, newPath: finalParts };
};

export const getDirectoryContents = (
	currentPath: string[],
	fileSystem: FileSystemNode
): FileSystemNode[] => {
	let node = fileSystem;
	for (const part of currentPath) {
		if (node.children?.[part]) {
			node = node.children[part];
		}
	}
	return node.children ? Object.values(node.children) : [];
};
