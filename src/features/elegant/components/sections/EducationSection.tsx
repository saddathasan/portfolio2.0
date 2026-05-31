import { aboutInfo } from "@/data/about";

// Content only — Section shell applied by the registry.
export function EducationSection() {
	const { education } = aboutInfo;
	return (
		<div className="border-t border-line py-5">
			<div className="flex items-baseline justify-between gap-4">
				<h3 className="font-display text-[1.08rem] font-medium text-ink">
					{education.degree}
				</h3>
				<span className="shrink-0 text-[0.82rem] tabular-nums text-ink-muted">
					{education.period}
				</span>
			</div>
			<a
				href={education.link}
				target="_blank"
				rel="noreferrer"
				className="gui-link mt-1 inline-block text-[0.95rem] text-ink-soft"
			>
				{education.institution}
			</a>
			<p className="mt-3 max-w-[54ch] text-[0.95rem] leading-[1.7] text-ink-muted">
				{education.description}
			</p>
		</div>
	);
}
