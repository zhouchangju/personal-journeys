# AI Coding Guidelines

This document is the detailed coding contract for agents and contributors working in `personal-journeys`. User requirements take precedence; when requirements conflict, surface the conflict before editing.

## Before Editing

1. Inspect the relevant app, registry entry, scripts, tests, and current Git status.
2. State the intended outcome, assumptions, affected files, and verification command.
3. Prefer the smallest design that satisfies the request. Do not create a shared package for one use case or refactor unrelated code.
4. Preserve existing public URLs and visual behavior unless the request explicitly changes them.

## Repository Boundaries

- Keep each story's HTML, JavaScript, CSS, and assets under `apps/<slug>/`.
- Put cross-story brand foundations in `packages/`; keep story-specific behavior in the app.
- Treat `registry/journeys.json` as the source of truth. Update it before running `pnpm export:homepage`.
- Never put private notes, credentials, internal URLs, or raw study corpora in this public repository.
- Do not edit generated `dist/` output or the Homepage catalog by hand when a generator can produce it.

## Implementation Style

- Use two-space indentation, ESM syntax, semicolons, and double quotes in JavaScript.
- Use kebab-case for app slugs and workspace package names.
- Prefer explicit functions and data flow over clever abstractions.
- Keep CSS variables shared through `@journeys/design-tokens`; do not duplicate brand tokens in new apps.
- Preserve each story's distinct narrative composition. Shared style means shared brand foundations, not identical layouts.
- Remove only imports, variables, or files made obsolete by your own change.

## Verification Contract

Every change must have a concrete success check. Examples:

- Registry changes: `pnpm validate` and `pnpm test`.
- App changes: `pnpm --filter @journeys/<slug> build` and a local visual check.
- Aggregate or deployment changes: `pnpm build` and `pnpm preview` at the app's complete `publicPath`.
- Homepage metadata changes: `pnpm export:homepage`, then run the Homepage schema tests.

If a full check is blocked by unrelated existing work, report the exact command and error; do not hide the failure or “fix” unrelated files silently.

## Change Handoff

Summarize what changed, what was intentionally left untouched, commands run, and any remaining risk. For visual changes, include the local URL and ask for human review of layout, animation, responsive behavior, and accessibility perception.
