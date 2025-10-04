import { useState, useEffect, useMemo } from "react";
import bookmarksData from "@/data/bookmarks.json";

export interface Bookmark {
  id: string;
  title: string;
  url: string;
  description: string;
  category: string;
  tags: string[];
  dateAdded: string;
  isFavorite: boolean;
}

export interface CategoryDefinition {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
}

export interface BookmarksData {
  meta: {
    version: string;
    lastUpdated: string;
    totalBookmarks: number;
  };
  categories: Record<string, CategoryDefinition>;
  bookmarks: Bookmark[];
}

export interface UseBookmarksReturn {
  bookmarks: Bookmark[];
  categories: string[];
  categoryDefinitions: Record<string, CategoryDefinition>;
  metadata: BookmarksData["meta"];
  isLoading: boolean;
  error: string | null;
  favoriteBookmarks: Bookmark[];
  getBookmarksByCategory: (category: string) => Bookmark[];
  getBookmarksByTag: (tag: string) => Bookmark[];
  searchBookmarks: (query: string) => Bookmark[];
}

export function useBookmarks(): UseBookmarksReturn {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<BookmarksData | null>(null);

  useEffect(() => {
    const loadBookmarks = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Simulate loading delay for better UX
        await new Promise(resolve => setTimeout(resolve, 100));
        
        setData(bookmarksData as BookmarksData);
      } catch (err) {
        setError("Failed to load bookmarks");
        console.error("Error loading bookmarks:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadBookmarks();
  }, []);

  const favoriteBookmarks = useMemo(() => {
    return data?.bookmarks.filter(bookmark => bookmark.isFavorite) || [];
  }, [data]);

  const getBookmarksByCategory = useMemo(() => {
    return (category: string) => {
      return data?.bookmarks.filter(bookmark => 
        bookmark.category.toLowerCase() === category.toLowerCase()
      ) || [];
    };
  }, [data]);

  const getBookmarksByTag = useMemo(() => {
    return (tag: string) => {
      return data?.bookmarks.filter(bookmark => 
        bookmark.tags.some(t => t.toLowerCase() === tag.toLowerCase())
      ) || [];
    };
  }, [data]);

  const searchBookmarks = useMemo(() => {
    return (query: string) => {
      if (!query.trim() || !data) return data?.bookmarks || [];
      
      const searchTerm = query.toLowerCase();
      return data.bookmarks.filter(bookmark => 
        bookmark.title.toLowerCase().includes(searchTerm) ||
        bookmark.description.toLowerCase().includes(searchTerm) ||
        bookmark.category.toLowerCase().includes(searchTerm) ||
        bookmark.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    };
  }, [data]);

  return {
    bookmarks: data?.bookmarks || [],
    categories: data?.categories ? Object.keys(data.categories) : [],
    categoryDefinitions: data?.categories || {},
    metadata: data?.meta || { version: "1.0.0", lastUpdated: "", totalBookmarks: 0 },
    isLoading,
    error,
    favoriteBookmarks,
    getBookmarksByCategory,
    getBookmarksByTag,
    searchBookmarks,
  };
}