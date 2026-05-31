import { Link } from "@tanstack/react-router";
import { Reveal } from "@/features/elegant/components/primitives/Reveal";
import { posts, type Post } from "../lib";
import { formatDate } from "../lib/format";
import { BlogShell } from "./BlogShell";
import { mdxComponents } from "./mdx-components";

// Prev/next within the global newest-first order (chronological neighbours).
function neighbours(slug: string): { prev?: Post; next?: Post } {
	const i = posts.findIndex((p) => p.slug === slug);
	if (i === -1) return {};
	return { next: posts[i - 1], prev: posts[i + 1] }; // next = newer, prev = older
}

export function Article({ post }: { post: Post }) {
	const { frontmatter: fm, Body } = post;
	const { prev, next } = neighbours(post.slug);

	return (
		<BlogShell>
			<article className="pt-[12vh] pb-10">
				<header className="border-b border-line pb-9">
					<Reveal>
						<Link
							to="/blog/$category"
							params={{ category: fm.category }}
							className="gui-link text-[0.72rem] font-medium uppercase tracking-[0.18em] text-ink-muted"
						>
							{fm.category}
						</Link>
					</Reveal>
					<Reveal delay={0.06}>
						<h1 className="mt-4 font-display text-[clamp(2rem,5.5vw,3rem)] font-medium leading-[1.07] tracking-[-0.02em] text-ink">
							{fm.title}
						</h1>
					</Reveal>
					<Reveal delay={0.12}>
						<p className="mt-4 flex flex-wrap items-center gap-x-2 text-[0.85rem] text-ink-muted">
							<time dateTime={fm.publishedAt}>{formatDate(fm.publishedAt)}</time>
							<span aria-hidden>·</span>
							<span>{post.readingMinutes} min read</span>
							{fm.updatedAt ? (
								<>
									<span aria-hidden>·</span>
									<span>updated {formatDate(fm.updatedAt)}</span>
								</>
							) : null}
						</p>
					</Reveal>
				</header>

				{fm.cover ? (
					<img
						src={fm.cover}
						alt={fm.coverAlt ?? ""}
						className="mt-9 w-full border border-line"
						loading="lazy"
					/>
				) : null}

				{/* The compiled MDX body, styled via the component map. */}
				<div className="mt-2">
					<Body components={mdxComponents} />
				</div>

				{fm.tags.length > 0 ? (
					<div className="mt-12 flex flex-wrap gap-x-4 gap-y-2 border-t border-line pt-6 text-[0.85rem] text-ink-muted">
						{fm.tags.map((tag) => (
							<span key={tag}>#{tag}</span>
						))}
					</div>
				) : null}

				{/* The authentic touch: read the very same file in the terminal. */}
				<p className="mt-6 text-[0.85rem] text-ink-muted">
					Prefer the terminal? Run{" "}
					<code className="rounded-[2px] bg-paper-sunk px-1.5 py-0.5 font-mono text-ink">
						cat {post.slug}
					</code>{" "}
					inside{" "}
					<Link to="/" className="gui-link text-ink-soft">
						the shell
					</Link>
					.
				</p>
			</article>

			{/* Prev / next */}
			{(prev || next) && (
				<nav className="grid grid-cols-2 gap-4 border-t border-line py-10">
					<div>
						{prev ? (
							<Link
								to="/blog/$category/$slug"
								params={{ category: prev.frontmatter.category, slug: prev.slug }}
								className="group block"
							>
								<span className="text-[0.72rem] uppercase tracking-[0.18em] text-ink-muted">
									← Older
								</span>
								<span className="mt-1 block font-display text-[1rem] text-ink-soft transition-colors group-hover:text-ink">
									{prev.frontmatter.title}
								</span>
							</Link>
						) : null}
					</div>
					<div className="text-right">
						{next ? (
							<Link
								to="/blog/$category/$slug"
								params={{ category: next.frontmatter.category, slug: next.slug }}
								className="group block"
							>
								<span className="text-[0.72rem] uppercase tracking-[0.18em] text-ink-muted">
									Newer →
								</span>
								<span className="mt-1 block font-display text-[1rem] text-ink-soft transition-colors group-hover:text-ink">
									{next.frontmatter.title}
								</span>
							</Link>
						) : null}
					</div>
				</nav>
			)}
		</BlogShell>
	);
}
