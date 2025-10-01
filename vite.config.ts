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
	},
	server: {
		port: 5173,
		host: true,
	},
});
