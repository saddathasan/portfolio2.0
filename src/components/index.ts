// Core Layout Components
export { CodePreview } from "./CodePreview";
export { ContentGrid } from "./ContentGrid";
export { PageHeader } from "./PageHeader";
export { PageLayout } from "./PageLayout";
export { Section } from "./Section";

// Navigation Components
export { FooterCallToAction } from "./FooterCallToAction";
export { Navigation } from "./Navigation";

// Content Components
export { AnimatedCard } from "./AnimatedCard";
export { HeroSection } from "./HeroSection";
export { InfoCard } from "./InfoCard";
export { ProjectCard } from "./ProjectCard";

// Specialized Components
export { BiographySection } from "./BiographySection";
export { ContactForm } from "./ContactForm";
export { ContactInfo } from "./ContactInfo";
export { ExperienceTimeline } from "./ExperienceTimeline";
export { SkillsSidebar } from "./SkillsSidebar";
export { default as SudokuGame } from "./sudokuGame";
export { TechBadgeList } from "./TechBadgeList";

// Global Components
export { GlobalFooter } from "./GlobalFooter";
export { ThemeToggle } from "./ThemeToggle";

// Re-export all UI components
export * from "./ui";

/**
 * Portfolio Component Library
 *
 * This is a comprehensive, modular component library built using the compound component pattern.
 * All components are designed to be reusable, composable, and maintainable.
 *
 * Key Features:
 * - Compound component pattern for maximum flexibility
 * - TypeScript support with proper typing
 * - Consistent animation and theming
 * - Responsive design built-in
 * - Accessible by default
 *
 * Usage Examples:
 *
 * Page Layout:
 * ```tsx
 * <PageLayout.Container>
 *   <PageLayout.Main>
 *     <PageHeader>
 *       <PageHeader.Title>Page Title</PageHeader.Title>
 *       <PageHeader.Description>Description</PageHeader.Description>
 *     </PageHeader>
 *     <Section>
 *       <Section.Header>Section Title</Section.Header>
 *       <Section.Content>Content here</Section.Content>
 *     </Section>
 *   </PageLayout.Main>
 * </PageLayout.Container>
 * ```
 *
 * Navigation:
 * ```tsx
 * <Navigation>
 *   <Navigation.Brand>Brand</Navigation.Brand>
 *   <Navigation.Links>
 *     <Navigation.Link to="/">Home</Navigation.Link>
 *   </Navigation.Links>
 *   <Navigation.Actions>
 *     <Navigation.Action href="/resume">Resume</Navigation.Action>
 *   </Navigation.Actions>
 * </Navigation>
 * ```
 *
 * Content Grid:
 * ```tsx
 * <ContentGrid columns={3} staggerChildren>
 *   <ContentGrid.Item>Item 1</ContentGrid.Item>
 *   <ContentGrid.Item>Item 2</ContentGrid.Item>
 * </ContentGrid>
 * ```
 */
