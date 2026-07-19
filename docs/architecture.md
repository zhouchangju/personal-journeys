# Architecture

`personal-journeys` is a pnpm multi-application Monorepo. It manages public storytelling sites, not the private or raw material from which those stories are produced.

```text
sprint-practice or another source repository
  └── notes, experiments, source material
              │
              ▼
personal-journeys
  ├── apps/<slug>/              independent story application
  ├── packages/design-tokens/   shared visual foundations
  ├── registry/journeys.json    catalog and deployment contract
  └── scripts/                  validation, build, and export
              │
              ▼
homepage
  └── public/data/journeys.json generated catalog snapshot
```

## Application boundary

Every directory under `apps/` is independently runnable and deployable. A story may use a different layout, animation model, or frontend implementation. It must own its narrative HTML, assets, and app-specific behavior.

The root registry connects an app to its public identity:

- `app` identifies the workspace package.
- `publicPath` identifies where its static output is assembled.
- `href` is the canonical public URL shown by Homepage.
- localized title, summary, metric, locale, and status populate the catalog.

`pnpm validate` checks that registry entries are unique, URLs and paths are valid, and every app maps to a real workspace package.

## Shared design boundary

The shared layer currently contains brand-level CSS variables in `packages/design-tokens/theme.css`. These establish typography, colors, spacing-related radii, and semantic surface colors.

Shared foundations should keep the sites recognizable as one author's work without forcing every story into the same composition. Add a shared shell or interaction package only after multiple stories demonstrate the same repeated need.

## Build and deployment

`pnpm build` validates the registry, builds every registered app, and copies each app's Vite output into `dist/<publicPath>`.

For example, the TOEFL app is assembled as:

```text
dist/english/toefl-study/
├── index.html
└── assets/
```

`pnpm preview` serves the aggregate `dist/` tree with a path-aware static server. This is why the local URL includes the app's complete public path.

## Homepage integration

`registry/journeys.json` is the source of truth. `pnpm export:homepage` creates a static snapshot at `../homepage/public/data/journeys.json`.

Homepage consumes that snapshot at build time rather than requesting the Monorepo at runtime. This keeps Homepage deployable even if a journey site or the source repository is temporarily unavailable.
