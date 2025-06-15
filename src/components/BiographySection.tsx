import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface BiographySectionProps {
	className?: string;
	children: React.ReactNode;
	animate?: boolean;
	direction?: "left" | "right";
}

interface BiographyTitleProps {
	className?: string;
	children: React.ReactNode;
	size?: "sm" | "md" | "lg";
}

interface BiographyContentProps {
	className?: string;
	children?: React.ReactNode;
	paragraphs?: string[];
	listItems?: string[];
	renderAs?: "paragraphs" | "list" | "custom";
}

// Root BiographySection Component
function BiographySection({
	className,
	children,
	animate = true,
	direction = "left",
	...props
}: BiographySectionProps) {
	const animationDirection = direction === "left" ? { x: -20 } : { x: 20 };

	if (animate) {
		return (
			<motion.div
				className={className}
				initial={{ opacity: 0, ...animationDirection }}
				whileInView={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.6 }}
				viewport={{ once: true }}
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

// Biography Title
function BiographyTitle({
	className,
	children,
	size = "md",
	...props
}: BiographyTitleProps) {
	const sizeClasses = {
		sm: "text-lg md:text-xl",
		md: "text-xl md:text-2xl",
		lg: "text-2xl md:text-3xl",
	};

	return (
		<h2
			className={cn("font-semibold mb-4", sizeClasses[size], className)}
			{...props}>
			{children}
		</h2>
	);
}

// Biography Content
function BiographyContent({
	className,
	children,
	paragraphs,
	listItems,
	renderAs = "custom",
	...props
}: BiographyContentProps) {
	const baseClasses = "space-y-4 text-muted-foreground";

	if (renderAs === "paragraphs" && paragraphs) {
		return (
			<div
				className={cn(baseClasses, className)}
				{...props}>
				{paragraphs.map((paragraph, index) => (
					<p key={index}>{paragraph}</p>
				))}
			</div>
		);
	}

	if (renderAs === "list" && listItems) {
		return (
			<ul
				className={cn(baseClasses, className)}
				{...props}>
				{listItems.map((item, index) => (
					<li
						key={index}
						className="flex items-start gap-2">
						<span className="text-primary mt-1">•</span>
						<span>{item}</span>
					</li>
				))}
			</ul>
		);
	}

	return (
		<div
			className={cn(baseClasses, className)}
			{...props}>
			{children}
		</div>
	);
}

// Compound exports
BiographySection.Title = BiographyTitle;
BiographySection.Content = BiographyContent;

export { BiographySection };
