/**
 * Individual Blog Post Route
 * 
 * Handles dynamic routing for individual blog posts using the slug parameter.
 * Provides SEO optimization and proper error handling for blog post pages.
 * 
 * Route: /blog/$slug
 * Example: /blog/my-first-post
 */

import { createFileRoute } from '@tanstack/react-router';
import { BlogPostPage } from '@/pages/BlogPost';

const BlogPostComponent = () => {
  const { slug } = Route.useParams();
  return <BlogPostPage postSlug={slug} />;
};

export const Route = createFileRoute('/blog/$slug')({
  component: BlogPostComponent,
});