import { Link } from "@tanstack/react-router";
import { Reveal } from "@/features/elegant/components/primitives/Reveal";
import { byCategory } from "../lib";
import { BlogShell } from "./BlogShell";
import { PostRow } from "./PostRow";

// A single category landing — its posts, newest first.
export function CategoryView({ category }: { category: string }) {
	const items = byCategory(category);

	return (
		<BlogShell>
			<header className="pt-[14vh] pb-10">
				<Reveal>
					<Link
						to="/blog"
						className="gui-link text-[0.72rem] font-medium uppercase tracking-[0.18em] text-ink-muted"
					>
						← All writing
					</Link>
				</Reveal>
				<Reveal delay={0.08}>
					<h1 className="mt-5 font-display text-[clamp(2rem,6vw,3rem)] font-medium leading-[1.05] tracking-[-0.02em] text-ink">
						{category}
					</h1>
				</Reveal>
				<Reveal delay={0.16}>
					<p className="mt-4 text-[0.95rem] text-ink-muted">
						{items.length} {items.length === 1 ? "post" : "posts"}
					</p>
				</Reveal>
			</header>

			{items.length === 0 ? (
				<p className="py-16 text-[1.02rem] text-ink-soft">
					No posts in this category yet.{" "}
					<Link to="/blog" className="gui-link text-ink">
						Browse all writing
					</Link>
					.
				</p>
			) : (
				<div className="pb-20">
					{items.map((post) => (
						<PostRow key={post.slug} post={post} />
					))}
				</div>
			)}
		</BlogShell>
	);
}
