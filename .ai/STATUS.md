# Project Status

## Current State

Two major artifact streams shipped this session:

1. **Clickable mockup deployed** — 13 screens (12 demo + clients listing) live at https://tinsuai.github.io/tradeops-mockup/. Built on private branch `mockup` in `trade-ops-docs`, deployed via separate public repo `TinsuAI/tradeops-mockup` (private repo + Free org plan can't host Pages). 2 rounds of UX critic + domain expert review applied; 3 tracks of fixes (regulatory truth / UX bugs / terminology). Document-control screen iterated 4 times to its current Tier 1+2 form (morning action zone with 4 cards + dossier-grouped hierarchy with cross-cut tabs + BOM v3 expansion combo with version history + cross-ref BCQT + retention dates).

2. **Architectural decision 2026-04-28: 4 apps standalone + sync via API** — committed to `.ai/DECISIONS.md`. Replaces implicit Path-1 (TradeOps owns master, workflow apps query it) with Path-2 (each of 4 apps standalone-capable with own data model; sync via API contracts using primary/mirror per entity type when co-deployed). Memory updated in tandem.

3. **Doc-control scope tightening (post-second-handoff)** — user raised "TradeOps có quá tham không?" Document-control v4 had drifted into 4-card morning-action grid mixing file concerns (Vào sổ) with dossier-level concerns (Lô đang đi, Chờ KH, Sắp hết hạn). Pulled 3 dossier-level cards back to dashboard; doc-control now scoped to file-thuần. Dashboard gained 2 new zones (Lô đang đi với completeness checklist + Sắp hết hạn 60 ngày) and "Chờ phản hồi" zone enriched. Boundary now: file concern ở doc-control, portfolio/dossier concern ở dashboard.

Working tree clean on `mockup` branch. Both `mockup` private and `main` public-mockup pushed to remote.

## Recent Changes (2026-04-28 session)

Commits on `mockup` branch (12 total, vs `main` unchanged):

- `212cdfd` Doc-control: scope back to file-thuần; dashboard gains Lô đang đi + Sắp hết hạn zones, Chờ phản hồi enriched
- `f6fcf4d` Handoff 2026-04-28: mockup build + redesigns + Path-2 architecture decision
- `9fe248e` Decision 2026-04-28: 4 apps standalone with API sync (primary/mirror per entity)
- `a015710` Doc-control: Tier 1+2 expansion per critic+domain consensus
- `cbad0f5` Router: re-execute scripts on screen load (fixes view/subtab toggles)
- `abcfa77` Document control: dossier-grouped hierarchy with cross-cut views
- `e9c67cf` Document control: workflow-clear redesign with broker-anchored vocabulary
- `f44c9fe` Tracks A+B+C: regulatory + UX + terminology fixes from expert reviews
- `8a29528` Language sweep, drop BCCT view, add SP/BTP tables to item master
- `a61c5b1` Mockup redesign: strip 6-band openers, demote KPI strips
- `4885289` Add remaining 5 mockup screens
- `6e7b450` Add TradeOps clickable mockup

Major work (this session):

- **Built clickable mockup from scratch**: 12 screens initially, 13 after Track B (added `clients` listing). HTML + Tailwind via CDN + hash-routed multi-file partials, no build step. Tokens lifted from BCQT-System (Manrope + IBM Plex Mono, slate + emerald-600). Q-key presenter overlay for workshop questions. Demo script `mockup/DEMO_SCRIPT.md` with 7 stations.
- **Deployed to GitHub Pages**: had to use separate public repo `TinsuAI/tradeops-mockup` because Free org plan blocks Pages on private repos (`gh api -X POST .../pages` returns "current plan does not support"). Workflow: edit private `mockup/`, copy to `/tmp/tradeops-mockup-deploy/`, push to public repo, Pages auto-builds.
- **Round 1 redesign** after UX critic: stripped 6-band openers (banner+eyebrow+h1+subtitle+actions+KPI strip → slim 56px page-bar), top nav 4 items (Tổng quan / Khách hàng / Hồ sơ / Nhật ký), dashboard triage 3-zone (Cần xử lý / Chờ phản hồi / Đáng để ý), audit-defense date-contrast hero, customer stripes 4 colors, step-mini replacing phase-pill in tables, in-cell HQ drift timeline, filter chips outline/solid, BCQT collapsed done-steps, BLHS demoted to ref-panel, next-station footer auto-rendered.
- **Round 2 fixes (3 tracks)**:
  - **Track A regulatory** — EVFTA HS 6203.42 PSR is **fabric-forward** not CTH (entire criterion table rewritten); tolerance citation `Note 7 Phụ lục I TT 11/2020/TT-BCT, 8% giá ex-works` (not "Điều 9 Phụ lục VII <10%"); Phụ lục X is supplier declaration, not C/O dossier component (Đơn đề nghị cấp C/O is from TT 11/2020 EVFTA); HS classification fixes (SP-DM-1067 polyester not cotton → 6202.93); BCQT VNACCS framing reversed ("qua module BCQT của hệ thống Hải quan điện tử"); customs org labels post-2026-03-01 reform ("Chi cục Hải quan khu vực II (TP.HCM)"); HS 7404 → 7409.21 in audit-defense BOM.
  - **Track B UX** — clients listing screen added; top nav `Khách hàng` link unchained from hardcoded customer; scope-aware breadcrumb via sessionStorage; item-master sub-tabs SP/NVL/BTP via inline JS; audit-defense hero shrink (drop 7/7 + 42s stat blocks); Q chip rename; lot codes normalized to `<dest>-YYYY-MM` grain.
  - **Track C terminology** — `bằng chứng` → `hồ sơ chứng minh` (XNK lingo not criminal-investigation lingo); `lưu chụp` → `bản chụp` (natural); `Biến thể C/O` → `Loại C/O đặc biệt`; `phân lot không sửa được` → `phân lot bị khoá sau khi cấp`.
- **Document control iteration (4 versions)**:
  - v1 basic flat list → v2 proposed Kanban + detail panel (rejected by critic as "theatre, files don't move by humans") → v3 hierarchical groups (Theo hồ sơ default + Theo loại / Theo năm / Theo nguồn cross-cut tabs) → v4 Tier 1+2 expansion.
  - v4 adds: morning action zone with 4 cards (📥 Vào sổ chưa ghép · 🚢 Lô đang đi cần hoàn tất · 📤 Chờ khách hàng · ⚠️ Sắp hết hạn 60 ngày), BOM v3 click-to-expand combo (version history + cross-ref BCQT Mẫu 16 dòng 47 + retention dates), Mẫu 27 in taxonomy, "Ai sửa cuối" actor column, retention "giữ đến MM/YYYY" single computed date, eCoSys provenance details.
- **Router bug fixed**: innerHTML doesn't execute inline `<script>` (browser security) — sub-tab toggles in item-master and view-tabs in document-control were silently broken. Router now re-creates script elements after fetch + innerHTML.
- **Architectural decision 2026-04-28** — Path-2 architecture (4 apps standalone + sync). Triggered by user pushback when walking through Barry-CO + TradeOps integrated workflow: implicit assumption was Barry-CO queries TradeOps every step, which makes Barry-CO non-standalone. Two reviews (UX critic + domain expert) on file-boundary subquestion converged on binary OUT/IN. Architectural Path 2 documented in `project_app_independence_sync.md`; existing memory softened (`project_item_master_foundation.md`, `project_three_adjacent_systems.md`); decision record added to `.ai/DECISIONS.md`.

Memory file changes (in `~/.claude/projects/-home-vp-workspace-client-tradeops/memory/`):

- NEW `project_app_independence_sync.md` — full decision primer
- UPDATE `project_item_master_foundation.md` — softened "must sit in TradeOps"
- UPDATE `project_three_adjacent_systems.md` — dropped "shared backbone" framing
- UPDATE `MEMORY.md` — new pointer

## Next Steps

- **Update proposal `proposal/de-xuat-tradeops-chi-tiet-vi.md`** to reflect 2026-04-28 Path-2 architecture — currently implicit Path-1; needs to clarify each app standalone-capable, sync via API. Defer until pre-workshop polish.
- **Update workflow design docs** in `docs/workflow/co-dossier.md` etc. to reflect each app standalone — currently implicit Path-1.
- **Update architecture-positioning doc** `docs/architecture-positioning.md` — same.
- **Optionally add "Mode integrated" annotation** to mockup screens (`co-dossier`, `document-control`) so workshop attendees understand current demo is integrated mode.
- **Optionally build "Mode standalone TradeOps" parallel demo** for Phase 1 pilots without Barry-CO — would show different workflow without auto-generated files, manual workflow advancement.
- **TT-HN workshop walkthrough** (carried over from prior session) — Vietnamese consolidated proposal ready + mockup ready. Mockup demo script in `mockup/DEMO_SCRIPT.md` (7 stations, ~25 min).
- **Partner alignment for KB platform** (carried over) — 5 technical + 3 strategic questions in `docs/de-an-kb-platform.md` §11.
- **Pricing / effort framing** — defer until after workshop fixes pilot scope.
- **Decide if standalone-mode parallel demo needed** for Phase 1 pilots without Barry-CO.

## Notes for Next AI Session

**Mockup deployment workflow:**

- Source of truth: private repo `trade-ops-docs` branch `mockup`, dir `mockup/`
- Deploy mirror: public repo `TinsuAI/tradeops-mockup` (Pages-enabled, root /), live at https://tinsuai.github.io/tradeops-mockup/
- Sync flow: edit `mockup/`, then `cp index.html assets/* screens/* /tmp/tradeops-mockup-deploy/...`, then `cd /tmp/tradeops-mockup-deploy && git add -A && git commit -m "..." && git push`. Pages auto-rebuilds in ~30-60s.
- Verify: `until [ "$(gh api repos/TinsuAI/tradeops-mockup/pages/builds/latest --jq .status)" = "built" ]; do sleep 5; done`
- DEMO_SCRIPT.md in private repo only — never deploy (workshop-internal)

**Architecture decision 2026-04-28 (load-bearing):**

- Each of 4 apps (TradeOps, Barry-CO, Barry-BCQT, Siafu) is **standalone-capable** with own data model. Standalone scope is narrower (Barry-CO has no cross-customer view; TradeOps has no auto C/O workflow engine), but each fully usable.
- When co-deployed, sync via **API contracts** with **primary/mirror per entity type**.
- Primary designation when co-deployed: TradeOps for master data (item master, BOM, inventory baseline, hồ sơ thương nhân); each workflow app for its own state + outputs; documents primary in whichever app generated, mirrored to TradeOps.
- This is the corrected position. Previous memory wording ("must sit in TradeOps", "the layer the 3 apps build on top of") is stale and softened.
- See `project_app_independence_sync.md` for full primer.

**File boundary (locked from this session):**

- Binary OUT/IN. Drive cá nhân = scratch invisible to system, by design. Tracked = explicit commit via action of staff.
- 3 commit triggers: (a) staff button "Đính vào hồ sơ" / "Lưu bản đã gửi", (b) auto-snap on dossier event (cấp C/O / nộp BCQT), (c) eCoSys auto-pull for files cơ quan returns.
- Outbound (email/Zalo from inside system) = LOG event only, reference committed version. NOT snapshot bytes.
- No "Bản đang làm" tab. No Drive sync. No "lock" as file FSM state — broker says "đã chốt" (dossier closed).

**Mockup positioning state (locked):**

- Polished, not wireframe (user override of critic recommendation).
- Hash routing + multi-file partials + Tailwind CDN, no build step. Per-screen inline `<script>` works because router re-executes after innerHTML.
- BCQT-System tokens (Manrope + IBM Plex Mono, slate + emerald-600). Dark theme deferred.
- Customer fictional names: Thiên Hà Dệt May (stripe-1 blue), Linh Kiện Điện Tử Minh Phú (stripe-2 pink), Cơ Khí Tân Hưng (stripe-3 yellow), Bao Bì Việt Long (stripe-4 violet).
- Lot codes: `<destination>-YYYY-MM` grain (EU-2026-04, KR-2026-03, JP-2026-02, etc.). NOT sequential CO-2026-Q1-001.
- Q-key presenter overlay for workshop questions — `Phiên hỏi đáp` chip in topnav + Q keypress + Esc close.

**Domain facts to keep — superseded entries:**

- EVFTA HS 6203.42 PSR is **fabric-forward** (vải dệt + cắt may tại VN/EU). NOT CTH. Tolerance is **8% giá ex-works** per **Note 7 Phụ lục I TT 11/2020/TT-BCT**.
- C/O retention is **Điều 30 NĐ 31/2018** (5 năm từ ngày C/O cấp), NOT Điều 16. TKHQ retention is Điều 18 LHQ 2014. Chứng từ kế toán nguồn 10 năm theo Luật Kế toán 88/2015.
- Customs org post-2026-03-01 reform: "Chi cục Hải quan khu vực II (TP.HCM)" thay "Cục KTSTQ TP.HCM"; 20 chi cục khu vực thay cho cấp tỉnh cũ.
- BCQT submission goes through **module BCQT của Hải quan điện tử** (Cục Hải quan), NOT separate from VNACCS. Earlier "KHÔNG phải VNACCS/VCIS" framing was wrong.
- Phụ lục X TT 05/2018 = bản khai NSX/NCC nội địa (supplier declaration), **không phải đơn đề nghị cấp C/O**. Đơn đề nghị cấp C/O cho EVFTA = TT 11/2020/TT-BCT.
- Mẫu 27 = định mức thực tế đăng ký, đi kèm BCQT năm — first-class file type for dệt may DNCX.

**Vietnamese terminology (locked):**

- "khách hàng" not "khách hàng cuối" (broker context)
- "hồ sơ chứng minh" not "bằng chứng" (XNK lingo, not criminal-investigation)
- "bản chụp" not "lưu chụp" (natural)
- "đã chốt" not "đã khoá" (broker word for closed dossier)
- "vào sổ" / "ghép vào hồ sơ" (broker verbs for intake / linking)
- "Loại C/O đặc biệt" not "Biến thể C/O"
- "phân lot bị khoá sau khi cấp" not "phân lot không sửa được"

**Critic + domain review pattern (validated this session):**

- Spawn UX critic + domain expert in **parallel** when designing complex domain UI. They diverge usefully — each catches issues the other misses.
- Domain expert (general-purpose subagent with WebSearch on thuvienphapluat.vn etc.) for regulatory + Vietnamese broker practice verification.
- UX critic (critic subagent) for UX heuristics, navigation correctness, hierarchy.
- Apply consensus picks first; explore disagreements with user before deciding.

**User communication preferences (locked):**

- Short Vietnamese commands; "tao - mày" pronoun pattern
- Pushes back on over-engineering (rejected Kanban for files, rejected Drive sync, rejected hash on every read)
- Asks to call critics + experts before commit to direction — "gọi review" pattern is welcomed
- Iterative: deliver substantive work, expect to be redirected
- Distinguishes binary boundary from gradient — when proposing 3-layer model, user said "vẫn chưa hình dung được" until simplified

**Pending external dependencies (carried over):**

- TT-HN workshop pending (Vietnamese consolidated proposal ready)
- Partner alignment for KB platform pending (5+3 questions in `docs/de-an-kb-platform.md` §11)

**Repo / branch state:**

- Branch `mockup` ahead of `main` by 10 commits. `main` last touched in 2026-04-27 session (3 commits not pushed).
- Public mirror: `TinsuAI/tradeops-mockup` ahead 6+ commits since first deploy.
- Private repo `TinsuAI/trade-ops-docs` Free plan — no Pages possible there.
