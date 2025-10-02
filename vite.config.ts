import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					vendor: ['react', 'react-dom'],
					router: ['@tanstack/react-router'],
					ui: ['framer-motion', 'lucide-react'],
				},
			},
		},
		chunkSizeWarningLimit: 1000,
		// Optimize for Cloudflare Pages
		target: 'esnext',
		minify: 'esbuild',
		sourcemap: false,
		cssCodeSplit: true,
		assetsInlineLimit: 4096,
	},
	server: {
		port: 5175,
		host: true,
		proxy: {
			'/api/send-email-dev': {
				target: 'http://localhost:3001',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api\/send-email-dev/, '/api/send-email'),
			},
		},
	},
});
