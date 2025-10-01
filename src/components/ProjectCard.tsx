import { TechBadgeList } from "@/components/TechBadgeList";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

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

// Root Project Card component - Lee Robinson ultra-minimal styling
function ProjectCard({
	project,
	className,
	...props
}: Omit<ProjectCardProps, 'index'>) {
	return (
		<Card
			className={cn(
				"h-full flex flex-col border-0 shadow-none hover:bg-muted/30 transition-colors duration-200",
				className,
			)}
			{...props}>
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
	);
}

// Header with Lee Robinson ultra-minimal styling
function ProjectCardHeader({
	title,
	impact,
	className,
	...props
}: ProjectCardHeaderProps) {
	return (
		<div
			className={cn(
				"p-6 pb-3",
				className,
			)}
			{...props}>
			<h3 className="text-base font-medium text-foreground mb-1 line-clamp-2">
				{title}
			</h3>
			<p className="text-sm text-muted-foreground line-clamp-1">
				{impact}
			</p>
		</div>
	);
}

// Content with minimal styling
function ProjectCardContent({
	description,
	technologies,
	liveUrl,
	sourceUrl,
	className,
	...props
}: ProjectCardContentProps) {
	return (
		<CardContent
			className={cn(
				"flex-1 flex flex-col p-6 pt-3",
				className,
			)}
			{...props}>
			<CardDescription className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">
				{description}
			</CardDescription>
			
			<div className="space-y-4">
				<TechBadgeList technologies={technologies} />
				
				<div className="flex gap-2">
					{liveUrl && (
						<Button
							variant="default"
							size="sm"
							asChild
							className="flex-1">
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
							asChild
							className="flex-1">
							<a
								href={sourceUrl}
								target="_blank"
								rel="noopener noreferrer">
								Source
							</a>
						</Button>
					)}
				</div>
			</div>
		</CardContent>
	);
}

// Compound component structure
ProjectCard.Header = ProjectCardHeader;
ProjectCard.Content = ProjectCardContent;

export { ProjectCard };
