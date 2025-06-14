import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

const techStack = [
	"JavaScript (ES6)",
	"TypeScript",
	"React",
	"Node.js",
	"NestJS",
	"PostgreSQL",
	"SQL",
	"Redux",
	"Tanstack Query",
	"Tanstack Router",
	"Tailwind CSS",
	"HTML5",
	"CSS3",
	"REST APIs",
	"Git",
	"Figma",
	"Linux",
	"CI/CD",
	"Performance Optimization",
	"Clean Architecture",
	"Agile Methodologies",
	"LLM Integration",
	"Agentic AI",
	"WebSockets",
];

// const stats = [
// 	{ value: "+75%", label: "User Engagement on Talvette" },
// 	{ value: "99.9%", label: "Uptime on Auth System" },
// 	{ value: "40%", label: "Faster Load Times" },
// 	{ value: "<1%", label: "Email Bounce Rate" },
// 	{ value: "60%", label: "Faster Event Page Creation" },
// ];

export const Route = createFileRoute("/")({
	component: () => (
		<div className="container mx-auto px-4 py-16">
			{/* Hero Section */}
			<motion.section
				className="text-center mb-20"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}>
				<motion.h1
					className="text-5xl md:text-7xl font-bold mb-4"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.1 }}>
					Saddat Hasan
				</motion.h1>
				<motion.h2
					className="text-2xl md:text-3xl text-primary mb-4"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}>
					Software Engineer
				</motion.h2>
				<motion.p
					className="text-lg text-muted-foreground mb-2"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.3 }}>
					📍 Dhaka, Bangladesh
				</motion.p>
				<motion.p
					className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.4 }}>
					Building scalable frontend and backend systems with 4+ years
					of experience. Passionate about performance optimization and
					clean architecture.
				</motion.p>
				<motion.div
					className="flex flex-wrap gap-4 justify-center"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.5 }}>
					<Button
						size="lg"
						asChild>
						<a
							href="/resume.pdf"
							target="_blank"
							rel="noopener noreferrer">
							View Resume
						</a>
					</Button>
					<Button
						variant="outline"
						size="lg"
						asChild>
						<a
							href="https://linkedin.com/in/saddathasan"
							target="_blank"
							rel="noopener noreferrer">
							LinkedIn
						</a>
					</Button>
					<Button
						variant="outline"
						size="lg"
						asChild>
						<Link to="/contact">Contact</Link>
					</Button>
				</motion.div>
			</motion.section>

			{/* Tech Stack Section */}
			<motion.section
				className="mb-20"
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				viewport={{ once: true }}>
				<h2 className="text-3xl font-bold text-center mb-12">
					Tech Stack
				</h2>
				<div className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto">
					{techStack.map((tech, index) => (
						<motion.div
							key={tech}
							initial={{ opacity: 0, scale: 0.8 }}
							whileInView={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.4, delay: index * 0.05 }}
							viewport={{ once: true }}>
							<Badge
								variant="secondary"
								className="text-sm py-2 px-4 hover:bg-primary hover:text-primary-foreground transition-colors">
								{tech}
							</Badge>
						</motion.div>
					))}
				</div>
			</motion.section>
		</div>
	),
});
