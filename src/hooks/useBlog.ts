/**
 * Blog Management Hooks
 *
 * This file contains React Query hooks for managing blog posts and categories.
 * It provides a clean interface for CRUD operations with proper error handling,
 * caching, and optimistic updates.
 */

// =============================================================================
// Imports
// =============================================================================

import { supabase } from "@/lib/supabase";
import type {
	BlogCategory,
	BlogPost,
	DatabaseInsert,
	DatabaseUpdate,
} from "@/types/database";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// =============================================================================
// Query Keys
// =============================================================================

export const blogQueryKeys = {
	all: ["blog"] as const,
	posts: () => [...blogQueryKeys.all, "posts"] as const,
	post: (id: string) => [...blogQueryKeys.posts(), id] as const,
	categories: () => [...blogQueryKeys.all, "categories"] as const,
	category: (id: string) => [...blogQueryKeys.categories(), id] as const,
	postsByCategory: (categoryId: string) =>
		[...blogQueryKeys.posts(), "category", categoryId] as const,
	publishedPosts: () => [...blogQueryKeys.posts(), "published"] as const,
	draftPosts: () => [...blogQueryKeys.posts(), "drafts"] as const,
};

// =============================================================================
// Blog Posts Hooks
// =============================================================================

/**
 * Hook to fetch all blog posts with optional filtering
 */
export const useBlogPosts = (options?: {
	published?: boolean;
	categoryId?: string;
	limit?: number;
	offset?: number;
}) => {
	return useQuery({
		queryKey: options?.categoryId
			? blogQueryKeys.postsByCategory(options.categoryId)
			: options?.published
				? blogQueryKeys.publishedPosts()
				: blogQueryKeys.posts(),
		queryFn: async (): Promise<BlogPost[]> => {
			let query = supabase
				.from("blog_posts")
				.select(
					`
          *,
          category:blog_categories(*)
        `,
				)
				.order("created_at", { ascending: false });

			if (options?.published !== undefined) {
				query = query.eq("status", options.published ? "published" : "draft");
			}

			if (options?.categoryId) {
				query = query.eq("category_id", options.categoryId);
			}

			if (options?.limit) {
				query = query.limit(options.limit);
			}

			if (options?.offset) {
				query = query.range(
					options.offset,
					options.offset + (options.limit || 10) - 1,
				);
			}

			const { data, error } = await query;

			if (error) {
				throw new Error(`Failed to fetch blog posts: ${error.message}`);
			}

			return data || [];
		},
		staleTime: 5 * 60 * 1000, // 5 minutes
		gcTime: 10 * 60 * 1000, // 10 minutes
	});
};

/**
 * Hook to fetch a single blog post by ID or slug
 */
export const useBlogPost = (identifier: string, bySlug = false) => {
	return useQuery({
		queryKey: blogQueryKeys.post(identifier),
		queryFn: async (): Promise<BlogPost | null> => {
			const column = bySlug ? "slug" : "id";
			const { data, error } = await supabase
				.from("blog_posts")
				.select(
					`
          *,
          category:blog_categories(*)
        `,
				)
				.eq(column, identifier)
				.single();

			if (error) {
				if (error.code === "PGRST116") {
					return null; // Post not found
				}
				throw new Error(`Failed to fetch blog post: ${error.message}`);
			}

			return data;
		},
		enabled: !!identifier,
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000,
	});
};

/**
 * Hook to create a new blog post
 */
export const useCreateBlogPost = () => {
	const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (postData: DatabaseInsert<'blog_posts'>): Promise<BlogPost> => {
      const { data, error } = await supabase
        .from('blog_posts')
        .insert(postData)
        .select(`
          *,
          category:blog_categories(*)
        `)
        .single();

      if (error) {
        throw new Error(`Failed to create blog post: ${error.message}`);
      }

      if (!data) {
        throw new Error('No data returned from blog post creation');
      }

      return data as BlogPost;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: blogQueryKeys.posts() });
      queryClient.invalidateQueries({ queryKey: blogQueryKeys.publishedPosts() });
      queryClient.invalidateQueries({ queryKey: blogQueryKeys.draftPosts() });
    },
  });
};

export const useUpdateBlogPost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: DatabaseUpdate<'blog_posts'> }): Promise<BlogPost> => {
      const updateData = {
        ...updates,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('blog_posts')
        .update(updateData)
        .eq('id', id)
        .select(`
          *,
          category:blog_categories(*)
        `)
        .single();

      if (error) {
        throw new Error(`Failed to update blog post: ${error.message}`);
      }

      if (!data) {
        throw new Error('No data returned from blog post update');
      }

      return data as BlogPost;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: blogQueryKeys.posts() });
      queryClient.invalidateQueries({ queryKey: blogQueryKeys.post(data.id) });
      queryClient.invalidateQueries({ queryKey: blogQueryKeys.publishedPosts() });
      queryClient.invalidateQueries({ queryKey: blogQueryKeys.draftPosts() });
      if (data.category_id) {
        queryClient.invalidateQueries({ queryKey: blogQueryKeys.postsByCategory(data.category_id) });
      }
    },
  });
};

/**
 * Hook to delete a blog post
 */
export const useDeleteBlogPost = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (id: string): Promise<void> => {
			const { error } = await supabase
				.from("blog_posts")
				.delete()
				.eq("id", id);

			if (error) {
				throw new Error(`Failed to delete blog post: ${error.message}`);
			}
		},
		onSuccess: (_, deletedId) => {
			// Remove from cache
			queryClient.removeQueries({
				queryKey: blogQueryKeys.post(deletedId),
			});

			// Invalidate posts list
			queryClient.invalidateQueries({ queryKey: blogQueryKeys.posts() });
		},
		onError: (error) => {
			console.error("Error deleting blog post:", error);
		},
	});
};

/**
 * Hook to increment view count for a blog post
 */
export const useIncrementViewCount = () => {
  return useMutation({
    mutationFn: async (postId: string): Promise<void> => {
      const { error } = await supabase.rpc('increment_view_count', {
        post_id: postId,
      });

      if (error) {
        throw new Error(`Failed to increment view count: ${error.message}`);
      }
    },
  });
};

// =============================================================================
// Blog Categories Hooks
// =============================================================================

/**
 * Hook to fetch all blog categories
 */
export const useBlogCategories = () => {
	return useQuery({
		queryKey: blogQueryKeys.categories(),
		queryFn: async (): Promise<BlogCategory[]> => {
			const { data, error } = await supabase
				.from("blog_categories")
				.select("*")
				.order("name");

			if (error) {
				throw new Error(
					`Failed to fetch blog categories: ${error.message}`,
				);
			}

			return data || [];
		},
		staleTime: 10 * 60 * 1000, // 10 minutes
		gcTime: 30 * 60 * 1000, // 30 minutes
	});
};

/**
 * Hook to create a new blog category
 */
export const useCreateBlogCategory = () => {
	const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (categoryData: DatabaseInsert<'blog_categories'>): Promise<BlogCategory> => {
      const { data, error } = await supabase
        .from('blog_categories')
        .insert(categoryData)
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to create blog category: ${error.message}`);
      }

      if (!data) {
        throw new Error('No data returned from blog category creation');
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: blogQueryKeys.categories() });
    },
  });
};

export const useUpdateBlogCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: DatabaseUpdate<'blog_categories'> }): Promise<BlogCategory> => {
      const updateData = {
        ...updates,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('blog_categories')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to update blog category: ${error.message}`);
      }

      if (!data) {
        throw new Error('No data returned from blog category update');
      }

      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: blogQueryKeys.categories() });
      queryClient.invalidateQueries({ queryKey: blogQueryKeys.category(data.id) });
    },
  });
};

/**
 * Hook to delete a blog category
 */
export const useDeleteBlogCategory = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (id: string): Promise<void> => {
			const { error } = await supabase
				.from("blog_categories")
				.delete()
				.eq("id", id);

			if (error) {
				throw new Error(
					`Failed to delete blog category: ${error.message}`,
				);
			}
		},
		onSuccess: (_, deletedId) => {
			// Remove from cache
			queryClient.removeQueries({
				queryKey: blogQueryKeys.category(deletedId),
			});

			// Invalidate categories list
			queryClient.invalidateQueries({
				queryKey: blogQueryKeys.categories(),
			});
		},
		onError: (error) => {
			console.error("Error deleting blog category:", error);
		},
	});
};
