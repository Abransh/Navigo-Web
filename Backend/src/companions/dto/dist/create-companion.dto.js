"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateCompanionDto = void 0;
// src/companions/dto/create-companion.dto.ts
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var CreateCompanionDto = /** @class */ (function () {
    function CreateCompanionDto() {
    }
    __decorate([
        swagger_1.ApiProperty({
            description: 'User ID of the companion',
            example: '123e4567-e89b-12d3-a456-426614174000'
        }),
        class_validator_1.IsUUID(),
        class_validator_1.IsNotEmpty()
    ], CreateCompanionDto.prototype, "userId");
    __decorate([
        swagger_1.ApiProperty({
            description: 'Bio describing the companion',
            example: 'Experienced guide with knowledge of local history and culture.'
        }),
        class_validator_1.IsString(),
        class_validator_1.MinLength(50)
    ], CreateCompanionDto.prototype, "bio");
    __decorate([
        swagger_1.ApiProperty({
            description: 'Languages spoken by the companion',
            example: ['English', 'Hindi', 'French'],
            type: [String]
        }),
        class_validator_1.IsArray(),
        class_validator_1.IsString({ each: true })
    ], CreateCompanionDto.prototype, "languages");
    __decorate([
        swagger_1.ApiProperty({
            description: 'Specialties of the companion',
            example: ['History', 'Food', 'Architecture'],
            type: [String]
        }),
        class_validator_1.IsArray(),
        class_validator_1.IsString({ each: true })
    ], CreateCompanionDto.prototype, "specialties");
    __decorate([
        swagger_1.ApiProperty({
            description: 'Hourly rate in USD',
            example: 25.5
        }),
        class_validator_1.IsNumber(),
        class_validator_1.Min(1)
    ], CreateCompanionDto.prototype, "hourlyRate");
    return CreateCompanionDto;
}());
exports.CreateCompanionDto = CreateCompanionDto;
