import { Reveal } from "@/features/elegant/components/primitives/Reveal";

interface LanguageBarProps {
	languages: { name: string; percentage: number; color: string }[];
	delay?: number;
}

// A single slim stacked bar (real GitHub language colors — meaningful data),
// with a quiet legend beneath. Chrome kept minimal.
export function LanguageBar({ languages, delay = 0 }: LanguageBarProps) {
	return (
		<Reveal delay={delay}>
			<h2 className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-ink-muted">
				Most used languages
			</h2>

			<div className="mt-5 flex h-2 w-full overflow-hidden rounded-full bg-paper-sunk">
				{languages.map((lang) => (
					<div
						key={lang.name}
						style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
						title={`${lang.name}: ${lang.percentage}%`}
					/>
				))}
			</div>

			<ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[0.9rem]">
				{languages.map((lang) => (
					<li key={lang.name} className="flex items-center gap-2">
						<span
							className="inline-block h-2 w-2 rounded-full"
							style={{ backgroundColor: lang.color }}
						/>
						<span className="text-ink-soft">{lang.name}</span>
						<span className="tabular-nums text-ink-muted">
							{lang.percentage}%
						</span>
					</li>
				))}
			</ul>
		</Reveal>
	);
}
