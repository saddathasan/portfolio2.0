import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  X,
  Heart,
  ArrowUpDown,
} from "lucide-react";
import type { BookmarkFilters, SortOption, SortOrder } from "@/hooks/useBookmarkFilters";

interface BookmarksFiltersProps {
  filters: BookmarkFilters;
  categories: string[];
  allTags: string[];
  onSearchChange: (query: string) => void;
  onCategoryChange: (category: string) => void;
  onSortByChange: (sortBy: SortOption) => void;
  onSortOrderChange: (order: SortOrder) => void;
  onFavoritesToggle: (show: boolean) => void;
  onTagToggle: (tag: string) => void;
  onClearFilters: () => void;
  isExpanded: boolean;
  onToggleExpanded: (expanded: boolean) => void;
}

export function BookmarksFilters({
  filters,
  categories,
  allTags,
  onSearchChange,
  onCategoryChange,
  onSortByChange,
  onSortOrderChange,
  onFavoritesToggle,
  onTagToggle,
  onClearFilters,
  isExpanded,
  onToggleExpanded,
}: BookmarksFiltersProps) {
  const [tagSearchQuery, setTagSearchQuery] = useState("");

  const filteredTags = allTags.filter(tag =>
    tag.toLowerCase().includes(tagSearchQuery.toLowerCase())
  );

  const hasActiveFilters = 
    filters.searchQuery.trim() !== "" ||
    filters.selectedCategory !== "" ||
    filters.selectedTags.length > 0 ||
    filters.showFavoritesOnly ||
    filters.sortBy !== "date" ||
    filters.sortOrder !== "desc";

  return (
    <Card className="p-4">
      {/* Search and Quick Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search bookmarks..."
            value={filters.searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          <Button
            variant={filters.showFavoritesOnly ? "default" : "outline"}
            size="sm"
            onClick={() => onFavoritesToggle(!filters.showFavoritesOnly)}
            className="flex items-center gap-2"
          >
            <Heart className={`h-4 w-4 ${filters.showFavoritesOnly ? "fill-current" : ""}`} />
            Favorites
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onToggleExpanded(!isExpanded)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="space-y-4 pt-4 border-t">
          {/* Category and Sort */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Category</label>
              <Select
                value={filters.selectedCategory}
                onValueChange={onCategoryChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Sort by</label>
              <Select
                value={filters.sortBy}
                onValueChange={(value) => onSortByChange(value as SortOption)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date Added</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                  <SelectItem value="category">Category</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Order</label>
              <Button
                variant="outline"
                onClick={() => onSortOrderChange(filters.sortOrder === "asc" ? "desc" : "asc")}
                className="w-full justify-between"
              >
                {filters.sortOrder === "asc" ? "Ascending" : "Descending"}
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="text-sm font-medium mb-2 block">Tags</label>
            <div className="space-y-3">
              <Input
                placeholder="Search tags..."
                value={tagSearchQuery}
                onChange={(e) => setTagSearchQuery(e.target.value)}
                className="h-8"
              />
              
              <div className="max-h-32 overflow-y-auto">
                <div className="flex flex-wrap gap-1">
                  {filteredTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant={filters.selectedTags.includes(tag) ? "default" : "secondary"}
                      className="cursor-pointer hover:bg-primary/80 text-xs"
                      onClick={() => onTagToggle(tag)}
                    >
                      {tag}
                      {filters.selectedTags.includes(tag) && (
                        <X className="h-3 w-3 ml-1" />
                      )}
                    </Badge>
                  ))}
                </div>
              </div>

              {filters.selectedTags.length > 0 && (
                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground mb-2">
                    Selected tags ({filters.selectedTags.length}):
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {filters.selectedTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="default"
                        className="cursor-pointer text-xs"
                        onClick={() => onTagToggle(tag)}
                      >
                        {tag}
                        <X className="h-3 w-3 ml-1" />
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <div className="pt-4 border-t">
              <Button
                variant="outline"
                size="sm"
                onClick={onClearFilters}
                className="w-full"
              >
                <X className="h-4 w-4 mr-2" />
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}