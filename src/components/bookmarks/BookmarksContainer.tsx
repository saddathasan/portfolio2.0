import { BookmarksFilters } from "@/components/bookmarks/BookmarksFilters";
import { BookmarksHeader } from "@/components/bookmarks/BookmarksHeader";
import { BookmarksList } from "@/components/bookmarks/BookmarksList";
import { BookmarksStats } from "@/components/bookmarks/BookmarksStats";
import { GridSkeleton } from "@/components/LoadingSkeletons";
import { useBookmarkFilters } from "@/hooks/useBookmarkFilters";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useState } from "react";

export function BookmarksContainer() {
	const { bookmarks, categories, metadata, isLoading, error } =
		useBookmarks();
	const {
		filters,
		setSearchQuery,
		setSelectedCategory,
		setSortBy,
		setSortOrder,
		setShowFavoritesOnly,
		toggleTag,
		clearFilters,
		applyFilters,
		hasActiveFilters,
	} = useBookmarkFilters();

	const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);

	const filteredBookmarks = applyFilters(bookmarks);

	if (isLoading) {
		return (
			<div className="space-y-6">
				<GridSkeleton count={6} />
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex items-center justify-center py-12">
				<div className="text-center">
					<h3 className="text-lg font-semibold text-foreground mb-2">
						Failed to load bookmarks
					</h3>
					<p className="text-muted-foreground">{error}</p>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<BookmarksHeader
				totalBookmarks={bookmarks.length}
				filteredCount={filteredBookmarks.length}
				hasActiveFilters={hasActiveFilters}
				onClearFilters={clearFilters}
			/>

			<BookmarksStats
				metadata={metadata}
				totalBookmarks={bookmarks.length}
				categories={categories}
			/>

			<BookmarksFilters
				filters={filters}
				categories={categories}
				allTags={Array.from(
					new Set(bookmarks.flatMap((b) => b.tags)),
				).sort()}
				onSearchChange={setSearchQuery}
				onCategoryChange={setSelectedCategory}
				onSortByChange={setSortBy}
				onSortOrderChange={setSortOrder}
				onFavoritesToggle={setShowFavoritesOnly}
				onTagToggle={toggleTag}
				onClearFilters={clearFilters}
				isExpanded={isFiltersExpanded}
				onToggleExpanded={setIsFiltersExpanded}
			/>

			<BookmarksList
				bookmarks={filteredBookmarks}
				isFiltered={hasActiveFilters}
				searchQuery={filters.searchQuery}
			/>
		</div>
	);
}
