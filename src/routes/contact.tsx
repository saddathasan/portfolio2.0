import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const Route = createFileRoute("/contact")({
	component: () => (
		<div className="container mx-auto px-4 py-16">
			<motion.div
				className="max-w-4xl mx-auto"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}>
				<div className="text-center mb-12">
					<h1 className="text-4xl font-bold mb-4">Get In Touch</h1>
					<p className="text-xl text-muted-foreground">
						I'm always interested in new opportunities and
						collaborations. Let's discuss how we can work together!
					</p>
				</div>

				<div className="grid md:grid-cols-2 gap-8">
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}>
						<h2 className="text-2xl font-semibold mb-6">
							Let's Connect
						</h2>
						<div className="space-y-4">
							<Card className="hover:shadow-md transition-shadow">
								<CardHeader className="pb-3">
									<CardTitle className="text-lg flex items-center gap-2">
										📧 Email
									</CardTitle>
									<CardDescription>
										Drop me a line anytime
									</CardDescription>
								</CardHeader>
								<CardContent>
									<a
										href="mailto:saddathasan94@gmail.com"
										className="text-primary hover:underline font-medium">
										saddathasan94@gmail.com
									</a>
								</CardContent>
							</Card>

							<Card className="hover:shadow-md transition-shadow">
								<CardHeader className="pb-3">
									<CardTitle className="text-lg flex items-center gap-2">
										💼 LinkedIn
									</CardTitle>
									<CardDescription>
										Let's connect professionally
									</CardDescription>
								</CardHeader>
								<CardContent>
									<a
										href="https://linkedin.com/in/saddathasan"
										target="_blank"
										rel="noopener noreferrer"
										className="text-primary hover:underline font-medium">
										linkedin.com/in/saddathasan
									</a>
								</CardContent>
							</Card>

							<Card className="hover:shadow-md transition-shadow">
								<CardHeader className="pb-3">
									<CardTitle className="text-lg flex items-center gap-2">
										🏢 Current Position
									</CardTitle>
									<CardDescription>
										Currently working at
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div>
										<p className="font-medium">
											Software Engineer
										</p>
										<p className="text-sm text-muted-foreground">
											Talvette Limited
										</p>
										<p className="text-sm text-muted-foreground">
											Oct 2023 - Present
										</p>
									</div>
								</CardContent>
							</Card>

							<Card className="hover:shadow-md transition-shadow">
								<CardHeader className="pb-3">
									<CardTitle className="text-lg flex items-center gap-2">
										📍 Location
									</CardTitle>
									<CardDescription>Based in</CardDescription>
								</CardHeader>
								<CardContent>
									<p className="font-medium">
										Dhaka, Bangladesh
									</p>
									<p className="text-sm text-muted-foreground">
										Available for remote work
									</p>
								</CardContent>
							</Card>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 20 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}>
						<h2 className="text-2xl font-semibold mb-6">
							Send a Message
						</h2>
						<Card>
							<CardContent className="pt-6">
								<form
									className="space-y-4"
									onSubmit={(e) => e.preventDefault()}>
									<div>
										<label
											htmlFor="name"
											className="block text-sm font-medium mb-2">
											Name
										</label>
										<Input
											type="text"
											id="name"
											placeholder="Your name"
											required
										/>
									</div>

									<div>
										<label
											htmlFor="email"
											className="block text-sm font-medium mb-2">
											Email
										</label>
										<Input
											type="email"
											id="email"
											placeholder="your.email@example.com"
											required
										/>
									</div>

									<div>
										<label
											htmlFor="subject"
											className="block text-sm font-medium mb-2">
											Subject
										</label>
										<Input
											type="text"
											id="subject"
											placeholder="What's this about?"
											required
										/>
									</div>

									<div>
										<label
											htmlFor="message"
											className="block text-sm font-medium mb-2">
											Message
										</label>
										<Textarea
											id="message"
											rows={5}
											placeholder="Tell me about your project or just say hello!"
											required
										/>
									</div>

									<Button
										type="submit"
										className="w-full"
										size="lg">
										Send Message
									</Button>

									<p className="text-sm text-muted-foreground text-center">
										I'll get back to you within 24 hours
									</p>
								</form>
							</CardContent>
						</Card>
					</motion.div>
				</div>
			</motion.div>
		</div>
	),
});
