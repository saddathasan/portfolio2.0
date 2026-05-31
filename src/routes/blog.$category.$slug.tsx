import { createFileRoute } from "@tanstack/react-router";

// Component in blog.$category.$slug.lazy.tsx (code-split — pulls the post body).
export const Route = createFileRoute("/blog/$category/$slug")({});
