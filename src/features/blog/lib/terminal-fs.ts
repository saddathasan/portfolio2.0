import type { FileSystemNode } from "@/features/terminal/lib/terminal";
import { posts, type MDXBody } from "./index";

/* ───────────────────────────────────────────────────────────────────────────
   Mount the blog into the terminal's virtual filesystem.

   Posts become real FS nodes under /blog, categories are subdirectories — so
   `ls`, `cd`, `cat` and path autocomplete all work on them "for free" (the
   resolver operates on generic nodes). The SAME compiled MDX body that the GUI
   article renders is carried on each file node; the terminal just hands it a
   different component map (see terminal-mdx-components).

   Two display markers, in the existing OutputDisplay convention (about/project):
   • blog-listing → a TUI table (what `ls /blog` / a category prints)
   • blog-post    → a fully-rendered post (what `cat <slug>` prints)
   ─────────────────────────────────────────────────────────────────────────── */

export interface BlogListingRow {
	date: string; // "2026-05-31"
	category: string;
	read: string; // "4 min"
	title: string;
	slug: string;
}

export interface BlogListingPayload {
	displayType: "blog-listing";
	heading: string; // "/blog" or "/blog/<category>"
	rows: BlogListingRow[];
}

export interface BlogPostPayload {
	displayType: "blog-post";
	title: string;
	category: string;
	slug: string;
	date: string;
	updated?: string;
	read: string;
	tags: string[];
	Body: MDXBody;
}

const rowFor = (p: (typeof posts)[number]): BlogListingRow => ({
	date: p.frontmatter.publishedAt.slice(0, 10),
	category: p.frontmatter.category,
	read: `${p.readingMinutes} min`,
	title: p.frontmatter.title,
	slug: p.slug,
});

const fileFor = (p: (typeof posts)[number]): FileSystemNode => ({
	name: `${p.slug}.md`,
	type: "file",
	content: {
		displayType: "blog-post",
		title: p.frontmatter.title,
		category: p.frontmatter.category,
		slug: p.slug,
		date: p.frontmatter.publishedAt.slice(0, 10),
		updated: p.frontmatter.updatedAt?.slice(0, 10),
		read: `${p.readingMinutes} min`,
		tags: p.frontmatter.tags,
		Body: p.Body,
	} satisfies BlogPostPayload,
});

// Distinct categories present in the index, alphabetised.
const categoryNames = (): string[] =>
	[...new Set(posts.map((p) => p.frontmatter.category))].sort();

// The /blog directory: a listing of ALL posts, plus one subdirectory per
// category (each with its own listing + post files).
export const buildBlogDirectory = (): FileSystemNode => {
	const categoryDirs: Record<string, FileSystemNode> = {};
	for (const name of categoryNames()) {
		const inCat = posts.filter((p) => p.frontmatter.category === name);
		const files: Record<string, FileSystemNode> = {};
		for (const p of inCat) files[`${p.slug}.md`] = fileFor(p);
		categoryDirs[name] = {
			name,
			type: "directory",
			children: files,
			listing: {
				displayType: "blog-listing",
				heading: `/blog/${name}`,
				rows: inCat.map(rowFor),
			},
		};
	}

	return {
		name: "blog",
		type: "directory",
		children: categoryDirs,
		listing: {
			displayType: "blog-listing",
			heading: "/blog",
			rows: posts.map(rowFor),
		},
	};
};
