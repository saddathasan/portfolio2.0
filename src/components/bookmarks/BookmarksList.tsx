import type { Bookmark } from "@/hooks/useBookmarks";
import { BookmarkCard } from "@/components/bookmarks/BookmarkCard";

interface BookmarksListProps {
	bookmarks: Bookmark[];
	isFiltered: boolean;
	searchQuery: string;
}

export function BookmarksList({
	bookmarks,
	isFiltered,
	searchQuery,
}: BookmarksListProps) {
	if (bookmarks.length === 0) {
		return (
			<div className="flex items-center justify-center py-12">
				<div className="text-center">
					<h3 className="text-lg font-semibold text-foreground mb-2">
						{isFiltered
							? "No bookmarks found"
							: "No bookmarks available"}
					</h3>
					<p className="text-muted-foreground">
						{isFiltered
							? "Try adjusting your filters or search query"
							: "Start adding bookmarks to see them here"}
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
			{bookmarks.map((bookmark) => (
				<BookmarkCard
					key={bookmark.id}
					bookmark={bookmark}
					searchQuery={searchQuery}
				/>
			))}
		</div>
	);
}
