/**
 * Blog List Component
 *
 * A comprehensive component for displaying and managing blog posts with
 * advanced filtering, search, pagination, and CRUD operations.
 *
 * Features:
 * - Display blog posts in a responsive grid/list layout
 * - Advanced search and filtering (by category, tags, status)
 * - Pagination for large datasets
 * - Bulk operations (publish, unpublish, delete)
 * - Quick actions (edit, delete, preview)
 * - Loading and error states
 * - Responsive design
 */

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	useBlogCategories,
	useBlogPosts,
	useDeleteBlogPost,
	useUpdateBlogPost,
} from "@/hooks/useBlog";
import type { BlogCategory, BlogPost } from "@/types/database";
import {
	Calendar,
	CheckCircle,
	Clock,
	Edit,
	Eye,
	FileText,
	Loader2,
	MoreVertical,
	Plus,
	Search,
	Trash2,
	XCircle,
} from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

// =============================================================================
// Types
// =============================================================================

interface BlogListProps {
	onCreatePost?: () => void;
	onEditPost?: (post: BlogPost) => void;
	onPreviewPost?: (post: BlogPost) => void;
	showActions?: boolean;
}

interface BlogPostFilters {
	search: string;
	category: string;
	published: string; // 'all' | 'published' | 'draft'
	tags: string[];
}

// =============================================================================
// Blog Post Card Component
// =============================================================================

interface BlogPostCardProps {
	post: BlogPost;
	onEdit: (post: BlogPost) => void;
	onDelete: (post: BlogPost) => void;
	onPreview: (post: BlogPost) => void;
	onTogglePublish: (post: BlogPost) => void;
	isSelected: boolean;
	onSelect: (selected: boolean) => void;
	showActions?: boolean;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({
	post,
	onEdit,
	onDelete,
	onPreview,
	onTogglePublish,
	isSelected,
	onSelect,
	showActions = true,
}) => {
	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
		});
	};

	const stripHtml = (html: string) => {
		const tmp = document.createElement("div");
		tmp.innerHTML = html;
		return tmp.textContent || tmp.innerText || "";
	};

	return (
		<Card className="transition-all hover:shadow-md">
			<CardHeader className="pb-3">
				<div className="flex items-start justify-between">
					<div className="flex items-start space-x-3 flex-1">
						{showActions && (
							<Checkbox
								checked={isSelected}
								onCheckedChange={onSelect}
								className="mt-1"
							/>
						)}

						<div className="flex-1 min-w-0">
							<div className="flex items-center space-x-2 mb-2">
								<CardTitle className="text-lg line-clamp-2">
									{post.title}
								</CardTitle>
								<Badge
									variant={
										post.status === 'published' ? "default" : "secondary"
									}>
									{post.status === 'published' ? (
										<>
											<CheckCircle className="h-3 w-3 mr-1" />
											Published
										</>
									) : (
										<>
											<XCircle className="h-3 w-3 mr-1" />
											Draft
										</>
									)}
								</Badge>
							</div>

							<CardDescription className="line-clamp-2">
								{post.excerpt ||
									stripHtml(post.content).substring(0, 150) +
										"..."}
							</CardDescription>
						</div>
					</div>

					{showActions && (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									size="sm"
									className="h-8 w-8 p-0">
									<MoreVertical className="h-4 w-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuItem
									onClick={() => onPreview(post)}>
									<Eye className="h-4 w-4 mr-2" />
									Preview
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => onEdit(post)}>
									<Edit className="h-4 w-4 mr-2" />
									Edit
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() => onTogglePublish(post)}>
									{post.status === 'published' ? (
										<>
											<XCircle className="h-4 w-4 mr-2" />
											Unpublish
										</>
									) : (
										<>
											<CheckCircle className="h-4 w-4 mr-2" />
											Publish
										</>
									)}
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem
									onClick={() => onDelete(post)}
									className="text-red-600">
									<Trash2 className="h-4 w-4 mr-2" />
									Delete
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					)}
				</div>
			</CardHeader>

			<CardContent className="pt-0">
				{/* Featured Image */}
				{post.featured_image_url && (
					<div className="mb-4">
						<img
							src={post.featured_image_url}
							alt={post.title}
							className="w-full h-32 object-cover rounded-md"
							onError={(e) => {
								e.currentTarget.style.display = "none";
							}}
						/>
					</div>
				)}

				{/* Tags */}
				{post.tags && post.tags.length > 0 && (
					<div className="flex flex-wrap gap-1 mb-3">
						{post.tags.slice(0, 3).map((tag) => (
							<Badge
								key={tag}
								variant="outline"
								className="text-xs">
								{tag}
							</Badge>
						))}
						{post.tags.length > 3 && (
							<Badge
								variant="outline"
								className="text-xs">
								+{post.tags.length - 3} more
							</Badge>
						)}
					</div>
				)}

				{/* Metadata */}
				<div className="flex items-center justify-between text-sm text-muted-foreground">
					<div className="flex items-center space-x-4">
						<div className="flex items-center space-x-1">
							<Calendar className="h-3 w-3" />
							<span>{formatDate(post.created_at)}</span>
						</div>
						<div className="flex items-center space-x-1">
							<Clock className="h-3 w-3" />
							<span>{post.reading_time} min read</span>
						</div>
						{post.category && (
							<div className="flex items-center space-x-1">
								<div
									className="w-3 h-3 rounded-full"
									style={{
										backgroundColor:
											post.category.color || "#3B82F6",
									}}
								/>
								<span>{post.category.name}</span>
							</div>
						)}
					</div>

					<div className="flex items-center space-x-1">
						<Eye className="h-3 w-3" />
						<span>{post.view_count}</span>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

// =============================================================================
// Main Blog List Component
// =============================================================================

export const BlogList: React.FC<BlogListProps> = ({
	onCreatePost,
	onEditPost,
	onPreviewPost,
	showActions = true,
}) => {
	const [filters, setFilters] = useState<BlogPostFilters>({
		search: "",
		category: "all",
		published: "all",
		tags: [],
	});
	const [selectedPosts, setSelectedPosts] = useState<Set<string>>(new Set());
	const [deletingPost, setDeletingPost] = useState<BlogPost | null>(null);

	// React Query hooks
	const { data: posts = [], isLoading, error } = useBlogPosts();
	const { data: categories = [] } = useBlogCategories();
	const deletePostMutation = useDeleteBlogPost();
	const updatePostMutation = useUpdateBlogPost();

	// Filter posts based on current filters
	const filteredPosts = posts.filter((post) => {
		// Search filter
		if (filters.search) {
			const searchTerm = filters.search.toLowerCase();
			const matchesSearch =
				post.title.toLowerCase().includes(searchTerm) ||
				post.excerpt?.toLowerCase().includes(searchTerm) ||
				post.tags?.some((tag) => tag.toLowerCase().includes(searchTerm));

			if (!matchesSearch) return false;
		}

		// Category filter
		if (filters.category !== "all") {
			if (filters.category === "uncategorized") {
				if (post.category_id) return false;
			} else {
				if (post.category_id !== filters.category) return false;
			}
		}

		// Published status filter
		if (filters.published !== "all") {
			const isPublished = post.status === 'published';
			if (filters.published === "published" && !isPublished) return false;
			if (filters.published === "draft" && isPublished) return false;
		}

		return true;
	});

	// Handle post deletion
	const handleDeletePost = async () => {
		if (!deletingPost) return;

		try {
			await deletePostMutation.mutateAsync(deletingPost.id);
			toast.success("Blog post deleted successfully!");
			setDeletingPost(null);
			setSelectedPosts((prev) => {
				const newSet = new Set(prev);
				newSet.delete(deletingPost.id);
				return newSet;
			});
		} catch {
			toast.error("Failed to delete blog post");
		}
	};

	// Handle post publish toggle
	const handleTogglePublish = async (post: BlogPost) => {
		try {
			const newStatus = post.status === 'published' ? 'draft' : 'published';
			const updates: { status: 'draft' | 'published' | 'archived'; published_at?: string } = { 
				status: newStatus,
			};
			
			// Set published_at when publishing, clear when unpublishing
			if (newStatus === 'published') {
				updates.published_at = new Date().toISOString();
			} else {
				updates.published_at = undefined;
			}

			await updatePostMutation.mutateAsync({
				id: post.id,
				updates,
			});
			toast.success(
				`Post ${newStatus === 'published' ? "published" : "unpublished"} successfully!`,
			);
		} catch {
			toast.error("Failed to update post status");
		}
	};

	// Handle bulk operations
	const handleBulkPublish = async (publish: boolean) => {
		const selectedPostsArray = Array.from(selectedPosts);
		if (selectedPostsArray.length === 0) {
			toast.error("No posts selected");
			return;
		}

		try {
			await Promise.all(
				selectedPostsArray.map((postId) => {
					const updates: { status: 'draft' | 'published' | 'archived'; published_at?: string } = {
						status: publish ? 'published' : 'draft',
					};
					
					if (publish) {
						updates.published_at = new Date().toISOString();
					} else {
						updates.published_at = undefined;
					}

					return updatePostMutation.mutateAsync({
						id: postId,
						updates,
					});
				}),
			);
			toast.success(
				`${selectedPostsArray.length} posts ${publish ? "published" : "unpublished"} successfully!`,
			);
			setSelectedPosts(new Set());
		} catch {
			toast.error("Failed to update posts");
		}
	};

	// Handle bulk delete
	const handleBulkDelete = async () => {
		const selectedPostsArray = Array.from(selectedPosts);
		if (selectedPostsArray.length === 0) {
			toast.error("No posts selected");
			return;
		}

		try {
			await Promise.all(
				selectedPostsArray.map((postId) =>
					deletePostMutation.mutateAsync(postId),
				),
			);
			toast.success(
				`${selectedPostsArray.length} posts deleted successfully!`,
			);
			setSelectedPosts(new Set());
		} catch {
			toast.error("Failed to delete posts");
		}
	};

	// Handle select all
	const handleSelectAll = (checked: boolean) => {
		if (checked) {
			setSelectedPosts(new Set(filteredPosts.map((post) => post.id)));
		} else {
			setSelectedPosts(new Set());
		}
	};

	// Handle individual post selection
	const handlePostSelect = (postId: string, selected: boolean) => {
		setSelectedPosts((prev) => {
			const newSet = new Set(prev);
			if (selected) {
				newSet.add(postId);
			} else {
				newSet.delete(postId);
			}
			return newSet;
		});
	};

	// Loading state
	if (isLoading) {
		return (
			<div className="flex items-center justify-center py-12">
				<Loader2 className="h-8 w-8 animate-spin" />
				<span className="ml-2">Loading blog posts...</span>
			</div>
		);
	}

	// Error state
	if (error) {
		return (
			<div className="text-center py-12">
				<p className="text-red-600 mb-4">Failed to load blog posts</p>
				<Button onClick={() => window.location.reload()}>
					Try Again
				</Button>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
				<div>
					<h2 className="text-2xl font-bold">Blog Posts</h2>
					<p className="text-muted-foreground">
						Manage your blog posts and content
					</p>
				</div>

				{showActions && onCreatePost && (
					<Button onClick={onCreatePost}>
						<Plus className="h-4 w-4 mr-2" />
						New Post
					</Button>
				)}
			</div>

			{/* Filters */}
			<div className="flex flex-col sm:flex-row gap-4">
				{/* Search */}
				<div className="relative flex-1">
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
					<Input
						placeholder="Search posts..."
						value={filters.search}
						onChange={(e) =>
							setFilters((prev) => ({
								...prev,
								search: e.target.value,
							}))
						}
						className="pl-10"
					/>
				</div>

				{/* Category Filter */}
				<Select
					value={filters.category}
					onValueChange={(value) =>
						setFilters((prev) => ({ ...prev, category: value }))
					}>
					<SelectTrigger className="w-full sm:w-48">
						<SelectValue placeholder="All Categories" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Categories</SelectItem>
						<SelectItem value="uncategorized">
							Uncategorized
						</SelectItem>
						{categories.map((category: BlogCategory) => (
							<SelectItem
								key={category.id}
								value={category.id}>
								{category.name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				{/* Status Filter */}
				<Select
					value={filters.published}
					onValueChange={(value) =>
						setFilters((prev) => ({ ...prev, published: value }))
					}>
					<SelectTrigger className="w-full sm:w-32">
						<SelectValue placeholder="All Status" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Status</SelectItem>
						<SelectItem value="published">Published</SelectItem>
						<SelectItem value="draft">Draft</SelectItem>
					</SelectContent>
				</Select>
			</div>

			{/* Bulk Actions */}
			{showActions && selectedPosts.size > 0 && (
				<div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
					<div className="flex items-center space-x-4">
						<span className="text-sm font-medium">
							{selectedPosts.size} post
							{selectedPosts.size !== 1 ? "s" : ""} selected
						</span>
						<Button
							variant="outline"
							size="sm"
							onClick={() => handleBulkPublish(true)}>
							Publish
						</Button>
						<Button
							variant="outline"
							size="sm"
							onClick={() => handleBulkPublish(false)}>
							Unpublish
						</Button>
						<Button
							variant="outline"
							size="sm"
							onClick={handleBulkDelete}
							className="text-red-600 hover:text-red-700">
							Delete
						</Button>
					</div>
					<Button
						variant="ghost"
						size="sm"
						onClick={() => setSelectedPosts(new Set())}>
						Clear Selection
					</Button>
				</div>
			)}

			{/* Posts Grid */}
			{filteredPosts.length === 0 ? (
				<div className="text-center py-12">
					{filters.search ||
					filters.category !== "all" ||
					filters.published !== "all" ? (
						<div>
							<p className="text-muted-foreground mb-4">
								No posts found matching your filters
							</p>
							<Button
								variant="outline"
								onClick={() =>
									setFilters({
										search: "",
										category: "all",
										published: "all",
										tags: [],
									})
								}>
								Clear Filters
							</Button>
						</div>
					) : (
						<div>
							<FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
							<p className="text-muted-foreground mb-4">
								No blog posts created yet
							</p>
							{showActions && onCreatePost && (
								<Button onClick={onCreatePost}>
									<Plus className="h-4 w-4 mr-2" />
									Create Your First Post
								</Button>
							)}
						</div>
					)}
				</div>
			) : (
				<>
					{/* Select All Checkbox */}
					{showActions && (
						<div className="flex items-center space-x-2 pb-2">
							<Checkbox
								checked={
									selectedPosts.size === filteredPosts.length
								}
								onCheckedChange={handleSelectAll}
							/>
							<span className="text-sm text-muted-foreground">
								Select all ({filteredPosts.length} posts)
							</span>
						</div>
					)}

					{/* Posts Grid */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						{filteredPosts.map((post) => (
							<BlogPostCard
								key={post.id}
								post={post}
								onEdit={onEditPost || (() => {})}
								onDelete={setDeletingPost}
								onPreview={onPreviewPost || (() => {})}
								onTogglePublish={handleTogglePublish}
								isSelected={selectedPosts.has(post.id)}
								onSelect={(selected) =>
									handlePostSelect(post.id, selected)
								}
								showActions={showActions}
							/>
						))}
					</div>
				</>
			)}

			{/* Delete Confirmation Dialog */}
			<AlertDialog
				open={!!deletingPost}
				onOpenChange={() => setDeletingPost(null)}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Delete Blog Post</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to delete "
							{deletingPost?.title}"? This action cannot be
							undone.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleDeletePost}
							className="bg-red-600 hover:bg-red-700"
							disabled={deletePostMutation.isPending}>
							{deletePostMutation.isPending ? (
								<>
									<Loader2 className="h-4 w-4 mr-2 animate-spin" />
									Deleting...
								</>
							) : (
								"Delete Post"
							)}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
};

export default BlogList;
