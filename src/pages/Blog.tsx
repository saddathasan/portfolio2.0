/**
 * Public Blog Page
 * 
 * Main blog listing page for public users. Features a responsive grid layout,
 * search functionality, category filtering, and pagination. Optimized for SEO
 * and performance with proper meta tags and lazy loading.
 * 
 * Features:
 * - Responsive blog post grid
 * - Search and category filtering
 * - Pagination for large datasets
 * - SEO optimization
 * - Loading states and error handling
 * - Featured posts section
 * - Category navigation
 */

import React, { useState, useEffect } from 'react';
import { Link, useSearch, useNavigate } from '@tanstack/react-router';
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

import { useBlogPosts, useBlogCategories } from '@/hooks/useBlog';
import type { BlogPost, BlogCategory } from '@/types/database';
import {
  Search,
  Calendar,
  Clock,
  Eye,
  ArrowRight,
  Filter,
  Loader2,
  FileText,
} from 'lucide-react';

// =============================================================================
// Types
// =============================================================================

interface BlogFilters {
  search: string;
  category: string;
  page: number;
}

// =============================================================================
// Blog Post Card Component
// =============================================================================

interface BlogPostCardProps {
  post: BlogPost;
  featured?: boolean;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, featured = false }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const stripHtml = (html: string) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const excerpt = post.excerpt || stripHtml(post.content).substring(0, 150) + '...';

  return (
    <Card className={`group transition-all hover:shadow-lg ${featured ? 'md:col-span-2 lg:col-span-3' : ''}`}>
      <CardHeader className="p-0">
        {/* Featured Image */}
        {post.featured_image_url && (
          <div className={`relative overflow-hidden rounded-t-lg ${featured ? 'h-64 md:h-80' : 'h-48'}`}>
            <img
              src={post.featured_image_url}
              alt={post.title}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            {/* Category Badge */}
            {post.category && (
              <div className="absolute top-4 left-4">
                <Badge 
                  className="text-white border-white/20"
                  style={{ 
                    backgroundColor: post.category.color || '#3B82F6',
                    color: 'white'
                  }}
                >
                  {post.category.name}
                </Badge>
              </div>
            )}
          </div>
        )}
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Title */}
          <CardTitle className={`line-clamp-2 group-hover:text-blue-600 transition-colors ${featured ? 'text-2xl' : 'text-xl'}`}>
            <Link to="/blog/$slug" params={{ slug: post.slug }} className="hover:underline">
              {post.title}
            </Link>
          </CardTitle>
          
          {/* Excerpt */}
          <CardDescription className={`${featured ? 'text-base line-clamp-3' : 'line-clamp-2'}`}>
            {excerpt}
          </CardDescription>
          
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, featured ? 5 : 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {post.tags.length > (featured ? 5 : 3) && (
                <Badge variant="secondary" className="text-xs">
                  +{post.tags.length - (featured ? 5 : 3)} more
                </Badge>
              )}
            </div>
          )}
          
          {/* Metadata */}
          <div className="flex items-center justify-between text-sm text-muted-foreground pt-2 border-t">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(post.created_at)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{post.reading_time} min read</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-1">
              <Eye className="h-3 w-3" />
              <span>{post.view_count}</span>
            </div>
          </div>
          
          {/* Read More Link */}
          <div className="pt-2">
            <Link 
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm group"
            >
              Read More
              <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// =============================================================================
// Category Filter Component
// =============================================================================

interface CategoryFilterProps {
  categories: BlogCategory[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={selectedCategory === 'all' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onCategoryChange('all')}
      >
        All Posts
      </Button>
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? 'default' : 'outline'}
          size="sm"
          onClick={() => onCategoryChange(category.id)}
          className="flex items-center space-x-2"
        >
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: category.color || '#3B82F6' }}
          />
          <span>{category.name}</span>
        </Button>
      ))}
    </div>
  );
};

// =============================================================================
// Main Blog Component
// =============================================================================

export const Blog: React.FC = () => {
  const search = useSearch({ from: '/blog' });
  const navigate = useNavigate({ from: '/blog' });
  const [filters, setFilters] = useState<BlogFilters>({
    search: search?.search || '',
    category: search?.category || 'all',
    page: parseInt(search?.page || '1'),
  });

  // React Query hooks
  const { data: posts = [], isLoading, error } = useBlogPosts();
  const { data: categories = [] } = useBlogCategories();

  // Update URL when filters change
  useEffect(() => {
    const searchParams: Record<string, string> = {};
    if (filters.search) searchParams.search = filters.search;
    if (filters.category !== 'all') searchParams.category = filters.category;
    if (filters.page > 1) searchParams.page = filters.page.toString();
    
    navigate({ search: searchParams });
  }, [filters, navigate]);

  // Filter posts based on current filters
  const filteredPosts = posts.filter(post => {
    // Only show published posts
    if (post.status !== 'published') return false;
    
    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const matchesSearch = 
        post.title.toLowerCase().includes(searchTerm) ||
        post.excerpt?.toLowerCase().includes(searchTerm) ||
        post.tags?.some(tag => tag.toLowerCase().includes(searchTerm));
      
      if (!matchesSearch) return false;
    }
    
    // Category filter
    if (filters.category !== 'all') {
      if (post.category_id !== filters.category) return false;
    }
    
    return true;
  });

  // Sort posts by creation date (newest first)
  const sortedPosts = [...filteredPosts].sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  // Pagination
  const postsPerPage = 9;
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);
  const startIndex = (filters.page - 1) * postsPerPage;
  const paginatedPosts = sortedPosts.slice(startIndex, startIndex + postsPerPage);

  // Featured post (latest published post)
  const featuredPost = sortedPosts[0];
  const regularPosts = sortedPosts.slice(1);

  // Handle filter changes
  const handleSearchChange = (search: string) => {
    setFilters(prev => ({ ...prev, search, page: 1 }));
  };

  const handleCategoryChange = (category: string) => {
    setFilters(prev => ({ ...prev, category, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // SEO Meta tags
  useEffect(() => {
    document.title = 'Blog - Portfolio';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Explore our latest blog posts covering technology, development, and industry insights.');
    }
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading blog posts...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">Failed to load blog posts</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/20 dark:to-indigo-950/20 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Blog
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover insights, tutorials, and stories from my journey. 
              Stay updated with the latest in technology and development.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search blog posts..."
                value={filters.search}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10 bg-white dark:bg-gray-800"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Category Filter */}
        {categories.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filter by Category
            </h2>
            <CategoryFilter
              categories={categories}
              selectedCategory={filters.category}
              onCategoryChange={handleCategoryChange}
            />
          </div>
        )}

        {/* Blog Posts */}
        {sortedPosts.length === 0 ? (
          <div className="text-center py-12">
            {filters.search || filters.category !== 'all' ? (
              <div>
                <p className="text-muted-foreground mb-4">
                  No posts found matching your filters
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => setFilters({ search: '', category: 'all', page: 1 })}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div>
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  No blog posts available yet. Check back soon!
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-12">
            {/* Featured Post */}
            {featuredPost && filters.page === 1 && !filters.search && filters.category === 'all' && (
              <section>
                <h2 className="text-2xl font-bold mb-6">Featured Post</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <BlogPostCard post={featuredPost} featured={true} />
                </div>
              </section>
            )}

            {/* Regular Posts */}
            <section>
              {featuredPost && filters.page === 1 && !filters.search && filters.category === 'all' && (
                <h2 className="text-2xl font-bold mb-6">Latest Posts</h2>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(featuredPost && filters.page === 1 && !filters.search && filters.category === 'all' 
                  ? regularPosts.slice(0, postsPerPage - 1)
                  : paginatedPosts
                ).map((post) => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>
            </section>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 pt-8">
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(filters.page - 1)}
                  disabled={filters.page === 1}
                >
                  Previous
                </Button>
                
                <div className="flex space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={page === filters.page ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </Button>
                  ))}
                </div>
                
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(filters.page + 1)}
                  disabled={filters.page === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;