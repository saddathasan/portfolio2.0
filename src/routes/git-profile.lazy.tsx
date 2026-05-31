import { createLazyFileRoute } from "@tanstack/react-router";
import { GitProfile } from "@/features/git-profile/components";

export const Route = createLazyFileRoute("/git-profile")({
	component: GitProfile,
});
