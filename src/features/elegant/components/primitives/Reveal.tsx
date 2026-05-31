import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
	children: ReactNode;
	/** Stagger offset in seconds. */
	delay?: number;
	className?: string;
}

// Subtle scroll-into-view reveal: a small rise + fade, once. Honors
// prefers-reduced-motion (no movement, instant). Transform/opacity only.
export function Reveal({ children, delay = 0, className }: RevealProps) {
	const reduce = useReducedMotion();
	return (
		<motion.div
			className={className}
			initial={{ opacity: 0, y: reduce ? 0 : 12 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-12% 0px" }}
			transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
		>
			{children}
		</motion.div>
	);
}
