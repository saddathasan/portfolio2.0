import { createLazyFileRoute } from "@tanstack/react-router";
import { GuiHome } from "@/features/elegant/components/GuiHome";

export const Route = createLazyFileRoute("/home")({
	component: GuiHome,
});
