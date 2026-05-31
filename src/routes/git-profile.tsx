import { createFileRoute } from "@tanstack/react-router";

// Component lives in git-profile.lazy.tsx so octokit + the git-profile UI
// code-split out of every other route's initial bundle.
export const Route = createFileRoute("/git-profile")({});
