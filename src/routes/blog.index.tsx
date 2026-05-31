import { createFileRoute } from "@tanstack/react-router";
import { BlogList } from "@/features/blog/components/BlogList";

export const Route = createFileRoute("/blog/")({
	component: BlogList,
});
