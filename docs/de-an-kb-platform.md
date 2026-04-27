# Định hướng sản phẩm Tinsu AI và đề xuất Nền tảng kiến thức hải quan

Tài liệu này đề xuất hướng phát triển Athena thành **Nền tảng kiến thức hải quan** chia sẻ của Tinsu AI để phục vụ Barry-CO và các sản phẩm tương lai.
Lưu ý:

- Không phủ định Athena hiện tại — đề xuất mở rộng phạm vi của Athena, không thay thế hay tái cấu trúc cơ bản
- Lợi ích cộng hưởng có cơ sở cụ thể từ Barry-CO đang trong phạm vi xây dựng, không phải suy đoán về sản phẩm tương lai
- Cuối tài liệu có 5 câu kỹ thuật + 3 câu chiến lược cụ thể cần xác định trước khi bắt đầu giai đoạn 1

## 1. Bối cảnh

**Sản phẩm đã đi vào hoạt động hoặc đang xây dựng:**

- **Athena** — công cụ tra cứu HS Code (khớp gần đúng theo tên SP), hạ tầng chia sẻ Tinsu AI tự vận hành, người dùng hiện là nhân viên TT-HN, có khả năng mở ra cho người dùng công khai
- **Siafu** — ứng dụng lập tờ khai TKXK / TKNK
- **Barry-CO** — ứng dụng lập hồ sơ CO, đang trong phạm vi xây dựng cho TT-HN
- **Barry-BCQT** — ứng dụng báo cáo quyết toán năm

**Sản phẩm đang đề xuất với khách hàng:**

- **TradeOps** — hệ thống quản lý danh mục khách hàng cuối + hồ sơ xuyên năm cho đại lý hải quan, triển khai riêng cho từng đại lý (chi tiết ở `proposal/de-xuat-tradeops-chi-tiet-vi.md`)

**Đề xuất chiến lược trong tài liệu này:**

Phát triển Athena từ "công cụ tra cứu HS Code" thành **Nền tảng kiến thức hải quan** của Tinsu AI. Barry-CO là bên dùng thứ hai từ ngày 1, đặt lợi ích cộng hưởng vào nhu cầu cụ thể thay vì suy đoán.

Tinsu AI ở vị thế đối tác thiết kế (design partner) với TT-HN - Hoa Nam: TT-HN là đại lý đầu tiên, qua hợp tác này tích luỹ kinh nghiệm chuyên môn để chuẩn hoá và bán cho đại lý tiếp theo. Lộ trình dài hạn: mở rộng ra nhiều đại lý.

## 2. Hai mô hình sản phẩm khác nhau

Khi nhìn lại danh mục sản phẩm, có hai mô hình phân biệt rõ:

**Mô hình 1 — Triển khai riêng cho từng đại lý (lớp vận hành):**
TradeOps + Siafu + Barry-CO + Barry-BCQT chứa dữ liệu nghiệp vụ của đại lý / khách hàng cuối. Mỗi đại lý là một lần triển khai riêng, không chia sẻ hạ tầng / dữ liệu với đại lý khác. Bán theo từng triển khai, có tuỳ biến theo đại lý.

**Mô hình 2 — Dịch vụ phần mềm chia sẻ (lớp kiến thức):**
Athena chứa kiến thức chuyên môn (HS Code), không chứa dữ liệu nghiệp vụ nhạy cảm. Tinsu AI vận hành chia sẻ. Có thể phục vụ nhiều đại lý hoặc người dùng công khai cùng lúc.

Hai mô hình khác đối tượng người dùng, khác mô hình thương mại, khác cách triển khai. Athena đã chứng minh mô hình 2 chạy được trong môi trường hoạt động thật.

## 3. Nhu cầu cụ thể — Barry-CO cần kiến thức hải quan chia sẻ

Đây là phần cốt lõi của đề xuất.

Barry-CO đang trong phạm vi xây dựng cho TT-HN. Trong quy trình chuẩn bị hồ sơ CO, Barry-CO cần truy cập các loại kiến thức sau:

- **Quy tắc / tiêu chí xuất xứ FTA** — PSR theo từng heading, tham chiếu để tính RVC, mẫu lập luận CTC, cơ sở WO cho từng Form (D / E / AK / AANZ / AJ / AHK / AI / RCEP / EUR.1 cho EVFTA / ...)
- **Mẫu Phụ lục X** (TT 05/2018/TT-BCT) — khi có nhà cung cấp nội địa Việt Nam
- **Mẫu Quy trình sản xuất** (TT 05/2018/TT-BCT)
- **Tiền lệ hồ sơ** — CO đã cấp tương tự để tái sử dụng khuôn mẫu và kiểm tra tính nhất quán
- **Tham chiếu HS Code** — chia sẻ với Athena
- **Quy tắc kiểm tra hợp lệ cho tuân thủ xuất xứ** — bất nhất HS đầu vào / đầu ra, ngưỡng RVC, quy tắc nội dung khu vực

Kiến thức này Barry-CO cần truy cập qua một trong hai cách:

**Cách A — Xây dựng đóng kín bên trong mã nguồn Barry-CO:**
Barry-CO nhúng quy tắc FTA, mẫu Phụ lục, tiền lệ vào mã nguồn / cơ sở dữ liệu riêng. Phải tự nạp dữ liệu, duy trì nội dung, cập nhật khi quy định thay đổi. Khi Barry-BCQT hoặc công cụ tương lai cần cùng kiến thức sẽ phải xây dựng lại từ đầu.

**Cách B — Truy cập từ Nền tảng kiến thức hải quan chia sẻ qua API (giao diện lập trình ứng dụng):**
Kiến thức nằm ở nền tảng chia sẻ; Barry-CO truy vấn khi cần. Cùng kiến thức này phục vụ được Athena (làm phong phú tra cứu HS với ngữ cảnh FTA), Barry-BCQT (tham chiếu phương pháp luận BCQT), Siafu (tham chiếu phân loại HS), TradeOps (trích dẫn quy định cho các bước trong quy trình + dựng lại hồ sơ).

**Cách B cộng hưởng thực sự:** mỗi nội dung kiến thức CO đưa vào nền tảng phục vụ được nhiều bên dùng cùng lúc. Đây không phải suy đoán về giao diện chuyên dụng số N — đây là nhu cầu cụ thể từ Barry-CO đang xây, cộng với Athena đang chạy thật, cộng với 3 sản phẩm khác sắp tích hợp. Cộng hưởng không phải tương lai, là hiện tại.

## 4. Đề xuất — Phát triển Athena thành Nền tảng kiến thức hải quan

Đề xuất chính: **Athena phát triển từ công cụ tra cứu HS Code thành Nền tảng kiến thức hải quan chia sẻ của Tinsu AI.**

Cụ thể:

- **Mở rộng phạm vi:** Athena không còn chỉ là "công cụ tra cứu HS Code"; trở thành nơi tập trung mọi kiến thức chuyên môn hải quan của Tinsu AI — HS Code, quy tắc FTA, mẫu Phụ lục, phương pháp luận BCQT, văn bản pháp luật, tiền lệ, tài liệu đào tạo, kinh nghiệm nội bộ
- **Giao diện vẫn liên tục:** giao diện Athena hiện tại tiếp tục là điểm vào cho tra cứu HS Code; điểm vào tương lai cho FTA / BCQT / đào tạo là các giao diện phụ hoặc giao diện chuyên dụng riêng gắn vào cùng nền tảng
- **Bề mặt API:** Barry-CO + Barry-BCQT + Siafu + TradeOps truy vấn API của Athena khi cần kiến thức trong quy trình
- **Thương hiệu vẫn liên tục:** Athena giữ thương hiệu và vị trí là sản phẩm kiến thức hàng đầu của Tinsu AI; mở rộng phạm vi, không tái cấu trúc cơ bản

**Vì sao cách tiếp cận này hợp lý:**

- **Chi phí xây mới thấp:** không xây nền tảng song song mới; mở rộng hạ tầng hiện có của Athena
- **Bên dùng cụ thể có nhu cầu ngay:** Barry-CO đang xây cần kiến thức này → giai đoạn 1 phải phục vụ được Barry-CO từ ngày 1
- **Athena không bị giảm vị thế:** Athena trở thành nền tảng, không bị giảm xuống thành "giao diện chuyên dụng trên nền tảng của ai đó khác"
- **Lợi ích cộng hưởng có cơ sở:** mỗi nội dung trong Athena phục vụ giao diện Athena (tra cứu HS) và Barry-CO (tuân thủ xuất xứ) ngay lập tức; công cụ tương lai thêm vào dần

## 5. So sánh với hai phương án khác

| Phương án | Mô tả | Chi phí xây mới | Lợi ích cộng hưởng | Chi phí phụ thuộc lẫn nhau |
|---|---|---|---|---|
| **A. Phát triển Athena → Nền tảng** (đề xuất) | Athena mở rộng phạm vi thành nền tảng kiến thức hải quan | Thấp — tận dụng hạ tầng Athena | Cụ thể, ngay từ ngày 1 với Barry-CO | Athena tiến hoá + thiết kế API phải đáp ứng nhu cầu Barry-CO |
| B. Xây nền tảng kiến thức mới + Athena thành giao diện chuyên dụng | Nền tảng là sản phẩm mới; Athena chuyển sang dùng nền tảng đó | Cao — xây mới hoàn toàn | Tương đương A | Athena phải tái cấu trúc để dùng API của nền tảng |
| C. Nền tảng kiến thức độc lập, Athena giữ phạm vi hiện tại | Nền tảng là dịch vụ riêng; Athena gọi qua API khi cần | Trung bình — vẫn xây nền tảng nhưng không thay đổi Athena | Thấp hơn — Athena không làm phong phú nội dung qua nền tảng | Thấp nhất |

Phương án A được đề xuất vì:

1. Chi phí xây mới thấp nhất khi đã có bên dùng cụ thể cần phục vụ sớm (Barry-CO)
2. Thương hiệu và lộ trình của Athena không bị phụ thuộc vào một nền tảng thứ ba; thay vào đó Athena chính là nền tảng
3. Lợi ích cộng hưởng không phụ thuộc "khi nào giao diện chuyên dụng số 2 ra đời" — Barry-CO đã là bên dùng chuyên dụng từ ngày 1

Phương án C là phương án dự phòng nếu hạ tầng kỹ thuật hiện tại của Athena không phù hợp để mở rộng — câu hỏi 1-4 ở §11 cần giải quyết để xác nhận.

## 6. Mô hình quản lý sở hữu trí tuệ ba lớp với cơ chế thực thi cụ thể

Để tránh "kiến thức của TT-HN bị chia sẻ sang đại lý tiếp theo" — bẫy đối tác thiết kế — nội dung trong hệ thống chia thành ba lớp:

| Lớp | Chứa gì | Sống ở đâu | Ai truy cập được |
|---|---|---|---|
| Chia sẻ (Tinsu AI dùng cho mọi đại lý) | Văn bản pháp luật công khai, quy tắc FTA, khuôn mẫu chung của đại lý, tham chiếu HS | Nền tảng Athena | Tất cả bên dùng + tất cả triển khai đại lý |
| Riêng từng đại lý | Phương pháp luận nội bộ của đại lý (cách rà soát CO của TT-HN, tài liệu đào tạo riêng, mẫu form tuỳ chỉnh) | Bên trong triển khai TradeOps của đại lý đó | Chỉ nhân viên của đại lý đó |
| Riêng từng khách hàng cuối | Thông tin riêng của một doanh nghiệp (nhà cung cấp, mã nội bộ, lịch sử hồ sơ) | Workspace khách hàng cuối trong TradeOps | Nhân viên đại lý có quyền cho khách hàng cuối đó |

**Cơ chế thực thi cụ thể (không chỉ là chính sách):**

Mỗi mục trong lớp chia sẻ của Athena phải có:

- **Trường nguồn gốc** — nguồn gốc nội dung (ví dụ: "TT 38/2015 Điều 60", "Hướng dẫn BCT 2024-Q3", "Khuôn mẫu ẩn danh từ hợp tác đại lý, được công nhận chuyển lên lớp chia sẻ ngày 2026-04-27")
- **Bản ghi công nhận chuyển lớp** (cho nội dung phái sinh từ hợp tác đại lý) — bản ghi nhật ký kiểm tra có chữ ký nêu tên đại lý nguồn, tham chiếu giấy đồng ý, các bước ẩn danh hoá đã thực hiện, người duyệt

Không có nguồn gốc + bản ghi công nhận → không được vào lớp chia sẻ. Đây là quy tắc bất biến ở mức kiến trúc, không phải chính sách trên slide. Kỹ sư phải lập trình ép buộc và quy trình kiểm tra mã nguồn phải xác minh.

Mặc định: nội dung tạo ra trong ngữ cảnh đại lý ở nguyên đó. Nâng lên lớp chia sẻ là bước rõ ràng có nhật ký kiểm tra, không phải hành vi mặc định.

## 7. Hai tuyến thương mại

Danh mục sản phẩm Tinsu AI có hai tuyến thương mại riêng biệt:

| Tuyến | Sản phẩm | Đối tượng người dùng | Mô hình thương mại |
|---|---|---|---|
| Triển khai riêng cho đại lý (lớp vận hành) | TradeOps + Siafu + Barry-CO + Barry-BCQT | Đại lý hải quan (TT-HN, đại lý tiếp theo, ...) | Bán theo từng triển khai |
| Dịch vụ chia sẻ (lớp kiến thức) | Nền tảng Athena (mở rộng) + giao diện chuyên dụng tương lai | Nhân viên đại lý hiện tại + có khả năng người dùng công khai | Đăng ký theo gói / miễn phí cơ bản trả phí nâng cao / trả phí theo lượt truy vấn (nếu mở công khai) |

Athena công khai là cơ hội tương lai — chưa cốt lõi trong đề xuất giai đoạn 1 này. Cần xác minh thị trường (đối thủ: Tổng cục Hải quan có tra cứu HS miễn phí; KPMG / Deloitte có tham chiếu hải quan trả phí) trước khi cam kết triển khai công khai.

## 8. Lộ trình theo giai đoạn với ước lượng công sức

### Giai đoạn 1 — Mở rộng phạm vi Athena, tích hợp Barry-CO

**Phạm vi:**

- Mở rộng nội dung Athena ngoài HS Code: nạp văn bản pháp luật (chuỗi đã được kiểm chứng độc lập: TT 38/2015 → khoản 39 Điều 1 TT 39/2018 → TT 121/2025/TT-BTC; TT 05/2018/TT-BCT; TT 11/2020; NĐ 31/2018; LHQ 2014; NĐ 08/2015 sửa đổi NĐ 59/2018; Luật Khiếu nại 2011; BLHS 2015 sửa đổi 2017)
- Nạp kiến thức CO cụ thể cần cho Barry-CO: quy tắc xuất xứ FTA theo Form, mẫu Phụ lục X, mẫu Quy trình sản xuất, tiền lệ hồ sơ (đã ẩn danh hoá)
- Mở rộng bề mặt API: từ "khớp gần đúng theo tên" → truy vấn có cấu trúc cho quy tắc FTA / mẫu / văn bản pháp luật + giữ nguyên khớp gần đúng cho HS
- Triển khai trường nguồn gốc + cơ chế công nhận chuyển lớp cho mô hình ba lớp
- Giao diện Athena tiếp tục phục vụ tra cứu HS; giao diện cho FTA / BCQT / đào tạo lùi lại sau

**Bên dùng giai đoạn 1:**

- Giao diện Athena (tra cứu HS Code) — như hiện tại, có thể làm phong phú với ngữ cảnh FTA cho truy vấn HS nếu lược đồ dữ liệu cho phép
- Đội Tinsu AI nội bộ — truy vấn nội dung mở rộng qua giao diện admin hoặc API
- **Barry-CO — bên dùng mới chính, tích hợp qua API từ ngày 1**

**Ước lượng công sức:** 3-5 người-tháng tổng (tuỳ Athena hiện tại có hạ tầng phù hợp không — câu §11). Phân bổ: mở rộng lược đồ dữ liệu + đường ống nạp dữ liệu (~1-2 người-tháng), nạp + duy trì nội dung pháp luật và CO (~1-1.5 người-tháng), mở rộng API + tích hợp Barry-CO (~1-1.5 người-tháng), cơ chế nguồn gốc / thực thi sở hữu trí tuệ (~0.5 người-tháng).

**Giai đoạn 1 không làm:**

- Máy chủ MCP (Model Context Protocol — giao thức của Anthropic cho tích hợp mô hình ngôn ngữ lớn) — lùi giai đoạn 3 vì chưa có bên dùng có tính năng AI cần MCP
- Lớp riêng cho đại lý trong TradeOps (lùi giai đoạn 2)
- Giao diện chuyên dụng mới ngoài giao diện Athena hiện tại
- Triển khai công khai
- Trợ lý AI dạng hội thoại

### Giai đoạn 2 — Lớp riêng cho đại lý + tích hợp Barry-BCQT

**Phạm vi:**

- Triển khai lớp kiến thức riêng cho đại lý trong TradeOps (phương pháp luận / đào tạo / mẫu form riêng của đại lý)
- Tích hợp Barry-BCQT truy vấn từ nền tảng Athena (phương pháp luận BCQT + mẫu Mẫu 16 + tham chiếu đối chiếu)
- Sẵn sàng đa khách hàng cho Athena nếu chuẩn bị mở công khai

**Ước lượng công sức:** 2-3 người-tháng.

### Giai đoạn 3 — MCP + giao diện chuyên dụng mới khi có nhu cầu thật

**Phạm vi:**

- Máy chủ MCP cung cấp nội dung Athena cho bên dùng dạng AI tương lai — chỉ làm khi có một bên dùng AI cụ thể sẵn sàng
- Xây giao diện chuyên dụng mới khi có nhu cầu thực: trợ lý xuất xứ FTA, trợ lý phương pháp luận BCQT, đào tạo
- Athena triển khai công khai (nếu quyết định thương mại đã có sau giai đoạn 2)

**Ước lượng công sức:** chưa xác định, dựa theo nhu cầu. Không xây MCP / giao diện chuyên dụng nếu không có bên dùng cụ thể sẵn sàng.

## 9. Chi phí vận hành duy trì nội dung

Quy định pháp luật thay đổi liên tục. TT 121/2025 vừa thay TT 39/2018 mẫu Phụ lục V — đây là chỉ dấu cảnh báo cho chi phí vận hành định kỳ. Duy trì nội dung không phải chi phí thiết lập một lần ở giai đoạn 1; là chi phí vận hành định kỳ trên cả hai tuyến thương mại.

**Ước lượng theo loại thay đổi:**

- TT sửa nhỏ (cập nhật tham chiếu, sửa mẫu nhỏ): ~0.5-1 ngày nạp lại + cập nhật trích dẫn + làm sạch bộ đệm ở các bên dùng
- Văn bản lớn (quy mô TT 121/2025, thay đổi lược đồ mẫu): ~1-2 tuần để rà soát lược đồ, viết lại nội dung, kiểm tra hợp lệ ở các công cụ bên dùng

**Ước lượng theo năm:** ~0.2-0.3 nhân viên toàn thời gian quy đổi cho duy trì định kỳ, giả định 6-10 thay đổi nhỏ + 1-2 văn bản lớn mỗi năm. Cao hơn nếu mở rộng phạm vi nội dung.

**Lựa chọn người chịu trách nhiệm:**

- **Nội bộ:** một thành viên đội phân bổ một phần thời gian. Lợi: nắm sâu ngữ cảnh. Bất lợi: phân tâm khỏi xây sản phẩm
- **Thuê tư vấn hải quan ngoài:** thuê người rà soát định kỳ (theo quý). Lợi: chuyên môn sâu. Bất lợi: chi phí bàn giao, không sở hữu nền tảng
- **Lai (kết hợp):** nội bộ duy trì kỹ thuật + ngoài rà soát chuyên môn. Đề xuất cho hai năm đầu

Cần phân công người chịu trách nhiệm trước giai đoạn 1 — không có người duy trì thì 6 tháng sau nội dung lỗi thời, độ tin cậy sụp đổ.

## 10. Rủi ro và điều chưa rõ

- **Hạ tầng kỹ thuật Athena có phù hợp với phạm vi rộng hơn không** — Athena hiện xây cho khớp gần đúng HS Code; mở rộng sang văn bản pháp luật / quy tắc FTA / mẫu / tiền lệ có thể yêu cầu tái cấu trúc đáng kể (kho vector + vector ngữ nghĩa cho tìm kiếm theo nghĩa, lược đồ có cấu trúc cho quy tắc / mẫu). Câu §11 cần giải quyết trước khi xác nhận ước lượng công sức. Nếu không phù hợp → phương án dự phòng C
- **Trôi đối tượng người dùng cho giao diện Athena** — Athena hiện hướng đến người dùng tra cứu HS Code. Mở rộng phạm vi kiến thức có thể làm loãng trải nghiệm nếu người dùng HS / FTA / BCQT cần giao diện khác nhau. Giảm thiểu: giữ giao diện Athena tập trung HS; điểm vào tương lai (trợ lý FTA, ...) là giao diện chuyên dụng riêng cùng nền tảng
- **Lỗ hổng thực thi mô hình ba lớp sở hữu trí tuệ** — trường nguồn gốc + cơ chế công nhận là quy tắc bất biến ở kiến trúc, nhưng kỹ sư có thể bỏ qua dưới áp lực thời hạn. Giảm thiểu: ép buộc ở mức lược đồ dữ liệu + ở mức API + ở quy trình kiểm tra mã nguồn (phòng thủ nhiều lớp)
- **Thị trường Athena công khai chưa có bằng chứng** — đối thủ có sẵn (Tổng cục Hải quan có tra cứu HS miễn phí; KPMG / Deloitte có tham chiếu hải quan trả phí); chưa cốt lõi trong giai đoạn 1, chỉ cam kết khi có xác minh thị trường
- **Phụ thuộc lẫn nhau: thời hạn giai đoạn 1 ↔ thời hạn xây Barry-CO** — Barry-CO cần kiến thức CO từ giai đoạn 1; nếu giai đoạn 1 chậm, Barry-CO có thể buộc phải xây đóng kín (cách A trong §3). Giảm thiểu: giai đoạn 1 ưu tiên nội dung CO trước văn bản pháp luật rộng
- **Lỗ hổng người duy trì** — không phân công trước giai đoạn 1 thì nội dung lỗi thời là rủi ro thường trực

## 11. Câu hỏi cần xác định

### 5 câu kỹ thuật về Athena (cần xác nhận trước khi chốt thiết kế giai đoạn 1)

1. **Hạ tầng kỹ thuật Athena hiện tại** — khớp gần đúng dùng gì (Postgres trigram? Elasticsearch? vector ngữ nghĩa với mô hình nào? lai)? Quyết định giai đoạn 1 mở rộng dễ hay phải tái cấu trúc
2. **Mô hình dữ liệu Athena** — cơ sở dữ liệu HS Code nạp từ đâu, cập nhật theo nhịp nào? Lược đồ có chỗ cho văn bản pháp luật + quy tắc FTA + mẫu + tiền lệ không?
3. **Mã nguồn / cách triển khai Athena** — có thể cắm thêm loại nội dung mới được không, hay lược đồ cứng cho HS?
4. **Hỗ trợ truy hồi nhiều loại nội dung** — Athena có sẵn tìm kiếm ngữ nghĩa (dùng vector) không, hay chỉ khớp gần đúng theo từ khoá? Truy vấn pháp luật + FTA cần ngữ nghĩa; tra cứu HS cần khớp gần đúng. Giai đoạn 1 cần cả hai
5. **Xác thực / kiểm soát truy cập của Athena** — hiện đơn khách hàng nhân viên TT-HN; chuyển sang đa bên dùng + bên dùng API cần mô hình xác thực như thế nào?

### 3 câu chiến lược cấp Tinsu AI

1. **Ước lượng 3-5 người-tháng cho giai đoạn 1 có khớp với lộ trình hợp tác TT-HN không?** Thời hạn xây Barry-CO chi phối thời hạn giai đoạn 1 KB. Cần kiểm tra tính khả thi
2. **Người duy trì nội dung** — nội bộ, ngoài, hay lai? Cần phân công trước giai đoạn 1
3. **Triển khai Athena công khai — lùi hay cam kết?** Nếu cam kết sớm thì cần xác minh thị trường trước giai đoạn 2; nếu lùi thì giai đoạn 1 không cần sẵn sàng đa khách hàng

## 12. Bước tiếp theo

1. **Buổi đồng thuận** — thảo luận 5 câu kỹ thuật + 3 câu chiến lược. Kết quả: xác nhận phạm vi + công sức + người duy trì cho giai đoạn 1
2. Nếu duyệt phương án A (phát triển Athena → Nền tảng kiến thức hải quan):
   - Kế hoạch triển khai giai đoạn 1 với phạm vi chi tiết theo nhu cầu Barry-CO
   - Đánh giá kỹ thuật Athena để xác nhận có cần tái cấu trúc không
   - Phân công người duy trì
   - Đề xuất TradeOps cập nhật tham chiếu tích hợp KB ở giai đoạn 2-3
3. Nếu hạ tầng kỹ thuật Athena không phù hợp để phát triển (kết quả từ câu §11 hỏi 1-4):
   - Phương án dự phòng C — xây nền tảng kiến thức riêng, Athena giữ phạm vi hiện tại, gọi qua API
   - Chi phí xây mới cao hơn nhưng tách rời khỏi ràng buộc kiến trúc của Athena

Phản biện gửi trước buổi đồng thuận để chuẩn bị thảo luận.

## 13. Tài liệu chi tiết bổ sung

Hiện đã có:

- `docs/architecture/knowledge-base-positioning.md` — sketch kiến trúc chi tiết (đã cập nhật theo phương án A)
- `docs/architecture/file-storage.md` + `file-storage-vn-providers.md` + `file-storage-poc-checklist.md` — chiến lược lưu trữ tệp tin của TradeOps (hạ tầng cho tuyến triển khai riêng đại lý)
- `docs/workflow/` — bốn tệp quy trình cho TradeOps (thiết lập ban đầu khách hàng cuối, hồ sơ CO, chu kỳ BCQT, phản hồi kiểm tra sau thông quan) đã được rà soát chuyên môn
- `proposal/de-xuat-tradeops-chi-tiet-vi.md` — đề xuất TradeOps đầy đủ tiếng Việt cho TT-HN
- `proposal/client-proposal-outline-vi.md` — bản đề cương ngắn gọn của đề xuất TradeOps
