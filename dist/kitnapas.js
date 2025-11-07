/**
 * MIT License
 * Copyright (c) 2025-present, Huỳnh Nhân Quốc
 * Open source @ github.com/kitmodule
 */
(function (global) {
    const kitmodule = global.kitmodule || (global.kitmodule = {}),
        pad2 = n => n.toString().padStart(2, "0");

    function EMV(n, e) {
        return `${n}${pad2(e.length)}${e}`
    }

    function crc16CCITT(n) {
        let e = 65535;
        for (let t = 0; t < n.length; t++) {
            e ^= n.charCodeAt(t) << 8;
            for (let n = 0; n < 8; n++) e = e & 32768 ? (e << 1 ^ 4129) : e << 1, e &= 65535
        }
        return e.toString(16).toUpperCase().padStart(4, "0")
    }

    function KitNapas(n, e) {
        if (!n || !e) throw new Error("KitNapas requires BIN and Account Number");
        this.state = {
            bin: n,
            accountNumber: e,
            amount: "",
            addInfo: "",
            countryCode: "VN",
            currency: "704",
            method: "11"
        }
    }
    KitNapas.prototype.amount = function (n) {
        return this.state.amount = n, this
    }, KitNapas.prototype.info = function (n) {
        return this.state.addInfo = n, this
    }, KitNapas.prototype.country = function (n) {
        return this.state.countryCode = n, this
    }, KitNapas.prototype.dynamic = function () {
        return this.state.method = "12", this
    }, KitNapas.prototype.payload = function () {
        const n = this.state,
            e = [EMV("00", "01"), EMV("01", n.method), EMV("38", EMV("00", "A000000727") + EMV("01", EMV("00", n.bin) + EMV("01", n.accountNumber)) + EMV("02", "QRIBFTTA")), EMV("53", n.currency), n.amount ? EMV("54", n.amount) : "", EMV("58", n.countryCode), n.addInfo ? EMV("62", EMV("08", n.addInfo)) : "", "6304"].join("");
        return e + crc16CCITT(e)
    }, kitmodule.Napas = KitNapas, kitmodule.napas = function (n, e) {
        return new KitNapas(n, e)
    }, global.KitNapas = KitNapas, "undefined" != typeof module && module.exports && (module.exports = {
        KitNapas
    })
})("undefined" != typeof window ? window : globalThis);