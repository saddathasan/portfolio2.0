import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface BookmarksHeaderProps {
  totalBookmarks: number;
  filteredCount: number;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

export function BookmarksHeader({
  totalBookmarks,
  filteredCount,
  hasActiveFilters,
  onClearFilters,
}: BookmarksHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="text-sm text-muted-foreground">
          {hasActiveFilters ? (
            <>
              Showing {filteredCount} of {totalBookmarks} bookmarks
            </>
          ) : (
            <>
              {totalBookmarks} bookmarks
            </>
          )}
        </div>
        
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            className="h-8 px-3 text-xs"
          >
            <X className="h-3 w-3 mr-1" />
            Clear filters
          </Button>
        )}
      </div>
    </div>
  );
}