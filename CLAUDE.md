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

There is currently no test framework, `test` script, or test suite, so there is no command for running all tests or a single test. Prettier is configured via `.prettierrc.json` with a matching `.prettierignore`; use `npm run format` to write and `npm run format:check` to verify. Use `npm run lint`, `npm run format:check`, and `npm run build` for the repository's configured validation.

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

## Conventions

### Imports

Use direct paths from `src/` and `convex/`; never `../` or `@/`. The `paths` block in `tsconfig.app.json` (`*` → `./src/*`, `convex/*` → `./convex/*`) and Vite's native `resolve.tsconfigPaths: true` in `vite.config.ts` resolve them. Same-folder `./` imports are fine; bare npm specifiers continue to resolve from `node_modules` via the catch-all falling through.

```ts
import { useAuthBounce } from 'hooks/useAuthBounce';
import { FormInput } from 'components/form/FormInput';
import { signupSchema } from 'validations/signup';
import { api } from 'convex/_generated/api';
import { type Path, useNavigate } from 'router';
```

### Forms

Forms are built from the shared components in `src/components/`:

- `components/form/FormInput` — labelled `<input>` wired to react-hook-form's `register('field')` (passed via the `registration` prop) with an `error?: string` prop for the field-level message.
- `components/form/FormError` — `<p role="alert">` for non-field errors (e.g. server rejections); renders `null` when `message` is missing.
- `components/Button` — `<button>` with `variant: 'solid' | 'outlined' | 'text'` (default `solid`) and a default `type="button"`, so submit buttons must opt in with `type="submit"`.

Validation is `react-hook-form` + `yup` via `@hookform/resolvers/yup`. Each form's schema lives in `src/validations/<name>.ts` and exports both the schema and `type XValues = yup.InferType<typeof schema>`. Wire the resolver with `useForm<MyValues>({ resolver: yupResolver(schema), defaultValues })`, pass `registration={register('field')}` and `error={errors.field?.message}` to each `<FormInput>`, render non-field errors with `<FormError message={...} />`, and submit with `<Button type="submit" variant="solid" disabled={isSubmitting}>…</Button>`.

Guest-only pages (signup, signin, password reset, …) call `useAuthBounce()` from `hooks/useAuthBounce` at the top of the component to redirect already-signed-in visitors away (default destination `'/'`; pass any `Path` to land elsewhere).

<!-- convex-ai-start -->

This project uses [Convex](https://convex.dev) as its backend.

When working on Convex code, **always read
`convex/_generated/ai/guidelines.md` first** for important guidelines on
how to correctly use Convex APIs and patterns. The file contains rules that
override what you may have learned about Convex from training data.

Convex agent skills for common tasks can be installed by running
`npx convex ai-files install`.

<!-- convex-ai-end -->
