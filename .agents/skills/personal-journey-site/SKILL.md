---
name: personal-journey-site
description: Create or update a fact-checked personal journey website from notes, documents, images, scores, transcripts, or other first-person materials. Use for learning and exam retrospectives, career changes, project stories, travel, or life milestones when the task includes narrative writing, editorial web design, Homepage or catalog synchronization, build and test validation, or explicit static-site deployment.
---

# Personal Journey Site

Use this skill to turn a real personal experience into a readable, human-sounding story website and, when explicitly requested, validate and publish it. Treat the website as an independent reading experience, not as a slide deck or a collection of AI-generated slogans.

## Operating principles

- Establish evidence before writing polished prose. Separate confirmed facts, missing information, and inference.
- Never invent dates, scores, locations, routines, motivations, people’s actions, policy outcomes, or scenes. Do not put unconfirmed inference into final copy.
- Preserve first-person voice, hesitation, mixed feelings, setbacks, and ordinary details when they explain what happened.
- Explain causality. A conclusion such as “it was difficult” needs the constraints and events that made it difficult.
- Use checkpoints. Confirm the fact ledger, two representative paragraphs, and two representative visual sections before expanding the page.
- Review content correctness and visual quality separately.
- Prefer simple editorial layouts, readable type, restrained motion, and evidence-led graphics. Avoid template card grids, oversized slogans, forced drama, and motion that consumes scroll without adding meaning.
- Keep private source material and credentials outside public repositories and generated output.
- Build and deploy only within the user’s requested scope. Publishing, pushing commits, and changing external systems require explicit authorization.

## Workflow

### 1. Discover the project boundary

Inspect the current repository’s `AGENTS.md`, project docs, registry, scripts, existing journey apps, and any sibling Homepage repository. Check `git status`, remotes, package scripts, Vite `base`, public paths, generated catalog locations, and deployment configuration before making assumptions.

Do not hardcode a server, domain, repository path, or credential into this global skill. Use repository-local adapter documentation or configuration; see `references/repository-adapter.md`.

### 2. Build an evidence ledger

From the user’s notes and supplied assets, extract:

- timeline and event order;
- exact numbers, scores, dates, costs, and durations;
- what each person did or did not do;
- places, routines, constraints, decisions, and outcomes;
- direct wording that the user wants preserved;
- documents or images that can serve as evidence.

Mark every item as `confirmed`, `needs-confirmation`, or `inference/forbidden`. Keep the ledger as working material; do not publish it automatically. Ask only questions that materially affect the story. Before writing final copy, show the user the uncertain or high-impact items for confirmation.

Use `references/fact-ledger-template.md` when a structured ledger is helpful.

### 3. Design the story before the page

Create a plain-language story spine, usually:

`context and motivation → constraints → first attempt → friction or failure → adjustment → result → aftereffect and reflection`

Adapt this spine to the facts. Do not manufacture a dramatic turning point, a neat success arc, or a lesson the user did not express.

Write two sample passages before writing the full page:

1. one fact-heavy passage that explains context and causality;
2. one passage that captures a change in feeling, judgment, or behavior.

Pause for the user’s voice check. Revise toward the user’s natural, plainspoken technical-professional style rather than toward motivational copy.

Use the optional narrative lenses in `references/narrative-visualization.md`. Hero’s Journey is a diagnostic lens, not a required structure: retain only stages that are true, and allow an ordinary, unresolved, or non-heroic ending.

### 4. Prototype two visual regions

Before implementing the entire site, design two representative regions:

- a prose-led region that tests line length, type size, spacing, and standalone readability;
- an evidence-led region that tests a timeline, comparison, score chart, document image, process, or restrained scroll interaction.

Confirm the visual direction before scaling it across the page. Choose the representation from the narrative need: a score change may need a comparison, a routine may need a schedule, a policy consequence may need a timeline, and a repeated attempt may need a loop. Motion should reveal change or relation and should respect reduced-motion preferences.

### 5. Implement the journey app

Follow the repository’s conventions and existing design tokens. Keep the story’s narrative code and assets within its app. Update Vite `base` and the registry `publicPath` together. Make the page readable without a live explanation, keyboard-usable, responsive, and meaningful with motion disabled.

For certificates, IDs, transcripts, or other personal documents, apply a privacy check before publication: confirm that the user wants the image public and redact information when appropriate.

### 6. Synchronize Homepage or catalog data

Update the journey registry first. Run the repository’s documented export command to regenerate Homepage catalog data; never hand-edit generated catalog files unless the project documentation explicitly requires it. Inspect the diff and verify the Homepage link, title, summary, path, and ordering.

Run both sides’ relevant tests and builds when the Homepage is in scope. Treat the journey repository and Homepage repository as one user-visible change, while preserving their separate commit boundaries.

### 7. Verify locally and publish only when asked

At minimum, run the project’s validation, contract tests, and production builds. Preview the exact public path and check:

- the first screen, typography, long paragraphs, and mobile layout;
- all supplied images and key links;
- no placeholders, invented facts, broken assets, or accidental private material;
- the Homepage catalog points to the intended URL;
- old URLs are redirected or retained according to documented migration policy.

When the user explicitly requests deployment, read the project’s deployment adapter and use `references/deployment-checklist.md`. Resolve the exact remote target with read-only checks, upload only the intended build output, avoid destructive recursive deletion, then verify HTTP status, title, key assets, journey URL, and Homepage URL. Do not push commits unless that is also explicitly requested.

## Handoff

Report the confirmed story scope, unresolved facts, narrative and visual decisions, changed files, validation commands and results, deployed URLs if applicable, and any remaining risk. Keep the report concise enough to audit.

## References

- `references/narrative-visualization.md` — optional story structures and visual mappings.
- `references/fact-ledger-template.md` — working template for evidence and uncertainty.
- `references/deployment-checklist.md` — preflight, remote safety, and post-deploy checks.
- `references/repository-adapter.md` — how a project should expose local paths and deployment settings without embedding them in this skill.
