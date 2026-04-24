# Project: origin-ops-platform

## Overview
Proposal and discovery workspace for a client-facing platform that manages trade-compliance operations across multiple clients.

Current focus:

- frame the problem above BOM-only scope
- shape the proposal narrative
- define modules, rollout phases, and system boundaries
- prepare artifacts that can later become a proposal deck or solution brief

## Tech Stack
- Markdown-first documentation workspace
- Git for versioning
- No application stack chosen yet
- Future delivery format may be documents only, a static proposal site, or a lightweight web app prototype

## Architecture
- `docs/` — internal framing, scope, decisions, and solution notes
- `proposal/` — client-facing drafts, mostly in Vietnamese
- `notes/` — raw thinking, workshop capture, and early idea storage
- `.ai/` — AI context, decisions, and session handoff artifacts

## Build & Test
- No build pipeline yet
- For now, verify by reviewing Markdown artifacts directly
- If a proposal site is added later, document the run/build commands here

## Skills
- `/tdd` — test-driven development
- `/rev` — two-stage code review
- `/fix` — systematic debugging
- `/discover` — explore before building
- `/handoff` — session summary + STATUS.md update

## Conventions
- Keep internal framing docs in English unless they are clearly client-facing
- Keep client-facing proposal drafts in Vietnamese
- Do not pull raw client case data into this repo
- Reference source case repositories in prose when needed; do not duplicate local data artifacts here
- Avoid calling the system an ERP unless the scope truly includes finance, procurement, warehouse execution, and production control
- Treat BOM as one core module inside a broader trade-compliance operations platform
- Before proposing implementation architecture, settle tenant model, data model center, and system role versus ERP

## Context Files
- `.ai/STATUS.md` — Current progress and next steps
- `.ai/DECISIONS.md` — Architecture decisions and rationale
- `.ai/GLOSSARY.md` — Domain-specific terms
- `.ai/sessions/` — Dated session summaries and primary handoff artifacts
