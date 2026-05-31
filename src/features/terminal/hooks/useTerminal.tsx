import { useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { initialFileSystem, type TerminalState } from "@/features/terminal/lib/terminal";
import { commands, findCommand } from "@/features/terminal/engine/registry";
import type { CommandContext } from "@/features/terminal/engine/types";

export const useTerminal = () => {
	const [state, setState] = useState<TerminalState>({
		history: [],
		currentPath: [],
		fileSystem: initialFileSystem,
	});

	const routerNavigate = useNavigate();
	const initialized = useRef(false);

	const addToHistory = useCallback(
		(command: string, output: React.ReactNode | string) => {
			setState((prev) => ({
				...prev,
				history: [
					...prev.history,
					{
						command,
						output,
						path: "/" + prev.currentPath.join("/"),
						timestamp: Date.now(),
					},
				],
			}));
		},
		[]
	);

	const clearHistory = useCallback(() => {
		setState((prev) => ({ ...prev, history: [] }));
	}, []);

	const executeCommand = useCallback(
		(input: string) => {
			const trimmed = input.trim();
			if (!trimmed) {
				addToHistory("", "");
				return;
			}

			const [name, ...args] = trimmed.split(/\s+/);
			const command = findCommand(name);

			if (!command) {
				addToHistory(trimmed, `${name}: command not found (type 'help')`);
				return;
			}

			const ctx: CommandContext = {
				input: trimmed,
				args,
				argStr: args.join(" "),
				currentPath: state.currentPath,
				fileSystem: state.fileSystem,
				commands,
				history: state.history.map((h) => h.command).filter(Boolean),
				setPath: (path) => setState((prev) => ({ ...prev, currentPath: path })),
				clear: clearHistory,
				navigate: (to) => routerNavigate({ to: to as never }),
				openUrl: (url) => window.open(url, "_blank", "noopener,noreferrer"),
			};

			const output = command.run(ctx);
			// `undefined` => render nothing (e.g. `clear`). Everything else (incl. "") prints.
			if (output !== undefined) {
				addToHistory(trimmed, output as React.ReactNode);
			}
		},
		[
			state.currentPath,
			state.fileSystem,
			state.history,
			addToHistory,
			clearHistory,
			routerNavigate,
		]
	);

	// Auto-run `ls` on first mount.
	useEffect(() => {
		if (!initialized.current) {
			initialized.current = true;
			executeCommand("ls");
		}
	}, [executeCommand]);

	return {
		history: state.history,
		currentPath: state.currentPath,
		fileSystem: state.fileSystem,
		executeCommand,
	};
};
