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
			{/* ASCII Art Banner — dim, decorative, not shouting */}
			<pre className="text-gray-700 text-[10px] md:text-xs mb-6 leading-tight select-none">
				{BANNER}
			</pre>

			{/* Welcome + escape hatch — monochrome, quiet */}
			<div className="mb-8 text-sm md:text-base border-l border-gray-800 pl-4">
				<p className="text-gray-200">Saddat Hasan</p>
				<p className="text-gray-500">Full-Stack &amp; DevOps Engineer · Dhaka</p>
				<p className="text-gray-500 text-xs mt-3">
					Type <span className="text-gray-300">help</span> for commands, or{" "}
					<span className="text-gray-300">ls</span> to explore.
				</p>
				<p className="text-gray-500 text-xs mt-1 flex items-center gap-2">
					<span>
						Not a developer? Type <span className="text-gray-300">gui</span> for the
						visual site.
					</span>
					<button
						type="button"
						onClick={() => executeCommand("gui")}
						className="px-2 py-0.5 border border-gray-700 text-gray-300 hover:border-gray-500 hover:text-gray-100 transition-colors"
					>
						gui mode
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
