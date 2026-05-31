import { Link } from "@tanstack/react-router";
import { WorkRow } from "../primitives/WorkRow";
import { projects } from "@/data/projects";

// First clause of a description — terse, list-friendly.
const note = (description: string) => description.split(/[.—]/)[0].trim();

const featured = projects.slice(0, 4);

// Content only — Section shell applied by the registry.
export function WorkSection() {
	return (
		<>
			<ul>
				{featured.map((p) => (
					<li key={p.id}>
						<WorkRow
							title={p.title}
							note={note(p.description)}
							meta={p.impact?.split(",")[0]}
							href={p.liveUrl ?? p.sourceUrl ?? undefined}
						/>
					</li>
				))}
			</ul>
			<Link
				to="/projects"
				className="gui-link mt-6 inline-block text-[0.92rem] text-ink-muted"
			>
				All work →
			</Link>
		</>
	);
}
