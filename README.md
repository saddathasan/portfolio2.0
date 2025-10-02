# Portfolio 2.0

A modern React portfolio website built with cutting-edge technologies and inspired by Lee Robinson's minimal design philosophy for optimal performance and developer experience.

## 🚀 Tech Stack

- **[Vite](https://vitejs.dev/)** - Lightning fast build tool and development server
- **[React](https://react.dev/)** - Modern frontend framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety and enhanced developer experience
- **[TanStack Router](https://tanstack.com/router)** - Type-safe routing solution
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful and accessible React components

## ✨ Features

- ⚡ Lightning fast development with Vite
- 🎨 Minimal design inspired by Lee Robinson's aesthetic
- 🔒 Type-safe routing with TanStack Router
- 🎯 Accessible UI components with shadcn/ui
- 📱 Mobile-first responsive design
- 🌙 Dark/light mode support (via CSS variables)
- 🔧 Easy customization and theming
- 🎮 Interactive Sudoku game
- 📊 Performance optimized with manual chunking

## 🎨 Design Philosophy

This portfolio follows Lee Robinson's minimal design principles:

- **Typography**: Single font family (Inter) with limited weights (400, 500, 600)
- **Color Palette**: Minimal grayscale with high contrast ratios
- **Spacing**: Consistent spacing scale using Tailwind's system
- **Animations**: Subtle, purposeful animations without overwhelming motion
- **Layout**: Clean, content-focused layouts with generous whitespace

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+ (recommended: Node.js 20+)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone [your-repo-url]
cd portfolio2.0
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## 📝 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint
- `npm run generate-routes` - Generate TanStack Router routes
- `npm run watch-routes` - Watch and auto-generate routes

## 🗂️ Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── sudokuGame/     # Sudoku game components
│   └── ...             # Other feature components
├── lib/                # Utility functions
├── hooks/              # Custom React hooks
├── context/            # React context providers
├── routes/             # TanStack Router routes
│   ├── __root.tsx      # Root route layout
│   ├── index.tsx       # Home page
│   ├── about.tsx       # About page
│   ├── projects.tsx    # Projects page
│   ├── experience.tsx  # Experience page
│   ├── games.tsx       # Games page
│   └── contact.tsx     # Contact page
├── index.css           # Global styles and Tailwind directives
└── main.tsx            # Application entry point
```

## 🎨 Customization

### Adding New Pages

1. Create a new route file in the `src/routes/` directory
2. Run `npm run generate-routes` to update the route tree
3. Add navigation links in `src/routes/__root.tsx`

### Styling and Theming

- Edit CSS variables in `src/index.css` to customize the color scheme
- Use Tailwind classes for component styling
- Follow the minimal design principles for consistency
- Add custom components to `src/components/`

### Adding shadcn/ui Components

```bash
npx shadcn@latest add [component-name]
```

## 🚀 Performance Optimizations

- **Bundle Splitting**: Manual chunking for vendor, router, and UI dependencies
- **Font Loading**: Optimized Google Fonts loading with specific weights
- **CSS Optimization**: Minimal CSS with Tailwind purging
- **Build Configuration**: Optimized Vite configuration for production

## 🚀 Deployment

Build the project for production:

```bash
npm run build
```

The built files will be in the `dist/` directory, ready to be deployed to any static hosting service.

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
...reactDom.configs.recommended.rules,
},
})

```

```
