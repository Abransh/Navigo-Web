"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UpdateReviewDto = void 0;
// src/reviews/dto/update-review.dto.ts
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var UpdateReviewDto = /** @class */ (function () {
    function UpdateReviewDto() {
    }
    __decorate([
        swagger_1.ApiProperty({
            description: 'Rating from 1 to 5',
            example: 5,
            required: false
        }),
        class_validator_1.IsOptional(),
        class_validator_1.IsInt(),
        class_validator_1.Min(1),
        class_validator_1.Max(5)
    ], UpdateReviewDto.prototype, "rating");
    __decorate([
        swagger_1.ApiProperty({
            description: 'Review comment',
            example: 'After reflecting more, I would say the experience was truly exceptional!',
            required: false
        }),
        class_validator_1.IsOptional(),
        class_validator_1.IsString(),
        class_validator_1.MaxLength(500)
    ], UpdateReviewDto.prototype, "comment");
    return UpdateReviewDto;
}());
exports.UpdateReviewDto = UpdateReviewDto;
