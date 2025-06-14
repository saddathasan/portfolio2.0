# Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview

This is a modern React portfolio website built with:

- **Vite** - Fast build tool and development server
- **React** - Frontend framework
- **TypeScript** - Type safety and better developer experience
- **TanStack Router** - Type-safe routing solution
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful and accessible React components

## Development Guidelines

### Code Style

- Use TypeScript for all components and utilities
- Prefer functional components with hooks
- Use Tailwind CSS for styling
- Follow React best practices and patterns
- Use meaningful component and variable names

### File Structure

- Components go in `src/components/`
- UI components from shadcn/ui are in `src/components/ui/`
- Route components are in `src/routes/`
- Utilities and helpers are in `src/lib/`
- Use the `@/` alias for imports from `src/`

### TanStack Router

- Use `createFileRoute` for page components
- Keep route components focused on layout and data fetching
- Use type-safe navigation with the Link component

### Styling

- Use shadcn/ui components when available
- Leverage Tailwind's utility classes
- Use CSS variables defined in `src/index.css` for theming
- Maintain consistent spacing and typography

### Best Practices

- Keep components small and focused
- Use proper TypeScript types
- Implement proper error handling
- Consider accessibility in component design
- Use semantic HTML elements
