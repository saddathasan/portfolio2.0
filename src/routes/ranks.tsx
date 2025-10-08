import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/ranks")({
	component: Ranks,
});

function Ranks() {
	return (
		<div className="flex flex-col h-full w-full">
			<div className="flex-1 container mx-auto flex justify-center items-center">
				<div className="max-w-4xl mx-auto text-center">
					<h1 className="text-4xl md:text-6xl font-bold mb-4">
						Ranks Page
					</h1>
					<p className="text-lg md:text-xl text-muted-foreground">
						This is the Ranks page. Content coming soon!
					</p>
				</div>
			</div>
		</div>
	);
}
