/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ['class'],
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
    	extend: {
    		fontFamily: {
    			sans: [
    				'Inter Variable',
    				'Inter',
    				'system-ui',
    				'-apple-system',
    				'BlinkMacSystemFont',
    				'Segoe UI',
    				'Roboto',
    				'sans-serif'
    			],
    			mono: [
    				'SF Mono',
    				'Monaco',
    				'Inconsolata',
    				'Roboto Mono',
    				'monospace'
    			],
    			inter: [
    				'Inter Variable',
    				'Inter',
    				'system-ui',
    				'sans-serif'
    			],
    			'cabinet-grotesk': [
    				'Cabinet Grotesk Variable',
    				'system-ui',
    				'sans-serif'
    			],
    			'clash-display': [
    				'Clash Display Variable',
    				'system-ui',
    				'sans-serif'
    			],
    			panchang: [
    				'Panchang Variable',
    				'system-ui',
    				'sans-serif'
    			],
    			'space-grotesk': [
    				'Space Grotesk Variable',
    				'system-ui',
    				'sans-serif'
    			]
    		},
    		fontWeight: {
    			thin: '100',
    			extralight: '200',
    			light: '300',
    			normal: '400',
    			medium: '500',
    			semibold: '600',
    			bold: '700',
    			extrabold: '800',
    			black: '900'
    		},
    		fontVariationSettings: {
    			'inter-thin': '"wght" 100',
    			'inter-extralight': '"wght" 200',
    			'inter-light': '"wght" 300',
    			'inter-normal': '"wght" 400',
    			'inter-medium': '"wght" 500',
    			'inter-semibold': '"wght" 600',
    			'inter-bold': '"wght" 700',
    			'inter-extrabold': '"wght" 800',
    			'inter-black': '"wght" 900',
    			'cabinet-grotesk-thin': '"wght" 100',
    			'cabinet-grotesk-extralight': '"wght" 200',
    			'cabinet-grotesk-light': '"wght" 300',
    			'cabinet-grotesk-normal': '"wght" 400',
    			'cabinet-grotesk-medium': '"wght" 500',
    			'cabinet-grotesk-semibold': '"wght" 600',
    			'cabinet-grotesk-bold': '"wght" 700',
    			'cabinet-grotesk-extrabold': '"wght" 800',
    			'cabinet-grotesk-black': '"wght" 900',
    			'clash-display-extralight': '"wght" 200',
    			'clash-display-light': '"wght" 300',
    			'clash-display-normal': '"wght" 400',
    			'clash-display-medium': '"wght" 500',
    			'clash-display-semibold': '"wght" 600',
    			'clash-display-bold': '"wght" 700',
    			'panchang-light': '"wght" 300',
    			'panchang-normal': '"wght" 400',
    			'panchang-medium': '"wght" 500',
    			'panchang-semibold': '"wght" 600',
    			'panchang-bold': '"wght" 700',
    			'panchang-extrabold': '"wght" 800',
    			'space-grotesk-light': '"wght" 300',
    			'space-grotesk-normal': '"wght" 400',
    			'space-grotesk-medium': '"wght" 500',
    			'space-grotesk-semibold': '"wght" 600',
    			'space-grotesk-bold': '"wght" 700'
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		colors: {
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			},
    			sidebar: {
    				DEFAULT: 'hsl(var(--sidebar-background))',
    				foreground: 'hsl(var(--sidebar-foreground))',
    				primary: 'hsl(var(--sidebar-primary))',
    				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
    				accent: 'hsl(var(--sidebar-accent))',
    				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
    				border: 'hsl(var(--sidebar-border))',
    				ring: 'hsl(var(--sidebar-ring))'
    			}
    		}
    	}
    },
	plugins: [require('tailwindcss-animate')],
};
