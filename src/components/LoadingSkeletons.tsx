import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface SkeletonProps {
	className?: string;
}

// Base skeleton component
function Skeleton({ className, ...props }: SkeletonProps) {
	return (
		<div
			className={cn(
				'animate-pulse rounded bg-gray-200 dark:bg-gray-800',
				className
			)}
			{...props}
		/>
	);
}

// Project card skeleton
function ProjectCardSkeleton({ className }: SkeletonProps) {
	return (
		<Card className={cn('h-full', className)}>
			<CardHeader className="space-y-3">
				<Skeleton className="h-4 w-3/4" />
				<Skeleton className="h-3 w-1/2" />
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-2">
					<Skeleton className="h-3 w-full" />
					<Skeleton className="h-3 w-full" />
					<Skeleton className="h-3 w-2/3" />
				</div>
				<div className="flex flex-wrap gap-2">
					<Skeleton className="h-6 w-16" />
					<Skeleton className="h-6 w-20" />
					<Skeleton className="h-6 w-14" />
					<Skeleton className="h-6 w-18" />
				</div>
				<div className="flex gap-2 pt-2">
					<Skeleton className="h-9 w-20" />
					<Skeleton className="h-9 w-16" />
				</div>
			</CardContent>
		</Card>
	);
}

// Experience timeline skeleton
function ExperienceTimelineSkeleton({ className }: SkeletonProps) {
	return (
		<div className={cn('space-y-8', className)}>
			{Array.from({ length: 3 }).map((_, index) => (
				<div key={index} className="relative">
					{/* Timeline line */}
					{index < 2 && (
						<div className="absolute left-4 top-12 bottom-0 w-0.5 bg-muted" />
					)}
					
					{/* Timeline dot */}
					<div className="absolute left-2 top-6 w-4 h-4 bg-muted rounded-full" />
					
					{/* Content */}
					<Card className="ml-10">
						<CardHeader className="space-y-3">
							<div className="flex justify-between items-start">
								<div className="space-y-2">
									<Skeleton className="h-5 w-48" />
									<Skeleton className="h-4 w-32" />
								</div>
								<Skeleton className="h-6 w-20" />
							</div>
							<Skeleton className="h-3 w-24" />
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Skeleton className="h-3 w-full" />
								<Skeleton className="h-3 w-5/6" />
								<Skeleton className="h-3 w-4/5" />
							</div>
							<div className="flex flex-wrap gap-2">
								{Array.from({ length: 5 }).map((_, techIndex) => (
									<Skeleton key={techIndex} className="h-6 w-16" />
								))}
							</div>
						</CardContent>
					</Card>
				</div>
			))}
		</div>
	);
}

// Hero section skeleton
function HeroSectionSkeleton({ className }: SkeletonProps) {
	return (
		<div className={cn('text-center space-y-6 mb-20', className)}>
			<Skeleton className="h-16 w-96 mx-auto" />
			<Skeleton className="h-8 w-64 mx-auto" />
			<Skeleton className="h-4 w-48 mx-auto" />
			<div className="space-y-3 max-w-3xl mx-auto">
				<Skeleton className="h-4 w-full" />
				<Skeleton className="h-4 w-5/6 mx-auto" />
			</div>
			<div className="flex justify-center gap-4">
				<Skeleton className="h-10 w-32" />
				<Skeleton className="h-10 w-24" />
				<Skeleton className="h-10 w-20" />
			</div>
		</div>
	);
}

// Page header skeleton
function PageHeaderSkeleton({ className }: SkeletonProps) {
	return (
		<div className={cn('text-center space-y-4 mb-12', className)}>
			<Skeleton className="h-12 w-80 mx-auto" />
			<div className="space-y-2 max-w-2xl mx-auto">
				<Skeleton className="h-4 w-full" />
				<Skeleton className="h-4 w-3/4 mx-auto" />
			</div>
		</div>
	);
}

// Skills sidebar skeleton
function SkillsSidebarSkeleton({ className }: SkeletonProps) {
	return (
		<div className={cn('space-y-6', className)}>
			<Skeleton className="h-6 w-32" />
			{Array.from({ length: 4 }).map((_, index) => (
				<div key={index} className="space-y-3">
					<Skeleton className="h-5 w-28" />
					<Skeleton className="h-3 w-full" />
					<div className="flex flex-wrap gap-2">
						{Array.from({ length: 6 }).map((_, skillIndex) => (
							<Skeleton key={skillIndex} className="h-6 w-16" />
						))}
					</div>
				</div>
			))}
		</div>
	);
}

// Contact form skeleton
function ContactFormSkeleton({ className }: SkeletonProps) {
	return (
		<Card className={cn('p-6', className)}>
			<div className="space-y-6">
				<div className="space-y-2">
					<Skeleton className="h-6 w-32" />
					<Skeleton className="h-3 w-48" />
				</div>
				<div className="space-y-4">
					<div className="space-y-2">
						<Skeleton className="h-4 w-16" />
						<Skeleton className="h-10 w-full" />
					</div>
					<div className="space-y-2">
						<Skeleton className="h-4 w-12" />
						<Skeleton className="h-10 w-full" />
					</div>
					<div className="space-y-2">
						<Skeleton className="h-4 w-20" />
						<Skeleton className="h-24 w-full" />
					</div>
					<Skeleton className="h-10 w-32" />
				</div>
			</div>
		</Card>
	);
}

// Grid skeleton for multiple items
function GridSkeleton({ 
	count = 6, 
	columns = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
	itemComponent: ItemComponent = ProjectCardSkeleton,
	className 
}: {
	count?: number;
	columns?: string;
	itemComponent?: React.ComponentType<SkeletonProps>;
	className?: string;
}) {
	return (
		<div className={cn('grid gap-6', columns, className)}>
			{Array.from({ length: count }).map((_, index) => (
				<ItemComponent key={index} />
			))}
		</div>
	);
}

// Loading spinner component
function LoadingSpinner({ className, size = 'md' }: SkeletonProps & { size?: 'sm' | 'md' | 'lg' }) {
	const sizeClasses = {
		sm: 'h-4 w-4',
		md: 'h-6 w-6',
		lg: 'h-8 w-8'
	};

	return (
		<div className={cn('flex items-center justify-center', className)}>
			<div className={cn(
				'animate-spin rounded-full border-2 border-gray-200 border-t-gray-900 dark:border-gray-700 dark:border-t-gray-100',
				sizeClasses[size]
			)} />
		</div>
	);
}

// Loading overlay component
function LoadingOverlay({ 
	isLoading, 
	children, 
	spinnerSize = 'md',
	className 
}: {
	isLoading: boolean;
	children: React.ReactNode;
	spinnerSize?: 'sm' | 'md' | 'lg';
	className?: string;
}) {
	return (
		<div className={cn('relative', className)}>
			{children}
			{isLoading && (
				<div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
					<LoadingSpinner size={spinnerSize} />
				</div>
			)}
		</div>
	);
}

export {
	Skeleton,
	ProjectCardSkeleton,
	ExperienceTimelineSkeleton,
	HeroSectionSkeleton,
	PageHeaderSkeleton,
	SkillsSidebarSkeleton,
	ContactFormSkeleton,
	GridSkeleton,
	LoadingSpinner,
	LoadingOverlay
};