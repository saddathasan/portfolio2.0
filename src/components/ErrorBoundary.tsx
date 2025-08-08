import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ErrorBoundaryState, ErrorInfo } from "@/types";
import React from "react";

interface ErrorBoundaryProps {
	children: React.ReactNode;
	fallback?: React.ComponentType<ErrorFallbackProps>;
	onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorFallbackProps {
	error: Error;
	errorInfo: ErrorInfo | null;
	resetError: () => void;
}

// Default error fallback component
function DefaultErrorFallback({ error, resetError }: ErrorFallbackProps) {
	return (
		<div className="min-h-[400px] flex items-center justify-center p-4">
			<Card className="max-w-md w-full">
				<CardHeader>
					<CardTitle className="text-destructive flex items-center gap-2">
						<svg
							className="h-5 w-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
							/>
						</svg>
						Something went wrong
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<p className="text-muted-foreground">
						We encountered an unexpected error. Please try
						refreshing the page or contact support if the problem
						persists.
					</p>
					{process.env.NODE_ENV === "development" && (
						<details className="mt-4">
							<summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground">
								Error Details (Development)
							</summary>
							<pre className="mt-2 text-xs bg-muted p-2 rounded overflow-auto max-h-32">
								{error.message}
								{error.stack && `\n\n${error.stack}`}
							</pre>
						</details>
					)}
					<div className="flex gap-2">
						<Button
							onClick={resetError}
							variant="default">
							Try Again
						</Button>
						<Button
							onClick={() => window.location.reload()}
							variant="outline">
							Refresh Page
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

class ErrorBoundary extends React.Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = {
			hasError: false,
			error: null,
			errorInfo: null,
		};
	}

	static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
		return {
			hasError: true,
			error,
		};
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		const customErrorInfo: ErrorInfo = {
			message: error.message,
			stack: error.stack,
			componentStack: errorInfo.componentStack || undefined,
		};

		this.setState({
			errorInfo: customErrorInfo,
		});

		// Call the onError callback if provided
		if (this.props.onError) {
			this.props.onError(error, customErrorInfo);
		}

		// Log error in development
		if (process.env.NODE_ENV === "development") {
			console.error("ErrorBoundary caught an error:", error, errorInfo);
		}
	}

	resetError = () => {
		this.setState({
			hasError: false,
			error: null,
			errorInfo: null,
		});
	};

	render() {
		if (this.state.hasError && this.state.error) {
			const FallbackComponent =
				this.props.fallback || DefaultErrorFallback;
			return (
				<FallbackComponent
					error={this.state.error}
					errorInfo={this.state.errorInfo}
					resetError={this.resetError}
				/>
			);
		}

		return this.props.children;
	}
}

// Higher-order component for easier usage
export function withErrorBoundary<P extends object>(
	Component: React.ComponentType<P>,
	errorBoundaryProps?: Omit<ErrorBoundaryProps, "children">,
) {
	const WrappedComponent = (props: P) => (
		<ErrorBoundary {...errorBoundaryProps}>
			<Component {...props} />
		</ErrorBoundary>
	);

	WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;

	return WrappedComponent;
}

// Hook for error reporting
export function useErrorHandler() {
	return React.useCallback((error: Error, errorInfo?: ErrorInfo) => {
		// In a real app, you might want to send this to an error reporting service
		console.error("Error caught by useErrorHandler:", error, errorInfo);

		// You could integrate with services like Sentry, LogRocket, etc.
		// Example: Sentry.captureException(error, { extra: errorInfo });
	}, []);
}

export { DefaultErrorFallback, ErrorBoundary };
export type { ErrorBoundaryProps, ErrorFallbackProps };
