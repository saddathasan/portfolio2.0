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
	// Empty days get a faint tint so the grid is still legible; busier days glow.
	const opacity =
		count === 0 ? 0.06 : count < 3 ? 0.24 : count < 6 ? 0.45 : count < 10 ? 0.68 : 0.92;
	return { backgroundColor: `rgb(236 230 218 / ${opacity})` };
}

export function ContributionGrid({ calendar, delay = 0 }: ContributionGridProps) {
	// Show the full trailing-year window (ending today), like github.com.
	const recentWeeks = calendar.weeks;

	return (
		<Reveal delay={delay}>
			<div className="flex items-baseline justify-between gap-4">
				<h2 className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-ink-muted">
					Contribution activity
				</h2>
				{calendar.totalContributions != null ? (
					<span className="text-[0.82rem] tabular-nums text-ink-muted">
						{calendar.totalContributions.toLocaleString()} in the past year
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
