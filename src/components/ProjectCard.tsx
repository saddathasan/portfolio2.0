import { TechBadgeList } from "@/components/TechBadgeList";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";
import { motion } from "framer-motion";

interface ProjectCardProps {
	project: Project;
	index?: number;
	className?: string;
}

interface ProjectCardHeaderProps {
	title: string;
	impact: string;
	className?: string;
}

interface ProjectCardContentProps {
	description: string;
	technologies: string[];
	liveUrl?: string | null;
	sourceUrl?: string | null;
	className?: string;
}

interface ProjectCardActionsProps {
	liveUrl?: string | null;
	sourceUrl?: string | null;
	className?: string;
}

// Root Project Card component
function ProjectCard({
	project,
	index = 0,
	className,
	...props
}: ProjectCardProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: index * 0.1 }}
			viewport={{ once: true }}
			{...props}>
			<Card
				className={cn(
					"overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col group border-border/50 hover:border-primary/20 min-h-[400px]",
					className,
				)}>
				<ProjectCardHeader
					title={project.title}
					impact={project.impact}
				/>
				<ProjectCardContent
					description={project.description}
					technologies={project.technologies}
					liveUrl={project.liveUrl}
					sourceUrl={project.sourceUrl}
				/>
			</Card>
		</motion.div>
	);
}

// Header with gradient background and title
function ProjectCardHeader({
	title,
	impact,
	className,
	...props
}: ProjectCardHeaderProps) {
	return (
		<div
			className={cn(
				"h-32 bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20 border-b flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/20 transition-all duration-300",
				className,
			)}
			{...props}>
			<div className="text-center px-4">
				<div className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-1 line-clamp-2">
					{title}
				</div>
				<div className="text-xs text-muted-foreground line-clamp-1">
					{impact}
				</div>
			</div>
		</div>
	);
}

// Content section with description, tech stack, and actions
function ProjectCardContent({
	description,
	technologies,
	liveUrl,
	sourceUrl,
	className,
	...props
}: ProjectCardContentProps) {
	return (
		<>
			<CardHeader className="flex-1 pb-3">
				<CardDescription className="text-sm leading-relaxed line-clamp-4">
					{description}
				</CardDescription>
			</CardHeader>
			<CardContent
				className={cn("space-y-4 pt-0", className)}
				{...props}>
				<TechBadgeList
					technologies={technologies}
					variant="outline"
					size="sm"
					gap="sm"
				/>
				<ProjectCardActions
					liveUrl={liveUrl}
					sourceUrl={sourceUrl}
				/>
			</CardContent>
		</>
	);
}

// Action buttons section
function ProjectCardActions({
	liveUrl,
	sourceUrl,
	className,
	...props
}: ProjectCardActionsProps) {
	return (
		<div
			className={cn("flex gap-2", className)}
			{...props}>
			{liveUrl && (
				<Button
					size="sm"
					className="flex-1"
					asChild>
					<a
						href={liveUrl}
						target="_blank"
						rel="noopener noreferrer">
						View Live
					</a>
				</Button>
			)}
			{sourceUrl && (
				<Button
					variant="outline"
					size="sm"
					className="flex-1"
					asChild>
					<a
						href={sourceUrl}
						target="_blank"
						rel="noopener noreferrer">
						Source Code
					</a>
				</Button>
			)}
			{!liveUrl && !sourceUrl && (
				<div className="flex-1 text-center text-sm text-muted-foreground py-2">
					Enterprise/Confidential Project
				</div>
			)}
		</div>
	);
}

// Compound component structure
ProjectCard.Header = ProjectCardHeader;
ProjectCard.Content = ProjectCardContent;
ProjectCard.Actions = ProjectCardActions;

export { ProjectCard };
