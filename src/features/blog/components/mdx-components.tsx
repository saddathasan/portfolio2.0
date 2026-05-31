import type { ComponentProps, ReactNode } from "react";

/* ───────────────────────────────────────────────────────────────────────────
   MDX → elegant prose.

   A component map handed to the compiled MDX body. Each element is plain
   Tailwind over the GUI tokens (ink / paper / line) — quiet, editorial, no
   prose-plugin. Fenced code is already highlighted by rehype-pretty-code
   (Shiki, github-dark-dimmed) at build time; we only style the <pre> frame and
   inline <code>. Headings get hover-revealed anchor links.
   ─────────────────────────────────────────────────────────────────────────── */

// "Some Heading!" → "some-heading" (used for #anchors). Mirror of how the
// terminal will reference sections; kept simple + deterministic.
const slugify = (children: ReactNode): string =>
	String(children)
		.toLowerCase()
		.replace(/[^\w\s-]/g, "")
		.trim()
		.replace(/\s+/g, "-");

function AnchoredHeading({
	as: Tag,
	className,
	children,
}: {
	as: "h2" | "h3" | "h4";
	className: string;
	children: ReactNode;
}) {
	const id = slugify(children);
	return (
		<Tag id={id} className={`group scroll-mt-24 ${className}`}>
			<a href={`#${id}`} className="no-underline">
				{children}
				<span className="ml-2 select-none text-ink-muted opacity-0 transition-opacity group-hover:opacity-100">
					#
				</span>
			</a>
		</Tag>
	);
}

export function Callout({
	type = "note",
	children,
}: {
	type?: "note" | "tip" | "warning";
	children: ReactNode;
}) {
	const label = { note: "Note", tip: "Tip", warning: "Heads up" }[type];
	return (
		<aside className="my-7 border-l-2 border-line-strong bg-paper-raised/40 px-5 py-4">
			<p className="mb-1 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-ink-muted">
				{label}
			</p>
			<div className="text-[0.98rem] leading-[1.7] text-ink-soft [&>p]:m-0">
				{children}
			</div>
		</aside>
	);
}

export const mdxComponents = {
	h1: (p: ComponentProps<"h1">) => (
		<h1
			{...p}
			className="mt-12 font-display text-[clamp(1.7rem,4vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.02em] text-ink"
		/>
	),
	h2: ({ children }: ComponentProps<"h2">) => (
		<AnchoredHeading
			as="h2"
			className="mt-12 font-display text-[1.5rem] font-medium leading-tight tracking-[-0.01em] text-ink"
		>
			{children}
		</AnchoredHeading>
	),
	h3: ({ children }: ComponentProps<"h3">) => (
		<AnchoredHeading
			as="h3"
			className="mt-9 font-display text-[1.2rem] font-medium text-ink"
		>
			{children}
		</AnchoredHeading>
	),
	h4: ({ children }: ComponentProps<"h4">) => (
		<AnchoredHeading
			as="h4"
			className="mt-7 text-[1.02rem] font-semibold text-ink"
		>
			{children}
		</AnchoredHeading>
	),
	p: (p: ComponentProps<"p">) => (
		<p {...p} className="mt-5 text-[1.05rem] leading-[1.75] text-ink-soft" />
	),
	a: (p: ComponentProps<"a">) => {
		const external = typeof p.href === "string" && p.href.startsWith("http");
		return (
			<a
				{...p}
				target={external ? "_blank" : undefined}
				rel={external ? "noreferrer" : undefined}
				className="gui-link text-ink"
			/>
		);
	},
	ul: (p: ComponentProps<"ul">) => (
		<ul {...p} className="mt-5 space-y-2 pl-5 text-[1.05rem] leading-[1.7] text-ink-soft marker:text-ink-muted [list-style:disc]" />
	),
	ol: (p: ComponentProps<"ol">) => (
		<ol {...p} className="mt-5 space-y-2 pl-5 text-[1.05rem] leading-[1.7] text-ink-soft marker:text-ink-muted [list-style:decimal]" />
	),
	li: (p: ComponentProps<"li">) => <li {...p} className="pl-1" />,
	blockquote: (p: ComponentProps<"blockquote">) => (
		<blockquote
			{...p}
			className="my-7 border-l-2 border-line-strong pl-5 font-serif text-[1.15rem] italic leading-[1.6] text-ink"
		/>
	),
	hr: () => <hr className="my-12 border-0 border-t border-line" />,
	// rehype-pretty-code emits a styled <pre><code> (Shiki tokens are inline).
	// We frame it: sunk surface, padding, horizontal scroll, hairline.
	pre: (p: ComponentProps<"pre">) => (
		<pre
			{...p}
			className="my-7 overflow-x-auto border border-line bg-paper-sunk p-4 text-[0.86rem] leading-[1.6] [&>code]:bg-transparent [&>code]:p-0"
		/>
	),
	code: (p: ComponentProps<"code">) => (
		// Inline code only — block code is wrapped by <pre> above (handled there).
		<code
			{...p}
			className="rounded-[2px] bg-paper-sunk px-1.5 py-0.5 font-mono text-[0.86em] text-ink"
		/>
	),
	img: (p: ComponentProps<"img">) => (
		// alt="" is a literal fallback for the linter; a real alt from the MDX
		// spread (`{...p}`) overrides it since it comes later.
		<img alt="" {...p} loading="lazy" className="my-8 w-full border border-line" />
	),
	table: (p: ComponentProps<"table">) => (
		<div className="my-7 overflow-x-auto">
			<table {...p} className="w-full border-collapse text-[0.95rem]" />
		</div>
	),
	thead: (p: ComponentProps<"thead">) => (
		<thead {...p} className="border-b border-line-strong text-left" />
	),
	th: (p: ComponentProps<"th">) => (
		<th {...p} className="px-3 py-2 font-medium text-ink" />
	),
	td: (p: ComponentProps<"td">) => (
		<td {...p} className="border-b border-line px-3 py-2 text-ink-soft" />
	),
	Callout,
};
