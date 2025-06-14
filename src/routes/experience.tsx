import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

const experiences = [
	{
		id: "infinitibit",
		company: "InfinitiBit GmbH",
		role: "Software Engineer",
		period: "Feb 2025 – Present",
		type: "Full-time",
		achievements: [
			"Developed web-based enterprise solutions leveraging LLMs and AI-driven workflows to enhance decision automation",
			"Integrated agentic AI capabilities using OpenAI APIs to power dynamic task handling across modules",
			"Built scalable backend services using FastAPI and PostgreSQL with optimized REST API design",
			"Implemented CI/CD pipelines for automated testing, deployment, and rollback across multiple environments",
			"Collaborated in Agile sprints for rapid prototyping, iterative delivery, and team alignment",
		],
		technologies: [
			"React",
			"FastAPI",
			"Python",
			"OpenAI API",
			"PostgreSQL",
			"LLM",
			"Agentic AI Integration",
		],
	},
	{
		id: "talvette",
		company: "Talvette Limited",
		role: "Software Engineer",
		period: "Oct 2023 – Feb 2025",
		type: "Full-time",
		achievements: [
			"Built a recruiting platform (Next.js + NestJS + PostgreSQL) → +75% user engagement",
			"JWT authentication → 99.9% uptime",
			"REST API optimization → 40% load time reduction",
			"Agile project management",
		],
		technologies: ["Next.js", "NestJS", "PostgreSQL", "JWT", "REST API"],
	},
	{
		id: "drk-cbd",
		company: "DRK-CBD",
		role: "Software Engineer",
		period: "Apr 2023 – Oct 2023",
		type: "Freelance",
		achievements: [
			"Migrated site from Shopify to MERN stack",
			"Improved scalability and sprint efficiency",
			"QA-tested and resolved critical bugs",
		],
		technologies: ["MongoDB", "Express", "React", "Node.js", "Shopify"],
	},
	{
		id: "wunderman",
		company: "Wunderman Thompson Studios",
		role: "Web Developer",
		period: "Jan 2022 – Mar 2023",
		type: "Contract",
		achievements: ["Contracted for Dell and Microsoft projects"],
		technologies: ["Node.js", "JavaScript", "SQL", "Azure"],
		subExperiences: [
			{
				company: "Dell",
				period: "Dec 2022 – Mar 2023",
				achievements: [
					"Converted legacy data into email templates using Node.js → -35% email creation time",
					"Bash & Node cron scripts for timezone-aware delivery → <1% bounce rate",
					"SQL validators → improved CPL",
				],
				technologies: ["Node.js", "Bash", "SQL", "Email Templates"],
			},
			{
				company: "Microsoft",
				period: "Jan 2022 – Nov 2022",
				achievements: [
					"Built a data curator plugin → -60% dev time",
					"Automated email verification → -65% scheduling time",
					"Responsive pages using Azure stack",
					"Wrote custom SQL queries for campaign data integration",
				],
				technologies: [
					"Azure",
					"SQL",
					"JavaScript",
					"Email Automation",
				],
			},
		],
	},
	{
		id: "upb8",
		company: "Upb8",
		role: "Software Engineer",
		period: "Dec 2019 – Dec 2021",
		type: "Full-time",
		achievements: [
			"Built frontend UI from wireframes using JSX",
			"Used Redux for global state management",
			"Created SPAs using Next.js + Tailwind",
		],
		technologies: ["React", "JSX", "Redux", "Next.js", "Tailwind CSS"],
	},
];

export const Route = createFileRoute("/experience")({
	component: () => (
		<div className="container mx-auto px-4 py-16">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}>
				<div className="text-center mb-12">
					<h1 className="text-4xl font-bold mb-4">
						Professional Experience
					</h1>
					<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
						4+ years of building scalable systems and delivering
						results for enterprise clients
					</p>
				</div>

				{/* Timeline Container */}
				<div className="max-w-4xl mx-auto">
					<div className="relative">
						{/* Timeline Line */}
						<div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>

						{experiences.map((exp, index) => (
							<motion.div
								key={exp.id}
								initial={{ opacity: 0, x: -20 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{
									duration: 0.5,
									delay: index * 0.1,
								}}
								viewport={{ once: true }}
								className="relative mb-12 last:mb-0">
								{/* Timeline Dot */}
								<div className="absolute left-6 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg z-10"></div>

								{/* Content Card */}
								<div className="ml-16">
									<Card className="hover:shadow-lg transition-shadow duration-300">
										<CardHeader>
											<div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
												<div className="flex-1">
													<CardTitle className="text-xl font-bold text-primary">
														{exp.role}
													</CardTitle>
													<CardDescription className="text-lg font-semibold text-foreground">
														{exp.company}
													</CardDescription>
												</div>
												<div className="text-right">
													<Badge
														variant="secondary"
														className="mb-2">
														{exp.period}
													</Badge>
													<div className="text-sm text-muted-foreground">
														{exp.type}
													</div>
												</div>
											</div>
										</CardHeader>
										<CardContent>
											{/* Achievements */}
											<div className="mb-4">
												<h4 className="font-semibold mb-3 text-foreground">
													Key Achievements
												</h4>
												<ul className="space-y-2">
													{exp.achievements.map(
														(achievement, i) => (
															<li
																key={i}
																className="flex items-start gap-2">
																<span className="text-primary mt-1.5 text-xs">
																	●
																</span>
																<span className="text-sm text-muted-foreground">
																	{
																		achievement
																	}
																</span>
															</li>
														),
													)}
												</ul>
											</div>

											{/* Sub-experiences for contracted work */}
											{exp.subExperiences && (
												<div className="mb-4">
													<h4 className="font-semibold mb-3 text-foreground">
														Project Details
													</h4>
													<div className="space-y-4">
														{exp.subExperiences.map(
															(subExp, i) => (
																<div
																	key={i}
																	className="border-l-2 border-muted pl-4">
																	<div className="flex justify-between items-start mb-2">
																		<h5 className="font-medium text-foreground">
																			{
																				subExp.company
																			}
																		</h5>
																		<Badge
																			variant="outline"
																			className="text-xs">
																			{
																				subExp.period
																			}
																		</Badge>
																	</div>
																	<ul className="space-y-1">
																		{subExp.achievements.map(
																			(
																				achievement,
																				j,
																			) => (
																				<li
																					key={
																						j
																					}
																					className="flex items-start gap-2">
																					<span className="text-primary mt-1.5 text-xs">
																						●
																					</span>
																					<span className="text-sm text-muted-foreground">
																						{
																							achievement
																						}
																					</span>
																				</li>
																			),
																		)}
																	</ul>
																	<div className="flex flex-wrap gap-1 mt-2">
																		{subExp.technologies.map(
																			(
																				tech,
																			) => (
																				<Badge
																					key={
																						tech
																					}
																					variant="outline"
																					className="text-xs">
																					{
																						tech
																					}
																				</Badge>
																			),
																		)}
																	</div>
																</div>
															),
														)}
													</div>
												</div>
											)}

											{/* Technologies */}
											<div>
												<h4 className="font-semibold mb-3 text-foreground">
													Technologies Used
												</h4>
												<div className="flex flex-wrap gap-2">
													{exp.technologies.map(
														(tech) => (
															<Badge
																key={tech}
																variant="secondary"
																className="hover:bg-primary hover:text-primary-foreground transition-colors">
																{tech}
															</Badge>
														),
													)}
												</div>
											</div>
										</CardContent>
									</Card>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</motion.div>
		</div>
	),
});
