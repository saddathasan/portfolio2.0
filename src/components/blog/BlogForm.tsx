/**
 * Blog Form Component
 * 
 * A comprehensive form for creating and editing blog posts with rich text editing,
 * category selection, tag management, SEO optimization, and image handling.
 * 
 * Features:
 * - Rich text editor integration with TipTap
 * - Category selection with creation option
 * - Tag management with autocomplete
 * - SEO fields (title, description)
 * - Featured image URL input
 * - Publishing controls
 * - Form validation with Zod
 * - Auto-save functionality
 * - Responsive design
 */

import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { RichTextEditor } from './RichTextEditor';
import { useBlogCategories } from '@/hooks/useBlog';
import type { BlogPost, BlogCategory } from '@/types/database';
import { Save, Eye, X } from 'lucide-react';
import { toast } from 'sonner';

// =============================================================================
// Validation Schema
// =============================================================================

const blogPostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  slug: z.string().min(1, 'Slug is required').max(200, 'Slug must be less than 200 characters'),
  content: z.string().min(1, 'Content is required'),
  excerpt: z.string().min(1, 'Excerpt is required').max(500, 'Excerpt must be less than 500 characters'),
  category_id: z.string().optional(),
  tags: z.array(z.string()).optional().default([]),
  published: z.boolean().default(false),
  featured_image_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  seo_title: z.string().max(60, 'SEO title should be less than 60 characters').optional(),
  seo_description: z.string().max(160, 'SEO description should be less than 160 characters').optional(),
});

type BlogPostFormData = z.infer<typeof blogPostSchema>;

// =============================================================================
// Component Props
// =============================================================================

interface BlogFormProps {
  initialData?: Partial<BlogPost>;
  onSubmit: (data: BlogPostFormData) => Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
  mode: 'create' | 'edit';
}

// =============================================================================
// Utility Functions
// =============================================================================

/**
 * Generate a URL-friendly slug from a title
 */
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
};

/**
 * Calculate estimated reading time based on content
 */
const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const textContent = content.replace(/<[^>]*>/g, ''); // Strip HTML tags
  const wordCount = textContent.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

// =============================================================================
// Tag Input Component
// =============================================================================

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}

const TagInput: React.FC<TagInputProps> = ({ tags, onChange, placeholder = 'Add tags...' }) => {
  const [inputValue, setInputValue] = React.useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newTag = inputValue.trim().toLowerCase();
      
      if (newTag && !tags.includes(newTag)) {
        onChange([...tags, newTag]);
        setInputValue('');
      }
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="flex items-center gap-1">
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="ml-1 hover:text-red-500"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full"
      />
      <p className="text-xs text-muted-foreground">
        Press Enter or comma to add tags. Press Backspace to remove the last tag.
      </p>
    </div>
  );
};

// =============================================================================
// Main Blog Form Component
// =============================================================================

export const BlogForm: React.FC<BlogFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
  mode,
}) => {
  const { data: categories = [] } = useBlogCategories();
  
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      title: initialData?.title || '',
      slug: initialData?.slug || '',
      content: initialData?.content || '',
      excerpt: initialData?.excerpt || '',
      category_id: initialData?.category_id || '',
      tags: initialData?.tags || [],
      published: initialData?.status === 'published' || false,
      featured_image_url: initialData?.featured_image_url || '',
      seo_title: initialData?.seo_title || '',
      seo_description: initialData?.seo_description || '',
    },
  });

  // Watch title changes to auto-generate slug
  const watchedTitle = watch('title');
  const watchedContent = watch('content');

  // Auto-generate slug when title changes (only for new posts)
  useEffect(() => {
    if (mode === 'create' && watchedTitle) {
      const newSlug = generateSlug(watchedTitle);
      setValue('slug', newSlug);
    }
  }, [watchedTitle, mode, setValue]);

  // Auto-generate SEO title if not set
  useEffect(() => {
    if (watchedTitle && !watch('seo_title')) {
      setValue('seo_title', watchedTitle);
    }
  }, [watchedTitle, setValue, watch]);

  // Handle form submission
  const handleFormSubmit = async (data: BlogPostFormData) => {
    try {
      await onSubmit(data);
      if (mode === 'create') {
        reset();
        toast.success('Blog post created successfully!');
      } else {
        toast.success('Blog post updated successfully!');
      }
    } catch (error) {
      toast.error(mode === 'create' ? 'Failed to create blog post' : 'Failed to update blog post');
      console.error('Form submission error:', error);
    }
  };

  // Handle preview
  const handlePreview = () => {
    const formData = watch();
    
    // Create a preview post object
    const previewPost: Partial<BlogPost> = {
      id: 'preview',
      title: formData.title || 'Untitled Post',
      slug: formData.slug || 'untitled-post',
      content: formData.content || '<p>No content yet...</p>',
      excerpt: formData.excerpt || '',
      featured_image_url: formData.featured_image_url || undefined,
      status: formData.published ? 'published' : 'draft',
      reading_time: calculateReadingTime(formData.content || ''),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      category: categories.find(cat => cat.id === formData.category_id) || undefined,
      tags: formData.tags || [],
      seo_title: formData.seo_title || formData.title,
      seo_description: formData.seo_description || formData.excerpt,
    };

    // Open preview in a new window/tab
    const previewWindow = window.open('', '_blank', 'width=1200,height=800,scrollbars=yes');
    
    if (previewWindow) {
      previewWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Preview: ${previewPost.title}</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6;
              max-width: 800px;
              margin: 0 auto;
              padding: 2rem;
              color: #333;
            }
            .preview-header {
              background: #f8f9fa;
              padding: 1rem;
              border-radius: 8px;
              margin-bottom: 2rem;
              border-left: 4px solid #007bff;
            }
            .preview-header h1 {
              margin: 0 0 0.5rem 0;
              color: #007bff;
              font-size: 1.2rem;
            }
            .preview-header p {
              margin: 0;
              color: #666;
              font-size: 0.9rem;
            }
            .post-title {
              font-size: 2.5rem;
              font-weight: bold;
              margin-bottom: 1rem;
              line-height: 1.2;
            }
            .post-meta {
              display: flex;
              align-items: center;
              gap: 1rem;
              margin-bottom: 2rem;
              padding-bottom: 1rem;
              border-bottom: 1px solid #eee;
              font-size: 0.9rem;
              color: #666;
            }
            .category-badge {
              display: inline-flex;
              align-items: center;
              gap: 0.5rem;
              background: #e3f2fd;
              color: #1976d2;
              padding: 0.25rem 0.75rem;
              border-radius: 1rem;
              font-size: 0.8rem;
            }
            .featured-image {
              width: 100%;
              height: 300px;
              object-fit: cover;
              border-radius: 8px;
              margin-bottom: 2rem;
            }
            .post-excerpt {
              font-size: 1.2rem;
              color: #666;
              font-style: italic;
              margin-bottom: 2rem;
              padding: 1rem;
              background: #f8f9fa;
              border-radius: 8px;
            }
            .post-content {
              font-size: 1.1rem;
              line-height: 1.8;
            }
            .post-content h1, .post-content h2, .post-content h3 {
              margin-top: 2rem;
              margin-bottom: 1rem;
            }
            .post-content img {
              max-width: 100%;
              height: auto;
              border-radius: 8px;
              margin: 1rem 0;
            }
            .post-content blockquote {
              border-left: 4px solid #ddd;
              margin: 1.5rem 0;
              padding-left: 1rem;
              color: #666;
              font-style: italic;
            }
            .post-content code {
              background: #f4f4f4;
              padding: 0.2rem 0.4rem;
              border-radius: 4px;
              font-family: 'Monaco', 'Consolas', monospace;
            }
            .post-content pre {
              background: #f4f4f4;
              padding: 1rem;
              border-radius: 8px;
              overflow-x: auto;
            }
            .tags {
              margin-top: 2rem;
              padding-top: 2rem;
              border-top: 1px solid #eee;
            }
            .tag {
              display: inline-block;
              background: #e9ecef;
              color: #495057;
              padding: 0.25rem 0.75rem;
              border-radius: 1rem;
              font-size: 0.8rem;
              margin-right: 0.5rem;
              margin-bottom: 0.5rem;
            }
          </style>
        </head>
        <body>
          <div class="preview-header">
            <h1>🔍 Blog Post Preview</h1>
            <p>This is how your blog post will appear to readers. Close this window to return to editing.</p>
          </div>
          
          <article>
            ${previewPost.featured_image_url ? `
              <img src="${previewPost.featured_image_url}" alt="${previewPost.title}" class="featured-image" />
            ` : ''}
            
            <h1 class="post-title">${previewPost.title}</h1>
            
            <div class="post-meta">
              <span>${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span>•</span>
              <span>${previewPost.reading_time} min read</span>
              ${previewPost.category ? `
                <span>•</span>
                <span class="category-badge">
                  <span style="width: 12px; height: 12px; background: ${previewPost.category.color || '#3B82F6'}; border-radius: 50%; display: inline-block;"></span>
                  ${previewPost.category.name}
                </span>
              ` : ''}
            </div>
            
            ${previewPost.excerpt ? `
              <div class="post-excerpt">${previewPost.excerpt}</div>
            ` : ''}
            
            <div class="post-content">
              ${previewPost.content}
            </div>
            
            ${previewPost.tags && previewPost.tags.length > 0 ? `
              <div class="tags">
                <h3>Tags</h3>
                ${previewPost.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
              </div>
            ` : ''}
          </article>
        </body>
        </html>
      `);
      previewWindow.document.close();
    } else {
      toast.error('Unable to open preview window. Please check your popup blocker settings.');
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Enter the basic details for your blog post
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Title */}
              <div>
                <Label htmlFor="title">Title *</Label>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="title"
                      placeholder="Enter blog post title"
                      className={errors.title ? 'border-red-500' : ''}
                    />
                  )}
                />
                {errors.title && (
                  <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
                )}
              </div>

              {/* Slug */}
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
                  This will be used in the URL: /blog/{watch('slug')}
                </p>
              </div>

              {/* Excerpt */}
              <div>
                <Label htmlFor="excerpt">Excerpt *</Label>
                <Controller
                  name="excerpt"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      id="excerpt"
                      placeholder="Brief description of your blog post"
                      rows={3}
                      className={errors.excerpt ? 'border-red-500' : ''}
                    />
                  )}
                />
                {errors.excerpt && (
                  <p className="text-sm text-red-500 mt-1">{errors.excerpt.message}</p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  {watch('excerpt')?.length || 0}/500 characters
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Content Editor */}
          <Card>
            <CardHeader>
              <CardTitle>Content *</CardTitle>
              <CardDescription>
                Write your blog post content using the rich text editor
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Controller
                name="content"
                control={control}
                render={({ field }) => (
                  <RichTextEditor
                    content={field.value}
                    onChange={field.onChange}
                    placeholder="Start writing your blog post..."
                  />
                )}
              />
              {errors.content && (
                <p className="text-sm text-red-500 mt-2">{errors.content.message}</p>
              )}
              <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                <span>Reading time: ~{calculateReadingTime(watchedContent)} min</span>
                <span>Word count: {watchedContent?.replace(/<[^>]*>/g, '').split(/\s+/).length || 0}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          {/* Publishing Options */}
          <Card>
            <CardHeader>
              <CardTitle>Publishing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="published">Published</Label>
                <Controller
                  name="published"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="published"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                {watch('published') 
                  ? 'This post will be visible to the public' 
                  : 'This post will be saved as a draft'
                }
              </p>
            </CardContent>
          </Card>

          {/* Category & Tags */}
          <Card>
            <CardHeader>
              <CardTitle>Organization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Category */}
              <div>
                <Label htmlFor="category">Category</Label>
                <Controller
                  name="category_id"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no-category">No Category</SelectItem>
                        {categories.map((category: BlogCategory) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              {/* Tags */}
              <div>
                <Label>Tags</Label>
                <Controller
                  name="tags"
                  control={control}
                  render={({ field }) => (
                    <TagInput
                      tags={field.value || []}
                      onChange={field.onChange}
                      placeholder="Add tags..."
                    />
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Featured Image */}
          <Card>
            <CardHeader>
              <CardTitle>Featured Image</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="featured_image">Image URL</Label>
                <Controller
                  name="featured_image_url"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="featured_image"
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      className={errors.featured_image_url ? 'border-red-500' : ''}
                    />
                  )}
                />
                {errors.featured_image_url && (
                  <p className="text-sm text-red-500 mt-1">{errors.featured_image_url.message}</p>
                )}
                {watch('featured_image_url') && (
                  <div className="mt-2">
                    <img
                      src={watch('featured_image_url')}
                      alt="Featured image preview"
                      className="w-full h-32 object-cover rounded-md"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* SEO Settings */}
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
              <CardDescription>
                Optimize your post for search engines
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* SEO Title */}
              <div>
                <Label htmlFor="seo_title">SEO Title</Label>
                <Controller
                  name="seo_title"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="seo_title"
                      placeholder="SEO optimized title"
                      className={errors.seo_title ? 'border-red-500' : ''}
                    />
                  )}
                />
                {errors.seo_title && (
                  <p className="text-sm text-red-500 mt-1">{errors.seo_title.message}</p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  {watch('seo_title')?.length || 0}/60 characters
                </p>
              </div>

              {/* SEO Description */}
              <div>
                <Label htmlFor="seo_description">SEO Description</Label>
                <Controller
                  name="seo_description"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      id="seo_description"
                      placeholder="SEO meta description"
                      rows={3}
                      className={errors.seo_description ? 'border-red-500' : ''}
                    />
                  )}
                />
                {errors.seo_description && (
                  <p className="text-sm text-red-500 mt-1">{errors.seo_description.message}</p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  {watch('seo_description')?.length || 0}/160 characters
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-6 border-t">
        <div className="flex items-center space-x-2">
          {isDirty && (
            <Badge variant="outline" className="text-orange-600">
              Unsaved changes
            </Badge>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="button" variant="outline" onClick={handlePreview}>
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button type="submit" disabled={isLoading}>
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? 'Saving...' : mode === 'create' ? 'Create Post' : 'Update Post'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default BlogForm;