import { forwardRef, useEffect, useRef, useState } from "react";

interface CommandInputProps {
	currentPath: string[];
	onCommand: (command: string) => void;
	history?: string[]; // For future history navigation
}

export const CommandInput = forwardRef<HTMLInputElement, CommandInputProps>(
	({ currentPath, onCommand }, forwardedRef) => {
		const [input, setInput] = useState("");
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

		const handleKeyDown = (e: React.KeyboardEvent) => {
			if (e.key === "Enter") {
				onCommand(input);
				setInput("");
				// Refocus after command
				setTimeout(() => inputRef.current?.focus(), 0);
			}
		};

		const pathString =
			"~" + (currentPath.length > 0 ? "/" + currentPath.join("/") : "");

		return (
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
		);
	}
);

CommandInput.displayName = "CommandInput";
