import "@fontsource-variable/jetbrains-mono/index.css";
import { useTerminal } from "@/features/terminal/hooks/useTerminal";
import { useEffect, useRef } from "react";
import { BANNER } from "../banner";
import { CommandInput } from "./CommandInput";
import { OutputDisplay } from "./OutputDisplay";
import { Prompt } from "./Prompt";

const MONO = "'JetBrains Mono Variable', ui-monospace, SFMono-Regular, Menlo, monospace";

export function Terminal() {
	const { history, currentPath, fileSystem, executeCommand } = useTerminal();
	const bottomRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	// Auto-scroll to bottom on new output
	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [history]);

	// Refocus input after every command
	useEffect(() => {
		inputRef.current?.focus();
	}, [history]);

	// Reliably focus on (re)mount — e.g. after a client-side back-navigation from
	// /git-profile — and whenever the window regains focus. rAF ensures the input
	// is painted before we focus it.
	useEffect(() => {
		const focusInput = () => inputRef.current?.focus();
		const raf = requestAnimationFrame(focusInput);
		window.addEventListener("focus", focusInput);
		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener("focus", focusInput);
		};
	}, []);

	// Focus input on click anywhere (unless the user is selecting text)
	const handleContainerClick = () => {
		const selection = window.getSelection();
		if (selection && selection.toString().length > 0) return;
		inputRef.current?.focus();
	};

	return (
		<div
			className="min-h-screen bg-[#0d1117] text-gray-200 p-4 md:p-8 overflow-y-auto cursor-text"
			style={{ fontFamily: MONO }}
			onClick={handleContainerClick}
		>
			{/* ASCII Art Banner */}
			<pre className="text-cyan-400 text-[10px] md:text-xs mb-6 leading-tight select-none">
				{BANNER}
			</pre>

			{/* Welcome + escape hatch */}
			<div className="mb-8 text-sm md:text-base border-l-2 border-cyan-500 pl-4">
				<p className="text-cyan-400 font-bold">Portfolio Terminal v2.0.0</p>
				<p className="text-gray-400">Saddat Hasan — Full-Stack &amp; DevOps Engineer</p>
				<p className="text-gray-500 text-xs mt-2">
					Type <span className="text-yellow-400">'help'</span> for commands, or{" "}
					<span className="text-yellow-400">'ls'</span> to explore.
				</p>
				<p className="text-gray-500 text-xs mt-1">
					Not a developer? Type{" "}
					<span className="text-yellow-400">'gui'</span> and press Enter for the visual site
					{" "}
					<button
						type="button"
						onClick={() => executeCommand("gui")}
						className="ml-1 px-2 py-0.5 rounded border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10 transition-colors"
					>
						[ GUI mode ]
					</button>
				</p>
			</div>

			{/* History (terminal log) */}
			<div className="space-y-2" role="log" aria-live="polite" aria-label="Terminal output">
				{history.map((entry, index) => (
					<div key={index} className="space-y-1">
						<div className="flex items-center gap-2 text-sm md:text-base">
							<Prompt path={entry.path} />
							<span className="text-gray-100">{entry.command}</span>
						</div>
						<div className="pl-0 md:pl-4">
							<OutputDisplay content={entry.output} />
						</div>
					</div>
				))}
			</div>

			{/* Active input */}
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
