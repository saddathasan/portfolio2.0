/**
 * Login Form Component
 * 
 * This component provides a complete login form with validation, error handling,
 * and integration with the authentication system. It follows the existing design
 * patterns and uses shadcn/ui components for consistency.
 * 
 * Features:
 * - Form validation with Zod schema
 * - React Hook Form integration
 * - Loading states and error handling
 * - Responsive design
 * - Accessibility support
 * - Password reset functionality
 * - Remember me option
 */

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, LogIn, Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';

// =============================================================================
// Form Schema and Types
// =============================================================================

/**
 * Login Form Validation Schema
 * Defines validation rules for the login form using Zod
 */
const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
});

/**
 * Login Form Data Type
 * Inferred from the Zod schema for type safety
 */
type LoginFormData = z.infer<typeof loginSchema>;

// =============================================================================
// Component Props
// =============================================================================

interface LoginFormProps {
  onSuccess?: () => void;
  onForgotPassword?: () => void;
  className?: string;
}

// =============================================================================
// Login Form Component
// =============================================================================

/**
 * LoginForm Component
 * 
 * Provides a complete login form with validation and authentication integration.
 * Handles form submission, loading states, and error display.
 * 
 * @param onSuccess - Callback function called after successful login
 * @param onForgotPassword - Callback function for forgot password action
 * @param className - Additional CSS classes for styling
 */
export const LoginForm: React.FC<LoginFormProps> = ({
  onSuccess,
  onForgotPassword,
  className = '',
}) => {
  // =============================================================================
  // Hooks and State
  // =============================================================================
  
  const { signIn, error, clearError } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // React Hook Form setup with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  // =============================================================================
  // Form Handlers
  // =============================================================================

  /**
   * Handle form submission
   * Validates form data and attempts to sign in the user
   */
  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      clearError();

      const result = await signIn(data.email, data.password);

      if (result.success) {
        // Clear form on successful login
        reset();
        
        // Call success callback if provided
        if (onSuccess) {
          onSuccess();
        }
      } else {
        // Set error from sign in attempt
        setSubmitError(result.error || 'Login failed');
      }
    } catch (err) {
      console.error('Login form submission error:', err);
      setSubmitError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Toggle password visibility
   */
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  /**
   * Handle forgot password action
   */
  const handleForgotPassword = () => {
    if (onForgotPassword) {
      onForgotPassword();
    } else {
      // Default behavior - could navigate to forgot password page
      console.log('Forgot password clicked');
    }
  };

  // =============================================================================
  // Error Display Logic
  // =============================================================================
  
  // Determine which error to show (form submission error takes precedence)
  const displayError = submitError || error;

  // =============================================================================
  // Render Component
  // =============================================================================

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Form Header */}
      <div className="text-center space-y-2">
        <div className="flex justify-center">
          <div className="p-3 bg-primary/10 rounded-full">
            <LogIn className="h-6 w-6 text-primary" />
          </div>
        </div>
        <h2 className="text-2xl font-bold">Welcome Back</h2>
        <p className="text-muted-foreground">
          Sign in to access the admin dashboard
        </p>
      </div>

      {/* Error Alert */}
      {displayError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{displayError}</AlertDescription>
        </Alert>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="pl-10"
              {...register('email')}
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
          </div>
          {errors.email && (
            <p id="email-error" className="text-sm text-destructive">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              className="pl-10 pr-10"
              {...register('password')}
              aria-invalid={errors.password ? 'true' : 'false'}
              aria-describedby={errors.password ? 'password-error' : undefined}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p id="password-error" className="text-sm text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Remember Me and Forgot Password */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="rememberMe"
              {...register('rememberMe')}
            />
            <Label
              htmlFor="rememberMe"
              className="text-sm font-normal cursor-pointer"
            >
              Remember me
            </Label>
          </div>
          
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm text-primary hover:text-primary/80 transition-colors"
          >
            Forgot password?
          </button>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full"
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              Signing In...
            </>
          ) : (
            <>
              <LogIn className="h-4 w-4 mr-2" />
              Sign In
            </>
          )}
        </Button>
      </form>

      {/* Additional Information */}
      <div className="text-center text-sm text-muted-foreground">
        <p>
          This is an admin-only area. If you don't have an account,
          please contact the site administrator.
        </p>
      </div>
    </div>
  );
};

// =============================================================================
// Export Default
// =============================================================================

export default LoginForm;