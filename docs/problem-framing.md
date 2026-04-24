# Problem Framing

## Working Thesis

The client does not only need a BOM tool.

They are facing a broader operational-data problem across:

- BOM and material norms
- certificate of origin dossiers
- import and export declaration work
- customs settlement reporting
- supporting document traceability across many clients

## Core Pain Points

1. Documents come from many channels: email, chat, ad hoc file transfers, personal folders.
2. The same file name may refer to different versions.
3. There is no stable version history for BOM and related working files.
4. Staff knowledge sits in private folder structures and personal memory.
5. Related records are disconnected: BOM, stock, customs declarations, invoices, packing lists, CO files, settlement workbooks.
6. Audit and explanation work is expensive because the dossier chain is not reconstructed automatically.

## System Boundary

This should not be framed as a full ERP yet.

It is better framed as a trade-compliance operations platform with strong document control and structured operational data.

That means:

- stronger than a document repository
- narrower than a full ERP
- capable of integrating with ERP or accounting systems later

## Three Expensive Decisions

## 1. Tenant Model

Options:

- one workspace per client
- one shared multi-tenant platform

Why this matters:

- affects access control, data segregation, and implementation complexity

## 2. Center of Gravity

Options:

- document-first with metadata overlays
- structured master-data-first system

Why this matters:

- affects ingestion, search, workflow, and how quickly the first release can ship

## 3. System Role

Options:

- source of truth for BOM, dossier, and trade operations data
- orchestration layer sitting above existing operational systems

Why this matters:

- affects integration scope, migration burden, and change management

## Recommended Starting Position

- multi-client capable, but start with strong client-level isolation
- document-first with selective structured data models for BOM, declarations, stock, and dossier status
- positioned as the operational system for trade-compliance work, with ERP integration later if needed

