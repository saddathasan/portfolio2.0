import { Star, GitFork } from "lucide-react";

interface RepoCardProps {
	repo: {
		name: string;
		description: string | null;
		stars: number;
		forks: number;
		language: string | null;
		url: string;
	};
}

// Hairline row (matches the home's work list): name + description on the left,
// language + stars/forks on the right, arrow on hover. Monochrome.
export function RepoCard({ repo }: RepoCardProps) {
	return (
		<a
			href={repo.url}
			target="_blank"
			rel="noopener noreferrer"
			className="group block border-t border-line py-4 transition-colors hover:border-line-strong"
		>
			<div className="flex items-baseline justify-between gap-4">
				<span className="font-display text-[1.05rem] font-medium text-ink">
					{repo.name}
					<span className="ml-2 inline-block translate-x-0 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100">
						↗
					</span>
				</span>
				<div className="flex shrink-0 items-center gap-4 text-[0.82rem] tabular-nums text-ink-muted">
					{repo.language ? (
						<span className="text-ink-soft">{repo.language}</span>
					) : null}
					<span className="flex items-center gap-1">
						<Star size={12} /> {repo.stars}
					</span>
					<span className="flex items-center gap-1">
						<GitFork size={12} /> {repo.forks}
					</span>
				</div>
			</div>
			{repo.description ? (
				<p className="mt-1 max-w-[52ch] text-[0.92rem] leading-[1.6] text-ink-soft">
					{repo.description}
				</p>
			) : null}
		</a>
	);
}
