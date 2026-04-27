# Workflow — BCQT Annual Cycle

The annual customs settlement reporting cycle. Per Điều 60 TT 38/2015/TT-BTC (sửa đổi bởi khoản 39 Điều 1 TT 39/2018/TT-BTC, sửa đổi tiếp bởi TT 121/2025/TT-BTC hiệu lực 01/02/2026), enterprises operating under regimes that require BCQT (gia công, SXXK, DNCX) must file an annual settlement report within 90 days of fiscal year-end. TT 121/2025 replaced the templates in Phụ lục V — Mẫu 15/BCQT-NVL/GSQL, Mẫu 15a/BCQT-SP/GSQL, Mẫu 16/ĐMTT-GSQL — so any cycle for FY2025 onward uses the TT 121/2025 forms.

Barry-BCQT performs the report assembly itself; TradeOps owns the end-to-end cycle around it — period-flow data collection, multi-view inventory reconciliation, Mẫu 16 input preparation, end-client sign-off, and dossier archival.

## Trigger

End-client's fiscal year-end approaches. The cycle is initiated approximately 60-90 days before fiscal year-end so period-flow data collection can run in parallel with continued ops.

## Personas

- **Trưởng phòng XNK** — initiates cycle, monitors progress across end-clients, sign-off
- **Nhân viên BCQT** — owns cycle execution per end-client
- **Nhân viên kế toán (end-client side)** — provides accounting NXT export and production aggregates
- **Đại diện end-client** — signs off on the assembled BCQT figures (xác nhận số liệu) before submission, since BCQT misstatement liability attaches to the doanh nghiệp, not the broker
- **Người ký số** — submits the BCQT via the customs system on behalf of the end-client
- **Barry-BCQT (system)** — performs report assembly when invoked

## Prerequisites

- End-client workspace `ready-for-ops` for the full reporting period
- Item master and định mức kỹ thuật covering the period are current with version history
- BOM period-flow data captured throughout the year (production aggregates, NVL consumption per period, tiêu hao records)
- Accounting NXT export available from end-client
- Access to line-level declaration data (TKNK / TKXK) from the customs system for the period
- End-client's giấy ủy quyền đại lý hải quan covering BCQT submission is valid for the cycle period

## States

```
cycle-prep → period-data-collection → declaration-data-pull → multi-view-reconciliation
  → madmuc16-prep → barry-bcqt-assembly → internal-review → end-client-signoff
  → submitted → self-amendment-window → archived
```

Branches:

- **deferred** — waiting on accounting / production data from end-client
- **self-amendment** — within 60 ngày from submission AND before any quyết định kiểm tra BCQT / KTSTQ / thanh tra is issued (per Điều 60 TT 38/2015 as amended), the end-client may resubmit a corrected BCQT without penalty; cycle re-enters at the appropriate step. After either trigger this right is extinguished and corrections are handled under tax / administrative-penalty law.
- **reopened-by-decision** — cơ quan hải quan issues a quyết định kiểm tra targeting this BCQT; the audit response is owned by the post-clearance audit response flow, but this cycle's record is updated with the reopen state and the response cross-reference
- **rejected** — BCQT cannot be assembled defensibly (catastrophic data gap); escalation path

## Steps

### 1. Cycle initiation

A new BCQT cycle dossier opens in Module 1 tagged to the end-client, 60-90 days before fiscal year-end. Reporting period boundaries, regime, and target submission date are recorded.

**Records:** cycle creation, reporting period boundaries, regime declared (gia công / SXXK / DNCX), assigned nhân viên BCQT, target submission date, ủy quyền validity check.

### 2. Period-flow data collection

Nhân viên BCQT assembles the period-flow data needed for Mẫu 16 computation:

- Total NVL imported in period (from TKNK line items)
- Total SP exported in period (from TKXK line items + production records)
- Actual NVL consumption per SP per period (from production records + accounting consumption)
- Tiêu hao per period and per SP-NVL pair where tracked
- Opening and closing balances per inventory view
- BTP movements where applicable

Where data is missing, requests go to the end-client. Cycle moves to **deferred** while waiting.

**Records:** data sources per data point, requests to end-client, supersedence when newer data arrives.

### 3. Declaration-data pull

A line-level extract of TKNK and TKXK declarations covering the period is pulled from the customs (HQ) system. Internally this artifact is referred to as "BCCT extract" — broker shorthand for the line-level tra-cứu-tờ-khai data; it is not an HQ-system term of art. The extract is the raw data behind both Mẫu 15 (NVL nhập) and Mẫu 15a (SP xuất).

**Records:** extract pull timestamp, period boundaries used, requesting user, archive of the extract document in Module 2.

### 4. Multi-view inventory reconciliation

Reconcile across the four inventory views for each NVL over the reporting period:

- Tồn thực tế (physical) — opening, period movements, closing
- Tồn kế toán (accounting NXT) — same
- BCCT-derived view — computed by netting TKNK + TKXK line items per NVL from the extract pulled in step 3
- Tồn CO — actual NVL consumption assigned to issued COs in the period

Divergences are surfaced and explained where possible. Reconciliation outputs:

- **Danh sách NVL nhập khẩu trong kỳ** (the input rows for Mẫu 15)
- **Danh sách SP xuất khẩu trong kỳ** (the input rows for Mẫu 15a)
- A divergence ledger linking each unexplained divergence to investigation tasks

**Records:** four-view balances per NVL, divergence values, explanations or open questions, source documents per data point.

### 5. Mẫu 16 input preparation

Compute the inputs to **Định mức Mẫu 16 (ĐMTT-GSQL)** — the annual weighted-average actual NVL consumption per SP:

- For each SP exported in the period: total NVL consumed (from period-flow data and reconciliation) divided by total SP units produced
- Tiêu hao layered into the consumption figure
- Plausibility check: weighted-average of định mức kỹ thuật weighted by production volume should be reasonably close to Mẫu 16. Large unexplained divergence is a red flag — Mẫu 16 that suspiciously resembles định mức kỹ thuật without tiêu hao or process variance draws HQ scrutiny.

**Records:** Mẫu 16 inputs per SP, computation method, plausibility check result, explanations for any large variance from định mức kỹ thuật weighted-average.

### 6. Barry-BCQT assembly

Barry-BCQT is invoked via API. It receives:

- Reporting period, regime, end-client identity
- Period-flow data, multi-view reconciliation output, Mẫu 16 inputs
- Danh sách NVL nhập khẩu trong kỳ, Danh sách SP xuất khẩu trong kỳ
- Declaration-data extract reference
- Định mức kỹ thuật version pins for the SPs produced in the period

Barry-BCQT produces the BCQT report package per the templates in TT 121/2025 Phụ lục V — Mẫu 15/BCQT-NVL/GSQL, Mẫu 15a/BCQT-SP/GSQL, Mẫu 16/ĐMTT-GSQL. Mẫu 15b / 15c are produced only when outward processing (gia công lại ở nước ngoài) applies, typically only under the gia công regime.

**Records:** Barry-BCQT invocation, inputs sent, outputs received, report file artifacts.

### 7. Internal review

Trưởng phòng XNK reviews the assembled BCQT for:

- Plausibility of Mẫu 16 vs định mức kỹ thuật weighted by production volume
- Reconciliation of accounting NXT vs Danh sách NVL nhập khẩu vs BCCT-derived totals
- Coverage of all imported NVL and exported SP in the period
- Tiêu hao records consistent across the year
- Any unexplained divergence flagged in step 4

Issues found loop back to step 2 or step 4. Trưởng phòng signs off when satisfied.

**Records:** review checkpoints, issues raised, resolutions, internal sign-off.

### 8. End-client sign-off (xác nhận số liệu BCQT)

Before submission, the end-client (đại diện có thẩm quyền) reviews and confirms in writing — email, công văn, or signed document — that the figures in Mẫu 15 / 15a / 16 match their accounting NXT and production records.

This step exists because liability for false BCQT figures attaches to the **doanh nghiệp (end-client)**, not the broker. Without explicit end-client confirmation the broker carries unbounded exposure on a misstatement.

The sign-off artifact archives in Module 2 and links to the cycle dossier.

**Records:** end-client signing party, sign-off document, sign-off timestamp, version of Mẫu signed off.

### 9. Submission

Người ký số submits the BCQT to the **Chi cục Hải quan nơi đã thông báo cơ sở sản xuất** via the **Hệ thống tiếp nhận BCQT** of cơ quan hải quan (distinct from VNACCS / VCIS, which is the declaration channel). ECUS-class clients wrap a BCQT module that talks to this BCQT receiving system.

If the system is unavailable, the fallback is paper submission of Mẫu 15 / 15a / 16 with chữ ký + dấu of the đại diện end-client; the paper artifact is recorded.

**Records:** submission timestamp, submission channel (electronic vs paper), submission reference, submitting người ký số (account ID), Chi cục Hải quan tiếp nhận, mẫu submitted with version reference.

### 10. Self-amendment window

For 60 days from submission AND until any quyết định kiểm tra BCQT / KTSTQ / thanh tra is issued, the end-client retains the right to resubmit a corrected BCQT without penalty (per Điều 60 TT 38/2015 as amended).

The cycle dossier holds the `self-amendment-window` state with a deadline timer and tracking of any extinction triggers (a kiểm tra decision arriving terminates the window early). If the end-client surfaces a needed correction within the window, the cycle re-enters at the appropriate step (typically step 4 or 5), produces a new package, and re-submits. The original submission is preserved in the audit trail.

When the 60-day timer expires without amendment, the cycle transitions to `archived`.

**Records:** window open and close timestamps, any extinction event (kiểm tra decision), amendment cycle iterations and their submissions.

### 11. Archival

The complete BCQT package — every input, every reconciliation step, every divergence explanation, the assembled mẫu, the end-client sign-off, the submission reference, any amendment history — archives in the portfolio for the post-clearance audit window (~5 years).

**Records:** final cycle state, archive location, retention schedule.

### Reopened-by-decision branch

If cơ quan hải quan issues a quyết định kiểm tra targeting this BCQT (BCQT-specific kiểm tra under TT 38/2015 framework, KTSTQ under Luật Hải quan 2014, or thanh tra under Luật Thanh tra), the cycle records the reopen state. The actual response is owned by the post-clearance audit response flow; this cycle dossier holds a cross-reference to that flow's audit-response dossier.

**Records:** decision document, decision date, scope, cross-reference to audit-response dossier, eventual resolution.

## Outputs

- BCQT package submitted to Chi cục Hải quan nơi đã thông báo cơ sở sản xuất (Mẫu 15, 15a, 16; plus 15b / 15c if applicable; per TT 121/2025 templates)
- End-client sign-off artifact archived
- Reconciled multi-view inventory state for the period
- Mẫu 16 computation per SP archived with full input substrate
- Audit trail of the entire cycle including any self-amendment iterations
- Portfolio history entry for the end-client

## Audit-trail Focus

This cycle's audit trail must defend three distinct things over the post-clearance window:

- **The BCQT itself** — that the submitted Mẫu 16 was computed from real period-flow data, that Mẫu 15 / 15a balance against TKNK / TKXK line items, that the lists of NVL and SP are correct, that templates used match the regulatory version in force at submission time.
- **The year's operations** — that the four inventory views reconciled (or where they diverged, that the divergence was documented), that định mức kỹ thuật versions used during the year are pinned, that COs issued during the year are consistent with the period-flow data.
- **The submission process itself** — that the end-client confirmed the figures in writing before submission, that any self-amendment within the 60-day window is fully tracked, and that the broker did not submit unconfirmed numbers under the end-client's name.

## General vs TT-HN-specific

**General broker patterns expected to hold across customers:**

- BCQT is annual, regulated by the 90-day post-fiscal-year deadline (Điều 60 TT 38/2015 as amended)
- Mẫu 15 / 15a / 16 are required across regimes (gia công / SXXK / DNCX); 15b / 15c only under gia công with outward processing
- Templates evolve — TT 121/2025 is the current version; any future amendment must be picked up at template level
- Mẫu 16 is computed from actuals, not flattened from định mức kỹ thuật
- Multi-view reconciliation is the heart of the cycle
- BCQT is submitted via the Hệ thống tiếp nhận BCQT to Chi cục HQ nơi đã thông báo cơ sở sản xuất, NOT via VNACCS
- The 60-day self-amendment window is a hard right that broker workflow must protect
- End-client written sign-off before submission is a liability boundary, not a formality
- Reopened-by-decision branch is real and must be designed for, not edge-cased

**TT-HN-specific to validate later:**

- Whether TT-HN's typical end-clients track tiêu hao per period or only year-end (affects Mẫu 16 quality)
- Frequency of self-amendment use in TT-HN's recent history
- Frequency of `reopened-by-decision` branch in TT-HN's recent history
- Whether the team's Barry-BCQT submits via Siafu's BCQT module wrap or via a standalone ECUS-class BCQT client
- Whether kế toán of end-clients typically delivers NXT export on time or requires multi-week chasing
- Whether TT-HN runs BCQT cycle on calendar year for all end-clients or per-end-client fiscal year
- For DNCX end-clients: whether XNK tại chỗ declarations dominate the volume (heavier reconciliation load on Mẫu 15 / 15a)
- TT-HN's standard practice for end-client sign-off (email signed by giám đốc? Công văn with dấu? Both?)
- Common red flags TT-HN's experienced trưởng phòng watches for in step 7 review (these become the platform's review checklist)
