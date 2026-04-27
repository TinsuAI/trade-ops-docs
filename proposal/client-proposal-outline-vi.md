# Đề cương đề xuất hệ thống

## 1. Bối cảnh

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
- nhật ký xử lý xuyên thời gian phục vụ giải trình khi kiểm tra sau thông quan

Hiện nay, Tinsu AI và Trọng Tín - Hoa Nam đang triển khai ba hệ thống nghiệp vụ chuyên dụng:

- **Siafu** — lập tờ khai xuất nhập khẩu
- **Barry-CO** — lập hồ sơ CO cho lô hàng xuất khẩu
- **Barry-BCQT** — báo cáo quyết toán hải quan hàng năm

Mỗi hệ thống tăng tốc một đầu nghiệp vụ chuyên môn, bật khi có điểm phát động cụ thể (có tờ khai cần lập, có lô hàng cần xin CO, đến kỳ báo cáo quyết toán). Nhưng **không hệ thống nào trong số đó quản lý danh mục khách hàng cuối của đại lý**, không hệ thống nào lưu trữ lịch sử danh mục xuyên năm, không hệ thống nào trả lời được câu hỏi "hồ sơ này hai năm trước được dựng thế nào và ai đã làm". Đó là phần đại lý đang tự lo, và là khoảng trống mà đề xuất này hướng đến.

## 2. Vấn đề cốt lõi ở mức đại lý

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
- BOM và lịch sử thay đổi BOM thường được giữ phi chính thức
- nhiều loại tồn hợp lệ song song (thực tế, kế toán, theo dữ liệu hải quan, CO) nhưng không có chỗ đối chiếu
- chưa có nhật ký kiểm tra thống nhất xuyên các hệ thống

## 3. Hướng đề xuất — TradeOps là hệ thống quản lý danh mục khách hàng và hồ sơ xuyên năm của đại lý

Đề xuất là xây dựng **TradeOps** — hệ thống mà đại lý dùng để **quản lý toàn bộ danh mục khách hàng cuối qua thời gian**: ai là khách, đang làm gì, hồ sơ nào, ai phụ trách, lịch sử ra sao, có bảo vệ được khi kiểm tra không.

TradeOps là nơi:

- **danh mục**: danh sách khách hàng cuối, trạng thái từng khách, người phụ trách, mức độ phức tạp
- **hồ sơ và tiến độ**: hồ sơ nào đang mở, ai làm, hạn, vướng mắc, trạng thái xử lý
- **lịch sử xuyên năm**: mọi hồ sơ, mọi phiên bản BOM, mọi tài liệu, mọi thao tác — truy xuất được nhiều năm sau
- **dữ liệu nền của từng khách**: danh mục SP / NVL / BTP, BOM phiên bản, bảng quy đổi mã, các view tồn — giữ nhất quán để mọi nghiệp vụ phía sau dùng được
- **nhật ký kiểm tra xuyên suốt** — đáp ứng yêu cầu giải trình khi hải quan kiểm tra sau thông quan

### Vì sao Siafu, Barry-CO, Barry-BCQT không thể tự đảm nhận phần này

Mỗi hệ thống chuyên dụng giữ phần dữ liệu cần cho **một đầu nghiệp vụ riêng**:

- Barry-CO giữ BOM, chứng từ và tồn CO **của lô hàng đang xin CO**
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

### Quan hệ giữa TradeOps và ba hệ thống nghiệp vụ

TradeOps quản lý phần liên tục: khách, hồ sơ, dữ liệu nền, lịch sử. Ba hệ thống nghiệp vụ chuyên xử lý các điểm phát động cụ thể trong vòng đời mỗi hồ sơ.

Khi tích hợp, ba hệ thống đọc dữ liệu nền của khách hàng cuối từ TradeOps (danh mục, BOM, chứng từ) và ghi tờ khai / hồ sơ CO / báo cáo quyết toán trở lại như một phần của lịch sử danh mục. Đây là **lợi ích cộng thêm** khi cả TradeOps và ba công cụ cùng có — không phải lý do TradeOps tồn tại.

### TradeOps cho phép

- **mở rộng phục vụ thêm khách hàng cuối** mà không cần xây lại nền vận hành mỗi lần
- **bảo vệ hồ sơ khi kiểm tra sau thông quan** thành thao tác trên hệ thống thay vì dựng lại bằng tay từ nhiều nguồn
- **bàn giao và mở rộng đội ngũ** mà không phụ thuộc tri thức nằm trong đầu nhân viên
- **chuẩn hoá dữ liệu nền** để mọi nghiệp vụ phía sau (CO, quyết toán, tờ khai) dùng được nhất quán — lợi ích cộng thêm khi tích hợp với các công cụ chuyên dụng

## 4. Các nhóm chức năng chính của TradeOps

TradeOps gồm sáu module được chia thành hai nhóm:

- **Module sử dụng hàng ngày** (không phụ thuộc điểm phát động nghiệp vụ): chỗ đội ngũ vận hành làm việc liên tục
- **Module chuẩn hoá dữ liệu theo từng khách hàng cuối**: dữ liệu nền — danh mục, BOM, các view tồn — dùng nhất quán cho cả vận hành hàng ngày và tích hợp với các công cụ nghiệp vụ chuyên dụng

### Module sử dụng hàng ngày

#### 4.1. Quản lý khách hàng cuối, hồ sơ và tiến độ

- danh sách khách hàng cuối đang phục vụ, trạng thái xử lý của từng khách
- không gian làm việc theo từng khách hàng
- gom hồ sơ theo lô hàng, kỳ báo cáo hoặc bộ việc
- gán người phụ trách, theo dõi trạng thái xử lý, hạn, vướng mắc
- tái sử dụng hồ sơ cũ làm mẫu cho hồ sơ tương tự
- truy xuất hồ sơ qua nhiều năm

#### 4.2. Quản lý tài liệu và phiên bản

- nơi lưu tập trung cho hợp đồng, hoá đơn, packing list, B/L, AN, C/O nguồn, Phụ lục X, BOM kỹ thuật từ nhà máy, BCCT, các báo cáo nội bộ và các tài liệu hỗ trợ khác
- gắn nguồn (kênh đến), phiên bản, trạng thái hiệu lực
- liên kết tài liệu với khách hàng cuối, hồ sơ, mã vật tư và tờ khai để truy vết

#### 4.3. Nhật ký kiểm tra (nhật ký kiểm tra)

- ghi nhận ai đã thay đổi gì, khi nào, ở module nào
- truy vết được trạng thái của hồ sơ ở một thời điểm trong quá khứ
- xuyên suốt cả các thao tác do Siafu, Barry-CO, Barry-BCQT thực hiện trên dữ liệu của TradeOps
- là cơ sở chính để bảo vệ hồ sơ khi hải quan kiểm tra sau thông quan

### Module chuẩn hoá dữ liệu theo từng khách hàng cuối

#### 4.4. Danh mục mã vật tư và bảng quy đổi mã

Với mỗi doanh nghiệp khách hàng cuối:

- danh mục thành phẩm (SP), nguyên vật liệu (NVL) và bán thành phẩm (BTP)
- mỗi mục có một mã định danh nội bộ ổn định
- bảng quy đổi giữa mã hải quan và mã nội bộ, hỗ trợ trường hợp cùng một vật tư có nhiều mã hải quan khác nhau qua các tờ khai theo thời gian

Khi danh mục này được dựng tử tế ngay từ đầu, các module phía sau đứng vững.

#### 4.5. Quản lý BOM (định mức kỹ thuật) và Định mức Mẫu 16

- BOM (định mức kỹ thuật) nhiều cấp: SP ↔ BTP ↔ NVL
- phiên bản, hiệu lực và lịch sử chỉnh sửa rõ ràng
- vật tư thay thế và quy tắc thay thế
- liên kết chặt với danh mục mã ở 4.4, không phụ thuộc trực tiếp vào mã hải quan có thể thay đổi

BOM kỹ thuật là norm tại một thời điểm, có thể thay đổi theo thời gian và có thể chưa bao gồm tiêu hao thực tế trong sản xuất. BOM kỹ thuật được dùng làm cơ sở khi xin hồ sơ CO.

**Định mức Mẫu 16** dùng cho báo cáo quyết toán cuối năm là định mức bình quân gia quyền trong cả năm, được **tính từ số liệu thực tế**: số lượng SP đã xuất, số lượng NVL đã nhập, tiêu hao NVL trong sản xuất. Mẫu 16 không phải là bản copy hay làm phẳng của BOM kỹ thuật. TradeOps quản lý đồng thời BOM kỹ thuật (theo phiên bản) và dữ liệu thực tế theo kỳ cần thiết để Barry-BCQT tính ra Mẫu 16 ở cuối kỳ.

#### 4.6. Theo dõi tồn nguyên vật liệu nhiều view

Cùng một loại NVL có nhiều "trạng thái tồn" hợp lệ song song:

- tồn thực tế tại kho
- tồn theo kế toán (NXT)
- tồn theo dữ liệu hải quan (BCCT)
- tồn dùng cho hồ sơ CO — quản lý theo lô nguyên liệu gắn với từng lô hàng xuất; có thể khác tồn thực tế kho và tồn kế toán do quy tắc xuất xứ ràng buộc cách gán lô nguyên liệu vào lô hàng xuất

TradeOps quản lý đồng thời các view này trên cùng một danh mục mã, **đối chiếu chênh lệch và truy vết được nguyên nhân**, thay vì ép tất cả về một con số duy nhất. Đây là phần khác biệt của TradeOps so với một kho tài liệu hay một module ERP thông thường — vốn không được thiết kế cho thực tế làm CO.

### Cách ba hệ thống nghiệp vụ kết nối với TradeOps

Phần tích hợp dưới đây là **lợi ích cộng thêm** khi cả TradeOps và ba công cụ chuyên dụng cùng có mặt.

- Siafu đọc danh mục mã và tài liệu từ TradeOps để hỗ trợ lập tờ khai; ghi tờ khai và các chứng từ kèm theo trở lại TradeOps như một phần của lịch sử danh mục.
- Barry-CO đọc danh mục mã, BOM, tồn CO và tài liệu từ TradeOps để dựng hồ sơ CO; ghi trạng thái hồ sơ và các liên kết tài liệu trở lại.
- Barry-BCQT đọc các module chuẩn hoá (danh mục, BOM, tồn) cùng lịch sử danh mục để chuẩn bị báo cáo quyết toán; ghi kết quả đối chiếu và bộ hồ sơ quyết toán trở lại.

Tích hợp giữa TradeOps và ba hệ thống được thực hiện qua **hợp đồng API công bố** — không phải truy vấn cơ sở dữ liệu trực tiếp. Mỗi hệ thống có mã nguồn và kho dữ liệu riêng; TradeOps đứng tên giữ dữ liệu nền và lịch sử danh mục, các công cụ nghiệp vụ đọc/ghi qua API.

## 5. Lợi ích kỳ vọng và chỉ số đo lường

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

## 6. Định hướng triển khai

Đề xuất triển khai theo từng giai đoạn, bắt đầu từ phần có tác động rõ nhất.

### Giai đoạn 1 — danh mục + hồ sơ + nhật ký kiểm tra cho khách hàng thí điểm

Phạm vi:

- thiết lập không gian làm việc cho khách hàng cuối thí điểm trong TradeOps: danh sách hồ sơ, người phụ trách, trạng thái xử lý
- nhận tài liệu khách qua các kênh hiện hữu (Zalo, email, file share) vào TradeOps; quản lý phiên bản tập trung
- thiết lập danh mục SP / NVL / BTP và bảng quy đổi mã, rút từ tờ khai lịch sử, BOM nhà máy và xuất kế toán
- quản lý BOM phiên bản và hiệu lực
- nhật ký kiểm tra xuyên suốt phục vụ giải trình khi kiểm tra sau thông quan
- kết nối Barry-CO với TradeOps để minh hoạ một bộ hồ sơ CO đầu cuối chạy trên không gian làm việc đã thiết lập

Trước khi tích hợp Barry-CO, đội vận hành của đại lý đã có thể: quản lý hồ sơ khách hàng cuối thí điểm trên TradeOps; tiếp nhận tài liệu khách qua các kênh hiện hữu vào hệ thống; tra lại hồ sơ cũ và lịch sử thao tác; bàn giao công việc giữa nhân viên qua không gian làm việc chung. Tích hợp với Barry-CO bổ sung khả năng dựng và nộp hồ sơ CO đầu cuối ngay trên không gian đó.

Mục tiêu giai đoạn: với khách hàng cuối thí điểm, đại lý có **một không gian làm việc đầy đủ trong TradeOps** — danh sách khách, hồ sơ, dữ liệu nền sạch, lịch sử có nhật ký kiểm tra. Để minh hoạ tính tích hợp, một bộ hồ sơ CO thực tế chạy đầu cuối trên không gian đó qua Barry-CO.

### Giai đoạn 2 — Tồn nhiều view, tờ khai và quyết toán hải quan

Phạm vi:

- module tồn nhiều view và đối chiếu chênh lệch
- kết nối Siafu với TradeOps để khai thác danh mục và lưu tờ khai vào lịch sử danh mục
- kết nối Barry-BCQT với TradeOps để chạy báo cáo quyết toán dựa trên các module chuẩn hoá và lịch sử danh mục

Mục tiêu giai đoạn: một bộ báo cáo quyết toán năm có thể được chuẩn bị mà không cần rời khỏi không gian đã chuẩn hoá; chênh lệch giữa các view tồn được phơi bày và truy vết rõ ràng.

### Giai đoạn 3 — Tích hợp và báo cáo vận hành

Phạm vi:

- tích hợp có chọn lọc với hệ thống kế toán hoặc ERP của khách hàng cuối nếu cần
- báo cáo và dashboard vận hành xuyên các khách hàng cuối của đại lý
- mở quyền truy cập có kiểm soát cho khách hàng cuối nếu phù hợp

Mục tiêu giai đoạn: kết nối TradeOps vào hạ tầng vận hành rộng hơn của các khách hàng cuối và của bản thân đại lý.

Khung thời gian gợi ý cho từng giai đoạn sẽ được trao đổi thêm sau buổi khảo sát, dựa trên quy mô khách hàng cuối cần phục vụ trước, khối lượng tài liệu hiện có và mức độ sẵn sàng của dữ liệu đầu vào.

## 7. Phạm vi không nằm trong giai đoạn 1

Để giữ giai đoạn 1 đủ tập trung và đúng phạm vi, các phần sau không thuộc giai đoạn 1:

- kế toán tài chính, công nợ, sổ cái
- quản lý kho thực tế: nhập kho, xuất kho, kiểm kê thực địa
- lập kế hoạch sản xuất và điều độ sản xuất
- quản lý mua hàng đầu cuối: đặt hàng, hợp đồng, thanh toán nhà cung cấp
- thay thế hệ thống ERP hoặc phần mềm kế toán hiện có
- tự động truyền tờ khai lên cổng hải quan; việc khai báo do Siafu và các kênh hiện hữu thực hiện, TradeOps quản lý dữ liệu nghiệp vụ kèm theo
- cổng truy cập dành cho khách hàng cuối

Các hạng mục này có thể được xem xét ở giai đoạn 2 hoặc giai đoạn 3 tuỳ nhu cầu thực tế.

## 8. Kết quả dự kiến của giai đoạn 1

Các kết quả mong đợi sau khi giai đoạn 1 được triển khai:

- không gian làm việc cho khách hàng cuối thí điểm được dựng đầy đủ trên TradeOps: danh sách hồ sơ, người phụ trách, trạng thái xử lý, lịch sử thao tác
- mỗi khách hàng cuối thuộc phạm vi thí điểm có không gian làm việc riêng với quyền truy cập được kiểm soát theo người dùng và theo vai trò
- tài liệu trong phạm vi triển khai được đưa vào hệ thống và có lịch sử phiên bản rõ ràng
- nhật ký kiểm tra ghi nhận các thao tác trọng yếu, đủ để rà soát và giải trình khi cần (đặc biệt cho kiểm tra sau thông quan)
- danh mục SP / NVL / BTP và bảng quy đổi mã được dựng cho khách hàng cuối thí điểm và đưa vào sử dụng thực tế
- BOM có thể được tạo, chỉnh sửa, đánh dấu hiệu lực, ghi nhận lịch sử thay đổi và liên kết tới mã thành phẩm
- có thể tìm kiếm tài liệu theo khách hàng cuối, mã sản phẩm, mã vật tư, số chứng từ và số hồ sơ
- một bộ hồ sơ CO thực tế được dựng đầu cuối trên TradeOps + Barry-CO để minh hoạ tính tích hợp với công cụ nghiệp vụ chuyên dụng

Phạm vi và mức độ chi tiết của các kết quả trên sẽ được làm rõ thêm trong buổi khảo sát và biên bản phạm vi công việc.
