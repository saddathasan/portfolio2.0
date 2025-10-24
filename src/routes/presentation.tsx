/**
 * Presentation Routes
 *
 * Parent layout for the Frontend 101 presentation featuring:
 * - /presentation - Overview and navigation to all slides
 * - /presentation/html - Slide 1: Static HTML
 * - /presentation/css - Slide 2: Adding CSS
 * - /presentation/js - Slide 3: Adding JavaScript
 */

import { createFileRoute, Outlet } from "@tanstack/react-router";

const PresentationLayout = () => {
	return <Outlet />;
};

export const Route = createFileRoute("/presentation")({
	component: PresentationLayout,
});
