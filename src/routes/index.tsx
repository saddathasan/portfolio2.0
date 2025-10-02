import { createFileRoute } from "@tanstack/react-router";
import { Copyright } from "../components/Copyright";
import { HeroSection } from "../components/HeroSection";
import { ResumeDownloadButton } from "../components/ResumeDownloadButton";

export const Route = createFileRoute("/")({
	component: Index,
});

function Index() {
	return (
		<div className="flex flex-col h-full w-full">
			<div className="flex-1 container mx-auto flex justify-center items-center">
				<div className="max-w-4xl mx-auto">
					{/* Hero Section with Native Tailwind Font Weights */}
					<section className="text-left space-y-2">
						<HeroSection.Title className="font-clash-display text-4xl md:text-6xl tracking-tight">
							Saddat Hasan
						</HeroSection.Title>

						<HeroSection.Subtitle className="font-cabinet-grotesk text-xl md:text-2xl font-medium text-muted-foreground">
							Software Engineer
						</HeroSection.Subtitle>

						<HeroSection.Description className="font-cabinet-grotesk text-lg font-normal leading-relaxed text-muted-foreground max-w-2xl">
							Crafting digital experiences with modern web
							technologies. Passionate about clean code, intuitive
							design, and building products that make a
							difference.
						</HeroSection.Description>
					</section>

					{/* Resume Download Button */}
					<div className="md:mt-10 mt-20 flex justify-center md:justify-start">
						<ResumeDownloadButton variant="compact" />
					</div>
				</div>
			</div>

			{/* Copyright Section at Bottom */}
			<Copyright className="py-4" />
		</div>
	);
}
