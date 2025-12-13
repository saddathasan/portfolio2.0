import { forwardRef, useEffect, useRef, useState } from "react";
import { completeInput, getAutocompleteSuggestions } from "@/lib/autocomplete";
import type { FileSystemNode } from "@/lib/terminal";
import { AutocompleteSuggestions } from "./AutocompleteSuggestions";

interface CommandInputProps {
	currentPath: string[];
	fileSystem: FileSystemNode;
	onCommand: (command: string) => void;
	history?: string[]; // For future history navigation
}

export const CommandInput = forwardRef<HTMLInputElement, CommandInputProps>(
	({ currentPath, fileSystem, onCommand }, forwardedRef) => {
		const [input, setInput] = useState("");
		const [suggestions, setSuggestions] = useState<string[]>([]);
		const [showSuggestions, setShowSuggestions] = useState(false);
		const inputRef = useRef<HTMLInputElement>(null);

		// Combine refs
		useEffect(() => {
			if (forwardedRef) {
				if (typeof forwardedRef === 'function') {
					forwardedRef(inputRef.current);
				} else {
					forwardedRef.current = inputRef.current;
				}
			}
		}, [forwardedRef]);

		useEffect(() => {
			// Auto-focus input on mount
			inputRef.current?.focus();
		}, []);

		// Update suggestions when input changes
		useEffect(() => {
			if (input.trim()) {
				const newSuggestions = getAutocompleteSuggestions(
					input,
					currentPath,
					fileSystem
				);
				setSuggestions(newSuggestions);
				setShowSuggestions(newSuggestions.length > 0);
			} else {
				setSuggestions([]);
				setShowSuggestions(false);
			}
		}, [input, currentPath, fileSystem]);

		const handleKeyDown = (e: React.KeyboardEvent) => {
			if (e.key === "Enter") {
				onCommand(input);
				setInput("");
				setShowSuggestions(false);
				// Refocus after command
				setTimeout(() => inputRef.current?.focus(), 0);
			} else if (e.key === "Tab") {
				e.preventDefault(); // Prevent default tab behavior
				
				if (suggestions.length > 0) {
					// Complete the input with the best match
					const completed = completeInput(input, currentPath, fileSystem);
					setInput(completed);
					
					// Update suggestions after completion
					const newSuggestions = getAutocompleteSuggestions(
						completed,
						currentPath,
						fileSystem
					);
					setSuggestions(newSuggestions);
					setShowSuggestions(newSuggestions.length > 0);
				}
			}
		};

		const pathString =
			"~" + (currentPath.length > 0 ? "/" + currentPath.join("/") : "");

		return (
			<div className="w-full">
				<div className="flex items-center w-full font-mono text-sm md:text-base">
					<span className="text-green-500 mr-2">
						guest@portfolio:{pathString}$
					</span>
					<input
						ref={inputRef}
						type="text"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						onKeyDown={handleKeyDown}
						onBlur={(e) => {
							// Prevent losing focus unless user explicitly clicked outside
							setTimeout(() => e.target.focus(), 0);
						}}
						className="flex-1 bg-transparent border-none outline-none text-white caret-white"
						autoFocus
						spellCheck={false}
						autoComplete="off"
					/>
				</div>
				
				<AutocompleteSuggestions 
					suggestions={suggestions}
					visible={showSuggestions}
				/>
			</div>
		);
	}
);

CommandInput.displayName = "CommandInput";

