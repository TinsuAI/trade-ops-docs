# Workflow Design Overview

This directory describes the operational workflows TradeOps supports at a customs broker. Each flow document covers a scenario, the personas involved, the system states the dossier or end-client moves through, and what TradeOps records for audit-trail purposes.

These workflows describe the **work that lives in TradeOps** — portfolio-level operations and the orchestration around the three workflow apps. The three apps (Siafu, Barry-CO, Barry-BCQT) implement their own internal flows once invoked; those internal flows are not redocumented here.

## Design Principles

- **TradeOps owns the dossier lifecycle; the three apps are specialized engines invoked at specific steps.** Barry-CO does not own the request-to-issuance lifecycle of a CO; it does the dossier preparation work when invoked. Same for Siafu and Barry-BCQT.
- **Personas, not job titles.** Real broker org charts vary. The personas below describe the work shapes that need to be served. One person at TT-HN may carry multiple personas; broker #2 may split them differently.
- **States, not screens.** Flow documents specify the operational state of a dossier or end-client, not the UI. Screen design comes later from these states.
- **Audit-trail capture per step.** Every step that changes operational state declares what TradeOps records. This is the substrate for kiểm tra sau thông quan defense.
- **General vs TT-HN-specific section per flow.** Each flow ends with an explicit marker of which parts are expected to hold across brokers and which are TT-HN idiosyncrasies to validate later. This is the antidote to designing a "broker workflow standard" from a sample of one.

## Personas

| Persona | What they care about | Where they touch TradeOps |
|---|---|---|
| Trưởng phòng XNK | Portfolio health, deadlines across end-clients, staff allocation, audit risk | Portfolio dashboard, dossier-state board, assignment, escalation, sign-off |
| Nhân viên CO | Building correct, defensible CO dossiers per shipment | Document intake for the dossier, BOM lookup, tồn CO assignment, link sources, hand off to Barry-CO |
| Nhân viên BCQT | Reconciling year-end consumption against declarations | Period-flow data, multi-view inventory reconciliation, hand off to Barry-BCQT |
| Nhân viên TKXNK | Preparing customs declarations | Declaration metadata, document attachment, hand off to Siafu |
| Nhân viên intake | Receiving and classifying documents from end-clients across channels | Document intake, source tagging, classification, link to dossier or item |
| End-client point of contact | Submitting documents, tracking status (limited, Phase 3) | Submission interface, status visibility |

These personas describe TT-HN's expected operational work. At broker #2, distribution between personas may differ; the work shapes are expected to generalize.

## Module Numbering

Flow documents reference modules by number. Numbering matches `docs/solution-outline.md`:

```
Module 1 — Dossier & client management
Module 2 — Document control
Module 3 — Audit trail
Module 4 — Item master + code translation
Module 5 — BOM + period-flow data
Module 6 — Multi-view inventory
```

## Flow Inventory

| Flow | Trigger | Status |
|---|---|---|
| End-client onboarding | Broker takes on a new end-client | Drafted |
| CO dossier preparation | End-client requests CO for shipment | Drafted (domain-reviewed) |
| BCQT cycle | Year-end approaches for an end-client | Drafted (domain-reviewed) |
| Post-clearance audit response | HQ issues kiểm tra sau thông quan notice | Drafted (domain-reviewed) |
| Declaration preparation | Import or export shipment to file | Pending |
| Staff handoff | Personnel change requires ownership transfer | Pending — cross-cutting; first cut may fold into other flows |
| Continuous document intake | Document arrives via any channel | Pending — cross-cutting |

## Per-flow Document Structure

Every flow document follows this structure:

- **Trigger** — what kicks the flow off
- **Personas** — who participates
- **Prerequisites** — what must already be true in TradeOps
- **States** — operational states the dossier / end-client moves through
- **Steps** — concrete actions and decision points; for each, what TradeOps records
- **Outputs** — operational and document outputs
- **Audit-trail focus** — what this flow's audit trail specifically defends
- **General vs TT-HN-specific** — explicit marker section
