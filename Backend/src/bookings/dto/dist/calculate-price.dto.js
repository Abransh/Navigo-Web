"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CalculatePriceDto = void 0;
// src/bookings/dto/calculate-price.dto.ts
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var CalculatePriceDto = /** @class */ (function () {
    function CalculatePriceDto() {
    }
    __decorate([
        swagger_1.ApiProperty({
            description: 'ID of the companion',
            example: '123e4567-e89b-12d3-a456-426614174000'
        }),
        class_validator_1.IsUUID(),
        class_validator_1.IsNotEmpty()
    ], CalculatePriceDto.prototype, "companionId");
    __decorate([
        swagger_1.ApiProperty({
            description: 'Start date and time of the booking',
            example: '2023-12-15T09:00:00Z'
        }),
        class_validator_1.IsDateString(),
        class_validator_1.IsNotEmpty()
    ], CalculatePriceDto.prototype, "startDate");
    __decorate([
        swagger_1.ApiProperty({
            description: 'End date and time of the booking',
            example: '2023-12-15T17:00:00Z'
        }),
        class_validator_1.IsDateString(),
        class_validator_1.IsNotEmpty()
    ], CalculatePriceDto.prototype, "endDate");
    return CalculatePriceDto;
}());
exports.CalculatePriceDto = CalculatePriceDto;
