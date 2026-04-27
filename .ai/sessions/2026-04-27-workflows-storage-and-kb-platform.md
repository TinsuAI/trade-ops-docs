# 2026-04-27 — Workflow design, file storage architecture, KB platform strategy

Long session covering: 4 workflow flow files for TradeOps with domain review; Vietnamese consolidated proposal; file storage architecture for per-broker TradeOps deployment with VN provider research; KB platform strategy (Athena evolution) with critic-reviewed reworks; multiple vocabulary cleanups across proposal docs. Ended with 3 thematic commits on `main`.

## What Was Done

### Workflow design (`docs/workflow/`)

- Overview file (personas, design principles, module mapping, flow inventory)
- `end-client-onboarding.md` — 7 steps from `proposed → ready-for-ops`
- `co-dossier.md` — 8+1 steps; covers preferential + non-preferential C/O; PSR-governs criterion logic; lot assignment as part of compliance decision (corrected from initial draft); factory inspection branch (Điều 28 NĐ 31/2018); cấp lại / cấp sau / back-to-back / Movement Cert variants
- `bcqt-cycle.md` — 11 states; TT 121/2025 templates; submission via Hệ thống tiếp nhận BCQT to Chi cục HQ (NOT VNACCS); 60-day self-amendment window; end-client sign-off as separate state
- `post-clearance-audit-response.md` — 7+1 states + 3 branches (desk-defense Điều 79 max 5 ngày no statutory extension; on-site Điều 80 max 10+10 ngày + biên bản 5 ngày + kết luận 15 ngày; appeal 90 ngày Điều 9 Luật Khiếu nại 2011; criminal escalation BLHS 188/189/200 with VND 100 triệu trốn thuế threshold)
- All 4 flow files have "general vs TT-HN-specific" markers to prevent overfitting to TT-HN as the standard

Domain expert review (general-purpose agent with WebSearch on thuvienphapluat.vn, vanban.chinhphu.vn, customs.gov.vn, congbao.chinhphu.vn): 22 of 26 citations verified, 4 corrected.

### Vietnamese consolidated proposal

- `proposal/de-xuat-tradeops-chi-tiet-vi.md` — 13 sections combining proposal outline + 4 workflows + open questions for workshop
- §11 lifts all "TT-HN-specific to validate later" markers from 4 workflow files into structured workshop questions (5+3+5+3+3 by sub-topic)
- §12 phụ lục has full regulatory citation chain
- Voice: objective (no first/second person pronouns), soft language ("kỳ vọng / hướng tới")

### Vocabulary and voice cleanups in proposal

- "tồn hải quan" removed throughout — 11 places fixed including BCCT-derived view rephrasing in DECISIONS / GLOSSARY / architecture-positioning / problem-framing / solution-outline / STATUS / sessions / MEMORY / project_inventory_paradox
- Audit claim softening: "khi hải quan kiểm tra ... mất nhiều ngày" → "khi có yêu cầu kiểm tra ... có thể rất lớn / có khả năng không dựng lại được đầy đủ"
- BOM CO/BCQT reframe: "BOM CO phải khớp BOM BCQT" → "định mức kỹ thuật và định mức thực tế phải đối chiếu được theo cùng dòng SP–NVL"
- TT-HN naming sync to "Trọng Tín - Hoa Nam" across 6 files including memory pointers
- §1 lead-in voice: "Giá trị của đại lý đến từ X" (lecturing) → "Vận hành cả danh mục khách hàng cuối qua nhiều năm gắn với một số phần việc xuyên suốt"
- §2.5 voice: drop competitive-advantage push; replace with neutral "khi danh mục tăng dần, các phần việc trở nên khó kiểm soát"
- ~30+ English terms translated to Vietnamese in client-facing docs (portfolio→danh mục, end-client→khách hàng cuối, audit trail→nhật ký kiểm tra, intake→tiếp nhận, master data→dữ liệu nền, defend→bảo vệ, deadline/blocker→hạn/vướng mắc, template→mẫu, trigger→điểm phát động, etc.); state machine identifiers translated to Vietnamese in code blocks

### File storage architecture (`docs/architecture/file-storage*.md`)

- `file-storage.md` — default architecture: VN cloud object storage with S3-compatible API; Postgres metadata layer with content-addressable SHA-256 keys; Object Lock for 5-year immutability; cross-VN-provider DR; backend-mediated access with signed URLs (5-15 min TTL); search via metadata only (OCR explicitly NOT in default after user pushed back)
- Boundary section explicit: provider is "hosted hard drive with S3 API"; all intelligence (auth, version semantics, audit trail, search, workflow) in Tinsu AI's code
- `file-storage-vn-providers.md` — point-in-time research on Viettel (Cloudian HyperStore base, Object Lock yes), VNG (4-tier archive best, Object Lock NOT advertised), FPT (FPT.AI Read 98% OCR strongest, Object Lock unverifiable from public docs), CMC (best Object Lock documentation, Samsung SDS C.OPE2N OCR)
- `file-storage-poc-checklist.md` — empirical verification gate for any candidate provider (S3 API smoke tests, Object Lock semantics, lifecycle, performance, cost estimation at 1TB hot + 4TB archive over 5 years)

### KB platform strategy (Athena evolution)

- Multiple discussion turns to land on **option A: promote Athena → Customs Knowledge Platform**; not option B (separate KB platform with Athena as specialty UI on top) or option C (KB standalone with Athena unchanged)
- Barry-CO surfaced as concrete second consumer from Phase 1 (user clarified: Barry-CO build cần access standardized + digitized CO knowledge), grounding compound benefit in near-term concrete demand vs Phase 3 speculation
- 3-layer IP model: shared (KB) / per-broker private (TradeOps) / per-end-client (TradeOps); concrete enforcement primitive added (provenance field NOT NULL + signed elevation record + 3 defense layers: schema, API endpoint, CI checks)
- MCP demoted to Phase 3 (gated on concrete LLM consumer); REST/GraphQL API as Phase 1 primary surface
- Phased roadmap with effort bands: Phase 1 = 3-5 engineer-month, Phase 2 = 2-3 engineer-month, Phase 3 = TBD demand-driven
- Curation operating cost: ~0.2-0.3 FTE annualized (canary: TT 121/2025 just superseded TT 39/2018)
- Two artifacts:
  - `docs/architecture/knowledge-base-positioning.md` (English internal architecture detail)
  - `docs/de-an-kb-platform.md` (Vietnamese partner-facing đề án; Vietnamese-first language with English only for irreplaceable terminology + parenthetical Vietnamese on first use)

### Critic review on KB đề án

- Spawned `critic` subagent — found 4 HIGH + 3 MEDIUM + 1 structural finding
- User confirmed advocacy framing intentional (overrode critic's structural finding #8)
- User correctly clarified compound benefit grounded in Barry-CO concrete demand (overrode critic's #2 partially)
- Other findings applied in rework: MCP demoted, provenance enforcement primitive added, effort bands added, curation cost section added, public Athena dropped from load-bearing, option C steelmanned

### Memory updates

- New project memories: `project_athena_existing.md`, `project_kb_athena_strategy.md`
- New feedback memory: `feedback_question_feature_necessity.md` (rule learned from OCR over-engineering incident)
- Updated existing: `project_inventory_paradox.md` (no "tồn hải quan" + 4 view names with provenance), `project_bom_vs_madmuc_16.md` (TT 121/2025 chain), `project_customer_and_team_structure.md` (TT-HN naming + bỏ "shared backbone" remnant), `feedback_verify_domain_claims.md` (existed from earlier)
- `MEMORY.md` pointers added/updated for all the above

### Final commits

3 thematic commits on `main` (not pushed):

- `3fd7e96` Add TradeOps workflow design and domain-fact corrections — workflows + Vietnamese consolidated proposal + vocabulary cleanups + .ai updates + prev session summary (14 files)
- `0b64f9a` Add file storage architecture for TradeOps per-broker deployment — 3 file storage docs
- `14bc5e8` Add KB platform strategy: promote Athena to Customs Knowledge Platform — knowledge-base-positioning.md + de-an-kb-platform.md

## Decisions Made

- **Workflow scope** (mid-session): start with 4 representative flows (onboarding, CO, BCQT, audit response); cross-cutting flows (staff handoff, continuous document intake) deferred or folded into others; declaration prep deferred since Siafu drives that
- **CO compliance flow correction**: user caught that eligibility check requires BOM + Tồn CO data first; restructured `co-dossier.md` step 3-4 (BOM/lot survey → origin compliance decision combining lot assignment + criterion check)
- **Domain expert review pattern**: spawn general-purpose agent with WebSearch on authoritative VN sources for any regulatory claim; user explicitly noted "domain knowledge needs heavy verification"
- **OCR explicitly NOT in file storage default**: user pushed back ("cần OCR với các thứ làm gì"); 3 use cases (search, extraction, audit reconstruction) all addressed by metadata; OCR is feature not infrastructure; saved as feedback memory
- **KB platform: option A over B over C**: chose promote Athena (option A) over building separate platform (option B) or standalone (option C); B has worst trade-off (parallel platform + Athena refactor); C is fallback if Athena tech stack doesn't fit broader scope
- **3-layer IP enforcement**: not just policy — concrete primitive (provenance field + elevation record) at schema + API + CI levels
- **MCP timing**: demoted to Phase 3 (gated on concrete LLM consumer); critic flagged MCP overselling and we agreed
- **Đề án is advocacy doc, not alignment doc**: user explicitly chose advocacy framing; presents recommendation with reasoning, not options open for ratification
- **Voice in client/partner-facing Vietnamese docs**: objective (no "tôi/anh/mình"); user pushed back on epistolary voice; want strategy memo / position paper register
- **English term policy in Vietnamese docs**: only for terminology that genuinely can't translate; English terms get parenthetical Vietnamese on first use
- **Compound benefit grounded in Barry-CO**: user clarified Barry-CO has near-term concrete need for standardized customs knowledge; not Phase 3 speculation about specialty UI #N
- **Three commits this session**: thematic split (workflows + domain corrections / file storage / KB platform) for clean history rather than one big commit

## What Didn't Work

- **Initial CO compliance flow had eligibility check before BOM survey** — user caught this is impossible since RVC/CTC/PSR are computed FROM the assigned lots; restructured to BOM survey → origin compliance decision combining lot assignment + criterion check
- **Initial proposal voice "Giá trị của đại lý đến từ X"** — user flagged as lecturing; replaced with observational
- **Initial proposal §2.5 competitive-advantage push** — user requested soften; replaced with neutral "khi danh mục tăng dần"
- **OCR included in file storage architecture default** — user pushed back; analyzed 3 use cases (search/extract/reconstruct); none requires OCR; removed from default; saved as feedback rule about over-engineering
- **First KB strategy framing "KB platform separate, Athena = specialty UI on top"** (option B) — user preferred "promote Athena to BE the platform" (option A); reduced greenfield cost + partner-friendly framing
- **First đề án to partner had "tôi/anh" voice** — user wanted neutral objective voice
- **First đề án had too much English** — user wanted Vietnamese-first with English only for irreplaceable terminology
- **First đề án structure as alignment doc** — user clarified intentional advocacy doc; the structural critic finding about "advocacy vs alignment" was overridden by user intent
- **Initial Mẫu 15a form code "BCQTSP-GSQL"** — verification agent found TT 121/2025 uses "BCQT-SP/GSQL" with hyphen+slash; updated
- **Initial QĐ 1103/QĐ-BCT framing as "all C/O issuance moved from VCCI"** — verification agent clarified scope: only non-preferential / Form B / CNM / GSP-Norway/Switzerland / REX recovered; preferential FTA C/O were already at MOIT/Cục XNK
- **Initial KTSTQ "kết luận 5 ngày"** — verification found biên bản 5 ngày làm việc vs kết luận 15 ngày; corrected
- **Initial desk audit "5+5 ngày extension"** — verification found Điều 79 has no statutory extension; corrected to 5 ngày only

## Open Items

- **Partner alignment session pending** — 5 technical questions about Athena (tech stack, data model, codebase topology, multi-content retrieval support, auth) + 3 strategic questions (Phase 1 timeline alignment with Barry-CO, curation owner, public Athena rollout timing) listed in `docs/de-an-kb-platform.md` §11
- **TT-HN workshop pending** — Vietnamese consolidated proposal `proposal/de-xuat-tradeops-chi-tiet-vi.md` ready for walkthrough; §11 of that doc has structured workshop questions
- **Optional vetting** — high-stakes regulatory claims (Tồn CO framing, Phụ lục X positioning, RVC/CTC/PSR balance, BCQT 60-day self-amendment, KTSTQ 2 venue branches with timings) by senior trưởng phòng XNK collaborator before final delivery
- **Pricing / effort framing for TradeOps** — pending workshop fixing pilot end-client scope and document volume
- **Critic concerns deferred** — 4 of 6 modules consumed by 3 workflow apps via API; sharp CIO may still ask "isn't that backbone in costume?"; alternative reframe (D3) is per-end-client onboarding-and-defensibility product priced per onboarded client
- **Audience drift risk for Athena UI** — Athena currently HS Code lookup users; broader knowledge scope may dilute UX; mitigation noted: future entry points (FTA assistant, etc.) as separate specialty UIs on same platform
- **Provenance + elevation record implementation** — architectural primitive defined but not implemented; engineering task for Phase 1 KB
- **Curation owner not yet assigned** — 3 options listed (in-house, external customs consultant, hybrid); recommended hybrid for first 2 years; needs Tinsu AI decision before Phase 1 starts
- **Three commits on `main` not pushed** — push when user approves
