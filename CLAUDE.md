# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Toolchain and commands

This is an npm project (`package-lock.json`) using React 19, TypeScript 6, and Vite 8.

```bash
npm ci                 # install the locked dependencies
npm run dev            # start the Vite development server with HMR on port 3000
npm run build          # run `tsc -b`, then create the production bundle in dist/
npm start              # serve dist/ with SPA fallback on port 3000 through serve
npm run lint           # run Oxlint
npm run preview         # serve the production bundle through Vite
npx tsc -b              # type-check without running the Vite build
```

There is currently no test framework, `test` script, or test suite, so there is no command for running all tests or a single test. There is also no formatter script. Use `npm run lint` and `npm run build` for the repository's configured validation.

## Architecture

- `index.html` is the Vite HTML entry point and mounts `src/main.tsx` into `#root`.
- `src/main.tsx` renders React in `StrictMode`, but it does not render `App`. It renders Generouted's `<Routes />`, making file-based pages the active application UI.
- `src/pages/` is the route source scanned by `@generouted/react-router`. For example, `src/pages/index.tsx` maps to `/`. Route additions, removals, and renames are detected by the Generouted Vite plugin.
- `src/router.ts` is generated from `src/pages/`; never edit it directly. Import its generated `Link`, `Navigate`, navigation hooks, parameter hooks, and `redirect` helper when type-safe route access is needed.
- `vite.config.ts` wires together the React plugin, Generouted, the Babel React Compiler preset, and Tailwind CSS's Vite plugin. The React Compiler and Tailwind processing are therefore active during Vite development and builds.
- `tsconfig.json` uses project references: `tsconfig.app.json` checks browser code under `src/`, while `tsconfig.node.json` checks `vite.config.ts`. Both are no-emit configurations; Vite performs bundling.

## Current scaffold and assets

- Tailwind CSS v4 is loaded globally through `src/index.css`, which is imported by `src/main.tsx`. The stylesheet imports `tailwindcss`, including Tailwind's Preflight reset; global styling should otherwise use Tailwind utilities or Tailwind's CSS-first configuration.
- Files under `public/` are served unchanged from the site root (for example, `/favicon.svg` and `/icons.svg`). Assets imported from `src/assets/` are processed and fingerprinted by Vite.
- `dist/` is generated build output and is ignored by the repository.

## Code checks

Oxlint is configured in `.oxlintrc.json` with the React, TypeScript, and Oxc plugins. It enforces React Hooks rules and warns when a module exports non-components in a way that can interfere with React Fast Refresh. TypeScript additionally rejects unused locals/parameters and switch fallthroughs.
