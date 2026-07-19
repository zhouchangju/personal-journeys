import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(fileURLToPath(new URL("../dist/", import.meta.url)));
const HOST = "127.0.0.1";
const PORT = Number(process.env.PREVIEW_PORT ?? 4173);
const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

const server = createServer((request, response) => {
  const requestPath = decodeURIComponent(new URL(request.url ?? "/", `http://${HOST}`).pathname);
  const candidate = resolve(join(ROOT, `.${requestPath}`));
  if (!candidate.startsWith(`${ROOT}/`) && candidate !== ROOT) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  let filePath = candidate;
  if (existsSync(filePath) && statSync(filePath).isDirectory()) {
    filePath = join(filePath, "index.html");
  }

  if (!existsSync(filePath) || !statSync(filePath).isFile()) {
    response.writeHead(404);
    response.end("Not found");
    return;
  }

  response.writeHead(200, {
    "Content-Type": MIME_TYPES[extname(filePath)] ?? "application/octet-stream",
  });
  createReadStream(filePath).pipe(response);
});

server.listen(PORT, HOST, () => {
  console.log(`Journey preview: http://${HOST}:${PORT}/career/toefl-study/`);
});
