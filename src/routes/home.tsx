import { createFileRoute } from "@tanstack/react-router";

// Component lives in home.lazy.tsx so the elegant GUI code-splits out of the
// terminal landing's initial bundle.
export const Route = createFileRoute("/home")({});
