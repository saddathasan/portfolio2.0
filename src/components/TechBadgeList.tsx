import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TechBadgeListProps {
	technologies: string[];
	className?: string;
	variant?: "default" | "secondary" | "outline";
	size?: "sm" | "md" | "lg";
	gap?: "sm" | "md" | "lg";
}

const sizeClasses = {
	sm: "text-xs py-1 px-2",
	md: "text-sm py-2 px-4",
	lg: "text-base py-3 px-6",
};

const gapClasses = {
	sm: "gap-1",
	md: "gap-2",
	lg: "gap-3",
};

export function TechBadgeList({
	technologies,
	className,
	variant = "outline",
	size = "sm",
	gap = "md",
	...props
}: TechBadgeListProps) {
	const containerClasses = cn("flex flex-wrap", gapClasses[gap], className);

	return (
		<div
			className={containerClasses}
			{...props}>
			{technologies.map((tech) => (
				<Badge
					key={tech}
					variant={variant}
					className={cn(
						sizeClasses[size],
						"font-medium transition-colors hover:bg-accent/10"
					)}>
					{tech}
				</Badge>
			))}
		</div>
	);
}
