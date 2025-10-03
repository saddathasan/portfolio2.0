import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Heart, Calendar, Folder } from "lucide-react";
import type { Bookmark } from "@/hooks/useBookmarks";

interface BookmarkCardProps {
  bookmark: Bookmark;
  searchQuery?: string;
}

export function BookmarkCard({ bookmark, searchQuery = "" }: BookmarkCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 dark:bg-yellow-800 px-0.5 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const handleOpenLink = () => {
    window.open(bookmark.url, "_blank", "noopener,noreferrer");
  };

  return (
    <Card className="p-4 hover:shadow-md transition-shadow duration-200 group">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground text-sm leading-tight mb-1 line-clamp-2">
              {highlightText(bookmark.title, searchQuery)}
            </h3>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Folder className="h-3 w-3" />
              <span>{bookmark.category}</span>
            </div>
          </div>
          
          {bookmark.isFavorite && (
            <Heart className="h-4 w-4 text-red-500 fill-current flex-shrink-0 ml-2" />
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">
          {highlightText(bookmark.description, searchQuery)}
        </p>

        {/* Tags */}
        {bookmark.tags.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {bookmark.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {highlightText(tag, searchQuery)}
                </Badge>
              ))}
              {bookmark.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{bookmark.tags.length - 3}
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{formatDate(bookmark.dateAdded)}</span>
          </div>
          
          <Button
            size="sm"
            variant="outline"
            onClick={handleOpenLink}
            className="h-8 px-3 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            Visit
          </Button>
        </div>
      </div>
    </Card>
  );
}