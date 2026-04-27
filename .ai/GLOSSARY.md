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
Báo cáo quyết toán hải quan — annual customs settlement reporting per **Điều 60 TT 38/2015/TT-BTC (sửa đổi bởi khoản 39 Điều 1 TT 39/2018/TT-BTC, sửa đổi tiếp bởi TT 121/2025/TT-BTC hiệu lực 01/02/2026)**. The output of Barry-BCQT. Reconciles imports, exports, BOM-derived consumption, and stock against customs declarations. Filed within **90 ngày** of fiscal year-end. Core mẫu per TT 121/2025 Phụ lục V (regime-agnostic across gia công, SXXK, DNCX): **Mẫu 15/BCQT-NVL/GSQL** (BCQT NVL nhập khẩu), **Mẫu 15a/BCQT-SP/GSQL** (BCQT thành phẩm sản xuất từ NVL nhập khẩu), **Mẫu 16/ĐMTT-GSQL** (Định mức thực tế — see Định mức Mẫu 16). Specialty mẫu **15b** and **15c** apply only when outward processing (gia công lại ở nước ngoài) is involved, most commonly under the gia công regime. **Submission channel:** to Chi cục Hải quan nơi đã thông báo cơ sở sản xuất via the **Hệ thống tiếp nhận BCQT** of cơ quan hải quan — distinct from VNACCS / VCIS, which is the declaration channel. **60-day self-amendment window:** within 60 ngày from submission AND before any quyết định kiểm tra is issued, the end-client may resubmit a corrected BCQT without penalty.

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
Hệ thống quản lý và cấp chứng nhận xuất xứ điện tử (https://ecosys.gov.vn). Run by Cục Xuất nhập khẩu — Bộ Công Thương. Platform through which Vietnamese C/Os are processed: preferential Forms (D, E, AK, AJ, AANZ, AHK, AI, VK, VJ, RCEP, CPTPP), EUR.1 for EVFTA / UKVFTA outbound at FOB > 6.000 EUR, non-preferential Form B and CNM, GSTP. Submission and issuance both flow through eCoSys; data is piped to the National Single Window where applicable. **Quyết định 1103/QĐ-BCT (21/4/2025)** specifically recovered the **non-preferential C/O (Form B, CNM)**, **GSP for Norway / Switzerland**, and **REX number** issuing authority from VCCI back to 18 regional Phòng QLXNK under Cục XNK / Bộ Công Thương; VCCI ceased issuing those from 5/5/2025. Preferential FTA C/Os had already been issued by Bộ Công Thương / Cục XNK before QĐ 1103.

## End-client
A doanh nghiệp customer of the customs broker (typically a DN chế xuất or SXXK enterprise). End-clients are the entities whose declarations, CO dossiers, and BCQT reports flow through the broker.

## Item master
Per-end-client catalog of SP, NVL, and BTP with stable internal IDs, internal ERP codes, and one or more HQ codes per item. Module 4 of the TradeOps platform (per-end-client master-data modules group) — foundational for everything else that references items.

## Kiểm tra sau thông quan
Post-clearance customs audit. Customs may reopen and query a customs dossier (TKNK, TKXK, BCQT, CO) within **5 năm kể từ ngày đăng ký tờ khai hải quan** per Điều 77 Luật Hải quan 2014. **Initiated by a Quyết định kiểm tra sau thông quan** (administrative decision signed by Tổng cục trưởng / Cục trưởng Cục KTSTQ / Cục trưởng Cục HQ tỉnh / Chi cục trưởng depending on scope; sent to declarant within 3 working days of signing, at least 5 working days before inspection). A preceding công văn yêu cầu cung cấp hồ sơ / giải trình may arrive in lighter cases. **Two venue branches:** (i) **tại trụ sở cơ quan hải quan** (Điều 79 LHQ + Điều 97 NĐ 08/2015 sửa đổi NĐ 59/2018) — desk audit, max 5 ngày làm việc per Điều 79 (no statutory extension); (ii) **tại trụ sở người khai hải quan** (Điều 80 LHQ + Điều 98 NĐ 08/2015) — on-site at end-client premises, max 10 ngày làm việc + 10 ngày extension, daily biên bản làm việc, closing biên bản kiểm tra within 5 ngày làm việc of inspection end, **Kết luận kiểm tra issued within 15 ngày** of inspection end. **Appeal:** khiếu nại lần đầu within 90 ngày from receipt of quyết định xử phạt / kết luận kiểm tra (Điều 9 Luật Khiếu nại 2011); khiếu nại lần hai or khởi kiện hành chính subsequent. **Criminal escalation thresholds** per BLHS 2015 (sửa đổi 2017): Điều 188 (buôn lậu), Điều 189 (vận chuyển trái phép), Điều 200 (trốn thuế — VND 100 triệu, lower if prior penalty / conviction). The most common real-world audit trigger and the primary reason brokers need defensible audit trails years after the fact.

## Mã ERP nội bộ
The end-client's internal item code as used in their ERP, accounting, or factory systems. Stable across time. The canonical identifier on the internal-operations side of the code-translation table.

## Mã HQ
Mã hàng khai báo — the customs declaration item code as appearing on the line items of TKNK / TKXK / BCQT forms. Enterprise-controlled and distinct from mã HS (the HS classification code, which is more stable). Mã hàng can drift or vary across declarations for the same physical item over time, which is why a translation table to internal ERP codes is needed.

## Mã HS
The international harmonized classification code for a goods item, used to determine duty rate and origin treatment. More stable than mã hàng across time, although periodic revisions occur. Tổng cục Hải quan is currently pushing "one mã hàng → one mã HS" via Quyết định 117/QĐ-CHQ (effective Feb 2026).

## Multi-view inventory
Module 6 of the TradeOps platform (per-end-client master-data modules group). Holds physical, accounting (NXT), BCCT-derived, and Tồn CO views of the same NVL side by side, with cross-view reconciliation and divergence audit trail. Convergence is not enforced. (No "tồn hải quan" view — the BCCT-derived view is a balance computed from line-level declaration extracts pulled from the HQ system, not a balance customs itself holds.)

## NVL
Nguyên vật liệu. Raw materials.

## Phụ lục X
Bản khai báo xuất xứ của nhà sản xuất / nhà cung cấp nguyên liệu trong nước, theo Thông tư 05/2018/TT-BCT (Bộ Công Thương). Submitted as part of the C/O dossier when an export uses a Vietnam-origin input from a domestic supplier. Not attached to TKXK and not a Tổng cục Hải quan form. One of the supporting inputs into Barry-CO when applicable.

## REX
Registered Exporter — an EU-origin self-certification scheme. **For EVFTA / UKVFTA, REX is the EU-side mechanism used by EU exporters when exporting into VN; it does NOT apply to VN exporters going outbound to EU / UK.** For Vietnamese exports to EU / UK under EVFTA / UKVFTA the mechanism is: **EUR.1 issued by Bộ Công Thương via eCoSys when FOB > 6.000 EUR; exporter self-cert on the commercial document (no REX needed) when FOB ≤ 6.000 EUR** (Điều 19 TT 11/2020/TT-BCT). Earlier guidance that conflated REX with VN-side outbound self-cert was incorrect and has been removed from project memory.

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

**PSR governs when present.** If the HS heading has a Product-Specific Rule in the Form's annex, the PSR applies and trader cannot freely substitute a general criterion. When no PSR applies, general rules apply: Form D (ATIGA) general = WO / RVC ≥ 40% / CTH (with trader's choice between RVC40 and CTH where both are offered). CPTPP and RCEP rely heavily on PSR per heading; general fallbacks are narrow. EVFTA / UKVFTA outbound: EUR.1 via eCoSys if FOB > 6.000 EUR, exporter self-cert on commercial document if ≤ 6.000 EUR (no REX involved on the VN side).

## Tồn CO
CO inventory: a working ledger of NVL consumption mapped to export shipments to support CO origin dossiers. Intentionally divergent from physical inventory because CO origin rules constrain which import lots can notionally feed which export shipments.

## Tồn thực tế
Physical warehouse stock — the "real" view of what is on hand. Diverges from accounting NXT, the BCCT-derived view, and Tồn CO; these divergences are themselves data. (Note: there is no "tồn hải quan" concept — the customs system does not hold a balance. What people sometimes call "tồn hải quan" is in fact a balance derived from BCCT line-level declaration extracts.)

## Tiêu hao
NVL waste, loss, or scrap in production — material that is consumed but does not appear in the finished product, or that is part of input but lost via cutting, defects, evaporation, rework, etc. Often not captured in the technical BOM (định mức kỹ thuật) but appears in actual consumption flows. Must be accounted for when computing Định mức Mẫu 16, since Mẫu 16 reflects actual aggregate consumption. Tracking tiêu hao per period is essential for BCQT reconciliation.

## Trade-Compliance Operations Platform
Working term for the proposed system that manages client dossiers, documents, item master data, BOM, multi-view inventory, declarations, and related operational data without claiming full ERP scope.

## Trọng Tín - Hoa Nam
The first customs broker pilot customer of TradeOps.

## XNK tại chỗ
On-the-spot import/export. A customs scenario where goods are nominally imported and exported between two parties in Vietnam without physical border crossing — typically between a DNCX (operating in non-tariff zone) and a domestic counterparty, or between two DNCXs. Both parties file customs declarations as if it were international trade. A significant volume driver in DNCX operations: every internal-domestic movement at a DNCX boundary is a customs event.
