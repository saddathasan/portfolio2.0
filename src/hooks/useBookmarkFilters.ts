import { useState, useMemo } from "react";
import { useDebounce } from "./useDebounce";
import type { Bookmark } from "./useBookmarks";

export type SortOption = "title" | "date" | "category";
export type SortOrder = "asc" | "desc";

export interface BookmarkFilters {
  searchQuery: string;
  selectedCategory: string;
  selectedTags: string[];
  sortBy: SortOption;
  sortOrder: SortOrder;
  showFavoritesOnly: boolean;
}

export interface UseBookmarkFiltersReturn {
  filters: BookmarkFilters;
  debouncedSearchQuery: string;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  setSelectedTags: (tags: string[]) => void;
  setSortBy: (sortBy: SortOption) => void;
  setSortOrder: (order: SortOrder) => void;
  setShowFavoritesOnly: (show: boolean) => void;
  toggleTag: (tag: string) => void;
  clearFilters: () => void;
  applyFilters: (bookmarks: Bookmark[]) => Bookmark[];
  hasActiveFilters: boolean;
}

const initialFilters: BookmarkFilters = {
  searchQuery: "",
  selectedCategory: "all",
  selectedTags: [],
  sortBy: "date",
  sortOrder: "desc",
  showFavoritesOnly: false,
};

export function useBookmarkFilters(): UseBookmarkFiltersReturn {
  const [filters, setFilters] = useState<BookmarkFilters>(initialFilters);
  
  // Debounce search query for better performance
  const debouncedSearchQuery = useDebounce(filters.searchQuery, 300);

  const setSearchQuery = (query: string) => {
    setFilters(prev => ({ ...prev, searchQuery: query }));
  };

  const setSelectedCategory = (category: string) => {
    setFilters(prev => ({ ...prev, selectedCategory: category }));
  };

  const setSelectedTags = (tags: string[]) => {
    setFilters(prev => ({ ...prev, selectedTags: tags }));
  };

  const setSortBy = (sortBy: SortOption) => {
    setFilters(prev => ({ ...prev, sortBy }));
  };

  const setSortOrder = (order: SortOrder) => {
    setFilters(prev => ({ ...prev, sortOrder: order }));
  };

  const setShowFavoritesOnly = (show: boolean) => {
    setFilters(prev => ({ ...prev, showFavoritesOnly: show }));
  };

  const toggleTag = (tag: string) => {
    setFilters(prev => ({
      ...prev,
      selectedTags: prev.selectedTags.includes(tag)
        ? prev.selectedTags.filter(t => t !== tag)
        : [...prev.selectedTags, tag]
    }));
  };

  const clearFilters = () => {
    setFilters(initialFilters);
  };

  const hasActiveFilters = useMemo(() => {
    return (
      filters.searchQuery.trim() !== "" ||
      (filters.selectedCategory !== "" && filters.selectedCategory !== "all") ||
      filters.selectedTags.length > 0 ||
      filters.showFavoritesOnly ||
      filters.sortBy !== "date" ||
      filters.sortOrder !== "desc"
    );
  }, [filters]);

  const applyFilters = useMemo(() => {
    return (bookmarks: Bookmark[]) => {
      let filtered = [...bookmarks];

      // Apply search filter
      if (debouncedSearchQuery.trim()) {
        const searchTerm = debouncedSearchQuery.toLowerCase();
        filtered = filtered.filter(bookmark =>
          bookmark.title.toLowerCase().includes(searchTerm) ||
          bookmark.description.toLowerCase().includes(searchTerm) ||
          bookmark.category.toLowerCase().includes(searchTerm) ||
          bookmark.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
      }

      // Apply category filter
      if (filters.selectedCategory && filters.selectedCategory !== "all") {
        filtered = filtered.filter(bookmark =>
          bookmark.category.toLowerCase() === filters.selectedCategory.toLowerCase()
        );
      }

      // Apply tags filter
      if (filters.selectedTags.length > 0) {
        filtered = filtered.filter(bookmark =>
          filters.selectedTags.some(selectedTag =>
            bookmark.tags.some(tag => tag.toLowerCase() === selectedTag.toLowerCase())
          )
        );
      }

      // Apply favorites filter
      if (filters.showFavoritesOnly) {
        filtered = filtered.filter(bookmark => bookmark.isFavorite);
      }

      // Apply sorting
      filtered.sort((a, b) => {
        let comparison = 0;

        switch (filters.sortBy) {
          case "title":
            comparison = a.title.localeCompare(b.title);
            break;
          case "date":
            comparison = new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime();
            break;
          case "category":
            comparison = a.category.localeCompare(b.category);
            break;
          default:
            comparison = 0;
        }

        return filters.sortOrder === "asc" ? comparison : -comparison;
      });

      return filtered;
    };
  }, [debouncedSearchQuery, filters]);

  return {
    filters,
    debouncedSearchQuery,
    setSearchQuery,
    setSelectedCategory,
    setSelectedTags,
    setSortBy,
    setSortOrder,
    setShowFavoritesOnly,
    toggleTag,
    clearFilters,
    applyFilters,
    hasActiveFilters,
  };
}