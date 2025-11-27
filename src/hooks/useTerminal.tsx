import {
	initialFileSystem,
	resolvePath,
	type TerminalState,
} from "@/lib/terminal";
import { useCallback, useEffect, useRef, useState } from "react";

export const useTerminal = () => {
	const [state, setState] = useState<TerminalState>({
		history: [],
		currentPath: [],
		fileSystem: initialFileSystem,
	});

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
			const trimmedInput = input.trim();
			if (!trimmedInput) {
				addToHistory("", "");
				return;
			}

			const [cmd, ...args] = trimmedInput.split(" ");
			const arg = args.join(" ");

			switch (cmd) {
				case "help":
					addToHistory(
						cmd,
						"Available commands: ls, cd, cat, clear, whoami, pwd, open, download, help"
					);
					break;

				case "clear":
					clearHistory();
					break;

				case "pwd":
					addToHistory(cmd, "/" + state.currentPath.join("/"));
					break;

				case "whoami":
					addToHistory(
						cmd,
						"Saddat Hasan - Software Engineer (Type 'cat about.md' for more)"
					);
					break;

				case "ls": {
					const targetPath = arg || ".";
					const { node } = resolvePath(
						state.currentPath,
						targetPath,
						state.fileSystem
					);

					if (!node) {
						addToHistory(cmd, `ls: cannot access '${targetPath}': No such file or directory`);
					} else if (node.type === "file") {
						addToHistory(cmd, node.name);
					} else {
						// We don't need getDirectoryContents if we just want names from resolved node
						const resolved = resolvePath(state.currentPath, targetPath, state.fileSystem);
						if (resolved.node && resolved.node.children) {
							const names = Object.values(resolved.node.children).map(child => {
								return child.type === 'directory' ? `${child.name}/` : child.name;
							}).join("  ");
							addToHistory(cmd, names);
						} else {
							addToHistory(cmd, "");
						}
					}
					break;
				}

				case "cd": {
					const targetPath = arg || "/";
					const { node, newPath } = resolvePath(
						state.currentPath,
						targetPath,
						state.fileSystem
					);

					if (!node) {
						addToHistory(cmd, `cd: ${targetPath}: No such file or directory`);
					} else if (node.type !== "directory") {
						addToHistory(cmd, `cd: ${targetPath}: Not a directory`);
					} else {
						setState((prev) => ({ ...prev, currentPath: newPath }));
						addToHistory(cmd, "");
					}
					break;
				}

				case "cat": {
					if (!arg) {
						addToHistory(cmd, "cat: missing operand");
						return;
					}
					const { node } = resolvePath(
						state.currentPath,
						arg,
						state.fileSystem
					);

					if (!node) {
						addToHistory(cmd, `cat: ${arg}: No such file or directory`);
					} else if (node.type === "directory") {
						addToHistory(cmd, `cat: ${arg}: Is a directory`);
					} else {
						addToHistory(cmd, node.content as unknown as string);
					}
					break;
				}
				
				case "open": {
					if (!arg) {
						addToHistory(cmd, "open: missing operand");
						return;
					}
					if (arg.startsWith("http")) {
						window.open(arg, "_blank");
						addToHistory(cmd, `Opening ${arg}...`);
					} else {
						addToHistory(cmd, `open: ${arg}: Invalid URL`);
					}
					break;
				}

				
				case "download":
				case "cv":
				case "resume": {
					// Trigger CV download
					const cvUrl = "/resume.pdf"; // You should place your resume.pdf in the public folder
					const link = document.createElement("a");
					link.href = cvUrl;
					link.download = "saddat_hasan_resume.pdf";
					document.body.appendChild(link);
					link.click();
					document.body.removeChild(link);
					addToHistory(cmd, "Downloading resume...");
					break;
				}

				case "sudo":
					addToHistory(cmd, "Permission denied: you are not the owner of this portfolio.");
					break;

				default:
					addToHistory(cmd, `${cmd}: command not found`);
			}
		},
		[state.currentPath, state.fileSystem, addToHistory, clearHistory]
	);

	// Auto-run ls on startup
	useEffect(() => {
		if (!initialized.current) {
			initialized.current = true;
			executeCommand("ls");
		}
	}, [executeCommand]);

	return {
		history: state.history,
		currentPath: state.currentPath,
		executeCommand,
	};
};
