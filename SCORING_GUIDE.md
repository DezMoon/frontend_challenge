# Frontend Challenge Scoring Guide

This document provides a standardized way to evaluate candidates on the Frontend Challenge. The goal is to assess not just "does it work", but "how well is it built".

## Scoring Rubric (Out of 10 per Category)

### 1. HTML & Accessibility (Weight: 15%)
- **9-10**: Semantic HTML5 throughout (`<article>`, `<section>`, `<nav>`, etc.). Proper ARIA labels where necessary. Keyboard navigability is perfect (focus states, tab order).
- **7-8**: Mostly semantic. Good use of headers. Basic accessibility is present (alt tags, labels).
- **5-6**: Too many `<div>`s where semantic tags could be used. Missing some accessible attributes.
- **<5**: "Div soup". No attention to accessibility. Button clicks implemented on `<div>`s without role/tabindex.

### 2. CSS & Styling (Weight: 20%)
- **9-10**: Responsive design works flawlessly on mobile/desktop. Modern CSS usage (Flexbox/Grid, Variables, or clean Tailwind usage). Visuals are polished (spacing, typography, consistency).
- **7-8**: Responsive works but might have minor glitches. Code is clean but maybe slightly repetitive. Good visual fidelity to the "premium" feel.
- **5-6**: Functional but ugly. Responsiveness is an afterthought. Heavy reliance on `!important` or pixel-perfect hardcoding.
- **<5**: Broken layout. Non-responsive. Inline styles used excessively.

### 3. JavaScript / TypeScript Logic (Weight: 25%)
- **9-10**: Strict TypeScript usage (no `any`). Complex logic is decoupled from UI. proper error handling. Efficient algorithms for filtering/sorting.
- **7-8**: Good TS usage, maybe 1-2 `any` types or loose definitions. Logic is readable. Basic error handling.
- **5-6**: "TypeScript as JavaScript" (excessive `any`, `// @ts-ignore`). Logic is tightly coupled to components.
- **<5**: Broken logic. Console errors. Spaghetti code.

### 4. React Best Practices (Weight: 25%)
- **9-10**: Modern Hooks usage (`useMemo`, `useCallback` where appropriate). Custom hooks for logic reuse. Component composition is excellent (small, focused components). No prop drilling (uses Context or composition).
- **7-8**: Functional components with Hooks. Some large components that could be split. Minor prop drilling.
- **5-6**: `useEffect` misuse (infinite loops, unnecessary syncing). Massive "God components".
- **<5**: Class components (unless justified). Mutation of state directly. Anti-patterns.

### 5. Clean Code & Project Structure (Weight: 15%)
- **9-10**: Folder structure is intuitive (feature-based or clean atomic). Naming conventions are consistent. Code is self-documenting. Prettier/ESLint enabled and used.
- **7-8**: Decent structure. mostly consistent naming.
- **5-6**: Flat file structure. Inconsistent naming (camelCase vs snake_case mixed).
- **<5**: All code in `App.tsx` or one folder. Dead code left commented out.

---

## Red Flags (Immediate Terminators)
- **Secrets in Git**: Committing `.env` files with actual keys (even if fake, it shows bad practice).
- **"It works on my machine"**: Project doesn't start with `npm install && npm run dev`.
- **Plagiarism**: Code obviously copied from a tutorial without adaptation.
- **No Git History**: Single "Initial commit" with the completed project. we want to see the progression.

## Bonus Points
- **Pagination**: Efficiently paginating the list of 100 tasks.
- **Unit Tests**: Writing Vitest/Jest tests for utilities.
- **E2E Tests**: A simple Cypress/Playwright flow.
- **Animations**: Subtle layout transitions (Framer Motion or CSS).
- **Persistence**: Persisting state to `localStorage` or `sessionStorage` so it survives refresh.
- **Dark Mode**: Toggleable theme.

## AI Usage & Integrity Check (Critical)
Since we allow AI tools, you **must** verify the candidate wrote and understands the code.

**How to Enforce:**
1. **The "Why" Question**: Point to a specific `useEffect` or complex reducer and ask: *"Why did you include this specific dependency here?"* purely AI-generated code often has weird or redundant dependencies.
2. **The "Refactor" Request**: Ask them: *"If we wanted to change this feature to do X instead of Y, what lines would we need to touch?"* A prompt-kiddie won't know the file structure well enough to answer quickly.
3. **The "Spot Check"**: Look for comments that sound robotic or variables named `data1`, `temp`, or overly verbose comments typical of LLMs.

**Scoring:**
- **Pass**: Candidate can explain the flow of data fluently and admits when they used AI for boilerplate but wrote the logic themselves.
- **Fail**: Candidate pauses for a long time to read their own code, or says "I found this solution online/Copilot wrote it" and can't explain *how* it works. **Immediate Rejection**.
