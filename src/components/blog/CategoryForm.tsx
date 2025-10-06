/**
 * Category Form Component
 * 
 * A form component for creating and editing blog categories with validation,
 * color picker, and slug generation functionality.
 * 
 * Features:
 * - Category name and description input
 * - Auto-generated URL slug
 * - Color picker for category theming
 * - Form validation with Zod
 * - Responsive design
 * - Loading states
 */

import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { BlogCategory } from '@/types/database';
import { Save, X } from 'lucide-react';

// =============================================================================
// Validation Schema
// =============================================================================

const categorySchema = z.object({
  name: z.string().min(1, 'Category name is required').max(100, 'Name must be less than 100 characters'),
  slug: z.string().min(1, 'Slug is required').max(100, 'Slug must be less than 100 characters'),
  description: z.string().max(500, 'Description must be less than 500 characters').optional(),
  color: z.string().regex(/^#[0-9A-F]{6}$/i, 'Must be a valid hex color').optional(),
});

type CategoryFormData = z.infer<typeof categorySchema>;

// =============================================================================
// Component Props
// =============================================================================

interface CategoryFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CategoryFormData) => Promise<void>;
  initialData?: Partial<BlogCategory>;
  isLoading?: boolean;
  mode: 'create' | 'edit';
}

// =============================================================================
// Utility Functions
// =============================================================================

/**
 * Generate a URL-friendly slug from a category name
 */
const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
};

/**
 * Generate a random hex color
 */
const generateRandomColor = (): string => {
  const colors = [
    '#3B82F6', // Blue
    '#10B981', // Green
    '#F59E0B', // Yellow
    '#EF4444', // Red
    '#8B5CF6', // Purple
    '#F97316', // Orange
    '#06B6D4', // Cyan
    '#84CC16', // Lime
    '#EC4899', // Pink
    '#6B7280', // Gray
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

// =============================================================================
// Color Picker Component
// =============================================================================

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ value, onChange }) => {
  const predefinedColors = [
    '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
    '#F97316', '#06B6D4', '#84CC16', '#EC4899', '#6B7280',
    '#1F2937', '#7C3AED', '#DC2626', '#059669', '#D97706',
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-12 h-8 p-1 border rounded cursor-pointer"
        />
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#000000"
          className="flex-1 font-mono text-sm"
        />
      </div>
      
      <div className="grid grid-cols-5 gap-2">
        {predefinedColors.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => onChange(color)}
            className={`w-8 h-8 rounded border-2 transition-all hover:scale-110 ${
              value === color ? 'border-gray-900 dark:border-gray-100' : 'border-gray-300'
            }`}
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
      </div>
    </div>
  );
};

// =============================================================================
// Main Category Form Component
// =============================================================================

export const CategoryForm: React.FC<CategoryFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading = false,
  mode,
}) => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: initialData?.name || '',
      slug: initialData?.slug || '',
      description: initialData?.description || '',
      color: initialData?.color || generateRandomColor(),
    },
  });

  // Watch name changes to auto-generate slug
  const watchedName = watch('name');

  // Auto-generate slug when name changes (only for new categories)
  useEffect(() => {
    if (mode === 'create' && watchedName) {
      const newSlug = generateSlug(watchedName);
      setValue('slug', newSlug);
    }
  }, [watchedName, mode, setValue]);

  // Reset form when dialog opens/closes
  useEffect(() => {
    if (isOpen) {
      reset({
        name: initialData?.name || '',
        slug: initialData?.slug || '',
        description: initialData?.description || '',
        color: initialData?.color || generateRandomColor(),
      });
    }
  }, [isOpen, initialData, reset]);

  // Handle form submission
  const handleFormSubmit = async (data: CategoryFormData) => {
    try {
      await onSubmit(data);
      onClose();
      reset();
    } catch (error) {
      console.error('Category form submission error:', error);
    }
  };

  // Handle dialog close
  const handleClose = () => {
    onClose();
    reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Create New Category' : 'Edit Category'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'create' 
              ? 'Add a new category to organize your blog posts.'
              : 'Update the category information.'
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* Category Name */}
          <div>
            <Label htmlFor="name">Category Name *</Label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="name"
                  placeholder="Enter category name"
                  className={errors.name ? 'border-red-500' : ''}
                />
              )}
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Category Slug */}
          <div>
            <Label htmlFor="slug">URL Slug *</Label>
            <Controller
              name="slug"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="slug"
                  placeholder="url-friendly-slug"
                  className={errors.slug ? 'border-red-500' : ''}
                />
              )}
            />
            {errors.slug && (
              <p className="text-sm text-red-500 mt-1">{errors.slug.message}</p>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              This will be used in URLs: /blog/category/{watch('slug')}
            </p>
          </div>

          {/* Category Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  id="description"
                  placeholder="Brief description of this category"
                  rows={3}
                  className={errors.description ? 'border-red-500' : ''}
                />
              )}
            />
            {errors.description && (
              <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              {watch('description')?.length || 0}/500 characters
            </p>
          </div>

          {/* Category Color */}
          <div>
            <Label htmlFor="color">Category Color</Label>
            <Controller
              name="color"
              control={control}
              render={({ field }) => (
                <ColorPicker
                  value={field.value || '#3B82F6'}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.color && (
              <p className="text-sm text-red-500 mt-1">{errors.color.message}</p>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              This color will be used for category badges and theming
            </p>
          </div>

          {/* Preview */}
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
            <p className="text-sm font-medium mb-2">Preview:</p>
            <div className="flex items-center space-x-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: watch('color') || '#3B82F6' }}
              />
              <span className="text-sm font-medium">{watch('name') || 'Category Name'}</span>
            </div>
            {watch('description') && (
              <p className="text-xs text-muted-foreground mt-1">
                {watch('description')}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              <Save className="h-4 w-4 mr-2" />
              {isLoading 
                ? 'Saving...' 
                : mode === 'create' 
                  ? 'Create Category' 
                  : 'Update Category'
              }
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryForm;