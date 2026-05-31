import { createFileRoute } from "@tanstack/react-router";

// Component in blog.index.lazy.tsx — the blog GUI + MDX bodies code-split out
// of the terminal/home initial bundles.
export const Route = createFileRoute("/blog/")({});
