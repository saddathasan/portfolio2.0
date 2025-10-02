import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "../components/HeroSection";

export const Route = createFileRoute("/")({
	component: Index,
});

function Index() {
	return (
		<div className="">
			<div className="container mx-auto px-4 py-16">
				<div className="max-w-4xl mx-auto space-y-16">
					{/* Hero Section with Native Tailwind Font Weights */}
					<section className="text-center space-y-8">
						<HeroSection.Title className="font-clash-display text-6xl md:text-8xl font-bold tracking-tight">
							Saddat Hasan
						</HeroSection.Title>

						<HeroSection.Subtitle className="font-cabinet-grotesk text-xl md:text-2xl font-medium text-muted-foreground">
							Full Stack Developer & UI/UX Designer
						</HeroSection.Subtitle>

						<HeroSection.Location className="font-cabinet-grotesk text-lg font-normal text-muted-foreground">
							Based in Dhaka, Bangladesh
						</HeroSection.Location>

						<HeroSection.Description className="font-inter text-lg font-normal leading-relaxed text-muted-foreground max-w-2xl mx-auto">
							Crafting digital experiences with modern web
							technologies. Passionate about clean code, intuitive
							design, and building products that make a
							difference.
						</HeroSection.Description>
					</section>

					{/* Font Integration Test Section */}
					{/* <section className="border-t pt-16">
            <FontIntegrationTest />
          </section> */}
				</div>
			</div>
		</div>
	);
}
