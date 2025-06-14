import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

const projects = [
	{
		id: 1,
		title: "Talvette Platform",
		description:
			"A comprehensive job/recruiting platform built with modern technologies. Features JWT authentication, optimized REST APIs, and maintains 99.9% uptime. Achieved 75% increase in user engagement through performance optimizations.",
		technologies: ["Next.js", "NestJS", "PostgreSQL", "JWT", "REST API"],
		liveUrl: "https://talvette.com",
		sourceUrl: null,
		image: "/api/placeholder/400/250",
		impact: "+75% user engagement, 99.9% uptime",
	},
	{
		id: 2,
		title: "DRK-CBD Site Revamp",
		description:
			"Successfully migrated an e-commerce site from Shopify to a custom MERN stack solution. Improved scalability, sprint efficiency, and resolved critical bugs through comprehensive QA testing.",
		technologies: [
			"MongoDB",
			"Express",
			"React",
			"Node.js",
			"Shopify Migration",
		],
		liveUrl: "https://drk-cbd.co.uk",
		sourceUrl: null,
		image: "/api/placeholder/400/250",
		impact: "Improved scalability & efficiency",
	},
	{
		id: 3,
		title: "Dell Email Automation",
		description:
			"Developed automated email systems with timezone-aware delivery using Node.js and Bash scripts. Created SQL validators that improved campaign performance and reduced email creation time by 35%.",
		technologies: [
			"Node.js",
			"Bash",
			"SQL",
			"Email Templates",
			"Cron Jobs",
		],
		liveUrl: null,
		sourceUrl: null,
		image: "/api/placeholder/400/250",
		impact: "-35% email creation time, <1% bounce rate",
	},
	{
		id: 4,
		title: "Microsoft Event Page Toolkit",
		description:
			"Built a comprehensive data curator plugin and automated email verification system. Developed rapid-deploy components using Microsoft Azure stack, reducing development time by 60%.",
		technologies: [
			"Microsoft Azure",
			"SQL",
			"JavaScript",
			"Email Automation",
		],
		liveUrl: null,
		sourceUrl: null,
		image: "/api/placeholder/400/250",
		impact: "-60% dev time, -65% scheduling time",
	},
	{
		id: 5,
		title: "Current Portfolio Site",
		description:
			"A modern, responsive portfolio website built with cutting-edge React technologies. Features type-safe routing, beautiful animations, and dark/light mode support.",
		technologies: [
			"React",
			"TanStack Router",
			"Tailwind CSS",
			"TypeScript",
			"shadcn/ui",
			"Framer Motion",
		],
		liveUrl: "https://saddathasan.vercel.app",
		sourceUrl: "https://github.com/saddathasan/portfolio",
		image: "/api/placeholder/400/250",
		impact: "Modern tech stack showcase",
	},
];

export const Route = createFileRoute("/projects")({
	component: () => (
		<div className="container mx-auto px-4 py-16">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}>
				<div className="text-center mb-12">
					<h1 className="text-4xl font-bold mb-4">
						Featured Projects
					</h1>
					<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
						A showcase of my work spanning enterprise clients,
						freelance projects, and personal development
					</p>
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
					{projects.map((project, index) => (
						<motion.div
							key={project.id}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							viewport={{ once: true }}>
							<Card className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
								<div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 border-b flex items-center justify-center">
									<div className="text-center">
										<div className="text-2xl font-bold text-primary mb-2">
											{project.title}
										</div>
										<div className="text-sm text-muted-foreground">
											{project.impact}
										</div>
									</div>
								</div>
								<CardHeader className="flex-1">
									<CardTitle className="text-xl">
										{project.title}
									</CardTitle>
									<CardDescription className="text-sm leading-relaxed">
										{project.description}
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="flex flex-wrap gap-2">
										{project.technologies.map((tech) => (
											<Badge
												key={tech}
												variant="outline"
												className="text-xs">
												{tech}
											</Badge>
										))}
									</div>
									<div className="flex gap-2">
										{project.liveUrl && (
											<Button
												size="sm"
												className="flex-1"
												asChild>
												<a
													href={project.liveUrl}
													target="_blank"
													rel="noopener noreferrer">
													View Live
												</a>
											</Button>
										)}
										{project.sourceUrl && (
											<Button
												variant="outline"
												size="sm"
												className="flex-1"
												asChild>
												<a
													href={project.sourceUrl}
													target="_blank"
													rel="noopener noreferrer">
													Source Code
												</a>
											</Button>
										)}
										{!project.liveUrl &&
											!project.sourceUrl && (
												<div className="flex-1 text-center text-sm text-muted-foreground py-2">
													Enterprise/Confidential
													Project
												</div>
											)}
									</div>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</div>
			</motion.div>
		</div>
	),
});
