# Workflow — End-client Onboarding

The first flow at the broker for any new end-client. Sets up the workspace that all subsequent flows depend on, and is where most of TradeOps' "data standardization" value is captured.

## Trigger

The broker takes on a new end-client (a DN chế xuất or SXXK enterprise). A representation contract or giấy ủy quyền đại lý hải quan is signed.

## Personas

- **Trưởng phòng XNK** — assigns the onboarding case, oversees scope and timeline, signs off
- **Nhân viên onboarding** — runs catalog setup, BOM intake, document base build (may be the trưởng phòng or assigned staff)
- **End-client point of contact** — provides historical TKNK, factory BOMs, accounting export, internal code lists

## Prerequisites

- Broker deployment of TradeOps is live
- Module 4 is configured for the broker
- A standard onboarding checklist exists (template inside Module 1)

## States

```
proposed → engaged → catalog-build → bom-build → document-base-build → ready-for-ops
```

- **proposed** — pre-contract; basic record exists, no operational data
- **engaged** — contract signed; end-client workspace created
- **catalog-build** — building SP / NVL / BTP item master and HQ↔ERP code translation
- **bom-build** — loading and versioning BOMs with effective dates
- **document-base-build** — historical TKNK, factory BOMs, accounting exports, supplier C/Os ingested and classified
- **ready-for-ops** — workspace can support live CO / BCQT / declaration work

The flow is mostly sequential but later states can be revisited if new historical sources surface.

## Steps

### 1. Open end-client workspace

- Create end-client record in Module 1
- Capture: tên end-client, regime (DNCX / SXXK / gia công), MST, đầu mối chính, người phụ trách bên đại lý
- Assign trưởng phòng owner
- **Records:** workspace creation event, initial owner, regime declaration

### 2. Collect historical baseline

Source materials are requested from the end-client. Typical sources:

- Historical TKNK (VNACCS export, or PDFs)
- Factory BOMs in native format (Excel, Word, PDF, scanned)
- Accounting NXT export for NVL and SP
- Existing supplier C/Os (if any)
- Internal product code list

These land in Module 2 with source channel tagged ("from end-client during onboarding"). All historical documents are flagged `historical` rather than `live`.

**Records:** document intake events, source channel, classification.

### 3. Build item master

Working from historical TKNK + factory BOM + accounting export:

- Identify each distinct SP, NVL, BTP across sources
- Assign internal stable IDs in Module 4
- Build the HQ↔ERP code translation table — every mã hàng variant seen on TKNK over years against the same physical item, plus the corresponding mã ERP / mã kế toán where present
- Capture mã HS where stable; flag drift cases

The translation table is intentionally many-to-many. Mapping decisions are reviewable.

**Records:** every item creation, every code mapping, who decided, source documents the decision references.

### 4. Build BOM

- Load BOM(s) per SP into Module 5
- Capture effective date, version, source factory document
- Multi-level expansion (SP → BTP → NVL) with substitution rules where relevant
- Link each BOM line to item master IDs from step 3

If multiple BOM versions exist historically, each is captured with its effective period. BOM is the technical norm for CO at point-in-time, **not** a derivation of Mẫu 16.

**Records:** BOM versions, effective ranges, source documents, change reasons (where known).

### 5. Build initial multi-view inventory baseline

Best-effort, depending on available data:

- Physical: from end-client snapshot (often missing or imprecise — flag and proceed)
- Accounting NXT: from accounting export
- BCCT-derived balance: from a BCCT pull on the start date if the end-client has historical declarations
- Tồn CO: built from historical CO dossiers if any have been issued

Divergences between views at the baseline are documented, not reconciled. Reconciliation is an ongoing operational activity, not an onboarding deliverable.

**Records:** each view's baseline values, source, divergence notes.

### 6. Document base classification

Historical documents from step 2 are classified and linked:

- TKNK / TKXK → linked to declaration records (sparse; full declaration ingestion is Siafu's job once live)
- Factory BOM documents → linked to BOM versions in Module 5
- Supplier C/Os → linked to NVL items in Module 4
- Other supporting documents → tagged with type

**Records:** classification decisions per document, who classified.

### 7. Sign-off and transition to live ops

- Trưởng phòng reviews the workspace state
- End-client confirms catalog accuracy on a representative sample
- Workspace state transitions to `ready-for-ops`
- Live operations (CO / BCQT / declaration triggers) can now occur

**Records:** sign-off event, sign-off responsible parties, sample reviewed.

## Outputs

- End-client workspace in `ready-for-ops` state
- Item master + HQ↔ERP code translation populated
- BOM master populated with versions
- Multi-view inventory baseline (best-effort)
- Document base classified and linked

## Audit-trail Focus

The end-client workspace can be reconstructed at the moment-of-onboarding state years later, including which historical sources backed each item, BOM, and code mapping decision. This matters because audit queries on a recent dossier may rely on classifications and mappings that were decided at onboarding two or three years earlier.

## General vs TT-HN-specific

**General broker patterns expected to hold across customers:**

- Onboarding is a multi-step, multi-week activity that produces a workspace, not a config screen
- Catalog setup is the bulk of effort and depends on quality of historical TKNK + factory BOM + accounting export
- Multi-view inventory baseline is partial at onboarding
- Document base ingestion is one-shot at onboarding; document intake continues forever after
- Sign-off is a real gate, not a formality

**TT-HN-specific to validate later:**

- Whether TT-HN's typical end-client provides accounting NXT export at onboarding (broker #2 may not have access)
- Whether onboarding is performed by the trưởng phòng or by dedicated onboarding staff
- Whether TT-HN typically has historical CO dossiers at onboarding (Tồn CO baseline depends on this)
- Whether TT-HN signs off at workspace ready or runs parallel ops during onboarding (overlap pattern)
- Typical onboarding duration at TT-HN (informs Phase 1 scope and pricing)

These resolve during the TT-HN workshop and during interviews with broker #2 / broker #3.
