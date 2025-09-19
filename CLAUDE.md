# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack (default port 3000)
- `npm run build` - Build production application with Turbopack
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Project Architecture

This is a Next.js 15 application using the App Router with TypeScript and Tailwind CSS v4.

### Tech Stack
- **Framework**: Next.js 15.5.3 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 with PostCSS
- **UI Components**: shadcn/ui configured with "new-york" style
- **Fonts**: Geist Sans and Geist Mono (optimized with next/font)
- **Icons**: Lucide React
- **Utilities**: clsx, tailwind-merge for className handling

### File Structure
- `src/app/` - Next.js App Router pages and layouts
  - `layout.tsx` - Root layout with font configuration
  - `page.tsx` - Home page
  - `globals.css` - Global styles and Tailwind CSS
  - `admin/` - Admin section with nested layout
  - `auth/` - Authentication pages (login, register) with nested layout
  - `users/` - User management pages
- `src/lib/` - Shared utilities and helper functions
  - `utils.ts` - Common utility functions (cn for className merging)
- `components.json` - shadcn/ui configuration with path aliases

### Key Configurations
- **Path Aliases**: `@/*` maps to `src/*`
- **shadcn/ui Aliases**:
  - `@/components` - UI components
  - `@/lib/utils` - Utility functions
  - `@/components/ui` - shadcn/ui components
- **ESLint**: Configured with Next.js core-web-vitals and TypeScript rules
- **Turbopack**: Enabled for both development and build processes

### Architecture Notes
- Uses CSS variables for theming (neutral base color)
- RSC (React Server Components) enabled
- All pages are using TypeScript (.tsx files)
- Font optimization with CSS variables (--font-geist-sans, --font-geist-mono)