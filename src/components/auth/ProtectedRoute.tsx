/**
 * Protected Route Component
 * 
 * This component provides route-level authentication and authorization protection.
 * It ensures that only authenticated users (and optionally admin users) can access
 * certain routes and components.
 * 
 * Features:
 * - Authentication requirement enforcement
 * - Role-based access control (admin-only routes)
 * - Loading states during auth checks
 * - Automatic redirects for unauthorized access
 * - Customizable fallback components
 * - TypeScript support for props and children
 */

import React from 'react';
import { Navigate } from '@tanstack/react-router';
import { useRequireAuth, useRequireAdmin } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Lock, LogIn } from 'lucide-react';

// =============================================================================
// Component Props and Types
// =============================================================================

/**
 * Protected Route Props
 * Configuration options for the ProtectedRoute component
 */
interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  fallback?: React.ReactNode;
  loadingComponent?: React.ReactNode;
  unauthorizedComponent?: React.ReactNode;
  redirectTo?: string;
}

// =============================================================================
// Default Components
// =============================================================================

/**
 * Default Loading Component
 * Shown while authentication state is being determined
 */
const DefaultLoadingComponent: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center space-y-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
      <p className="text-muted-foreground">Checking authentication...</p>
    </div>
  </div>
);

/**
 * Default Unauthorized Component
 * Shown when user lacks required permissions
 */
const DefaultUnauthorizedComponent: React.FC<{ isAdmin?: boolean }> = ({ isAdmin = false }) => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center space-y-6 max-w-md mx-auto p-6">
      <div className="flex justify-center">
        {isAdmin ? (
          <Lock className="h-16 w-16 text-muted-foreground" />
        ) : (
          <LogIn className="h-16 w-16 text-muted-foreground" />
        )}
      </div>
      
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">
          {isAdmin ? 'Admin Access Required' : 'Authentication Required'}
        </h1>
        <p className="text-muted-foreground">
          {isAdmin 
            ? 'You need administrator privileges to access this page.'
            : 'Please sign in to access this page.'
          }
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button 
          onClick={() => window.history.back()}
          variant="outline"
        >
          Go Back
        </Button>
        {!isAdmin && (
          <Button 
            onClick={() => window.location.href = '/auth/login'}
          >
            <LogIn className="h-4 w-4 mr-2" />
            Sign In
          </Button>
        )}
      </div>
    </div>
  </div>
);

// =============================================================================
// Protected Route Component
// =============================================================================

/**
 * ProtectedRoute Component
 * 
 * Wraps child components with authentication and authorization checks.
 * Automatically handles loading states, redirects, and error states.
 * 
 * @param children - Components to render when access is granted
 * @param requireAdmin - Whether admin role is required (default: false)
 * @param fallback - Custom component to show when access is denied
 * @param loadingComponent - Custom loading component
 * @param unauthorizedComponent - Custom unauthorized component
 * @param redirectTo - Custom redirect path for unauthorized users
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAdmin = false,
  fallback,
  loadingComponent,
  unauthorizedComponent,
  redirectTo,
}) => {
  // Use appropriate auth hook based on requirements
  const authResult = useRequireAuth();
  const adminResult = useRequireAdmin();
  const auth = requireAdmin ? adminResult : authResult;
  
  // =============================================================================
  // Loading State
  // =============================================================================
  
  if (auth.shouldShowLoading) {
    return (
      <>
        {loadingComponent || <DefaultLoadingComponent />}
      </>
    );
  }
  
  // =============================================================================
  // Authentication Check
  // =============================================================================
  
  if (auth.shouldRedirectToLogin) {
    // If custom redirect is specified, use it
    if (redirectTo) {
      return <Navigate to={redirectTo} replace />;
    }
    
    // If custom fallback is provided, use it
    if (fallback) {
      return <>{fallback}</>;
    }
    
    // If custom unauthorized component is provided, use it
    if (unauthorizedComponent) {
      return <>{unauthorizedComponent}</>;
    }
    
    // Use default unauthorized component
    return <DefaultUnauthorizedComponent isAdmin={false} />;
  }
  
  // =============================================================================
  // Authorization Check (Admin Only)
  // =============================================================================
  
  if (requireAdmin && 'shouldShowUnauthorized' in auth && auth.shouldShowUnauthorized) {
    // If custom fallback is provided, use it
    if (fallback) {
      return <>{fallback}</>;
    }
    
    // If custom unauthorized component is provided, use it
    if (unauthorizedComponent) {
      return <>{unauthorizedComponent}</>;
    }
    
    // Use default unauthorized component for admin access
    return <DefaultUnauthorizedComponent isAdmin={true} />;
  }
  
  // =============================================================================
  // Render Protected Content
  // =============================================================================
  
  return <>{children}</>;
};

// =============================================================================
// Higher-Order Component Wrapper
// =============================================================================

/**
 * withProtectedRoute HOC
 * 
 * Higher-order component that wraps a component with ProtectedRoute.
 * Useful for protecting entire page components.
 * 
 * @param Component - Component to protect
 * @param options - Protection options
 * @returns Protected component
 */
export const withProtectedRoute = <P extends object>(
  Component: React.ComponentType<P>,
  options: Omit<ProtectedRouteProps, 'children'> = {}
) => {
  const ProtectedComponent: React.FC<P> = (props) => (
    <ProtectedRoute {...options}>
      <Component {...props} />
    </ProtectedRoute>
  );
  
  ProtectedComponent.displayName = `withProtectedRoute(${Component.displayName || Component.name})`;
  
  return ProtectedComponent;
};

// =============================================================================
// Utility Components
// =============================================================================

/**
 * AdminRoute Component
 * Convenience component for admin-only routes
 */
export const AdminRoute: React.FC<Omit<ProtectedRouteProps, 'requireAdmin'>> = (props) => (
  <ProtectedRoute {...props} requireAdmin={true} />
);

/**
 * AuthRoute Component
 * Convenience component for authenticated-only routes
 */
export const AuthRoute: React.FC<Omit<ProtectedRouteProps, 'requireAdmin'>> = (props) => (
  <ProtectedRoute {...props} requireAdmin={false} />
);

// =============================================================================
// Export Default
// =============================================================================

export default ProtectedRoute;