/**
 * Blog Index Route
 * 
 * This is the index route for the blog section that renders the main blog listing page.
 * It handles the /blog path and displays all blog posts with search and filtering functionality.
 */

import { createFileRoute } from '@tanstack/react-router';
import { Blog } from '@/pages/Blog';

interface BlogSearchParams {
  search?: string;
  category?: string;
  page?: string;
}

export const Route = createFileRoute('/blog/')({
  validateSearch: (search: Record<string, unknown>): BlogSearchParams => {
    return {
      search: typeof search.search === 'string' ? search.search : undefined,
      category: typeof search.category === 'string' ? search.category : undefined,
      page: typeof search.page === 'string' ? search.page : undefined,
    };
  },
  component: Blog,
});