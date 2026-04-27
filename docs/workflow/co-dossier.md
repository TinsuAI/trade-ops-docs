# Workflow — CO Dossier Preparation

The most concrete and integration-heavy daily flow. Triggered per export shipment that needs a Certificate of Origin. Barry-CO performs the dossier preparation work itself; TradeOps owns the request-to-archival lifecycle around it.

This flow covers both **preferential C/O** (FTA Forms — D / E / AK / AANZ / AJ / AHK / AI / RCEP / VKFTA / VJEPA / VCFTA / VN-EAEU; EUR.1 for EVFTA / UKVFTA) and **non-preferential C/O** (Form B, CNM). Preferential FTA C/Os have been issued by Bộ Công Thương / Cục Xuất nhập khẩu (via Phòng QLXNK and eCoSys) for years. **Quyết định 1103/QĐ-BCT (21/04/2025)** then recovered the non-preferential / Form B / CNM / REX issuing authority from VCCI back to 18 regional Phòng QLXNK under Bộ Công Thương; VCCI ceased issuing those from 5/5/2025. Result today: all C/O issuance — preferential and non-preferential — flows through Bộ Công Thương / Cục XNK via eCoSys.

## Trigger

End-client requests a CO for an outgoing shipment. The trigger arrives via email, Zalo, a scheduled CO calendar, or an event from Siafu when a TKXK is filed. Intake is captured in Module 2.

## Personas

- **Trưởng phòng XNK** — assigns the CO case, reviews high-stakes or first-of-kind dossiers, escalates blockers
- **Nhân viên CO** — owns the dossier from intake to issuance
- **Nhân viên intake** — captures incoming request and supporting documents (may be the same person as nhân viên CO)
- **Người ký số** — staff member with a registered eCoSys digital-signature account who submits the dossier on behalf of the end-client (commonly the trưởng phòng or a designated nhân viên CO)
- **Barry-CO (system)** — performs the CO dossier preparation when invoked

## Prerequisites

- End-client workspace is `ready-for-ops`
- Item master and định mức kỹ thuật (BOM) for the SP being exported are current
- Tồn CO view in Module 6 is available
- **Hồ sơ thương nhân** of the end-client is registered on eCoSys with current business registration, danh sách cơ sở sản xuất, and chữ ký mẫu (per Điều 13 NĐ 31/2018). For first-time C/O for a new end-client this is the most common day-1 blocker; if not yet registered, that registration is itself a sub-task before this flow can complete.

## States

```
requested → docs-intake → bom-and-lots-survey → origin-compliance-decision
  → barry-co-prep → review → submitted → [factory-inspection?] → issued → archived
```

Branches:

- **deferred** — waiting on missing documents from the end-client
- **factory-inspection** — cơ quan cấp requires kiểm tra cơ sở sản xuất before issuance (per Điều 28 NĐ 31/2018 + TT 39/2018/TT-BCT). Adds ~2 working days; produces biên bản kiểm tra
- **rejected** — origin criteria cannot be satisfied for any preferential Form **and** the end-client declines a non-preferential salvage path; dossier closes without issuance

## Steps

### 1. Intake

Request lands in Module 2 (any channel). A new dossier record opens in Module 1, tagged to the end-client, with shipment info: TKXK number if known, Invoice, Packing List, B/L references.

The target track is recorded:

- **Preferential** with target FTA Form (D / E / AK / AANZ / AJ / AHK / AI / RCEP / VKFTA / VJEPA / VCFTA / VN-EAEU; EUR.1 for EVFTA / UKVFTA), tentative
- **Non-preferential** Form B or CNM (typically when the destination has no FTA, or the end-client only needs origin proof for trade purposes without preference)

**Records:** intake channel, requester, raw request, attached documents at request-time, target track and Form.

### 2. Document collection

Nhân viên CO assembles the supporting document set against a Form-specific checklist:

- Export TKXK (or expected TKXK if not yet filed)
- Invoice, Packing List, B/L
- Định mức kỹ thuật version reference (linked from Module 5)
- C/O đầu vào (source C/Os) for imported NVL relevant to the shipment
- Phụ lục X (template form per TT 05/2018/TT-BCT) if a domestic-Vietnam-supplier upstream input is involved
- Quy trình sản xuất (template per TT 05/2018/TT-BCT, not free-form text)
- Other Form-specific supporting documents

Missing documents block progress. The dossier moves to **deferred** while requests go to the end-client.

**Records:** document checklist progress, missing-document requests sent, end-client responses, supersedence when newer versions arrive.

### 3. Định mức kỹ thuật and candidate-lot survey

For the shipment's SP, gather the data needed to compute origin compliance:

- Định mức kỹ thuật version effective at production time (from Module 5), **pinned by version hash** so a later re-version cannot retroactively change what was evaluated
- Candidate import lots from the Tồn CO view (Module 6) that could feed this shipment, **snapshotted at decision time**
- C/O đầu vào attached to those candidate lots (from Module 2)
- HS classification of inputs for CTC arguments. **The HS used in the CTC argument may differ from the HS declared on the input TKNK; both are recorded.**
- Declared values for inputs and FOB / CIF reference for the SP for RVC computation, with **FX rate and source** (e.g., Vietcombank rate as of date X)

This is purely a survey — no compliance decision yet.

**Records:** định mức version pin, candidate lots snapshot reference, C/O đầu vào referenced, HS classification per input (with source), declared values, FX rate and source.

### 4. Origin compliance decision

Using the survey from step 3, assign specific import lots to this export shipment such that the origin criterion for the target Form is satisfied.

For **preferential C/O**, the criterion depends on the Form's annex:

- **PSR governs when present.** If the HS heading has a Product-Specific Rule in the Form's annex, the PSR applies — trader cannot freely substitute a general criterion. Many headings (textiles, steel, processed food) are PSR-only or "CTH + RVC".
- **General rule applies only when no PSR applies.** General rule typically: WO / RVC ≥ 40% / CTH (or CTSH, depending on Form). Where the general rule offers RVC and CTH as alternatives, trader may choose.
- CPTPP / RCEP rely heavily on PSR per heading; general fallbacks are narrow.
- **EVFTA / UKVFTA outbound (VN → EU / UK):** if FOB > 6.000 EUR, EUR.1 issued by Bộ Công Thương via eCoSys; if FOB ≤ 6.000 EUR, exporter self-certifies on the commercial document. (REX is the EU-side mechanism used by EU exporters into VN — it does not apply to VN exporters going outbound.)

For **non-preferential C/O** (Form B / CNM), the criterion is typically WO or substantial-transformation argument per NĐ 31/2018; no FTA PSR applies.

The compliance computation is done against the assigned lot set. Multiple feasible assignments may exist; the chosen assignment is the one recorded. If no feasible assignment satisfies the target preferential Form, the team may:

- Iterate to a different preferential Form supported by the destination
- **Salvage path:** offer the end-client a non-preferential Form B / CNM if they only need origin proof for trade purposes
- Branch to **rejected** if neither path works

This is the workflow step where origin-rules-driven divergence from physical inventory becomes a recorded fact: Tồn CO is a working ledger constrained by origin rules, the assignment of import lots may not match physical FIFO, and that is by design — but it must be defensible.

**Records:** target track and Form (final), origin criterion applied (PSR cited with annex reference, RVC value with FX rate, CTC argument with input/output HS, WO basis), final lot assignment, computation result, alternative Forms tried (preferential and non-preferential), who decided, divergence vs. physical / accounting NXT explicitly noted.

### 5. Barry-CO preparation

Barry-CO is invoked via API. It receives:

- Định mức kỹ thuật version pin, item master IDs, lot assignment from step 4
- Supporting document IDs
- Target Form and origin criterion from step 4

Barry-CO produces the CO dossier package (form fields, dossier compilation). TradeOps' role here is to provide the inputs and receive the output; the dossier work itself is Barry-CO's domain.

**Records:** Barry-CO invocation, inputs sent, outputs received, dossier file artifacts, processing status.

### 6. Review

Nhân viên CO reviews the Barry-CO output. Trưởng phòng reviews high-value or first-of-kind dossiers. Issues found loop back to step 4 or step 2.

**Records:** review checkpoints, reviewers, issues raised, resolutions.

### 7. Submission

The dossier is submitted to eCoSys (Bộ Công Thương) for the relevant Form. Submission is performed by người ký số via their registered eCoSys account; TradeOps captures the submission reference.

For EVFTA / UKVFTA shipments at FOB ≤ 6.000 EUR, no eCoSys submission occurs — the exporter self-certifies on the commercial document. The self-cert statement is recorded against the dossier in TradeOps.

**Records:** submission timestamp, eCoSys reference (or self-cert statement reference with document linked), **eCoSys account ID of người ký số** (not just user identity inside TradeOps), submitted Form.

### 7.5. Factory inspection (conditional branch)

After submission, the cơ quan cấp may require an on-site **kiểm tra cơ sở sản xuất** per Điều 28 NĐ 31/2018 + TT 39/2018/TT-BCT. Triggers commonly include:

- First-time SP-Form combination for the end-client
- Hồ sơ unclear or with apparent inconsistency
- Suspected gian lận chuyển tải
- Prior origin-related violation by the end-client

The dossier transitions to `factory-inspection` state. SLA extends by ~2 working days. The biên bản kiểm tra produced by the đoàn kiểm tra is archived in Module 2 and linked to the dossier. Issuance is gated on the kết luận.

**Records:** notice received, đoàn kiểm tra members, biên bản kiểm tra document, kết luận, impact on issuance timeline.

### 8. Issuance and archival

On issuance, the C/O details are recorded against the dossier:

- **Số tham chiếu** (reference number)
- **Số C/O** (serial number) — distinct from the reference, relevant for cấp lại / cấp sau cases
- Issuance date
- **Issuance type:** cấp mới / cấp lại (replacement, e.g., typos or split shipments) / cấp sau (issued retroactively, Box 13 ticked) / back-to-back (Form D) / Movement Certificate (Form E)

The dossier transitions to **archived** and remains in the portfolio for the post-clearance window (~5 years per kiểm tra sau thông quan reopen rules).

The Tồn CO view in Module 6 reflects the consumed import lots permanently after issuance.

**Records:** số tham chiếu, số C/O, issuance date, issuance type with justification (especially for cấp sau), link to issued C/O document, final dossier state.

## Outputs

- Issued CO dossier in Barry-CO with all linked supporting documents in Module 2
- Tồn CO view updated in Module 6
- Audit trail of every step
- Portfolio history entry for the end-client

## Audit-trail Focus

This flow's audit trail is the primary defense substrate for any future CO-related kiểm tra sau thông quan query. The recorded substrate must answer: which định mức version (pinned, not just ID) backed which CO, which import lots were assigned (snapshotted at decision time) under which origin criterion (PSR or general rule, with annex reference), what FX rate and source were used for any RVC computation, what HS classifications were used for CTC arguments (input-side, distinct from declaration-side), who made each decision, what supporting documents were referenced, who submitted under which eCoSys account, what the issuance type was, and whether a factory inspection occurred. The post-clearance audit window (~5 years) is the design horizon for the level of detail captured.

## General vs TT-HN-specific

**General broker patterns expected to hold across customers:**

- CO dossier flow is request-driven and per-shipment
- Both preferential and non-preferential paths exist at every broker
- PSR governs origin criterion when present; trader does not freely substitute
- Hồ sơ thương nhân registration on eCoSys is a hard prerequisite for first-time C/O issuance per end-client
- Tồn CO assignment is an explicit decision point, not automatic
- Factory inspection is a real conditional branch that affects SLA and audit record
- Barry-CO (or any equivalent CO engine) is invoked once inputs are clean
- Audit-trail granularity is dictated by the post-clearance window, not by ops convenience

**TT-HN-specific to validate later:**

- Volume distribution across Forms (preferential mix; non-preferential B/CNM share)
- Frequency of factory-inspection branch in TT-HN's recent history
- Frequency of cấp sau / cấp lại / back-to-back / Movement Certificate handling
- Whether request intake is calendar-driven (regular schedule per end-client) or ad-hoc
- Reviewer model: trưởng phòng review on every dossier, or only above a threshold?
- Whether TT-HN typically files declarations before requesting CO (TKXK exists at intake) or after (TKXK pending at intake)
- How TT-HN currently handles a rejected eligibility — frequent path or rare?
- Whether end-clients ever re-request a previously rejected CO under different basis
- TT-HN's current handling of EVFTA / UKVFTA shipments at FOB ≤ 6.000 EUR (self-cert without eCoSys) — does it bypass the broker entirely or run through the broker for record-keeping?
- Whether TT-HN's người ký số role is centralized (one or two staff) or distributed (each nhân viên CO has own account) — affects audit-trail user resolution
