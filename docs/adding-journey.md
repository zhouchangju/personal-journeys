# Adding a Journey

## 1. Create the app scaffold

From the repository root:

```bash
pnpm create:journey omscs-2027
```

The command creates `apps/omscs-2027/`, adds a workspace package named `@journeys/omscs-2027`, and appends a draft entry to `registry/journeys.json`.

The generated page is only a starter. Replace its content with the actual story and keep its `vite.config.js` `base` path aligned with the registry `publicPath`.

## 2. Complete the registry entry

Replace the draft values with real metadata:

```json
{
  "id": "omscs-2027",
  "app": "@journeys/omscs-2027",
  "title": { "zh": "中文标题", "en": "English title" },
  "summary": { "zh": "中文摘要", "en": "English summary" },
  "period": "2027.01–2028.12",
  "metric": "12 → 36",
  "metricLabel": { "zh": "课程数量", "en": "Courses" },
  "publicPath": "/career/omscs-2027/",
  "href": "https://t.zhouchangju.com/career/omscs-2027/",
  "locale": "zh-CN",
  "status": "in-progress"
}
```

The `id`, `app`, and `publicPath` values must be unique. `href` is the canonical URL that Homepage will display.

## 3. Develop and verify

```bash
pnpm --filter @journeys/omscs-2027 dev
pnpm validate
pnpm --filter @journeys/omscs-2027 build
pnpm test
pnpm build
```

Use the app's public path when opening its development URL. After the aggregate build, verify the same path under `dist/` with:

```bash
pnpm preview
```

## 4. Sync Homepage

After registry metadata is ready:

```bash
pnpm export:homepage
```

This updates the Homepage catalog snapshot. Review the generated change in `../homepage/public/data/journeys.json`, then build and test Homepage according to its own quality gates.

## 5. Keep source material separate

Do not move private notes, raw research, credentials, or learning scratch files into this repository. Only publish material that belongs in the public story site.
