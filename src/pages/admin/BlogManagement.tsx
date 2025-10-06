/**
 * Blog Management Page
 * 
 * Main admin interface for managing blog posts and categories.
 * Provides a comprehensive dashboard with tabs for posts and categories,
 * integrated forms, and full CRUD operations.
 * 
 * Features:
 * - Tabbed interface for posts and categories
 * - Create, edit, and delete blog posts
 * - Rich text editor integration
 * - Category management
 * - Responsive design
 * - Loading and error states
 */

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { BlogList } from '@/components/blog/BlogList';
import { BlogForm } from '@/components/blog/BlogForm';
import { CategoryList } from '@/components/blog/CategoryList';
import { useCreateBlogPost, useUpdateBlogPost } from '@/hooks/useBlog';
import { useAuth } from '@/context/AuthContext';
import type { BlogPost } from '@/types/database';
import { FileText, FolderOpen } from 'lucide-react';
import { toast } from 'sonner';

// =============================================================================
// Types
// =============================================================================

type DialogMode = 'create' | 'edit' | 'preview' | null;

interface BlogManagementState {
  activeTab: string;
  dialogMode: DialogMode;
  selectedPost: BlogPost | null;
  showBlogForm: boolean;
}

// =============================================================================
// Main Blog Management Component
// =============================================================================

export const BlogManagement: React.FC = () => {
  const [state, setState] = useState<BlogManagementState>({
    activeTab: 'posts',
    dialogMode: null,
    selectedPost: null,
    showBlogForm: false,
  });

  // Get current user from auth context
  const { user } = useAuth();

  // Mutations for blog operations
  const createPostMutation = useCreateBlogPost();
  const updatePostMutation = useUpdateBlogPost();

  // Handle creating a new post
  const handleCreatePost = () => {
    setState(prev => ({
      ...prev,
      dialogMode: 'create',
      selectedPost: null,
      showBlogForm: true,
    }));
  };

  // Handle editing an existing post
  const handleEditPost = (post: BlogPost) => {
    setState(prev => ({
      ...prev,
      dialogMode: 'edit',
      selectedPost: post,
      showBlogForm: true,
    }));
  };

  // Handle previewing a post
  const handlePreviewPost = (post: BlogPost) => {
    setState(prev => ({
      ...prev,
      dialogMode: 'preview',
      selectedPost: post,
      showBlogForm: false,
    }));
  };

  // Handle closing dialogs
  const handleCloseDialog = () => {
    setState(prev => ({
      ...prev,
      dialogMode: null,
      selectedPost: null,
      showBlogForm: false,
    }));
  };

  // Handle successful form submission
  const handleFormSuccess = () => {
    handleCloseDialog();
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Blog Management</h1>
        <p className="text-muted-foreground">
          Create, edit, and manage your blog posts and categories
        </p>
      </div>

      {/* Main Content Tabs */}
      <Tabs 
        value={state.activeTab} 
        onValueChange={(value) => setState(prev => ({ ...prev, activeTab: value }))}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-2 lg:w-96">
          <TabsTrigger value="posts" className="flex items-center space-x-2">
            <FileText className="h-4 w-4" />
            <span>Blog Posts</span>
          </TabsTrigger>
          <TabsTrigger value="categories" className="flex items-center space-x-2">
            <FolderOpen className="h-4 w-4" />
            <span>Categories</span>
          </TabsTrigger>
        </TabsList>

        {/* Blog Posts Tab */}
        <TabsContent value="posts" className="space-y-6">
          <BlogList
            onCreatePost={handleCreatePost}
            onEditPost={handleEditPost}
            onPreviewPost={handlePreviewPost}
            showActions={true}
          />
        </TabsContent>

        {/* Categories Tab */}
        <TabsContent value="categories" className="space-y-6">
          <CategoryList />
        </TabsContent>
      </Tabs>

      {/* Blog Form Dialog */}
      <Dialog open={state.showBlogForm} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {state.dialogMode === 'create' ? 'Create New Blog Post' : 'Edit Blog Post'}
            </DialogTitle>
            <DialogDescription>
              {state.dialogMode === 'create' 
                ? 'Fill in the details below to create a new blog post.'
                : 'Update the blog post details below.'
              }
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-6">
            <BlogForm
              initialData={state.selectedPost || undefined}
              onSubmit={async (data) => {
                try {
                  if (state.dialogMode === 'create') {
                    // Create new blog post
                    await createPostMutation.mutateAsync({
                      title: data.title,
                      slug: data.slug,
                      content: data.content,
                      excerpt: data.excerpt,
                      author_id: user?.id || '', // Get from auth context
                      reading_time: Math.ceil(data.content.split(' ').length / 200), // Rough estimate
                      category_id: data.category_id === 'no-category' ? undefined : data.category_id,
                      status: data.published ? 'published' : 'draft',
                      published_at: data.published ? new Date().toISOString() : undefined,
                      featured: false,
                      featured_image_url: data.featured_image_url || undefined,
                      seo_title: data.seo_title || undefined,
                      seo_description: data.seo_description || undefined,
                    });
                    toast.success('Blog post created successfully!');
                  } else if (state.dialogMode === 'edit' && state.selectedPost) {
                    // Update existing blog post
                    await updatePostMutation.mutateAsync({
                      id: state.selectedPost.id,
                      updates: {
                        title: data.title,
                        slug: data.slug,
                        content: data.content,
                        excerpt: data.excerpt,
                        category_id: data.category_id === 'no-category' ? undefined : data.category_id,
                        status: data.published ? 'published' : 'draft',
                        published_at: data.published ? new Date().toISOString() : undefined,
                        featured_image_url: data.featured_image_url || undefined,
                        seo_title: data.seo_title || undefined,
                        seo_description: data.seo_description || undefined,
                      },
                    });
                    toast.success('Blog post updated successfully!');
                  }
                  handleFormSuccess();
                } catch (error) {
                  console.error('Form submission error:', error);
                  toast.error(
                    state.dialogMode === 'create' 
                      ? 'Failed to create blog post' 
                      : 'Failed to update blog post'
                  );
                }
              }}
              onCancel={handleCloseDialog}
              mode={state.dialogMode === 'create' ? 'create' : 'edit'}
              isLoading={createPostMutation.isPending || updatePostMutation.isPending}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog 
        open={state.dialogMode === 'preview'} 
        onOpenChange={handleCloseDialog}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Preview: {state.selectedPost?.title}</DialogTitle>
            <DialogDescription>
              This is how your blog post will appear to readers
            </DialogDescription>
          </DialogHeader>
          
          {state.selectedPost && (
            <div className="mt-6">
              {/* Preview Content */}
              <article className="prose prose-lg max-w-none dark:prose-invert">
                {/* Featured Image */}
                {state.selectedPost.featured_image_url && (
                  <div className="mb-8">
                    <img
                      src={state.selectedPost.featured_image_url}
                      alt={state.selectedPost.title}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                )}
                
                {/* Title */}
                <h1 className="text-3xl font-bold mb-4">
                  {state.selectedPost.title}
                </h1>
                
                {/* Metadata */}
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-6 not-prose">
                  <span>
                    {new Date(state.selectedPost.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                  <span>•</span>
                  <span>{state.selectedPost.reading_time} min read</span>
                  {state.selectedPost.category && (
                    <>
                      <span>•</span>
                      <span className="flex items-center space-x-1">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: state.selectedPost.category.color || '#3B82F6' }}
                        />
                        <span>{state.selectedPost.category.name}</span>
                      </span>
                    </>
                  )}
                </div>
                
                {/* Excerpt */}
                {state.selectedPost.excerpt && (
                  <div className="text-lg text-muted-foreground mb-8 not-prose">
                    {state.selectedPost.excerpt}
                  </div>
                )}
                
                {/* Content */}
                <div 
                  dangerouslySetInnerHTML={{ 
                    __html: state.selectedPost.content 
                  }} 
                />
                
                {/* Tags */}
                {state.selectedPost.tags && state.selectedPost.tags.length > 0 && (
                  <div className="mt-8 pt-8 border-t not-prose">
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {state.selectedPost.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </article>
              
              {/* Preview Actions */}
              <div className="flex justify-end space-x-3 mt-8 pt-6 border-t">
                <Button variant="outline" onClick={handleCloseDialog}>
                  Close Preview
                </Button>
                <Button onClick={() => handleEditPost(state.selectedPost!)}>
                  Edit Post
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlogManagement;