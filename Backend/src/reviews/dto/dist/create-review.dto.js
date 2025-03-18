"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateReviewDto = void 0;
// src/reviews/dto/create-review.dto.ts
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var CreateReviewDto = /** @class */ (function () {
    function CreateReviewDto() {
    }
    __decorate([
        swagger_1.ApiProperty({
            description: 'ID of the booking being reviewed',
            example: '123e4567-e89b-12d3-a456-426614174000'
        }),
        class_validator_1.IsUUID(),
        class_validator_1.IsNotEmpty()
    ], CreateReviewDto.prototype, "bookingId");
    __decorate([
        swagger_1.ApiProperty({
            description: 'Rating from 1 to 5',
            example: 4
        }),
        class_validator_1.IsInt(),
        class_validator_1.Min(1),
        class_validator_1.Max(5)
    ], CreateReviewDto.prototype, "rating");
    __decorate([
        swagger_1.ApiProperty({
            description: 'Review comment',
            example: 'Excellent service! The companion was knowledgeable and friendly.'
        }),
        class_validator_1.IsString(),
        class_validator_1.IsNotEmpty(),
        class_validator_1.MaxLength(500)
    ], CreateReviewDto.prototype, "comment");
    return CreateReviewDto;
}());
exports.CreateReviewDto = CreateReviewDto;
