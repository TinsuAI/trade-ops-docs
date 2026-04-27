# Đề xuất TradeOps — Bản chi tiết

Bản tài liệu này gộp đề cương đề xuất TradeOps và bốn quy trình vận hành chính, dùng để trao đổi với Trọng Tín - Hoa Nam và đội ngũ chuyên môn. Bản đề cương ngắn gọn nằm tại `client-proposal-outline-vi.md`.

## 1. Tóm tắt

TradeOps là **hệ thống quản lý danh mục khách hàng cuối và hồ sơ xuyên năm cho đại lý hải quan**. Tinsu AI và Trọng Tín - Hoa Nam đang triển khai ba hệ thống nghiệp vụ chuyên dụng — Siafu (lập tờ khai), Barry-CO (lập hồ sơ CO), Barry-BCQT (báo cáo quyết toán năm). Mỗi hệ thống tăng tốc một đầu nghiệp vụ chuyên môn khi có điểm phát động cụ thể. Phần việc còn lại — quản lý cả danh mục khách hàng cuối qua thời gian, lưu trữ lịch sử danh mục xuyên năm, bảo vệ hồ sơ khi có yêu cầu kiểm tra sau thông quan — không nằm trong phạm vi thiết kế của ba hệ thống đó. Đó là khoảng trống mà TradeOps hướng đến.

Tài liệu này gồm bốn phần:

- **Bối cảnh và vấn đề** — phần việc xuyên suốt mà các hệ thống nghiệp vụ không bao quát
- **Hướng đề xuất** — TradeOps là gì, quan hệ với ba hệ thống nghiệp vụ, sáu module chính
- **Quy trình vận hành chính** — bốn quy trình đại diện: thiết lập ban đầu khách hàng cuối, lập hồ sơ CO, chu kỳ quyết toán năm, phản hồi kiểm tra sau thông quan
- **Định hướng triển khai và các câu hỏi cần làm rõ trong buổi khảo sát**

## 2. Bối cảnh

Trọng Tín - Hoa Nam là đại lý hải quan phục vụ nhiều doanh nghiệp chế xuất và doanh nghiệp sản xuất xuất khẩu. **Mỗi khách hàng cuối là một thế giới riêng**: nhà máy riêng, sản phẩm riêng, mã hoá nội bộ riêng, nhân sự đầu mối riêng, lịch sử nghiệp vụ riêng kéo dài qua nhiều năm.

Vận hành cả danh mục khách hàng cuối qua nhiều năm gắn với một số phần việc xuyên suốt:

- nhận thêm khách hàng mới mà không cần xây lại nền vận hành mỗi lần
- giữ tri thức xử lý ở tay đại lý, không phải ở đầu từng nhân viên
- bảo vệ hồ sơ khi có yêu cầu kiểm tra sau thông quan một đến hai năm sau
- liên thông dữ liệu nghiệp vụ giữa các kỳ báo cáo qua nhiều năm

Trên thực tế, công việc quản lý danh mục này hiện nay vận hành chủ yếu trên Excel, thư mục cá nhân, email và Zalo. Không có hệ thống nào đứng tên giữ:

- danh sách khách hàng cuối đang phục vụ và trạng thái xử lý của từng khách
- kho hồ sơ qua các năm có thể tra lại nhanh khi cần
- danh mục SP / NVL / BTP, BOM và tài liệu nguồn gắn với từng khách hàng cuối
- nhật ký xử lý xuyên thời gian phục vụ giải trình khi có yêu cầu kiểm tra sau thông quan

Hiện nay, Tinsu AI và Trọng Tín - Hoa Nam đang triển khai ba hệ thống nghiệp vụ chuyên dụng:

- **Siafu** — lập tờ khai xuất nhập khẩu
- **Barry-CO** — lập hồ sơ CO cho lô hàng xuất khẩu
- **Barry-BCQT** — báo cáo quyết toán hải quan hàng năm

Mỗi hệ thống tăng tốc một đầu nghiệp vụ chuyên môn, bật khi có điểm phát động cụ thể (có tờ khai cần lập, có lô hàng cần xin CO, đến kỳ báo cáo quyết toán). Nhưng **không hệ thống nào trong số đó quản lý danh mục khách hàng cuối của đại lý**, không hệ thống nào lưu trữ lịch sử danh mục xuyên năm, không hệ thống nào trả lời được câu hỏi "hồ sơ này hai năm trước được dựng thế nào và ai đã làm". Đó là phần đại lý đang tự lo, và là khoảng trống mà đề xuất này hướng đến.

## 3. Vấn đề cốt lõi

Vấn đề hiện nay không nằm ở việc thiếu phần mềm cho từng nghiệp vụ riêng lẻ — ba hệ thống nêu trên đang giải quyết phần đó. Vấn đề nằm ở **tầng vận hành danh mục và lịch sử của đại lý** — phần ba hệ thống nghiệp vụ không được thiết kế để xử lý:

1. **Thêm khách hàng cuối không tận dụng được công sức đã bỏ cho khách trước.** Mỗi doanh nghiệp mới là một tập dữ liệu, định dạng và mã hoá riêng. Đội nghiệp vụ phải làm quen từ đầu mỗi lần.
2. **Tri thức xử lý nằm chủ yếu trong đầu nhân viên.** Khi có thay đổi nhân sự, chuỗi xử lý của từng bộ hồ sơ dễ đứt gãy; thời gian đào tạo người mới kéo dài.
3. **Hồ sơ liên thông qua nhiều năm.** Tờ khai nhập khẩu năm trước làm cơ sở cho báo cáo quyết toán năm sau; định mức kỹ thuật khai trên hồ sơ CO và định mức thực tế dùng cho quyết toán cuối năm là hai số liệu khác nhau nhưng phải đối chiếu được với nhau theo cùng một dòng SP–NVL; chỉ một mắt xích lệch không giải trình được là cả chuỗi gặp rủi ro.
4. **Khả năng giải trình và đối chiếu khi có yêu cầu kiểm tra là một rủi ro thường trực.** Khi cần dựng lại chuỗi chứng từ cho một bộ hồ sơ một đến hai năm trước, công sức bỏ ra có thể rất lớn; nếu người xử lý không còn ở đơn vị, có khả năng chuỗi không dựng lại được đầy đủ.
5. **Mặt bằng hệ thống giữa các đại lý hiện nay đang khá tương đồng.** Phần lớn vẫn vận hành trên Excel và thư mục cá nhân. Khi danh mục khách hàng tăng dần, các phần việc ở trên trở nên khó kiểm soát theo cách vận hành hiện tại.

Đằng sau năm vấn đề ở mức nghiệp vụ là một số nguyên nhân cấu trúc — đều thuộc tầng vận hành danh mục mà chưa có hệ thống nào giải quyết:

- chưa có nơi đứng tên quản lý danh mục khách hàng cuối và trạng thái hồ sơ qua thời gian
- chưa có **danh mục SP / NVL / BTP** chuẩn cho từng khách hàng cuối, có quy đổi giữa mã hải quan và mã nội bộ
- chưa có nơi tập trung tài liệu với phiên bản và liên kết rõ ràng
- BOM (định mức kỹ thuật) và lịch sử thay đổi BOM thường được giữ phi chính thức
- nhiều loại tồn hợp lệ song song (thực tế, kế toán, theo dữ liệu hải quan, CO) nhưng không có chỗ đối chiếu
- chưa có nhật ký kiểm tra thống nhất xuyên các hệ thống

## 4. Hướng đề xuất — TradeOps

### 4.1. TradeOps là gì

TradeOps là **hệ thống mà đại lý dùng để quản lý toàn bộ danh mục khách hàng cuối qua thời gian**: ai là khách, đang làm gì, hồ sơ nào, ai phụ trách, lịch sử ra sao, có bảo vệ được khi kiểm tra không.

TradeOps là nơi:

- **danh mục**: danh sách khách hàng cuối, trạng thái từng khách, người phụ trách, mức độ phức tạp
- **hồ sơ và tiến độ**: hồ sơ nào đang mở, ai làm, hạn, vướng mắc, trạng thái xử lý
- **lịch sử xuyên năm**: mọi hồ sơ, mọi phiên bản BOM, mọi tài liệu, mọi thao tác — truy xuất được nhiều năm sau
- **dữ liệu nền của từng khách**: danh mục SP / NVL / BTP, BOM phiên bản, bảng quy đổi mã, các view tồn — giữ nhất quán để mọi nghiệp vụ phía sau dùng được
- **nhật ký kiểm tra xuyên suốt** — đáp ứng yêu cầu giải trình khi có yêu cầu kiểm tra sau thông quan

### 4.2. Vì sao Siafu, Barry-CO, Barry-BCQT không tự đảm nhận phần này

Mỗi hệ thống chuyên dụng giữ phần dữ liệu cần cho **một đầu nghiệp vụ riêng**:

- Barry-CO giữ BOM, chứng từ và Tồn CO **của lô hàng đang xin CO**
- Siafu giữ tờ khai và chứng từ kèm theo **cho đầu việc lập tờ khai**
- Barry-BCQT giữ dữ liệu cần thiết để **chạy báo cáo quyết toán năm**

Nhưng:

- Không hệ thống nào đứng tên giữ **danh mục khách hàng cuối đại lý đang phục vụ** — mỗi app chỉ thấy dữ liệu của khách trong phạm vi nghiệp vụ của app đó
- Không hệ thống nào ghi nhận **tài liệu khách gửi qua các kênh không qua app** (Zalo, email rời rạc, file đính kèm trao đổi nội bộ)
- Không hệ thống nào **liên thông giữa các nghiệp vụ**: định mức kỹ thuật mà Barry-CO dùng cho CO và định mức thực tế mà Barry-BCQT dùng cho quyết toán phải đối chiếu được với nhau theo cùng một dòng SP–NVL, nhưng hai app không cùng một nguồn dữ liệu nền nếu không có TradeOps đứng tên giữ
- Không hệ thống nào ghi nhận **các thao tác vận hành ngoài phạm vi nghiệp vụ chuyên môn**: tiếp nhận tài liệu, gán việc, thay đổi nhân sự phụ trách, bàn giao
- Không hệ thống nào **dựng lại được toàn bộ chuỗi xử lý của một bộ hồ sơ qua nhiều năm** vì chuỗi đó đi qua cả ba hệ thống cộng phần ngoài hệ thống

Đặc biệt với **kiểm tra sau thông quan**: ba hệ thống đều phải lưu hồ sơ 5 năm theo quy định cho phạm vi nghiệp vụ của mình. Nhưng nếu yêu cầu kiểm tra phát sinh và cần dựng lại **toàn bộ chuỗi xử lý** của một bộ hồ sơ — bao gồm tài liệu chưa qua app nào, các quyết định phân loại, lịch sử người phụ trách, các trao đổi nội bộ — phần việc này có thể vượt ra ngoài phạm vi của bất kỳ hệ thống chuyên dụng nào.

Đây là phần TradeOps đứng tên xử lý.

### 4.3. Quan hệ giữa TradeOps và ba hệ thống nghiệp vụ

TradeOps quản lý phần liên tục: khách, hồ sơ, dữ liệu nền, lịch sử. Ba hệ thống nghiệp vụ chuyên xử lý các điểm phát động cụ thể trong vòng đời mỗi hồ sơ.

Khi tích hợp, ba hệ thống đọc dữ liệu nền của khách hàng cuối từ TradeOps (danh mục, BOM, chứng từ) và ghi tờ khai / hồ sơ CO / báo cáo quyết toán trở lại như một phần của lịch sử danh mục. Đây là **lợi ích cộng thêm** khi cả TradeOps và ba công cụ cùng có — không phải lý do TradeOps tồn tại.

Tích hợp giữa TradeOps và ba hệ thống được thực hiện qua **hợp đồng API công bố** — không phải truy vấn cơ sở dữ liệu trực tiếp. Mỗi hệ thống có mã nguồn và kho dữ liệu riêng; TradeOps đứng tên giữ dữ liệu nền và lịch sử danh mục, các công cụ nghiệp vụ đọc/ghi qua API.

## 5. Sáu module của TradeOps

TradeOps gồm sáu module được chia thành hai nhóm:

- **Module sử dụng hàng ngày** (không phụ thuộc điểm phát động nghiệp vụ): chỗ đội ngũ vận hành làm việc liên tục
- **Module chuẩn hoá dữ liệu theo từng khách hàng cuối**: dữ liệu nền — danh mục, BOM, các view tồn — dùng nhất quán cho cả vận hành hàng ngày và tích hợp với các công cụ nghiệp vụ chuyên dụng

### 5.1. Module sử dụng hàng ngày

#### Module 1 — Quản lý khách hàng cuối, hồ sơ và tiến độ

- danh sách khách hàng cuối đang phục vụ, trạng thái xử lý của từng khách
- không gian làm việc theo từng khách hàng
- gom hồ sơ theo lô hàng, kỳ báo cáo hoặc bộ việc
- gán người phụ trách, theo dõi trạng thái xử lý, hạn, vướng mắc
- tái sử dụng hồ sơ cũ làm mẫu cho hồ sơ tương tự
- truy xuất hồ sơ qua nhiều năm

#### Module 2 — Quản lý tài liệu và phiên bản

- nơi lưu tập trung cho hợp đồng, hoá đơn, packing list, B/L, AN, C/O nguồn (C/O đầu vào), Phụ lục X, BOM kỹ thuật từ nhà máy, BCCT, các báo cáo nội bộ và các tài liệu hỗ trợ khác
- gắn nguồn (kênh đến), phiên bản, trạng thái hiệu lực
- liên kết tài liệu với khách hàng cuối, hồ sơ, mã vật tư và tờ khai để truy vết

#### Module 3 — Nhật ký kiểm tra (nhật ký kiểm tra)

- ghi nhận ai đã thay đổi gì, khi nào, ở module nào
- truy vết được trạng thái của hồ sơ ở một thời điểm trong quá khứ
- xuyên suốt cả các thao tác do Siafu, Barry-CO, Barry-BCQT thực hiện trên dữ liệu của TradeOps
- là cơ sở chính để bảo vệ hồ sơ khi có yêu cầu kiểm tra sau thông quan

### 5.2. Module chuẩn hoá dữ liệu theo từng khách hàng cuối

#### Module 4 — Danh mục mã vật tư và bảng quy đổi mã

Với mỗi doanh nghiệp khách hàng cuối:

- danh mục thành phẩm (SP), nguyên vật liệu (NVL) và bán thành phẩm (BTP)
- mỗi mục có một mã định danh nội bộ ổn định
- bảng quy đổi giữa mã hải quan và mã nội bộ, hỗ trợ trường hợp cùng một vật tư có nhiều mã hải quan khác nhau qua các tờ khai theo thời gian

Khi danh mục này được dựng tử tế ngay từ đầu, các module phía sau đứng vững.

#### Module 5 — Quản lý BOM (định mức kỹ thuật) và Định mức Mẫu 16

- BOM (định mức kỹ thuật) nhiều cấp: SP ↔ BTP ↔ NVL
- phiên bản, hiệu lực và lịch sử chỉnh sửa rõ ràng
- vật tư thay thế và quy tắc thay thế
- liên kết chặt với danh mục mã ở Module 4, không phụ thuộc trực tiếp vào mã hải quan có thể thay đổi

BOM kỹ thuật là norm tại một thời điểm, có thể thay đổi theo thời gian và có thể chưa bao gồm tiêu hao thực tế trong sản xuất. BOM kỹ thuật được dùng làm cơ sở khi xin hồ sơ CO.

**Định mức Mẫu 16** dùng cho báo cáo quyết toán cuối năm là định mức bình quân gia quyền trong cả năm, được **tính từ số liệu thực tế**: số lượng SP đã xuất, số lượng NVL đã nhập, tiêu hao NVL trong sản xuất. Mẫu 16 không phải là bản copy hay làm phẳng của BOM kỹ thuật. TradeOps quản lý đồng thời BOM kỹ thuật (theo phiên bản) và dữ liệu thực tế theo kỳ cần thiết để Barry-BCQT tính ra Mẫu 16 ở cuối kỳ.

#### Module 6 — Theo dõi tồn nguyên vật liệu nhiều view

Cùng một loại NVL có nhiều "trạng thái tồn" hợp lệ song song:

- tồn thực tế tại kho
- tồn theo kế toán (NXT)
- tồn theo dữ liệu hải quan (BCCT)
- Tồn CO — quản lý theo lô nguyên liệu gắn với từng lô hàng xuất; có thể khác tồn thực tế kho và tồn kế toán do quy tắc xuất xứ ràng buộc cách gán lô nguyên liệu vào lô hàng xuất

TradeOps quản lý đồng thời các view này trên cùng một danh mục mã, **đối chiếu chênh lệch và truy vết được nguyên nhân**, thay vì ép tất cả về một con số duy nhất. Đây là phần khác biệt của TradeOps so với một kho tài liệu hay một module ERP thông thường — vốn không được thiết kế cho thực tế làm CO.

## 6. Quy trình vận hành chính

Phần này mô tả bốn quy trình đại diện. TradeOps đứng tên vòng đời tổng thể; ba app chuyên dụng được gọi tới ở những bước có điểm phát động cụ thể.

### 6.1. Đưa một khách hàng cuối mới vào hệ thống (thiết lập ban đầu)

**Khởi nguồn:** đại lý ký thoả thuận / giấy uỷ quyền với một khách hàng cuối mới (DN chế xuất hoặc SXXK).

**Trạng thái không gian làm việc:** `đề-xuất → đã-ký → dựng-danh-mục → dựng-bom → dựng-tài-liệu-nền → sẵn-sàng-vận-hành`

**Vai trò tham gia:** trưởng phòng XNK, nhân viên phụ trách thiết lập ban đầu, đầu mối phía khách hàng cuối.

**Các bước chính:**

1. **Mở không gian làm việc cho khách hàng cuối** — tạo bản ghi trên Module 1 với chế độ (DNCX / SXXK / gia công), MST, người phụ trách bên đại lý.
2. **Thu thập tư liệu nền** từ khách hàng cuối — TKNK lịch sử, BOM nhà máy, xuất kế toán NXT, C/O đầu vào sẵn có, danh mục mã nội bộ. Đưa vào Module 2 với gắn nguồn và đánh dấu là tư liệu lịch sử.
3. **Dựng danh mục mã vật tư** — định danh từng SP / NVL / BTP, gán mã ổn định nội bộ, dựng bảng quy đổi mã hải quan ↔ mã nội bộ (nhiều-nhiều, theo thời gian), ghi mã HS nơi nó ổn định.
4. **Dựng BOM** — nạp các BOM (định mức kỹ thuật) theo SP, gắn ngày hiệu lực, phiên bản, chứng từ nguồn; nhiều cấp SP ↔ BTP ↔ NVL; quy tắc thay thế nếu có.
5. **Lập đường nền nhiều view tồn** (trong khả năng dữ liệu đầu vào cho phép) — tồn thực tế, NXT kế toán, view tồn theo BCCT, Tồn CO. Chênh lệch ban đầu được ghi lại như dữ liệu, không ép về một con số.
6. **Phân loại và liên kết tài liệu nền** — TKNK / TKXK lịch sử, BOM nhà máy, C/O đầu vào, các tài liệu hỗ trợ khác đều được phân loại và link tới các thực thể liên quan trong Module 4 / 5.
7. **Xác nhận và chuyển trạng thái vận hành chính thức** — trưởng phòng rà soát, khách hàng cuối xác nhận trên một mẫu đại diện, không gian làm việc chuyển sang `sẵn-sàng-vận-hành`. Vận hành chính thức (CO / BCQT / lập tờ khai) bắt đầu được kích hoạt.

**Kết quả của thiết lập ban đầu:** không gian làm việc ở trạng thái sẵn sàng vận hành, dữ liệu nền sạch, kho tài liệu nền đã phân loại, nhật ký kiểm tra từ ngày đầu.

### 6.2. Lập hồ sơ CO cho một lô hàng xuất

**Khởi nguồn:** khách hàng cuối yêu cầu cấp CO cho một lô hàng xuất, hoặc Siafu phát sự kiện khi có TKXK được lập.

**Trạng thái:** `đã-yêu-cầu → tiếp-nhận-chứng-từ → khảo-sát-bom-và-lô → quyết-định-tuân-thủ-xuất-xứ → barry-co-chuẩn-bị → rà-soát → đã-nộp → [kiểm-tra-cơ-sở?] → đã-cấp → đã-lưu-trữ`

**Phạm vi:** cả CO ưu đãi (Form D / E / AK / AANZ / AJ / AHK / AI / RCEP / VKFTA / VJEPA / VCFTA / VN-EAEU; EUR.1 cho EVFTA / UKVFTA) và CO không ưu đãi (Form B, CNM). Sau Quyết định 1103/QĐ-BCT (21/4/2025), CO không ưu đãi và REX đã chuyển từ VCCI về 18 Phòng QLXNK thuộc Cục XNK; CO ưu đãi vẫn do Cục XNK / Bộ Công Thương cấp qua eCoSys như trước đó.

**Vai trò tham gia:** trưởng phòng XNK, nhân viên CO, nhân viên tiếp nhận, người ký số (tài khoản eCoSys), Barry-CO.

**Tiền điều kiện đáng lưu ý:** **hồ sơ thương nhân** của khách hàng cuối phải đã đăng ký trên eCoSys với giấy chứng nhận đăng ký kinh doanh, danh sách cơ sở sản xuất và chữ ký mẫu (theo Điều 13 Nghị định 31/2018). Đây là vướng mắc thường gặp trong ngày đầu cấp CO cho khách hàng cuối mới — nếu chưa có, phải đăng ký trước khi quy trình này hoàn tất được.

**Các bước chính:**

1. **Tiếp nhận** — yêu cầu vào Module 2 qua bất kỳ kênh nào, mở hồ sơ CO trong Module 1, ghi Form đích (ưu đãi / không ưu đãi).
2. **Thu thập chứng từ** — danh sách kiểm theo Form: TKXK (hoặc dự kiến), Invoice, Packing List, B/L, BOM kỹ thuật phiên bản hiệu lực, C/O đầu vào của NVL nhập, Phụ lục X (nếu có nhà cung cấp nội địa Việt Nam), quy trình sản xuất theo mẫu Thông tư 05/2018/TT-BCT, các tài liệu kèm theo Form. Thiếu chứng từ → trạng thái `tạm-dừng-chờ-chứng-từ`.
3. **Khảo sát BOM và lô NVL ứng cử** (chưa quyết định) — lấy BOM hiệu lực tại thời điểm sản xuất (ghim theo phiên bản cố định), liệt kê các lô NVL nhập có thể gán cho lô xuất từ Tồn CO, kèm C/O đầu vào, mã HS đầu vào (cho CTC), trị giá khai báo và tỷ giá tham chiếu (cho RVC).
4. **Ra quyết định tuân thủ xuất xứ** — gán cụ thể lô NVL nhập vào lô xuất sao cho tiêu chí xuất xứ của Form đích đạt được. **PSR governs khi có** trong phụ lục Form — không được thay thế bằng quy tắc chung. Nếu không có PSR áp dụng thì dùng quy tắc chung (Form D = WO / RVC ≥ 40% / CTH với quyền chọn giữa RVC40 và CTH ở chỗ cả hai cùng được mở). EVFTA outbound (VN→EU): EUR.1 nếu FOB > 6.000 EUR, exporter tự chứng nhận trên chứng từ thương mại nếu ≤ 6.000 EUR. Nếu không có lô nào thoả: thử Form khác, hoặc chuyển sang đường không ưu đãi (Form B / CNM), hoặc đóng hồ sơ với trạng thái `từ-chối`.
5. **Barry-CO chuẩn bị hồ sơ** — gọi Barry-CO qua API với BOM phiên bản, mã danh mục mã vật tư, lô NVL được gán, danh sách chứng từ, Form đích, tiêu chí xuất xứ. Barry-CO trả về gói hồ sơ CO.
6. **Rà soát** — nhân viên CO rà soát; trưởng phòng rà soát hồ sơ giá trị cao hoặc lần đầu cho một cặp SP–Form mới. Vấn đề phát hiện được quay lại bước 4 hoặc bước 2.
7. **Submit** — qua eCoSys cho các Form ưu đãi, Form B / CNM, và EVFTA EUR.1 trên ngưỡng 6.000 EUR. Với EVFTA / UKVFTA dưới ngưỡng, exporter tự chứng nhận trên chứng từ thương mại, không qua eCoSys.
8. **Kiểm tra cơ sở sản xuất (nhánh điều kiện)** — sau khi nộp, cơ quan cấp có thể yêu cầu kiểm tra cơ sở sản xuất theo Điều 28 Nghị định 31/2018 và Thông tư 39/2018/TT-BCT. Lý do thường gặp gồm: hồ sơ chưa rõ ràng, không chứng minh được tiêu chí, có dấu hiệu gian lận chuyển tải, hoặc đã có vi phạm trước đó. Biên bản kiểm tra được lưu vào Module 2; cấp CO chờ kết luận.
9. **Cấp CO và lưu trữ** — ghi số tham chiếu, số C/O, ngày cấp, loại cấp (cấp mới / cấp lại / cấp sau / back-to-back / Movement Certificate). Tồn CO trong Module 6 cập nhật lô NVL được tiêu thụ. Hồ sơ chuyển sang `đã-lưu-trữ` và giữ trong danh mục cho cửa sổ kiểm tra sau thông quan (~5 năm).

### 6.3. Chu kỳ báo cáo quyết toán năm (BCQT)

**Khởi nguồn:** sắp đến mốc kết thúc năm tài chính của khách hàng cuối. Theo Điều 60 Thông tư 38/2015/TT-BTC (sửa đổi bởi khoản 39 Điều 1 Thông tư 39/2018/TT-BTC, sửa đổi tiếp bởi Thông tư 121/2025/TT-BTC hiệu lực 01/02/2026), BCQT phải nộp trong **90 ngày** kể từ ngày kết thúc năm tài chính. Chu kỳ thường mở khoảng 60-90 ngày trước thời điểm đó để chuẩn bị dữ liệu song song với vận hành thường ngày.

**Trạng thái:** `chuẩn-bị-chu-kỳ → thu-thập-dữ-liệu-kỳ → lấy-dữ-liệu-khai-báo → đối-chiếu-nhiều-view → chuẩn-bị-mẫu-16 → barry-bcqt-lắp-gói → rà-soát-nội-bộ → khách-hàng-xác-nhận → đã-nộp → cửa-sổ-tự-sửa → đã-lưu-trữ`

**Vai trò tham gia:** trưởng phòng XNK, nhân viên BCQT, nhân viên kế toán phía khách hàng cuối, đại diện khách hàng cuối (ký xác nhận số liệu), người ký số, Barry-BCQT.

**Các bước chính:**

1. **Mở chu kỳ** — tạo hồ sơ BCQT trong Module 1 cho khách hàng cuối, ghi mốc kỳ báo cáo, chế độ (gia công / SXXK / DNCX), người phụ trách.
2. **Thu thập dữ liệu kỳ** — tổng NVL nhập trong kỳ (từ TKNK), tổng SP xuất (từ TKXK + dữ liệu sản xuất), tiêu thụ NVL thực tế theo SP theo kỳ, tiêu hao theo cặp SP-NVL, tồn đầu kỳ và cuối kỳ theo từng view, di chuyển BTP nếu có. Thiếu dữ liệu → `tạm-dừng-chờ-dữ-liệu` chờ khách hàng cuối.
3. **Pull dữ liệu khai báo từ hệ thống hải quan** — line-level extract của TKNK + TKXK trong kỳ (nội bộ gọi là "BCCT extract" — đây là cách gọi tắt, không phải thuật ngữ của hệ thống hải quan).
4. **Đối chiếu nhiều view tồn** — qua bốn view (thực tế / NXT kế toán / theo dữ liệu hải quan / Tồn CO) cho từng NVL trong kỳ. Đầu ra: Danh sách NVL nhập khẩu trong kỳ (cho Mẫu 15), Danh sách SP xuất khẩu trong kỳ (cho Mẫu 15a), và sổ ghi nhận chênh lệch chưa giải thích được.
5. **Chuẩn bị Mẫu 16** — tính định mức bình quân thực tế: tổng NVL tiêu thụ chia tổng SP sản xuất, có tiêu hao tính vào. Kiểm tra hợp lý: bình quân gia quyền BOM kỹ thuật theo sản lượng nên gần Mẫu 16; lệch lớn không giải trình được là tín hiệu cảnh báo — Mẫu 16 trông giống BOM kỹ thuật là điều dễ kéo sự soi xét của hải quan.
6. **Barry-BCQT lắp gói báo cáo** — gọi qua API với kỳ báo cáo, chế độ, dữ liệu kỳ, kết quả đối chiếu, đầu vào Mẫu 16, phiên bản đã ghim của BOM kỹ thuật. Barry-BCQT trả về gói báo cáo theo mẫu Thông tư 121/2025 — Mẫu 15/BCQT-NVL/GSQL, Mẫu 15a/BCQT-SP/GSQL, Mẫu 16/ĐMTT-GSQL. Mẫu 15b / 15c chỉ áp dụng khi có gia công lại ở nước ngoài (chế độ gia công).
7. **Rà soát nội bộ** — trưởng phòng rà soát tính hợp lý của Mẫu 16 so với BOM bình quân theo sản lượng, đối chiếu NXT kế toán với Danh sách NVL nhập và với view theo dữ liệu hải quan, phủ kín NVL và SP trong kỳ, tiêu hao quán xuyến, mọi chênh lệch đã có giải thích. Vấn đề phát hiện được quay lại bước 2 hoặc bước 4.
8. **End-client xác nhận số liệu** — đại diện khách hàng cuối có thẩm quyền xác nhận bằng văn bản (email, công văn, hoặc văn bản có ký) rằng số liệu trên Mẫu 15 / 15a / 16 khớp với số kế toán và sản xuất phía họ. Trách nhiệm về số liệu BCQT thuộc về doanh nghiệp khách hàng cuối, không phải đại lý — bước này là ranh giới trách nhiệm rõ ràng, không phải hình thức.
9. **Nộp BCQT** — người ký số nộp BCQT đến **Chi cục Hải quan nơi đã thông báo cơ sở sản xuất** qua **Hệ thống tiếp nhận BCQT** của cơ quan hải quan (kênh này khác với VNACCS / VCIS — VNACCS là kênh tờ khai). Nếu hệ thống không hoạt động, phương án dự phòng là nộp bản giấy có chữ ký và dấu của đại diện khách hàng cuối.
10. **Cửa sổ tự sửa 60 ngày** — trong 60 ngày kể từ ngày nộp **và** trước khi cơ quan hải quan ban hành quyết định kiểm tra BCQT / kiểm tra sau thông quan / thanh tra (theo Điều 60 Thông tư 38/2015 đã sửa đổi), khách hàng cuối được tự nộp lại BCQT đã chỉnh sửa mà không bị xử phạt. Sau khi cửa sổ này hết hoặc khi có quyết định kiểm tra, quyền này không còn; mọi điều chỉnh chuyển sang xử lý theo luật thuế / xử phạt hành chính.
11. **Lưu trữ** — gói BCQT đầy đủ (mọi đầu vào, đối chiếu, giải thích chênh lệch, xác nhận, lịch sử tự sửa nếu có) lưu trong danh mục cho cửa sổ kiểm tra sau thông quan (~5 năm).

### 6.4. Phản hồi khi có yêu cầu kiểm tra sau thông quan

**Khởi nguồn:** cơ quan hải quan ban hành **Quyết định kiểm tra sau thông quan** (KTSTQ) đối với khách hàng cuối. Quyết định do Tổng cục trưởng / Cục trưởng Cục KTSTQ / Cục trưởng Cục Hải quan tỉnh / Chi cục trưởng ký, tuỳ phạm vi; gửi đến doanh nghiệp khai báo trong **3 ngày làm việc** kể từ ngày ký và **ít nhất 5 ngày làm việc** trước ngày kiểm tra. Trong các trường hợp nhẹ, có thể có công văn yêu cầu cung cấp hồ sơ / giải trình đến trước, nhưng văn bản chính thức của KTSTQ là quyết định.

Cửa sổ mở lại: **5 năm kể từ ngày đăng ký tờ khai hải quan** theo Điều 77 Luật Hải quan 2014.

**Trạng thái:** `tiếp-nhận-quyết-định → đánh-giá-phạm-vi → xác-định-địa-điểm → dựng-lại-chuỗi → lắp-gói-phản-hồi → đã-nộp → [tại-trụ-sở-cơ-quan | tại-trụ-sở-doanh-nghiệp] → đã-có-kết-luận → đã-giải-quyết → [khiếu-nại?]`

**Hai nhánh địa điểm kiểm tra:**

- **Tại trụ sở cơ quan hải quan** (Điều 79 Luật Hải quan + Điều 97 Nghị định 08/2015 sửa đổi Nghị định 59/2018): kiểm tra hồ sơ trên giấy / điện tử tại văn phòng cơ quan hải quan, tối đa 5 ngày làm việc theo Điều 79 (không có gia hạn theo luật).
- **Tại trụ sở người khai hải quan** (Điều 80 Luật Hải quan + Điều 98 Nghị định 08/2015): đoàn kiểm tra đến trụ sở khách hàng cuối, tối đa 10 ngày làm việc + 10 ngày gia hạn; mỗi ngày có biên bản làm việc ký cả hai bên; biên bản kiểm tra (tổng kết) trong 5 ngày làm việc kể từ ngày kết thúc kiểm tra; **Kết luận kiểm tra** ban hành trong **15 ngày** kể từ ngày kết thúc kiểm tra.

**Vai trò tham gia:** trưởng phòng XNK, nhân viên CO / BCQT / TKXNK tuỳ phạm vi, đại diện khách hàng cuối có thẩm quyền, cố vấn / luật sư bên ngoài ở các vụ có rủi ro xử phạt.

**Các bước chính:**

1. **Tiếp nhận quyết định** — quyết định KTSTQ vào Module 2; mở hồ sơ phản hồi kiểm tra trong Module 1 gắn với khách hàng cuối; ghi cơ quan ký, số quyết định, địa điểm kiểm tra, phạm vi, thời hạn phản hồi.
2. **Xác định phạm vi** — trưởng phòng đối chiếu quyết định với danh mục: hồ sơ nào, kỳ nào, mã của khách hàng cuối nào, ai từng phụ trách (có thể đã rời đơn vị), có cần luật sư từ đầu không, tính khả thi trong thời hạn, kiểm tra hiệu lực giấy uỷ quyền hiện tại có bao trùm phạm vi không.
3. **Ấn định địa điểm và chuẩn bị logistics** — xác định nhánh (trụ sở hải quan vs trụ sở khách hàng cuối), kế hoạch chuẩn bị theo từng nhánh, danh sách nhân viên đại lý tham gia.
4. **Dựng lại chuỗi xử lý** — với mỗi hồ sơ trong phạm vi:
   - **Cho hồ sơ CO:** chứng từ gốc, BOM phiên bản đã pin tại thời điểm xử lý, lô NVL đã gán (kèm chênh lệch vs tồn thực tế / NXT kế toán đã ghi nhận lúc đó), tiêu chí xuất xứ áp dụng (PSR, RVC với tỷ giá, CTC với HS đầu vào / đầu ra, WO basis), lịch sử quyết định, biên bản kiểm tra cơ sở sản xuất nếu có
   - **Cho hồ sơ BCQT:** đầu vào Mẫu 16, đối chiếu nhiều view tồn cho kỳ, sổ chênh lệch, kiểm tra hợp lý, bằng chứng cân đối Mẫu 15 / 15a, xác nhận của khách hàng cuối, gói đã nộp (theo mẫu hiệu lực tại thời điểm đó), lịch sử tự sửa hoặc mở lại

   Nếu một mắt xích thực sự không dựng lại được (gap dữ liệu thực sự), ghi nhận rõ ràng những gì có và những gì thiếu. **Ghi nhận trung thực được ưu tiên hơn nguỵ tạo.**
5. **Lắp gói phản hồi** — công văn phản hồi quyết định, gói dựng lại theo từng hồ sơ, giải trình từng mục trong phạm vi với dẫn chứng từ nhật ký kiểm tra, chỉ mục tham chiếu chéo giữa các mục yêu cầu và mục phản hồi, phụ lục chứng từ.
6. **Nộp / chuẩn bị tại chỗ** — với nhánh trụ sở hải quan, nộp gói qua kênh quy định trong quyết định. Với nhánh trụ sở khách hàng cuối, gói là tài liệu chuẩn bị mang theo cho buổi kiểm tra.
7. **Diễn ra kiểm tra** — nếu trụ sở hải quan: các phiên làm việc với biên bản từng phiên. Nếu trụ sở khách hàng cuối: đoàn kiểm tra tại hiện trường, biên bản làm việc hàng ngày ký cả hai bên — đây là chứng cứ trọng yếu vì nó ghi nhận sự đồng thuận cả hai bên về sự việc tại thời điểm đó.
8. **Tiếp nhận kết luận** — biên bản kiểm tra (tổng kết) trong 5 ngày làm việc của kết thúc kiểm tra; Kết luận kiểm tra do cơ quan ký ban hành trong 15 ngày của kết thúc kiểm tra.
9. **Resolve** — kết quả có thể là:
   - **Pass sạch** — không có findings
   - **Điều chỉnh nhẹ** — đối chiếu nhỏ, không xử phạt
   - **Quyết định xử phạt vi phạm hành chính** — phạt tiền, thuế truy thu, hoặc biện pháp hành chính khác
   - **Chuyển hình sự** — vượt phạm vi hành chính (hiếm; ngưỡng theo BLHS 2015 sửa đổi 2017: Điều 188 buôn lậu, Điều 189 vận chuyển trái phép qua biên giới, Điều 200 trốn thuế — ngưỡng 100 triệu VNĐ trốn thuế, thấp hơn nếu đã có xử phạt hành chính trước hoặc đã bị kết án về một trong các tội này)
10. **Khiếu nại (nhánh điều kiện)** — nếu khách hàng cuối không đồng tình, được khiếu nại lần đầu trong **90 ngày** kể từ ngày nhận quyết định xử phạt / kết luận (theo Điều 9 Luật Khiếu nại 2011); khiếu nại lần hai hoặc khởi kiện hành chính tại Toà án là các bước tiếp theo.

**Vì sao quy trình này đặc biệt với TradeOps:** ba hệ thống nghiệp vụ chuyên dụng đều giữ hồ sơ trong phạm vi của mình theo đúng quy định 5 năm, nhưng kết luận kiểm tra thường yêu cầu dựng lại **toàn bộ chuỗi** đi qua cả ba hệ thống cộng phần ngoài hệ thống. Nếu không có một nơi đứng tên giữ liên tục nhật ký kiểm tra xuyên các app và phần ngoài, công việc dựng lại phải đi từng email / Zalo / Excel / thư mục cá nhân — đây là rủi ro thường trực mà TradeOps hướng tới giảm.

## 7. Lợi ích kỳ vọng và chỉ số đo lường

Lợi ích định tính:

- giảm phụ thuộc vào Excel và thư mục cá nhân
- giảm rủi ro thất lạc hoặc dùng nhầm phiên bản tài liệu
- tăng khả năng truy vết và kiểm tra lại hồ sơ
- chuẩn hoá cách làm việc giữa các nhân viên
- tạo nền tảng để mở rộng phục vụ thêm khách hàng cuối mà không phải dựng lại từ đầu

Hướng cải thiện kỳ vọng khi hệ thống đi vào sử dụng:

- rút ngắn đáng kể thời gian tra cứu bản BOM đang hiệu lực, thay vì phải tìm qua nhiều thư mục cá nhân
- các hồ sơ CO trong phạm vi triển khai được liên kết đầy đủ chuỗi chứng từ liên quan ngay trong hệ thống
- giảm rủi ro dùng nhầm phiên bản BOM hoặc chứng từ nhờ trạng thái hiệu lực và lịch sử phiên bản rõ ràng
- rút ngắn thời gian dựng hồ sơ CO cho lô hàng tương tự lô đã xử lý nhờ tái sử dụng dữ liệu BOM, định mức và chứng từ đã liên kết
- rút ngắn thời gian bàn giao công việc khi nhân sự thay đổi, do hồ sơ và lịch sử xử lý nằm trong không gian làm việc chung
- giảm thời gian chuẩn bị dữ liệu cho báo cáo quyết toán hải quan nhờ tờ khai, BOM và tồn được liên kết sẵn (hướng tới ở giai đoạn 2)
- rút ngắn thời gian đưa thêm một khách hàng cuối mới vào hệ thống nhờ có quy trình chuẩn hoá danh mục từ ban đầu

Các nội dung trên là kỳ vọng định hướng. Mức độ cải thiện thực tế phụ thuộc vào dữ liệu đầu vào, phạm vi triển khai và cách phối hợp với đội ngũ nghiệp vụ; sẽ được trao đổi thêm trong buổi khảo sát.

## 8. Định hướng triển khai

Đề xuất triển khai theo từng giai đoạn, bắt đầu từ phần có tác động rõ nhất.

### 8.1. Giai đoạn 1 — danh mục + hồ sơ + nhật ký kiểm tra cho khách hàng thí điểm

Phạm vi:

- thiết lập không gian làm việc cho khách hàng cuối thí điểm trong TradeOps: danh sách hồ sơ, người phụ trách, trạng thái xử lý
- nhận tài liệu khách qua các kênh hiện hữu (Zalo, email, file share) vào TradeOps; quản lý phiên bản tập trung
- thiết lập danh mục SP / NVL / BTP và bảng quy đổi mã, rút từ tờ khai lịch sử, BOM nhà máy và xuất kế toán
- quản lý BOM phiên bản và hiệu lực
- nhật ký kiểm tra xuyên suốt phục vụ giải trình khi có yêu cầu kiểm tra sau thông quan
- kết nối Barry-CO với TradeOps để minh hoạ một bộ hồ sơ CO đầu cuối chạy trên không gian làm việc đã thiết lập

Trước khi tích hợp Barry-CO, đội vận hành của đại lý đã có thể: quản lý hồ sơ khách hàng cuối thí điểm trên TradeOps; tiếp nhận tài liệu khách qua các kênh hiện hữu vào hệ thống; tra lại hồ sơ cũ và lịch sử thao tác; bàn giao công việc giữa nhân viên qua không gian làm việc chung. Tích hợp với Barry-CO bổ sung khả năng dựng và nộp hồ sơ CO đầu cuối ngay trên không gian đó.

Mục tiêu giai đoạn: với khách hàng cuối thí điểm, đại lý có **một không gian làm việc đầy đủ trong TradeOps** — danh sách khách, hồ sơ, dữ liệu nền sạch, lịch sử có nhật ký kiểm tra. Để minh hoạ tính tích hợp, một bộ hồ sơ CO thực tế chạy đầu cuối trên không gian đó qua Barry-CO.

### 8.2. Giai đoạn 2 — Tồn nhiều view, tờ khai và quyết toán hải quan

Phạm vi:

- module tồn nhiều view và đối chiếu chênh lệch
- kết nối Siafu với TradeOps để khai thác danh mục và lưu tờ khai vào lịch sử danh mục
- kết nối Barry-BCQT với TradeOps để chạy báo cáo quyết toán dựa trên các module chuẩn hoá và lịch sử danh mục

Mục tiêu giai đoạn: một bộ báo cáo quyết toán năm có thể được chuẩn bị mà không cần rời khỏi không gian đã chuẩn hoá; chênh lệch giữa các view tồn được phơi bày và truy vết rõ ràng.

### 8.3. Giai đoạn 3 — Tích hợp và báo cáo vận hành

Phạm vi:

- tích hợp có chọn lọc với hệ thống kế toán hoặc ERP của khách hàng cuối nếu cần
- báo cáo và dashboard vận hành xuyên các khách hàng cuối của đại lý
- mở quyền truy cập có kiểm soát cho khách hàng cuối nếu phù hợp

Mục tiêu giai đoạn: kết nối TradeOps vào hạ tầng vận hành rộng hơn của các khách hàng cuối và của bản thân đại lý.

Khung thời gian gợi ý cho từng giai đoạn sẽ được trao đổi thêm sau buổi khảo sát, dựa trên quy mô khách hàng cuối cần phục vụ trước, khối lượng tài liệu hiện có và mức độ sẵn sàng của dữ liệu đầu vào.

## 9. Phạm vi không nằm trong giai đoạn 1

Để giữ giai đoạn 1 đủ tập trung và đúng phạm vi, các phần sau không thuộc giai đoạn 1:

- kế toán tài chính, công nợ, sổ cái
- quản lý kho thực tế: nhập kho, xuất kho, kiểm kê thực địa
- lập kế hoạch sản xuất và điều độ sản xuất
- quản lý mua hàng đầu cuối: đặt hàng, hợp đồng, thanh toán nhà cung cấp
- thay thế hệ thống ERP hoặc phần mềm kế toán hiện có
- tự động truyền tờ khai lên cổng hải quan; việc khai báo do Siafu và các kênh hiện hữu thực hiện, TradeOps quản lý dữ liệu nghiệp vụ kèm theo
- cổng truy cập dành cho khách hàng cuối

Các hạng mục này có thể được xem xét ở giai đoạn 2 hoặc giai đoạn 3 tuỳ nhu cầu thực tế.

## 10. Kết quả dự kiến của giai đoạn 1

Các kết quả mong đợi sau khi giai đoạn 1 được triển khai:

- không gian làm việc cho khách hàng cuối thí điểm được dựng đầy đủ trên TradeOps: danh sách hồ sơ, người phụ trách, trạng thái xử lý, lịch sử thao tác
- mỗi khách hàng cuối thuộc phạm vi thí điểm có không gian làm việc riêng với quyền truy cập được kiểm soát theo người dùng và theo vai trò
- tài liệu trong phạm vi triển khai được đưa vào hệ thống và có lịch sử phiên bản rõ ràng
- nhật ký kiểm tra ghi nhận các thao tác trọng yếu, đủ để rà soát và giải trình khi cần (đặc biệt cho yêu cầu kiểm tra sau thông quan)
- danh mục SP / NVL / BTP và bảng quy đổi mã được dựng cho khách hàng cuối thí điểm và đưa vào sử dụng thực tế
- BOM có thể được tạo, chỉnh sửa, đánh dấu hiệu lực, ghi nhận lịch sử thay đổi và liên kết tới mã thành phẩm
- có thể tìm kiếm tài liệu theo khách hàng cuối, mã sản phẩm, mã vật tư, số chứng từ và số hồ sơ
- một bộ hồ sơ CO thực tế được dựng đầu cuối trên TradeOps + Barry-CO để minh hoạ tính tích hợp với công cụ nghiệp vụ chuyên dụng

Phạm vi và mức độ chi tiết của các kết quả trên sẽ được làm rõ thêm trong buổi khảo sát và biên bản phạm vi công việc.

## 11. Các nội dung cần làm rõ trong buổi khảo sát

Đây là các câu hỏi cần TT-HN trả lời để chốt phạm vi thí điểm và lộ trình triển khai. Các quy trình ở §6 đã thiết kế ở mức general — câu trả lời của TT-HN ảnh hưởng đến cấu hình cụ thể.

### 11.1. Về quy mô và bối cảnh

- Khách hàng cuối thí điểm sẽ là ai? Quy mô (số TKNK / TKXK / CO / năm), chế độ (DNCX / SXXK / gia công)?
- Khối lượng tài liệu hiện tại của khách hàng thí điểm — bao nhiêu GB / tháng / khách?
- Thời điểm năm tài chính của các khách hàng cuối — calendar year hay khác?
- Đối với khách hàng DNCX trong danh mục: tỷ trọng XNK tại chỗ chiếm bao nhiêu trong tổng khối lượng tờ khai?

### 11.2. Về quy trình hiện tại

- Thiết lập ban đầu cho khách hàng cuối hiện nay do ai làm tại TT-HN — trưởng phòng hay nhân viên chuyên trách?
- Yêu cầu CO đến qua kênh nào là chủ yếu (email, Zalo, lịch cố định)?
- Rà soát hồ sơ CO — trưởng phòng rà soát mọi hồ sơ hay chỉ trên một ngưỡng giá trị / lần đầu?
- Phân bố Form CO của TT-HN qua các năm gần đây như thế nào (Form D vs CPTPP / RCEP vs EVFTA)?
- TT-HN xử lý EVFTA / UKVFTA dưới ngưỡng 6.000 EUR (tự chứng nhận, không qua eCoSys) như thế nào — qua đại lý để lưu hồ sơ hay khách hàng cuối tự làm?
- Tần suất nhánh kiểm tra cơ sở sản xuất trong lịch sử của TT-HN?
- Tần suất cấp lại / cấp sau / back-to-back / Movement Certificate?

### 11.3. Về quyết toán và kiểm tra sau thông quan

- Cách khách hàng cuối điển hình của TT-HN cấp NXT kế toán cho đại lý — đúng hạn hay phải nhắc nhiều tuần?
- Kế toán có theo dõi tiêu hao theo kỳ hay chỉ năm-một?
- Cơ chế khách hàng cuối xác nhận số liệu BCQT trước khi nộp hiện nay như thế nào — email, công văn, hay chữ ký số?
- Tần suất nhánh mở lại / kiểm tra sau khi nộp BCQT trong lịch sử của TT-HN?
- TT-HN đã trải qua các vụ kiểm tra sau thông quan trong vài năm gần đây không? Phân bố loại (nhẹ vs xử phạt vs hình sự)? Phân bố địa điểm (trụ sở cơ quan vs trụ sở doanh nghiệp)?
- TT-HN có thường engage luật sư cho phản hồi kiểm tra hay tự làm?
- Mẫu giấy uỷ quyền hiện tại của TT-HN có bao trùm phản hồi KTSTQ mặc định, hay phải làm uỷ quyền mới mỗi lần?

### 11.4. Về hạ tầng và sovereignty

- TT-HN có sẵn quan hệ với nhà cung cấp cloud nào (Viettel / VNG / FPT / CMC) chưa?
- Có khách hàng cuối nào yêu cầu data ở chỗ riêng hoặc on-premise không?
- Ai chịu chi phí hạ tầng lưu trữ — đại lý hay tính chuyển cho khách hàng cuối?
- Yêu cầu RPO / RTO cho disaster recovery?
- Có dữ liệu lịch sử cần chuyển vào hệ thống lúc khởi đầu, hay chỉ áp dụng từ thời điểm vận hành chính thức trở đi?

### 11.5. Về cách làm việc

- Người ký số trên eCoSys / hệ thống BCQT của TT-HN tập trung (1-2 người) hay phân tán (mỗi nhân viên có tài khoản)?
- Định dạng phản hồi KTSTQ mà các Cục Hải quan TT-HN làm việc thường yêu cầu (trực tiếp, công văn, kênh điện tử)?
- Các dấu hiệu cảnh báo mà trưởng phòng XNK của TT-HN thường để ý khi rà soát BCQT? (Đây sẽ thành danh sách kiểm nội bộ của hệ thống.)

## Phụ lục — Tham chiếu pháp lý

Các quy định nền của các quy trình ở §6:

- **Luật Hải quan 2014** — Điều 77 (cửa sổ kiểm tra sau thông quan 5 năm), Điều 79 (KTSTQ tại trụ sở cơ quan hải quan), Điều 80 (KTSTQ tại trụ sở người khai hải quan)
- **Luật Khiếu nại 2011** — Điều 9 (thời hiệu khiếu nại 90 ngày)
- **Bộ luật Hình sự 2015 (sửa đổi 2017)** — Điều 188 (buôn lậu), Điều 189 (vận chuyển trái phép hàng hoá qua biên giới), Điều 200 (trốn thuế — ngưỡng 100 triệu VNĐ)
- **Nghị định 08/2015/NĐ-CP (sửa đổi Nghị định 59/2018/NĐ-CP)** — Điều 97 (thủ tục KTSTQ tại trụ sở cơ quan hải quan), Điều 98 (KTSTQ tại trụ sở người khai hải quan)
- **Nghị định 31/2018/NĐ-CP** — Điều 13 (hồ sơ thương nhân trên eCoSys), Điều 28 (kiểm tra cơ sở sản xuất khi xét xuất xứ)
- **Thông tư 38/2015/TT-BTC** — Điều 60 (BCQT, 90 ngày), sửa đổi bởi khoản 39 Điều 1 Thông tư 39/2018/TT-BTC, sửa đổi tiếp bởi **Thông tư 121/2025/TT-BTC** (hiệu lực 01/02/2026, thay mẫu 15 / 15a / 16 trong Phụ lục V)
- **Thông tư 39/2018/TT-BCT** — kiểm tra, xác minh xuất xứ hàng hoá xuất khẩu (Bộ Công Thương)
- **Thông tư 05/2018/TT-BCT** — Phụ lục X (khai báo xuất xứ của nhà cung cấp nội địa Việt Nam), mẫu Quy trình sản xuất
- **Thông tư 11/2020/TT-BCT** — Điều 19 (EVFTA: EUR.1 nếu FOB > 6.000 EUR, tự chứng nhận trên chứng từ thương mại nếu ≤ 6.000 EUR; REX là cơ chế phía EU, không áp dụng cho VN xuất ra)
- **Quyết định 1103/QĐ-BCT (21/04/2025)** — chuyển quyền cấp C/O không ưu đãi (Form B, CNM), GSP Norway / Switzerland và mã số REX từ VCCI về 18 Phòng QLXNK thuộc Cục XNK / Bộ Công Thương; VCCI dừng cấp các loại đó từ 5/5/2025

Các trích dẫn trên là tham chiếu nền cho thiết kế quy trình; các con số ngày / tỷ lệ / mẫu form đã được kiểm chứng tại thời điểm 27/04/2026, cần kiểm lại trước khi tài liệu này được dùng cho hợp đồng cụ thể.
