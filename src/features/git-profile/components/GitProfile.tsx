import "@/features/elegant/elegant.css";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { fetchGitHubStats } from "@/features/git-profile/lib/github";
import { Reveal } from "@/features/elegant/components/primitives/Reveal";
import { StatCard } from "./StatCard";
import { LanguageBar } from "./LanguageBar";
import { ContributionGrid } from "./ContributionGrid";
import { RepoCard } from "./RepoCard";

type GitHubStats = Awaited<ReturnType<typeof fetchGitHubStats>>;

// Module-level cache so navigating away and back doesn't refetch.
let statsCache: GitHubStats | null = null;
let statsPromise: Promise<GitHubStats> | null = null;

// Slim top bar — wordmark + the two escape hatches (home / terminal).
function GitTopBar() {
	return (
		<div className="sticky top-0 z-20 border-b border-line bg-paper/95">
			<nav className="mx-auto flex max-w-[48rem] items-center justify-between px-6 py-3.5 text-[0.85rem]">
				<Link
					to="/home"
					className="font-display font-medium tracking-[-0.01em] text-ink"
				>
					Saddat Hasan
				</Link>
				<div className="flex items-center gap-x-5">
					<Link to="/home" className="gui-link text-ink-soft">
						← Home
					</Link>
					<Link to="/" className="gui-link text-ink-muted">
						terminal ↗
					</Link>
				</div>
			</nav>
		</div>
	);
}

function Shell({ children }: { children: React.ReactNode }) {
	return (
		<div className="gui-root gui-dark min-h-screen">
			<GitTopBar />
			<main
				id="main-content"
				tabIndex={-1}
				className="mx-auto max-w-[48rem] px-6 focus:outline-none"
			>
				{children}
			</main>
		</div>
	);
}

export function GitProfile() {
	const [stats, setStats] = useState<GitHubStats | null>(statsCache);
	const [isLoading, setIsLoading] = useState(!statsCache);
	const [error, setError] = useState<unknown>(null);

	useEffect(() => {
		if (statsCache) return;
		let active = true;
		const pending = statsPromise ?? (statsPromise = fetchGitHubStats());
		pending
			.then((data) => {
				statsCache = data;
				if (active) {
					setStats(data);
					setIsLoading(false);
				}
			})
			.catch((err) => {
				statsPromise = null;
				if (active) {
					setError(err);
					setIsLoading(false);
				}
			});
		return () => {
			active = false;
		};
	}, []);

	if (isLoading) {
		return (
			<Shell>
				<p className="pt-[18vh] text-[0.95rem] text-ink-muted">
					Loading GitHub activity<span className="animate-pulse">…</span>
				</p>
			</Shell>
		);
	}

	if (error || !stats) {
		return (
			<Shell>
				<div className="pt-[18vh]">
					<p className="text-ink">Couldn&apos;t load GitHub activity.</p>
					<p className="mt-2 text-[0.95rem] text-ink-muted">
						Please try again later, or visit{" "}
						<a
							href="https://github.com/saddathasan"
							target="_blank"
							rel="noreferrer"
							className="gui-link text-ink"
						>
							github.com/saddathasan
						</a>
						.
					</p>
				</div>
			</Shell>
		);
	}

	return (
		<Shell>
			{/* Header */}
			<header className="pt-[14vh] pb-16">
				<Reveal>
					<p className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-ink-muted">
						GitHub · public activity
					</p>
				</Reveal>
				<Reveal delay={0.08}>
					<h1 className="mt-5 font-display text-[clamp(2rem,6vw,3.25rem)] font-medium leading-[1.05] tracking-[-0.02em] text-ink">
						A year in code.
					</h1>
				</Reveal>
				<Reveal delay={0.16}>
					<p className="mt-5 max-w-[46ch] text-[1.02rem] leading-[1.7] text-ink-soft">
						A live snapshot of my <span className="text-ink">public</span> activity
						on GitHub — contributions, languages and projects. Day-to-day private
						&amp; client work isn&apos;t shown here.
					</p>
				</Reveal>
				<Reveal delay={0.24}>
					<a
						href="https://github.com/saddathasan"
						target="_blank"
						rel="noreferrer"
						className="gui-link mt-6 inline-block text-[0.92rem] text-ink"
					>
						Full profile ↗
					</a>
				</Reveal>
			</header>

			{/* Stats */}
			<section className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4">
				<StatCard title="Public contributions" value={stats.totalContributions} delay={0} />
				<StatCard title="Repositories" value={stats.totalRepositories} delay={0.05} />
				<StatCard title="Followers" value={stats.followers} delay={0.1} />
				<StatCard
					title="Longest streak"
					value={`${stats.longestStreak} days`}
					delay={0.15}
				/>
			</section>

			<div className="mt-16">
				<LanguageBar languages={stats.topLanguages} />
			</div>

			<div className="mt-16">
				<ContributionGrid calendar={stats.contributionCalendar} />
			</div>

			{stats.pinnedRepos.length > 0 && (
				<section className="mt-16">
					<Reveal>
						<h2 className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-ink-muted">
							Pinned repositories
						</h2>
					</Reveal>
					<div className="mt-5">
						{stats.pinnedRepos.map((repo) => (
							<RepoCard key={repo.name} repo={repo} />
						))}
					</div>
				</section>
			)}

			<footer className="mt-20 border-t border-line py-8 text-[0.8rem] text-ink-muted">
				Public stats, fetched live from the GitHub API. Private &amp; organization
				work isn&apos;t included.
			</footer>
		</Shell>
	);
}
