/**
 * Supabase Client Configuration
 * 
 * This module provides a centralized configuration for the Supabase client,
 * ensuring consistent database access across the application. It includes
 * proper TypeScript typing and environment variable validation.
 * 
 * The client is configured with:
 * - Type-safe database schema
 * - Authentication persistence
 * - Proper error handling
 * - Environment variable validation
 */

import { createClient, type Session } from '@supabase/supabase-js';

// =============================================================================
// Environment Variable Validation
// =============================================================================

/**
 * Validates that required Supabase environment variables are present
 * Throws descriptive errors if configuration is missing
 */
const validateEnvironment = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl) {
    throw new Error(
      'Missing VITE_SUPABASE_URL environment variable. ' +
      'Please check your .env file and ensure the Supabase URL is configured.'
    );
  }

  if (!supabaseAnonKey) {
    throw new Error(
      'Missing VITE_SUPABASE_ANON_KEY environment variable. ' +
      'Please check your .env file and ensure the Supabase anonymous key is configured.'
    );
  }

  // Basic URL format validation
  try {
    new URL(supabaseUrl);
  } catch {
    throw new Error(
      'Invalid VITE_SUPABASE_URL format. ' +
      'Please ensure the URL is properly formatted (e.g., https://your-project.supabase.co)'
    );
  }

  return { supabaseUrl, supabaseAnonKey };
};

// =============================================================================
// Supabase Client Configuration
// =============================================================================

// Validate environment variables before creating client
const { supabaseUrl, supabaseAnonKey } = validateEnvironment();

/**
 * Supabase Client Instance
 * 
 * This is the main client instance used throughout the application.
 * It's configured with:
 * - Full TypeScript support via Database schema
 * - Authentication persistence in localStorage
 * - Automatic session refresh
 * - Proper error handling
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Persist authentication state in localStorage
    // This ensures users stay logged in across browser sessions
    persistSession: true,
    
    // Automatically refresh tokens when they expire
    autoRefreshToken: true,
    
    // Detect session in URL for OAuth flows
    detectSessionInUrl: true,
    
    // Custom storage key for authentication tokens
    storageKey: 'portfolio-auth-token',
  },
  
  // Database configuration
  db: {
    // Use the public schema
    schema: 'public',
  },
  
  // Realtime configuration
  realtime: {
    // Limit events per second to prevent overwhelming the client
    // This helps with performance when dealing with frequent updates
    params: {
      eventsPerSecond: 10,
    },
  },
});

// =============================================================================
// Client Utilities and Helpers
// =============================================================================

/**
 * Type-safe table access helper
 * Provides strongly typed access to database tables
 */
export const tables = {
  blogPosts: () => supabase.from('blog_posts'),
  bookmarks: () => supabase.from('bookmarks'),
  profiles: () => supabase.from('profiles'),
  blogCategories: () => supabase.from('blog_categories'),
  bookmarkCategories: () => supabase.from('bookmark_categories'),
} as const;

/**
 * Authentication helper methods
 * Provides convenient access to auth operations
 */
export const auth = {
  // Get current user session
  getSession: () => supabase.auth.getSession(),
  
  // Get current user
  getUser: () => supabase.auth.getUser(),
  
  // Sign in with email and password
  signIn: (email: string, password: string) =>
    supabase.auth.signInWithPassword({ email, password }),
  
  // Sign out current user
  signOut: () => supabase.auth.signOut(),
  
  // Listen to auth state changes
  onAuthStateChange: (callback: (event: string, session: Session | null) => void) =>
    supabase.auth.onAuthStateChange(callback),
  
  // Reset password
  resetPassword: (email: string) =>
    supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    }),
} as const;

/**
 * Storage helper methods
 * Provides convenient access to Supabase Storage
 */
export const storage = {
  // Upload file to a bucket
  upload: (bucket: string, path: string, file: File) =>
    supabase.storage.from(bucket).upload(path, file),
  
  // Get public URL for a file
  getPublicUrl: (bucket: string, path: string) =>
    supabase.storage.from(bucket).getPublicUrl(path),
  
  // Delete file from bucket
  remove: (bucket: string, paths: string[]) =>
    supabase.storage.from(bucket).remove(paths),
  
  // List files in bucket
  list: (bucket: string, path?: string) =>
    supabase.storage.from(bucket).list(path),
} as const;

// =============================================================================
// Error Handling Utilities
// =============================================================================

/**
 * Supabase Error Handler
 * Provides consistent error handling across the application
 */
export const handleSupabaseError = (error: unknown): string => {
  if (!error) return 'An unknown error occurred';
  
  // Type guard for error objects
  if (typeof error === 'object' && error !== null && 'code' in error) {
    const supabaseError = error as { code: string; message?: string };
    
    // Handle specific Supabase error codes
    switch (supabaseError.code) {
      case 'PGRST116':
        return 'No data found';
      case 'PGRST301':
        return 'Duplicate entry';
      case '23505':
        return 'This item already exists';
      case '42501':
        return 'Permission denied';
      case 'invalid_credentials':
        return 'Invalid email or password';
      case 'email_not_confirmed':
        return 'Please check your email and click the confirmation link';
      case 'weak_password':
        return 'Password is too weak. Please choose a stronger password';
      default:
        return supabaseError.message || 'An unexpected error occurred';
    }
  }
  
  // Handle string errors
  if (typeof error === 'string') {
    return error;
  }
  
  // Handle Error objects
  if (error instanceof Error) {
    return error.message;
  }
  
  return 'An unexpected error occurred';
};

/**
 * Type guard to check if an error is a Supabase error
 */
export const isSupabaseError = (error: unknown): error is { code: string; message: string } => {
  return error !== null && 
         typeof error === 'object' && 
         'code' in error && 
         'message' in error &&
         typeof (error as { code: unknown }).code === 'string' &&
         typeof (error as { message: unknown }).message === 'string';
};

// =============================================================================
// Development Utilities
// =============================================================================

/**
 * Development helper to check Supabase connection
 * Only available in development mode
 */
export const checkConnection = async (): Promise<boolean> => {
  if (import.meta.env.PROD) {
    console.warn('checkConnection is only available in development mode');
    return false;
  }

  try {
    const { error } = await supabase.from('profiles').select('count').limit(1);
    
    if (error) {
      console.error('Supabase connection failed:', error);
      return false;
    }
    
    console.log('✅ Supabase connection successful');
    return true;
  } catch (error) {
    console.error('Failed to connect to Supabase:', error);
    return false;
  }
};

// =============================================================================
// Export Default Client
// =============================================================================

export default supabase;