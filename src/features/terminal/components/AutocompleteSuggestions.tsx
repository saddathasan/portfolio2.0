interface AutocompleteSuggestionsProps {
	suggestions: string[];
	visible: boolean;
	activeIndex: number;
	onSelect: (index: number) => void;
}

export function AutocompleteSuggestions({
	suggestions,
	visible,
	activeIndex,
	onSelect,
}: AutocompleteSuggestionsProps) {
	if (!visible || suggestions.length === 0) return null;

	return (
		<div className="ml-0 md:ml-4 mt-1 text-sm">
			<ul
				id="terminal-suggestions"
				role="listbox"
				aria-label="Command suggestions"
				className="bg-[#161b22] border border-[#30363d] rounded-md p-2 max-w-md space-y-0.5"
			>
				<li className="text-gray-500 text-xs mb-1 select-none" aria-hidden="true">
					Tab to complete · ↑/↓ to choose · Esc to dismiss
				</li>
				{suggestions.map((suggestion, index) => (
					<li
						key={suggestion}
						id={`terminal-suggestion-${index}`}
						role="option"
						aria-selected={index === activeIndex}
						onMouseDown={(e) => {
							// onMouseDown (not onClick) so the input doesn't blur first
							e.preventDefault();
							onSelect(index);
						}}
						className={`font-mono text-sm px-2 py-0.5 rounded cursor-pointer ${
							index === activeIndex
								? "text-cyan-300 bg-[#1f6feb]/30"
								: "text-gray-300 hover:bg-[#1f6feb]/10"
						}`}
					>
						{suggestion}
					</li>
				))}
			</ul>
		</div>
	);
}
