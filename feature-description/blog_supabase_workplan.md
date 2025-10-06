# Blog & Supabase Integration - Comprehensive Implementation Work Plan

## Project Overview
Migrate the bookmarks feature to Supabase database and add a complete blog system with an admin dashboard for managing both blogs and bookmarks. This transforms the portfolio from a static site to a dynamic content management system.

---

## Table of Contents
1. [Architecture & Technology Stack](#architecture--technology-stack)
2. [Supabase Setup & Configuration](#supabase-setup--configuration)
3. [Database Schema Design](#database-schema-design)
4. [Authentication System](#authentication-system)
5. [Backend API Layer](#backend-api-layer)
6. [Admin Dashboard](#admin-dashboard)
7. [Blog Frontend](#blog-frontend)
8. [Bookmarks Migration](#bookmarks-migration)
9. [Security & Permissions](#security--permissions)
10. [Implementation Steps](#implementation-steps)
11. [Testing Strategy](#testing-strategy)
12. [Deployment & DevOps](#deployment--devops)

---

## Architecture & Technology Stack

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Client Layer                          │
├─────────────────────────────────────────────────────────┤
│  Public Site              │    Admin Dashboard          │
│  - Blog List              │    - Rich Text Editor       │
│  - Blog Post Detail       │    - Blog Management        │
│  - Bookmarks Display      │    - Bookmark Management    │
│  - Search & Filters       │    - Analytics              │
└─────────────────┬───────────────────────┬───────────────┘
                  │                       │
                  ▼                       ▼
┌─────────────────────────────────────────────────────────┐
│              Supabase Backend                            │
├─────────────────────────────────────────────────────────┤
│  - PostgreSQL Database                                   │
│  - Authentication (Email/OAuth)                          │
│  - Row Level Security (RLS)                             │
│  - Storage (Images/Media)                               │
│  - Real-time Subscriptions                              │
│  - Edge Functions (if needed)                           │
└─────────────────────────────────────────────────────────┘
```

### Technology Stack

**Frontend:**
- React (existing)
- React Router (routing)
- @supabase/supabase-js (Supabase client)
- Rich Text Editor: 
  - Option 1: Tiptap (recommended - modern, extensible)
  - Option 2: Slate.js (more control)
  - Option 3: Quill (simpler)
- React Query / TanStack Query (data fetching & caching)
- React Hook Form (form management)
- Zod (validation)
- Date-fns (date handling)

**Backend:**
- Supabase (BaaS - Backend as a Service)
- PostgreSQL (via Supabase)
- Row Level Security (RLS) policies

**Styling:**
- [Use your existing styling solution]
- Additional: Syntax highlighting (Prism.js or Highlight.js)

**Media Management:**
- Supabase Storage for images
- Image optimization service (optional)

---

## Supabase Setup & Configuration

### Phase 1: Supabase Project Setup

#### Step 1.1: Create Supabase Project
```bash
1. Go to https://supabase.com
2. Sign up / Log in
3. Create new project
   - Project name: "portfolio-blog"
   - Database password: [Strong password - save securely]
   - Region: [Choose closest to your users]
   - Pricing plan: Free tier (to start)
4. Wait for project to be provisioned (~2 minutes)
```

#### Step 1.2: Get Supabase Credentials
```javascript
// Save these securely - you'll need them
const supabaseConfig = {
  projectUrl: 'https://[your-project-ref].supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  serviceRoleKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' // KEEP SECRET
}
```

#### Step 1.3: Environment Variables Setup

**Create `.env` file:**
```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://[your-project-ref].supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Optional: For server-side operations only
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Admin User (for seeding)
ADMIN_EMAIL=your-email@example.com
ADMIN_PASSWORD=your-secure-password
```

**Add to `.gitignore`:**
```
.env
.env.local
.env.production
```

#### Step 1.4: Install Dependencies
```bash
npm install @supabase/supabase-js
npm install @tanstack/react-query
npm install react-hook-form zod @hookform/resolvers
npm install date-fns
npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-image @tiptap/extension-link
npm install lucide-react  # For icons
```

---

## Database Schema Design

### Schema Overview

**Tables:**
1. `profiles` - User profiles (extends auth.users)
2. `blog_posts` - Blog articles
3. `blog_categories` - Blog categories
4. `blog_tags` - Blog tags
5. `post_tags` - Many-to-many relationship
6. `bookmarks` - Bookmarks (migrated from JSON)
7. `bookmark_categories` - Bookmark categories
8. `analytics` - View counts and analytics

### Detailed Schema (SQL)

```sql
-- ============================================
-- ENABLE EXTENSIONS
-- ============================================
create extension if not exists "uuid-ossp";

-- ============================================
-- PROFILES TABLE
-- ============================================
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  full_name text,
  avatar_url text,
  role text default 'user' check (role in ('user', 'admin')),
  bio text,
  website text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Policies
create policy "Public profiles are viewable by everyone"
  on profiles for select
  using (true);

create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = id);

-- ============================================
-- BLOG CATEGORIES TABLE
-- ============================================
create table public.blog_categories (
  id uuid default uuid_generate_v4() primary key,
  name text unique not null,
  slug text unique not null,
  description text,
  color text default '#3B82F6',
  icon text,
  sort_order integer default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.blog_categories enable row level security;

create policy "Blog categories are viewable by everyone"
  on blog_categories for select
  using (true);

create policy "Only admins can manage categories"
  on blog_categories for all
  using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );

-- ============================================
-- BLOG TAGS TABLE
-- ============================================
create table public.blog_tags (
  id uuid default uuid_generate_v4() primary key,
  name text unique not null,
  slug text unique not null,
  created_at timestamp with time zone default now()
);

alter table public.blog_tags enable row level security;

create policy "Blog tags are viewable by everyone"
  on blog_tags for select
  using (true);

create policy "Only admins can manage tags"
  on blog_tags for all
  using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );

-- ============================================
-- BLOG POSTS TABLE
-- ============================================
create table public.blog_posts (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text unique not null,
  excerpt text,
  content text not null,
  featured_image text,
  author_id uuid references public.profiles(id) on delete set null,
  category_id uuid references public.blog_categories(id) on delete set null,
  status text default 'draft' check (status in ('draft', 'published', 'archived')),
  published_at timestamp with time zone,
  reading_time integer, -- in minutes
  view_count integer default 0,
  meta_title text,
  meta_description text,
  is_featured boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.blog_posts enable row level security;

-- Policies
create policy "Published posts are viewable by everyone"
  on blog_posts for select
  using (status = 'published' or auth.uid() = author_id);

create policy "Only admins can insert posts"
  on blog_posts for insert
  with check (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );

create policy "Authors can update own posts"
  on blog_posts for update
  using (auth.uid() = author_id);

create policy "Only admins can delete posts"
  on blog_posts for delete
  using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );

-- ============================================
-- POST TAGS (Junction Table)
-- ============================================
create table public.post_tags (
  post_id uuid references public.blog_posts(id) on delete cascade,
  tag_id uuid references public.blog_tags(id) on delete cascade,
  created_at timestamp with time zone default now(),
  primary key (post_id, tag_id)
);

alter table public.post_tags enable row level security;

create policy "Post tags are viewable by everyone"
  on post_tags for select
  using (true);

create policy "Only admins can manage post tags"
  on post_tags for all
  using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );

-- ============================================
-- BOOKMARK CATEGORIES TABLE
-- ============================================
create table public.bookmark_categories (
  id uuid default uuid_generate_v4() primary key,
  name text unique not null,
  slug text unique not null,
  description text,
  color text default '#3B82F6',
  icon text,
  sort_order integer default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.bookmark_categories enable row level security;

create policy "Bookmark categories are viewable by everyone"
  on bookmark_categories for select
  using (true);

create policy "Only admins can manage bookmark categories"
  on bookmark_categories for all
  using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );

-- ============================================
-- BOOKMARKS TABLE
-- ============================================
create table public.bookmarks (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  url text not null,
  description text,
  author text,
  author_url text,
  category_id uuid references public.bookmark_categories(id) on delete set null,
  tags text[] default array[]::text[],
  date_added timestamp with time zone default now(),
  date_published timestamp with time zone,
  read_time text,
  difficulty text check (difficulty in ('beginner', 'intermediate', 'advanced')),
  is_favorite boolean default false,
  is_read boolean default false,
  notes text,
  source text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.bookmarks enable row level security;

create policy "Bookmarks are viewable by everyone"
  on bookmarks for select
  using (true);

create policy "Only admins can manage bookmarks"
  on bookmarks for all
  using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );

-- ============================================
-- ANALYTICS TABLE
-- ============================================
create table public.analytics (
  id uuid default uuid_generate_v4() primary key,
  post_id uuid references public.blog_posts(id) on delete cascade,
  event_type text not null check (event_type in ('view', 'like', 'share')),
  user_id uuid references auth.users on delete set null,
  session_id text,
  ip_address inet,
  user_agent text,
  referrer text,
  created_at timestamp with time zone default now()
);

alter table public.analytics enable row level security;

create policy "Only admins can view analytics"
  on analytics for select
  using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
create index idx_blog_posts_slug on blog_posts(slug);
create index idx_blog_posts_status on blog_posts(status);
create index idx_blog_posts_published_at on blog_posts(published_at desc);
create index idx_blog_posts_author on blog_posts(author_id);
create index idx_blog_posts_category on blog_posts(category_id);
create index idx_post_tags_post on post_tags(post_id);
create index idx_post_tags_tag on post_tags(tag_id);
create index idx_bookmarks_category on bookmarks(category_id);
create index idx_bookmarks_tags on bookmarks using gin(tags);
create index idx_analytics_post on analytics(post_id);
create index idx_analytics_created on analytics(created_at desc);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Function: Update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Trigger: Auto-update updated_at for profiles
create trigger update_profiles_updated_at
  before update on profiles
  for each row
  execute function update_updated_at_column();

-- Trigger: Auto-update updated_at for blog_posts
create trigger update_blog_posts_updated_at
  before update on blog_posts
  for each row
  execute function update_updated_at_column();

-- Trigger: Auto-update updated_at for blog_categories
create trigger update_blog_categories_updated_at
  before update on blog_categories
  for each row
  execute function update_updated_at_column();

-- Trigger: Auto-update updated_at for bookmarks
create trigger update_bookmarks_updated_at
  before update on bookmarks
  for each row
  execute function update_updated_at_column();

-- Trigger: Auto-update updated_at for bookmark_categories
create trigger update_bookmark_categories_updated_at
  before update on bookmark_categories
  for each row
  execute function update_updated_at_column();

-- Function: Calculate reading time
create or replace function calculate_reading_time(content text)
returns integer as $$
declare
  word_count integer;
  reading_time integer;
begin
  -- Average reading speed: 200 words per minute
  word_count := array_length(regexp_split_to_array(content, '\s+'), 1);
  reading_time := ceil(word_count / 200.0);
  return greatest(reading_time, 1); -- Minimum 1 minute
end;
$$ language plpgsql;

-- Function: Auto-generate slug
create or replace function generate_slug(title text)
returns text as $$
begin
  return lower(regexp_replace(
    regexp_replace(title, '[^a-zA-Z0-9\s-]', '', 'g'),
    '\s+', '-', 'g'
  ));
end;
$$ language plpgsql;

-- Trigger: Auto-generate slug for blog posts
create or replace function auto_generate_post_slug()
returns trigger as $$
begin
  if new.slug is null or new.slug = '' then
    new.slug := generate_slug(new.title);
    -- Add timestamp if slug already exists
    if exists (select 1 from blog_posts where slug = new.slug and id != new.id) then
      new.slug := new.slug || '-' || extract(epoch from now())::text;
    end if;
  end if;
  return new;
end;
$$ language plpgsql;

create trigger auto_generate_blog_post_slug
  before insert or update on blog_posts
  for each row
  execute function auto_generate_post_slug();

-- Trigger: Auto-calculate reading time
create or replace function auto_calculate_reading_time()
returns trigger as $$
begin
  new.reading_time := calculate_reading_time(new.content);
  return new;
end;
$$ language plpgsql;

create trigger auto_calculate_blog_post_reading_time
  before insert or update on blog_posts
  for each row
  when (new.content is not null)
  execute function auto_calculate_reading_time();

-- ============================================
-- SEED DATA
-- ============================================

-- Insert default blog categories
insert into blog_categories (name, slug, description, color, icon) values
  ('Technology', 'technology', 'Tech news and tutorials', '#3B82F6', '💻'),
  ('Career', 'career', 'Career advice and growth', '#10B981', '📈'),
  ('Tutorial', 'tutorial', 'Step-by-step guides', '#F59E0B', '📚'),
  ('Opinion', 'opinion', 'Personal thoughts and opinions', '#8B5CF6', '💭'),
  ('Case Study', 'case-study', 'Real-world examples', '#EF4444', '🔍');

-- Insert default bookmark categories
insert into bookmark_categories (name, slug, description, color, icon) values
  ('React & Frontend', 'react', 'React, Next.js, and modern frontend', '#61DAFB', '⚛️'),
  ('Software Architecture', 'architecture', 'System design and patterns', '#FF6B6B', '🏗️'),
  ('Performance', 'performance', 'Web performance optimization', '#4ECDC4', '⚡'),
  ('Career Growth', 'career', 'Career advice and soft skills', '#95E1D3', '📈'),
  ('Backend & APIs', 'backend', 'Server-side development', '#F38181', '🔧'),
  ('DevOps', 'devops', 'CI/CD and infrastructure', '#AA96DA', '☁️'),
  ('Testing', 'testing', 'Testing strategies', '#FCBAD3', '🧪'),
  ('Security', 'security', 'Web security best practices', '#A8D8EA', '🔒');
```

### Schema Execution Instructions

**To execute in Supabase:**
1. Go to Supabase Dashboard → SQL Editor
2. Create a new query
3. Copy the entire schema SQL above
4. Click "Run" to execute
5. Verify all tables are created in Table Editor

---

## Authentication System

### Phase 3: Authentication Setup

#### 3.1: Configure Supabase Auth

**In Supabase Dashboard:**
```
1. Go to Authentication → Settings
2. Configure Site URL: https://your-domain.com
3. Configure Redirect URLs:
   - http://localhost:5173 (development)
   - https://your-domain.com (production)
4. Enable Email provider
5. Optionally enable OAuth providers:
   - Google
   - GitHub
   - etc.
6. Configure email templates (optional)
```

#### 3.2: Create Supabase Client

**File: `src/lib/supabase.js`**
```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
})

// Helper function to check if user is admin
export async function isAdmin() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return false
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()
  
  return profile?.role === 'admin'
}
```

#### 3.3: Authentication Context

**File: `src/contexts/AuthContext.jsx`**
```javascript
import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfile(session.user.id)
      } else {
        setLoading(false)
      }
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        if (session?.user) {
          fetchProfile(session.user.id)
        } else {
          setProfile(null)
          setLoading(false)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  async function fetchProfile(userId) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) throw error
      setProfile(data)
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email, password, fullName) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName }
      }
    })
    return { data, error }
  }

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  }

  const isAdmin = profile?.role === 'admin'

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      loading,
      isAdmin,
      signUp,
      signIn,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
```

#### 3.4: Protected Route Component

**File: `src/components/ProtectedRoute.jsx`**
```javascript
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export function ProtectedRoute({ children, requireAdmin = false }) {
  const { user, profile, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div> // Replace with proper loading component
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (requireAdmin && profile?.role !== 'admin') {
    return <Navigate to="/" replace />
  }

  return children
}
```

---

## Backend API Layer

### Phase 4: API Service Layer

#### 4.1: Blog API Service

**File: `src/services/blogService.js`**
```javascript
import { supabase } from '../lib/supabase'

export const blogService = {
  // Fetch all published posts with filters
  async getPosts({ category, tag, search, page = 1, limit = 10 }) {
    let query = supabase
      .from('blog_posts')
      .select(`
        *,
        author:profiles(id, full_name, avatar_url),
        category:blog_categories(id, name, slug, color),
        tags:post_tags(tag:blog_tags(id, name, slug))
      `)
      .eq('status', 'published')
      .order('published_at', { ascending: false })

    if (category) {
      query = query.eq('category_id', category)
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%`)
    }

    const from = (page - 1) * limit
    const to = from + limit - 1

    const { data, error, count } = await query.range(from, to)

    if (error) throw error

    // Filter by tag if provided (client-side since it's many-to-many)
    let posts = data
    if (tag) {
      posts = data.filter(post => 
        post.tags.some(t => t.tag.slug === tag)
      )
    }

    return { posts, count }
  },

  // Fetch single post by slug
  async getPostBySlug(slug) {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        author:profiles(id, full_name, avatar_url, bio),
        category:blog_categories(id, name, slug, color),
        tags:post_tags(tag:blog_tags(id, name, slug))
      `)
      .eq('slug', slug)
      .single()

    if (error) throw error

    // Increment view count
    await supabase.rpc('increment_view_count', { post_id: data.id })

    return data
  },

  // Fetch featured posts
  async getFeaturedPosts(limit = 3) {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        author:profiles(id, full_name, avatar_url),
        category:blog_categories(id, name, slug, color)
      `)
      .eq('status', 'published')
      .eq('is_featured', true)
      .order('published_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data
  },

  // Fetch related posts
  async getRelatedPosts(postId, categoryId, limit = 3) {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        author:profiles(id, full_name, avatar_url),
        category:blog_categories(id, name, slug, color)
      `)
      .eq('status', 'published')
      .eq('category_id', categoryId)
      .neq('id', postId)
      .order('published_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data
  },

  // Admin: Get all posts (including drafts)
  async getAllPosts(status = null) {
    let query = supabase
      .from('blog_posts')
      .select(`
        *,
        author:profiles(id, full_name, avatar_url),
        category:blog_categories(id, name, slug, color),
        tags:post_tags(tag:blog_tags(id, name, slug))
      `)
      .order('created_at', { ascending: false })

    if (status) {
      query = query.eq('status', status)
    }

    const { data, error } = await query

    if (error) throw error
    return data
  },

  // Admin: Create post
  async createPost(postData) {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([postData])
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Admin: Update post
  async updatePost(id, postData) {
    const { data, error } = await supabase
      .from('blog_posts')
      .update(postData)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Admin: Delete post
  async deletePost(id) {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  // Admin: Publish post
  async publishPost(id) {
    const { data, error } = await supabase
      .from('blog_posts')
      .update({ 
        status: 'published',
        published_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Get all categories
  async getCategories() {
    const { data, error } = await supabase
      .from('blog_categories')
      .select('*')
      .order('sort_order')

    if (error) throw error
    return data
  },

  // Get all tags
  async getTags() {
    const { data, error } = await supabase
      .from('blog_tags')
      .select('*')
      .order('name')

    if (error) throw error
    return data
  },

  // Admin: Create category
  async createCategory(categoryData) {
    const { data, error } = await supabase
      .from('blog_categories')
      .insert([categoryData])
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Admin: Create tag
  async createTag(tagData) {
    const { data, error } = await supabase
      .from('blog_tags')
      .insert([tagData])
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Admin: Add tags to post
  async ad