import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/Section";
import { aboutInfo } from "@/data/about";
import { experiences } from "@/data/experience";
import { certificates } from "@/data";
import { ExternalLink, GraduationCap, Award } from "lucide-react";

export const Route = createFileRoute("/about")({
	component: About,
});

function About() {
	return (
		<div className="flex flex-col min-h-screen pt-10">
			{/* Bio Section */}
			<Section title="About Me" subtitle="My Story">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
					<div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
						{aboutInfo.bio.map((paragraph, index) => (
							<p key={index}>{paragraph}</p>
						))}
					</div>
					<div className="bg-card/50 p-8 rounded-2xl border border-border/50">
						<h3 className="text-xl font-bold mb-6 text-foreground">What I Do</h3>
						<ul className="space-y-4">
							{aboutInfo.whatIDo.map((item, index) => (
								<li key={index} className="flex items-start gap-3">
									<div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5" />
									<span className="text-muted-foreground">{item}</span>
								</li>
							))}
						</ul>
					</div>
				</div>
			</Section>

			{/* Experience Section */}
			<Section title="Experience" subtitle="Career Path" className="bg-secondary/20">
				<div className="space-y-12 max-w-4xl mx-auto">
					{experiences.map((exp) => (
						<div key={exp.id} className="relative pl-8 md:pl-0">
							{/* Timeline Line */}
							<div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-px bg-border -translate-x-1/2" />
							
							<div className={`md:flex items-start justify-between gap-12 ${
								// Alternating layout logic could go here, but keeping it simple for now
								''
							}`}>
								<div className="md:w-1/2 md:text-right mb-4 md:mb-0 md:pr-12">
									<h3 className="text-xl font-bold text-foreground">{exp.role}</h3>
									<p className="text-primary font-medium mb-1">{exp.company}</p>
									<p className="text-sm text-muted-foreground font-mono">{exp.period}</p>
								</div>
								
								{/* Timeline Dot */}
								<div className="absolute left-0 md:left-[50%] top-1 w-4 h-4 rounded-full bg-primary border-4 border-background -translate-x-[5px] md:-translate-x-1/2 z-10" />

								<div className="md:w-1/2 md:pl-12">
									<ul className="space-y-2 mb-4">
										{exp.achievements.map((achievement, i) => (
											<li key={i} className="text-muted-foreground text-sm leading-relaxed">
												• {achievement}
											</li>
										))}
									</ul>
									<div className="flex flex-wrap gap-2">
										{exp.technologies.map((tech) => (
											<span key={tech} className="text-xs px-2 py-1 rounded bg-secondary text-secondary-foreground border border-border/50">
												{tech}
											</span>
										))}
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</Section>

			{/* Education & Certs */}
			<Section title="Education & Certifications" subtitle="Learning">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
					{/* Education */}
					<div>
						<div className="flex items-center gap-3 mb-8">
							<GraduationCap className="w-6 h-6 text-primary" />
							<h3 className="text-2xl font-bold">Education</h3>
						</div>
						<div className="p-6 rounded-2xl bg-card/50 border border-border/50">
							<h4 className="text-lg font-bold">{aboutInfo.education.degree}</h4>
							<p className="text-primary mb-2">{aboutInfo.education.institution}</p>
							<p className="text-sm text-muted-foreground font-mono mb-4">{aboutInfo.education.period}</p>
							<p className="text-muted-foreground text-sm">{aboutInfo.education.description}</p>
						</div>
					</div>

					{/* Certifications */}
					<div>
						<div className="flex items-center gap-3 mb-8">
							<Award className="w-6 h-6 text-primary" />
							<h3 className="text-2xl font-bold">Certifications</h3>
						</div>
						<div className="space-y-4">
							{certificates.map((cert, index) => (
								<div key={index} className="p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30 transition-colors">
									<div className="flex justify-between items-start mb-2">
										<h4 className="font-bold">{cert.name}</h4>
										{cert.credentialUrl && (
											<a href={cert.credentialUrl} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary">
												<ExternalLink className="w-4 h-4" />
											</a>
										)}
									</div>
									<p className="text-sm text-primary">{cert.issuer}</p>
									<p className="text-xs text-muted-foreground mt-2">{cert.issuingDate}</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</Section>
		</div>
	);
}

