import "./prompt.css";

interface PromptProps {
	/** Formatted absolute path, e.g. "/" or "/projects". */
	path: string;
}

interface Segment {
	label: string;
	icon?: string;
	bg: string;
	fg: string;
}

function displayPath(path: string): string {
	if (!path || path === "/") return "~";
	return "~" + path;
}

/**
 * Agnoster powerline prompt: context → path → git, with CSS-drawn arrow separators.
 * Used for both the active input line and each history entry.
 */
export function Prompt({ path }: PromptProps) {
	const segments: Segment[] = [
		{ label: "guest@saddat", icon: "❯", bg: "var(--agn-ctx-bg)", fg: "var(--agn-ctx-fg)" },
		{ label: displayPath(path), bg: "var(--agn-path-bg)", fg: "var(--agn-path-fg)" },
		{ label: "main", icon: "⎇", bg: "var(--agn-git-bg)", fg: "var(--agn-git-fg)" },
	];

	return (
		<span className="agn-prompt" aria-label={`guest@saddat ${displayPath(path)}`}>
			{segments.map((seg, i) => {
				const next = segments[i + 1];
				return (
					<span className="contents" key={i}>
						<span className="agn-seg" style={{ background: seg.bg, color: seg.fg }}>
							{seg.icon && <span className="agn-seg-icon">{seg.icon}</span>}
							{seg.label}
						</span>
						<span
							className="agn-sep"
							style={
								{
									"--agn-prev": seg.bg,
									"--agn-next": next ? next.bg : "transparent",
								} as React.CSSProperties
							}
						/>
					</span>
				);
			})}
		</span>
	);
}
