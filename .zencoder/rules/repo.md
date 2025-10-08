---
description: Repository Information Overview
alwaysApply: true
---

# Portfolio 2.0 Information

## Summary

A modern React portfolio website built with cutting-edge technologies, featuring a minimal design philosophy for optimal performance and developer experience. The project includes a blog system with Supabase backend, bookmarks feature, interactive Sudoku game, and contact functionality.

## Structure

- **src/**: Main source code with React components, hooks, and utilities
- **public/**: Static assets and files served directly
- **supabase/**: Database migrations and Supabase configuration
- **functions/**: Serverless functions for email sending
- **api/**: API endpoints for Vercel/Cloudflare deployment
- **dist/**: Production build output
- **feature-description/**: Documentation for feature implementations

## Language & Runtime

**Language**: TypeScript
**Version**: TypeScript ~5.8.3
**Build System**: Vite 6.3.5
**Package Manager**: npm/pnpm

## Dependencies

**Main Dependencies**:

- React 18.3.1
- TanStack Router 1.121.12
- Supabase 2.58.0
- Tailwind CSS 3.4.0
- shadcn/ui components (Radix UI)
- Framer Motion 12.18.1
- TipTap 3.6.5 (Rich text editor)
- Zod 4.1.11 (Schema validation)

**Development Dependencies**:

- Vite 6.3.5
- TypeScript 5.8.3
- ESLint 9.25.0
- Tailwind CSS 3.4.0
- @tanstack/router-cli 1.121.13
- @cloudflare/workers-types 4.20241218.0

## Build & Installation

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Development with email functionality
npm run dev:full

# Build for production
npm run build

# Preview production build
npm run preview

# Generate TanStack Router routes
npm run generate-routes
```

## Supabase Integration

**Configuration**: Supabase client configured in `src/lib/supabase.ts`
**Tables**:

- blog_posts
- bookmarks
- profiles
- blog_categories
- bookmark_categories

**Features**:

- Authentication with email/password
- Blog post storage and retrieval
- Bookmarks management
- User profiles

## Deployment

**Platforms**: Vercel/Cloudflare Pages
**Configuration Files**:

- `vercel.json`: Vercel deployment configuration
- `wrangler.toml`: Cloudflare Workers configuration
- `_headers` and `_redirects`: Netlify/Cloudflare Pages configuration

## Testing

**Framework**: Custom test utilities in `src/test/utils.tsx`
**Test Utilities**:

- Mock data generators
- Test wrapper components
- Assertion helpers
- Mock implementations for browser APIs

## Email Functionality

**Implementation**: Serverless function in `functions/api/send-email.js`
**Development Server**: Custom Express server in `dev-server.js`
**Library**: Nodemailer 7.0.6
