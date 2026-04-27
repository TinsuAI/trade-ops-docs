# Problem Framing

## Working Thesis

TradeOps is for **customs brokers** that serve many export-facing enterprises. The first customer is Trọng Tín - Hoa Nam. The end-clients of the broker are DN chế xuất and SXXK enterprises whose customs declarations, CO dossiers, and BCQT settlement reports all flow through the broker.

The fundamental problem is not "the broker lacks a tool." It is that the broker promises operational excellence and audit defensibility for a portfolio of end-clients, but the underlying data and process foundation does not scale. Every new end-client multiplies chaos rather than compounding institutional learning.

This is what TradeOps must address.

## The Broker's Operating Reality

A customs broker like Trọng Tín - Hoa Nam runs a multi-client operations factory:

- **Inputs** arrive in messy form — Excel BOM from factories, scanned documents over chat, fragmented file shares per end-client.
- **Processing** depends on individual staff knowledge — who knows which client, which classification, which prior declaration to mirror.
- **Outputs** — customs declarations, CO origin dossiers, and BCQT settlement reports — are deeply interconnected and must remain consistent over multiple years. These three output streams will be served by the three apps currently in build for the broker: Siafu, Barry-CO, and Barry-BCQT respectively.
- **Volume scales unevenly with end-client mix.** A DNCX end-client typically generates many on-the-spot import/export (XNK tại chỗ) declarations on top of cross-border declarations, multiplying the broker's processing load relative to a similarly-sized SXXK end-client. The broker cannot price or staff uniformly across regimes.
- **Cost per dossier does not decrease** with experience because the foundation under each client never gets standardized.

## Strategic Pain Points

1. **Adding clients does not compound learning.** Each new end-client is its own pile of formats, codes, and folder structures. The broker's team starts from scratch each time. Staff time per client stays high.
2. **Knowledge is private, not institutional.** Each staff member has their own way of working. Handover is brittle. Replacing a person can take months. The broker's operational capability scales with headcount, not with systems.
3. **Multi-year dossier interconnections are fragile.** Last year's TKNK feeds this year's BCQT. The technical BOM used to support a CO at the moment of export and the actual-consumption Định mức Mẫu 16 produced for BCQT at year-end are distinct artifacts that must remain reconcilable against the same SP–NVL flow. One drift or one undocumented change breaks the chain — sometimes years after it was made.
4. **Audit reconstruction is an exposure.** Customs may reopen and query a dossier within the **kiểm tra sau thông quan** (post-clearance audit) window — roughly 5 years from clearance. If that happens, rebuilding the chain of supporting documents can take days, and if the staff member who built it has moved on, the chain may not be reconstructable in full. The ability to defend a dossier years later is what separates a confident broker from an exposed one.
5. **All brokers start equal in systems.** Almost every customs broker today runs on Excel, personal folders, and chat. Whichever broker builds a disciplined portfolio and operations platform first gains a structural advantage that is hard for competitors to copy quickly.

## Structural Root Causes

The strategic pains above are not random. They share a small set of structural root causes that no single tool today addresses:

- **No standardized item catalog per enterprise.** SP, NVL, and BTP are not consistently identified across years, declarations, BOM versions, and accounting. The same physical NVL appears under different mã hàng on TKNK over time, with no anchored internal ID. (Mã HS classification typically stays stable; what drifts is the enterprise-controlled mã hàng on each declaration line.)
- **No single home for documents.** Files live in email, chat, personal folders, and per-staff naming conventions.
- **BOM versions tracked informally.** Effective dates, substitutions, and revision history are kept in Excel comments or memory.
- **Multiple inventory views diverge silently.** Physical, accounting NXT, BCCT-derived, and CO consumption all differ — sometimes intentionally — but no system holds them side by side or reconciles them.
- **No unified audit trail across declarations, dossiers, BOM changes, document uploads, and staff actions.**

## Concrete Manifestations

Some examples that make the structural causes tangible:

- A NVL declared with mã hàng "X-1234" on a 2023 TKNK appears under mã hàng "X-1234A" on a 2024 TKNK after a naming clarification (mã hàng on the declaration line is enterprise-controlled and is what drifts in practice; the underlying mã HS classification typically stays stable). The ERP system kept calling the same physical item "INT-001" both years. By 2025, the BCQT reconciliation cannot match accounting consumption to the balance derived from HQ declaration data without manual code mapping.
- Tồn CO is a working ledger that maps NVL consumption to specific export shipments under origin rules. It can legitimately diverge from physical warehouse stock and accounting NXT because origin rules constrain which import lots can notionally feed which export shipments — not because warehouse FIFO determines the answer. There is no system today that holds these views side by side or reconciles them.
- A customs query about a 2024 CO dossier requires assembling: BOM versions in effect at shipment time, supporting NVL import documents, Phụ lục X (when a domestic-supplier upstream input is involved), the export TKXK and matching B/L. None of these are linked together in any single system.
- BOM (định mức kỹ thuật) is the norm used to support C/O dossiers at the moment of export, but the year-end BCQT requires Định mức Mẫu 16 — the annual weighted-average NVL consumption per SP, computed from the year's actual exports, imports, and consumption (including tiêu hao). Mẫu 16 is NOT a flattening of BOM; it is computed from real production flows. Without systematic tracking of actual consumption per period, the broker rebuilds Mẫu 16 manually each year, often after the fact and with inconsistent source data — and a Mẫu 16 that suspiciously resembles BOM (ignoring tiêu hao and period-flow variance) draws HQ scrutiny.

## System Boundary

TradeOps is positioned as:

- **The broker's portfolio + operations platform.** TradeOps is where the broker manages the entire portfolio of end-clients across years: who the clients are, what dossiers exist, who is working on what, what the history is, what is defensible under audit. This category of work — portfolio management and historical traceability over time — does not exist inside Siafu, Barry-CO, or Barry-BCQT and never will, because those are workflow accelerators that fire on specific compliance triggers.
- **Independent of the three workflow apps** in scope and necessity. TradeOps stands alone — even without those apps, the broker needs a portfolio + history system to escape the Excel/email/Zalo/folder fragmentation that today represents portfolio management. When the three apps are integrated, they read from TradeOps' master data and write their outputs back into TradeOps' dossier history; this is an additive integration, not the reason TradeOps exists.
- **Stronger than a document repository** — it owns structured data: portfolio + dossier state, item master, BOM, multi-view inventory, audit trail.
- **Narrower than a full ERP** — it does NOT own finance, procurement execution, production planning, or warehouse stock movement.
- **Capable of integrating with the broker's or end-client's ERP / accounting later**, in Phase 3, via bounded connectors.

## Recommended Position

- Per-broker independent deployment (each broker is one TradeOps instance).
- Multi-end-client tenancy inside the instance.
- **Daily-ops modules** (dossier & client management, document control, audit trail) as the headline of TradeOps' value — daily-driver functionality that exists in no other system.
- **Per-end-client master-data modules** (item master + HQ↔ERP code translation, BOM master + period-flow data for Mẫu 16, multi-view inventory) hold the master data the daily-ops modules and the integrated workflow apps both read.
- Document-first across all artifacts; structured overlays added selectively where operational use requires them.
- Multi-view inventory with reconciliation, not enforced convergence.
- TradeOps as the source of truth for the broker's portfolio, dossier history, master data, and audit trail. ERP / accounting integration deferred to Phase 3.
