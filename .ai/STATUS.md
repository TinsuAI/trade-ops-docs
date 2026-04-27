# Project Status

## Current State

TradeOps proposal artifacts substantially extended in 2026-04-27 session: 4 workflow flow files (domain-reviewed), Vietnamese consolidated proposal, file storage architecture (3 docs), KB platform strategy (architecture + đề án for partner). Three commits on `main` not pushed; working tree clean.

Two strategic deliverables ready for next interaction:

- Vietnamese partner-facing đề án `docs/de-an-kb-platform.md` proposing Athena evolution → Customs Knowledge Platform (option A); waiting for partner alignment session
- Vietnamese client-facing comprehensive proposal `proposal/de-xuat-tradeops-chi-tiet-vi.md` for TT-HN workshop reading

## Recent Changes (2026-04-27 session)

Commits on `main`:

- `3fd7e96` Add TradeOps workflow design and domain-fact corrections (14 files)
- `0b64f9a` Add file storage architecture for TradeOps per-broker deployment (3 files)
- `14bc5e8` Add KB platform strategy: promote Athena to Customs Knowledge Platform (2 files)

Major work:

- 4 workflow flow files (`docs/workflow/`): end-client-onboarding, co-dossier, bcqt-cycle, post-clearance-audit-response — domain-reviewed against TT 121/2025, NĐ 31/2018, LHQ 2014, BLHS 2015 etc.; 22 of 26 regulatory citations verified, 4 corrected (kết luận 15 ngày ≠ biên bản 5 ngày; Điều 79 desk audit no statutory extension; Mẫu 15a "BCQT-SP/GSQL" per TT 121/2025; QĐ 1103 scope tightened to non-preferential C/O recovery)
- Vietnamese consolidated proposal `proposal/de-xuat-tradeops-chi-tiet-vi.md` — 13 sections gộp outline + 4 workflows + open questions for workshop
- File storage architecture (`docs/architecture/file-storage*.md`): default per-broker architecture using VN cloud object storage; 4-provider research (Viettel/VNG/FPT/CMC); POC verification checklist
- KB platform strategy: chose option A (promote Athena → Customs Knowledge Platform) over options B and C; Barry-CO is concrete second consumer from Phase 1 grounding compound benefit; 3-layer IP model with provenance + elevation enforcement primitive; MCP demoted to Phase 3
- Critic review applied to KB đề án; reworked to drop MCP overselling, soften compound claim, add effort bands (3-5 engineer-month Phase 1), drop unverified public Athena market claim from load-bearing argumentation, add curation operating cost section (~0.2-0.3 FTE annualized)
- Vocabulary cleanup: "tồn hải quan" removed throughout (11 places fixed); audit claims softened to risk language; BOM CO ↔ Mẫu 16 reframed as reconciliation; TT-HN naming sync to "Trọng Tín - Hoa Nam"; voice softening in proposal §1 and §2.5; ~30+ English terms translated to Vietnamese in client-facing docs
- Memory: new entries `project_athena_existing.md`, `project_kb_athena_strategy.md`, `feedback_question_feature_necessity.md`; updated `project_inventory_paradox.md`, `project_bom_vs_madmuc_16.md`, `project_customer_and_team_structure.md`

## Next Steps

- **Partner alignment session on KB platform direction** — 5 technical questions about Athena (tech stack, data model, codebase topology, multi-content retrieval support, auth) + 3 strategic questions (Phase 1 timeline alignment with Barry-CO, curation owner, public Athena rollout timing); listed in `docs/de-an-kb-platform.md` §11
- After partner alignment: implement Phase 1 KB plan; update TradeOps proposal Phase 2-3 to reference KB integration
- TT-HN workshop: walk through Vietnamese consolidated proposal; collect answers to open questions in §11 of that doc
- Optional: vet high-stakes regulatory claims with senior trưởng phòng XNK collaborator before client delivery
- Optional: pricing / effort framing for TradeOps after pilot end-client scope and document volume confirmed
- Three commits on `main` not pushed; push when user approves

## Notes for Next AI Session

**Repo scope:** unchanged from prior sessions; this repo is proposal/discovery workspace, separate from `/home/vp/workspace/client/barry-CO`.

**TradeOps positioning** — locked, do NOT drift back: broker's portfolio + operations platform; categorically distinct from 3 workflow apps; modules in 2 groups (NOT tiers); per-broker independent deployment.

**Vocabulary to AVOID** (locked):

- "backbone", "shared backbone", "infrastructure layer", "tier", "phía trên / phía dưới", "supporting capabilities"
- "tồn hải quan" (no such concept; use "BCCT-derived view" / "tồn theo dữ liệu hải quan")
- "tầng nền cho 3 hệ thống"

**Domain facts to remember:**

- BOM (định mức kỹ thuật, point-in-time) and Định mức Mẫu 16 (annual computed from actuals) are distinct artifacts. Mẫu 16 is NOT a flattening of BOM.
- Multi-view inventory (physical / accounting NXT / BCCT-derived / Tồn CO) reconciled, not converged. There is no "tồn hải quan" concept — the BCCT-derived view is a balance computed from line-level declaration extracts pulled from the HQ system, not a balance the customs system itself holds. Tồn CO is "origin-rules-driven divergence" not "made submittable" (audit risk).
- Phụ lục X is a Bộ Công Thương C/O dossier form (Thông tư 05/2018/TT-BCT), NOT a TKXK appendix.
- BCCT is a line-level extract pulled on demand from the HQ system by date range.
- SXXK is tax-exempt (miễn thuế), not duty deferral.
- DNCX has heavier reporting burden, not "simplified customs".
- Mã hàng (enterprise-controlled, on declarations) drifts; mã HS (HS classification) is more stable.
- C/O issuance flows through Bộ Công Thương / Cục XNK via eCoSys. Preferential FTA C/Os had been issued by Cục XNK before. **QĐ 1103/QĐ-BCT (21/4/2025)** specifically recovered the **non-preferential C/O (Form B, CNM), GSP for Norway / Switzerland, and REX number** issuing authority from VCCI back to 18 regional Phòng QLXNK; VCCI ceased issuing those from 5/5/2025. EVFTA / UKVFTA outbound (VN→EU/UK): EUR.1 via eCoSys if FOB > 6.000 EUR; exporter self-cert on commercial document if ≤ 6.000 EUR. **REX is the EU-side mechanism for EU→VN imports**, not VN exporters.
- Origin criteria: **PSR governs when present** (per Form's annex). Only when no PSR applies does the general rule apply: Form D general = WO / RVC ≥ 40% / CTH (with trader's choice between RVC40 and CTH). CPTPP / RCEP rely heavily on PSR per heading; general fallbacks are narrow.
- Hồ sơ thương nhân registration on eCoSys (business reg + danh sách cơ sở SX + chữ ký mẫu, per Điều 13 NĐ 31/2018) is a hard prerequisite for first-time C/O per end-client. Common day-1 blocker on new-end-client onboarding.
- Factory inspection (kiểm tra cơ sở sản xuất per Điều 28 NĐ 31/2018 + TT 39/2018/TT-BCT) is a real conditional branch in CO flow. Adds ~2 working days. Produces biên bản kiểm tra.
- C/O variants beyond cấp mới: cấp lại (replacement), cấp sau (retroactive, Box 13), back-to-back (Form D), Movement Certificate (Form E). Each is a real workflow path, not edge case.
- BCQT regulatory chain: Điều 60 TT 38/2015 (sửa đổi khoản 39 Điều 1 TT 39/2018, sửa đổi tiếp TT 121/2025/TT-BTC hiệu lực 01/02/2026). TT 121/2025 replaced templates: Mẫu 15/BCQT-NVL/GSQL, Mẫu 15a/BCQT-SP/GSQL, Mẫu 16/ĐMTT-GSQL. Submission to **Chi cục HQ nơi đã thông báo cơ sở sản xuất** via **Hệ thống tiếp nhận BCQT** (distinct from VNACCS / VCIS).
- BCQT 60-day self-amendment window: end-client may resubmit corrected BCQT without penalty within 60 ngày from submission AND before any quyết định kiểm tra is issued. After either trigger this right is extinguished.
- BCQT submission liability attaches to **doanh nghiệp (end-client)**, not the broker. End-client written sign-off (xác nhận số liệu) before submission is a liability boundary, not a formality.
- KTSTQ initiated by **Quyết định kiểm tra sau thông quan** (administrative decision signed by Tổng cục/Cục KTSTQ/Cục HQ tỉnh/Chi cục), not công văn. 5-năm reopen window per Điều 77 Luật Hải quan 2014.
- KTSTQ has **2 venue branches**: tại trụ sở cơ quan hải quan (Điều 79 LHQ + Điều 97 NĐ 08/2015, max 5 ngày làm việc, **no statutory extension** per Điều 79) vs tại trụ sở người khai hải quan (Điều 80 LHQ + Điều 98 NĐ 08/2015, max 10 ngày làm việc + 10 ngày extension, on-site, daily biên bản làm việc, closing biên bản kiểm tra within 5 ngày làm việc of inspection end, **Kết luận kiểm tra issued within 15 ngày** of inspection end — biên bản ≠ kết luận).
- KTSTQ appeal: khiếu nại lần đầu within 90 ngày from receipt of quyết định xử phạt / kết luận kiểm tra (Điều 9 Luật Khiếu nại 2011); khiếu nại lần hai or khởi kiện hành chính subsequent. Criminal escalation thresholds per BLHS Điều 188 / 189 / 200 (trốn thuế VND 100 triệu, lower if prior penalty / conviction).
- Multi-broker capability lives at deployment layer (Tinsu AI internal) — never mention in client-facing proposal.

**Vietnamese client-facing language:**

- Soft binding language: kỳ vọng / hướng tới / có thể
- Avoid: cam kết / 100% / đồng thời / nghiệm thu / đúng hẹn
- Frame audit-defensible reasoning (origin rules) not submittability (audit-risky framing)

**Tinsu AI team structure:**

- All 4 product codebases (Athena, Siafu, Barry-CO, Barry-BCQT) belong to Tinsu AI
- User owns Barry-CO + Barry-BCQT; user's partner on the team builds Athena + Siafu
- "Partner" is an internal teammate, NOT an external organization

**Athena context (NEW this session):**

- Athena in production, fuzzy match HS Code by name, shared infra Tinsu AI host, partner-built; tech stack unknown to user (deferred to partner conversation)
- Strategy decision: promote Athena → Customs Knowledge Platform (option A); fallback option C if Athena tech stack doesn't fit broader scope
- Barry-CO is concrete second consumer from KB Phase 1 (FTA rules, Phụ lục templates, precedent, etc.) — grounds compound benefit in near-term demand
- 3-layer IP model: shared (KB) / per-broker private (TradeOps) / per-end-client (TradeOps); enforced via provenance field + signed elevation record + 3 levels defense in depth (schema, API, CI)
- MCP demoted to Phase 3 (gated on concrete LLM consumer); Phase 1 has REST/GraphQL API only
- Phase effort bands: Phase 1 = 3-5 engineer-month; Phase 2 = 2-3 engineer-month; Phase 3 = TBD demand-driven
- Curation operating cost: ~0.2-0.3 FTE annualized; canary TT 121/2025 just superseded TT 39/2018

**Doc voice conventions:**

- Internal English docs (`docs/`, `.ai/`) — English with Vietnamese domain terms preserved
- Client-facing Vietnamese proposal (`proposal/`) — Vietnamese with English only for irreplaceable terminology, parenthetical Vietnamese annotation on first use of English terms
- Pronouns: objective voice (no "tôi/anh/mình") in client / partner-facing docs
- Audit claim language: risk framing not assertion of fact

**User communication preferences (observed this session):**

- Short Vietnamese commands; "tao - mày" pronoun pattern
- Iterative direction: deliver substantive work, expect to be redirected
- Questions feature necessity actively (e.g., pushed back on OCR over-engineering); apply rule per `feedback_question_feature_necessity` memory
- Distinguishes between advocacy doc (recommend a path) and alignment doc (present options open) — both are legitimate, intent matters
- Wants English mixed with Vietnamese only for terminology that genuinely can't translate, with parenthetical Vietnamese on first use

**Critic review pattern established:**

- Spawn `critic` subagent for substantive review of strategic docs before sending to others
- Spawn `general-purpose` subagent with WebSearch for regulatory citation verification
- Apply findings selectively; advocacy framing can stay if intentional, but factual / structural concerns must be addressed

**Pending external dependency:**

- Partner alignment for KB platform direction (option A vs C); specifically need partner's input on Athena tech stack to confirm Phase 1 effort band

**Remaining structural concern (per critic, deferred):**

4 of 6 TradeOps modules are consumed by the 3 workflow apps via API. A sharp CIO may still ask "isn't that backbone in different costume?" The proposal answers: API contracts not shared-DB; standalone-usable before Barry-CO integration; specific list of work the apps don't do. If this doesn't hold up in real customer conversation, the next reframe option (deferred) is critic's alternative: per-end-client onboarding-and-defensibility product priced per onboarded client.
