import { createLazyFileRoute } from "@tanstack/react-router";
import { BlogList } from "@/features/blog/components/BlogList";

export const Route = createLazyFileRoute("/blog/")({
	component: BlogList,
});
