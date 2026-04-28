# 2026-04-28 (continued) — Doc-control scope pullback after greed check

Short follow-up to earlier 2026-04-28 session. User asked the right meta-question: "TradeOps có đang quá tham, muốn làm tất cả? Ví dụ quản lý file thì chỉ cần Google Drive + quy trình bắt buộc là đủ?" Triggered a scope review and rescoping of doc-control screen.

## What Was Done

- **Diagnosed: doc-control v4 had drifted into greed.** The 4-card "Cần xử lý hôm nay" zone mixed file concerns (Vào sổ chưa ghép) with dossier-level concerns (Lô đang đi cần hoàn tất, Chờ khách hàng phản hồi, Sắp hết hạn 60 ngày). 3 of 4 cards weren't actually about files — they were about dossiers, customers, calendar. Doc-control was eating dashboard's job.
- **Articulated the boundary clearly.** Layer-1 question (TradeOps scope as a product) — not greedy; 6 modules across 2 groups all have load-bearing rationale. Layer-2 question (how each module is built) — doc-control specifically had drifted. Drive + folder convention can solve 60% of file management. The 40% TradeOps adds: cross-ref BCQT (Mẫu 16 dòng 47 traceability), pre-submission completeness checklist, snapshot-at-issuance for KTSTQ defense, multi-app inventory reconciliation, cross-customer portfolio overview, audit trail across files+actions. Without these, TradeOps doc-control would be a Drive imposter — would be lừa đảo. With these, it's a meta-layer Drive can't replace.
- **User chose Path B: pull dossier-level cards out.** Doc-control reverts to scope of "files within their hierarchical dossier home + cross-ref + version + retention." Dashboard absorbs the dossier-level morning-ritual concerns.

### Concrete changes

**`screens/document-control.html`**:

- Removed 4-card grid in "Cần xử lý hôm nay" zone.
- Replaced with single warning callout "42 file vào sổ chưa ghép hồ sơ" — file-thuần concern only.
- Quyền xem note moved to align right of the callout.
- Everything else preserved: 4-tab views, dossier groups (Theo hồ sơ default), BOM v3 click-to-expand combo with version history + cross-ref BCQT + retention, Mẫu 27 in taxonomy, Quy ước nhóm file, Câu hỏi mở.

**`screens/dashboard.html`**:

- Existing "Chờ phản hồi" triage zone enriched: count 3 → 4, added "INV-2026-04-189 sửa lại" outbound item (Thiên Hà · đã nhắn 3 lần · 9 ngày).
- New zone after triage 3-zone: **🚢 Lô đang đi · cần hoàn tất hồ sơ (3)** — table format with cột "Còn thiếu" inline (EU-2026-04 thiếu 2, D-2026-05 thiếu 1, JP-2026-05 thiếu 4). Sorted by deadline.
- New zone after Lô đang đi: **⚠️ Sắp hết hạn 60 ngày (3)** — Giấy phép kiểm dịch BVTV (21 ngày), Chữ ký mẫu BCT Hoàng Minh Phú (39 ngày), MSDS halal (62 ngày).
- "Hồ sơ đang xử lý" table preserved at original position.
- "Tổng quan portfolio" summary preserved at bottom.

Final dashboard structure: Triage 3 zones → Lô đang đi zone → Sắp hết hạn zone → Hồ sơ đang xử lý table → Portfolio summary. Total 5 substantive zones, each with concrete reason.

## Decisions Made

- **Doc-control scope = file-thuần only.** No dossier-level cards. No calendar/expiry. No outbound-pending. Anything that's not "file as artifact" belongs elsewhere.
- **Dashboard owns morning-ritual concerns**: triage (Cần / Chờ / Đáng để ý), pending shipments with completeness, expiry watch.
- **Hồ sơ đang xử lý table kept** alongside new "Lô đang đi" zone — different angles same data. Lô đang đi focuses on "cần hoàn tất file gì" (completeness lens). Hồ sơ đang xử lý is "list of dossiers in progress sorted by deadline" (queue lens). Both useful, both kept.
- **Path B over Path A**: hold 1-card doc-control + 5-zone dashboard, vs keeping 4-card morning zone in doc-control. Path B respects the "doc-control = file management, dashboard = portfolio" mental model.

## What Didn't Work / Avoided

- **Folding "Lô đang đi" into existing "Cần xử lý hôm nay" zone** — considered, rejected. Different concept: completeness gap is not the same as deadline urgency. Some lô đang đi have 13-15 ngày (not urgent) but still need completeness check. Deserves dedicated surface.
- **Replacing "Hồ sơ đang xử lý" table with "Lô đang đi" zone** — considered, rejected. They're different angles same data. Replacing would lose the queue/sort-by-deadline view that broker uses for general status.
- **Adding "Sắp hết hạn" as a triage 4th zone** — considered, rejected. Triage is for "things requiring action this week"; sắp hết hạn is calendar-future signal. Better as standalone zone with its own visual treatment.

## Open Items (additional)

- Dashboard now has 5 zones below page-bar — risk of overload. Test with workshop attendee whether this scrolls cleanly or feels heavy. May need responsive collapse for smaller screens.
- "Lô đang đi" zone duplicates some content with "Cần xử lý hôm nay" (e.g., EU-2026-04 deadline 02/05 appears in both contexts). Acceptable for mockup but consider deduplication in real implementation.
- Doc-control "Quyền xem" tag was inside the warning callout — slightly awkward layout. Worth a styling pass.

## Reusable patterns from this short follow-up

- **The greed check question**: "Could a generic tool (Drive/Excel/Calendar) + mandatory process replace this module?" If yes, the module needs to either go away OR justify with the specific value-adds the generic tool can't deliver. For TradeOps doc-control, the value-add is cross-ref BCQT, completeness checklist, audit-trail-anchored snapshot. Without those, doc-control is a Drive imposter.
- **Scope-by-mental-model**: when a screen tries to do too much, ask "what's the natural mental category for each element?" Cards mixing file concerns + dossier concerns + calendar concerns suggest the screen is tangled. Realign each element to its natural category screen.
