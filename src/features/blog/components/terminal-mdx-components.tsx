import type { ComponentProps, ReactNode } from "react";

/* ───────────────────────────────────────────────────────────────────────────
   MDX → terminal output.

   The SAME compiled MDX body the GUI article renders, handed a different
   component map: monospace, near-monochrome (brightness for hierarchy, not
   colour), dashed box-drawing rules — the authentic `cat a-file` feel that
   matches OutputDisplay. Fenced code keeps its build-time Shiki token colours
   (they read fine on the terminal's dark surface); we only frame the block.
   ─────────────────────────────────────────────────────────────────────────── */

// Weighted headings via brightness + a leading markdown-ish marker, so the
// structure stays legible as plain monospace text.
function Heading({
	marker,
	className,
	children,
}: {
	marker: string;
	className: string;
	children: ReactNode;
}) {
	return (
		<div className={`mt-5 first:mt-0 ${className}`}>
			<span className="select-none text-gray-600">{marker} </span>
			{children}
		</div>
	);
}

export const terminalMdxComponents = {
	h1: ({ children }: ComponentProps<"h1">) => (
		<Heading marker="#" className="text-[1.05rem] font-bold text-gray-100">
			{children}
		</Heading>
	),
	h2: ({ children }: ComponentProps<"h2">) => (
		<Heading marker="##" className="text-gray-100">
			{children}
		</Heading>
	),
	h3: ({ children }: ComponentProps<"h3">) => (
		<Heading marker="###" className="text-gray-200">
			{children}
		</Heading>
	),
	h4: ({ children }: ComponentProps<"h4">) => (
		<Heading marker="####" className="text-gray-300">
			{children}
		</Heading>
	),
	p: (p: ComponentProps<"p">) => (
		<p {...p} className="mt-3 leading-relaxed text-gray-300" />
	),
	a: (p: ComponentProps<"a">) => {
		const external = typeof p.href === "string" && p.href.startsWith("http");
		return (
			<a
				{...p}
				target={external ? "_blank" : undefined}
				rel={external ? "noreferrer" : undefined}
				className="text-gray-200 underline decoration-gray-700 underline-offset-2 transition-colors hover:text-gray-100 hover:decoration-gray-400 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
			/>
		);
	},
	ul: (p: ComponentProps<"ul">) => (
		<ul {...p} className="mt-3 space-y-1 text-gray-300" />
	),
	ol: (p: ComponentProps<"ol">) => (
		<ol {...p} className="mt-3 list-inside list-decimal space-y-1 text-gray-300 marker:text-gray-600" />
	),
	li: ({ children, ...p }: ComponentProps<"li">) => (
		<li {...p} className="flex gap-2">
			<span aria-hidden className="select-none text-gray-600">
				·
			</span>
			<span>{children}</span>
		</li>
	),
	blockquote: (p: ComponentProps<"blockquote">) => (
		<blockquote
			{...p}
			className="mt-3 border-l border-dashed border-gray-700 pl-3 italic text-gray-400"
		/>
	),
	hr: () => (
		<div
			aria-hidden
			className="my-5 select-none overflow-hidden whitespace-nowrap text-gray-700"
		>
			────────────────────────────────────────────────────────────────────
		</div>
	),
	strong: (p: ComponentProps<"strong">) => (
		<strong {...p} className="font-bold text-gray-100" />
	),
	em: (p: ComponentProps<"em">) => <em {...p} className="italic text-gray-200" />,
	// rehype-pretty-code emits styled <pre><code>; keep token colours, frame it.
	pre: (p: ComponentProps<"pre">) => (
		<pre
			{...p}
			className="mt-3 overflow-x-auto border border-dashed border-gray-700 p-3 text-[0.85rem] leading-relaxed [&>code]:bg-transparent [&>code]:p-0"
		/>
	),
	code: (p: ComponentProps<"code">) => (
		<code {...p} className="text-gray-200" />
	),
	table: (p: ComponentProps<"table">) => (
		<div className="mt-3 overflow-x-auto">
			<table {...p} className="w-full border-collapse text-left" />
		</div>
	),
	thead: (p: ComponentProps<"thead">) => (
		<thead {...p} className="border-b border-dashed border-gray-700 text-gray-200" />
	),
	th: (p: ComponentProps<"th">) => <th {...p} className="px-3 py-1 font-bold" />,
	td: (p: ComponentProps<"td">) => (
		<td {...p} className="border-b border-dashed border-gray-800 px-3 py-1 text-gray-300" />
	),
	img: (p: ComponentProps<"img">) => (
		// Images don't render in a terminal — show a dim placeholder line instead.
		<div className="mt-3 text-gray-500">[image: {p.alt || p.src}]</div>
	),
	// React component embeds degrade to a hint (the GUI has the live version).
	Callout: ({ children }: { children: ReactNode }) => (
		<div className="mt-3 border-l border-dashed border-gray-700 pl-3 text-gray-400">
			{children}
		</div>
	),
};
