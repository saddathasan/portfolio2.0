import { education } from "@/data/site";

// Content only — Section shell applied by the registry. Dates intentionally
// omitted per design choice.
export function EducationSection() {
	return (
		<div className="space-y-6">
			{education.map((edu) => (
				<div key={edu.degree}>
					<h3 className="font-display text-[1.08rem] font-medium text-ink">
						{edu.degree}
					</h3>
					<a
						href={edu.url}
						target="_blank"
						rel="noreferrer"
						className="gui-link mt-1 inline-block text-[0.95rem] text-ink-soft"
					>
						{edu.institution}
					</a>
					<p className="mt-3 max-w-[54ch] text-[0.95rem] leading-[1.7] text-ink-muted">
						{edu.description}
					</p>
				</div>
			))}
		</div>
	);
}
