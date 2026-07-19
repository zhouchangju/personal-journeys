# Deployment checklist

Use only after the user explicitly asks to publish.

## Before writing remotely

- Read repository-local deployment docs and adapter configuration.
- Confirm the exact domain, path, host, remote root, and build output.
- Confirm whether Homepage and journey output are separate targets.
- Inspect remote directories read-only; do not guess a broad target.
- Confirm whether an old public path must redirect, remain compatible, or be removed. Treat removal as a separate, explicit decision.

## Upload

- Build from a clean, known revision or record the working tree state.
- Upload only the intended generated files.
- Preserve unrelated files and avoid recursive destructive commands.
- Keep credentials out of commands, logs, repository files, and the skill.

## Verify

Check the final HTTPS URLs, expected status codes, page title, critical CSS/JS/image assets, exact public path, Homepage catalog entry, and mobile/desktop rendering. If deployment uses caching, verify both the origin and the public response when possible.

Report what was uploaded and what remains unverified.
