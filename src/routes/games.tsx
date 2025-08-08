import { createFileRoute } from '@tanstack/react-router';
import { PageLayout, Section } from '../components';
import { motion } from 'framer-motion';

export const Route = createFileRoute('/games')({
	component: GamesPage,
});

function GamesPage() {
	return (
		<PageLayout>
			<Section className="min-h-[60vh] flex items-center justify-center">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="text-center space-y-6"
				>
					<motion.div
						initial={{ scale: 0.8 }}
						animate={{ scale: 1 }}
						transition={{ delay: 0.2, duration: 0.5 }}
						className="text-8xl mb-4"
					>
						🎮
					</motion.div>
					<Section.Header
						size="xl"
						gradient
						centered
						className="mb-4"
					>
						Games
					</Section.Header>
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.4, duration: 0.5 }}
						className="text-xl text-muted-foreground max-w-md mx-auto"
					>
						Exciting interactive experiences coming soon! Stay tuned for some fun projects and mini-games.
					</motion.p>
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.6, duration: 0.5 }}
						className="inline-block px-6 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-medium shadow-glow animate-pulse-glow"
					>
						Coming Soon
					</motion.div>
				</motion.div>
			</Section>
		</PageLayout>
	);
}