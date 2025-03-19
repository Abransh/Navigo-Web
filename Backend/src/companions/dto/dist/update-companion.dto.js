"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UpdateCompanionDto = void 0;
// src/companions/dto/update-companion.dto.ts
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var class_validator_2 = require("class-validator"); // Added Max import
var UpdateCompanionDto = /** @class */ (function () {
    function UpdateCompanionDto() {
    }
    __decorate([
        swagger_1.ApiProperty({
            description: 'Bio describing the companion',
            example: 'Experienced guide with knowledge of local history and culture.',
            required: false
        }),
        class_validator_1.IsOptional(),
        class_validator_1.IsString(),
        class_validator_1.MinLength(50)
    ], UpdateCompanionDto.prototype, "bio");
    __decorate([
        swagger_1.ApiProperty({
            description: 'Languages spoken by the companion',
            example: ['English', 'Hindi', 'French'],
            type: [String],
            required: false
        }),
        class_validator_1.IsOptional(),
        class_validator_1.IsArray(),
        class_validator_1.IsString({ each: true })
    ], UpdateCompanionDto.prototype, "languages");
    __decorate([
        swagger_1.ApiProperty({
            description: 'Specialties of the companion',
            example: ['History', 'Food', 'Architecture'],
            type: [String],
            required: false
        }),
        class_validator_1.IsOptional(),
        class_validator_1.IsArray(),
        class_validator_1.IsString({ each: true })
    ], UpdateCompanionDto.prototype, "specialties");
    __decorate([
        swagger_1.ApiProperty({
            description: 'Hourly rate in USD',
            example: 25.5,
            required: false
        }),
        class_validator_1.IsOptional(),
        class_validator_1.IsNumber(),
        class_validator_1.Min(1)
    ], UpdateCompanionDto.prototype, "hourlyRate");
    __decorate([
        swagger_1.ApiProperty({
            description: 'Availability status',
            example: true,
            required: false
        }),
        class_validator_1.IsOptional(),
        class_validator_1.IsBoolean()
    ], UpdateCompanionDto.prototype, "isAvailable");
    __decorate([
        swagger_1.ApiProperty({ required: false }),
        class_validator_1.IsOptional(),
        class_validator_1.IsNumber(),
        class_validator_1.Min(0),
        class_validator_2.Max(5)
    ], UpdateCompanionDto.prototype, "averageRating");
    __decorate([
        swagger_1.ApiProperty({ required: false }),
        class_validator_1.IsOptional(),
        class_validator_1.IsNumber(),
        class_validator_1.Min(0)
    ], UpdateCompanionDto.prototype, "totalReviews");
    return UpdateCompanionDto;
}());
exports.UpdateCompanionDto = UpdateCompanionDto;
