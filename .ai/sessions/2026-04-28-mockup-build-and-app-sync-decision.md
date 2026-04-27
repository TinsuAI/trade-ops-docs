# 2026-04-28 — Mockup build + redesigns + app independence decision

Long session. Built clickable mockup from scratch (12→13 screens), deployed to GitHub Pages on a separate public repo, ran 2 rounds of UX critic + domain expert review with 3 tracks of fixes (regulatory / UX / terminology), iterated document-control 4 times, and landed a load-bearing architectural decision (Path-2: 4 apps standalone with API sync).

## What Was Done

### Mockup build (clickable, deployed)

- 12 screens initially (dashboard, end-client, item-master, bom, inventory, co-dossier, audit-defense, bcqt-cycle, dossier-list, ktstq-response, document-control, audit-trail), 13 after Track B (added `clients` listing).
- Stack: HTML + Tailwind via CDN + hash-routed multi-file partials + Manrope + IBM Plex Mono. No build step. BCQT-System tokens.
- Demo script `mockup/DEMO_SCRIPT.md` — 7 stations + per-station questions.
- Q-key presenter overlay — questions panel hidden by default; Q toggles fixed overlay; Esc closes.
- Scope-aware breadcrumb via sessionStorage — remembers last visited end-client, all data-screens (item-master/bom/inventory/document-control) breadcrumb derives from it.
- Customer stripes (4 colors: blue/pink/yellow/violet) on global lists (dashboard, dossier-list, audit-trail).
- Lot codes normalized to `<destination>-YYYY-MM` (EU-2026-04, KR-2026-03, etc.) — replaced sequential CO-2026-Q1-001.
- step-mini in tables (`4/8 ● Khảo sát BOM`) replaced 8-segment phase-pill bars.
- In-cell HQ drift timeline on item-master — `5208.2200 · 2025+` over strikethrough `5208.2100 · 2024`.
- Filter chips outline/solid (neutral hue, not status colors).
- BCQT 11-state stepper collapsed done-steps 1-7 into single green band.
- BLHS reference table demoted to dashed-border ref-panel ("Thông tin tham khảo").
- Audit-defense date-contrast hero — `Cấp 12/09/2023 → KTSTQ 27/04/2026 · 2 năm 7 tháng`.
- Dashboard triage 3-zone (Cần xử lý hôm nay / Chờ phản hồi / Đáng để ý) replacing 4-equal-weight panel layout.
- Next-station footer auto-rendered per route by router.

### Deployment

- Couldn't use Pages on private `TinsuAI/trade-ops-docs` — Free org plan blocks (`gh api -X POST .../pages` returns "current plan does not support GitHub Pages for this repository").
- Created separate public repo `TinsuAI/tradeops-mockup`, pushed mockup files at root, enabled Pages with `source[branch]=main` `source[path]=/`, live URL https://tinsuai.github.io/tradeops-mockup/.
- Sync workflow: edit private `mockup/`, copy to `/tmp/tradeops-mockup-deploy/`, commit + push to public repo, Pages auto-builds in ~30-60s.
- DEMO_SCRIPT.md kept in private repo only — never deployed.
- Branch `gh-pages` was tried briefly with restructured root files; deleted after switching to separate-repo approach.

### Round 1 redesign (UX critic spawned after first build)

Critic flagged 14 issues. Applied:

- **Stripped 6-band openers** (mockup-banner + eyebrow + h1 + page-subtitle paragraph + actions + KPI strip) → slim 56px page-bar with [h1 + tagline + actions]. KPI strips dropped from 5 of 7 detail screens.
- **Top nav 6 → 4** (Tổng quan / Khách hàng / Hồ sơ / Nhật ký). Dữ liệu nền + Tài liệu moved to end-client tabs.
- **Q-key presenter overlay** for workshop questions (replaced inline panel that ate screen space).
- **Triage dashboard** (3 opinionated zones) replacing 4 equal panels.
- **Audit-defense hero** with date-contrast as money shot.
- **Customer stripes** (4 colors) on global tables.
- **Lot codes** instead of sequential.
- **step-mini** in tables; phase-pill bars kept only on detail screens.
- **In-cell HQ drift timeline**, **chip outline/solid**, **BCQT collapsed done-steps**, **BLHS demoted**, **next-station footer**.

### Round 2 fixes (3 tracks)

Spawned UX critic + domain expert in parallel. Found new issues + verified prior. Applied as 3 tracks:

**Track A regulatory** (most urgent — domain expert called out "the most embarrassing single error"):

- **EVFTA HS 6203.42 PSR rewritten**: was "CTH chuyển nhóm 4 chữ" — wrong. EVFTA Chapter 62 garments require **fabric-forward** (vải dệt + cắt may tại VN/EU). Entire criterion table on co-dossier rewritten with 7 NVL rows showing fabric origin + cumulation + tolerance check; NVL-001246 polyester nhập TQ now correctly flagged as bottleneck.
- **Tolerance citation**: "Điều 9 Phụ lục VII EVFTA <10%" → **Note 7 Phụ lục I TT 11/2020/TT-BCT, 8% giá ex-works** for textile/apparel.
- **Phụ lục X correction**: was listed as C/O dossier component — wrong. Phụ lục X TT 05/2018 = bản khai NSX/NCC nội địa (supplier declaration). Đơn đề nghị cấp C/O for EVFTA = TT 11/2020. Updated co-dossier step 6.
- **HS classification fixes**: SP-DM-1067 áo gió changed from 6202.92 (cotton) to 6202.93 (synthetic) + name "polyester light weight"; SP-DM-1051 quần kaki + "100% cotton" specified; SP-DM-1124 áo gile + "100% cotton". audit-defense BOM NVL-DT-218 changed from 7404.00 (đồng phế liệu) to 7409.21 (đồng tấm) — copper waste doesn't make sense as input for IC.
- **BCQT VNACCS framing reversed**: was "KHÔNG phải VNACCS/VCIS" — wrong, BCQT does go through Hải quan electronic system (BCQT module). Changed to "qua module BCQT của hệ thống Hải quan điện tử".
- **Customs org labels post-2026-03-01 reform**: "Cục KTSTQ TP.HCM" → "Chi cục Hải quan khu vực II (TP.HCM)"; "Phòng QLXNK khu vực TP.HCM" → "Phòng QLXNK khu vực phía Nam (BCT)".

**Track B UX**:

- **Top nav `Khách hàng` link** unchained from hardcoded customer (was `#/end-client/dn-det-may-01`) → added new `clients` listing screen (`#/clients`) with 4 customer cards.
- **Scope-aware breadcrumb** via sessionStorage — `currentCustomer` stored when visiting end-client, all data screens use it for crumb (no longer hardcoded Thiên Hà).
- **Item-master sub-tabs** SP / NVL / BTP via inline JS toggle — replaced 3 stacked tables (~3000px wall) with 1 active table at a time. Default NVL pane (where drift story lives).
- **Audit-defense hero shrink** — dropped 7/7 + 42s stat blocks from hero (drowning the date-contrast); moved to single-line meta of "Gói hồ sơ chứng minh" zone.
- **Q chip rename** — "Câu hỏi Q" → "Phiên hỏi đáp Q" for clarity.
- **Lot codes normalize** — KR-2026-Q1 → KR-2026-03; JP-2026-Q1 → JP-2026-02; JP-2026-Q2 → JP-2026-04; D-2026-05 → TH-2026-05. Consistent `<dest>-YYYY-MM` grain.
- **Customer stripes propagated** to audit-trail rows (was only on dashboard + dossier-list).

**Track C terminology** (per domain expert):

- `bằng chứng` → `hồ sơ chứng minh` (XNK lingo, not criminal-investigation lingo)
- `lưu chụp` → `bản chụp` (natural Vietnamese)
- `Biến thể C/O` → `Loại C/O đặc biệt` (heading); button "Biến thể" → "Loại C/O"
- `phân lot không sửa được` → `phân lot bị khoá sau khi cấp`
- `khách hàng cuối` → `khách hàng` globally (broker context)
- `end-client` → `khách hàng` in body text (URLs preserved)
- `evidence`, `master data`, `drift`, `consumption`, `Provenance`, `Submit`, `Reminder`, `verify`, `snapshot`, `lot assignment immutable`, `point-in-time` all swapped to Vietnamese.

### Document-control iterations (4 versions)

User pushed back twice — design evolved substantially.

**v1 (basic flat list)** — page-bar + warning callout (42 chưa phân loại) + chip filter + 7-row table + questions panel.

**v2 proposed expansion (Kanban + detail panel)** — REJECTED by both critics. Critic UX: "Kanban implies humans pull cards across columns. Brokers don't manually move files through 'Tiếp nhận → Phân loại → Liên kết → Đã khoá' — files auto-progress as side effects. Theatre." Domain expert: "Brokers don't think in 4-stage file FSM — they think dossier-centric." Decision: cut Kanban, anchor on dossier states.

**v3 hierarchical** — backlog callout + 4-tab view (Theo hồ sơ default + Theo loại / Theo năm / Theo nguồn cross-cut) + dossier groups (6 dynamic + 2 master + 1 backlog) + quy ước zone. User asked to drop BCCT-derived inventory column ("không có tồn HQ"). Inventory became 3-view (kho / NXT / Tồn CO).

**v4 Tier 1+2 expansion** (per critic+domain consensus from another review):

- **Morning action zone** (replacing single backlog callout) — 4 cards 2x2 grid: 📥 Vào sổ chưa ghép · 🚢 Lô đang đi cần hoàn tất (with completeness checklist per dossier) · 📤 Chờ khách hàng phản hồi (outbound lane) · ⚠️ Sắp hết hạn 60 ngày (giấy phép + chữ ký mẫu BCT). Domain expert called this "the morning ritual broker actually does."
- **BOM v3 click-to-expand combo** inside EU-2026-04 dossier group — version history (v3 đề xuất / v2 đã chốt link CO-2026-Q1-008 / v1 đã chốt link CO-2025-Q4-019) + cross-ref BCQT ("Trích Mẫu 16 dòng 47 · vướng mắc 8,4% chênh") + retention dates per version + hồ sơ chính/tham chiếu.
- **Mẫu 27** added to "Theo loại" taxonomy (per domain expert: "blocker for BCQT scope credibility").
- **Actor column "Ai sửa cuối"** on file rows.
- **Retention badges "giữ đến MM/YYYY"** — single computed date per file (not multi-clock).
- **eCoSys provenance details** — TKXK row has "API_REF SO-MTD-103456789, signature cơ quan, không sửa được sau pull".
- Updated Quy ước zone with hồ sơ chính/tham chiếu, retention layered, provenance eCoSys rules.

### Router bug fix

- innerHTML doesn't execute inline `<script>` (browser security spec). Sub-tab toggles in item-master and view-tab toggles in document-control were silently broken.
- Fix: router re-creates script elements after fetch + innerHTML insert (clone attributes + textContent, replaceWith). Now per-screen inline scripts run.

### Architectural decision 2026-04-28: Path-2 (4 apps standalone + sync)

Triggered by user pushback when walking through Barry-CO + TradeOps integrated workflow. The narrative I wrote had Barry-CO querying TradeOps for BOM, item master, inventory, file storage — making Barry-CO effectively non-standalone.

Path explored with user:

- **Path 1** (status quo, implicit) — TradeOps owns master, workflow apps query via API. Bundle architecture. Problem: workflow apps not sellable standalone.
- **Path 2** (chosen) — each app standalone with own complete data model. When co-deployed, sync via API contracts using primary/mirror per entity type.
- **Path 3** — Master Data Service as separate component. Cleanest but adds 5th product.

Path 2 picked. Implementation:

- TradeOps primary for master data (item master, BOM, inventory baseline, hồ sơ thương nhân) when co-deployed.
- Each workflow app primary for its own state + outputs.
- TradeOps primary for cross-app concerns (document control, audit defense long-tail, daily ops dashboard, multi-view inventory reconciliation).
- Mirror UI is read-only on non-primary side to avoid conflicts.
- Sync: real-time webhook + periodic reconciliation + on-demand pull.
- Standalone-to-integrated migration: 1-time bulk import when broker adopts second app.

Memory updated:

- NEW `project_app_independence_sync.md` (in user's memory, ~/.claude/...) — full primer with table.
- UPDATE `project_item_master_foundation.md` — softened "must sit in TradeOps" to "primary in TradeOps when co-deployed; standalone has own".
- UPDATE `project_three_adjacent_systems.md` — dropped "shared backbone" framing.
- UPDATE `MEMORY.md` index.

DECISIONS.md updated with full record `[2026-04-28] All 4 Apps Standalone, Sync Via API Contracts When Co-Deployed`.

### File boundary clarification (related sub-decision)

While walking through Path-2 workflow, separate concern emerged: how does the system handle staff's ad-hoc Excel work (sửa liên tục, thêm sheet, draft cells)? Initial proposal had 3-layer model + "Bản đang làm" tab synced from Drive cá nhân.

Both critics rejected:

- UX critic: "The 5th tab is a clutter mistake. Drive sync is hand-wave engineering. Auto-snapshot of Zalo bytes silently is magic users will resent. The user's instinct is correct; productize the line, don't blur it."
- Domain expert (12-năm broker): "File nháp là bãi rác có chủ đích. Hệ thống thấy file nháp tôi — tôi tắt feature. Senior staff don't want junior to copy know-how; junior don't want senior to see drafts. VN broker culture has no 'shared drive everyone sees everything'."

Decision (this session): binary OUT/IN.

- Drive cá nhân = scratch invisible to system, by design.
- Tracked = explicit commit via 3 triggers: (a) staff button "Đính vào hồ sơ" / "Lưu bản đã gửi", (b) sự kiện hồ sơ (cấp C/O / nộp BCQT), (c) eCoSys auto-pull for files cơ quan returns.
- Outbound from inside system = LOG event only ("file X gửi cho Y lúc T from dossier Z"), NOT snapshot bytes.
- No "Bản đang làm" tab. No Drive sync. No "lock" as file FSM state.

Domain expert flagged what brokers actually want from system regarding scratch:

- Pre-submission checklist popup ("Bạn sắp nộp BCQT. Bản BOM trong hệ thống là v2 ngày 15/3. Có bản mới hơn không?")
- Auto-detect external email → suggest promote
- Reminder before dossier event with completeness check

Implemented in v4 document-control: morning action zone "Lô đang đi cần hoàn tất" with completeness checklist.

## Decisions Made

- **Polished mockup over wireframe** — user override of critic recommendation.
- **GitHub Pages on separate public repo** instead of private repo (Free plan blocks).
- **BCQT-System tokens lifted** (Manrope + IBM Plex Mono, slate + emerald-600) — visual continuity with sister product.
- **Single-page HTML with multi-file partials** via hash routing — no build step, easy editing.
- **Q-key overlay for workshop questions** — presenter affordance, not in broker eye-line.
- **Triage dashboard 3 opinionated zones** over equal-weight portal.
- **Audit-defense date-contrast hero** as money shot.
- **Lot codes** over sequential CO-prefix.
- **"đã chốt" not "đã khoá"** — broker vocabulary; lock is property of dossier, not file.
- **3-view inventory** (kho / NXT / Tồn CO) — user direction; BCCT-derived view dropped because label implies non-existent "tồn HQ".
- **Mẫu 27 first-class file type** — domain expert: "blocker for BCQT scope credibility" if missing.
- **EVFTA fabric-forward not CTH** for HS 6203.42 (Chapter 62 garments) — most critical regulatory fix.
- **Note 7 Phụ lục I TT 11/2020 + 8% ex-works** for tolerance.
- **Điều 30 NĐ 31/2018** for retention citation (not Điều 16).
- **Path-2 architecture** — 4 apps standalone with own data; sync via API primary/mirror per entity type. **Load-bearing decision.**
- **Binary OUT/IN file boundary** — scratch invisible, tracked = explicit commit.
- **Hierarchical doc-control over Kanban** — Kanban metaphor wrong for files (no human pulls between columns).
- **Document-control iterates as much as it took** (4 versions) — domain experts pushed back twice; design eventually landed on morning-action-zone primary + dossier-grouped table secondary.

## What Didn't Work

- **Pages workflow on private repo via GitHub Actions** — couldn't push `.github/workflows/pages.yml` because OAuth scope lacks `workflow`. Worked around with separate public repo + branch deployment.
- **gh auth refresh -s workflow** in non-interactive Bash — "--hostname required when not running interactively". Skipped; took alternate path.
- **First Pages attempt with branch `gh-pages` from private repo** — restructured files at root, pushed branch, but Pages API returned "current plan does not support GitHub Pages for this repository". Deleted gh-pages branch, pivoted to separate public repo.
- **First mockup design with polished UI + 6-band openers** — UX critic flagged as wallpaper; pushed content below fold. Stripped.
- **Initial Kanban pipeline for document-control** — both critics: theatre, files don't move by humans, FSM is wrong metaphor. Reverted.
- **Initial 3-layer file boundary with "Bản đang làm" tab** — both critics + broker: clutter, privacy concern, engineering hand-wave for Drive sync. Reverted to binary OUT/IN.
- **Auto-snapshot bytes on outbound** — domain: "brokers won't trust silent versioning, junior staff send unfinished drafts internally — would create rác". Demoted to "log event only".
- **Hash on every read** — both critics: engineering theatre. Removed.
- **Retention countdown per file** — décor, not actionable. Replaced with single "giữ đến MM/YYYY" date.
- **Initial assumption Barry-CO queries TradeOps for everything** — user pushback: "Barry-CO không đứng độc lập được, nó phụ thuộc quá nhiều vào TradeOps". Led to Path-2 decision.
- **HS 6203.42 PSR shown as CTH** — wrong rule; EVFTA Chapter 62 is fabric-forward, no CTH option. Domain expert: "the most embarrassing single error in the deck."
- **Citation Điều 16 NĐ 31/2018 for retention** — Điều 16 is procedure (cấp C/O), retention is Điều 30. Fixed throughout.
- **"Cục KTSTQ TP.HCM" terminology** — stale post-2026-03-01 reform when 20 chi cục khu vực replaced cấp tỉnh.
- **"KHÔNG phải VNACCS/VCIS" framing for BCQT submission** — wrong, BCQT does go through Hải quan electronic system. Reversed.
- **Phụ lục X listed as C/O dossier component** — wrong, Phụ lục X TT 05/2018 is supplier declaration. Replaced with TT 11/2020 list.
- **Initial Python regex sweep** broke audit-defense URLs (regex `audit-defense\b` matched `#/audit-defense/...` URL). Restored URLs in fix-up pass.
- **Inline `<script>` in screen partials** silently didn't execute due to innerHTML security spec. Took user's "không được" report to discover. Fixed with manual script-element re-creation in router.

## Open Items

- **Update proposal `proposal/de-xuat-tradeops-chi-tiet-vi.md`** to reflect 2026-04-28 Path-2 architecture (currently implicit Path-1).
- **Update workflow design docs** in `docs/workflow/co-dossier.md` etc. — currently implicit Path-1.
- **Update architecture-positioning doc** `docs/architecture-positioning.md` — same.
- **Optionally annotate mockup** with "Mode integrated" label so workshop is explicit.
- **Optionally build "Mode standalone TradeOps" parallel demo** if Phase 1 pilots go without Barry-CO.
- **TT-HN workshop** still pending (carried over from 2026-04-27).
- **Partner alignment for KB platform** still pending (carried over).
- **Pricing / effort framing** post-workshop.
- **Sync mechanics design** (not in this decision but called out): real-time webhook events, periodic reconciliation, on-demand pull, schema versioning between apps that may deploy at different versions.
- **Standalone-to-integrated migration tooling** — 1-time bulk import script per app pair (Barry-CO → TradeOps, etc.).
- **Mockup public repo workflow document** — describe in `mockup/README` or similar so the next AI knows the deploy pattern.
- **DEMO_SCRIPT.md may need update** to reflect Path-2 — current script implicitly walks an integrated mode.

## Reusable patterns from this session

- **Parallel UX critic + domain expert review for complex domain UI** — they diverge usefully (each catches issues the other misses). Apply consensus picks first; explore disagreements with user. Validated this session repeatedly.
- **File management for compliance/audit-defense systems** → binary OUT/IN boundary, scratch invisible, lifecycle anchored on parent entity (dossier), file state derived from parent state. Avoid file FSM, Drive sync, retention countdowns. Pattern reusable for any compliance / audit / legal-evidence system.
- **Architectural trap to watch for**: when product positions as "platform/hub" for several specialty workflow apps, the implicit assumption is workflow apps query the platform — this kills standalone capability + forces bundle commercial. Path-2 (each app standalone with own data; sync primary/mirror per entity type) is commercially safer.
- **Pre-submission checklist** is a high-leverage UX pattern for systems that interface with periodic external events (BCQT submission, C/O cấp). Domain expert: "đụng đúng nỗi đau quên thay file." Worth surfacing on relevant detail screens.
