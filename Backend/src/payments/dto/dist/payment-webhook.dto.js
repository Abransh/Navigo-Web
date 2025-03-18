"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PaymentWebhookDto = void 0;
// src/payments/dto/payment-webhook.dto.ts
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var PaymentWebhookDto = /** @class */ (function () {
    function PaymentWebhookDto() {
    }
    __decorate([
        swagger_1.ApiProperty({
            description: 'Webhook type (event name)',
            example: 'payment_intent.succeeded'
        }),
        class_validator_1.IsString(),
        class_validator_1.IsNotEmpty()
    ], PaymentWebhookDto.prototype, "type");
    __decorate([
        swagger_1.ApiProperty({
            description: 'Webhook data containing payment information',
            example: '{ "object": { "id": "pi_123456789", "status": "succeeded" } }'
        }),
        class_validator_1.IsNotEmpty()
    ], PaymentWebhookDto.prototype, "data");
    return PaymentWebhookDto;
}());
exports.PaymentWebhookDto = PaymentWebhookDto;
