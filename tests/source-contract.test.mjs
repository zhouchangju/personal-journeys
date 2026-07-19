import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";

const root = resolve(new URL("..", import.meta.url).pathname);
const app = resolve(root, "apps/toefl-2026");
const architectApp = resolve(root, "apps/system-architect-2025");

test("TOEFL app keeps its public route and shared design tokens", () => {
  const config = readFileSync(resolve(app, "vite.config.js"), "utf8");
  const css = readFileSync(resolve(app, "src/style.css"), "utf8");
  const html = readFileSync(resolve(app, "index.html"), "utf8");

  assert.match(config, /base:\s*["']\/career\/toefl-study\/["']/);
  assert.match(css, /@journeys\/design-tokens\/theme\.css/);
  assert.match(html, /https:\/\/zhouchangju\.com\/journeys/);
  assert.ok(existsSync(resolve(app, "src/assets/final-score.png")));
});

test("system architect journey keeps its public route and narrative anchors", () => {
  const config = readFileSync(resolve(architectApp, "vite.config.js"), "utf8");
  const html = readFileSync(resolve(architectApp, "index.html"), "utf8");
  const css = readFileSync(resolve(architectApp, "src/style.css"), "utf8");

  assert.match(config, /base:\s*["']\/career\/system-architect\/["']/);
  assert.match(css, /@journeys\/design-tokens\/theme\.css/);
  assert.match(html, /5 月 24 日/);
  assert.match(html, /11 月 8 日/);
  assert.match(html, /43/);
  assert.match(html, /56/);
  assert.match(html, /通过/);
});
