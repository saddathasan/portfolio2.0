import mdx from "@mdx-js/rollup";
import type { Plugin } from "vite";
import rehypePrettyCode from "rehype-pretty-code";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkGfm from "remark-gfm";

/* The MDX + supporting plugins, shared by vite.config.ts and vitest.config.ts
   so the app and the tests compile posts identically.

   • remark-frontmatter strips the `---` YAML from the rendered body (we parse
     it separately with gray-matter over the `?raw` source at index time).
   • remark-gfm: tables / strikethrough / task lists.
   • rehype-pretty-code: Shiki highlighting at build time — warm github-dark-
     dimmed, no neon-on-black. keepBackground:false so it inherits our surface.

   The mdx transform is wrapped to ignore any id carrying a query (e.g.
   `foo.mdx?raw`): without this guard, Vitest lets the `?raw` import reach the
   MDX compiler, which strips the frontmatter before gray-matter can read it. */
export function mdxPlugins(): Plugin[] {
	const base = mdx({
		// remark-frontmatter parses the `---` block into a node; remark-mdx-
		// frontmatter then EXPORTS it as `export const frontmatter = {…}` from
		// the compiled module — so the browser never runs gray-matter (which
		// needs Node's Buffer). Order matters: frontmatter before mdx-frontmatter.
		remarkPlugins: [remarkGfm, remarkFrontmatter, [remarkMdxFrontmatter, { name: "frontmatter" }]],
		rehypePlugins: [[rehypePrettyCode, { theme: "github-dark-dimmed", keepBackground: false }]],
		providerImportSource: "@mdx-js/react",
	}) as Plugin;

	const origTransform = base.transform;
	const guarded: Plugin = {
		...base,
		enforce: "pre",
		transform(code, id, opts) {
			if (id.includes("?")) return null; // ?raw / other queries pass through
			return typeof origTransform === "function"
				? origTransform.call(this, code, id, opts)
				: null;
		},
	};
	return [guarded];
}
