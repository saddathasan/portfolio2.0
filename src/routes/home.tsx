import { createFileRoute } from "@tanstack/react-router";
import { GuiHome } from "@/features/elegant/components/GuiHome";

export const Route = createFileRoute("/home")({
	component: GuiHome,
});
