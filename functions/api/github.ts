/// <reference types="@cloudflare/workers-types" />
/* Cloudflare Pages Function — GitHub stats proxy.

   Holds the GitHub token server-side (env GITHUB_TOKEN, set in the CF
   dashboard) and runs ONE fixed GraphQL query for the fixed user, returning
   just `data.user`. It is deliberately not a generic GraphQL passthrough, so
   the token can never be used to run arbitrary queries from the client.

   A server-side token authorised for the orgs (repo + read:org, SSO) makes the
   contribution totals reflect private + org work — unlike the public-only
   client token. Responses are CDN-cached (max-age) to soften rate limits. */

interface Env {
	GITHUB_TOKEN: string;
}

const GITHUB_USERNAME = "saddathasan";

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
          edges { size node { name color } }
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
        weeks { contributionDays { contributionCount date color } }
      }
    }
  }
}`;

// Trailing 12 months ending now (GitHub's max contribution window).
function contributionRange() {
	const to = new Date();
	const from = new Date(to);
	from.setFullYear(to.getFullYear() - 1);
	from.setDate(from.getDate() + 1);
	return { from: from.toISOString(), to: to.toISOString() };
}

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
	if (!env.GITHUB_TOKEN) {
		return new Response(JSON.stringify({ error: "Server token not configured" }), {
			status: 500,
			headers: { "content-type": "application/json" },
		});
	}

	const { from, to } = contributionRange();

	const ghRes = await fetch("https://api.github.com/graphql", {
		method: "POST",
		headers: {
			authorization: `bearer ${env.GITHUB_TOKEN}`,
			"content-type": "application/json",
			"user-agent": "saddathasan-portfolio",
		},
		body: JSON.stringify({
			query: USER_STATS_QUERY,
			variables: { username: GITHUB_USERNAME, from, to },
		}),
	});

	if (!ghRes.ok) {
		return new Response(JSON.stringify({ error: `GitHub API ${ghRes.status}` }), {
			status: 502,
			headers: { "content-type": "application/json" },
		});
	}

	const payload = (await ghRes.json()) as { data?: { user?: unknown }; errors?: unknown };
	if (payload.errors || !payload.data?.user) {
		return new Response(JSON.stringify({ error: "GitHub query failed", details: payload.errors }), {
			status: 502,
			headers: { "content-type": "application/json" },
		});
	}

	return new Response(JSON.stringify(payload.data.user), {
		status: 200,
		headers: {
			"content-type": "application/json",
			// Cache at the edge for an hour; allow a stale day while revalidating.
			"cache-control": "public, max-age=3600, stale-while-revalidate=86400",
		},
	});
};
