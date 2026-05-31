import { createFileRoute } from "@tanstack/react-router";

// Component lives in git-profile.lazy.tsx so the git-profile UI code-splits
// out of every other route's initial bundle.
export const Route = createFileRoute("/git-profile")({});
