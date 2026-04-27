# Customs Knowledge Platform — Architecture Positioning

This note documents the architectural positioning of Tinsu AI's Customs Knowledge Platform, implemented by **expanding Athena's existing scope** rather than building a parallel platform. The platform serves Athena UI (HS Code lookup) plus Barry-CO from Phase 1, with Barry-BCQT, Siafu, TradeOps, and future specialty UIs integrating in subsequent phases.

This is positioning + architecture sketch, not a build spec. Detailed tech-stack decisions are gated on partner conversation about Athena's existing infrastructure (see "Pending Decisions").

## Position Statement

Athena was built as a HS Code lookup tool with fuzzy match by product name, currently in production serving TT-HN staff. The proposed direction: **expand Athena's scope to become Tinsu AI's Customs Knowledge Platform** — the shared knowledge layer serving Athena UI plus Barry-CO (from Phase 1) plus Barry-BCQT, Siafu, TradeOps, and future specialty UIs (in subsequent phases).

This is **option A — promote Athena**. Two alternatives considered:

- **Option B:** Build a separate KB platform; Athena migrates from owning its data to consuming KB API
- **Option C:** Build a separate KB platform standalone; Athena keeps current scope and calls KB only when needed

Reasoning for option A is in "Why Athena Evolution" below.

## Product Strategy

Tinsu AI's product portfolio organizes into two commercial tracks:

| Track | Products | Audience | Commercial model |
|---|---|---|---|
| Per-broker B2B (ops layer) | TradeOps + Siafu + Barry-CO + Barry-BCQT | Customs brokers (TT-HN, future brokers) | Per-deployment licensing |
| Shared SaaS (knowledge layer) | Athena platform (HS UI + expanded scope) + future specialty UIs | Broker staff currently; planned public users | Subscription / freemium / pay-per-query (when public rollout commits) |

The two tracks have distinct audiences, pricing, and GTM. They share Tinsu AI as the vendor but are otherwise commercially independent.

The Customs Knowledge Platform is the engine of the shared SaaS track. **It is implemented by expanding Athena's scope, not as a separate parallel platform.** It is not part of TradeOps and not part of the TradeOps Phase 1 proposal to TT-HN.

## Why Athena Evolution (Option A)

Three approaches considered:

| Option | Description | Greenfield cost | Compound benefit | Coupling cost |
|---|---|---|---|---|
| **A. Promote Athena** (chosen) | Athena scope expands to Customs Knowledge Platform | Low — leverage Athena's existing infra | Concrete, day-1 with Barry-CO as second consumer | Athena evolution + API design must satisfy Barry-CO needs |
| B. Build separate KB platform; Athena migrates onto it | KB is new platform; Athena refactors to consumer | High — greenfield platform | Equivalent to A in principle | Athena must be refactored to consume KB API |
| C. Build separate KB platform; Athena unchanged | KB is independent service; Athena calls when needed | Medium — KB built, Athena unchanged | Lower — Athena does not enrich content via KB | Lowest |

**Reasoning for A:**

- **Lower greenfield cost** — leverages Athena's production infrastructure; no parallel platform build
- **Concrete near-term consumer** — Barry-CO is in active build for TT-HN and needs CO knowledge access; the platform must serve Barry-CO from day 1, not in some future Phase 3
- **Identity preservation for Athena** — Athena becomes the platform, not a "specialty UI on top of someone else's platform"
- **Compound benefit grounded** — each piece of CO knowledge added to Athena serves Athena UI (HS lookup with FTA context) plus Barry-CO (CO compliance) plus future tools, with the second consumer concrete from day 1

**Steelman for C as fallback:** option C is the right primary if Athena's tech stack cannot accommodate broader content scope without significant rework. C lets Athena and the new KB evolve independently with a stable API contract — lower coordination cost in a 2-person company. Until partner can confirm Athena's tech stack supports semantic retrieval over regulatory text + structured FTA rules + template storage, A vs C is genuinely open. See "Pending Decisions".

**Why not B:** B has the worst trade-off — builds a parallel platform AND requires Athena refactor. Greenfield cost of B without identity benefit of A.

## Architecture Sketch

```
+---- Shared SaaS infrastructure (Tinsu AI hosts) -----------+
|                                                            |
|  +-- Customs Knowledge Platform (Athena evolved) --+       |
|  | Content repository:                              |       |
|  |  - HS Code reference (current)                   |       |
|  |  - Regulatory text (NĐ, TT, luật)                |       |
|  |  - FTA origin rules per Form                     |       |
|  |  - Phụ lục templates (TT 05/2018/TT-BCT)         |       |
|  |  - Quy trình sản xuất templates                  |       |
|  |  - Precedent dossiers (sanitized)                |       |
|  |  - BCQT methodology references                   |       |
|  |  - Tinsu AI internal know-how                    |       |
|  |                                                  |       |
|  | Retrieval infrastructure:                        |       |
|  |  - fuzzy match (current; HS lookup)              |       |
|  |  - structured search (FTA rules, templates)      |       |
|  |  - semantic search (regulatory text via vector)  |       |
|  |                                                  |       |
|  | API surface (REST / GraphQL):                    |       |
|  |  - /hs-code/lookup (current)                     |       |
|  |  - /fta-rules?hs=...&form=...                    |       |
|  |  - /regulations/{thong-tu-id}/article/{n}        |       |
|  |  - /templates/{type}                             |       |
|  |  - /precedent?co-form=...&hs-heading=...         |       |
|  |                                                  |       |
|  | 3-layer IP enforcement:                          |       |
|  |  - provenance field (required on every entry)    |       |
|  |  - elevation record (for cross-broker entries)   |       |
|  +--------------------------------------------------+       |
|         ^              ^               ^                    |
|         | API          | API           | API                |
|         |              |               |                    |
|  +------+------+ +-----+-----+  +------+------+             |
|  | Athena UI  | | (future:  |  | (future:    |             |
|  | HS Code    | |  FTA      |  |  BCQT       |             |
|  | lookup     | |  assistant|  |  methodology|             |
|  | (current)  | |  Phase 3) |  |  helper,    |             |
|  +------------+ +-----------+  |  Phase 3)   |             |
|                                +-------------+             |
+------------------------------------------------------------+
                          ^
                          | API (public contract)
                          |
+-- Per-broker B2B (each broker deployment) -----------------+
|                                                            |
|  TradeOps + Siafu + Barry-CO + Barry-BCQT                  |
|                                                            |
|  Phase 1 consumer:                                         |
|   - Barry-CO: FTA rules, Phụ lục templates, precedent,     |
|     origin criteria, HS reference                          |
|                                                            |
|  Phase 2+ consumers:                                       |
|   - Barry-BCQT: Mẫu 16 methodology, BCQT references        |
|   - Siafu: HS classification, declaration references       |
|   - TradeOps: regulatory citations for workflow steps      |
+------------------------------------------------------------+
```

The two tiers are commercially and operationally distinct: shared SaaS (top) is hosted by Tinsu AI as one infrastructure; per-broker (bottom) is a separate deployment per broker. They communicate only via the platform's public API contract.

## 3-Layer IP Model with Enforcement Primitive

Knowledge in the system splits into three layers. The split is enforced at the architecture level — not as policy — to avoid the design-partner trap (TT-HN's methodology bleeding into broker #2 deployment).

| Layer | Contents | Where it lives | Accessible to |
|---|---|---|---|
| Shared (Tinsu AI cross-broker) | Public regulatory text, FTA rules, general broker patterns, HS reference, anonymized common methodology | Athena platform | All consumers + all broker deployments |
| Per-broker private | Broker's internal methodology (TT-HN's CO review checklist, internal training, custom forms) | Inside the broker's TradeOps deployment | Only broker staff in their own deployment |
| Per-end-client | DN-specific information (suppliers, internal codes, dossier history) | End-client workspace inside broker's TradeOps | Broker staff with authorization for that end-client |

### Concrete Enforcement Primitive

Every entry in the shared layer must carry:

- **Provenance field** — required, non-null. Examples: `"TT 38/2015 Article 60"`, `"BCT guideline 2024-Q3"`, `"anonymized pattern derived from broker engagement, elevated 2026-04-27"`
- **Elevation record** (required for any content derived from broker engagement) — signed audit entry naming source broker, consent artifact reference, anonymization steps applied, reviewer identity, elevation date

Without provenance + elevation record, content cannot enter the shared layer. Enforced at three levels (defense in depth):

- **Schema level** — NOT NULL constraints on provenance; foreign key from cross-broker-derived entries to elevation records table
- **API ingestion level** — endpoint rejects entries lacking required metadata
- **CI / review level** — PR checks for elevation records on any content originating from broker context

Default direction: per-broker stays per-broker. Elevation to shared is an explicit step with audit trail, not implicit behavior.

This is the architectural answer to "is TT-HN's knowledge being shared with broker #2?" — only if explicitly elevated with consent, and the audit record proves it.

## Integration Surfaces

The platform exposes a single primary integration surface: **REST / GraphQL API**.

### REST / GraphQL API (Phase 1 onward)

For deterministic, programmatic integration. Workflow steps in TradeOps + 3 apps call known endpoints with known parameters. Examples:

- `GET /hs-code/lookup?desc=...` — fuzzy match HS Code by description (current Athena functionality, preserved)
- `GET /fta-rules?hs=8421.31&form=D` — FTA origin rules for an HS code under a specific Form
- `GET /regulations/{thong-tu-id}/article/{n}` — specific regulation article retrieval
- `GET /templates/{type}` — Phụ lục X / quy trình sản xuất / etc. template retrieval
- `GET /precedent?co-form=D&hs-heading=8421` — precedent dossier examples (sanitized per IP layer rules)

### MCP server (Phase 3, gated on concrete LLM consumer)

Anthropic's Model Context Protocol enables LLM-based features to discover tools / resources / prompts dynamically. As of Phase 1 planning, no consumer system has LLM features; building MCP server now would be infrastructure ahead of demand.

MCP is added when at least one of these arrives:

- A specialty UI with LLM-based UX is being built (e.g., FTA origin assistant with conversational interface)
- A consumer system (Barry-CO, etc.) adds an AI-assisted workflow that benefits from dynamic tool discovery
- Concrete partner / customer demand surfaces a specific use case

Until then, REST / GraphQL API serves all current and Phase 1-2 consumers.

## Phased Roadmap

### Phase 1 — Expand Athena scope, integrate Barry-CO

Scope:

- Expand Athena's content beyond HS Code: regulatory text (chain TT 38/2015 → khoản 39 Điều 1 TT 39/2018 → TT 121/2025/TT-BTC; TT 05/2018/TT-BCT; TT 11/2020; NĐ 31/2018; LHQ 2014; NĐ 08/2015 sửa đổi NĐ 59/2018; Luật Khiếu nại 2011; BLHS 2015 sửa đổi 2017); FTA origin rules per Form; Phụ lục X templates; quy trình sản xuất templates; precedent dossiers (sanitized)
- Expand retrieval API: from fuzzy match by name → structured query for FTA rules / templates / regulatory articles + retain fuzzy match for HS
- Implement provenance field + elevation record primitive for 3-layer IP model
- Athena UI continues serving HS lookup (optionally enriched with FTA context if schema supports)
- Barry-CO integrates as primary new consumer via API from day 1

**Effort band:** 3-5 engineer-months total. Composition:

- Schema + ingestion pipeline expansion: ~1-2 person-months
- Regulatory + CO knowledge ingestion + curation: ~1-1.5 person-months
- API surface expansion + Barry-CO integration: ~1-1.5 person-months
- Provenance + elevation primitive implementation: ~0.5 person-months

**Phase 1 deliverable:** Athena platform serves HS lookup + Barry-CO's CO knowledge needs via API; provenance / IP enforcement primitive operational.

**Phase 1 explicitly excludes:**

- MCP server (defer Phase 3)
- Per-broker private knowledge layer in TradeOps (defer Phase 2)
- Specialty UIs beyond Athena UI's current HS lookup
- Public Athena rollout
- Conversational AI assistant features

### Phase 2 — Per-broker private layer + Barry-BCQT integration

Scope:

- Implement per-broker private knowledge layer in TradeOps (broker-specific methodology, internal training, custom forms)
- Barry-BCQT integrates: BCQT methodology + Mẫu 16 templates + reconciliation references
- Multi-tenant readiness for Athena if public rollout decision is made

**Effort band:** 2-3 engineer-months.

**Gate to Phase 2:** Phase 1 stable; broker-specific content needs surfaced concretely from TT-HN engagement.

### Phase 3 — MCP + new specialty UIs

Scope:

- MCP server exposing platform content for LLM-based consumers — gated on concrete AI-feature consumer being ready
- New specialty UIs as demand surfaces — FTA origin assistant, BCQT methodology helper, training delivery — each gated on real demand, not built speculatively
- Public Athena rollout if commercial decision matured (after market validation)

**Effort band:** demand-driven, TBD.

## Curation Operating Cost

Regulatory content evolves continuously. TT 121/2025/TT-BTC effective 01/02/2026 superseded TT 39/2018 templates for Mẫu 15 / 15a / 16 — a recent canary for ongoing curation cost.

**Estimate per change type:**

- Minor TT amendment (reference update, minor template change): ~0.5-1 day for re-ingestion + citation update + downstream consumer cache validation
- Major instrument (TT 121/2025-scale, schema-impacting template change): ~1-2 weeks for schema review, content rewrite, downstream tool validation across consumers

**Annualized estimate:** ~0.2-0.3 FTE for ongoing curation, assuming 6-10 minor changes + 1-2 major changes per year. Higher if coverage scope expands.

**Owner options:**

- **In-house** — partial allocation of one team member; deep context but distracts from product build
- **External customs consultant** — quarterly reviewer; domain depth but handoff overhead
- **Hybrid** — in-house technical curation + external domain review; recommended for the first 2 years

Curation owner must be assigned before Phase 1. Without ongoing curation, content goes stale and trustworthiness collapses within 6-12 months.

## Out of Scope

Explicitly deferred to avoid premature abstraction:

- Specific vector store / embedding model choice (deferred to Phase 1 implementation; depends on Athena's existing tech stack — see Pending Decisions)
- MCP server and tool catalog (Phase 3; gated on concrete LLM consumer)
- Conversational AI assistant features (Phase 3+; not a platform concern per se)
- Per-broker private knowledge layer infrastructure inside TradeOps (Phase 2)
- Public Athena pricing model and GTM (separate commercial-track decision; deferred until market validation)
- Specialty UIs beyond Athena UI's current HS lookup (Phase 3, demand-gated)
- Content beyond regulatory text + CO knowledge for Barry-CO + Tinsu AI internal know-how at Phase 1 — expand based on what surfaces in real consumer use

## Pending Decisions (Partner Input Required)

These cannot be locked without partner conversation about Athena's existing tech and roadmap:

1. **Athena tech stack** — fuzzy match implementation: Postgres trigram? Elasticsearch? Vector embedding (which model)? Hybrid? Determines whether Phase 1 expansion is incremental or requires structural rework
2. **Athena data model** — HS Code data source and update cadence; schema flexibility for adding regulatory text, FTA rules, templates, precedent
3. **Athena codebase / deployment topology** — pluggability for new content types versus monolith schema rigidity
4. **Multi-content-type retrieval support** — does Athena currently have semantic search (vector embedding) or only keyword fuzzy match? Phase 1 needs both
5. **Authentication / access control evolution** — current single-tenant TT-HN staff; Phase 1+ requires multi-consumer auth model

If answers to 1-4 indicate Athena's tech stack does not accommodate broader content scope without major rework, fall back to **option C**: build separate KB platform standalone, keep Athena focused on HS Code, communicate via API. Higher greenfield cost but decoupled from Athena's existing architecture constraints.

## Risks

- **Athena tech stack constraints** — if Phase 1 expansion requires structural rework, the effort band breaks. Mitigation: confirm via Pending Decisions 1-4 before locking Phase 1 plan
- **Coupling: Phase 1 timeline ↔ Barry-CO build timeline** — Barry-CO needs CO knowledge from Phase 1 onward; if Phase 1 slips, Barry-CO may build siloed (path A in `de-an-kb-platform.md` § 3). Mitigation: prioritize CO-specific content ahead of broader regulatory text in Phase 1
- **3-layer IP enforcement gap** — provenance + elevation primitive is an architectural invariant, but engineers may bypass under deadline pressure. Mitigation: encode at schema level + API endpoint level + CI checks (defense in depth)
- **Audience drift for Athena UI** — Athena currently positioned for HS Code lookup users. Broader knowledge scope risks UX dilution if HS / FTA / BCQT users need different UIs. Mitigation: Athena UI keeps HS focus; future entry points (FTA assistant, etc.) are separate specialty UIs on the same platform
- **Curation owner gap** — without assignment before Phase 1, content goes stale and collapses platform trustworthiness within 6-12 months
- **Public Athena market unverified** — alternatives exist (TCHQ free HS lookup, KPMG/Deloitte paid customs reference); not load-bearing for Phase 1, but requires market validation before commercial commitment in Phase 3
- **Partner alignment on Athena evolution** — option A asks partner to expand Athena's roadmap to include serving Barry-CO and future consumers; if partner declines or signals significant rework, fallback to option C. Strategy memo for alignment is `de-an-kb-platform.md`

## Related Documents

- `../de-an-kb-platform.md` — strategic positioning + commercial context, partner-facing in Vietnamese; this architecture doc is the technical companion
- `../../proposal/de-xuat-tradeops-chi-tiet-vi.md` — TradeOps proposal; Phase 2-3 will reference platform integration after partner alignment
- `file-storage.md` — TradeOps file storage architecture (per-broker, separate from this platform)
