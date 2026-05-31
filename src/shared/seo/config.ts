import { profile, social } from "@/data/site";

/* Canonical site identity for SEO — one place for the base URL, defaults, and
   social handles. Used by <SEO> (runtime meta) and the build-time sitemap/RSS
   generator, so they never drift. */

export const SITE = {
	url: "https://saddathasan.dev",
	name: profile.name,
	title: `${profile.name} — ${profile.title}`,
	description: profile.summary,
	// Branded 1200×630 social card (public/og.png — editorial warm-paper card
	// generated to match the GUI). Per-post overrides flow through SEO `image`.
	ogImage: "/og.png",
	twitter: "@ekjongoru",
	locale: "en_US",
	author: profile.name,
	sameAs: social.map((s) => s.href),
} as const;

// Absolute URL for a site-relative path ("/blog" → "https://…/blog").
export const absUrl = (path: string): string =>
	path.startsWith("http") ? path : `${SITE.url}${path.startsWith("/") ? "" : "/"}${path}`;
