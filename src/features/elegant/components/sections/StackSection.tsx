import { skillGroups } from "@/data/site";

// Terse stack — label + inline skill list. No badges, no soup. Content only.
export function StackSection() {
	return (
		<dl className="space-y-1">
			{skillGroups.map((group) => (
				<div
					key={group.id}
					className="grid grid-cols-[8rem_1fr] items-baseline gap-x-4 gap-y-1 border-t border-line py-3.5 sm:grid-cols-[11rem_1fr]"
				>
					<dt className="text-[0.82rem] uppercase tracking-[0.12em] text-ink-muted">
						{group.title}
					</dt>
					<dd className="text-[0.98rem] text-ink-soft">
						{group.skills.map((s) => s.name).join("  ·  ")}
					</dd>
				</div>
			))}
		</dl>
	);
}
