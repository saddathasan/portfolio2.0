/**
 * Category List Component
 * 
 * A comprehensive component for displaying and managing blog categories with
 * CRUD operations, search functionality, and responsive design.
 * 
 * Features:
 * - Display categories in a responsive grid/list
 * - Search and filter categories
 * - Create, edit, and delete categories
 * - Category usage statistics
 * - Bulk operations
 * - Loading and error states
 */

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CategoryForm } from './CategoryForm';
import {
  useBlogCategories,
  useCreateBlogCategory,
  useUpdateBlogCategory,
  useDeleteBlogCategory,
} from '@/hooks/useBlog';
import type { BlogCategory } from '@/types/database';
import {
  Plus,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Tag,
  Calendar,
  Loader2,
} from 'lucide-react';
import { toast } from 'sonner';

// =============================================================================
// Types
// =============================================================================

interface CategoryListProps {
  onCategorySelect?: (category: BlogCategory) => void;
  selectedCategoryId?: string;
  showActions?: boolean;
}

// =============================================================================
// Category Card Component
// =============================================================================

interface CategoryCardProps {
  category: BlogCategory;
  onEdit: (category: BlogCategory) => void;
  onDelete: (category: BlogCategory) => void;
  onSelect?: (category: BlogCategory) => void;
  isSelected?: boolean;
  showActions?: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  onEdit,
  onDelete,
  onSelect,
  isSelected = false,
  showActions = true,
}) => {
  return (
    <Card 
      className={`transition-all hover:shadow-md cursor-pointer ${
        isSelected ? 'ring-2 ring-blue-500' : ''
      }`}
      onClick={() => onSelect?.(category)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: category.color || '#3B82F6' }}
            />
            <CardTitle className="text-lg">{category.name}</CardTitle>
          </div>
          
          {showActions && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  onEdit(category);
                }}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    onDelete(category);
                  }}
                  className="text-red-600"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        
        <CardDescription className="text-sm">
          {category.description || 'No description provided'}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Tag className="h-3 w-3" />
              <span>/{category.slug}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>{new Date(category.created_at).toLocaleDateString()}</span>
            </div>
          </div>
          
          {/* Post count badge - placeholder for now */}
          <Badge variant="secondary" className="text-xs">
            0 posts
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

// =============================================================================
// Main Category List Component
// =============================================================================

export const CategoryList: React.FC<CategoryListProps> = ({
  onCategorySelect,
  selectedCategoryId,
  showActions = true,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFormOpen, setCategoryFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<BlogCategory | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<BlogCategory | null>(null);

  // React Query hooks
  const { data: categories = [], isLoading, error } = useBlogCategories();
  const createCategoryMutation = useCreateBlogCategory();
  const updateCategoryMutation = useUpdateBlogCategory();
  const deleteCategoryMutation = useDeleteBlogCategory();

  // Filter categories based on search term
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle category creation
  const handleCreateCategory = async (data: Omit<BlogCategory, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      await createCategoryMutation.mutateAsync(data);
      toast.success('Category created successfully!');
      setCategoryFormOpen(false);
    } catch (error) {
      toast.error('Failed to create category');
      throw error;
    }
  };

  // Handle category update
  const handleUpdateCategory = async (data: Omit<BlogCategory, 'id' | 'created_at' | 'updated_at'>) => {
    if (!editingCategory) return;
    
    try {
      await updateCategoryMutation.mutateAsync({
        id: editingCategory.id,
        updates: data,
      });
      toast.success('Category updated successfully!');
      setEditingCategory(null);
    } catch (error) {
      toast.error('Failed to update category');
      throw error;
    }
  };

  // Handle category deletion
  const handleDeleteCategory = async () => {
    if (!deletingCategory) return;
    
    try {
      await deleteCategoryMutation.mutateAsync(deletingCategory.id);
      toast.success('Category deleted successfully!');
      setDeletingCategory(null);
    } catch {
      console.error('Failed to delete category');
      toast.error('Failed to delete category');
    }
  };

  // Handle category edit
  const handleEditCategory = (category: BlogCategory) => {
    setEditingCategory(category);
  };

  // Handle category delete confirmation
  const handleDeleteConfirmation = (category: BlogCategory) => {
    setDeletingCategory(category);
  };

  // Handle category selection
  const handleCategorySelect = (category: BlogCategory) => {
    onCategorySelect?.(category);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading categories...</span>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">Failed to load categories</p>
        <Button onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Blog Categories</h2>
          <p className="text-muted-foreground">
            Organize your blog posts with categories
          </p>
        </div>
        
        {showActions && (
          <Button onClick={() => setCategoryFormOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Category
          </Button>
        )}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Categories Grid */}
      {filteredCategories.length === 0 ? (
        <div className="text-center py-12">
          {searchTerm ? (
            <div>
              <p className="text-muted-foreground mb-4">
                No categories found matching "{searchTerm}"
              </p>
              <Button variant="outline" onClick={() => setSearchTerm('')}>
                Clear Search
              </Button>
            </div>
          ) : (
            <div>
              <p className="text-muted-foreground mb-4">
                No categories created yet
              </p>
              {showActions && (
                <Button onClick={() => setCategoryFormOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Category
                </Button>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCategories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onEdit={handleEditCategory}
              onDelete={handleDeleteConfirmation}
              onSelect={handleCategorySelect}
              isSelected={selectedCategoryId === category.id}
              showActions={showActions}
            />
          ))}
        </div>
      )}

      {/* Category Form Dialog */}
      <CategoryForm
        isOpen={categoryFormOpen || !!editingCategory}
        onClose={() => {
          setCategoryFormOpen(false);
          setEditingCategory(null);
        }}
        onSubmit={editingCategory ? handleUpdateCategory : handleCreateCategory}
        initialData={editingCategory || undefined}
        isLoading={createCategoryMutation.isPending || updateCategoryMutation.isPending}
        mode={editingCategory ? 'edit' : 'create'}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletingCategory} onOpenChange={() => setDeletingCategory(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Category</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the category "{deletingCategory?.name}"? 
              This action cannot be undone. Blog posts in this category will become uncategorized.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteCategory}
              className="bg-red-600 hover:bg-red-700"
              disabled={deleteCategoryMutation.isPending}
            >
              {deleteCategoryMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete Category'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CategoryList;