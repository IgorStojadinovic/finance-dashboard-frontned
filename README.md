# Finance Dashboard Frontend

Finance dashboard built with React and TypeScript.

## Tech Stack

- React 19
- TypeScript 7 (`tsc`) with TypeScript 6 for ESLint
- Vite 8
- Tailwind CSS 4
- TanStack Query
- React Router 7
- Chart.js
- Zustand

## Features

- Dashboard overview
- Transaction history with search and filters
- Budget planning
- Savings pots
- Recurring bills
- User authentication
- Responsive layout

## Prerequisites

- Node.js 22.12 or newer
- npm

## Installation

```bash
npm install
```

Environment files:

- `.env.development` for local API requests
- `.env.production` for the production API

Both set `VITE_API_URL`.

## Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
npm test
```

## Project structure

- `src/api` — HTTP client and resource modules
- `src/components` — pages, layout, auth, and modals
- `src/lib` — hooks, stores, and shared types
- `src/ui` — reusable interface pieces
- `tests` — Vitest tests
