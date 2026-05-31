import matter from "gray-matter";
import type { MDXComponents } from "mdx/types";
import readingTime from "reading-time";
import type { ComponentType } from "react";
import { frontmatterSchema, type Frontmatter } from "./schema";

/* ───────────────────────────────────────────────────────────────────────────
   Build-time blog index.

   Two globs over the same files:
   • `?raw`  → raw source, fed to gray-matter for frontmatter + word count.
   • lazy    → the compiled MDX component, loaded on demand when an article
               (GUI) or `cat` (terminal) actually renders it.

   Single source of truth: `src/blog/<category>/<slug>.mdx`. The frontmatter is
   validated by Zod at module-eval — a malformed known field throws here, which
   surfaces during `vite build` (the index is imported by prerendered routes).
   ─────────────────────────────────────────────────────────────────────────── */

export type MDXBody = ComponentType<{ components?: MDXComponents }>;

export interface Post {
	slug: string;
	/** Path of the source file, e.g. "/src/blog/general/hello-world.mdx". */
	filePath: string;
	frontmatter: Frontmatter;
	readingTime: string; // e.g. "4 min read"
	readingMinutes: number; // rounded, for the terminal "READ" column
	wordCount: number;
	/** The compiled MDX body. Eager (not lazy) so prerendered HTML carries the
	 *  real article text — Shiki ran at build time, so the body is light JSX. */
	Body: MDXBody;
}

// Both globs eager: raw source for frontmatter/word-count, compiled body for
// synchronous rendering (crawlable static HTML, no Suspense fallback in SSG).
// Vite (build) and Vitest differ on whether `?raw` yields the string or the
// module namespace, so normalise defensively.
const rawFiles = import.meta.glob("/src/blog/**/*.mdx", {
	query: "?raw",
	eager: true,
});
const bodyFiles = import.meta.glob<{ default: MDXBody }>("/src/blog/**/*.mdx", {
	eager: true,
});

const rawSource = (mod: unknown): string => {
	if (typeof mod === "string") return mod;
	if (mod && typeof mod === "object" && "default" in mod) {
		return String((mod as { default: unknown }).default ?? "");
	}
	return "";
};

// "/src/blog/devops/ci-cd.mdx" → slug "ci-cd"
const slugFromPath = (filePath: string): string =>
	filePath.split("/").pop()!.replace(/\.mdx$/, "");

function parsePost(filePath: string, raw: string): Post {
	const { data, content } = matter(raw);
	const result = frontmatterSchema.safeParse(data);
	if (!result.success) {
		const issues = result.error.issues
			.map((i) => `  • ${i.path.join(".") || "(root)"}: ${i.message}`)
			.join("\n");
		throw new Error(`Invalid frontmatter in ${filePath}:\n${issues}`);
	}
	const stats = readingTime(content);
	return {
		slug: slugFromPath(filePath),
		filePath,
		frontmatter: result.data,
		readingTime: stats.text, // "4 min read"
		readingMinutes: Math.max(1, Math.round(stats.minutes)),
		wordCount: stats.words,
		Body: bodyFiles[filePath].default,
	};
}

// Build the index once: parse, drop drafts, newest first.
export const posts: Post[] = Object.entries(rawFiles)
	.map(([filePath, raw]) => parsePost(filePath, rawSource(raw)))
	.filter((p) => !p.frontmatter.draft)
	.sort(
		(a, b) =>
			Date.parse(b.frontmatter.publishedAt) - Date.parse(a.frontmatter.publishedAt),
	);

// ── helpers ──────────────────────────────────────────────────────────────────

export const getBySlug = (slug: string): Post | undefined =>
	posts.find((p) => p.slug === slug);

export const byCategory = (category: string): Post[] =>
	posts.filter((p) => p.frontmatter.category === category);

export const byTag = (tag: string): Post[] =>
	posts.filter((p) => p.frontmatter.tags.includes(tag));

/** Distinct categories, sorted, with their post counts. */
export const categories = (): { name: string; count: number }[] => {
	const counts = new Map<string, number>();
	for (const p of posts) {
		counts.set(p.frontmatter.category, (counts.get(p.frontmatter.category) ?? 0) + 1);
	}
	return [...counts.entries()]
		.map(([name, count]) => ({ name, count }))
		.sort((a, b) => a.name.localeCompare(b.name));
};

/** Distinct tags across all posts, sorted. */
export const allTags = (): string[] =>
	[...new Set(posts.flatMap((p) => p.frontmatter.tags))].sort();

/** Posts grouped by category, categories alphabetised, posts newest-first. */
export const groupedByCategory = (): { category: string; posts: Post[] }[] =>
	categories().map(({ name }) => ({ category: name, posts: byCategory(name) }));
