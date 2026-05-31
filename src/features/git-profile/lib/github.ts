import { Octokit } from "octokit";

// GitHub username for the portfolio
const GITHUB_USERNAME = "saddathasan";

// GitHub token from environment variable (required for GraphQL API).
// NOTE(phase-3): move this behind a Cloudflare Pages Function — never ship a
// real token to the client bundle.
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const octokit = new Octokit({ auth: GITHUB_TOKEN });

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

// Trailing 12 months ending today — GitHub's contributionsCollection allows a
// max 1-year window, and this matches what github.com/<user> shows. (The old
// "calendar year" range made the recent-weeks slice land on future, empty
// weeks, so the heatmap rendered blank.)
function getContributionRange() {
  const to = new Date();
  const from = new Date(to);
  from.setFullYear(to.getFullYear() - 1);
  from.setDate(from.getDate() + 1);
  return { from: from.toISOString(), to: to.toISOString() };
}

const USER_STATS_QUERY = `
query($username: String!, $from: DateTime!, $to: DateTime!) {
  user(login: $username) {
    followers { totalCount }
    following { totalCount }
    repositories(first: 100, ownerAffiliations: OWNER, isFork: false, orderBy: {field: STARGAZERS, direction: DESC}) {
      totalCount
      nodes {
        name
        stargazerCount
        forkCount
        languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
          edges {
            size
            node { name color }
          }
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
          primaryLanguage { name }
          url
        }
      }
    }
    contributionsCollection(from: $from, to: $to) {
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

interface LanguageEdge {
  size: number;
  node: { name: string; color: string | null };
}

// A single language exceeding this in ONE repo is almost certainly committed
// dependencies / generated code (e.g. a 13 MB Python venv), not hand-written
// source — GitHub's raw byte counts include those, which wildly skews the mix.
const VENDORED_BLOB_BYTES = 2_000_000;

// Language composition by BYTES of code across non-fork repos (GitHub's method),
// but skipping vendored/generated blobs so one committed venv can't dominate.
function calculateLanguages(
  repos: { languages: { edges: LanguageEdge[] } }[]
): { name: string; percentage: number; color: string }[] {
  const bytes: Record<string, { size: number; color: string }> = {};

  for (const repo of repos) {
    for (const { size, node } of repo.languages?.edges ?? []) {
      if (size > VENDORED_BLOB_BYTES) continue;
      if (!bytes[node.name]) {
        bytes[node.name] = { size: 0, color: node.color || "#8b8b8b" };
      }
      bytes[node.name].size += size;
    }
  }

  const total = Object.values(bytes).reduce((sum, l) => sum + l.size, 0) || 1;

  return Object.entries(bytes)
    .map(([name, { size, color }]) => ({
      name,
      percentage: Math.round((size / total) * 100),
      color,
    }))
    .filter((l) => l.percentage > 0)
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 6);
}

// Streaks across all days in the window.
function calculateStreaks(
  weeks: { contributionDays: { contributionCount: number; date: string }[] }[]
): { longest: number; current: number } {
  const allDays = weeks.flatMap((w) => w.contributionDays);
  let longest = 0;
  let streak = 0;

  for (const day of allDays) {
    if (day.contributionCount > 0) {
      streak++;
      longest = Math.max(longest, streak);
    } else {
      streak = 0;
    }
  }

  let current = 0;
  for (let i = allDays.length - 1; i >= 0; i--) {
    if (allDays[i].contributionCount > 0) current++;
    else break;
  }

  return { longest, current };
}

export async function fetchGitHubStats(): Promise<GitHubStats> {
  const range = getContributionRange();

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
            languages: { edges: LanguageEdge[] };
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
      from: range.from,
      to: range.to,
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
