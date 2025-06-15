import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface TechBadgeListProps {
	technologies: string[];
	className?: string;
	variant?: "default" | "secondary" | "outline";
	size?: "sm" | "md" | "lg";
	animated?: boolean;
	hoverable?: boolean;
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
	animated = false,
	hoverable = false,
	gap = "md",
	...props
}: TechBadgeListProps) {
	const containerClasses = cn("flex flex-wrap", gapClasses[gap], className);

	const badgeClasses = cn(
		sizeClasses[size],
		hoverable &&
			"hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg",
	);

	if (animated) {
		return (
			<div
				className={containerClasses}
				{...props}>
				{technologies.map((tech, index) => (
					<motion.div
						key={tech}
						initial={{ opacity: 0, scale: 0.8 }}
						whileInView={{ opacity: 1, scale: 1 }}
						whileHover={hoverable ? { scale: 1.05 } : {}}
						transition={{ duration: 0.4, delay: index * 0.05 }}
						viewport={{ once: true }}>
						<Badge
							variant={variant}
							className={badgeClasses}>
							{tech}
						</Badge>
					</motion.div>
				))}
			</div>
		);
	}

	return (
		<div
			className={containerClasses}
			{...props}>
			{technologies.map((tech) => (
				<Badge
					key={tech}
					variant={variant}
					className={badgeClasses}>
					{tech}
				</Badge>
			))}
		</div>
	);
}
