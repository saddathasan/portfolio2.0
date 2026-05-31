import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { mdxPlugins } from "./mdx.vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		// MDX compiles before @vitejs/plugin-react picks up the JSX output (the
		// shared factory marks it enforce:"pre"). See mdx.vite.ts.
		...mdxPlugins(),
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
