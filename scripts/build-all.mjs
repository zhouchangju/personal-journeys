import { cpSync, mkdirSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";
import { loadRegistry } from "./validate-journeys.mjs";

const ROOT = resolve(new URL("..", import.meta.url).pathname);
const OUTPUT_DIR = resolve(ROOT, "dist");

rmSync(OUTPUT_DIR, { recursive: true, force: true });
mkdirSync(OUTPUT_DIR, { recursive: true });

for (const journey of loadRegistry()) {
  execFileSync("pnpm", ["--filter", journey.app, "build"], {
    cwd: ROOT,
    stdio: "inherit",
  });

  const appDir = resolve(ROOT, "apps", journey.app.replace(/^@journeys\//, ""));
  const destination = resolve(OUTPUT_DIR, journey.publicPath.replace(/^\//, ""));
  cpSync(resolve(appDir, "dist"), destination, { recursive: true });
  console.log(`Published ${journey.id} to ${journey.publicPath}`);
}
