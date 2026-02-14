import { createFileRoute } from "@tanstack/react-router";
import { GitProfile } from "@/components/git-profile";

export const Route = createFileRoute("/git-profile")({
	component: GitProfilePage,
});

function GitProfilePage() {
	return <GitProfile />;
}
