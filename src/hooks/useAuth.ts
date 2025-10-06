/**
 * Authentication Hooks
 * 
 * This module provides custom hooks for authentication-related functionality.
 * These hooks build upon the AuthContext to provide specific authentication
 * utilities and patterns commonly used throughout the application.
 * 
 * Features:
 * - Re-export of main useAuth hook for convenience
 * - Admin role checking hook
 * - Authentication requirement hook
 * - Login form integration hook
 */

import { useAuth as useAuthContext } from '@/context/AuthContext';

// =============================================================================
// Main Authentication Hook (Re-export)
// =============================================================================

/**
 * useAuth Hook
 * 
 * Main authentication hook that provides access to the auth context.
 * Re-exported here for convenience and consistency with other hooks.
 * 
 * @returns Complete authentication state and methods
 */
export const useAuth = useAuthContext;

// =============================================================================
// Role-Based Authentication Hooks
// =============================================================================

/**
 * useRequireAuth Hook
 * 
 * Hook that ensures the user is authenticated.
 * Useful for components that require authentication.
 * 
 * @returns Authentication state with guaranteed user (when not loading)
 */
export const useRequireAuth = () => {
  const auth = useAuth();
  
  return {
    ...auth,
    // Helper to check if we should show loading state
    shouldShowLoading: auth.loading,
    // Helper to check if user should be redirected to login
    shouldRedirectToLogin: !auth.loading && !auth.isAuthenticated,
  };
};

/**
 * useRequireAdmin Hook
 * 
 * Hook that ensures the user is authenticated and has admin role.
 * Useful for admin-only components and pages.
 * 
 * @returns Authentication state with admin role validation
 */
export const useRequireAdmin = () => {
  const auth = useAuth();
  
  return {
    ...auth,
    // Helper to check if we should show loading state
    shouldShowLoading: auth.loading,
    // Helper to check if user should be redirected to login
    shouldRedirectToLogin: !auth.loading && !auth.isAuthenticated,
    // Helper to check if user should see unauthorized message
    shouldShowUnauthorized: !auth.loading && auth.isAuthenticated && !auth.isAdmin,
    // Helper to check if user has admin access
    hasAdminAccess: auth.isAuthenticated && auth.isAdmin,
  };
};

// =============================================================================
// Authentication Status Hooks
// =============================================================================

/**
 * useAuthStatus Hook
 * 
 * Simplified hook that returns just the authentication status.
 * Useful for components that only need to know if user is logged in.
 * 
 * @returns Object with authentication status flags
 */
export const useAuthStatus = () => {
  const { isAuthenticated, isAdmin, loading, user } = useAuth();
  
  return {
    isAuthenticated,
    isAdmin,
    isLoading: loading,
    isGuest: !loading && !isAuthenticated,
    userId: user?.id || null,
    userEmail: user?.email || null,
  };
};

/**
 * useUserProfile Hook
 * 
 * Hook that returns user profile information.
 * Useful for components that need to display user data.
 * 
 * @returns User profile data and loading state
 */
export const useUserProfile = () => {
  const { profile, user, loading } = useAuth();
  
  return {
    profile,
    user,
    loading,
    // Computed values for convenience
    displayName: profile?.full_name || user?.email || 'User',
    avatarUrl: profile?.avatar_url,
    isProfileComplete: !!(profile?.full_name && profile?.bio),
  };
};

// =============================================================================
// Export All Hooks
// =============================================================================

export default useAuth;