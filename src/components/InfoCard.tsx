import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface InfoCardProps {
	className?: string;
	children: React.ReactNode;
}

interface InfoCardHeaderProps {
	className?: string;
	children: React.ReactNode;
}

interface InfoCardTitleProps {
	className?: string;
	children: React.ReactNode;
	badge?: string;
	badgeVariant?: "default" | "secondary" | "destructive" | "outline";
}

interface InfoCardDescriptionProps {
	className?: string;
	children: React.ReactNode;
}

interface InfoCardContentProps {
	className?: string;
	children: React.ReactNode;
}

interface InfoCardActionsProps {
	className?: string;
	children: React.ReactNode;
}

interface InfoCardActionProps {
	className?: string;
	children: React.ReactNode;
	href?: string;
	variant?:
		| "default"
		| "outline"
		| "ghost"
		| "link"
		| "destructive"
		| "secondary";
	size?: "default" | "sm" | "lg" | "icon";
	external?: boolean;
	fullWidth?: boolean;
}

// Root InfoCard Component - simplified without animations
function InfoCard({
	className,
	children,
	...props
}: InfoCardProps) {
	return (
		<Card
			className={cn("transition-colors hover:bg-accent/5", className)}
			{...props}>
			{children}
		</Card>
	);
}

// InfoCard Header
function InfoCardHeader({
	className,
	children,
	...props
}: InfoCardHeaderProps) {
	return (
		<CardHeader
			className={className}
			{...props}>
			{children}
		</CardHeader>
	);
}

// InfoCard Title with optional badge
function InfoCardTitle({
	className,
	children,
	badge,
	badgeVariant = "secondary",
	...props
}: InfoCardTitleProps) {
	if (badge) {
		return (
			<CardTitle
				className={cn("flex items-center justify-between", className)}
				{...props}>
				<span>{children}</span>
				<Badge variant={badgeVariant}>{badge}</Badge>
			</CardTitle>
		);
	}

	return (
		<CardTitle
			className={className}
			{...props}>
			{children}
		</CardTitle>
	);
}

// InfoCard Description
function InfoCardDescription({
	className,
	children,
	...props
}: InfoCardDescriptionProps) {
	return (
		<CardDescription
			className={className}
			{...props}>
			{children}
		</CardDescription>
	);
}

// InfoCard Content
function InfoCardContent({
	className,
	children,
	...props
}: InfoCardContentProps) {
	return (
		<CardContent
			className={className}
			{...props}>
			{children}
		</CardContent>
	);
}

// InfoCard Actions
function InfoCardActions({
	className,
	children,
	...props
}: InfoCardActionsProps) {
	return (
		<div
			className={cn("flex gap-2", className)}
			{...props}>
			{children}
		</div>
	);
}

// InfoCard Action Button
function InfoCardAction({
	className,
	children,
	href,
	variant = "outline",
	size = "sm",
	external = false,
	fullWidth = false,
	...props
}: InfoCardActionProps) {
	const buttonClasses = cn(fullWidth && "w-full", className);

	if (href) {
		return (
			<Button
				variant={variant}
				size={size}
				className={buttonClasses}
				asChild
				{...props}>
				<a
					href={href}
					target={external ? "_blank" : undefined}
					rel={external ? "noopener noreferrer" : undefined}>
					{children}
				</a>
			</Button>
		);
	}

	return (
		<Button
			variant={variant}
			size={size}
			className={buttonClasses}
			{...props}>
			{children}
		</Button>
	);
}

// Compound exports
InfoCard.Header = InfoCardHeader;
InfoCard.Title = InfoCardTitle;
InfoCard.Description = InfoCardDescription;
InfoCard.Content = InfoCardContent;
InfoCard.Actions = InfoCardActions;
InfoCard.Action = InfoCardAction;

export { InfoCard };
