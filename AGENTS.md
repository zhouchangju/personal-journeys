# Repository Guidelines

## Project Structure

This is a pnpm multi-application Monorepo for public, long-form personal journey sites.

- `apps/<slug>/` contains an independently runnable story site; the current app is `apps/toefl-2026/`.
- `packages/design-tokens/` contains shared brand CSS variables.
- `registry/journeys.json` is the source of truth for app metadata and public paths.
- `scripts/` contains validation, builds, Homepage export, preview, and scaffolding tools.
- `tests/` contains Node contract tests.
- `dist/` and workspace `node_modules/` are generated and ignored.

Keep raw notes, private material, and credentials in their source repositories, not here.

## AI-Assisted Change Rules

These rules adapt the [Karpathy Guidelines](https://github.com/multica-ai/andrej-karpathy-skills/blob/main/skills/karpathy-guidelines/SKILL.md) to this repository:

- Think before coding: state assumptions and ask when ambiguity changes the design.
- Simplicity first: implement only the smallest requested solution.
- Make surgical changes: preserve unrelated work and avoid speculative refactors.
- Define and verify success with concrete checks before handoff.

For detailed project-specific rules, read [docs/ai-coding-guidelines.md](docs/ai-coding-guidelines.md).

## Build, Test, and Development Commands

Run from the repository root:

```bash
pnpm install                         # Install dependencies
pnpm dev                             # Start the default TOEFL app
pnpm --filter @journeys/<slug> dev  # Start one app
pnpm validate                        # Validate registry mappings
pnpm test                            # Run contract tests
pnpm build                           # Build all apps under dist/
pnpm preview                         # Serve aggregate output
pnpm export:homepage                 # Generate Homepage catalog
pnpm create:journey <slug>           # Scaffold and register an app
```

The TOEFL development URL is `/english/toefl-study/`; aggregate preview uses the same public path.

## Coding Style and Naming

Use two-space indentation, ESM imports, and double quotes in JavaScript files. Use kebab-case slugs and package names such as `omscs-2027` and `@journeys/omscs-2027`. Keep each app’s narrative code and assets inside its own directory. Reuse `@journeys/design-tokens` for shared brand foundations; do not force unrelated stories into one layout.

## Testing Guidelines

Tests use Node’s built-in `node:test` runner. Name tests `*.test.mjs` and cover registry validity, public paths, required assets, and build contracts. Run `pnpm test` before submitting changes; run `pnpm build` to verify every registered app.

## Commits and Pull Requests

Use Conventional Commit prefixes such as `feat:`, `fix:`, `docs:`, and `chore:`. Pull requests should describe the affected app or package, list validation commands, explain registry changes, and include a screenshot or local URL for visual changes.

## Architecture and Configuration

Every registry entry must map to an existing package and unique `publicPath`. Update `registry/journeys.json` before exporting Homepage data. Change Vite `base` and registry paths together, and document redirects for migrations.
