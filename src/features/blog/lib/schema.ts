import { z } from "zod";

/* ───────────────────────────────────────────────────────────────────────────
   Blog frontmatter schema.

   `.passthrough()` is deliberate (master plan §17): known fields are validated
   so a malformed one fails the BUILD (not production), while unknown fields
   pass through untouched — you can add/remove frontmatter freely, and promoting
   a field to "first-class" (validated + wired into UI/SEO) is a one-line change.
   ─────────────────────────────────────────────────────────────────────────── */

// ISO date — accepts "YYYY-MM-DD"; rejects anything Date can't parse.
const isoDate = z
	.string()
	.refine((s) => !Number.isNaN(Date.parse(s)), {
		message: "must be an ISO date, e.g. 2026-05-31",
	});

export const frontmatterSchema = z
	// looseObject = Zod 4's passthrough: unknown keys are kept, not stripped.
	.looseObject({
		title: z.string().min(1),
		description: z.string().min(1).max(200),
		publishedAt: isoDate,
		updatedAt: isoDate.optional(),
		category: z.string().min(1).default("general"),
		tags: z.array(z.string()).default([]),
		draft: z.boolean().default(false),
		cover: z.string().optional(),
		coverAlt: z.string().optional(),
		canonical: z.url().optional(),
	})
	// cover ⇒ coverAlt (a11y): if there's a hero image it must have alt text.
	.refine((fm) => !fm.cover || (fm.coverAlt && fm.coverAlt.length > 0), {
		message: "coverAlt is required when cover is set",
		path: ["coverAlt"],
	});

export type Frontmatter = z.infer<typeof frontmatterSchema>;
