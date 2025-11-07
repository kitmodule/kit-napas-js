/**
 * MIT License
 * Copyright (c) 2025-present, Huỳnh Nhân Quốc
 * Open source @ github.com/kitmodule
 */

(function (global) {
    const kitmodule = global.kitmodule || (global.kitmodule = {});

    // ------------------------
    // Private helpers
    // ------------------------
    const pad2 = n => n.toString().padStart(2, "0");

    // EMV format helper: ID + Length + Value
    function EMV(id, value) {
        return `${id}${pad2(value.length)}${value}`;
    }

    // CRC16-CCITT (ISO/IEC 13239) checksum generator
    function crc16CCITT(str) {
        let crc = 0xFFFF;
        for (let i = 0; i < str.length; i++) {
            crc ^= str.charCodeAt(i) << 8;
            for (let j = 0; j < 8; j++) {
                crc = (crc & 0x8000)
                    ? ((crc << 1) ^ 0x1021)
                    : (crc << 1);
                crc &= 0xFFFF;
            }
        }
        return crc.toString(16).toUpperCase().padStart(4, "0");
    }

    // ------------------------
    // Class: KitNapas
    // ------------------------
    function KitNapas(bin, accountNumber) {
        if (!bin || !accountNumber) {
            throw new Error("KitNapas requires BIN and Account Number");
        }

        this.state = {
            bin,
            accountNumber,
            amount: "",
            addInfo: "",
            countryCode: "VN",
            currency: "704", // VND
            method: "11"     // static QR by default (12 = dynamic)
        };
    }

    // ------------------------
    // Chainable API
    // ------------------------
    KitNapas.prototype.amount = function (v) {
        this.state.amount = v;
        return this;
    };

    KitNapas.prototype.info = function (v) {
        this.state.addInfo = v;
        return this;
    };

    KitNapas.prototype.country = function (v) {
        this.state.countryCode = v;
        return this;
    };

    KitNapas.prototype.dynamic = function () {
        this.state.method = "12";
        return this;
    };

    // ------------------------
    // Generate EMV Payload
    // ------------------------
    KitNapas.prototype.payload = function () {
        const s = this.state;

        /**
         * Field-by-field breakdown (aligned with NAPAS QR standard):
         *
         * 00 - Payload Format Indicator
         *      "01" = EMV QR specification version
         *
         * 01 - Point of Initiation Method
         *      "11" = Static QR  /  "12" = Dynamic QR
         *
         * 38 - Consumer Account Information
         *      00 - Globally Unique Identifier (AID)
         *           "A000000727" = NAPAS AID
         *
         *      01 - Merchant/Beneficiary Account Information
         *           00 - Acquirer ID / Bank BIN
         *           01 - Merchant ID / Account Number
         *
         *      02 - Service Code
         *           "QRIBFTTA" = Interbank Transfer via Account
         *           ("QRIBFTTC" if transfer via Card)
         *
         * 53 - Transaction Currency
         *      "704" = Vietnamese Dong (VND)
         *
         * 54 - Transaction Amount (optional)
         *
         * 58 - Country Code
         *      "VN" = Vietnam
         *
         * 62 - Additional Data Field Template
         *      08 - Purpose of Transaction (AddInfo)
         *
         * 63 - CRC
         *      04 = CRC length (always 4 characters)
         *      CRC16 checksum (ISO/IEC 13239)
         */

        const payload = [
            EMV("00", "01"), // 00 - Payload Format Indicator
            EMV("01", s.method), // 01 - Point of Initiation Method
            EMV("38", // 38 - Consumer Account Information
                EMV("00", "A000000727") + // 00 - NAPAS AID (Globally Unique Identifier)
                EMV("01", // 01 - Merchant/Beneficiary Info
                    EMV("00", s.bin) + // 00 - Acquirer ID / Bank BIN
                    EMV("01", s.accountNumber) // 01 - Account Number / Merchant ID
                ) +
                EMV("02", "QRIBFTTA") // 02 - Service Code (QRIBFTTA = Transfer via Account)
            ),
            EMV("53", s.currency), // 53 - Transaction Currency
            s.amount ? EMV("54", s.amount) : "", // 54 - Transaction Amount (optional)
            EMV("58", s.countryCode), // 58 - Country Code
            s.addInfo ? EMV("62", EMV("08", s.addInfo)) : "", // 62 - Additional Data (08 - Purpose of Transaction)
            "6304" // 63 - CRC placeholder before checksum
        ].join("");

        // Append CRC16 checksum at the end of payload
        return payload + crc16CCITT(payload);
    };

    // ------------------------
    // Factory export
    // ------------------------
    kitmodule.Napas = KitNapas; // Export class
    kitmodule.napas = function (bin, accountNumber) { // Factory shortcut
        return new KitNapas(bin, accountNumber);
    };

    global.KitNapas = KitNapas; // Global class reference

    // Node.js / CommonJS export
    if (typeof module !== "undefined" && module.exports) {
        module.exports = { KitNapas };
    }

})(typeof window !== "undefined" ? window : globalThis);
