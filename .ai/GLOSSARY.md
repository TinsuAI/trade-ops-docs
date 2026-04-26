# Glossary

<!-- Format: **Term** — Definition -->

## AN
Arrival Notice. Carrier or freight-forwarder notice that imported goods have arrived. Input to TKNK preparation in Siafu.

## B/L
Bill of Lading. Shipping document issued by the carrier. Input to both TKNK and TKXK preparation in Siafu, and a supporting document in Barry-CO.

## Barry-BCQT
In-house app for annual customs settlement reporting (BCQT). Owned by Tinsu AI (user). One of the three workflow accelerators that integrate with the TradeOps platform when triggered.

## Barry-CO
In-house app for preparing CO origin dossiers per export shipment. Owned by Tinsu AI (user). One of the three workflow accelerators that integrate with the TradeOps platform when triggered.

## Bảng quy đổi mã
Code-translation table mapping internal ERP codes to one or more customs (HQ) codes for the same physical SP / NVL / BTP. Many-to-many in practice over time. Lives in the TradeOps item master module so all three adjacent apps share the same mapping.

## BCCT
Báo cáo chi tiết — a line-level extract pulled on demand from the customs (HQ) system for a user-requested date range. Example: requesting BCCT from 1/1/2025 to 31/12/2025 returns a file aggregating every line item from every declaration in that period. In Barry-CO, BCCT is the basis for building the CO inventory ledger. In Barry-BCQT, BCCT HQ is a key reconciliation input alongside DS NVL HQ and DS SP HQ.

## BCQT
Báo cáo quyết toán hải quan — annual customs settlement reporting per Điều 60 of Thông tư 39/2018/TT-BTC. The output of Barry-BCQT. Reconciles imports, exports, BOM-derived consumption, and stock against customs declarations. Core mẫu (regime-agnostic across gia công, SXXK, and DNCX): **Mẫu 15** (BCQT NVL nhập khẩu), **Mẫu 15a** (BCQT thành phẩm sản xuất từ NVL nhập khẩu), **Mẫu 16** (Định mức thực tế — see Định mức Mẫu 16). Specialty mẫu **Mẫu 15b** and **Mẫu 15c** are filed only when outward processing (gia công lại ở nước ngoài) is involved, most commonly under the gia công regime.

## BOM
Bill of materials, equivalent to **định mức kỹ thuật** in Vietnamese trade-compliance practice. The technical engineering norm describing components required per finished product **at a specific point in time**. May change over time as production methods evolve. May not include actual tiêu hao (waste/loss) in production. Used at C/O dossier time to declare component consumption per export shipment. In TradeOps, BOM is multi-level (SP ↔ BTP ↔ NVL), versioned with effective dates, and references items via stable internal IDs from the item master. **Distinct from Định mức Mẫu 16** — see that entry. Mẫu 16 is computed from actual data at year-end and is NOT a flattening of BOM.

## BTP
Bán thành phẩm. Semi-finished products / WIP. Sit between NVL and SP in the production chain. Tracked in the TradeOps item master.

## CO
Certificate of origin dossier and the operational work around preparing, supporting, and explaining that dossier.

## DN chế xuất
Doanh nghiệp chế xuất. Export-processing enterprise operating in a non-tariff-zone (khu phi thuế quan) regime — duty-exempt across the boundary but with customs supervision of every in/out movement, including on-the-spot import/export (XNK tại chỗ) with domestic counterparties. Reporting burden is in practice heavier than non-DNCX, not lighter. One category of end-clients of customs brokers. (Ref: NĐ 35/2022, NĐ 134/2016 as amended by 18/2021.)

## Document Control
Capability to ingest, version, classify, relate, and trace files across dossiers and clients. Module 2 of the TradeOps platform (daily-ops modules group).

## DS NVL HQ
Project shorthand for "danh mục NVL nhập khẩu" — the customs-declared list of raw materials for the BCQT period. Input for BCQT reconciliation. (Standard regulatory phrasing per Mẫu 15 family of Thông tư 39/2018.)

## DS SP HQ
Project shorthand for "danh mục SP đã xuất khẩu trong kỳ" — the customs-declared list of finished products for the BCQT period. Input for BCQT reconciliation.

## Định mức kỹ thuật
Vietnamese term for BOM in the trade-compliance context — see BOM. The technical engineering norm at a specific point in time, used as the basis for declaring NVL consumption when applying for C/O. Distinct from Định mức Mẫu 16.

## Định mức Mẫu 16
Annual weighted-average NVL consumption norm per finished product, **computed from actual data at year-end** for BCQT settlement (per Mẫu 16 of Thông tư 39/2018/TT-BTC). Inputs needed to compute it: total SP quantity exported in the year, total NVL imported in the year, and actual NVL consumption in production (including tiêu hao). **Distinct from BOM / định mức kỹ thuật** — Mẫu 16 is NOT a copy or flattening of BOM; it is computed from real production flows. The BOM may evolve over the year and may not include tiêu hao, while Mẫu 16 captures actual aggregate consumption regardless of how BOM looked at any point in time.

## eCoSys
Hệ thống quản lý và cấp chứng nhận xuất xứ điện tử (https://ecosys.gov.vn). Run by Cục Xuất nhập khẩu — Bộ Công Thương. Single platform through which essentially all Vietnamese C/Os are processed since 5/5/2025: Form D, E, AK, AJ, AANZ, VK, VJ, RCEP, CPTPP, Form B (non-preferential), CNM, GSTP, plus REX number registration. Submission and issuance both flow through eCoSys; data is piped to the National Single Window where applicable. (Quyết định 1103/QĐ-BCT dated 21/4/2025 transferred all C/O issuance authority from VCCI to 18 regional Phòng QLXNK under Bộ Công Thương, effective 5/5/2025.)

## End-client
A doanh nghiệp customer of the customs broker (typically a DN chế xuất or SXXK enterprise). End-clients are the entities whose declarations, CO dossiers, and BCQT reports flow through the broker.

## Item master
Per-end-client catalog of SP, NVL, and BTP with stable internal IDs, internal ERP codes, and one or more HQ codes per item. Module 4 of the TradeOps platform (per-end-client master-data modules group) — foundational for everything else that references items.

## Kiểm tra sau thông quan
Post-clearance customs audit. Customs (Hải Quan) can reopen and query a customs dossier (TKNK, TKXK, BCQT, CO) within roughly 5 years of clearance, typically conducted at the enterprise's premises (kiểm tra tại trụ sở doanh nghiệp) or via document request. The most common real-world audit trigger and the primary reason brokers need defensible audit trails years after the fact. Per Luật Hải quan 2014 (Articles 77–82) and Thông tư 38/2015 + 39/2018.

## Mã ERP nội bộ
The end-client's internal item code as used in their ERP, accounting, or factory systems. Stable across time. The canonical identifier on the internal-operations side of the code-translation table.

## Mã HQ
Mã hàng khai báo — the customs declaration item code as appearing on the line items of TKNK / TKXK / BCQT forms. Enterprise-controlled and distinct from mã HS (the HS classification code, which is more stable). Mã hàng can drift or vary across declarations for the same physical item over time, which is why a translation table to internal ERP codes is needed.

## Mã HS
The international harmonized classification code for a goods item, used to determine duty rate and origin treatment. More stable than mã hàng across time, although periodic revisions occur. Tổng cục Hải quan is currently pushing "one mã hàng → one mã HS" via Quyết định 117/QĐ-CHQ (effective Feb 2026).

## Multi-view inventory
Module 6 of the TradeOps platform (per-end-client master-data modules group). Holds physical, accounting (NXT), customs-declared (BCCT), and CO views of the same NVL side by side, with cross-view reconciliation and divergence audit trail. Convergence is not enforced.

## NVL
Nguyên vật liệu. Raw materials.

## Phụ lục X
Bản khai báo xuất xứ của nhà sản xuất / nhà cung cấp nguyên liệu trong nước, theo Thông tư 05/2018/TT-BCT (Bộ Công Thương). Submitted as part of the C/O dossier when an export uses a Vietnam-origin input from a domestic supplier. Not attached to TKXK and not a Tổng cục Hải quan form. One of the supporting inputs into Barry-CO when applicable.

## REX
Registered Exporter — the EU-origin self-certification scheme used for EVFTA / UKVFTA shipments. Vietnamese exporters register a REX number and self-declare origin on the commercial invoice instead of obtaining a stamped C/O. Mandatory for shipments above 6,000 EUR; below that threshold any exporter can self-declare without REX. Registration moved from VCCI to Bộ Công Thương via eCoSys from 5/5/2025.

## Siafu
In-house app for preparing customs declarations (TKXK / TKNK). Owned by Tinsu AI; built by the user's partner on the team. One of the three workflow accelerators that integrate with the TradeOps platform when triggered.

## SP
Sản phẩm. Finished product.

## SXXK
Sản xuất xuất khẩu. Production-for-export regime: imported NVL used to manufacture exported goods is import-tax-exempt (miễn thuế), conditional on actual export and BCQT settlement. (The "duty deferral" framing common pre-2016 is no longer accurate; under NĐ 134/2016 sửa đổi 18/2021 it is straight exemption.) Another category of end-clients of customs brokers.

## Tinsu AI
The vendor team behind TradeOps. Consists of the user and the user's partner. Owns all three adjacent apps: the user builds Barry-CO and Barry-BCQT; the user's partner builds Siafu.

## TKNK
Tờ khai nhập khẩu. Customs import declaration.

## TKXK
Tờ khai xuất khẩu. Customs export declaration.

## Tiêu chí xuất xứ
Origin criteria used to qualify goods for preferential or non-preferential C/O. Common types in Vietnamese export practice:
- **WO** (Wholly Obtained): goods entirely produced in the originating country
- **CTC** (Change in Tariff Classification): origin established by HS-code shift between input NVL and finished SP (CTH = chapter level; CTSH = subheading level)
- **RVC** (Regional Value Content): origin established by minimum regional value share — typical threshold ≥40% for ASEAN forms
- **PSR** (Product-Specific Rule): origin rule specific to a product or HS code, often combining RVC and CTC

Form D (ATIGA) typically allows RVC ≥ 40% **OR** CTC. Form CPTPP and Form RCEP rely heavily on PSR. EVFTA self-cert applies RVC, CTC, or specific list rules depending on the HS code.

## Tồn CO
CO inventory: a working ledger of NVL consumption mapped to export shipments to support CO origin dossiers. Intentionally divergent from physical inventory because CO origin rules constrain which import lots can notionally feed which export shipments.

## Tồn thực tế
Physical warehouse stock — the "real" view of what is on hand. Diverges from accounting NXT, BCCT HQ, and Tồn CO views; these divergences are themselves data.

## Tiêu hao
NVL waste, loss, or scrap in production — material that is consumed but does not appear in the finished product, or that is part of input but lost via cutting, defects, evaporation, rework, etc. Often not captured in the technical BOM (định mức kỹ thuật) but appears in actual consumption flows. Must be accounted for when computing Định mức Mẫu 16, since Mẫu 16 reflects actual aggregate consumption. Tracking tiêu hao per period is essential for BCQT reconciliation.

## Trade-Compliance Operations Platform
Working term for the proposed system that manages client dossiers, documents, item master data, BOM, multi-view inventory, declarations, and related operational data without claiming full ERP scope.

## Trọng Tín
The first customs broker pilot customer of TradeOps.

## XNK tại chỗ
On-the-spot import/export. A customs scenario where goods are nominally imported and exported between two parties in Vietnam without physical border crossing — typically between a DNCX (operating in non-tariff zone) and a domestic counterparty, or between two DNCXs. Both parties file customs declarations as if it were international trade. A significant volume driver in DNCX operations: every internal-domestic movement at a DNCX boundary is a customs event.
