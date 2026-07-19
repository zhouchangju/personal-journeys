# Personal Journeys

Long-form personal experience websites by Leo Zhou.

This repository is a pnpm workspace. Each directory under `apps/` is an independently runnable and deployable story site. Shared brand foundations live under `packages/`, while `registry/journeys.json` is the source of truth for the public journey catalog.

## Structure

```text
apps/                 Independent journey websites
packages/design-tokens/  Shared visual foundations
registry/             Journey metadata and public paths
scripts/              Validation, build aggregation, and Homepage export
```

## Commands

```bash
pnpm install
pnpm validate
pnpm dev
pnpm --filter @journeys/toefl-2026 dev
pnpm create:journey omscs-2027
pnpm build
pnpm preview
pnpm test
pnpm export:homepage
```

`pnpm build` builds every registered app and assembles static output under `dist/` using the public path from the registry. `pnpm export:homepage` generates the Homepage catalog at `../homepage/public/data/journeys.json` by default.

When a journey is added or changed, update Homepage in the same workflow: change `registry/journeys.json`, run `pnpm export:homepage`, then build and test the sibling `../homepage` project. The registry and generated Homepage catalog should never be allowed to describe different public journeys.

`pnpm dev` starts the first journey app in development mode. Open `http://127.0.0.1:5173/career/toefl-study/`. `pnpm preview` builds the complete aggregated `dist/` directory and serves the same public path locally.

To preview a different registered app directly, use its workspace package:

```bash
pnpm --filter @journeys/<slug> dev
```

The root `preview` command uses the aggregated static server because each app may have a different Vite `base` path. Set `PREVIEW_PORT` to use another port.

## Adding a journey

Create a new independent app under `apps/<slug>/`, give it a package name under `@journeys/<slug>`, then add its public metadata to `registry/journeys.json`. The registry validator requires every entry to map to an existing workspace package and a unique public path.

Keep original study notes and private source material in their source repositories. This repository contains the public storytelling products derived from those experiences.

See [docs/architecture.md](docs/architecture.md) for the repository boundaries and [docs/adding-journey.md](docs/adding-journey.md) for the complete workflow for a new story.
