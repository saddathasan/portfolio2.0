import { createFileRoute } from "@tanstack/react-router";
import { GitProfile } from "@/features/git-profile/components";

export const Route = createFileRoute("/git-profile")({
	component: GitProfilePage,
});

function GitProfilePage() {
	return <GitProfile />;
}
