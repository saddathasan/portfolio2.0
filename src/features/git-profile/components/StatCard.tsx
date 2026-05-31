import { Reveal } from "@/features/elegant/components/primitives/Reveal";

interface StatCardProps {
	title: string;
	value: number | string;
	delay?: number;
}

// Editorial figure: a big display number over a small muted label, hairline
// top rule. No card box, no icon — quiet and confident.
export function StatCard({ title, value, delay = 0 }: StatCardProps) {
	return (
		<Reveal delay={delay} className="border-t border-line pt-4">
			<div className="font-display text-[clamp(1.9rem,5vw,2.6rem)] font-medium leading-none tracking-[-0.02em] text-ink tabular-nums">
				{typeof value === "number" ? value.toLocaleString() : value}
			</div>
			<div className="mt-2 text-[0.72rem] uppercase tracking-[0.16em] text-ink-muted">
				{title}
			</div>
		</Reveal>
	);
}
