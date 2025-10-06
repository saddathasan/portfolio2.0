/**
 * Blog Routes
 * 
 * Defines the routing structure for the blog section:
 * - /blog - Main blog listing page
 * - /blog/$slug - Individual blog post pages
 * 
 * Uses TanStack Router for type-safe routing with proper
 * SEO optimization and error handling.
 */

import { createFileRoute, Outlet } from '@tanstack/react-router';

const BlogLayout = () => {
  return <Outlet />;
};

export const Route = createFileRoute('/blog')({
  component: BlogLayout,
});