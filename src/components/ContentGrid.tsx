import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ContentGridProps {
	className?: string;
	children: React.ReactNode;
	columns?: 1 | 2 | 3 | 4;
	gap?: "sm" | "md" | "lg" | "xl";
	animate?: boolean;
	staggerChildren?: boolean;
}

interface ContentGridItemProps {
	className?: string;
	children: React.ReactNode;
	animate?: boolean;
	delay?: number;
}

// Root ContentGrid Component
function ContentGrid({
	className,
	children,
	columns = 2,
	gap = "lg",
	animate = true,
	staggerChildren = true,
	...props
}: ContentGridProps) {
	const columnClasses = {
		1: "grid-cols-1",
		2: "grid grid-cols-1 md:grid-cols-2",
		3: "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3",
		4: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
	};

	const gapClasses = {
		sm: "gap-4",
		md: "gap-6",
		lg: "gap-8",
		xl: "gap-12",
	};

	const gridClasses = cn(
		"grid",
		columnClasses[columns],
		gapClasses[gap],
		className,
	);

	if (animate && staggerChildren) {
		return (
			<motion.div
				className={gridClasses}
				variants={{
					visible: {
						transition: {
							staggerChildren: 0.1,
						},
					},
				}}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}
				{...props}>
				{children}
			</motion.div>
		);
	}

	return (
		<div
			className={gridClasses}
			{...props}>
			{children}
		</div>
	);
}

// ContentGrid Item
function ContentGridItem({
	className,
	children,
	animate = true,
	delay = 0,
	...props
}: ContentGridItemProps) {
	if (animate) {
		return (
			<motion.div
				className={className}
				variants={{
					hidden: { opacity: 0, y: 20 },
					visible: {
						opacity: 1,
						y: 0,
						transition: {
							duration: 0.4,
							delay,
						},
					},
				}}
				{...props}>
				{children}
			</motion.div>
		);
	}

	return (
		<div
			className={className}
			{...props}>
			{children}
		</div>
	);
}

// Compound exports
ContentGrid.Item = ContentGridItem;

export { ContentGrid };
