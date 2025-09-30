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
		"font-semibold border-2 transition-all duration-300",
		hoverable &&
			"hover:bg-primary hover:text-white hover:border-transparent hover:shadow-lg hover:shadow-primary/25 cursor-pointer transform hover:-translate-y-1",
		!hoverable && "bg-muted border-border/50"
	);

	if (animated) {
		return (
			<motion.div
				className={containerClasses}
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				viewport={{ once: true }}
				{...props}>
				{technologies.map((tech, index) => (
					<motion.div
						key={tech}
						initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
						whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
						whileHover={hoverable ? { 
							scale: 1.08, 
							rotateY: 5,
							z: 10
						} : {}}
						whileTap={hoverable ? { scale: 0.95 } : {}}
						transition={{ 
							duration: 0.5, 
							delay: index * 0.08,
							ease: "easeOut"
						}}
						viewport={{ once: true }}
						className="perspective-1000">
						<Badge
							variant={variant}
							className={cn(
								badgeClasses,
								"relative overflow-hidden",
								hoverable && "group"
							)}>
							<span className="relative z-10 font-sans font-normal">{tech}</span>
						</Badge>
					</motion.div>
				))}
			</motion.div>
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
