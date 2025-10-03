import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Folder, Hash } from "lucide-react";
import type { BookmarksData } from "@/hooks/useBookmarks";

interface BookmarksStatsProps {
  metadata: BookmarksData["meta"];
  totalBookmarks: number;
  categories: string[];
}

export function BookmarksStats({
  metadata,
  totalBookmarks,
  categories,
}: BookmarksStatsProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Hash className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium">{totalBookmarks}</p>
            <p className="text-xs text-muted-foreground">Total Bookmarks</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Folder className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium">{categories.length}</p>
            <p className="text-xs text-muted-foreground">Categories</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Calendar className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium">
              {formatDate(metadata.lastUpdated)}
            </p>
            <p className="text-xs text-muted-foreground">Last Updated</p>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t">
        <p className="text-xs text-muted-foreground mb-2">Categories:</p>
        <div className="flex flex-wrap gap-1">
          {categories.map((category) => (
            <Badge key={category} variant="secondary" className="text-xs">
              {category}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
}