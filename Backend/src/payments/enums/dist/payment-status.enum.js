"use strict";
exports.__esModule = true;
exports.PaymentMethod = exports.PaymentStatus = void 0;
// src/payments/enums/payment-status.enum.ts
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["PENDING"] = "pending";
    PaymentStatus["COMPLETED"] = "completed";
    PaymentStatus["FAILED"] = "failed";
    PaymentStatus["REFUNDED"] = "refunded";
})(PaymentStatus = exports.PaymentStatus || (exports.PaymentStatus = {}));
// src/payments/enums/payment-method.enum.ts
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["CREDIT_CARD"] = "credit_card";
    PaymentMethod["DEBIT_CARD"] = "debit_card";
    PaymentMethod["UPI"] = "upi";
    PaymentMethod["WALLET"] = "wallet";
    PaymentMethod["BANK_TRANSFER"] = "bank_transfer";
})(PaymentMethod = exports.PaymentMethod || (exports.PaymentMethod = {}));
