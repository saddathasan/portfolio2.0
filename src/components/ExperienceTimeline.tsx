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
import { motion } from "framer-motion";

interface Experience {
	id: string;
	company: string;
	role: string;
	period: string;
	type: string;
	achievements: string[];
	technologies: string[];
	subExperiences?: {
		company: string;
		period: string;
		achievements: string[];
		technologies: string[];
	}[];
}

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

// Root Timeline component
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
				<TimelineLine />
				{experiences.map((exp, index) => (
					<ExperienceItem
						key={exp.id}
						experience={exp}
						index={index}
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
				"absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary opacity-60",
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
				"absolute left-6 w-4 h-4 bg-gradient-to-br from-primary to-accent rounded-full border-4 border-background shadow-lg z-10",
				className,
			)}
			{...props}
		/>
	);
}

// Individual experience item
function ExperienceItem({
	experience,
	index,
	className,
	...props
}: ExperienceItemProps) {
	return (
		<motion.div
			initial={{ opacity: 0, x: -20 }}
			whileInView={{ opacity: 1, x: 0 }}
			transition={{
				duration: 0.5,
				delay: index * 0.1,
			}}
			viewport={{ once: true }}
			className={cn("relative mb-12 last:mb-0", className)}
			{...props}>
			<TimelineDot />

			{/* Content Card */}
			<div className="ml-16">
				<Card className="hover:shadow-lg transition-shadow duration-300">
					<CardHeader>
						<div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
							<div className="flex-1">
								<CardTitle className="text-xl font-bold text-primary">
									{experience.role}
								</CardTitle>
								<CardDescription className="text-lg font-semibold text-foreground">
									{experience.company}
								</CardDescription>
							</div>
							<div className="text-right">
								<Badge
									variant="secondary"
									className="mb-2">
									{experience.period}
								</Badge>
								<div className="text-sm text-muted-foreground">
									{experience.type}
								</div>
							</div>
						</div>
					</CardHeader>
					<CardContent>
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
							<h4 className="font-semibold mb-3 text-foreground">
								Technologies Used
							</h4>
							<TechBadgeList
								technologies={experience.technologies}
								variant="secondary"
								hoverable
							/>
						</div>
					</CardContent>
				</Card>
			</div>
		</motion.div>
	);
}

// Achievement list component
function AchievementList({
	achievements,
	className,
	...props
}: AchievementListProps) {
	return (
		<div
			className={cn("mb-4", className)}
			{...props}>
			<h4 className="font-semibold mb-3 text-foreground">
				Key Achievements
			</h4>
			<ul className="space-y-2">
				{achievements.map((achievement, i) => (
					<li
						key={i}
						className="flex items-start gap-2">
						<span className="text-primary mt-1.5 text-xs">●</span>
						<span className="text-sm text-muted-foreground">
							{achievement}
						</span>
					</li>
				))}
			</ul>
		</div>
	);
}

// Sub-experience list component
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
			<h4 className="font-semibold mb-3 text-foreground">
				Project Details
			</h4>
			<div className="space-y-4">
				{subExperiences.map((subExp, i) => (
					<div
						key={i}
						className="border-l-2 border-muted pl-4">
						<div className="flex justify-between items-start mb-2">
							<h5 className="font-medium text-foreground">
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
									<span className="text-primary mt-1.5 text-xs">
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
