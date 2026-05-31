import { createFileRoute } from "@tanstack/react-router";

// "/" is the terminal — __root.tsx renders <Terminal /> directly for the index
// path, so this component never actually renders. Kept as an inert route so the
// path resolves; the old GUI homepage has been retired in favour of /home.
export const Route = createFileRoute("/")({
	component: () => null,
});
