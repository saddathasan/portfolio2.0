import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface LocalSkillCategory {
	title: string;
	description: string;
	skills: string[];
}

interface SkillsSidebarProps {
	skillCategories: LocalSkillCategory[];
	className?: string;
	title?: string;
}

interface SkillCategoryCardProps {
	category: LocalSkillCategory;
	className?: string;
}

function SkillsSidebar({
	skillCategories,
	className,
	title = "Technical Skills",
	...props
}: SkillsSidebarProps) {
	return (
		<div
			className={cn("w-80 hidden lg:block", className)}
			{...props}>
			<div className="sticky top-24 space-y-4">
				<h3 className="text-lg font-medium mb-4">{title}</h3>
				{skillCategories.map((category) => (
					<SkillCategoryCard
						key={category.title}
						category={category}
					/>
				))}
			</div>
		</div>
	);
}

function SkillCategoryCard({
	category,
	className,
	...props
}: SkillCategoryCardProps) {
	return (
		<div
			className={className}
			{...props}>
			<Card className="mb-4 hover:bg-muted/30 transition-colors duration-200">
				<CardHeader className="pb-3">
					<CardTitle className="text-base font-medium">
						{category.title}
					</CardTitle>
					<CardDescription className="text-sm">
						{category.description}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex flex-wrap gap-2">
						{category.skills.map((skill) => (
							<Badge
								key={skill}
								variant="secondary"
								className="text-xs">
								{skill}
							</Badge>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

SkillsSidebar.CategoryCard = SkillCategoryCard;

export { SkillsSidebar };
