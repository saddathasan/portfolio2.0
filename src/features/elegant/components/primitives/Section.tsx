import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

interface SectionProps {
	id: string;
	/** Two-digit section marker, e.g. "01". */
	index: string;
	title: string;
	children: ReactNode;
}

// Section shell: a hairline top rule, a numbered eyebrow ("01 — About"),
// consistent vertical rhythm, and an anchor target offset for the sticky bar.
// The whole section reveals on scroll.
export function Section({ id, index, title, children }: SectionProps) {
	return (
		<section
			id={id}
			className="scroll-mt-24 border-t border-line py-16 md:py-20"
		>
			<Reveal>
				<p className="mb-9 flex items-baseline gap-3 text-[0.72rem] font-medium uppercase tracking-[0.18em]">
					<span className="text-ink-muted tabular-nums">{index}</span>
					<span className="text-ink-soft">{title}</span>
				</p>
				{children}
			</Reveal>
		</section>
	);
}
