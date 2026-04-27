# Project Status

## Current State

The TradeOps proposal is fully drafted and committed on `main` (3 commits this session, not pushed). After three positioning iterations and a domain-fact pass, the proposal is positioned as the **broker's portfolio + operations platform** for customs brokers — categorically distinct from the three workflow apps (Siafu, Barry-CO, Barry-BCQT) that the same Tinsu AI team is building.

Vietnamese client-facing draft (`proposal/client-proposal-outline-vi.md`), English internal docs (`docs/problem-framing.md`, `docs/solution-outline.md`, `docs/architecture-positioning.md` — new), decision history (`.ai/DECISIONS.md`), and glossary (`.ai/GLOSSARY.md`) are all in sync. Working tree is clean.

## Recent Changes (2026-04-26 session)

Commits on `main`:

- `5818fa8` Rename project to TradeOps
- `4e4aa5a` Update .ai docs for portfolio-platform reframe
- `950f29e` Reframe internal docs around broker portfolio platform framing
- `d6ae4f7` Rewrite Vietnamese proposal under broker portfolio framing

Major work:

- Rebranded project Origin Ops Platform → TradeOps
- Resolved first wave of architectural decisions (tenant model, document-first center of gravity, system role; later added: multi-view inventory + item master)
- Customer context briefed: Trọng Tín - Hoa Nam pilot, Tinsu AI team structure (user + partner)
- Domain-fact pass via web research (Nghị định 134/2016 + 18/2021, Thông tư 38/2015 + 39/2018, Thông tư 33/2023, Thông tư 05/2018/TT-BCT) — multiple corrections applied
- Positioning reframed three times after critic reviews, ending in: portfolio + operations platform with daily-ops modules + per-end-client master-data modules (no tier hierarchy)
- New file `docs/architecture-positioning.md` documents 4-component topology and ASCII stack diagram

## Next Steps

- Walk Trọng Tín - Hoa Nam through the new framing in person; capture pushback into a discovery note
- Decide whether the next artifact is a proposal memo, slide deck outline, or lightweight proposal site
- Add pricing / effort framing once a workshop fixes pilot end-client scope and document volume
- Optional: produce an English internal-facing version of the proposal for the project team
- Optional: have a real Vietnamese customs consultant or experienced trưởng phòng XNK vet high-stakes claims (Tồn CO framing, Phụ lục X positioning, RVC/CTC/PSR balance) before sending to client

## Notes for Next AI Session

**Repo scope:**

- This repo is intentionally separate from `/home/vp/workspace/client/barry-CO`
- Stay focused on proposal and product framing, not case-specific data processing

**TradeOps positioning (current — DO NOT drift back to prior framings):**

- TradeOps is the **broker's portfolio + operations platform**. The categorically distinct work it does (and the 3 apps cannot): portfolio management of N end-clients across years, audit defense over post-clearance audit window (kiểm tra sau thông quan, ~5 years), staff-knowledge continuity.
- The 3 apps (Siafu, Barry-CO, Barry-BCQT) are workflow accelerators triggered by specific events. They integrate with TradeOps via **published API contracts**, not shared-database direct access. TradeOps stands independent.
- Modules organized in 2 **groups** (NOT tiers): **daily-ops modules** (Dossier & client mgmt, Document control, Audit trail) + **per-end-client master-data modules** (Item master + code translation, BOM + period-flow data, Multi-view inventory).
- When customer asks "why can't the 3 apps absorb this?" — answer with the **specific** list (proposal §3 + architecture-positioning): cross-client portfolio, documents arriving outside any compliance trigger, cross-workflow data continuity, ops work outside compliance scope, cross-year reconstruction. Don't rely on generic "categorical distinction" assertions.

**Vocabulary to AVOID** (all carry hierarchy / infrastructure-for-the-apps implications that re-introduce rejected framings):

- "backbone", "shared backbone", "infrastructure layer"
- "tầng nền cho 3 hệ thống"
- "tier", "phía trên / phía dưới"
- "supporting capabilities"

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
- Factory inspection (kiểm tra cơ sở sản xuất per Điều 28 NĐ 31/2018 + TT 39/2018/TT-BCT) is a real conditional branch in CO flow: triggered by first-time SP-Form, unclear hồ sơ, suspected gian lận chuyển tải, prior violation. Adds ~2 working days. Produces biên bản kiểm tra.
- C/O variants beyond cấp mới: cấp lại (replacement), cấp sau (retroactive, Box 13), back-to-back (Form D), Movement Certificate (Form E). Each is a real workflow path, not edge case.
- BCQT regulatory chain: Điều 60 TT 38/2015 (sửa đổi khoản 39 Điều 1 TT 39/2018, sửa đổi tiếp TT 121/2025/TT-BTC hiệu lực 01/02/2026). TT 121/2025 replaced templates: Mẫu 15/BCQT-NVL/GSQL, Mẫu 15a/BCQT-SP/GSQL, Mẫu 16/ĐMTT-GSQL. Submission to **Chi cục HQ nơi đã thông báo cơ sở sản xuất** via **Hệ thống tiếp nhận BCQT** (distinct from VNACCS / VCIS — VNACCS is the declaration channel, NOT BCQT).
- BCQT 60-day self-amendment window: end-client may resubmit corrected BCQT without penalty within 60 ngày from submission AND before any quyết định kiểm tra is issued. After either trigger this right is extinguished.
- BCQT submission liability attaches to **doanh nghiệp (end-client)**, not the broker. End-client written sign-off (xác nhận số liệu) before submission is a liability boundary, not a formality.
- KTSTQ initiated by **Quyết định kiểm tra sau thông quan** (administrative decision signed by Tổng cục/Cục KTSTQ/Cục HQ tỉnh/Chi cục), not công văn (though preceding công văn yêu cầu giải trình may arrive). 5-năm reopen window per Điều 77 Luật Hải quan 2014.
- KTSTQ has **2 venue branches**: tại trụ sở cơ quan hải quan (Điều 79 LHQ + Điều 97 NĐ 08/2015, max 5 ngày làm việc, **no statutory extension** per Điều 79) vs tại trụ sở người khai hải quan (Điều 80 LHQ + Điều 98 NĐ 08/2015, max 10 ngày làm việc + 10 ngày extension, on-site, daily biên bản làm việc, closing biên bản kiểm tra within 5 ngày làm việc of inspection end, **Kết luận kiểm tra issued within 15 ngày** of inspection end — biên bản ≠ kết luận).
- KTSTQ appeal: khiếu nại lần đầu within 90 ngày from receipt of quyết định xử phạt / kết luận kiểm tra (Điều 9 Luật Khiếu nại 2011); khiếu nại lần hai or khởi kiện hành chính subsequent. Criminal escalation thresholds per BLHS Điều 188 / 189 / 200 (trốn thuế VND 100 triệu, lower if prior penalty / conviction).
- Multi-broker capability lives at deployment layer (Tinsu AI internal) — never mention in client-facing proposal.

**Vietnamese client-facing language:**

- Soft binding language: kỳ vọng / hướng tới / có thể
- Avoid: cam kết / 100% / đồng thời / nghiệm thu / đúng hẹn
- Frame audit-defensible reasoning (origin rules) not submittability (audit-risky framing)

**Tinsu AI team structure:**

- All 3 app codebases (Siafu, Barry-CO, Barry-BCQT) belong to Tinsu AI
- User owns Barry-CO + Barry-BCQT; user's partner on the team builds Siafu
- "Partner" is an internal teammate, NOT an external organization

**Remaining structural concern (per critic, deferred):**

4 of 6 modules are consumed by the 3 workflow apps via API. A sharp CIO may still ask "isn't that backbone in different costume?" The proposal answers: API contracts not shared-DB; standalone-usable before Barry-CO integration; specific list of work the apps don't do. If this doesn't hold up in real customer conversation, the next reframe option (deferred) is critic's alternative: per-end-client onboarding-and-defensibility product priced per onboarded client.
