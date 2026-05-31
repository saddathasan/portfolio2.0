import type { ComponentType } from "react";
import { AboutSection } from "./components/sections/AboutSection";
import { WorkSection } from "./components/sections/WorkSection";
import { ExperienceSection } from "./components/sections/ExperienceSection";
import { StackSection } from "./components/sections/StackSection";
import { EducationSection } from "./components/sections/EducationSection";
import { CertificatesSection } from "./components/sections/CertificatesSection";
import { ContactSection } from "./components/sections/ContactSection";

export interface HomeSection {
	/** Anchor id (used for #links and scroll targets). Keep unique + url-safe. */
	id: string;
	/** Eyebrow title shown next to the auto-generated number. */
	title: string;
	/** If set, the section appears in the sticky top nav with this label. */
	navLabel?: string;
	/** The section's content. The numbered shell + reveal are added for you. */
	Component: ComponentType;
}

/* ─────────────────────────────────────────────────────────────────────────
   THE single source of truth for the home page layout.

   • Reorder these entries → the page order, the 01/02/03… numbering, AND the
     top-nav order all update automatically. No other file needs touching.
   • Remove an entry (or comment it out) → that section disappears everywhere.
   • Add a new section → build a content-only component under
     components/sections/, import it, and drop an entry here.
   • Edit a section's words → edit its data file in src/data/.

   (The Hero is intentionally NOT in this list — it's the un-numbered opener,
    rendered first by GuiHome.)
   ───────────────────────────────────────────────────────────────────────── */
export const homeSections: HomeSection[] = [
	{ id: "about", title: "About", navLabel: "About", Component: AboutSection },
	{ id: "work", title: "Selected work", navLabel: "Work", Component: WorkSection },
	{
		id: "experience",
		title: "Experience",
		navLabel: "Experience",
		Component: ExperienceSection,
	},
	{ id: "stack", title: "Stack", Component: StackSection },
	{ id: "education", title: "Education", Component: EducationSection },
	{ id: "certificates", title: "Certificates", Component: CertificatesSection },
	{
		id: "contact",
		title: "Contact",
		navLabel: "Contact",
		Component: ContactSection,
	},
];
