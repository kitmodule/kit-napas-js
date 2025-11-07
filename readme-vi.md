# 💳 KitNapas JS từ Kitmodule
**Tạo payload NAPAS EMV-QR bằng JavaScript thuần — nhẹ, chuỗi phương thức linh hoạt và không phụ thuộc thư viện.**

[English](https://github.com/kitmodule/kitnapas-js/blob/master/readme.md) | [Tiếng Việt](https://github.com/kitmodule/kitnapas-js/blob/master/readme-vi.md)

[![npm version](https://img.shields.io/npm/v/@kitmodule/kitnapas.svg)](https://www.npmjs.com/package/@kitmodule/kitnapas)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/kitmodule/kitnapas-js/blob/master/LICENSE)


## ✨ Tính năng

- 🏦 Tạo **NAPAS 247 (QRIBFTTA)** QR payload.
- 🔗 Hỗ trợ BIN, số tài khoản, số tiền và thông tin bổ sung.
- ⚡ **JavaScript thuần**, không phụ thuộc thư viện.
- 🧱 API chuỗi phương thức dễ dùng.
- 🔒 Có sẵn tính năng CRC16 kiểm tra lỗi.

## 🚀 Cài đặt

### Dùng npm

```bash
npm install @kitmodule/kitnapas
````

### Dùng CDN

```html
<script src="https://unpkg.com/@kitmodule/kitnapas/dist/kitnapas.min.js"></script>
```

## 💡 Cách sử dụng

### Trình duyệt (CDN)

```html
<script src="https://unpkg.com/@kitmodule/kitnapas/dist/kitnapas.min.js"></script>
<script>
const qr = new KitNapas("970436", "0651000837537")
  .amount("50000")                     // Số tiền
  .info("Nạp tiền NAPAS 247")         // Thông tin giao dịch
  .payload();

console.log(qr);
</script>
```

### Node.js / ES Module

```js
import { KitNapas } from "@kitmodule/kitnapas";

const qr = new KitNapas("970436", "0651000837537")
  .amount("50000")
  .info("Donate cho tac gia")
  .payload();

console.log(qr);
```

## 🧩 Tham khảo API

### `kitmodule.napas(bin, accountNumber)`

Tạo một instance generator NAPAS mới.

| Tham số         | Kiểu     | Mô tả                           |
| --------------- | -------- | ------------------------------- |
| `bin`           | `string` | Mã BIN ngân hàng (Acquirer ID)  |
| `accountNumber` | `string` | Số tài khoản hoặc ID người nhận |

### Phương thức chuỗi

| Phương thức      | Mô tả                                                | Ví dụ               |
| ---------------- | ---------------------------------------------------- | ------------------- |
| `.amount(value)` | Thiết lập số tiền giao dịch                          | `.amount("50000")`  |
| `.info(text)`    | Thiết lập thông tin bổ sung / mục đích giao dịch     | `.info("Nạp tiền")` |
| `.country(code)` | Thiết lập mã quốc gia (mặc định: `"VN"`)             | `.country("VN")`    |
| `.dynamic()`     | Chuyển sang QR động (`PointOfInitiationMethod = 12`) | `.dynamic()`        |
| `.payload()`     | Tạo chuỗi **EMV-QR** cuối cùng                       | `.payload()`        |

### Xuất khẩu (Exports)

| Xuất khẩu           | Kiểu       | Mô tả                               |
| ------------------- | ---------- | ----------------------------------- |
| `kitmodule.Napas`   | `class`    | Lớp khởi tạo                        |
| `kitmodule.napas()` | `function` | Hàm shortcut trả về instance mới    |
| `KitNapas` (global) | `class`    | Tham chiếu toàn cục cho trình duyệt |

## 🧪 Ví dụ kết quả

```js
const payload = new KitNapas("970436", "0651000837537")
  .amount("50000")
  .info("Nạp tiền")
  .payload();

console.log(payload);
```

Output (ví dụ):

```
00020101021138560010A000000727011600069704150112345678900203QRIBFTTA53037045406500005802VN621008086E6170206304A13B
```

## 🧩 Tích hợp với [QRCode.js](https://davidshimjs.github.io/qrcodejs)

Hiển thị payload NAPAS dưới dạng QR code:

```html
<div id="qrcode"></div>
<script>
const payload = new KitNapas("970436", "0651000837537")
  .amount("100000")
  .info("donate cho tac gia kitnapas")
  .payload();

new QRCode(document.getElementById("qrcode"), {
  text: payload,
  width: 200,
  height: 200,
  colorDark: "#000000",
  colorLight: "#ffffff",
  correctLevel: QRCode.CorrectLevel.M
});
</script>
```

## 🤝 Đóng góp

Chào đón mọi đóng góp!
Mở issue hoặc gửi pull request tại [github.com/kitmodule/kitnapas](https://github.com/kitmodule/kitnapas).

## ☕ Ủng hộ tác giả

[![Ko-fi](https://img.shields.io/badge/Ko--fi-FF5E5B?style=for-the-badge\&logo=ko-fi\&logoColor=white)](https://ko-fi.com/huynhnhanquoc)
[![Buy Me a Coffee](https://img.shields.io/badge/Buy_Me_a_Coffee-FFDD00?style=for-the-badge\&logo=buy-me-a-coffee\&logoColor=black)](https://buymeacoffee.com/huynhnhanquoc)
[![GitHub Sponsors](https://img.shields.io/badge/GitHub_Sponsors-f7f7f7?style=for-the-badge\&logo=githubsponsors\&logoColor=ff69b4\&color=f7f7f7)](https://github.com/sponsors/huynhnhanquoc)
[![Patreon](https://img.shields.io/badge/Patreon-F96854?style=for-the-badge\&logo=patreon\&logoColor=white)](https://patreon.com/huynhnhanquoc)
[![PayPal](https://img.shields.io/badge/PayPal-00457C?style=for-the-badge\&logo=paypal\&logoColor=white)](https://paypal.me/huynhnhanquoc)

## 🧾 Giấy phép

Phát hành theo [MIT License](https://github.com/kitmodule/kitnapas-js/blob/master/LICENSE)
© 2025 [Huỳnh Nhân Quốc](https://github.com/huynhnhanquoc) · Open Source [@Kit Module](https://github.com/kitmodule)
