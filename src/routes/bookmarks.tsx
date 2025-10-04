import { BookmarksContainer } from "@/components/bookmarks";
import { PageHeader } from "@/components/PageHeader";
import { PageLayout } from "@/components/PageLayout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/bookmarks")({
	component: () => (
		<PageLayout.Container>
			<PageLayout.Main>
				<PageHeader>
					<PageHeader.Title>Bookmarks</PageHeader.Title>
					<PageHeader.Description>
						A curated collection of valuable resources, articles,
						and tools that I find useful for development and
						learning
					</PageHeader.Description>
				</PageHeader>

				<BookmarksContainer />
			</PageLayout.Main>
		</PageLayout.Container>
	),
});
