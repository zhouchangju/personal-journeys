import assert from "node:assert/strict";
import test from "node:test";
import { loadRegistry } from "../scripts/validate-journeys.mjs";

test("registry contains unique, buildable journey applications", () => {
  const journeys = loadRegistry();
  assert.equal(journeys.length, 1);
  assert.equal(journeys[0].app, "@journeys/toefl-2026");
  assert.equal(journeys[0].publicPath, "/english/toefl-study/");
});
