interface AutocompleteSuggestionsProps {
	suggestions: string[];
	visible: boolean;
}

export function AutocompleteSuggestions({ 
	suggestions, 
	visible 
}: AutocompleteSuggestionsProps) {
	if (!visible || suggestions.length === 0) {
		return null;
	}

	return (
		<div className="ml-0 md:ml-4 mt-1 text-sm">
			<div className="bg-[#161b22] border border-[#30363d] rounded-md p-2 max-w-md">
				<div className="text-gray-500 text-xs mb-1">
					Suggestions (press Tab):
				</div>
				<div className="space-y-0.5">
					{suggestions.slice(0, 5).map((suggestion, index) => (
						<div
							key={suggestion}
							className={`font-mono text-sm px-2 py-0.5 rounded ${
								index === 0
									? "text-cyan-400 bg-[#1f6feb]/20"
									: "text-gray-300"
							}`}
						>
							{suggestion}
						</div>
					))}
				</div>
				{suggestions.length > 5 && (
					<div className="text-gray-500 text-xs mt-1">
						... and {suggestions.length - 5} more
					</div>
				)}
			</div>
		</div>
	);
}
