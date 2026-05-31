import { Reveal } from "@/features/elegant/components/primitives/Reveal";

interface ContributionGridProps {
	calendar: {
		totalContributions?: number;
		weeks: {
			contributionDays: {
				contributionCount: number;
				date: string;
				color: string;
			}[];
		}[];
	};
	delay?: number;
}

// Warm-ink monochrome intensity scale (glows on the dark paper) — replaces the
// GitHub-green palette so the heatmap matches the design system. The ink token
// is warm off-white; increasing opacity = more contributions.
function levelStyle(count: number): React.CSSProperties {
	const opacity =
		count === 0 ? 0 : count < 3 ? 0.22 : count < 6 ? 0.42 : count < 10 ? 0.66 : 0.92;
	return {
		backgroundColor: count === 0 ? "var(--paper-sunk)" : `rgb(236 230 218 / ${opacity})`,
	};
}

export function ContributionGrid({ calendar, delay = 0 }: ContributionGridProps) {
	const recentWeeks = calendar.weeks.slice(-20);

	return (
		<Reveal delay={delay}>
			<div className="flex items-baseline justify-between gap-4">
				<h2 className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-ink-muted">
					Contribution activity
				</h2>
				{calendar.totalContributions != null ? (
					<span className="text-[0.82rem] tabular-nums text-ink-muted">
						{calendar.totalContributions.toLocaleString()} this year
					</span>
				) : null}
			</div>

			<div className="mt-5 flex gap-[3px] overflow-x-auto pb-1">
				{recentWeeks.map((week, weekIndex) => (
					<div key={weekIndex} className="flex flex-col gap-[3px]">
						{week.contributionDays.map((day) => (
							<div
								key={day.date}
								className="h-[11px] w-[11px] rounded-[2px]"
								style={levelStyle(day.contributionCount)}
								title={`${day.date}: ${day.contributionCount} contributions`}
							/>
						))}
					</div>
				))}
			</div>
		</Reveal>
	);
}
