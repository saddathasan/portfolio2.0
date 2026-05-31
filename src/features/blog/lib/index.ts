import type { MDXComponents } from "mdx/types";
import type { ComponentType } from "react";
import { frontmatterSchema, type Frontmatter } from "./schema";

// Reading time, computed locally (~200 wpm). Done inline rather than via the
// `reading-time` package, whose index pulls a Node stream module (util.inherits)
// that Vite's dev dep-bundler can't shim. Plain whitespace word count is plenty
// for prose.
const WORDS_PER_MIN = 200;
function readingStats(content: string): { words: number; minutes: number } {
	const words = content.trim().split(/\s+/).filter(Boolean).length;
	return { words, minutes: words / WORDS_PER_MIN };
}

/* ───────────────────────────────────────────────────────────────────────────
   Build-time blog index.

   Two eager globs over the same files:
   • module → the compiled MDX body PLUS its `frontmatter` export. Frontmatter
              is parsed at build by remark-mdx-frontmatter (Node), so the
              browser never runs gray-matter (which needs Node's `Buffer`).
   • `?raw` → the raw source string, used ONLY to count words for reading time
              (no YAML parsing, no Buffer).

   Single source of truth: `src/blog/<category>/<slug>.mdx`. Frontmatter is
   validated by Zod at module-eval — a malformed known field throws here.
   ─────────────────────────────────────────────────────────────────────────── */

export type MDXBody = ComponentType<{ components?: MDXComponents }>;

interface MDXModule {
	default: MDXBody;
	frontmatter?: unknown;
}

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
const bodyFiles = import.meta.glob<MDXModule>("/src/blog/**/*.mdx", {
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

// Strip the leading `---…---` frontmatter block so it isn't counted as prose.
const stripFrontmatter = (raw: string): string =>
	raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, "");

function parsePost(filePath: string, mod: MDXModule, raw: string): Post {
	const result = frontmatterSchema.safeParse(mod.frontmatter ?? {});
	if (!result.success) {
		const issues = result.error.issues
			.map((i) => `  • ${i.path.join(".") || "(root)"}: ${i.message}`)
			.join("\n");
		throw new Error(`Invalid frontmatter in ${filePath}:\n${issues}`);
	}
	const stats = readingStats(stripFrontmatter(raw));
	const minutes = Math.max(1, Math.ceil(stats.minutes));
	return {
		slug: slugFromPath(filePath),
		filePath,
		frontmatter: result.data,
		readingTime: `${minutes} min read`,
		readingMinutes: minutes,
		wordCount: stats.words,
		Body: mod.default,
	};
}

// Build the index once: parse, drop drafts, newest first.
export const posts: Post[] = Object.entries(bodyFiles)
	.map(([filePath, mod]) => parsePost(filePath, mod, rawSource(rawFiles[filePath])))
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
