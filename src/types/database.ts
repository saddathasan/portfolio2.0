/**
 * Database Types for Supabase Integration
 * 
 * This file contains TypeScript interfaces that define the structure of our Supabase database.
 * These types ensure type safety when interacting with the database and provide excellent
 * developer experience with autocompletion and compile-time error checking.
 * 
 * The types are organized by feature area (Blog, Bookmarks, Auth) and follow the
 * existing project's naming conventions and patterns.
 */

// =============================================================================
// Core Database Schema Types
// =============================================================================

/**
 * Blog Category Database Schema
 * Represents categories for organizing blog posts
 */
export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  created_at: string;
  updated_at: string;
}

/**
 * Blog Post Database Schema
 * Represents a blog post stored in the 'blog_posts' table
 */
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featured_image_url?: string;
  status: 'draft' | 'published' | 'archived';
  published_at?: string;
  created_at: string;
  updated_at: string;
  author_id: string;
  category_id?: string;
  reading_time?: number;
  view_count: number;
  seo_title?: string;
  seo_description?: string;
  featured: boolean;
  // Joined category data (when using joins)
  category?: BlogCategory;
  // Virtual field for compatibility
  published?: boolean;
  tags?: string[];
}

/**
 * Bookmark Database Schema
 * Represents a bookmark stored in the 'bookmarks' table
 */
export interface Bookmark {
  id: string;
  title: string;
  url: string;
  description: string;
  category: string;
  tags: string[];
  author?: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
  added_by: string;
  favicon_url?: string;
  screenshot_url?: string;
  reading_time?: number;
}

/**
 * Profile Database Schema
 * Represents user profiles stored in the 'profiles' table
 */
export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  role: 'admin' | 'user';
  bio?: string;
  website?: string;
  twitter_handle?: string;
  github_handle?: string;
  created_at: string;
  updated_at: string;
}

/**
 * Bookmark Category Database Schema
 * Represents categories for organizing bookmarks
 */
export interface BookmarkCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  icon?: string;
  created_at: string;
  updated_at: string;
}

// =============================================================================
// Supabase Database Schema
// =============================================================================

/**
 * Main Database interface that defines the complete Supabase schema
 */
export interface Database {
  public: {
    Tables: {
      blog_posts: {
        Row: BlogPost;
        Insert: Omit<BlogPost, 'id' | 'created_at' | 'updated_at' | 'view_count' | 'category'>;
        Update: Partial<Omit<BlogPost, 'id' | 'created_at' | 'category'>>;
      };
      bookmarks: {
        Row: Bookmark;
        Insert: Omit<Bookmark, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Bookmark, 'id' | 'created_at'>>;
      };
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Profile, 'id' | 'created_at'>>;
      };
      blog_categories: {
        Row: BlogCategory;
        Insert: Omit<BlogCategory, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<BlogCategory, 'id' | 'created_at'>>;
      };
      bookmark_categories: {
        Row: BookmarkCategory;
        Insert: Omit<BookmarkCategory, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<BookmarkCategory, 'id' | 'created_at'>>;
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      increment_view_count: {
        Args: {
          post_id: string;
        };
        Returns: void;
      };
    };
    Enums: {
      user_role: 'admin' | 'user';
    };
  };
}

// =============================================================================
// API Response Types
// =============================================================================

/**
 * Generic paginated response wrapper
 */
export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  limit: number;
  total_pages: number;
}

/**
 * Standard API error response
 */
export interface ApiError {
  message: string;
  code?: string;
  details?: Record<string, unknown>;
}

// =============================================================================
// Form Data Types
// =============================================================================

/**
 * Blog post form data for creating/updating posts
 */
export interface BlogPostFormData {
  title: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  published: boolean;
  featured_image_url?: string;
  seo_title?: string;
  seo_description?: string;
}

/**
 * Bookmark form data for creating/updating bookmarks
 */
export interface BookmarkFormData {
  title: string;
  url: string;
  description: string;
  category: string;
  tags: string[];
  author?: string;
  featured: boolean;
}

// =============================================================================
// Filter Types
// =============================================================================

/**
 * Blog post filtering options
 */
export interface BlogPostFilters {
  category?: string;
  tags?: string[];
  published?: boolean;
  search?: string;
  author_id?: string;
}

export interface BookmarkFilters {
  category?: string;
  tags?: string[];
  featured?: boolean;
  search?: string;
}

// =============================================================================
// Utility Types
// =============================================================================

/**
 * Extract table names from the Database schema
 */
export type TableName = keyof Database['public']['Tables'];

/**
 * Extract Row type for a given table
 */
export type DatabaseRow<T extends TableName> = Database['public']['Tables'][T]['Row'];

/**
 * Extract Insert type for a given table
 */
export type DatabaseInsert<T extends TableName> = Database['public']['Tables'][T]['Insert'];

/**
 * Extract Update type for a given table
 */
export type DatabaseUpdate<T extends TableName> = Database['public']['Tables'][T]['Update'];