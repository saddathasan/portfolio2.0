import { WorkRow } from "../primitives/WorkRow";
import { projects } from "@/data/site";

// Featured projects, in lead order (Ria first). Content only — this is the
// single-page site, so there's no "all work" deep link; curate via `featured`.
const featured = projects
	.filter((p) => p.featured)
	.sort((a, b) => a.order - b.order);

export function WorkSection() {
	return (
		<ul>
			{featured.map((p) => (
				<li key={p.id}>
					<WorkRow
						title={p.title}
						note={p.tagline}
						meta={p.period ?? p.impact.split(/[,•]/)[0].trim()}
						href={p.liveUrl ?? p.sourceUrl ?? undefined}
					/>
				</li>
			))}
		</ul>
	);
}
