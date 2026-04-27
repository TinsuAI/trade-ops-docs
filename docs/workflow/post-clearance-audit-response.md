# Workflow — Post-Clearance Audit Response

Reactive, investigative flow triggered when cơ quan hải quan opens a kiểm tra sau thông quan (KTSTQ) against an end-client. This is the workflow that makes the case for TradeOps' "audit defense" differentiation — the work that lives only in TradeOps, not in any of the three workflow apps, because the request typically asks for cross-app reconstruction across multiple years of operations.

Legal basis: Điều 77–82 Luật Hải quan 2014; Điều 96–101 Nghị định 08/2015/NĐ-CP (sửa đổi bởi NĐ 59/2018/NĐ-CP); penalty escalation per Bộ luật Hình sự 2015 (sửa đổi 2017); appeal per Luật Khiếu nại 2011.

## Trigger

A KTSTQ is initiated by a **Quyết định kiểm tra sau thông quan** issued by cơ quan hải quan (Tổng cục trưởng / Cục trưởng Cục KTSTQ / Cục trưởng Cục HQ tỉnh / Chi cục trưởng — signing authority depends on scope). The decision must be sent to the declarant within 3 working days of signing and at least 5 working days before the inspection date.

A preceding **công văn yêu cầu cung cấp hồ sơ / giải trình** (request for documents or explanation) may arrive before a quyết định in lighter cases, but the formal KTSTQ instrument is the quyết định.

Trigger reasons vary:

- Random selection per the agency's risk profile
- Risk profile flag (DNCX with heavy XNK tại chỗ, repeated CO refunds, sudden SP-NVL ratio shift in a BCQT)
- Specific flag from a prior BCQT or CO submission
- Industry sweep
- Tip-off / complaint

The reopen window is **5 năm kể từ ngày đăng ký tờ khai hải quan** per Điều 77 Luật Hải quan 2014. Specific scope, venue, and timeline are dictated by the quyết định.

The notice may target:

- Specific dossiers (one CO, one BCQT cycle, one declaration set)
- A period (typically one fiscal year)
- A specific SP-NVL combination
- The full operations of the end-client over a period (broadest scope)

## Personas

- **Trưởng phòng XNK** — owns the response, allocates resources, makes strategic calls
- **Nhân viên CO / BCQT / TKXNK** — pull dossiers and reconstruct chains in their respective domains, depending on scope
- **External counsel** — engaged for high-stakes notices (penalty risk, possible criminal referral); not always involved
- **Đại diện end-client (có thẩm quyền)** — responds to the quyết định on behalf of the doanh nghiệp; signs biên bản and any written giải trình
- **End-client point of contact** — provides any documents that were not previously in TradeOps

## Prerequisites

- End-client workspace exists with portfolio history covering the notice period
- Audit trail (Module 3) is intact for the notice period
- Document base (Module 2) covers the period
- Current giấy ủy quyền đại lý hải quan covering the notice scope is valid; if the original ủy quyền is dated and the current end-client signatory has changed, a fresh ủy quyền may need to be re-executed before the broker can respond on behalf of the end-client

If audit trail or document base is incomplete (e.g., end-client onboarded after the notice period started), that gap is itself part of the response — explicitly recorded, not papered over.

## States

```
notice-received → scope-assessment → venue-determination → reconstruction-build
  → response-package → submitted → [desk-defense | onsite-inspection]
  → kết-luận-received → resolved → [appeal?]
```

Branches:

- **desk-defense** (KTSTQ tại trụ sở cơ quan hải quan, per Điều 79 LHQ + Điều 97 NĐ 08/2015): documents are submitted at the cơ quan hải quan's office; max 5 ngày làm việc per Điều 79 (no statutory extension)
- **onsite-inspection** (KTSTQ tại trụ sở người khai hải quan, per Điều 80 LHQ + Điều 98 NĐ 08/2015): inspection occurs at the end-client's premises; max 10 ngày làm việc + 10 ngày extension; biên bản kiểm tra drawn up within 5 ngày làm việc of inspection end; **Kết luận kiểm tra** issued by signing authority within 15 ngày of inspection end
- **query-loop** — cơ quan hải quan returns with follow-up questions inside the active inspection; loops back to `reconstruction-build` with narrower scope
- **appeal** — penalty / kết luận disputed; khiếu nại within 90 ngày from receipt (Điều 9 Luật Khiếu nại 2011); khiếu nại lần hai or khởi kiện hành chính at Tòa án are subsequent options
- **escalation-criminal** — criminal threshold engaged; external counsel takes lead. Thresholds per BLHS 2015 (sửa đổi 2017): Điều 188 (buôn lậu), Điều 189 (vận chuyển trái phép hàng hoá qua biên giới), Điều 200 (trốn thuế — VND 100 triệu trốn thuế, or below threshold if previously administratively penalized or convicted of these offenses)
- **gap-acknowledged** — a requested document or chain element genuinely cannot be reconstructed; the response includes explicit acknowledgement plus available substitutes

## Steps

### 1. Notice intake

The Quyết định kiểm tra sau thông quan (and any preceding công văn yêu cầu cung cấp hồ sơ / giải trình) is captured in Module 2 as a document of type `KTSTQ notice`. A new audit-response dossier opens in Module 1 tagged to the end-client.

**Records:** notice document(s), notice date, signing authority, decision number, venue specified (tại trụ sở cơ quan hải quan vs tại trụ sở người khai hải quan), scope as stated, deadline / inspection date, response timeline, assigned trưởng phòng owner.

### 2. Scope assessment

Trưởng phòng reviews the notice against the portfolio history and identifies:

- Which dossiers are in scope (specific CO numbers, BCQT cycle years, declaration ranges)
- Which periods are in scope
- Which end-client items / SP-NVL combinations are in scope
- Which staff worked on the in-scope work historically (some may have left)
- Whether external counsel should be engaged from the outset
- Estimate of response effort and feasibility within the notice deadline
- Validity of the current giấy ủy quyền covering this scope; whether re-execution is needed

**Records:** scope as understood, mapping from notice → portfolio entities, staff history per entity, counsel decision, ủy quyền validity check, effort estimate.

### 3. Venue determination

The venue is dictated by the quyết định, but the broker's preparation differs materially per venue and is locked in here as a state property:

- **desk-defense (Điều 79 LHQ)** — broker assembles and delivers documents to cơ quan hải quan; lighter logistics; the broker's nhân viên may attend a working session
- **onsite-inspection (Điều 80 LHQ)** — đoàn kiểm tra arrives at the end-client's premises; broker staff attend on-site for the duration; daily biên bản làm việc are signed by both sides; inspection produces a Kết luận kiểm tra at the end

**Records:** venue (decided by notice, recorded here), prep plan per venue, named broker staff who will participate, on-site logistics (for the on-site branch).

### 4. Reconstruction build

For each in-scope dossier, the response team reconstructs the complete processing chain.

For **CO dossiers**:

- Original supporting documents (Invoice, PL, B/L, C/O đầu vào, Phụ lục X if applicable, định mức snapshot, quy trình sản xuất)
- Định mức kỹ thuật version that was pinned at the time
- Lot assignment that was decided — including the divergence vs. physical / accounting NXT noted at decision time
- Origin criterion that was applied (PSR cited with annex reference, RVC computation with FX rate, CTC argument with input/output HS, WO basis)
- Decision history: who decided what when, what the audit trail recorded
- Cross-references: which TKNK supplied which lots, which TKXK the CO supports, factory inspection records if any

For **BCQT-related dossiers**:

- Mẫu 16 inputs, the four-view inventory reconciliation for the period, divergence ledger entries, plausibility check results
- Mẫu 15 / 15a balance evidence
- End-client sign-off artifact for the original submission
- Submitted package (per the template version in force at submission time) and any self-amendment or reopen history

If a chain element cannot be fully reconstructed (genuine data gap), it is recorded explicitly with what is available and what is missing. **Honest acknowledgement is preferred over fabrication;** the audit trail itself records the gap and shows that no manipulation occurred.

**Records:** reconstruction packet per dossier, gap acknowledgement where applicable, working notes from reconstruction effort.

### 5. Response package assembly

The response package is built per the format requested. Typical components:

- Cover công văn responding to the quyết định
- Per-dossier reconstruction packet
- Summary giải trình per scope item, citing audit-trail evidence
- Cross-reference index linking notice items to response items
- Annexes: requested document copies, divergence explanations, gap acknowledgements

External counsel reviews where engaged.

**Records:** package version, components, reviewer sign-offs, counsel review where applicable.

### 6. Submission of pre-inspection materials

For **desk-defense**, the package is delivered to cơ quan hải quan via the channel specified in the quyết định (in-person, công văn, or e-channel where available).

For **onsite-inspection**, the package is the prepared brief that the broker brings to the on-site session; nothing is "submitted" before inspection in the same sense, but the prepared materials are recorded as ready.

**Records:** delivery timestamp, channel, recipient, accompanying staff (for in-person delivery).

### 7a. Desk defense (if venue = trụ sở cơ quan hải quan)

The broker's representative may be summoned to a working session at the cơ quan hải quan office. Each session may produce a biên bản làm việc (working minutes) signed by both sides. Follow-up requests trigger query-loop iterations.

**Records:** working sessions attended (date, attendees, biên bản document), follow-up requests received, supplementary materials provided, timeline against the 5 ngày làm việc limit (per Điều 79 LHQ — no statutory extension at this venue).

### 7b. On-site inspection (if venue = trụ sở người khai hải quan)

Đoàn kiểm tra (the inspection team from cơ quan hải quan) attends at the end-client's premises. The broker's representative attends throughout. Each day produces a **biên bản làm việc** signed by both sides — these are the load-bearing evidentiary documents because they bind both parties to facts as agreed at the time. The inspection itself lasts up to 10 ngày làm việc, extendable once by 10 ngày.

Within **5 ngày làm việc** of inspection end, the **biên bản kiểm tra** (overall inspection minutes) is drawn up. The **Kết luận kiểm tra** (the binding conclusion) is then issued by the signing authority within **15 ngày** of inspection end (Điều 80 LHQ 2014).

**Records:** đoàn kiểm tra members and signing authority, daily biên bản làm việc archived in Module 2, on-site working notes from broker side, supplementary materials provided during inspection, inspection start and end dates, extension if granted.

### 8. Kết luận kiểm tra received

Cơ quan hải quan issues the Kết luận kiểm tra (for on-site) or equivalent closing notice (for desk). This is the binding outcome document.

**Records:** Kết luận document, issue date, findings, any administrative measure proposed, deadline for response or compliance.

### 9. Resolution

The audit closes with one of:

- **Clean pass** — no findings, no adjustment
- **Minor adjustment** — small reconciliation correction, no penalty
- **Penalty imposed** — fine, late tax, or other administrative measure under quyết định xử phạt vi phạm hành chính
- **Criminal referral** — escalation beyond customs administrative scope under BLHS Điều 188 / 189 / 200; external counsel takes lead (rare but real; trốn thuế threshold is VND 100 triệu, lower if prior administrative penalty or conviction)

The resolution is recorded against the audit-response dossier and the affected end-client portfolio entries (e.g., a CO that was reopened, a Mẫu 16 that was adjusted retain their resolution status linked back).

**Records:** resolution outcome, measure imposed, reference to settlement document or quyết định xử phạt, impact on affected portfolio entries.

### 10. Appeal (conditional branch)

If the end-client disputes the resolution, khiếu nại may be filed within **90 ngày from receipt of the quyết định xử phạt or kết luận kiểm tra** (Điều 9 Luật Khiếu nại 2011):

- **Khiếu nại lần đầu** — to the issuing authority
- **Khiếu nại lần hai** — to the authority above the issuing one
- **Khởi kiện hành chính** — to Tòa án nhân dân (administrative court), as alternative to or following khiếu nại lần hai

The broker assembles the appeal evidence package, working with external counsel where engaged. Each appeal stage has its own timer and outcome.

**Records:** appeal stage, filing date, evidence package, deadline timer, counsel involvement, outcome at each stage.

## Outputs

- Response materials submitted or delivered to cơ quan hải quan
- Reconstruction packets archived in the audit-response dossier
- Daily biên bản làm việc (for on-site) and Kết luận kiểm tra archived in Module 2
- Gap acknowledgements (if any) recorded honestly
- Resolution status linked back to affected portfolio entities (COs, BCQT cycles, declarations)
- Audit trail of the response itself, including any appeal stages (meta-audit)

## Audit-trail Focus

This flow's own audit trail is meta-defensive: it records the response process so that, if a later audit revisits how the broker responded to a prior audit, the conduct of the response itself is defensible. Specifically: who reconstructed what, what gaps were honestly acknowledged, what counsel said, what was submitted when, what daily biên bản said, what Kết luận was issued.

The reconstruction work itself relies on the audit trails of CO, BCQT, and declaration flows that have been accumulating for the past 5 years. **This is the load-bearing claim for TradeOps' audit-defense differentiation:** without TradeOps' continuous portfolio audit trail across the three workflow apps and the work outside them, this reconstruction would require manual stitching across Excel, email, Zalo, app-specific dossiers, and personal knowledge — the current pain at brokers without TradeOps.

## General vs TT-HN-specific

**General broker patterns expected to hold across customers:**

- KTSTQ is initiated by a Quyết định kiểm tra sau thông quan, not a công văn (though công văn yêu cầu giải trình may precede in lighter cases)
- Two venue branches exist (desk vs on-site), with materially different logistics and timelines (desk = 5 ngày, no statutory extension; on-site = 10+10 ngày)
- The 5-year reopen window from registration date of the declaration is a hard regulatory anchor (Điều 77 LHQ 2014)
- Daily biên bản làm việc, the closing biên bản kiểm tra (within 5 ngày làm việc of inspection end), and the Kết luận kiểm tra (within 15 ngày of inspection end) are the load-bearing evidentiary documents
- Reconstruction across multiple apps + outside-app data is the norm, not edge case
- Gap acknowledgement is sometimes the right answer; fabrication is never
- Appeal (khiếu nại) within 90 ngày is a real branch, not edge case for non-trivial penalties
- Criminal referral is rare but the threshold (VND 100 triệu trốn thuế under BLHS Điều 200) is a known anchor counsel uses
- Counsel involvement is a real branch; budget and effort estimate must accommodate it
- Reconstruction work is where TradeOps' cumulative audit trail pays off — or where its absence becomes catastrophic

**TT-HN-specific to validate later:**

- TT-HN's historical KTSTQ frequency (which end-clients, which years, which scope types, which venue mix)
- Typical resolution distribution at TT-HN (clean pass vs minor adjustment vs penalty)
- Frequency of appeal use at TT-HN's typical end-client base
- Whether TT-HN engages external counsel routinely or only on penalty notice
- Whether TT-HN has experienced criminal-referral cases in recent years
- Format preferences of the regional Cục HQ that TT-HN deals with — affects step 5 / 6 design
- Pre-TradeOps reconstruction pain at TT-HN — concrete cases where reconstruction failed or took weeks; these become the credibility anchors when pitching the differentiation to broker #2
- Whether KTSTQ notices at TT-HN typically arrive at the end-client or at the broker (affects intake channel and SLA visibility)
- TT-HN's standard ủy quyền template — does it cover KTSTQ response by default, or is a fresh ủy quyền required at notice time?
