import { cn } from "@/lib/utils";

interface BiographySectionProps {
	className?: string;
	children: React.ReactNode;
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

// Root BiographySection Component - simplified without animations
function BiographySection({
	className,
	children,
	...props
}: BiographySectionProps) {
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
			className={cn("font-semibold mb-4 font-subtitle", sizeClasses[size], className)}
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
						<span className="text-gray-600 dark:text-gray-400 mt-1">•</span>
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
