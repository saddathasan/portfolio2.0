import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import type { Plugin } from "vite";

/* Build-time SEO assets: sitemap.xml, robots.txt, rss.xml.

   Reads the MDX frontmatter directly with Node (no app runtime), so it stays
   in lockstep with the posts. Emitted into the build output at closeBundle.

   BASE must match src/shared/seo/config.ts → SITE.url. */
const BASE = "https://saddathasan.dev";
const TITLE = "Saddat Hasan — Full-Stack & DevOps Engineer";
const DESC =
	"Terminal-first portfolio and writing on React architecture, CI/CD and infrastructure.";

interface PostMeta {
	slug: string;
	category: string;
	title: string;
	description: string;
	publishedAt: string;
	updatedAt?: string;
	path: string; // "/blog/<category>/<slug>"
}

// Recursively collect .mdx files under a directory.
function walkMdx(dir: string): string[] {
	if (!existsSync(dir)) return [];
	const out: string[] = [];
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		const full = join(dir, entry.name);
		if (entry.isDirectory()) out.push(...walkMdx(full));
		else if (entry.name.endsWith(".mdx")) out.push(full);
	}
	return out;
}

function readPosts(blogDir: string): PostMeta[] {
	return walkMdx(blogDir)
		.map((file): PostMeta | null => {
			const { data } = matter(readFileSync(file, "utf8"));
			if (data.draft) return null;
			const slug = file.split("/").pop()!.replace(/\.mdx$/, "");
			const category = (data.category as string) || "general";
			return {
				slug,
				category,
				title: String(data.title ?? slug),
				description: String(data.description ?? ""),
				publishedAt: String(data.publishedAt ?? ""),
				updatedAt: data.updatedAt ? String(data.updatedAt) : undefined,
				path: `/blog/${category}/${slug}`,
			};
		})
		.filter((p): p is PostMeta => p !== null)
		.sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
}

const xmlEscape = (s: string): string =>
	s.replace(/[<>&'"]/g, (c) =>
		({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[c]!,
	);

function buildSitemap(posts: PostMeta[]): string {
	const categories = [...new Set(posts.map((p) => p.category))];
	const urls: { loc: string; lastmod?: string; priority: string }[] = [
		{ loc: "/", priority: "1.0" },
		{ loc: "/home", priority: "0.9" },
		{ loc: "/blog", priority: "0.7" },
		{ loc: "/git-profile", priority: "0.6" },
		...categories.map((c) => ({ loc: `/blog/${c}`, priority: "0.5" })),
		...posts.map((p) => ({
			loc: p.path,
			lastmod: p.updatedAt ?? p.publishedAt,
			priority: "0.8",
		})),
	];
	const body = urls
		.map(
			(u) =>
				`  <url>\n    <loc>${BASE}${u.loc}</loc>` +
				(u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : "") +
				`\n    <priority>${u.priority}</priority>\n  </url>`,
		)
		.join("\n");
	return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

function buildRss(posts: PostMeta[]): string {
	const items = posts
		.map((p) => {
			const url = `${BASE}${p.path}`;
			const pub = p.publishedAt ? new Date(`${p.publishedAt}T00:00:00Z`).toUTCString() : "";
			return (
				`    <item>\n      <title>${xmlEscape(p.title)}</title>\n` +
				`      <link>${url}</link>\n      <guid isPermaLink="true">${url}</guid>\n` +
				(pub ? `      <pubDate>${pub}</pubDate>\n` : "") +
				`      <category>${xmlEscape(p.category)}</category>\n` +
				`      <description>${xmlEscape(p.description)}</description>\n    </item>`
			);
		})
		.join("\n");
	return (
		`<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n  <channel>\n` +
		`    <title>${xmlEscape(TITLE)}</title>\n    <link>${BASE}/blog</link>\n` +
		`    <description>${xmlEscape(DESC)}</description>\n    <language>en-us</language>\n` +
		`${items}\n  </channel>\n</rss>\n`
	);
}

const ROBOTS = `User-agent: *\nAllow: /\n\nSitemap: ${BASE}/sitemap.xml\n`;

export function seoAssets(): Plugin {
	return {
		name: "seo-assets",
		apply: "build",
		closeBundle() {
			const root = process.cwd();
			const posts = readPosts(join(root, "src", "blog"));
			const out = join(root, "dist");
			if (!existsSync(out)) return; // SSR/other passes — only the client build emits.
			writeFileSync(join(out, "sitemap.xml"), buildSitemap(posts));
			writeFileSync(join(out, "rss.xml"), buildRss(posts));
			writeFileSync(join(out, "robots.txt"), ROBOTS);
			// eslint-disable-next-line no-console
			console.log(`\n[seo-assets] wrote sitemap.xml, rss.xml, robots.txt (${posts.length} posts)`);
		},
	};
}
