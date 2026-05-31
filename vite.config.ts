import mdx from "@mdx-js/rollup";
import react from "@vitejs/plugin-react";
import path from "path";
import rehypePrettyCode from "rehype-pretty-code";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import { defineConfig } from "vite";

// Shiki theme for fenced code blocks — warm dark to match the GUI's espresso
// palette (not the AI-slop neon-on-black). github-dark-dimmed reads quietly.
const prettyCodeOptions = {
	theme: "github-dark-dimmed",
	keepBackground: false,
};

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		// MDX must compile before @vitejs/plugin-react picks up the JSX output,
		// hence `enforce: "pre"`. remark-frontmatter strips the `---` YAML block
		// from the rendered body (we parse it separately with gray-matter at
		// index time); remark-gfm adds tables/strikethrough/task-lists; Shiki
		// highlights fenced code via rehype-pretty-code.
		{
			enforce: "pre",
			...mdx({
				remarkPlugins: [remarkGfm, remarkFrontmatter],
				rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
				providerImportSource: "@mdx-js/react",
			}),
		},
		react({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ }),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					vendor: ["react", "react-dom"],
					router: ["@tanstack/react-router"],
					ui: ["framer-motion", "lucide-react"],
				},
			},
		},
		chunkSizeWarningLimit: 1000,
		// Optimize for Cloudflare Pages
		target: "esnext",
		minify: "esbuild",
		sourcemap: false,
		cssCodeSplit: true,
		assetsInlineLimit: 4096,
	},
	server: {
		port: 5175,
		host: true,
	},
});
