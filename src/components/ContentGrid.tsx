import { cn } from "@/lib/utils";

interface ContentGridProps {
	className?: string;
	children: React.ReactNode;
	columns?: 1 | 2 | 3 | 4;
	gap?: "sm" | "md" | "lg" | "xl";
}

interface ContentGridItemProps {
	className?: string;
	children: React.ReactNode;
}

// Root ContentGrid Component - simplified without animations
function ContentGrid({
	className,
	children,
	columns = 2,
	gap = "lg",
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

	return (
		<div
			className={gridClasses}
			{...props}>
			{children}
		</div>
	);
}

// ContentGrid Item - simplified without animations
function ContentGridItem({
	className,
	children,
	...props
}: ContentGridItemProps) {
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
