/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: [
					"Inter Variable",
					"Inter",
					"system-ui",
					"-apple-system",
					"BlinkMacSystemFont",
					"Segoe UI",
					"Roboto",
					"sans-serif",
				],
				mono: [
					"SF Mono",
					"Monaco",
					"Inconsolata",
					"Roboto Mono",
					"monospace",
				],
				// Semantic font hierarchy
				title: "var(--font-title)",
				subtitle: "var(--font-subtitle)",
				body: "var(--font-body)",
				// Original font families (kept for compatibility)
				inter: ["Inter Variable", "Inter", "system-ui", "sans-serif"],
				"cabinet-grotesk": [
					"Cabinet Grotesk Variable",
					"system-ui",
					"sans-serif",
				],
				"clash-display": [
					"Clash Display Variable",
					"system-ui",
					"sans-serif",
				],
				panchang: ["Panchang Variable", "system-ui", "sans-serif"],
				"space-grotesk": [
					"Space Grotesk Variable",
					"system-ui",
					"sans-serif",
				],
				"uncut-sans": [
					"Uncut Sans Variable",
					"system-ui",
					"sans-serif",
				],
			},
			fontWeight: {
				thin: "100",
				extralight: "200",
				light: "300",
				normal: "400",
				medium: "500",
				semibold: "600",
				bold: "700",
				extrabold: "800",
				black: "900",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			colors: {
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				chart: {
					1: "hsl(var(--chart-1))",
					2: "hsl(var(--chart-2))",
					3: "hsl(var(--chart-3))",
					4: "hsl(var(--chart-4))",
					5: "hsl(var(--chart-5))",
				},
				sidebar: {
					DEFAULT: "hsl(var(--sidebar-background))",
					foreground: "hsl(var(--sidebar-foreground))",
					primary: "hsl(var(--sidebar-primary))",
					"primary-foreground":
						"hsl(var(--sidebar-primary-foreground))",
					accent: "hsl(var(--sidebar-accent))",
					"accent-foreground":
						"hsl(var(--sidebar-accent-foreground))",
					border: "hsl(var(--sidebar-border))",
					ring: "hsl(var(--sidebar-ring))",
				},
			},
		},
	},
	plugins: [
		require("tailwindcss-animate"),
		function ({ addUtilities }) {
			addUtilities({
				".dev-border": {
					border: "2px dashed #ef4444",
				},
				".dev-border-2": {
					border: "1px dashed #006400",
				},
				".dev-border-3": {
					border: "1px dashed #FF00BF",
				},
			});
		},
	],
};
