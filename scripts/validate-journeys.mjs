import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = resolve(new URL("..", import.meta.url).pathname);
const REGISTRY_PATH = resolve(ROOT, "registry/journeys.json");

export function loadRegistry() {
  const journeys = JSON.parse(readFileSync(REGISTRY_PATH, "utf8"));
  if (!Array.isArray(journeys) || journeys.length === 0) {
    throw new Error("registry/journeys.json must contain at least one journey");
  }

  const ids = new Set();
  const apps = new Set();
  const paths = new Set();

  journeys.forEach((journey, index) => {
    const label = `journeys[${index}]`;
    requireString(journey.id, `${label}.id`);
    requireString(journey.app, `${label}.app`);
    requireString(journey.publicPath, `${label}.publicPath`);
    requireString(journey.href, `${label}.href`);
    requireString(journey.locale, `${label}.locale`);
    requireString(journey.status, `${label}.status`);
    requireLocalizedText(journey.title, `${label}.title`);
    requireLocalizedText(journey.summary, `${label}.summary`);
    requireLocalizedText(journey.metricLabel, `${label}.metricLabel`);

    if (!/^https?:\/\//.test(journey.href)) {
      throw new Error(`${label}.href must be an absolute http(s) URL`);
    }
    if (!journey.publicPath.startsWith("/") || !journey.publicPath.endsWith("/")) {
      throw new Error(`${label}.publicPath must start and end with /`);
    }
    if (!/^completed$|^in-progress$/.test(journey.status)) {
      throw new Error(`${label}.status must be completed or in-progress`);
    }
    if (ids.has(journey.id)) throw new Error(`Duplicate journey id: ${journey.id}`);
    if (apps.has(journey.app)) throw new Error(`Duplicate journey app: ${journey.app}`);
    if (paths.has(journey.publicPath)) throw new Error(`Duplicate publicPath: ${journey.publicPath}`);

    ids.add(journey.id);
    apps.add(journey.app);
    paths.add(journey.publicPath);

    const appDir = resolve(ROOT, "apps", journey.app.replace(/^@journeys\//, ""));
    if (!existsSync(resolve(appDir, "package.json"))) {
      throw new Error(`${label}.app has no package.json: ${appDir}`);
    }
    const packageJson = JSON.parse(readFileSync(resolve(appDir, "package.json"), "utf8"));
    if (packageJson.name !== journey.app) {
      throw new Error(`${label}.app does not match package.json name: ${packageJson.name}`);
    }
  });

  return journeys;
}

function requireString(value, label) {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${label} must be a non-empty string`);
  }
}

function requireLocalizedText(value, label) {
  if (!value || typeof value !== "object") throw new Error(`${label} must contain zh and en`);
  requireString(value.zh, `${label}.zh`);
  requireString(value.en, `${label}.en`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const journeys = loadRegistry();
  console.log(`Validated ${journeys.length} journey(s).`);
}
