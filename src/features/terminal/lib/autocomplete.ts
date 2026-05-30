import type { FileSystemNode } from "./terminal";

// Available terminal commands
export const AVAILABLE_COMMANDS = [
	"help",
	"ls",
	"cd",
	"cat",
	"clear",
	"whoami",
	"pwd",
	"open",
	"download",
	"cv",
	"resume",
	"sudo",
] as const;

export type TerminalCommand = typeof AVAILABLE_COMMANDS[number];

/**
 * Get command suggestions based on partial input
 */
export function getCommandSuggestions(partialCommand: string): string[] {
	if (!partialCommand) return [];
	
	const lower = partialCommand.toLowerCase();
	return AVAILABLE_COMMANDS.filter(cmd => cmd.startsWith(lower));
}

/**
 * Get the current directory's children names
 */
function getDirectoryChildren(
	currentPath: string[],
	fileSystem: FileSystemNode
): string[] {
	let node = fileSystem;
	
	// Navigate to current path
	for (const part of currentPath) {
		if (node.children?.[part]) {
			node = node.children[part];
		} else {
			return [];
		}
	}
	
	// Return children names
	if (node.type === "directory" && node.children) {
		return Object.keys(node.children);
	}
	
	return [];
}

/**
 * Get path suggestions for commands that take file/directory arguments
 */
export function getPathSuggestions(
	partialPath: string,
	currentPath: string[],
	fileSystem: FileSystemNode
): string[] {
	if (!partialPath) {
		// Return all items in current directory
		return getDirectoryChildren(currentPath, fileSystem);
	}
	
	const lower = partialPath.toLowerCase();
	const children = getDirectoryChildren(currentPath, fileSystem);
	
	return children.filter(name => name.toLowerCase().startsWith(lower));
}

/**
 * Parse input to determine what kind of autocomplete to provide
 */
export function parseInputForAutocomplete(input: string): {
	type: "command" | "path" | "none";
	partial: string;
	command?: string;
} {
	const trimmed = input.trim();
	if (!trimmed) return { type: "none", partial: "" };
	
	const parts = trimmed.split(" ");
	
	// If only one part, autocomplete command
	if (parts.length === 1) {
		return { type: "command", partial: parts[0] };
	}
	
	// If multiple parts, check if first part is a command that takes paths
	const command = parts[0];
	const pathCommands = ["cd", "cat", "ls"];
	
	if (pathCommands.includes(command)) {
		// Get the last part as the partial path
		const partialPath = parts.slice(1).join(" ");
		return { type: "path", partial: partialPath, command };
	}
	
	return { type: "none", partial: "" };
}

/**
 * Get autocomplete suggestions based on current input
 */
export function getAutocompleteSuggestions(
	input: string,
	currentPath: string[],
	fileSystem: FileSystemNode
): string[] {
	const parsed = parseInputForAutocomplete(input);
	
	switch (parsed.type) {
		case "command":
			return getCommandSuggestions(parsed.partial);
		
		case "path":
			return getPathSuggestions(parsed.partial, currentPath, fileSystem);
		
		default:
			return [];
	}
}

/**
 * Complete the input with the best suggestion
 */
export function completeInput(
	input: string,
	currentPath: string[],
	fileSystem: FileSystemNode
): string {
	const parsed = parseInputForAutocomplete(input);
	const suggestions = getAutocompleteSuggestions(input, currentPath, fileSystem);
	
	if (suggestions.length === 0) return input;
	
	// If there's exactly one suggestion, use it
	if (suggestions.length === 1) {
		const suggestion = suggestions[0];
		
		if (parsed.type === "command") {
			return suggestion;
		} else if (parsed.type === "path" && parsed.command) {
			return `${parsed.command} ${suggestion}`;
		}
	}
	
	// If there are multiple suggestions, find common prefix
	if (suggestions.length > 1) {
		const commonPrefix = findCommonPrefix(suggestions);
		
		if (parsed.type === "command") {
			return commonPrefix;
		} else if (parsed.type === "path" && parsed.command) {
			return `${parsed.command} ${commonPrefix}`;
		}
	}
	
	return input;
}

/**
 * Find the longest common prefix among strings
 */
function findCommonPrefix(strings: string[]): string {
	if (strings.length === 0) return "";
	if (strings.length === 1) return strings[0];
	
	let prefix = strings[0];
	
	for (let i = 1; i < strings.length; i++) {
		while (!strings[i].startsWith(prefix)) {
			prefix = prefix.slice(0, -1);
			if (prefix === "") return "";
		}
	}
	
	return prefix;
}
