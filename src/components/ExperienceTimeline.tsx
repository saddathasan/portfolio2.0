import { TechBadgeList } from "@/components/TechBadgeList";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Experience } from "@/types";

interface ExperienceTimelineProps {
	experiences: Experience[];
	className?: string;
}

interface ExperienceItemProps {
	experience: Experience;
	index: number;
	className?: string;
}

interface TimelineLineProps {
	className?: string;
}

interface TimelineDotProps {
	className?: string;
}

interface AchievementListProps {
	achievements: string[];
	className?: string;
}

interface SubExperienceListProps {
	subExperiences: Experience["subExperiences"];
	className?: string;
}

// Root Timeline component - Lee Robinson ultra-minimal styling
function ExperienceTimeline({
	experiences,
	className,
	...props
}: ExperienceTimelineProps) {
	return (
		<div
			className={cn("flex-1 max-w-4xl", className)}
			{...props}>
			<div className="relative">
				{experiences.map((exp) => (
					<ExperienceItem
						key={exp.id}
						experience={exp}
					/>
				))}
			</div>
		</div>
	);
}

// Timeline line component
function TimelineLine({ className, ...props }: TimelineLineProps) {
	return (
		<div
			className={cn(
				"absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-primary opacity-60",
				className,
			)}
			{...props}
		/>
	);
}

// Timeline dot component
function TimelineDot({ className, ...props }: TimelineDotProps) {
	return (
		<div
			className={cn(
				"absolute left-2 md:left-6 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg z-10",
				className,
			)}
			{...props}
		/>
	);
}

// Individual experience item - Lee Robinson ultra-minimal styling
function ExperienceItem({
	experience,
	className,
	...props
}: Omit<ExperienceItemProps, 'index'>) {
	return (
		<div
			className={cn("relative mb-8 last:mb-0", className)}
			{...props}>
			{/* Content Card */}
			<div>
				<Card className="border-0 shadow-none hover:bg-muted/30 transition-colors duration-200">
					<CardHeader className="pb-3">
						<div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
							<div className="flex-1">
								<CardTitle className="text-base font-medium text-foreground">
									{experience.role}
								</CardTitle>
								<CardDescription className="text-sm font-normal text-muted-foreground">
									{experience.company}
								</CardDescription>
							</div>
							<div className="md:text-right">
								<Badge
									variant="secondary"
									className="mb-1 text-xs">
									{experience.period}
								</Badge>
								<div className="text-xs text-muted-foreground">
									{experience.type}
								</div>
							</div>
						</div>
					</CardHeader>
					<CardContent className="pt-0">
						<AchievementList
							achievements={experience.achievements}
						/>

						{experience.subExperiences && (
							<SubExperienceList
								subExperiences={experience.subExperiences}
							/>
						)}

						{/* Technologies */}
						<div>
							<h4 className="font-medium mb-3 text-foreground text-sm">
								Technologies Used
							</h4>
							<TechBadgeList
								technologies={experience.technologies}
								variant="secondary"
							/>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

// Achievement list component - Lee Robinson ultra-minimal styling
function AchievementList({
	achievements,
	className,
	...props
}: AchievementListProps) {
	return (
		<div
			className={cn("mb-4", className)}
			{...props}>
			<h4 className="font-medium mb-3 text-foreground text-sm">
				Key Achievements
			</h4>
			<ul className="space-y-2">
				{achievements.map((achievement, i) => (
					<li
						key={i}
						className="flex items-start gap-2">
						<span className="text-muted-foreground mt-1.5 text-xs">●</span>
						<span className="text-sm text-muted-foreground">
							{achievement}
						</span>
					</li>
				))}
			</ul>
		</div>
	);
}

// Sub-experience list component - Lee Robinson ultra-minimal styling
function SubExperienceList({
	subExperiences,
	className,
	...props
}: SubExperienceListProps) {
	if (!subExperiences) return null;

	return (
		<div
			className={cn("mb-4", className)}
			{...props}>
			<h4 className="font-medium mb-3 text-foreground text-sm">
				Project Details
			</h4>
			<div className="space-y-4">
				{subExperiences.map((subExp, i) => (
					<div
						key={i}
						className="border-l-2 border-muted pl-4">
						<div className="flex justify-between items-start mb-2">
							<h5 className="font-medium text-foreground text-sm">
								{subExp.company}
							</h5>
							<Badge
								variant="outline"
								className="text-xs">
								{subExp.period}
							</Badge>
						</div>
						<ul className="space-y-1">
							{subExp.achievements.map((achievement, j) => (
								<li
									key={j}
									className="flex items-start gap-2">
									<span className="text-muted-foreground mt-1.5 text-xs">
										●
									</span>
									<span className="text-sm text-muted-foreground">
										{achievement}
									</span>
								</li>
							))}
						</ul>
						<div className="mt-2">
							<TechBadgeList
								technologies={subExp.technologies}
								variant="outline"
								size="sm"
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

// Compound component structure
ExperienceTimeline.Item = ExperienceItem;
ExperienceTimeline.Line = TimelineLine;
ExperienceTimeline.Dot = TimelineDot;
ExperienceTimeline.Achievements = AchievementList;
ExperienceTimeline.SubExperiences = SubExperienceList;

export { ExperienceTimeline };
