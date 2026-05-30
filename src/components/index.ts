// Component barrel — surviving components after the v2 Phase 0 cleanup.
// NOTE: nav/footer/hero duplicates (Navbar/Navigation/Layout, Hero/HeroSection,
// Footer/FooterCallToAction) are intentionally NOT consolidated here yet — that
// happens in Phase 2 when the GUI pages are redesigned around a single Nav/Footer/Hero.

// Layout
export { PageHeader } from "./PageHeader";
export { PageLayout } from "./PageLayout";
export { Section } from "./Section";

// Content
export { Hero } from "./Hero";
export { InfoCard } from "./InfoCard";
export { ProjectCard } from "./ProjectCard";
export { SkillBadge } from "./SkillBadge";
export { TechBadgeList } from "./TechBadgeList";

// Specialized
export { ContactInfo } from "./ContactInfo";
export { ExperienceTimeline } from "./ExperienceTimeline";
export { SkillsSidebar } from "./SkillsSidebar";

// Global
export { Footer } from "./Footer";
export { ThemeToggle } from "./ThemeToggle";
export { SEO } from "./SEO";

// Re-export all UI primitives
export * from "./ui";
