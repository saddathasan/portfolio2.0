import { useTerminal } from "@/hooks/useTerminal";
import { useEffect, useRef } from "react";
import { CommandInput } from "./CommandInput";
import { OutputDisplay } from "./OutputDisplay";

export function Terminal() {
	const { history, currentPath, fileSystem, executeCommand } = useTerminal();
	const bottomRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	// Auto-scroll to bottom
	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [history]);

		// Refocus input after every command
	useEffect(() => {
		inputRef.current?.focus();
	}, [history]);

	// Focus input on click anywhere
	const handleContainerClick = () => {
		// Prevent focus stealing if user is selecting text
		const selection = window.getSelection();
		if (selection && selection.toString().length > 0) {
			return;
		}
		inputRef.current?.focus();
	};

	return (
		<div 
			className="min-h-screen bg-[#0d1117] text-gray-200 font-mono p-4 md:p-8 overflow-y-auto cursor-text"
			onClick={handleContainerClick}
		>
			{/* ASCII Art Banner */}
			<pre className="text-cyan-400 text-[10px] md:text-xs mb-6 leading-tight select-none">
{`
 ███████╗ █████╗ ██████╗ ██████╗  █████╗ ████████╗   ██████╗ ███████╗██╗   ██╗
 ██╔════╝██╔══██╗██╔══██╗██╔══██╗██╔══██╗╚══██╔══╝   ██╔══██╗██╔════╝██║   ██║
 ███████╗███████║██║  ██║██║  ██║███████║   ██║      ██║  ██║█████╗  ██║   ██║
 ╚════██║██╔══██║██║  ██║██║  ██║██╔══██║   ██║      ██║  ██║██╔══╝  ╚██╗ ██╔╝
 ███████║██║  ██║██████╔╝██████╔╝██║  ██║   ██║   ██╗██████╔╝███████╗ ╚████╔╝ 
 ╚══════╝╚═╝  ╚═╝╚═════╝ ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝╚═════╝ ╚══════╝  ╚═══╝  
`}
			</pre>
			
			{/* Welcome Message */}
			<div className="mb-8 text-sm md:text-base border-l-2 border-cyan-500 pl-4">
				<p className="text-cyan-400 font-bold">Portfolio Terminal v2.0.0</p>
				<p className="text-gray-400">Software Engineer | Full-Stack Developer</p>
				<p className="text-gray-500 text-xs mt-2">Type <span className="text-yellow-400">'help'</span> to see available commands or <span className="text-yellow-400">'ls'</span> to explore.</p>
			</div>

			{/* History */}
			<div className="space-y-2">
				{history.map((entry, index) => (
					<div key={index} className="space-y-1">
						<div className="flex items-center text-sm md:text-base">
							<span className="text-green-500 mr-2">
								guest@portfolio:{entry.path}$
							</span>
							<span className="text-white">{entry.command}</span>
						</div>
						<div className="pl-0 md:pl-4">
							<OutputDisplay content={entry.output} />
						</div>
					</div>
				))}
			</div>

			{/* Active Input */}
		<div className="mt-2">
			<CommandInput 
				ref={inputRef}
				currentPath={currentPath}
				fileSystem={fileSystem}
				onCommand={executeCommand} 
			/>
		</div>

			<div ref={bottomRef} />
		</div>
	);
}
