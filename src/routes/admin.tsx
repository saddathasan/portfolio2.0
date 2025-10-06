/**
 * Admin Route
 * 
 * This route provides access to the admin dashboard for authenticated admin users.
 * It includes authentication checks, loading states, and the main admin interface.
 * 
 * Features:
 * - Admin-only access with role verification
 * - Supabase connection testing
 * - Authentication status display
 * - Clean, responsive design using shadcn/ui
 * - Comprehensive error handling
 */

import { createFileRoute } from '@tanstack/react-router';
import React, { useEffect, useState } from 'react';
// import { AdminRoute } from '@/components/auth/ProtectedRoute';
import { LoginForm } from '@/components/auth/LoginForm';
import { useAuth } from '@/hooks/useAuth';
import { checkConnection } from '@/lib/supabase';
import { BlogManagement } from '@/pages/admin/BlogManagement';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Settings, 
  Database, 
  Users, 
  FileText, 
  Bookmark, 
  LogOut, 
  CheckCircle, 
  XCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';

// =============================================================================
// Admin Dashboard Component
// =============================================================================

/**
 * AdminDashboard Component
 * 
 * Main admin dashboard interface showing system status, user info,
 * and navigation to admin features.
 */
const AdminDashboard: React.FC = () => {
  const { user, profile, signOut } = useAuth();
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<'dashboard' | 'blog' | 'bookmarks'>('dashboard');

  // =============================================================================
  // Connection Testing
  // =============================================================================

  useEffect(() => {
    const testConnection = async () => {
      try {
        setConnectionStatus('checking');
        setConnectionError(null);
        
        const isConnected = await checkConnection();
        
        if (isConnected) {
          setConnectionStatus('connected');
        } else {
          setConnectionStatus('error');
          setConnectionError('Failed to connect to Supabase');
        }
      } catch (error) {
        console.error('Connection test failed:', error);
        setConnectionStatus('error');
        setConnectionError(error instanceof Error ? error.message : 'Unknown connection error');
      }
    };

    testConnection();
  }, []);

  // =============================================================================
  // Event Handlers
  // =============================================================================

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  const retryConnection = () => {
    setConnectionStatus('checking');
    setConnectionError(null);
    // Re-run the connection test
    const testConnection = async () => {
      try {
        const isConnected = await checkConnection();
        setConnectionStatus(isConnected ? 'connected' : 'error');
        if (!isConnected) {
          setConnectionError('Failed to connect to Supabase');
        }
      } catch (error) {
        setConnectionStatus('error');
        setConnectionError(error instanceof Error ? error.message : 'Unknown connection error');
      }
    };
    testConnection();
  };

  // =============================================================================
  // Render Dashboard
  // =============================================================================

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">
              {activeSection === 'blog' ? 'Blog Management' : 
               activeSection === 'bookmarks' ? 'Bookmark Management' : 
               'Admin Dashboard'}
            </h1>
            <p className="text-muted-foreground mt-1">
              {activeSection === 'blog' ? 'Create, edit, and manage your blog posts' :
               activeSection === 'bookmarks' ? 'Organize and manage your bookmark collection' :
               'Manage your portfolio content and settings'}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {activeSection !== 'dashboard' && (
              <Button variant="outline" size="sm" onClick={() => setActiveSection('dashboard')}>
                Back to Dashboard
              </Button>
            )}
            <div className="text-right">
              <p className="text-sm font-medium">{profile?.full_name || user?.email}</p>
              <Badge variant="secondary" className="text-xs">
                {profile?.role || 'admin'}
              </Badge>
            </div>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Conditional Content Based on Active Section */}
        {activeSection === 'blog' && <BlogManagement />}
        
        {activeSection === 'bookmarks' && (
          <Card>
            <CardHeader>
              <CardTitle>Bookmark Management</CardTitle>
              <CardDescription>
                Bookmark management functionality coming soon
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This feature will allow you to manage your bookmark collection with full CRUD operations.
              </p>
            </CardContent>
          </Card>
        )}

        {activeSection === 'dashboard' && (
          <>
            {/* System Status */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  System Status
                </CardTitle>
                <CardDescription>
                  Current status of your Supabase connection and services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {connectionStatus === 'checking' && (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                        <span className="text-sm">Checking connection...</span>
                      </>
                    )}
                    {connectionStatus === 'connected' && (
                      <>
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="text-sm">Supabase connected successfully</span>
                      </>
                    )}
                    {connectionStatus === 'error' && (
                      <>
                        <XCircle className="h-5 w-5 text-red-500" />
                        <span className="text-sm">Connection failed</span>
                      </>
                    )}
                  </div>
                  
                  {connectionStatus === 'error' && (
                    <Button variant="outline" size="sm" onClick={retryConnection}>
                      Retry
                    </Button>
                  )}
                </div>
                
                {connectionError && (
                  <Alert variant="destructive" className="mt-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{connectionError}</AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="h-5 w-5" />
                Blog Posts
              </CardTitle>
              <CardDescription>
                Create and manage blog posts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Write, edit, and publish blog posts with rich text editing.
              </p>
              <Button 
                className="w-full" 
                onClick={() => setActiveSection('blog')}
              >
                Manage Blog Posts
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Bookmark className="h-5 w-5" />
                Bookmarks
              </CardTitle>
              <CardDescription>
                Manage your bookmark collection
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Add, edit, and organize your curated bookmarks.
              </p>
              <Button 
                className="w-full" 
                onClick={() => setActiveSection('bookmarks')}
              >
                Manage Bookmarks
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Settings className="h-5 w-5" />
                Settings
              </CardTitle>
              <CardDescription>
                Configure site settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Manage site configuration and preferences.
              </p>
              <Button className="w-full" disabled>
                Coming Soon
              </Button>
            </CardContent>
          </Card>
        </div>

            {/* Development Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Development Information
                </CardTitle>
                <CardDescription>
                  Current implementation status and next steps
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Phase 1: Foundation Setup ✅</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                    <li>• Supabase client configuration</li>
                    <li>• Authentication system</li>
                    <li>• Protected routes</li>
                    <li>• Database types and schemas</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Next: Phase 2 - Database Setup</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                    <li>• Create database tables</li>
                    <li>• Set up Row Level Security (RLS)</li>
                    <li>• Configure storage buckets</li>
                    <li>• Migrate existing bookmark data</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

// =============================================================================
// Login Page Component
// =============================================================================

/**
 * AdminLoginPage Component
 * 
 * Displays the login form for admin access.
 * Shown when user is not authenticated.
 */
const AdminLoginPage: React.FC = () => {
  const handleLoginSuccess = () => {
    // The auth context will automatically update and redirect
    console.log('Login successful');
  };

  const handleForgotPassword = () => {
    // TODO: Implement forgot password functionality
    console.log('Forgot password clicked');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <LoginForm 
          onSuccess={handleLoginSuccess}
          onForgotPassword={handleForgotPassword}
        />
      </div>
    </div>
  );
};

// =============================================================================
// Main Admin Component
// =============================================================================

/**
 * AdminPage Component
 * 
 * Main admin page that handles authentication state and renders
 * appropriate content (login form or dashboard).
 */
const AdminPage: React.FC = () => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return <AdminLoginPage />;
  }

  // Show unauthorized message if not admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md mx-auto p-6">
          <XCircle className="h-16 w-16 text-red-500 mx-auto" />
          <h1 className="text-2xl font-bold">Access Denied</h1>
          <p className="text-muted-foreground">
            You don't have administrator privileges to access this page.
          </p>
          <Button onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  // Show admin dashboard
  return <AdminDashboard />;
};

// =============================================================================
// Route Definition
// =============================================================================

export const Route = createFileRoute('/admin')({
  component: AdminPage,
});