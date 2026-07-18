# EduHub - Nền tảng Giáo dục Thông minh

## Tính năng

### Trang chủ (index.html)
- Hero section đẹp
- **Chuyên đề** (thư mục kiến thức)
- **Video YouTube** (nhúng + phân loại theo chuyên đề)
- **Game AI** (Snake chơi được)
- **Tài liệu** (xem trước + tải bằng mã)
- Thanh toán QR
- Đăng nhập Google (Firebase) + Demo

### Admin Panel (admin.html) - FULL CRUD
| Mục | Thêm | Sửa | Xóa | Ghi chú |
|-----|------|-----|-----|--------|
| Chuyên đề | ✅ | ✅ | ✅ | Icon + mô tả |
| Video YouTube | ✅ | ✅ | ✅ | Hỗ trợ dán link đầy đủ hoặc ID, chọn chuyên đề |
| Tài liệu | ✅ | ✅ | ✅ | Tự tạo mã tải, chọn chuyên đề |
| Tài khoản | - | - | - | Xem danh sách người đăng nhập |
| Thanh toán QR | ✅ | ✅ | - | Cấu hình ngân hàng |

## Cách sử dụng

1. Upload toàn bộ thư mục lên host (Netlify / Vercel / GitHub Pages)
2. Mở `index.html`

### Đăng nhập Google thật
1. Vào https://console.firebase.google.com → Tạo project
2. Authentication → Sign-in method → Bật **Google**
3. Project Settings → General → Your apps → Web → Copy config
4. Mở `assets/script.js` → Thay đối tượng `firebaseConfig`

## Cấu trúc

```
eduhub/
├── index.html
├── admin.html
├── assets/
│   ├── style.css
│   └── script.js
└── README.md
```

## Lưu ý
- Dữ liệu lưu bằng **localStorage** (trên trình duyệt).
- Muốn database thật → tích hợp Firebase Firestore.

© 2026 EduHub
