import { motion } from "framer-motion";
import { ExternalLink, Star, GitFork } from "lucide-react";

interface RepoCardProps {
  repo: {
    name: string;
    description: string | null;
    stars: number;
    forks: number;
    language: string | null;
    url: string;
  };
  delay?: number;
}

export function RepoCard({ repo, delay = 0 }: RepoCardProps) {
  return (
    <motion.a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="repo-card"
    >
      <div className="repo-header">
        <span className="repo-name">{repo.name}</span>
        <ExternalLink size={14} className="repo-link-icon" />
      </div>
      {repo.description && (
        <p className="repo-description">{repo.description}</p>
      )}
      <div className="repo-footer">
        {repo.language && (
          <span className="repo-language">{repo.language}</span>
        )}
        <div className="repo-stats">
          <span className="repo-stat">
            <Star size={14} /> {repo.stars}
          </span>
          <span className="repo-stat">
            <GitFork size={14} /> {repo.forks}
          </span>
        </div>
      </div>
    </motion.a>
  );
}
