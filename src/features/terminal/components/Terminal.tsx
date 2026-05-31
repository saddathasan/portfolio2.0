import "@fontsource-variable/jetbrains-mono/index.css";
import { useTerminal } from "@/features/terminal/hooks/useTerminal";
import { useEffect, useRef, useState } from "react";
import { SEO } from "@/shared/seo/SEO";
import { personLd } from "@/shared/seo/jsonld";
import { BANNER } from "../banner";
import { CommandInput } from "./CommandInput";
import { OutputDisplay } from "./OutputDisplay";
import { Prompt } from "./Prompt";

const MONO = "'JetBrains Mono Variable', ui-monospace, SFMono-Regular, Menlo, monospace";

// If a visitor previously switched to the GUI, offer to take them back —
// quietly, dismissibly, and NEVER auto-redirect (protects intent + SEO).
function ReturningVisitorHint({ onOpen }: { onOpen: () => void }) {
	const [show, setShow] = useState(() => {
		try {
			return (
				localStorage.getItem("preferredMode") === "gui" &&
				sessionStorage.getItem("rv-dismissed") !== "1"
			);
		} catch {
			return false;
		}
	});
	if (!show) return null;
	const dismiss = () => {
		try {
			sessionStorage.setItem("rv-dismissed", "1");
		} catch {
			/* ignore */
		}
		setShow(false);
	};
	return (
		<div className="mb-6 flex items-center justify-between gap-3 border border-dashed border-gray-700 px-3 py-2 text-xs text-gray-400">
			<span>You were last on the visual site.</span>
			<span className="flex shrink-0 gap-4">
				<button
					type="button"
					onClick={onOpen}
					className="text-gray-200 underline decoration-gray-700 underline-offset-2 hover:decoration-gray-400"
				>
					open gui
				</button>
				<button
					type="button"
					onClick={dismiss}
					className="text-gray-500 hover:text-gray-300"
				>
					dismiss
				</button>
			</span>
		</div>
	);
}

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
		<>
		<SEO
			path="/"
			description="Saddat Hasan — Full-Stack & DevOps Engineer. A terminal-first portfolio: type 'help' to explore, or 'gui' for the visual site."
			jsonLd={personLd()}
		/>
		<div
			id="main-content"
			className="min-h-screen overflow-x-hidden overflow-y-auto cursor-text break-words bg-[#0d1117] p-4 text-gray-200 md:p-8"
			style={{ fontFamily: MONO }}
			onClick={handleContainerClick}
		>
			<ReturningVisitorHint onOpen={() => executeCommand("gui")} />

			{/* ASCII Art Banner — dim, decorative. The art is ~78 chars wide, so
			    its font-size scales with the viewport to always fit one line
			    (it would otherwise clip off-screen on phones), capped at 0.75rem
			    on desktop. */}
			<pre
				className="mb-6 select-none overflow-hidden leading-tight text-gray-700"
				style={{ fontSize: "clamp(5px, 1.85vw, 0.75rem)" }}
			>
				{BANNER}
			</pre>

			{/* Welcome + escape hatch — monochrome, quiet */}
			<div className="mb-8 text-sm md:text-base border-l border-dashed border-gray-700 pl-4">
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
						<div className="flex flex-wrap items-center gap-2 text-sm md:text-base">
							<Prompt path={entry.path} />
							<span className="break-all text-gray-100">{entry.command}</span>
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
		</>
	);
}
