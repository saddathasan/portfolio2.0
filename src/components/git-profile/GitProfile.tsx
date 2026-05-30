import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Flame, Code, Users, BookOpen } from "lucide-react";
import { fetchGitHubStats } from "@/lib/github";
import { StatCard } from "./StatCard";
import { LanguageBar } from "./LanguageBar";
import { ContributionGrid } from "./ContributionGrid";
import { RepoCard } from "./RepoCard";
import "./git-profile.css";

type GitHubStats = Awaited<ReturnType<typeof fetchGitHubStats>>;

// Module-level cache so navigating away and back doesn't refetch (replaces react-query).
let statsCache: GitHubStats | null = null;
let statsPromise: Promise<GitHubStats> | null = null;

export function GitProfile() {
  const [stats, setStats] = useState<GitHubStats | null>(statsCache);
  const [isLoading, setIsLoading] = useState(!statsCache);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    if (statsCache) return;
    let active = true;
    statsPromise = statsPromise ?? fetchGitHubStats();
    statsPromise
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
      <div className="git-profile-loading">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Github size={48} />
        </motion.div>
        <p>Loading GitHub stats...</p>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="git-profile-error">
        <Github size={48} />
        <p>Failed to load GitHub stats</p>
        <span className="error-hint">Please try again later</span>
      </div>
    );
  }

  return (
    <div className="git-profile">
      <motion.header
        className="git-profile-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Github size={40} className="github-icon" />
        <h1>Git Wrapped</h1>
        <p className="git-profile-subtitle">My Year in Code</p>
      </motion.header>

      <div className="stats-grid">
        <StatCard
          title="Total Contributions"
          value={stats.totalContributions}
          icon={<Code size={24} />}
          delay={0.1}
        />
        <StatCard
          title="Repositories"
          value={stats.totalRepositories}
          icon={<BookOpen size={24} />}
          delay={0.2}
        />
        <StatCard
          title="Followers"
          value={stats.followers}
          icon={<Users size={24} />}
          delay={0.3}
        />
        <StatCard
          title="Longest Streak"
          value={`${stats.longestStreak} days`}
          icon={<Flame size={24} />}
          delay={0.4}
        />
      </div>

      <LanguageBar languages={stats.topLanguages} delay={0.5} />

      <ContributionGrid calendar={stats.contributionCalendar} delay={0.6} />

      {stats.pinnedRepos.length > 0 && (
        <motion.section
          className="pinned-repos-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h2 className="section-title">Pinned Repositories</h2>
          <div className="repos-grid">
            {stats.pinnedRepos.map((repo, index) => (
              <RepoCard key={repo.name} repo={repo} delay={0.9 + index * 0.1} />
            ))}
          </div>
        </motion.section>
      )}
    </div>
  );
}
