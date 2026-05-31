import { createLazyFileRoute, useParams } from "@tanstack/react-router";
import { CategoryView } from "@/features/blog/components/CategoryView";

export const Route = createLazyFileRoute("/blog/$category/")({
	component: CategoryRoute,
});

function CategoryRoute() {
	const { category } = useParams({ from: "/blog/$category/" });
	return <CategoryView category={category} />;
}
