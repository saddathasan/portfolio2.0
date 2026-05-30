import { Octokit } from "octokit";

// GitHub username for the portfolio
const GITHUB_USERNAME = "saddathasan";

// GitHub token from environment variable (required for GraphQL API)
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

// Create Octokit instance with authentication
const octokit = new Octokit({
  auth: GITHUB_TOKEN,
});

export interface GitHubStats {
  totalContributions: number;
  totalRepositories: number;
  followers: number;
  following: number;
  topLanguages: { name: string; percentage: number; color: string }[];
  pinnedRepos: {
    name: string;
    description: string | null;
    stars: number;
    forks: number;
    language: string | null;
    url: string;
  }[];
  contributionCalendar: {
    totalContributions: number;
    weeks: {
      contributionDays: {
        contributionCount: number;
        date: string;
        color: string;
      }[];
    }[];
  };
  longestStreak: number;
  currentStreak: number;
}

// Get current year date range for contributions
function getYearDateRange() {
  const now = new Date();
  const year = now.getFullYear();
  return {
    from: `${year}-01-01T00:00:00Z`,
    to: `${year}-12-31T23:59:59Z`,
  };
}

// GraphQL query for user stats
const USER_STATS_QUERY = `
query($username: String!, $from: DateTime!, $to: DateTime!) {
  user(login: $username) {
    followers {
      totalCount
    }
    following {
      totalCount
    }
    repositories(first: 100, ownerAffiliations: OWNER, orderBy: {field: STARGAZERS, direction: DESC}) {
      totalCount
      nodes {
        name
        stargazerCount
        forkCount
        primaryLanguage {
          name
          color
        }
      }
    }
    pinnedItems(first: 6, types: REPOSITORY) {
      nodes {
        ... on Repository {
          name
          description
          stargazerCount
          forkCount
          primaryLanguage {
            name
          }
          url
        }
      }
    }
    contributionsCollection(from: $from, to: $to) {
      totalCommitContributions
      totalPullRequestContributions
      totalIssueContributions
      totalRepositoryContributions
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            contributionCount
            date
            color
          }
        }
      }
    }
  }
}
`;

// Calculate language percentages from repositories
function calculateLanguages(
  repos: { primaryLanguage: { name: string; color: string } | null }[]
): { name: string; percentage: number; color: string }[] {
  const langCount: Record<string, { count: number; color: string }> = {};

  for (const repo of repos) {
    if (repo.primaryLanguage) {
      const lang = repo.primaryLanguage.name;
      if (!langCount[lang]) {
        langCount[lang] = { count: 0, color: repo.primaryLanguage.color };
      }
      langCount[lang].count++;
    }
  }

  const total = Object.values(langCount).reduce((sum, l) => sum + l.count, 0);

  return Object.entries(langCount)
    .map(([name, { count, color }]) => ({
      name,
      percentage: Math.round((count / total) * 100),
      color: color || "#ccc",
    }))
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 6);
}

// Calculate contribution streaks
function calculateStreaks(
  weeks: { contributionDays: { contributionCount: number; date: string }[] }[]
): { longest: number; current: number } {
  const allDays = weeks.flatMap((w) => w.contributionDays);
  let longest = 0;
  let current = 0;
  let streak = 0;

  for (const day of allDays) {
    if (day.contributionCount > 0) {
      streak++;
      longest = Math.max(longest, streak);
    } else {
      streak = 0;
    }
  }

  // Current streak (from most recent day backwards)
  for (let i = allDays.length - 1; i >= 0; i--) {
    if (allDays[i].contributionCount > 0) {
      current++;
    } else {
      break;
    }
  }

  return { longest, current };
}

export async function fetchGitHubStats(): Promise<GitHubStats> {
  const dateRange = getYearDateRange();
  
  try {
    const response = await octokit.graphql<{
      user: {
        followers: { totalCount: number };
        following: { totalCount: number };
        repositories: {
          totalCount: number;
          nodes: {
            name: string;
            stargazerCount: number;
            forkCount: number;
            primaryLanguage: { name: string; color: string } | null;
          }[];
        };
        pinnedItems: {
          nodes: {
            name: string;
            description: string | null;
            stargazerCount: number;
            forkCount: number;
            primaryLanguage: { name: string } | null;
            url: string;
          }[];
        };
        contributionsCollection: {
          totalCommitContributions: number;
          contributionCalendar: {
            totalContributions: number;
            weeks: {
              contributionDays: {
                contributionCount: number;
                date: string;
                color: string;
              }[];
            }[];
          };
        };
      };
    }>(USER_STATS_QUERY, { 
      username: GITHUB_USERNAME,
      from: dateRange.from,
      to: dateRange.to,
    });

    const user = response.user;
    const calendar = user.contributionsCollection.contributionCalendar;
    const streaks = calculateStreaks(calendar.weeks);

    return {
      totalContributions: calendar.totalContributions,
      totalRepositories: user.repositories.totalCount,
      followers: user.followers.totalCount,
      following: user.following.totalCount,
      topLanguages: calculateLanguages(user.repositories.nodes),
      pinnedRepos: user.pinnedItems.nodes.map((repo) => ({
        name: repo.name,
        description: repo.description,
        stars: repo.stargazerCount,
        forks: repo.forkCount,
        language: repo.primaryLanguage?.name || null,
        url: repo.url,
      })),
      contributionCalendar: calendar,
      longestStreak: streaks.longest,
      currentStreak: streaks.current,
    };
  } catch (error) {
    console.error("Failed to fetch GitHub stats:", error);
    throw error;
  }
}
