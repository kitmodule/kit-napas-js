# 💳 KitNapas JS by Kitmodule
**Generate NAPAS EMV-QR payloads in vanilla JavaScript — lightweight, chainable, and dependency-free.**

[![npm version](https://img.shields.io/npm/v/@kitmodule/kitnapas.svg)](https://www.npmjs.com/package/@kitmodule/kitnapas)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

---

## ✨ Features

- 🏦 Generate **NAPAS 247 (QRIBFTTA)** QR payloads.
- 🔗 Supports BIN, account number, amount, and add info.
- ⚡ Pure **vanilla JavaScript**, zero dependencies.
- 🧱 Fluent, chainable API.
- 🔒 Built-in CRC16 checksum.

---

## 🚀 Installation

### Using npm

```bash
npm install @kitmodule/kitnapas
````

### Using CDN

```html
<script src="https://unpkg.com/@kitmodule/kitnapas/dist/kitnapas.min.js"></script>
```

---

## 💡 Usage

### Browser (CDN)

```html
<script src="https://unpkg.com/@kitmodule/kitnapas/dist/kitnapas.min.js"></script>
<script>
const qr = new KitNapas("970415", "1234567890")
  .amount("50000")
  .info("Nap tien NAPAS 247")
  .payload();

console.log(qr);
</script>
```

### Node.js / ES Module

```js
import { KitNapas } from "@kitmodule/kitnapas";

const qr = new KitNapas("970415", "1234567890")
  .amount("50000")
  .info("Transfer to Huynh Nhan Quoc")
  .payload();

console.log(qr);
```

---

## 🧩 API Reference

### `kitmodule.napas(bin, accountNumber)`

Create a new NAPAS QR generator instance.

| Param           | Type     | Description                 |
| --------------- | -------- | --------------------------- |
| `bin`           | `string` | Bank BIN code (Acquirer ID) |
| `accountNumber` | `string` | Account or consumer ID      |

---

### Chainable methods

| Method           | Description                                               | Example             |
| ---------------- | --------------------------------------------------------- | ------------------- |
| `.amount(value)` | Set transaction amount                                    | `.amount("50000")`  |
| `.info(text)`    | Set additional info / purpose                             | `.info("Nap tien")` |
| `.country(code)` | Set country code (default: `"VN"`)                        | `.country("VN")`    |
| `.dynamic()`     | Switch to **dynamic QR** (`PointOfInitiationMethod = 12`) | `.dynamic()`        |
| `.payload()`     | Generate the final **EMV-QR string**                      | `.payload()`        |

---

### Exports Overview

| Export              | Type       | Description                             |
| ------------------- | ---------- | --------------------------------------- |
| `kitmodule.Napas`   | `class`    | Class constructor                       |
| `kitmodule.napas()` | `function` | Factory shortcut returning new instance |
| `KitNapas` (global) | `class`    | Global reference for browsers           |

---

## 🧪 Example Output

```js
const payload = kitmodule.napas("970415", "1234567890")
  .amount("50000")
  .info("Nap tien")
  .payload();

console.log(payload);
```

Output (example):

```
00020101021138560010A000000727011600069704150112345678900203QRIBFTTA53037045406500005802VN621008086E6170206304A13B
```

---

## 🧩 Integration with [QRCode.js](https://davidshimjs.github.io/qrcodejs)

Easily display the generated NAPAS payload as a scannable QR code using **QRCode.js**:

```html
<!-- Include both libraries -->
<script src="https://unpkg.com/@kitmodule/kitnapas/dist/kitnapas.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/davidshimjs/qrcodejs/qrcode.min.js"></script>

<div id="qrcode"></div>

<script>
  // Generate NAPAS payload
  const payload = kitmodule.napas("970415", "1234567890")
    .amount("100000")
    .info("Nap tien cho Quoc")
    .payload();

  console.log(payload);

  // Render QR code on the page
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

This will display a valid **NAPAS 247 EMV-QR** image ready for banking apps to scan.

---

## 🛠 Development

Build the library:

```bash
npm run build
```

Output files:

```
dist/
├── kitnapas.js
└── kitnapas.min.js
```

---

## 🤝 Contributing

Contributions are welcome!
Open an issue or submit a pull request at [github.com/kitmodule/kitnapas](https://github.com/kitmodule/kitnapas).

---

## ☕ Support the Author

[![Ko-fi](https://img.shields.io/badge/Ko--fi-FF5E5B?style=for-the-badge\&logo=ko-fi\&logoColor=white)](https://ko-fi.com/huynhnhanquoc)
[![Buy Me a Coffee](https://img.shields.io/badge/Buy_Me_a_Coffee-FFDD00?style=for-the-badge\&logo=buy-me-a-coffee\&logoColor=black)](https://buymeacoffee.com/huynhnhanquoc)
[![GitHub Sponsors](https://img.shields.io/badge/GitHub_Sponsors-f7f7f7?style=for-the-badge\&logo=githubsponsors\&logoColor=ff69b4\&color=f7f7f7)](https://github.com/sponsors/huynhnhanquoc)
[![Patreon](https://img.shields.io/badge/Patreon-F96854?style=for-the-badge\&logo=patreon\&logoColor=white)](https://patreon.com/huynhnhanquoc)
[![PayPal](https://img.shields.io/badge/PayPal-00457C?style=for-the-badge\&logo=paypal\&logoColor=white)](https://paypal.me/huynhnhanquoc)

---

## 🧾 License

Released under the [MIT License](LICENSE)
© 2025 [Huỳnh Nhân Quốc](https://github.com/huynhnhanquoc) · Open Source [@Kit Module](https://github.com/kitmodule)