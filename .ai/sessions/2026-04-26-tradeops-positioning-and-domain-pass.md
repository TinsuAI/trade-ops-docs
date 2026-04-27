# 2026-04-26 — TradeOps positioning reframes and domain-fact pass

Single long session covering: rebranding, the first wave of architectural decisions, the customer context brief, the domain-fact pass via web research, three iterative positioning reframes (each triggered by a critic review and a polish wave at the end), and a final commit in three structured commits.

## What Was Done

### Rebranding and project consistency

- Renamed project Origin Ops Platform → TradeOps. Updated `.ai/project-meta.yml`, README, AGENTS.md, STATUS.md, DECISIONS.md.
- Committed as `5818fa8`.

### First wave of architecture decisions (in `.ai/DECISIONS.md`)

Three "expensive decisions" resolved early:

- **Tenant model** — per-broker independent deployment, multi-end-client tenancy inside the application. No "broker" entity in the data model.
- **Center of gravity** — document-first with selective structured overlays.
- **System role** — initially "backbone for Siafu / Barry-CO / Barry-BCQT" (later refined twice — see reframes).

Two further decisions added later in the session:

- **Multi-view inventory** reconciled, not converged.
- **Item master + HQ↔ERP code translation** as foundational module.

### Customer context brief from user

- 3 systems being built for one customs broker: **Trọng Tín - Hoa Nam**. End-clients are **DN chế xuất / SXXK** enterprises.
- All 3 codebases (Siafu, Barry-CO, Barry-BCQT) belong to Tinsu AI. User personally builds Barry-CO + Barry-BCQT; user's partner **on the team** builds Siafu. NOT external partner — earlier framing was wrong.
- BCCT is a line-level extract pulled on demand from the HQ system by date range (user clarified).
- Tồn CO is intentionally divergent from physical stock and BCCT-derived view because origin rules constrain lot-to-shipment assignment — but framing must avoid "made submittable" wording (audit-risky). (Note added 2026-04-27: there is no "tồn hải quan" concept — the BCCT-derived view is a balance computed from line-level declaration extracts.)
- Item master + HQ↔ERP code translation is foundational; many-to-many drift over years.
- Each broker gets a separate independent deployment; brokers don't share infrastructure or data.

### Domain-fact pass via web research

Spawned a `general-purpose` agent acting as Vietnamese customs domain reviewer with WebSearch / WebFetch. Authoritative sources consulted:

- Nghị định 134/2016 + 18/2021
- Thông tư 38/2015 + 39/2018
- Thông tư 33/2023/TT-BTC
- Thông tư 05/2018/TT-BCT
- Nghị định 31/2018
- Public guides from eCoSys, ECUS, thuvienphapluat.vn, congthuong.vn, etc.

Corrections applied across `.ai/GLOSSARY.md`, internal docs, and the proposal:

- **Phụ lục X** is a Bộ Công Thương C/O dossier form (Thông tư 05/2018/TT-BCT), NOT a TKXK appendix
- **SXXK** is tax-exempt (miễn thuế), not duty deferral
- **DNCX** has heavier reporting burden, not "simplified customs"
- **BOM** (định mức kỹ thuật) and **Định mức Mẫu 16** are distinct artifacts; Mẫu 16 is computed from actuals at year-end, NOT a flattening of BOM (this correction came directly from user, not the agent)
- **Tồn CO** framing softened to "origin-rules-driven divergence"
- **Mã hàng vs mã HS** distinction added (drift is in mã hàng on the declaration line; mã HS is more stable)
- **eCoSys (Bộ Công Thương)** handles all C/O issuance from 5/5/2025; VCCI no longer issues
- **Origin criteria broader than RVC**: CTC, PSR, Form D = RVC ≥ 40% OR CTC; CPTPP / RCEP rely on PSR; EVFTA self-cert via REX
- **BCQT mẫu 15 + 15a + 16** are largely regime-agnostic; 15b / 15c only for outward processing
- **VNACCS submission** goes through ECUS-class clients (Siafu wraps), not direct API
- **XNK tại chỗ** added as DNCX volume driver
- **Kiểm tra sau thông quan** named as the real audit trigger (~5-year reopen window)

### Positioning reframes — three iterations

After the user noticed the proposal "felt like just another module added to the 3 apps", we iterated through three positioning framings, with critic agent reviews between each.

**Framing A (initial draft, rejected):** "TradeOps is the **shared backbone** for the 3 apps". Critic and user identified the fatal flaw: invites the customer objection "if your 3 apps need this to work, why didn't you build it into the 3 apps?" — and there is no good commercial answer.

**Framing B (second draft, rejected):** "TradeOps is the **daily operations platform** of the broker". Better, but second critic review found it still vulnerable to "why am I being sold 4 products?" because it didn't name a specific category of work that lives only in TradeOps.

**Framing C (third draft, adopted with polish):** "TradeOps is the **broker's portfolio and operations platform**". Categorically distinct work named: portfolio management of N end-clients across years + audit defense over post-clearance years + staff-knowledge continuity. Module structure split into daily-ops modules (Dossier, Document, Audit) + per-end-client master-data modules (Item master, BOM, Inventory).

**D2 polish wave** (after third critic review, applied within C framing):

- Added "**Vì sao Siafu, Barry-CO, Barry-BCQT không thể tự đảm nhận phần này**" section in proposal §3 — answers the natural customer objection with the **specific** list of things the 3 apps don't hold (cross-client portfolio, documents outside any compliance trigger, cross-workflow continuity, ops work outside compliance scope, cross-year reconstruction)
- Parallel "Why the three workflow apps cannot do this work" section in `docs/architecture-positioning.md`
- Replaced tier vocabulary throughout (Operations modules / Supporting capabilities → daily-ops modules / per-end-client master-data modules; "tầng" / "phía trên / phía dưới" / "phục vụ" all dropped)
- ASCII stack diagram redrawn — 3 apps now sit alongside TradeOps in the broker deployment, not nested inside, with bidirectional API-contract arrows
- Explicit "via published API contracts, not shared-database direct access" added at multiple anchor points
- Phase 1 added "**Standalone usability before Barry-CO integration**" note showing what ops staff can do before workflow-app integration milestone
- Audit defense gap made explicit — 3 apps each retain own 5-year dossiers per regulation, but cross-app + outside-app reconstruction is TradeOps-only
- Vietnamese flow polish ("lệch một mắt là cả chuỗi sai" → "chỉ một mắt xích lệch", "không gian portfolio" → "không gian làm việc cho khách hàng cuối", reduced "đứng vững độc lập" repetition)
- Test logic Q&A in §3 removed in favor of substantive answer

### Final commits

3 commits on `main`, structured by directory tier for PR-style review readability:

- `4e4aa5a` Update .ai docs for portfolio-platform reframe
- `950f29e` Reframe internal docs around broker portfolio platform framing
- `d6ae4f7` Rewrite Vietnamese proposal under broker portfolio framing

Not pushed.

## Decisions Made

- **Phương án 1** (keep TradeOps as separable product, reframe rather than bundle into one SKU) chosen over **phương án 2** (bundle as one Trade Compliance Suite). Reasoning: Tinsu AI's commercial roadmap depends on selling TradeOps separately to additional brokers; bundling kills that flexibility.
- **Option C** (apply leak fixes + restructure modules + add explicit "why 3 apps can't absorb this" answer within C framing) chosen over D3 (re-reframe again per critic alternatives — per-end-client onboarding, drop categorical claim). D3 was deferred — diminishing returns at 4th reframe.
- Critic and general-purpose agents diverged on whether C framing is solid: GP said "genuinely solid"; critic said "still backbone framing in portfolio costume". User's call to apply D2 (surgical fixes within C) instead of D3 (4th reframe).
- Each broker gets a separate independent deployment; multi-broker capability is a Tinsu AI internal deployment-layer concern, not visible to customer.
- Tinsu AI team structure clarified: user owns Barry-CO + Barry-BCQT, user's partner on the team owns Siafu; all 3 codebases under Tinsu AI; no external partners.
- Three commits structured by directory (`.ai/*`, `docs/*`, `proposal/*`) for PR-style review readability rather than one giant commit.

## What Didn't Work

- **Framing A (shared backbone):** prose was honest but invited the "why didn't your 3 apps include this" objection. No good commercial answer.
- **Framing B (daily operations platform):** softer than A but didn't name the categorically distinct work. Still vulnerable to "why 4 products?" objection.
- **Tier vocabulary in early C (Operations modules / Supporting capabilities):** even after the headline reframe, "tier", "tầng", "phía trên / phía dưới", "supporting" preserved a hierarchy implication that read as backbone-in-disguise to a sharp critic. Had to be replaced with flat "two groups" framing in D2.
- **Test logic Q&A in §3 (added during framing C):** clever rhetorical preempt, but read defensively to a critic ("the seller knows this is shaky so they preempted it"). Removed in D2 in favor of a substantive "specific list of what the 3 apps don't hold" answer.
- **"Consume the TradeOps backbone" wording in glossary entries** for Siafu / Barry-CO / Barry-BCQT survived the first reframe wave because it wasn't in the active assertion of TradeOps' role — replaced in D2 with "integrate with the TradeOps platform via API contracts when triggered".
- **Initial guess that Phụ lục X is a customs appendix attached to TKXK** — wrong; it's a Bộ Công Thương C/O dossier form. Caught by domain-fact pass.
- **Initial wording "BCQT-facing định mức flattens BOM into Mẫu 16"** — wrong; Mẫu 16 is computed from actuals at year-end, not a flattening of BOM. User caught this directly with a domain explanation.

## Open Items

- The proposal is at "outline" maturity. Next artifact format (memo / slide deck outline / lightweight proposal site) not decided.
- No pricing / effort framing yet — waiting on a workshop with Trọng Tín - Hoa Nam to scope pilot end-client and document volume.
- High-stakes claims (Tồn CO framing in client-facing proposal, Phụ lục X positioning, RVC / CTC / PSR balance) should be vetted by a real Vietnamese customs consultant or experienced trưởng phòng XNK before final delivery — web-research review is best-effort, not authoritative.
- Critic flagged a structural tension that D2 polish softened but did not eliminate: 4 of 6 modules (item master, BOM, document, multi-view inventory) are read by the 3 workflow apps via API. A technical CIO at Trọng Tín - Hoa Nam may still ask "if all this data is what your apps consume, isn't that backbone in a different costume?" The proposal answers: API contracts not shared-DB; standalone-usable before Barry-CO integration; specific list of work the apps don't do. If this doesn't hold up in real customer conversation, the next reframe option (deferred D3) is critic's alternative: **per-end-client onboarding-and-defensibility product priced per onboarded client**.
- The ASCII stack diagram in `docs/architecture-positioning.md` is functional but not pixel-perfect aligned. Acceptable for internal doc; may want to redraw as a real diagram if it goes into a deck.
- Critic flagged one Vietnamese naturalness concern: a Vietnamese broker doesn't naturally say "không gian portfolio" — D2 fixed the §6 occurrence. There may be more naturalness polish if the proposal goes to client review and a Vietnamese-native reviewer flags more.
- Multi-broker capability hidden in client-facing language by design — but Tinsu AI's commercial roadmap explicitly wants to sell to other brokers later. Strategy on how to package this for that next sale is open (separate Tinsu AI internal concern).
- 3 commits on `main` not pushed. Push when user approves.
