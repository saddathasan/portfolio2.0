import { filesystemCommands } from "../commands/filesystem";
import { infoCommands } from "../commands/info";
import { navigationCommands } from "../commands/navigation";
import { systemCommands } from "../commands/system";
import type { Command } from "./types";

/** The single source of truth for every terminal command. Add a command = add it to a group file. */
export const commands: Command[] = [
	...navigationCommands,
	...infoCommands,
	...filesystemCommands,
	...systemCommands,
];

const lookup = new Map<string, Command>();
for (const cmd of commands) {
	lookup.set(cmd.name, cmd);
	for (const alias of cmd.aliases ?? []) lookup.set(alias, cmd);
}

/** Resolve a command by name or alias. */
export function findCommand(name: string): Command | undefined {
	return lookup.get(name);
}

/** All invokable names (primary + aliases), excluding hidden — used for autocomplete. */
export const commandNames: string[] = commands
	.filter((c) => !c.hidden)
	.flatMap((c) => [c.name, ...(c.aliases ?? [])]);
