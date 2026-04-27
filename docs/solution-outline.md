# Solution Outline

## Working Product Definition

TradeOps is the **broker's portfolio and operations platform** — the system the broker uses every day to manage the entire portfolio of end-clients across years. It is where the broker tracks who the clients are, what dossiers exist, who is working on what, what the history is, and what is defensible under audit.

It is **not a fourth workflow tool** sitting alongside Siafu, Barry-CO, and Barry-BCQT. It is a different category of system: the platform that holds the broker's portfolio and audit-trail-grade history, with the three workflow tools serving as specialized accelerators that fire on specific business triggers and read/write into TradeOps.

TradeOps is independent of those three apps. Even without them, the broker would still need TradeOps to escape the Excel/email/Zalo/folder fragmentation that today represents portfolio management. The three apps add specialized speed at three specific compliance tasks; they do not — and structurally cannot — provide portfolio management or cross-year audit defense.

## Position Relative to Adjacent Apps

Three workflow accelerators are currently being built for the same broker, all under Tinsu AI:

- **Siafu** — customs declaration system (TKXK / TKNK). Built by the user's partner on the team.
- **Barry-CO** — CO origin dossier preparation per export shipment. Built by the user.
- **Barry-BCQT** — annual customs settlement reporting (BCQT). Built by the user.

Each app fires on a specific business trigger — a new declaration to file, a new CO request, a year-end BCQT — and produces a specialized compliance output. They do not manage the broker's portfolio of end-clients. They do not maintain dossier history across years. They do not provide audit reconstruction tooling.

**TradeOps does these.** It is the platform the broker works in continuously, regardless of whether any specific compliance workflow is firing. The three apps and TradeOps complement each other but are categorically different products. TradeOps stands independent: it is not a fourth thing required to make the three apps work; it is the system that keeps the broker's portfolio and history coherent on its own merits.

## Modules (organized by group)

### Modules used continuously by ops staff (not trigger-driven)

**Module 1 — Dossier & client management.**
End-client portfolio: who the clients are, their state, who is assigned to each. Dossiers grouped by shipment / declaration set / reporting period / project. Staff assignment, ownership, review queues, status transitions. The broker's daily working surface.

**Module 2 — Document control.**
Centralized intake of all supporting documents (Invoice, Packing List, B/L, AN, C/O of imported NVL, Phụ lục X, factory BOM, BCCT, etc.). Source channel tagging, version history, classification, file relationships, approval and supersedence status. Documents link to clients, items, BOM versions, dossiers, and declarations.

**Module 3 — Audit trail (cross-cutting).**
Records who changed what and when across all modules. Supports reconstruction of any past dossier state by date. Spans across the three workflow apps when they write into TradeOps. Primary tool for defense during kiểm tra sau thông quan (post-clearance audit).

### Per-end-client master-data modules

**Module 4 — Item master + code translation.**
Per-end-client catalog of SP, NVL, BTP. Each item carries a stable internal ID, an ERP code, and one or more HQ codes (many-to-many over time). The HQ↔ERP code translation table is part of this module. Foundational for everything else that references items.

**Module 5 — BOM master and period-flow data for Mẫu 16.**
Versioned, multi-level relations between items in Module 4 (SP ↔ BTP ↔ NVL). Effective dates, substitution rules, approval flow, change history. References items by stable internal IDs from Module 4, not by raw mã hàng or mã ERP.

BOM here is the **technical norm (định mức kỹ thuật)** at a specific point in time — for example, the recipe that supports a C/O dossier at the moment of export. It can change over time and may not include actual tiêu hao. The BCQT-facing **Định mức Mẫu 16** is a distinct artifact: the annual weighted-average NVL consumption per SP, **computed from actual data** at year-end (total SP exported, total NVL imported, actual consumption including tiêu hao). Mẫu 16 is NOT a copy or flattening of BOM. TradeOps holds BOM with versioning AND captures the period-flow data (production aggregates, actual consumption per period, tiêu hao) needed by Barry-BCQT to compute Mẫu 16 at year-end.

**Module 6 — Multi-view inventory.**
Holds simultaneously: physical warehouse stock, accounting NXT, balance derived from BCCT extracts, and CO inventory (consumption mapping per export shipment). All views reference the same item master from Module 4. Cross-view reconciliation and divergence audit are first-class features. Convergence is not enforced.

## Module Consumption Map

The table below describes how the three workflow apps interact with TradeOps when integrated. This is the **additive integration** view, not the reason TradeOps exists. Modules 1–3 are TradeOps' standalone purpose (the broker's daily operating environment, used regardless of whether any workflow app is firing); Modules 4–6 hold per-end-client master data, used both by the daily-ops modules and — when integrated — by the three workflow apps.

| Module                            | Siafu | Barry-CO       | Barry-BCQT                                  |
|-----------------------------------|-------|----------------|---------------------------------------------|
| 1. Dossier & client management    | R/W   | R/W            | R/W                                         |
| 2. Document control               | R/W   | R/W            | R/W                                         |
| 3. Audit trail                    | W     | W              | W                                           |
| 4. Item master + code translation | R     | R              | R                                           |
| 5. BOM master                     |       | R              | R                                           |
| 6. Multi-view inventory           |       | R/W (CO view)  | R/W (BCCT-derived view, reconciliation working set) |

R = read, W = write.

## Suggested Delivery Phases

### Phase 1 — Pilot portfolio + master data + audit trail

Daily-ops modules (Module 1–3) live for the pilot end-client(s):

- Dossier & client management — pilot end-client portfolio, dossier list, assignments, statuses
- Document control — centralized intake with version history and source-channel tagging
- Audit trail — records changes across all modules

Master-data modules (Module 4–5) live for the pilot end-client(s):

- Item master + code translation — extracted from historical TKNK + factory BOM + accounting export
- BOM master — versioned, with effective dates

Integration milestone:

- Barry-CO integrated to read item master / BOM / documents / dossier status from TradeOps and write back, demonstrating the workflow-accelerator integration on the pilot portfolio

**Standalone usability before Barry-CO integration:** as soon as the daily-ops modules and master data are live for the pilot end-client, the broker's ops team can already manage that client's dossiers in TradeOps — intake documents, assign owners, track statuses, search prior dossiers, hand work over between staff — without any workflow-app integration. Barry-CO integration adds CO dossier preparation as an accelerator on top of an already-working portfolio.

Phase 1 goal: the pilot end-client has a complete portfolio in TradeOps — clients, dossiers, master data, and audit trail. To demonstrate integration with the workflow apps, one real CO dossier runs end-to-end through Barry-CO on top of that portfolio.

### Phase 2 — Multi-view inventory, declarations, and BCQT reconciliation

- Multi-view inventory module live (physical, accounting NXT, BCCT-derived, Tồn CO)
- Cross-view reconciliation views live
- Siafu integrated to read item master / documents from TradeOps and write back declarations into the dossier history
- Barry-BCQT integrated to read all TradeOps modules and produce annual reconciliation working sets

Phase 2 goal: an annual BCQT can be assembled from the standardized portfolio in TradeOps without leaving the system; divergences between inventory views are surfaced and traceable.

### Phase 3 — Integrations and reporting

- Bounded connectors to ERP / accounting / warehouse systems as needed per engagement
- Operational dashboards across the broker's portfolio
- Optional controlled access for end-clients

## Out of Scope for Phase 1

- Full accounting (general ledger, AR/AP)
- Real warehouse execution (inbound / outbound / cycle counts)
- Production planning, MRP
- End-to-end procurement execution
- ERP replacement
- Automatic submission to the VNACCS / VCIS national customs system (TradeOps holds the operational data; the actual submission goes through Siafu, which itself interfaces with VNACCS via standard ECUS-class clients rather than reimplementing the protocol)
- Direct submission of C/O dossiers to eCoSys (Bộ Công Thương) — TradeOps holds the dossier data and links; the actual submission to eCoSys (or, for EVFTA / UKVFTA shipments at FOB ≤ 6.000 EUR, exporter self-cert on the commercial document) is performed by Barry-CO together with the team's người ký số, not by TradeOps itself
- End-client-facing portal
