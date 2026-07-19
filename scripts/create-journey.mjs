import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = resolve(new URL("..", import.meta.url).pathname);
const slug = process.argv[2];

if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  throw new Error("Usage: pnpm create:journey <lowercase-slug>");
}

const appDir = resolve(ROOT, "apps", slug);
const packageName = `@journeys/${slug}`;
if (existsSync(appDir)) throw new Error(`App already exists: ${appDir}`);

mkdirSync(resolve(appDir, "src"), { recursive: true });
writeFileSync(
  resolve(appDir, "package.json"),
  `${JSON.stringify(
    {
      name: packageName,
      private: true,
      version: "0.1.0",
      type: "module",
      scripts: {
        dev: "vite --host 127.0.0.1",
        build: "vite build",
        preview: "vite preview --host 127.0.0.1",
      },
      dependencies: { "@journeys/design-tokens": "workspace:*" },
      devDependencies: { vite: "^7.0.4" },
    },
    null,
    2
  )}\n`
);
writeFileSync(
  resolve(appDir, "vite.config.js"),
  `import { defineConfig } from "vite";\n\nexport default defineConfig({\n  base: "/career/${slug}/",\n});\n`
);
writeFileSync(
  resolve(appDir, "index.html"),
  `<!doctype html>\n<html lang="zh-CN">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>${slug} | Leo Zhou</title>\n</head>\n<body>\n  <main>\n    <p>Personal Journey</p>\n    <h1>${slug}</h1>\n    <p>Replace this scaffold with the story for this journey.</p>\n  </main>\n  <script type="module" src="/src/main.js"></script>\n</body>\n</html>\n`
);
writeFileSync(resolve(appDir, "src/main.js"), `import "./style.css";\n`);
writeFileSync(
  resolve(appDir, "src/style.css"),
  `@import "@journeys/design-tokens/theme.css";\n\n:root {\n  font-family: var(--journey-sans);\n  color: var(--journey-ink);\n  background: var(--journey-paper);\n}\n\nbody {\n  margin: 0;\n  min-height: 100vh;\n}\n\nmain {\n  width: min(720px, calc(100% - 40px));\n  margin: 0 auto;\n  padding: 96px 0;\n}\n`
);

const registryPath = resolve(ROOT, "registry/journeys.json");
const registry = JSON.parse(readFileSync(registryPath, "utf8"));
registry.push({
  id: slug,
  app: packageName,
  title: { zh: slug, en: slug },
  summary: { zh: "待补充经历简介", en: "Add a journey summary" },
  period: "TBD",
  metric: "TBD",
  metricLabel: { zh: "指标", en: "Metric" },
  publicPath: `/career/${slug}/`,
  href: `https://t.zhouchangju.com/career/${slug}/`,
  locale: "zh-CN",
  status: "in-progress",
});
writeFileSync(registryPath, `${JSON.stringify(registry, null, 2)}\n`);

console.log(`Created ${packageName} and added it to registry/journeys.json.`);
