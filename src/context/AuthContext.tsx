/**
 * Authentication Context and Provider
 * 
 * This module provides authentication state management for the entire application.
 * It integrates with Supabase Auth to handle user authentication, session management,
 * and role-based access control.
 * 
 * Features:
 * - Automatic session restoration on app load
 * - Real-time auth state synchronization
 * - Role-based access control (admin/user)
 * - Loading states for better UX
 * - Comprehensive error handling
 * - TypeScript support throughout
 */

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { auth, handleSupabaseError, supabase } from '@/lib/supabase';
import type { Profile } from '@/types/database';

// =============================================================================
// Context Types and Interfaces
// =============================================================================

/**
 * Authentication State Interface
 * Defines the complete authentication state available to components
 */
interface AuthState {
  // Core authentication data
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  
  // Loading and error states
  loading: boolean;
  error: string | null;
  
  // Authentication methods
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  
  // Utility methods
  isAuthenticated: boolean;
  isAdmin: boolean;
  clearError: () => void;
}

/**
 * Auth Provider Props
 * Configuration for the AuthProvider component
 */
interface AuthProviderProps {
  children: React.ReactNode;
}

// =============================================================================
// Context Creation
// =============================================================================

/**
 * Authentication Context
 * Provides authentication state and methods to child components
 */
const AuthContext = createContext<AuthState | undefined>(undefined);

// =============================================================================
// Custom Hook for Auth Context
// =============================================================================

/**
 * useAuth Hook
 * 
 * Custom hook to access authentication context.
 * Provides type-safe access to auth state and methods.
 * 
 * @throws Error if used outside of AuthProvider
 * @returns AuthState object with user data and auth methods
 */
export const useAuth = (): AuthState => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error(
      'useAuth must be used within an AuthProvider. ' +
      'Make sure your component is wrapped with <AuthProvider>.'
    );
  }
  
  return context;
};

// =============================================================================
// Authentication Provider Component
// =============================================================================

/**
 * AuthProvider Component
 * 
 * Provides authentication context to the entire application.
 * Handles session management, user profile loading, and auth state synchronization.
 * 
 * @param children - Child components that will have access to auth context
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // =============================================================================
  // State Management
  // =============================================================================
  
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // =============================================================================
  // Profile Management
  // =============================================================================
  
  /**
   * Loads user profile data from the database
   * Called after successful authentication to get additional user info
   */
  const loadUserProfile = useCallback(async (): Promise<void> => {
    try {
      const { data, error } = await auth.getUser();
      
      if (error) {
        console.error('Error loading user profile:', error);
        setError(handleSupabaseError(error));
        return;
      }

      if (data.user) {
        // Try to fetch profile from database first
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (profileError && profileError.code !== 'PGRST116') {
          // PGRST116 is "not found" error, which is expected for new users
          console.error('Error fetching profile:', profileError);
          setError(handleSupabaseError(profileError));
          return;
        }

        if (profileData) {
          // Use profile from database
          setProfile(profileData);
        } else {
          // Create a basic profile from user data if no profile exists
          const userProfile: Profile = {
            id: data.user.id,
            email: data.user.email || '',
            full_name: data.user.user_metadata?.full_name || null,
            avatar_url: data.user.user_metadata?.avatar_url || null,
            role: data.user.email === 'saddathasan94@gmail.com' ? 'admin' : 'user', // Temporary admin check
            bio: undefined,
            website: undefined,
            twitter_handle: undefined,
            github_handle: undefined,
            created_at: data.user.created_at,
            updated_at: new Date().toISOString(),
          };
          
          setProfile(userProfile);
        }
      }
    } catch (err) {
      console.error('Failed to load user profile:', err);
      setError('Failed to load user profile');
    }
  }, []);

  // =============================================================================
  // Authentication Methods
  // =============================================================================
  
  /**
   * Sign In Method
   * Authenticates user with email and password
   */
  const signIn = useCallback(async (
    email: string, 
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await auth.signIn(email, password);
      
      if (error) {
        const errorMessage = handleSupabaseError(error);
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }
      
      if (data.user) {
        setUser(data.user);
        setSession(data.session);
        await loadUserProfile();
      }
      
      return { success: true };
    } catch {
      const errorMessage = 'An unexpected error occurred during sign in';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [loadUserProfile]);

  /**
   * Sign Out Method
   * Logs out the current user and clears all auth state
   */
  const signOut = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      const { error } = await auth.signOut();
      
      if (error) {
        console.error('Error signing out:', error);
        setError(handleSupabaseError(error));
        return;
      }
      
      // Clear all auth state
      setUser(null);
      setSession(null);
      setProfile(null);
    } catch (err) {
      console.error('Failed to sign out:', err);
      setError('Failed to sign out');
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Reset Password Method
   * Sends password reset email to user
   */
  const resetPassword = useCallback(async (
    email: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      setError(null);
      
      const { error } = await auth.resetPassword(email);
      
      if (error) {
        const errorMessage = handleSupabaseError(error);
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }
      
      return { success: true };
    } catch {
      const errorMessage = 'Failed to send reset password email';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  }, []);

  /**
   * Clear Error Method
   * Clears the current error state
   */
  const clearError = useCallback((): void => {
    setError(null);
  }, []);

  // =============================================================================
  // Session Management and Initialization
  // =============================================================================
  
  /**
   * Initialize Authentication
   * Restores session on app load and sets up auth state listener
   */
  useEffect(() => {
    let mounted = true;
    let isInitializing = true;
    
    const initializeAuth = async () => {
      try {
        // Get initial session
        const { data: { session }, error } = await auth.getSession();
        
        if (error) {
          console.error('Error getting initial session:', error);
          if (mounted) {
            setError(handleSupabaseError(error));
          }
          return;
        }
        
        if (session && mounted) {
          setSession(session);
          setUser(session.user);
          await loadUserProfile();
        }
      } catch (err) {
        console.error('Failed to initialize auth:', err);
        if (mounted) {
          setError('Failed to initialize authentication');
        }
      } finally {
        if (mounted) {
          isInitializing = false;
          setLoading(false);
        }
      }
    };

    // Set up auth state change listener
    const { data: { subscription } } = auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;
        
        console.log('Auth state changed:', event, session?.user?.email);
        
        setSession(session);
        setUser(session?.user ?? null);
        
        // Only load profile if not currently initializing to prevent race condition
        if (session?.user && !isInitializing) {
          await loadUserProfile();
        } else if (!session?.user) {
          setProfile(null);
        }
        
        // Only set loading to false if we're not in the initial auth check
        if (!isInitializing) {
          setLoading(false);
        }
      }
    );

    // Initialize auth state
    initializeAuth();

    // Cleanup function
    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [loadUserProfile]);

  // =============================================================================
  // Computed Values
  // =============================================================================
  
  const isAuthenticated = !!user && !!session;
  const isAdmin = profile?.role === 'admin';

  // =============================================================================
  // Context Value
  // =============================================================================
  
  const contextValue: AuthState = {
    // Core auth data
    user,
    session,
    profile,
    
    // State flags
    loading,
    error,
    isAuthenticated,
    isAdmin,
    
    // Methods
    signIn,
    signOut,
    resetPassword,
    clearError,
  };

  // =============================================================================
  // Render Provider
  // =============================================================================
  
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// =============================================================================
// Export Default
// =============================================================================

export default AuthProvider;