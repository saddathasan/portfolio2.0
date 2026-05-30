import { forwardRef, useEffect, useRef, useState } from "react";
import {
	applySuggestion,
	completeInput,
	getAutocompleteSuggestions,
} from "@/features/terminal/lib/autocomplete";
import type { FileSystemNode } from "@/features/terminal/lib/terminal";
import { AutocompleteSuggestions } from "./AutocompleteSuggestions";
import { Prompt } from "./Prompt";

interface CommandInputProps {
	currentPath: string[];
	fileSystem: FileSystemNode;
	onCommand: (command: string) => void;
}

const HISTORY_KEY = "terminal-cmd-history";
const HISTORY_CAP = 100;

function loadHistory(): string[] {
	try {
		const raw = localStorage.getItem(HISTORY_KEY);
		return raw ? (JSON.parse(raw) as string[]) : [];
	} catch {
		return [];
	}
}

export const CommandInput = forwardRef<HTMLInputElement, CommandInputProps>(
	({ currentPath, fileSystem, onCommand }, forwardedRef) => {
		const [input, setInput] = useState("");
		const [suggestions, setSuggestions] = useState<string[]>([]);
		const [showSuggestions, setShowSuggestions] = useState(false);
		const [activeIndex, setActiveIndex] = useState(-1);
		const [cmdHistory, setCmdHistory] = useState<string[]>(loadHistory);
		const [historyIndex, setHistoryIndex] = useState(-1); // -1 = editing fresh input
		const inputRef = useRef<HTMLInputElement>(null);

		// Combine refs
		useEffect(() => {
			if (typeof forwardedRef === "function") forwardedRef(inputRef.current);
			else if (forwardedRef) forwardedRef.current = inputRef.current;
		}, [forwardedRef]);

		useEffect(() => {
			inputRef.current?.focus();
		}, []);

		// Recompute suggestions on input/path change
		useEffect(() => {
			if (input.trim()) {
				const next = getAutocompleteSuggestions(input, currentPath, fileSystem);
				setSuggestions(next);
				setShowSuggestions(next.length > 0);
			} else {
				setSuggestions([]);
				setShowSuggestions(false);
			}
			setActiveIndex(-1);
		}, [input, currentPath, fileSystem]);

		const pushHistory = (cmd: string) => {
			setCmdHistory((prev) => {
				const next = prev[prev.length - 1] === cmd ? prev : [...prev, cmd];
				const capped = next.slice(-HISTORY_CAP);
				try {
					localStorage.setItem(HISTORY_KEY, JSON.stringify(capped));
				} catch {
					/* ignore */
				}
				return capped;
			});
		};

		const submit = () => {
			onCommand(input);
			if (input.trim()) pushHistory(input.trim());
			setInput("");
			setShowSuggestions(false);
			setActiveIndex(-1);
			setHistoryIndex(-1);
			setTimeout(() => inputRef.current?.focus(), 0);
		};

		const acceptSuggestion = (index: number) => {
			const chosen = suggestions[index];
			if (!chosen) return;
			const completed = applySuggestion(input, chosen);
			setInput(completed);
			setActiveIndex(-1);
			inputRef.current?.focus();
		};

		const handleKeyDown = (e: React.KeyboardEvent) => {
			// Ctrl+L clears the screen
			if (e.key === "l" && e.ctrlKey) {
				e.preventDefault();
				onCommand("clear");
				return;
			}

			if (e.key === "Enter") {
				e.preventDefault();
				submit();
				return;
			}

			if (e.key === "Tab") {
				e.preventDefault();
				if (!suggestions.length) return;
				if (activeIndex >= 0) {
					acceptSuggestion(activeIndex);
				} else {
					setInput(completeInput(input, currentPath, fileSystem));
				}
				return;
			}

			if (e.key === "Escape") {
				if (showSuggestions) {
					e.preventDefault();
					setShowSuggestions(false);
					setActiveIndex(-1);
				}
				return;
			}

			if (e.key === "ArrowDown") {
				e.preventDefault();
				if (showSuggestions) {
					setActiveIndex((i) => (i + 1) % suggestions.length);
				} else if (historyIndex !== -1) {
					const next = historyIndex + 1;
					if (next >= cmdHistory.length) {
						setHistoryIndex(-1);
						setInput("");
					} else {
						setHistoryIndex(next);
						setInput(cmdHistory[next]);
					}
				}
				return;
			}

			if (e.key === "ArrowUp") {
				e.preventDefault();
				if (showSuggestions) {
					setActiveIndex((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
				} else if (cmdHistory.length) {
					const next = historyIndex === -1 ? cmdHistory.length - 1 : Math.max(0, historyIndex - 1);
					setHistoryIndex(next);
					setInput(cmdHistory[next]);
				}
				return;
			}
		};

		const pathString = "/" + currentPath.join("/");

		return (
			<div className="w-full">
				<div className="flex items-center gap-2 w-full text-sm md:text-base">
					<Prompt path={pathString} />
					<input
						ref={inputRef}
						type="text"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						onKeyDown={handleKeyDown}
						className="flex-1 bg-transparent border-none outline-none text-white caret-white"
						autoFocus
						spellCheck={false}
						autoComplete="off"
						autoCorrect="off"
						autoCapitalize="off"
						{...{
							// Opt out of input-hijacking extensions (Grammarly, 1Password,
							// LastPass, AI writing assistants) that wrap the field & break typing.
							"data-gramm": "false",
							"data-gramm_editor": "false",
							"data-enable-grammarly": "false",
							"data-1p-ignore": "true",
							"data-lpignore": "true",
							"data-form-type": "other",
						}}
						role="combobox"
						aria-expanded={showSuggestions}
						aria-controls="terminal-suggestions"
						aria-autocomplete="list"
						aria-activedescendant={
							activeIndex >= 0 ? `terminal-suggestion-${activeIndex}` : undefined
						}
						aria-label="Terminal command input"
					/>
				</div>

				<AutocompleteSuggestions
					suggestions={suggestions}
					visible={showSuggestions}
					activeIndex={activeIndex}
					onSelect={acceptSuggestion}
				/>
			</div>
		);
	}
);

CommandInput.displayName = "CommandInput";
