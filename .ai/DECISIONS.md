# Architecture Decisions

## [2026-04-24] Separate Proposal Workspace From Case Analysis
**Context:** The Growatt case repository contains deep case-specific analysis, local data artifacts, and execution outputs. A broader product proposal for a multi-client operational platform would become noisy and hard to maintain if it stayed in that repo.
**Decision:** Create a separate docs-first project at `/home/vp/workspace/client/origin-ops-platform`.
**Alternatives:** Keep proposal notes inside the Growatt case repo; create only a subfolder inside the existing repo.
**Consequences:** Proposal framing stays clean, client-facing documents can evolve independently, and raw case artifacts remain isolated.

## [2026-04-24] Position The Product Below ERP, Above Simple Document Storage
**Context:** The emerging scope covers BOM, CO dossiers, customs declarations, and settlement reporting, but does not yet include the full finance, procurement, warehouse execution, or production-control surface of ERP.
**Decision:** Frame the product as a trade-compliance operations platform, not a full ERP.
**Alternatives:** Pitch it as a BOM builder; pitch it immediately as ERP.
**Consequences:** The proposal can stay credible, focused, and expandable without overpromising on enterprise breadth too early.

## [2026-04-24] Start As A Docs-First Proposal Project
**Context:** The immediate need is to shape the narrative, scope, and rollout logic. There is no confirmed app stack yet.
**Decision:** Use a Markdown-first repository with proposal and discovery documents before choosing a software stack.
**Alternatives:** Scaffold a web app immediately; start directly with a slide deck only.
**Consequences:** The project can move quickly on framing while keeping technical options open.
