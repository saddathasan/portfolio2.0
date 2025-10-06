/**
 * Individual Blog Post Page
 * 
 * Displays a single blog post with full content, metadata, navigation,
 * and related posts. Optimized for SEO and reading experience.
 * 
 * Features:
 * - Full blog post content with rich formatting
 * - SEO optimization with meta tags
 * - Reading progress indicator
 * - Social sharing buttons
 * - Related posts suggestions
 * - Comments section placeholder
 * - Responsive typography
 * - Print-friendly styling
 */

import React, { useEffect, useState } from 'react';
import { Link, useParams, Navigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useBlogPosts, useBlogPost } from '@/hooks/useBlog';
import type { BlogPost } from '@/types/database';
import {
  Calendar,
  Clock,
  Eye,
  ArrowLeft,
  Twitter,
  Facebook,
  Linkedin,
  Link as LinkIcon,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { toast } from 'sonner';

// =============================================================================
// Types
// =============================================================================

interface BlogPostPageProps {
  // Optional props for testing or custom usage
  postSlug?: string;
}

// =============================================================================
// Reading Progress Component
// =============================================================================

const ReadingProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setProgress(Math.min(100, Math.max(0, scrollPercent)));
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-800 z-50">
      <div
        className="h-full bg-blue-600 transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

// =============================================================================
// Social Share Component
// =============================================================================

interface SocialShareProps {
  post: BlogPost;
  url: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ post, url }) => {
  const shareText = `Check out this blog post: ${post.title}`;
  
  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard!');
    } catch {
      toast.error('Failed to copy link');
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium text-muted-foreground">Share:</span>
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => window.open(shareLinks.twitter, '_blank')}
        className="p-2"
      >
        <Twitter className="h-4 w-4" />
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => window.open(shareLinks.facebook, '_blank')}
        className="p-2"
      >
        <Facebook className="h-4 w-4" />
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => window.open(shareLinks.linkedin, '_blank')}
        className="p-2"
      >
        <Linkedin className="h-4 w-4" />
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={copyToClipboard}
        className="p-2"
      >
        <LinkIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};

// =============================================================================
// Related Posts Component
// =============================================================================

interface RelatedPostsProps {
  currentPost: BlogPost;
  allPosts: BlogPost[];
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({ currentPost, allPosts }) => {
  // Find related posts based on category and tags
  const relatedPosts = allPosts
    .filter(post => 
      post.id !== currentPost.id && 
      post.status === 'published' &&
      (post.category_id === currentPost.category_id ||
       post.tags?.some(tag => currentPost.tags?.includes(tag)))
    )
    .slice(0, 3);

  if (relatedPosts.length === 0) return null;

  return (
    <section className="mt-12 pt-8 border-t">
      <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <Link
            key={post.id}
            to="/blog/$slug"
            params={{ slug: post.slug }}
            className="group block"
          >
            <div className="space-y-3">
              {post.featured_image_url && (
                <div className="aspect-video overflow-hidden rounded-lg">
                  <img
                    src={post.featured_image_url}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
              )}
              <div>
                <h3 className="font-semibold line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {new Date(post.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

// =============================================================================
// Post Navigation Component
// =============================================================================

interface PostNavigationProps {
  currentPost: BlogPost;
  allPosts: BlogPost[];
}

const PostNavigation: React.FC<PostNavigationProps> = ({ currentPost, allPosts }) => {
  const publishedPosts = allPosts
    .filter(post => post.status === 'published')
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  
  const currentIndex = publishedPosts.findIndex(post => post.id === currentPost.id);
  const previousPost = currentIndex < publishedPosts.length - 1 ? publishedPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? publishedPosts[currentIndex - 1] : null;

  if (!previousPost && !nextPost) return null;

  return (
    <nav className="mt-12 pt-8 border-t">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Previous Post */}
        {previousPost && (
          <Link
            to="/blog/$slug"
            params={{ slug: previousPost.slug }}
            className="group flex items-center space-x-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
          >
            <ChevronLeft className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-muted-foreground">Previous Post</p>
              <h3 className="font-medium line-clamp-2 group-hover:text-blue-600 transition-colors">
                {previousPost.title}
              </h3>
            </div>
          </Link>
        )}
        
        {/* Next Post */}
        {nextPost && (
          <Link
            to="/blog/$slug"
            params={{ slug: nextPost.slug }}
            className="group flex items-center space-x-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors md:ml-auto"
          >
            <div className="flex-1 min-w-0 text-right">
              <p className="text-sm text-muted-foreground">Next Post</p>
              <h3 className="font-medium line-clamp-2 group-hover:text-blue-600 transition-colors">
                {nextPost.title}
              </h3>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
          </Link>
        )}
      </div>
    </nav>
  );
};

// =============================================================================
// Main Blog Post Component
// =============================================================================

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ postSlug }) => {
  const { slug } = useParams({ from: '/blog/$slug' });
  const targetSlug = postSlug || slug;
  
  const { data: post, isLoading, error } = useBlogPost(targetSlug, true);
  const { data: posts = [] } = useBlogPosts({ published: true });
  
  // Current page URL for sharing
  const currentUrl = window.location.href;

  // SEO and meta tags
  useEffect(() => {
    if (post) {
      document.title = `${post.title} - Portfolio Blog`;
      
      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', post.excerpt || post.title);
      }
      
      // Add Open Graph meta tags
      const addMetaTag = (property: string, content: string) => {
        let meta = document.querySelector(`meta[property="${property}"]`);
        if (!meta) {
          meta = document.createElement('meta');
          meta.setAttribute('property', property);
          document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
      };
      
      addMetaTag('og:title', post.title);
      addMetaTag('og:description', post.excerpt || post.title);
      addMetaTag('og:type', 'article');
      addMetaTag('og:url', currentUrl);
      if (post.featured_image_url) {
        addMetaTag('og:image', post.featured_image_url);
      }
      
      // Add Twitter Card meta tags
      const addTwitterMeta = (name: string, content: string) => {
        let meta = document.querySelector(`meta[name="${name}"]`);
        if (!meta) {
          meta = document.createElement('meta');
          meta.setAttribute('name', name);
          document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
      };
      
      addTwitterMeta('twitter:card', 'summary_large_image');
      addTwitterMeta('twitter:title', post.title);
      addTwitterMeta('twitter:description', post.excerpt || post.title);
      if (post.featured_image_url) {
        addTwitterMeta('twitter:image', post.featured_image_url);
      }
    }
  }, [post, currentUrl]);

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load blog post</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  // Post not found
  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
      <ReadingProgress />
      
      <article className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Back to Blog Link */}
            <div className="mb-8">
              <Link
                to="/blog"
                className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Link>
            </div>

            {/* Article Header */}
            <header className="mb-8">
              {/* Category */}
              {post.category && (
                <div className="mb-4">
                  <Badge 
                    className="text-white"
                    style={{ 
                      backgroundColor: post.category.color || '#3B82F6',
                      color: 'white'
                    }}
                  >
                    {post.category.name}
                  </Badge>
                </div>
              )}

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                  {post.excerpt}
                </p>
              )}

              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(post.created_at)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{post.reading_time} min read</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span>{post.view_count} views</span>
                </div>
              </div>

              {/* Social Share */}
              <div className="mb-8">
                <SocialShare post={post} url={currentUrl} />
              </div>

              <Separator />
            </header>

            {/* Featured Image */}
            {post.featured_image_url && (
              <div className="mb-8">
                <img
                  src={post.featured_image_url}
                  alt={post.title}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            )}

            {/* Article Content */}
            <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:scroll-mt-20 prose-a:text-blue-600 hover:prose-a:text-blue-700">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-8 pt-8 border-t">
                <h3 className="text-lg font-semibold mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag: string) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Post Navigation */}
            <PostNavigation currentPost={post} allPosts={posts} />

            {/* Related Posts */}
            <RelatedPosts currentPost={post} allPosts={posts} />

            {/* Comments Section Placeholder */}
            <section className="mt-12 pt-8 border-t">
              <h2 className="text-2xl font-bold mb-6">Comments</h2>
              <div className="bg-muted/50 rounded-lg p-8 text-center">
                <p className="text-muted-foreground">
                  Comments section coming soon! We're working on implementing a comment system.
                </p>
              </div>
            </section>
          </div>
        </div>
      </article>
    </>
  );
};

export default BlogPostPage;