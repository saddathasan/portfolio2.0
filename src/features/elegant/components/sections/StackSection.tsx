import { skills } from "@/data/skills";

// Terse stack — grouped as label + inline skill list. No badges, no soup.
// Uses the fuller skills set (incl. Cloud/DevOps + AI/ML). Content only.
export function StackSection() {
	return (
		<dl className="space-y-1">
			{skills.map((cat) => (
				<div
					key={cat.id}
					className="grid grid-cols-[8rem_1fr] items-baseline gap-x-4 gap-y-1 border-t border-line py-3.5 sm:grid-cols-[10rem_1fr]"
				>
					<dt className="text-[0.82rem] uppercase tracking-[0.12em] text-ink-muted">
						{cat.title}
					</dt>
					<dd className="text-[0.98rem] text-ink-soft">
						{cat.skills
							.map((s) => (typeof s === "string" ? s : s.name))
							.join("  ·  ")}
					</dd>
				</div>
			))}
		</dl>
	);
}
