# Repository adapter

The generic skill should discover project-specific settings from repository docs or a small local configuration. Do not put personal server details in the shared skill.

An adapter may document fields like these:

```json
{
  "journeyRoot": "path/to/journey-repo",
  "homepageRoot": "path/to/homepage-repo",
  "registry": "registry/journeys.json",
  "homepageCatalogCommand": "pnpm export:homepage",
  "buildCommand": "pnpm build",
  "deploy": {
    "host": "documented-host-alias",
    "journeyRoot": "documented-remote-root",
    "homepageRoot": "documented-remote-root",
    "oldPathPolicy": "redirect|compatibility-copy|leave"
  }
}
```

Use aliases or documented environment variables for hosts where possible. Keep SSH keys, passwords, tokens, and private paths out of versioned files. If the adapter is missing or ambiguous, inspect the repo and ask before making an external write.
