# TradeOps

Proposal workspace for a client-facing system that manages operational data and dossiers for trade compliance work.

## Why This Project Exists

The immediate trigger came from BOM and CO work, but the underlying problem is broader:

- client files arrive through fragmented channels
- documents are stored across personal folders and chat history
- BOM versions are hard to control
- customs, CO, and settlement work depends on linked documents, not isolated spreadsheets
- staff handover is incomplete when people leave

This project is a separate workspace for shaping that larger proposal without mixing it into the Growatt case repo.

## Name

`TradeOps`

Reasoning:

- `Origin` keeps the link to CO and origin compliance
- `Ops` keeps the scope broader than BOM
- `Platform` leaves room for multi-client document and workflow management without calling it an ERP too early

## What This Is

This is currently a docs-first proposal project.

It is intended to hold:

- problem framing
- system scope
- module ideas
- rollout phases
- client-facing proposal drafts
- workshop and discovery notes

## Costly Decisions To Settle Early

1. Tenant model: per-client isolated workspace or one shared multi-tenant platform.
2. Data model center: document-first system with structured overlays, or master-data-first operational system.
3. System role: source of truth for operational trade data, or coordination layer integrated with an existing ERP/accounting stack.

## Suggested Initial Scope

Phase-1 scope should likely cover:

- customer and dossier management
- centralized file intake and versioning
- BOM and material master control
- CO dossier preparation and traceability
- customs declaration and settlement working papers
- searchable audit trail across documents, versions, and staff actions

## Repository Layout

- `docs/` - internal framing, scope, decisions, architecture notes
- `proposal/` - client-facing drafts
- `notes/` - workshop notes and raw idea capture
