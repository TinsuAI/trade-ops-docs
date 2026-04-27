# TradeOps Mockup — Demo Script

**Audience:** Trọng Tín - Hoa Nam (TT-HN) workshop. Likely 2-3 người: trưởng nhóm broker + 1-2 staff vận hành.
**Format:** Walkthrough trên màn hình, ~20-25 phút, kèm câu hỏi mở mỗi trạm.
**Tiêu chí thành công:** TT-HN bẻ lái ≥3 giả định workflow + cam kết phiên tiếp theo. KHÔNG phải "TT-HN gật đầu Phase 1".
**Tư thế:** đại lý đang trao đổi với design partner, không phải vendor đi pitch.

---

## Story arc

> Đại lý vận hành **danh mục N khách hàng cuối** qua **nhiều năm**. Pain không nằm ở 1 bộ hồ sơ đơn lẻ — pain nằm ở: (1) dữ liệu nền chung trôi dạt khi danh mục lớn lên, (2) lúc audit phải dựng lại hồ sơ cũ trong nhiều ngày, (3) hand-off giữa nhân sự mất context. TradeOps là **platform vận hành danh mục + bảo vệ hồ sơ**, không phải tool gửi tờ khai hay làm CO đơn lẻ.

Mạch trạm theo **độ rộng → độ sâu → vị thế phòng thủ**:

1. Toàn cảnh danh mục → 2. Một khách hàng cuối → 3. Dữ liệu nền (mã + BOM + tồn) → 4. Một workflow đại diện (CO) → 5. Bài toán phòng thủ (hồ sơ cũ + KTSTQ) → 6. Chu trình năm (BCQT)

---

## Trạm 1 — Tổng quan danh mục (3 phút)

**Màn:** `#/dashboard`

**Mở thoại:**
> "Đây là góc nhìn của một đại lý quản lý cùng lúc N khách hàng cuối. Cái mà đại lý cần thấy mỗi sáng: ai đang đến hạn, ai đang vướng, ai im lặng quá lâu."

**Điểm cần highlight:**
- KPI strip — số khách hàng cuối, hồ sơ đang xử lý, hạn 7 ngày tới, finding mở
- Bảng hồ sơ gần đây với phase-pill stepper hiển thị bước hiện tại
- Panel hạn sắp tới với màu trạng thái

**Câu hỏi mở cho TT-HN:**
- Mỗi sáng anh chị thực sự xem gì đầu tiên? KPI nào trên màn này KHÔNG cần thiết, KPI nào còn thiếu?
- "Im lặng quá lâu" có phải tín hiệu thực không, hay chỉ chúng tôi đoán?

---

## Trạm 2 — Chi tiết khách hàng cuối (3 phút)

**Màn:** `#/end-client/dn-det-may-01`

**Mở thoại:**
> "Click vào một DN chế xuất — đây là 'không gian làm việc' cho riêng khách hàng cuối đó. Tabs: Tổng quan / Hồ sơ đang xử lý / Dữ liệu nền / Lịch sử / Nhật ký."

**Điểm cần highlight:**
- Header: tên end-client, mã số thuế, ngành, loại hình (DNCX/SXXK), broker đang phụ trách
- 5 tab phân tách rõ "execution" vs "metadata"
- Status indicator + deadline gần nhất

**Câu hỏi mở cho TT-HN:**
- 5 tab này có đúng cách anh chị tổ chức công việc theo khách hàng cuối, hay đang phân chia nhầm?
- Trên cùng 1 khách hàng cuối, anh chị có cần phân quyền giữa staff không, hay 1 người phụ trách trọn?

---

## Trạm 3 — Dữ liệu nền: Mã hàng + BOM (4 phút)

**Màn:** `#/item-master` → `#/bom`

**Mở thoại:**
> "Đây là chỗ chúng tôi nghĩ là **gốc của mọi vướng mắc xuôi dòng**. Nếu mã hàng và BOM không đứng vững thì C/O và BCQT đều mượn nợ. Note: cùng một NVL có thể đã từng được khai dưới nhiều mã HQ khác nhau qua các năm — đây là dữ liệu, không phải lỗi."

**Điểm cần highlight:**
- Item master với SP/NVL/BTP filter
- Mapping nhiều-nhiều giữa mã ERP của end-client và mã HQ trên tờ khai
- Hover trên một dòng NVL → thấy lịch sử mã HQ qua các năm
- Sang BOM: BOM master là **point-in-time technical norm**, có version theo thời gian
- "What-if" toggle: mô phỏng upload BOM có NVL trùng → flip sang error state có khả năng phục hồi

**Câu hỏi mở cho TT-HN:**
- Số NVL điển hình mỗi end-client là bao nhiêu? 100? 500? 5,000?
- BOM thay đổi mức độ nào trong 1 năm? Bao nhiêu % version? Trigger thay đổi (cải tiến SP, đổi nhà cung, đổi quy cách)?
- Cách tổ chức mã hàng hiện tại của TT-HN là gì — file Excel chia theo end-client, hay master chung, hay không có?
- Mẫu 16 (định mức thực tế bình quân năm) có phải pain riêng — TT-HN tính ra bằng gì hôm nay?

---

## Trạm 4 — Tồn nhiều góc nhìn (3 phút)

**Màn:** `#/inventory`

**Mở thoại:**
> "Đây là cái chúng tôi nghĩ đặc biệt khó. 4 góc nhìn cùng tồn tại — kho vật lý, NXT kế toán, suy ra từ dữ liệu hải quan, Tồn CO theo phân lot xuất xứ. Chúng tôi không cố ép về 1 con số duy nhất — sự lệch giữa các view chính là dữ liệu cần ghi nhận, không phải sai số cần xóa."

**Điểm cần highlight:**
- 4 cột hiển thị song song trên cùng một dòng NVL
- Mỗi ô có nguồn (source documents) link ngược
- Khi 4 view lệch nhau, hiển thị diff với provenance — vì sao lệch
- Nhấn mạnh: KHÔNG có khái niệm "tồn hải quan" mà cơ quan hải quan giữ — đây là balance suy ra từ BCCT

**Câu hỏi mở cho TT-HN:**
- 4 view này có đủ chưa, hay TT-HN còn 1 view nữa chúng tôi miss (ví dụ: tồn theo lô sản xuất, theo kho từng nhà máy)?
- Sự lệch giữa Tồn CO và NXT kế toán có phải lúc nào cũng là divergence hợp lệ, hay đôi khi là dấu hiệu sai cần báo end-client?

---

## Trạm 5 — Hồ sơ C/O: workflow đại diện (3 phút)

**Màn:** `#/co-dossier/co-2026-q1-001`

**Mở thoại:**
> "Một bộ C/O đi qua 8+1 bước. Lưu ý: bước 'eligibility' không thể đứng trước 'lot assignment + BOM survey' — vì RVC/CTC/PSR tính TỪ lot đã gán. Đây là vùng chúng tôi đã verify với regulatory citation."

**Điểm cần highlight:**
- Stepper 8+1 bước (preferential branch + non-preferential branch)
- Block hiển thị: lot assignment → criterion check (PSR governs khi có; nếu không thì general rule)
- Indicator nếu cần factory inspection (Điều 28 NĐ 31/2018, +2 ngày làm việc)
- Biến thể: cấp lại / cấp sau / back-to-back / Movement Cert E
- Box 13 retroactive marker

**Câu hỏi mở cho TT-HN:**
- Bước nào trong 8+1 bước CHƯA đúng cách TT-HN làm trong thực tế?
- Tỷ lệ hồ sơ phải chạy nhánh kiểm tra cơ sở SX hôm nay là bao nhiêu?
- "Cấp sau" với Box 13 — TT-HN gặp tần suất nào? Thường vì lý do gì?
- Form D có bao nhiêu % portfolio so với CPTPP/RCEP/EVFTA? PSR dày hay thưa?

---

## Trạm 6 — Hồ sơ cũ dựng lại cho KTSTQ (4 phút) — **money shot**

**Màn:** `#/audit-defense/co-2023-q3-047`

**Mở thoại:**
> "Đây là tình huống chúng tôi nghĩ TradeOps thật sự khác biệt. Hôm nay: Cục KTSTQ ra quyết định kiểm tra một bộ C/O đã cấp năm 2023. Đại lý phải dựng lại: BOM tại thời điểm cấp, lot nào đã được gán, evidence của criterion check, biên bản kiểm tra cơ sở SX nếu có. Trên Excel rời rạc thì mất nhiều ngày và có khả năng không dựng lại được đầy đủ."

**Điểm cần highlight:**
- Header với badge "Hồ sơ năm 2023, KTSTQ tháng này"
- Timeline: ngày cấp → ngày khách hàng cuối ký nhận → ngày KTSTQ
- BOM version dùng tại thời điểm cấp — không phải BOM hiện hành
- Lot assignment immutable từ thời điểm cấp
- Criterion check evidence với nguồn dẫn (TKNK lot nào, hóa đơn nào)
- Audit trail: ai chỉnh, lúc nào, vì sao (signed)

**Câu hỏi mở cho TT-HN:**
- Trong 12 tháng qua, có bao nhiêu lần KTSTQ ra quyết định kiểm tra hồ sơ cũ? Hồ sơ tuổi đời bao nhiêu?
- Khi đó, evidence nào TT-HN khó dựng lại nhất?
- Đã có lần nào TT-HN không dựng được đầy đủ và phải dựa vào trí nhớ staff?

---

## Trạm 7 — Chu trình BCQT (3 phút)

**Màn:** `#/bcqt-cycle/dn-det-may-01-2025`

**Mở thoại:**
> "Chu trình năm. Note: đây không phải chỗ thay Siafu hay Barry-BCQT — đây là chỗ TT-HN theo dõi BCQT của một end-client xuyên năm, với điểm đặc biệt là **bước ký nhận của end-client là ranh giới trách nhiệm**, không phải thủ tục."

**Điểm cần highlight:**
- 11-state stepper TT 121/2025 (hiệu lực 01/02/2026)
- Mẫu 15/BCQT-NVL/GSQL, Mẫu 15a/BCQT-SP/GSQL, Mẫu 16/ĐMTT-GSQL
- Cửa sổ tự sửa 60 ngày sau submission (trước quyết định kiểm tra)
- Hệ thống tiếp nhận BCQT (KHÔNG phải VNACCS/VCIS)

**Câu hỏi mở cho TT-HN:**
- Quy trình ký nhận với end-client hôm nay là gì — email PDF, file ký số, hay biên bản giấy?
- Tần suất phải dùng cửa sổ 60 ngày tự sửa là bao nhiêu? Thường là phát hiện gì?
- TT 121/2025 có hiệu lực 01/02/2026 — TT-HN đã quen template mới chưa, hay đang transition?

---

## Trạm 8 (optional) — Phản hồi KTSTQ deep-dive

**Mở chỉ nếu TT-HN muốn đào sâu sau Trạm 6.**

**Màn:** `#/ktstq-response/case-2026-001`

- Branch indicator: tại trụ sở hải quan (Điều 79, 5 ngày, không gia hạn) vs tại trụ sở doanh nghiệp (Điều 80, 10+10 ngày + biên bản 5 ngày + kết luận 15 ngày)
- Track khiếu nại lần 1 90 ngày (Điều 9 LKN 2011)
- Chốt: BLHS 188/189/200 escalation thresholds chỉ làm reference, không là feature

---

## Wrap-up (2 phút)

**Mở thoại:**
> "Đây là 7 trạm. Mockup này còn nhiều chỗ chúng tôi đoán — bao gồm số liệu, tên trường, layout. Mục tiêu phiên hôm nay là TT-HN bẻ lái cho chúng tôi: chỗ nào sai, chỗ nào miss, chỗ nào quá / chưa đủ. Chúng tôi muốn ghi nhận những điều đó để chỉnh trước phiên kế tiếp."

**Câu hỏi đóng:**
- 3 thứ ưu tiên cao nhất TT-HN muốn TradeOps GIẢI QUYẾT trước trong 6 tháng đầu là gì?
- Có module/màn nào HÔM NAY chưa thấy mà TT-HN nghĩ thiếu nghiêm trọng?
- TT-HN có thể dành 1 buổi tới đây để làm việc sâu vào dữ liệu nền (mã hàng + BOM) không?

---

## Screen mapping (xương sống vs nhánh stub)

**Xương sống — đầy đủ chi tiết:**
- `#/dashboard` (Trạm 1)
- `#/end-client/:id` (Trạm 2)
- `#/item-master` + `#/bom` (Trạm 3)
- `#/inventory` (Trạm 4)
- `#/co-dossier/:id` (Trạm 5)
- `#/audit-defense/:id` (Trạm 6 — money shot)
- `#/bcqt-cycle/:id` (Trạm 7)

**Nhánh — màn phụ (link đến từ xương sống):**
- `#/dossier-list` (link từ dashboard và end-client)
- `#/document-control` (link từ end-client tab)
- `#/audit-trail` (link từ end-client tab)
- `#/ktstq-response/:id` (chỉ cần khi Trạm 8 mở)
