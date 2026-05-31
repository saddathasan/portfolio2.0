import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vitest/config";
import { mdxPlugins } from "./mdx.vite";

// Mirror the app's MDX pipeline so tests that touch the blog index (which
// eager-imports compiled .mdx bodies) transform those files identically.
export default defineConfig({
	plugins: [...mdxPlugins(), react({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ })],
	resolve: {
		alias: { "@": path.resolve(__dirname, "./src") },
	},
	test: {
		environment: "node",
		include: ["src/**/*.test.ts"],
	},
});
