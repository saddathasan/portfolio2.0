-- Create complete database schema for portfolio application
-- This migration creates all necessary tables for the blog and bookmark system

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================================================
-- User Profiles Table
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    full_name TEXT,
    avatar_url TEXT,
    bio TEXT,
    role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    website TEXT,
    twitter TEXT,
    github TEXT,
    linkedin TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
    FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- =============================================================================
-- Blog Categories Table
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.blog_categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    color TEXT DEFAULT '#3B82F6',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on blog_categories
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;

-- Blog categories policies
CREATE POLICY "Blog categories are viewable by everyone" ON public.blog_categories
    FOR SELECT USING (true);

CREATE POLICY "Only admins can manage blog categories" ON public.blog_categories
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- =============================================================================
-- Blog Tags Table
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.blog_tags (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on blog_tags
ALTER TABLE public.blog_tags ENABLE ROW LEVEL SECURITY;

-- Blog tags policies
CREATE POLICY "Blog tags are viewable by everyone" ON public.blog_tags
    FOR SELECT USING (true);

CREATE POLICY "Only admins can manage blog tags" ON public.blog_tags
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- =============================================================================
-- Blog Posts Table
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    content TEXT NOT NULL,
    excerpt TEXT,
    featured_image_url TEXT,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    published_at TIMESTAMP WITH TIME ZONE,
    author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    category_id UUID REFERENCES public.blog_categories(id) ON DELETE SET NULL,
    view_count INTEGER DEFAULT 0,
    reading_time INTEGER, -- in minutes
    seo_title TEXT,
    seo_description TEXT,
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on blog_posts
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Blog posts policies
CREATE POLICY "Published blog posts are viewable by everyone" ON public.blog_posts
    FOR SELECT USING (status = 'published' OR auth.uid() = author_id);

CREATE POLICY "Authors can manage their own posts" ON public.blog_posts
    FOR ALL USING (auth.uid() = author_id);

CREATE POLICY "Admins can manage all posts" ON public.blog_posts
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- =============================================================================
-- Post Tags Junction Table
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.post_tags (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    post_id UUID REFERENCES public.blog_posts(id) ON DELETE CASCADE NOT NULL,
    tag_id UUID REFERENCES public.blog_tags(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(post_id, tag_id)
);

-- Enable RLS on post_tags
ALTER TABLE public.post_tags ENABLE ROW LEVEL SECURITY;

-- Post tags policies
CREATE POLICY "Post tags are viewable by everyone" ON public.post_tags
    FOR SELECT USING (true);

CREATE POLICY "Authors can manage tags for their posts" ON public.post_tags
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.blog_posts 
            WHERE id = post_id AND author_id = auth.uid()
        )
    );

CREATE POLICY "Admins can manage all post tags" ON public.post_tags
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- =============================================================================
-- Bookmark Categories Table
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.bookmark_categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    color TEXT DEFAULT '#10B981',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on bookmark_categories
ALTER TABLE public.bookmark_categories ENABLE ROW LEVEL SECURITY;

-- Bookmark categories policies
CREATE POLICY "Bookmark categories are viewable by everyone" ON public.bookmark_categories
    FOR SELECT USING (true);

CREATE POLICY "Only admins can manage bookmark categories" ON public.bookmark_categories
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- =============================================================================
-- Bookmarks Table
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.bookmarks (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    description TEXT,
    author TEXT,
    category_id UUID REFERENCES public.bookmark_categories(id) ON DELETE SET NULL,
    tags TEXT[] DEFAULT '{}',
    featured BOOLEAN DEFAULT FALSE,
    click_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on bookmarks
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;

-- Bookmarks policies
CREATE POLICY "Bookmarks are viewable by everyone" ON public.bookmarks
    FOR SELECT USING (true);

CREATE POLICY "Only admins can manage bookmarks" ON public.bookmarks
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- =============================================================================
-- Analytics Table
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.analytics (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    resource_type TEXT NOT NULL CHECK (resource_type IN ('blog_post', 'bookmark')),
    resource_id UUID NOT NULL,
    event_type TEXT NOT NULL CHECK (event_type IN ('view', 'click', 'share')),
    user_agent TEXT,
    ip_address INET,
    referrer TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on analytics
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;

-- Analytics policies
CREATE POLICY "Only admins can view analytics" ON public.analytics
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Analytics can be inserted by anyone" ON public.analytics
    FOR INSERT WITH CHECK (true);

-- =============================================================================
-- Functions and Triggers
-- =============================================================================

-- Function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, role)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
        COALESCE(NEW.raw_user_meta_data->>'role', 'user')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers to relevant tables
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_blog_categories_updated_at
    BEFORE UPDATE ON public.blog_categories
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at
    BEFORE UPDATE ON public.blog_posts
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bookmark_categories_updated_at
    BEFORE UPDATE ON public.bookmark_categories
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bookmarks_updated_at
    BEFORE UPDATE ON public.bookmarks
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =============================================================================
-- Insert Default Data
-- =============================================================================

-- Insert default blog categories
INSERT INTO public.blog_categories (name, slug, description, color) VALUES
    ('Technology', 'technology', 'Posts about web development, programming, and tech trends', '#3B82F6'),
    ('Personal', 'personal', 'Personal thoughts, experiences, and reflections', '#8B5CF6'),
    ('Tutorials', 'tutorials', 'Step-by-step guides and how-to articles', '#10B981'),
    ('Reviews', 'reviews', 'Reviews of tools, books, and resources', '#F59E0B')
ON CONFLICT (slug) DO NOTHING;

-- Insert default blog tags
INSERT INTO public.blog_tags (name, slug) VALUES
    ('React', 'react'),
    ('TypeScript', 'typescript'),
    ('JavaScript', 'javascript'),
    ('Web Development', 'web-development'),
    ('Frontend', 'frontend'),
    ('Backend', 'backend'),
    ('Tutorial', 'tutorial'),
    ('Tips', 'tips')
ON CONFLICT (slug) DO NOTHING;

-- Insert default bookmark categories
INSERT INTO public.bookmark_categories (name, slug, description, color) VALUES
    ('Development Tools', 'development-tools', 'Useful tools for developers', '#3B82F6'),
    ('Learning Resources', 'learning-resources', 'Educational content and courses', '#8B5CF6'),
    ('Design Inspiration', 'design-inspiration', 'Design resources and inspiration', '#EC4899'),
    ('Productivity', 'productivity', 'Tools and tips for productivity', '#10B981')
ON CONFLICT (slug) DO NOTHING;

-- Create admin profile if user exists
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM auth.users WHERE email = 'saddathasan94@gmail.com') THEN
        INSERT INTO public.profiles (id, full_name, role)
        SELECT id, 'Admin User', 'admin'
        FROM auth.users 
        WHERE email = 'saddathasan94@gmail.com'
        ON CONFLICT (id) DO UPDATE SET role = 'admin';
    END IF;
END $$;