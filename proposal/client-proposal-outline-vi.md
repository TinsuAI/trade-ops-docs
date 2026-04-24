# Đề cương đề xuất hệ thống

## 1. Bối cảnh

Qua quá trình làm việc thực tế với hồ sơ BOM, CO, báo cáo quyết toán hải quan và tờ khai xuất nhập khẩu, có thể thấy khó khăn hiện nay không chỉ nằm ở việc thiếu file hay thiếu biểu mẫu, mà nằm ở chỗ dữ liệu và tài liệu đang được quản lý phân tán, thiếu kiểm soát phiên bản và khó truy vết.

Thực tế hiện nay:

- tài liệu được gửi qua nhiều kênh như email, Zalo và các luồng trao đổi rời rạc
- file lưu ở nhiều nơi khác nhau, bao gồm máy cá nhân và các thư mục nội bộ
- có trường hợp trùng tên file nhưng khác nội dung hoặc khác phiên bản
- việc bàn giao tài liệu khi thay đổi nhân sự không phải lúc nào cũng đầy đủ
- BOM, tờ khai, chứng từ nhập khẩu, hồ sơ CO và báo cáo quyết toán chưa được liên kết trong một hệ thống thống nhất

## 2. Vấn đề gốc

Nếu chỉ xử lý từng bộ file rời rạc, doanh nghiệp sẽ gặp các rủi ro lặp lại:

- khó xác định bản tài liệu nào đang có hiệu lực
- khó kiểm soát lịch sử thay đổi
- khó truy vết lại logic xử lý của từng bộ hồ sơ
- khó phối hợp giữa nhiều nhân viên và nhiều khách hàng
- khó mở rộng tự động hóa cho CO, BOM và quyết toán hải quan

## 3. Hướng đề xuất

Đề xuất phù hợp không chỉ là một công cụ dựng BOM, mà là một **hệ thống quản lý dữ liệu và hồ sơ nghiệp vụ ngoại thương/hải quan** cho nhiều khách hàng.

Trong đó, module BOM và CO là phần lõi, nhưng hệ thống cần bao phủ rộng hơn để kết nối được:

- dữ liệu định mức/BOM
- hồ sơ CO
- tờ khai nhập khẩu và xuất khẩu
- chứng từ đi kèm như invoice, packing list, file tính toán
- báo cáo quyết toán hải quan
- lịch sử xử lý, rà soát và phê duyệt nội bộ

## 4. Các nhóm chức năng chính

### 4.1. Quản lý khách hàng và bộ hồ sơ

- quản lý theo từng khách hàng
- gom hồ sơ theo lô hàng, kỳ báo cáo hoặc bộ việc
- gán người phụ trách và trạng thái xử lý

### 4.2. Quản lý file và phiên bản

- lưu trữ tập trung
- theo dõi nguồn file
- quản lý phiên bản
- đánh dấu bản hiệu lực và bản hết hiệu lực

### 4.3. Quản lý BOM và định mức

- quản lý nhiều phiên bản BOM
- quản lý hiệu lực và lịch sử chỉnh sửa
- theo dõi vật tư thay thế
- liên kết BOM với mã thành phẩm và hồ sơ CO

### 4.4. Quản lý hồ sơ CO

- theo dõi checklist hồ sơ
- liên kết BOM, tồn, chứng từ nhập và dữ liệu RVC
- hỗ trợ truy vết khi cần giải trình

### 4.5. Quản lý dữ liệu tờ khai và quyết toán hải quan

- liên kết tờ khai với vật tư, BOM và hồ sơ xuất khẩu
- hỗ trợ chuẩn bị dữ liệu cho báo cáo quyết toán
- hỗ trợ đối chiếu giữa định mức, nhập, xuất và tồn

## 5. Lợi ích kỳ vọng

- giảm phụ thuộc vào Excel và thư mục cá nhân
- giảm rủi ro thất lạc hoặc dùng nhầm phiên bản tài liệu
- tăng khả năng truy vết và kiểm tra lại hồ sơ
- chuẩn hóa cách làm việc giữa các nhân viên
- tạo nền tảng để tự động hóa sâu hơn trong tương lai

## 6. Định hướng triển khai ban đầu

Nên triển khai theo từng giai đoạn, bắt đầu từ phần có tác động rõ nhất:

### Giai đoạn 1

- quản lý khách hàng và bộ hồ sơ
- quản lý file và phiên bản
- quản lý BOM/định mức
- quản lý hồ sơ CO

### Giai đoạn 2

- bổ sung lớp dữ liệu tờ khai
- bổ sung không gian làm việc cho quyết toán hải quan
- tăng cường đối chiếu và truy vết giữa các nguồn dữ liệu

### Giai đoạn 3

- tích hợp với các hệ thống khác nếu cần
- mở rộng báo cáo quản trị và dashboard vận hành

