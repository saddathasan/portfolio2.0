import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Github, Flame, Code, Users, BookOpen } from "lucide-react";
import { fetchGitHubStats } from "@/lib/github";
import { StatCard } from "./StatCard";
import { LanguageBar } from "./LanguageBar";
import { ContributionGrid } from "./ContributionGrid";
import { RepoCard } from "./RepoCard";
import "./git-profile.css";

export function GitProfile() {
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ["github-stats"],
    queryFn: fetchGitHubStats,
    staleTime: 1000 * 60 * 30, // 30 minutes - data doesn't change often
    gcTime: 1000 * 60 * 60, // 1 hour cache
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
    refetchOnMount: false, // Don't refetch when component remounts
    refetchOnReconnect: false, // Don't refetch on reconnect
    retry: 1, // Only retry once on failure
  });

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
