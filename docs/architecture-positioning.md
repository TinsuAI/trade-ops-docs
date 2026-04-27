# Architecture Positioning

## Overview

A single TradeOps deployment serves one customs broker as the broker's **portfolio and operations platform**. The broker uses TradeOps every day to manage the entire portfolio of end-clients across years: who the clients are, what dossiers exist, who is working on what, what the history is, and what is defensible under audit.

Three specialized workflow apps — Siafu, Barry-CO, and Barry-BCQT — are built alongside TradeOps under the same Tinsu AI engagement. They fire on specific business triggers (a declaration to file, a CO request, a year-end BCQT) and integrate with TradeOps to consume shared master data and write back their compliance outputs as part of the broker's dossier history.

This document records the positioning of TradeOps relative to those three apps and the deployment model.

## Components

| Component   | Owner     | Built by             | Role                                                                                           |
|-------------|-----------|----------------------|------------------------------------------------------------------------------------------------|
| TradeOps    | Tinsu AI  | (proposed)            | Portfolio + ops platform — dossier & client mgmt, document control, audit trail; plus per-end-client master data (item, BOM, inventory views) |
| Siafu       | Tinsu AI  | User's partner       | Workflow accelerator — customs declarations (TKXK / TKNK)                                      |
| Barry-CO    | Tinsu AI  | User                 | Workflow accelerator — CO origin dossier preparation                                           |
| Barry-BCQT  | Tinsu AI  | User                 | Workflow accelerator — annual customs settlement reporting                                     |

All four components belong to Tinsu AI. Within the team, the user builds Barry-CO and Barry-BCQT; the user's partner builds Siafu. TradeOps is the proposed new component covered by this proposal. All three workflow apps are currently being built for the broker as part of the same overall offering.

## Why the three workflow apps cannot do this work

A reasonable reader will ask: "If your three apps already store per-client BOM, dossiers, and supporting docs for their respective workflows, why is a separate TradeOps platform necessary?" The answer is that each workflow app holds **only the data needed for its own compliance task** — and a customs broker's actual operating reality lives substantially outside those three task scopes.

What each app holds:

- **Barry-CO** holds BOM, source-NVL C/Os, supporting documents, and CO inventory **for the export shipment whose CO is being prepared**.
- **Siafu** holds declaration line items and attached documents **for the declaration being filed**.
- **Barry-BCQT** holds the period-flow data and reconciliation working set **for the BCQT being prepared**.

What none of the three apps owns:

- **The broker's portfolio of end-clients** — which clients are on the books, their state, who is assigned to each. Each app sees only its own subset of clients and only the work in its own domain.
- **Documents arriving outside any compliance trigger** — Zalo files, scanned documents on email, internal-routing copies that have not yet entered any workflow.
- **Cross-workflow data continuity** — the technical BOM Barry-CO uses to support a CO at the moment of export and the actual-consumption Định mức Mẫu 16 Barry-BCQT produces for year-end settlement must remain reconcilable against the same SP–NVL flow; without a shared master-data store and shared period-flow data, those reconciliations cannot be performed.
- **Operational work that does not fire any compliance app** — document intake and classification, dossier opening, staff assignment, ownership reassignment when staff leave, handover.
- **Cross-year reconstruction of an entire dossier's processing chain** — the chain runs across all three apps plus the parts that lived outside any app, and no single app can reconstruct it.

For **kiểm tra sau thông quan (post-clearance audit)** specifically: each of the three apps must retain its own dossiers for the regulatory 5-year window for its own scope of work. But if an audit query requires reconstructing the complete processing chain of a dossier — including documents that never entered any app, classification decisions, ownership history, internal exchanges — that reconstruction work lives outside the three apps' scope by design and cannot be added to them without rebuilding each into a portfolio system.

This is the work TradeOps is for.

## Stack Diagram

```
+----------------- Broker deployment (one per broker) -----------------+
|                                                                       |
|  +---- TradeOps platform ----+    +-- Workflow accelerators -------+ |
|  |                            |    | Separate apps in same          | |
|  | Modules used continuously  |    | deployment, integrate with     | |
|  | by ops staff:              |    | TradeOps via API contracts.    | |
|  |   1. Dossier & client mgmt |    | Each fires on a specific       | |
|  |   2. Document control      | <->| business trigger.              | |
|  |   3. Audit trail           |    |                                | |
|  |                            | <->| [ Siafu       ]                | |
|  | Per-end-client             |    |   trigger: TKNK / TKXK         | |
|  | master-data modules:       |    |                                | |
|  |   4. Item master + code    | <->| [ Barry-CO    ]                | |
|  |   5. BOM + period-flow     |    |   trigger: a new CO request    | |
|  |   6. Multi-view inventory  |    |                                | |
|  +----------------------------+ <->| [ Barry-BCQT  ]                | |
|                                    |   trigger: year-end BCQT       | |
|  End-client workspaces inside      +--------------------------------+ |
|  TradeOps: DN1, DN2, ...                                              |
|  (multi-end-client tenancy at the                                     |
|   application layer)                                                  |
+-----------------------------------------------------------------------+

Tinsu AI runs a separate deployment for each broker customer.
TradeOps and the three workflow apps each have their own codebase and data
store inside the broker's deployment; integration is via published API
contracts, not via shared-database direct access. Brokers share neither
infrastructure nor data with each other.
```

## Data Flow Examples

**Daily portfolio operations (handled by ops team in TradeOps; no workflow trigger).**

This is the primary use of TradeOps and represents most ops-team activity, regardless of whether any compliance workflow is firing.

1. Documents arrive from end-clients via Zalo / email / file share. Ops staff opens TradeOps, intakes the documents through Module 2 (Document control), classifies them (Invoice / B/L / Packing List / etc.), tags the source channel, and links them to the relevant end-client and dossier in Module 1.
2. Staff updates dossier status in Module 1 — assigns owner, sets deadline, marks blockers.
3. Staff retrieves a similar dossier from a prior year via Module 1 search to use as a working reference.
4. Audit trail (Module 3) captures all changes.
5. No workflow app is involved. This portfolio activity happens many times per day per ops team member.

**Workflow accelerator: New TKNK arrives (handled by Siafu when triggered).**

1. Siafu reads item master from TradeOps (via API) to identify NVL on the import.
2. Siafu reads existing supporting docs from TradeOps' document control if any have been ingested.
3. Siafu produces the declaration record and writes it back to TradeOps as part of the dossier history with linked supporting documents.
4. TradeOps' multi-view inventory updates the BCCT-derived balance view and the physical-arrival working set.
5. Audit trail captures the change.

**Workflow accelerator: New CO request for an export shipment (handled by Barry-CO when triggered).**

1. Barry-CO reads item master + BOM + tồn CO + relevant supporting documents (TKXK, Invoice, B/L, NVL C/Os, định mức, production process description, plus Phụ lục X if a domestic-Vietnam-supplier upstream input is used) from TradeOps via API.
2. Barry-CO assembles the CO dossier; staff complete origin working data using the criteria appropriate to the form and rule. **PSR governs when present** (per Form's annex); only when no PSR applies does the general rule apply (Form D general = WO / RVC ≥ 40% / CTH, trader's choice between RVC40 and CTH where both are offered). CPTPP and RCEP rely heavily on PSR per heading. For EVFTA / UKVFTA outbound (VN → EU / UK): EUR.1 issued by Bộ Công Thương if FOB > 6.000 EUR, exporter self-cert on commercial document if ≤ 6.000 EUR.
3. Dossier is submitted via the appropriate issuance channel — for preferential Forms, non-preferential Form B / CNM, and EVFTA EUR.1 above the 6.000 EUR threshold, this is **eCoSys** (Bộ Công Thương / Cục XNK). Non-preferential / Form B / CNM / REX issuance returned to MOIT under QĐ 1103/QĐ-BCT (21/4/2025), with VCCI ceasing issuance of those from 5/5/2025. For EVFTA / UKVFTA shipments at FOB ≤ 6.000 EUR, the exporter self-certifies on the commercial document with no eCoSys submission.
4. The completed dossier — with issuance reference and final C/O (or self-cert document) — is written back to TradeOps as part of the dossier history with status and links to all supporting artifacts.
5. Tồn CO updates in TradeOps' multi-view inventory.
6. Audit trail captures the change.

**Workflow accelerator: Annual BCQT preparation (handled by Barry-BCQT when triggered).**

1. Barry-BCQT reads item master + BOM (technical norm) + multi-view inventory + accounting NXT (imported into TradeOps from accounting) + DS NVL HQ + DS SP HQ + BCCT HQ + period-flow aggregates (total SP exported, total NVL imported, actual NVL consumption including tiêu hao) for the period via API.
2. Barry-BCQT computes **Định mức Mẫu 16** — the annual weighted-average NVL consumption per SP — from the actuals; it does NOT copy the technical BOM into Mẫu 16.
3. Barry-BCQT runs reconciliation across views and produces a BCQT working set.
4. Working set is written back to TradeOps as part of the dossier history with reconciliation results, divergence notes, and supporting links.
5. Audit trail captures the change.

## Why This Split Works

- **TradeOps is the broker's portfolio and history layer — work that happens continuously and is categorically not a "workflow".** The broker manages a roster of end-clients, intakes documents, opens dossiers, defends audits over years. None of that is triggered by a single compliance event; it is the ongoing operating environment.
- **The three workflow apps are specialized accelerators triggered by specific compliance events.** Their codebases stay small, focused, and fast at their specific task. They do not need to re-implement portfolio management, document control, or audit trail.
- **Master data lives in one place** — item catalog, BOM, code translations — so it stays consistent for both the broker's daily operations and the integrated workflow apps' compliance outputs. A correction propagates immediately wherever the master data is read.
- **Audit defense is unified.** Every change across the platform and the integrated workflow apps is recorded in a single audit trail spanning years. This is what makes kiểm tra sau thông quan defensible.
- **Internal codebase boundaries within Tinsu AI are respected.** TradeOps exposes data over **published API contracts**, not through shared-database direct access. Siafu (built by the user's partner) and the Barry apps (built by the user) integrate through those contracts rather than being absorbed.

## Deployment Model

- Each broker customer gets a **separate, independent deployment**.
- Brokers share neither infrastructure nor application data.
- Selling TradeOps to a new broker is a deployment task at Tinsu AI, not a configuration change inside an existing deployment.
- The application's tenant model is **single-level**: multi-end-client within one broker's instance. There is no "broker" entity in the data model.
- Inside a deployment, TradeOps and the three workflow apps each have their own codebase and data store; they are wired together through published API contracts. There is no shared database, no shared schema, no shared foreign keys across components.
