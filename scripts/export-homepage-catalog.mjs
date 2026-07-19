import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { loadRegistry } from "./validate-journeys.mjs";

const ROOT = resolve(new URL("..", import.meta.url).pathname);
const outputPath = process.argv[2]
  ? resolve(process.cwd(), process.argv[2])
  : resolve(ROOT, "../homepage/public/data/journeys.json");

const catalog = loadRegistry().map(({ id, title, summary, period, metric, metricLabel, href, locale, status }) => ({
  id,
  title,
  summary,
  period,
  metric,
  metricLabel,
  href,
  locale,
  status,
}));

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${JSON.stringify(catalog, null, 2)}\n`);
console.log(`Exported ${catalog.length} journey(s) to ${outputPath}`);
