import { createFileRoute, notFound, useParams } from "@tanstack/react-router";
import { Article } from "@/features/blog/components/Article";
import { getBySlug } from "@/features/blog/lib";

export const Route = createFileRoute("/blog/$category/$slug")({
	component: ArticleRoute,
});

function ArticleRoute() {
	const { slug } = useParams({ from: "/blog/$category/$slug" });
	const post = getBySlug(slug);
	if (!post) throw notFound();
	return <Article post={post} />;
}
