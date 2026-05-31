import { aboutInfo } from "@/data/about";

// Content only — the numbered Section shell is applied by the registry
// (sections.config.tsx) so order/numbering stays data-driven.
export function AboutSection() {
	return (
		<div className="max-w-[54ch] space-y-5 text-[1.02rem] leading-[1.75] text-ink-soft">
			{aboutInfo.bio.map((paragraph) => (
				<p key={paragraph.slice(0, 24)}>{paragraph}</p>
			))}
		</div>
	);
}
