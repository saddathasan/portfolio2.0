interface WorkRowProps {
	title: string;
	note: string;
	/** Optional impact metric, shown small + muted on the right. */
	meta?: string;
	href?: string;
}

// One project row: title (left) + terse note & optional metric (right). The
// whole row links out; an arrow reveals on hover. Hairline-separated, monochrome.
export function WorkRow({ title, note, meta, href }: WorkRowProps) {
	const external = href?.startsWith("http");
	return (
		<a
			href={href}
			target={external ? "_blank" : undefined}
			rel={external ? "noreferrer" : undefined}
			className="group grid grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-1 border-t border-line py-4 transition-colors hover:border-line-strong"
		>
			<span className="font-display text-[1.08rem] font-medium text-ink">
				{title}
				<span className="ml-2 inline-block translate-x-0 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100">
					↗
				</span>
			</span>
			<span className="row-start-2 text-[0.92rem] text-ink-soft md:row-start-1">
				{note}
			</span>
			{meta ? (
				<span className="col-start-2 row-start-1 text-right text-[0.82rem] tabular-nums text-ink-muted">
					{meta}
				</span>
			) : null}
		</a>
	);
}
