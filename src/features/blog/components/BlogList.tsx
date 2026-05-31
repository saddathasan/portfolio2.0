import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "@/features/elegant/components/primitives/Reveal";
import { allTags, posts } from "../lib";
import { BlogShell } from "./BlogShell";
import { PostRow } from "./PostRow";

// The writing index: a quiet header, an optional tag filter, then posts
// grouped by category. Tag filtering is client-only (default = all), so the
// prerendered HTML carries the full list — crawlable, then refined in place.
export function BlogList() {
	const tags = allTags();
	const [activeTag, setActiveTag] = useState<string | null>(null);

	const visible = activeTag
		? posts.filter((p) => p.frontmatter.tags.includes(activeTag))
		: posts;

	// Group the visible posts by category, preserving newest-first within each.
	const groups = [...new Set(visible.map((p) => p.frontmatter.category))]
		.sort()
		.map((category) => ({
			category,
			items: visible.filter((p) => p.frontmatter.category === category),
		}));

	return (
		<BlogShell>
			<header className="pt-[14vh] pb-12">
				<Reveal>
					<p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-ink-muted">
						Writing
					</p>
				</Reveal>
				<Reveal delay={0.08}>
					<h1 className="mt-5 font-display text-[clamp(2rem,6vw,3.25rem)] font-medium leading-[1.05] tracking-[-0.02em] text-ink">
						Notes from the seam between
						<br />
						app code and the platform.
					</h1>
				</Reveal>
				<Reveal delay={0.16}>
					<p className="mt-5 max-w-[46ch] text-[1.02rem] leading-[1.7] text-ink-soft">
						Short, specific posts on React architecture, CI/CD, and the
						occasional infrastructure post-mortem.
					</p>
				</Reveal>
			</header>

			{tags.length > 0 && (
				<div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-line py-3 text-[0.85rem]">
					<button
						type="button"
						onClick={() => setActiveTag(null)}
						className="gui-link"
						data-active={activeTag === null}
						style={{ color: activeTag === null ? "var(--ink)" : "var(--ink-muted)" }}
					>
						All
					</button>
					{tags.map((tag) => (
						<button
							key={tag}
							type="button"
							onClick={() => setActiveTag(tag)}
							className="gui-link"
							style={{ color: activeTag === tag ? "var(--ink)" : "var(--ink-muted)" }}
						>
							{tag}
						</button>
					))}
				</div>
			)}

			{visible.length === 0 ? (
				<p className="py-16 text-[1.02rem] text-ink-soft">
					Nothing tagged{" "}
					<span className="text-ink">{activeTag}</span> yet — try{" "}
					<button
						type="button"
						onClick={() => setActiveTag(null)}
						className="gui-link text-ink"
					>
						all posts
					</button>
					.
				</p>
			) : (
				<div className="pb-20">
					{groups.map(({ category, items }) => (
						<section key={category} className="mt-12">
							<Link
								to="/blog/$category"
								params={{ category }}
								className="gui-link text-[0.72rem] font-medium uppercase tracking-[0.18em] text-ink-muted"
							>
								{category}
							</Link>
							<div className="mt-3">
								{items.map((post) => (
									<PostRow key={post.slug} post={post} />
								))}
							</div>
						</section>
					))}
				</div>
			)}
		</BlogShell>
	);
}
