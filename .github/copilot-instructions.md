# Copilot Instructions for TaskMaster Dashboard

## Project Overview
- **Framework:** React 19+ with TypeScript (strict mode)
- **Build Tool:** Vite
- **Styling:** TailwindCSS (preferred), CSS Modules, or Styled Components
- **State Management:** Use React Context, Redux Toolkit, Zustand, or TanStack Query (no global component libraries)
- **Data Source:** Tasks are loaded from `public/tasks.json` via `fetch('/tasks.json')`

## Architecture & Key Patterns
- Main UI components are in `src/components/` (e.g., `filters.tsx`, `header.tsx`, `mainBoard.tsx`, `pagination.tsx`, `welcome.tsx`)
- Entry point: `src/main.tsx` and `src/App.tsx`
- Global styles: `src/index.css`, Tailwind config in `tailwind.config.js`
- Tasks are displayed, filtered, searched, paginated, and managed in-memory (simulate add/delete/toggle, no backend persistence)
- Pagination is expected for large task lists (see `pagination.tsx`)
- Filtering/searching by status and title is required (see `filters.tsx`)

## Developer Workflow
- **Start Dev Server:** `npm run dev`
- **Build:** `npm run build`
- **Preview:** `npm run preview`
- **Type Checking:** `tsc --noEmit`
- **Linting:** `npx eslint .`
- **Styling:** Use Tailwind utility classes, update `tailwind.config.js` as needed

## Conventions & Practices
- Use React hooks for all stateful logic
- Avoid using `any` in TypeScript
- No full UI libraries (MaterialUI, AntD, etc.)
- Simulate task mutations in local state only
- Keep UI modern, responsive, and accessible
- Use smooth transitions/animations for premium UX

## Integration Points
- All data comes from `public/tasks.json` (no external API calls)
- No authentication or user management
- No server-side code

## Examples
- To fetch tasks: `fetch('/tasks.json')`
- To filter by status: Use a dropdown or buttons in `filters.tsx`
- To paginate: Render 10 tasks per page, update page state in `pagination.tsx`

## References
- See `README.md` for challenge requirements and constraints
- Key files: `src/components/`, `public/tasks.json`, `tailwind.config.js`, `vite.config.ts`

---
**AI agents:** Follow these conventions and workflows. Do not introduce backend code, global UI libraries, or non-standard patterns. Focus on clarity, maintainability, and premium UX.
