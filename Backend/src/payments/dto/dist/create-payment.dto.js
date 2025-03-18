"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreatePaymentDto = void 0;
// src/payments/dto/create-payment.dto.ts
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var payment_method_enum_1 = require("../enums/payment-method.enum");
var CreatePaymentDto = /** @class */ (function () {
    function CreatePaymentDto() {
    }
    __decorate([
        swagger_1.ApiProperty({
            description: 'Booking ID to make a payment for',
            example: '123e4567-e89b-12d3-a456-426614174000'
        }),
        class_validator_1.IsUUID(),
        class_validator_1.IsNotEmpty()
    ], CreatePaymentDto.prototype, "bookingId");
    __decorate([
        swagger_1.ApiProperty({
            description: 'Payment amount',
            example: 50.0
        }),
        class_validator_1.IsNumber(),
        class_validator_1.Min(1)
    ], CreatePaymentDto.prototype, "amount");
    __decorate([
        swagger_1.ApiProperty({
            "enum": payment_method_enum_1.PaymentMethod,
            description: 'Payment method',
            example: payment_method_enum_1.PaymentMethod.CREDIT_CARD
        }),
        class_validator_1.IsEnum(payment_method_enum_1.PaymentMethod)
    ], CreatePaymentDto.prototype, "method");
    return CreatePaymentDto;
}());
exports.CreatePaymentDto = CreatePaymentDto;
