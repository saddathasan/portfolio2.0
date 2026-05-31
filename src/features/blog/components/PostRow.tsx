import { Link } from "@tanstack/react-router";
import type { Post } from "../lib";
import { formatDate } from "../lib/format";

// One post in a list: title + date·read meta, terse description. Whole row
// links to the article; an arrow wipes in on hover. Hairline-separated.
export function PostRow({ post }: { post: Post }) {
	const { frontmatter: fm } = post;
	return (
		<Link
			to="/blog/$category/$slug"
			params={{ category: fm.category, slug: post.slug }}
			className="group block border-t border-line py-5 transition-colors hover:border-line-strong"
		>
			<div className="flex items-baseline justify-between gap-4">
				<h3 className="font-display text-[1.12rem] font-medium text-ink">
					{fm.title}
					<span className="ml-2 inline-block opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100">
						↗
					</span>
				</h3>
				<span className="shrink-0 text-[0.8rem] tabular-nums text-ink-muted">
					{formatDate(fm.publishedAt)}
				</span>
			</div>
			<p className="mt-1.5 max-w-[52ch] text-[0.95rem] leading-[1.6] text-ink-soft">
				{fm.description}
			</p>
			<p className="mt-2 text-[0.78rem] uppercase tracking-[0.12em] text-ink-muted">
				{fm.category} · {post.readingMinutes} min read
			</p>
		</Link>
	);
}
