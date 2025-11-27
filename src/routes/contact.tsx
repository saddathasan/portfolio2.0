import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/Section";
import { ContactForm } from "@/components/ContactForm";
import { contactInfo, contactPageInfo } from "@/data/contact";
import { Mail, Linkedin, Github, MapPin } from "lucide-react";

export const Route = createFileRoute("/contact")({
	component: Contact,
});

function Contact() {
	const getIcon = (iconName: string) => {
		switch (iconName) {
			case "📧": return <Mail className="w-6 h-6" />;
			case "💼": return <Linkedin className="w-6 h-6" />;
			case "🐱": return <Github className="w-6 h-6" />;
			case "🌐": return <MapPin className="w-6 h-6" />;
			default: return null;
		}
	};

	return (
		<div className="flex flex-col min-h-screen pt-10">
			<Section title={contactPageInfo.title} subtitle="Get in Touch">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
					{/* Contact Info */}
					<div>
						<p className="text-lg text-muted-foreground mb-12 leading-relaxed">
							{contactPageInfo.description}
						</p>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
							{contactInfo.map((info) => (
								<a
									key={info.title}
									href={info.link}
									target={info.isExternal ? "_blank" : undefined}
									rel={info.isExternal ? "noreferrer" : undefined}
									className={`p-6 rounded-2xl bg-card/50 border border-border/50 transition-colors flex flex-col gap-4 ${
										info.link ? 'hover:border-primary/50 hover:bg-card/80 cursor-pointer' : ''
									}`}
								>
									<div className="p-3 rounded-lg bg-primary/10 text-primary w-fit">
										{getIcon(info.icon)}
									</div>
									<div>
										<h3 className="font-bold mb-1">{info.title}</h3>
										<p className="text-sm text-muted-foreground mb-2">{info.description}</p>
										<p className="font-medium text-primary break-all">{info.content}</p>
									</div>
								</a>
							))}
						</div>
					</div>

					{/* Contact Form */}
					<div className="bg-card/30 p-8 rounded-3xl border border-border/50 backdrop-blur-sm">
						<ContactForm responseTime={contactPageInfo.responseTime} />
					</div>
				</div>
			</Section>
		</div>
	);
}

