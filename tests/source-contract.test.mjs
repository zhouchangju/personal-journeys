import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";

const root = resolve(new URL("..", import.meta.url).pathname);
const app = resolve(root, "apps/toefl-2026");

test("TOEFL app keeps its public route and shared design tokens", () => {
  const config = readFileSync(resolve(app, "vite.config.js"), "utf8");
  const css = readFileSync(resolve(app, "src/style.css"), "utf8");
  const html = readFileSync(resolve(app, "index.html"), "utf8");

  assert.match(config, /base:\s*["']\/english\/toefl-study\/["']/);
  assert.match(css, /@journeys\/design-tokens\/theme\.css/);
  assert.match(html, /https:\/\/zhouchangju\.com\/journeys/);
  assert.ok(existsSync(resolve(app, "src/assets/final-score.png")));
});
