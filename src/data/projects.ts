import type { Project } from "@/shared/types";
import { projects as entries } from "./site";

// Selector off site.ts (shared Project shape for the terminal + legacy routes).
// Edit project content in site.ts, not here.
export const projects: Project[] = entries.map((p) => ({
	id: p.id,
	title: p.title,
	description: p.description,
	technologies: p.technologies,
	liveUrl: p.liveUrl ?? null,
	sourceUrl: p.sourceUrl ?? null,
	image: "/api/placeholder/400/250",
	impact: p.impact,
}));
