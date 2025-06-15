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

interface SkillCategory {
	title: string;
	description: string;
	skills: string[];
}

interface SkillsSidebarProps {
	skillCategories: SkillCategory[];
	className?: string;
	title?: string;
}

interface SkillCategoryCardProps {
	category: SkillCategory;
	index: number;
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
				<h3 className="text-xl font-semibold mb-4">{title}</h3>
				{skillCategories.map((category, index) => (
					<SkillCategoryCard
						key={category.title}
						category={category}
						index={index}
					/>
				))}
			</div>
		</div>
	);
}

function SkillCategoryCard({
	category,
	index,
	className,
	...props
}: SkillCategoryCardProps) {
	return (
		<motion.div
			initial={{ opacity: 0, x: 20 }}
			whileInView={{ opacity: 1, x: 0 }}
			transition={{
				duration: 0.5,
				delay: index * 0.1,
			}}
			viewport={{ once: true }}
			className={className}
			{...props}>
			<Card className="mb-4">
				<CardHeader className="pb-3">
					<CardTitle className="text-base">
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
		</motion.div>
	);
}

SkillsSidebar.CategoryCard = SkillCategoryCard;

export { SkillsSidebar };
