import { Link } from "@tanstack/react-router";
import { experiences, type Experience } from "@/data/experience";

// Compact career entry: company + role + period, with nested stints (e.g. the
// Dell / Microsoft work under Wunderman) shown as sub-rows. This is the shape
// the upcoming promotion model (multiple roles per company) will slot into.
function ExperienceItem({ exp }: { exp: Experience }) {
	return (
		<div className="border-t border-line py-5">
			<div className="flex items-baseline justify-between gap-4">
				<h3 className="font-display text-[1.08rem] font-medium text-ink">
					{exp.company}
				</h3>
				<span className="shrink-0 text-[0.82rem] tabular-nums text-ink-muted">
					{exp.period}
				</span>
			</div>
			<p className="mt-1 text-[0.95rem] text-ink-soft">
				{exp.role}
				<span className="text-ink-muted"> · {exp.type}</span>
			</p>

			{exp.subExperiences?.length ? (
				<ul className="mt-3 space-y-1.5 border-l border-line pl-4">
					{exp.subExperiences.map((sub) => (
						<li
							key={sub.company}
							className="flex items-baseline justify-between gap-4 text-[0.9rem]"
						>
							<span className="text-ink-soft">{sub.company}</span>
							<span className="shrink-0 tabular-nums text-ink-muted">
								{sub.period}
							</span>
						</li>
					))}
				</ul>
			) : null}
		</div>
	);
}

// Content only — Section shell applied by the registry.
export function ExperienceSection() {
	return (
		<>
			<div>
				{experiences.map((exp) => (
					<ExperienceItem key={exp.id} exp={exp} />
				))}
			</div>
			<Link
				to="/experience"
				className="gui-link mt-6 inline-block text-[0.92rem] text-ink-muted"
			>
				Full history →
			</Link>
		</>
	);
}
