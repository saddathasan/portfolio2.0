# Git Wrapped / Git Profile Feature Description

## Overview
This feature adds a "Git Wrapped" or "Git Profile" section to the portfolio website, inspired by `https://git-wrapped.com/`. It provides a summary of the user's GitHub activity, including commit history, top languages, and other interesting statistics.

## Trigger Mechanism
Users can access this feature in two ways:
1.  **Direct Navigation**: Visiting the route `/git-profile`.
2.  **Terminal Command**: Typing `git profile` in the site's interactive terminal.

## Technical Implementation

### Data Fetching
To retrieve the necessary data (commits, languages, contributions), we will use the **GitHub GraphQL API**. This allows us to fetch all required data in a single efficient query, avoiding multiple round-trips associated with the REST API.

**Required Dependency:**
- `octokit` or `graphql-request` (to be added to `package.json`).

**Key Metrics to Fetch:**
- Total contributions in the last year.
- Top languages used (by repository count or byte size).
- Longest contribution streak.
- Most active repository.
- Contribution calendar data (for a heatmap).

### Authentication
Since this is a public portfolio, we have two options:
1.  **Public Data Only**: Fetch data that is publicly available.
2.  **Personal Access Token (PAT)**: To get more detailed private stats or higher rate limits, we can use a PAT. However, exposing a PAT on the client-side is insecure.
    - *Recommendation*: Use a serverless function (e.g., Vercel API Route) to proxy the request and hide the token, OR build the data at build-time (SSG) if real-time stats aren't critical (though "everytime someone visits" implies real-time or cached real-time).
    - *Simplify*: For a start, we can use a read-only public token or just public endpoints if rate limits permit, but a server-side proxy is best practice.

### UI/UX Design
The interface should be visually engaging, matching the portfolio's "premium" and "dynamic" aesthetic.
- **Layout**: A "Bento Grid" or a "Story" format (like Spotify Wrapped).
- **Animations**:
    - Counters counting up for stats.
    - Progress bars for languages.
    - Fade-in effects for cards.
- **Theme**: Dark mode, using the site's primary accent colors (e.g., `#c6ff3e` or similar from the existing theme).

## Integration Steps

1.  **Install Dependencies**:
    ```bash
    npm install octokit
    ```

2.  **Create API Utility**:
    - `src/lib/github.ts`: Setup Octokit client and GraphQL queries.

3.  **Create Component**:
    - `src/components/GitProfile.tsx`: The main visual component.
    - Sub-components: `StatCard.tsx`, `LanguageGraph.tsx`, `ContributionHeatmap.tsx`.

4.  **Add Route**:
    - Create `src/routes/git-profile.tsx` (TanStack Router).

5.  **Update Terminal**:
    - Modify `src/hooks/useTerminal.tsx` to handle `git profile`.
    - Logic:
      ```typescript
      case "git":
        if (arg === "profile") {
            addToHistory(cmd, "Opening Git Profile...");
            window.location.href = "/git-profile"; // or navigate via router
        } else {
            // handle other git commands or show help
        }
        break;
      ```

## Environment Variables
- `VITE_GITHUB_TOKEN`: (Optional/Caution) If fetching client-side. Better to use a backend proxy if possible.

