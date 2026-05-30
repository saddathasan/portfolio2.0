import type { FileSystemNode } from "../lib/terminal";

/**
 * Output a command renders into the scrollback — passed to <OutputDisplay/>,
 * which renders strings, React nodes, and data objects/arrays (skills, projects…).
 * `void`/`undefined` from a command's `run` means "render nothing" (e.g. `clear`).
 */
export type TerminalOutput = unknown;

export type CommandGroup = "Navigation" | "Filesystem" | "Profile" | "System";

/** Everything a command needs to read state and cause side effects. */
export interface CommandContext {
	/** The full raw input line (e.g. `git profile`). */
	input: string;
	/** Tokens after the command name (e.g. `["profile"]`). */
	args: string[];
	/** `args` rejoined with spaces (e.g. `profile`). */
	argStr: string;
	currentPath: string[];
	fileSystem: FileSystemNode;
	/** The full command list — used by `help`. */
	commands: Command[];
	/** Past command strings, newest last — used by `history`. */
	history: string[];
	setPath: (path: string[]) => void;
	clear: () => void;
	/** Client-side router navigation (no full reload). */
	navigate: (to: string) => void;
	/** Open a URL in a new tab (resumé, external links). */
	openUrl: (url: string) => void;
}

export interface Command {
	name: string;
	description: string;
	usage?: string;
	aliases?: string[];
	group?: CommandGroup;
	/** Hidden from `help` (easter eggs) but still runnable. */
	hidden?: boolean;
	/** Return output to print, or nothing to print nothing. */
	run: (ctx: CommandContext) => TerminalOutput | void;
}
