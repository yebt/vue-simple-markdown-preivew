# AGENTS.md - Project Documentation for AI Agents

Welcome to the **markdown-html-view** project. This document provides essential technical context and guidelines for AI agents and developers working on this codebase.

## 🚀 Project Overview

**markdown-html-view** is a modern web application built with Vue 3 and Vite, designed to render and view Markdown content as HTML. It prioritizes performance, type safety, and a clean developer experience.

## 🛠 Tech Stack

- **Framework:** [Vue 3](https://vuejs.org/) (Composition API, `<script setup>`)
- **Build Tool:** [Vite](https://vite.dev/)
- **Styling:** [UnoCSS](https://unocss.dev/) (using `@unocss/preset-wind4` for Tailwind 4 compatibility and `@unocss/preset-icons`)
- **Icons:** [Lucide](https://lucide.dev/) and [MDI](https://materialdesignicons.com/) (managed via UnoCSS icons preset)
- **State Management:** [Pinia](https://pinia.vuejs.org/)
- **Routing:** [Vue Router](https://router.vuejs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Testing:** [Vitest](https://vitest.dev/)
- **Linting:** [oxlint](https://oxlint.dev/), [ESLint](https://eslint.org/)
- **Formatting:** [Prettier](https://prettier.io/)
- **Package Manager:** [Bun](https://bun.sh/)

## 📂 Project Structure

```text
.
├── src/
│   ├── assets/             # Static assets (images, global CSS)
│   ├── components/         # Reusable Vue components
│   ├── pages/              # Page components (routes)
│   ├── router/             # Vue Router configuration
│   ├── stores/             # Pinia state stores
│   ├── App.vue             # Root component
│   └── main.ts             # Application entry point
├── public/                 # Static public assets
├── uno.config.ts           # UnoCSS configuration
├── vite.config.ts          # Vite configuration
└── vitest.config.ts        # Vitest configuration
```

## 🛠 Development Workflow

### Setup & Commands

- **Install dependencies:** `bun install`
- **Start dev server:** `bun dev`
- **Build for production:** `bun run build`
- **Run unit tests:** `bun test:unit`
- **Linting:** `bun lint` (runs oxlint and eslint)
- **Formatting:** `bun format`

## 🤖 Agent Guidelines

To maintain consistency and quality across the codebase, please follow these rules:

### 1. TypeScript & Type Safety

- Always use TypeScript for new files and components.
- Define proper interfaces/types for props, events, and state.
- Run `bun run type-check` before submitting significant changes.

### 2. Styling with UnoCSS

- Prefer UnoCSS utility classes over traditional CSS or CSS-in-JS.
- **Tailwind 4 Compatibility:** The project uses `@unocss/preset-wind4`, which provides Tailwind 4 compatible utility classes.
- **Icons:** Use the icon preset syntax (e.g., `i-lucide-<icon-name>` or `i-mdi-<icon-name>`).
  - Available sets: **Lucide** and **MDI**.
- Refer to `uno.config.ts` for project-specific theme settings and shortcuts.
- Use responsive modifiers (`sm:`, `md:`, etc.) for mobile-first design.

### 3. Vue 3 Patterns

- Use `<script setup lang="ts">` for all Vue components.
- Leverage the Composition API for logic extraction and reusability.
- Use explicit component registration if necessary, or rely on auto-imports if configured.

### 4. Code Quality

- Write unit tests for complex logic or reusable utilities using Vitest.
- Follow the existing linting and formatting rules (`bun lint`, `bun format`).
- Prioritize visual excellence and "premium" UI design as per the project goals.

### 5. Documentation

- Update this file (`AGENTS.md`) if there are major shifts in architecture or tech stack.
- Document any complex logic or non-obvious design decisions within the code.
