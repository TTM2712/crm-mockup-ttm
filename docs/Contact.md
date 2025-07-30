---

## 🧾 Screen 1: Contact List View (Danh sách liên hệ)

### 🎯 Mục đích:
Cung cấp giao diện quản lý toàn bộ danh sách contact với các tính năng lọc, tìm kiếm, tạo mới, chỉnh sửa cột hiển thị, và xuất dữ liệu.

---

### 🧱 Cấu trúc bảng (Data Table)

| Trường           | Mô tả                                           |
|------------------|--------------------------------------------------|
| Checkbox chọn    | Để thao tác hàng loạt                           |
| Name             | Họ và tên (ghép từ First Name + Last Name)     |
| First Name       | Tên chính                                       |
| Last Name        | Họ                                              |
| Email            | Địa chỉ email của contact                       |
| Phone Number     | Số điện thoại                                   |
| Contact Owner    | Người tạo / phụ trách contact                   |
| Create Date      | Ngày tạo contact                                |
| Lead Status      | Trạng thái lead (nếu dùng cho phân loại CRM)    |

> 👉 Người dùng có thể sắp xếp từng cột, chọn “Edit Columns” để cấu hình thứ tự, ẩn/hiện.

---

### 🔍 Bộ lọc & hành động nhanh

- **Search bar**: Tìm theo tên, email, số điện thoại
- **Filter dropdowns**:  
  - Contact Owner  
  - Create Date  
  - Last Activity  
  - Lead Status  
  - High Engagement (predefined segment)
- **Advanced filters**: Cho phép lọc nhiều điều kiện kết hợp (giống Hubspot)
- **Actions dropdown**: Xuất, xóa, gán tag...
- **Import**: Tải lên danh sách contact từ file .csv
- **Pagination**: Chuyển trang

---

## ➕ Nút: `Create Contact` (popup mượt trên nền list)

### 📍 Vị trí:
Góc phải phía trên danh sách (gần nút `Import`, `Actions`)

### 🪄 Hành vi UI:
- Khi click `Create Contact`, sẽ mở **popup dạng overlay** nằm ở trung tâm màn hình.
- **Dưới lớp popup**, list vẫn còn nhưng được làm mờ nhẹ hoặc đẩy xuống tạo cảm giác mượt.
- Popup có animation mượt `slide down` hoặc `fade in`.

---

## 🧾 Screen 2: Create Contact Popup

### 📋 Trường trong form:

| Trường           | Loại dữ liệu       | Bắt buộc |
|------------------|--------------------|----------|
| First Name       | Text input         | ✅       |
| Last Name        | Text input         | ❌       |
| Email            | Text input (email) | ✅       |
| Phone Number     | Text input         | ❌       |
| Job Title        | Text input         | ❌       |

### 🔘 Hành động:

- Nút `Save` → tạo contact mới, đóng popup, contact xuất hiện trong list
- Nút `Cancel` → đóng popup không lưu

> Sau khi Save thành công:
> - Hiện thông báo nhỏ: `"✅ Contact created successfully!"`
> - Tự động scroll về contact vừa tạo nếu có phân trang

---

### 💡 UX đề xuất khi mở popup:

```plaintext
✅ Background overlay bán trong suốt
✅ List contact bị làm mờ nhẹ hoặc đẩy xuống mượt
✅ Focus vào popup (auto-focus ô First Name)
✅ Có thể ESC để tắt popup nhanh
