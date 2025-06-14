import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ContactInfoProps {
	className?: string;
	children: React.ReactNode;
	animate?: boolean;
	direction?: "left" | "right";
}

interface ContactInfoCardProps {
	className?: string;
	children: React.ReactNode;
	title?: string;
	description?: string;
}

interface ContactInfoItemProps {
	className?: string;
	icon: React.ReactNode;
	title: string;
	description?: string;
	content: string;
	link?: string;
	isExternal?: boolean;
	additionalInfo?: string;
}

// Root ContactInfo Component
function ContactInfo({
	className,
	children,
	animate = true,
	direction = "left",
	...props
}: ContactInfoProps) {
	const animationDirection = direction === "left" ? { x: -20 } : { x: 20 };

	if (animate) {
		return (
			<motion.div
				className={cn("space-y-6", className)}
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
			className={cn("space-y-6", className)}
			{...props}>
			{children}
		</div>
	);
}

// ContactInfo Card Container
function ContactInfoCard({
	className,
	children,
	title = "Contact Information",
	description = "Reach out through any of these channels",
	...props
}: ContactInfoCardProps) {
	return (
		<Card
			className={cn(
				"hover:shadow-lg transition-all duration-300 h-full border-border/50 hover:border-primary/20",
				className,
			)}
			{...props}>
			<CardHeader>
				<CardTitle className="text-xl text-primary">{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">{children}</CardContent>
		</Card>
	);
}

// Individual ContactInfo Item
function ContactInfoItem({
	className,
	icon,
	title,
	description,
	content,
	link,
	isExternal = false,
	additionalInfo,
	...props
}: ContactInfoItemProps) {
	const itemContent = (
		<div
			className={cn(
				"flex items-start gap-3 p-3 rounded-lg hover:bg-accent/10 transition-all duration-300 group cursor-pointer",
				className,
			)}
			{...props}>
			<span className="text-xl mt-0.5 group-hover:text-primary transition-colors">
				{icon}
			</span>
			<div className="flex-1">
				<h4 className="font-medium text-sm">{title}</h4>
				{description && (
					<p className="text-xs text-muted-foreground mb-1">
						{description}
					</p>
				)}
				{link ? (
					<a
						href={link}
						target={isExternal ? "_blank" : undefined}
						rel={isExternal ? "noopener noreferrer" : undefined}
						className="text-primary hover:underline text-sm font-medium">
						{content}
					</a>
				) : (
					<span className="text-sm font-medium">{content}</span>
				)}
				{additionalInfo && (
					<p className="text-xs text-muted-foreground mt-0.5">
						{additionalInfo}
					</p>
				)}
			</div>
		</div>
	);

	return itemContent;
}

// Compound exports
ContactInfo.Card = ContactInfoCard;
ContactInfo.Item = ContactInfoItem;

export { ContactInfo };
