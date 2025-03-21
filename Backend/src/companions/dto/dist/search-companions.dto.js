"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SearchCompanionsDto = void 0;
// src/companions/dto/search-companions.dto.ts
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var SearchCompanionsDto = /** @class */ (function () {
    function SearchCompanionsDto() {
    }
    __decorate([
        swagger_1.ApiProperty({
            description: 'Languages spoken by the companion',
            example: ['English', 'Hindi'],
            type: [String],
            required: false
        }),
        class_validator_1.IsOptional(),
        class_validator_1.IsArray(),
        class_validator_1.IsString({ each: true })
    ], SearchCompanionsDto.prototype, "languages");
    __decorate([
        swagger_1.ApiProperty({
            description: 'Specialties of the companion',
            example: ['History', 'Food'],
            type: [String],
            required: false
        }),
        class_validator_1.IsOptional(),
        class_validator_1.IsArray(),
        class_validator_1.IsString({ each: true })
    ], SearchCompanionsDto.prototype, "specialties");
    __decorate([
        swagger_1.ApiProperty({
            description: 'Minimum rating threshold',
            example: 4.5,
            required: false
        }),
        class_validator_1.IsOptional(),
        class_validator_1.IsNumber(),
        class_validator_1.Min(0)
    ], SearchCompanionsDto.prototype, "minRating");
    __decorate([
        swagger_1.ApiProperty({
            description: 'Maximum hourly rate',
            example: 50,
            required: false
        }),
        class_validator_1.IsOptional(),
        class_validator_1.IsNumber(),
        class_validator_1.Min(0)
    ], SearchCompanionsDto.prototype, "maxHourlyRate");
    __decorate([
        swagger_1.ApiProperty({
            description: 'Location or city',
            example: 'Varanasi',
            required: false
        }),
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], SearchCompanionsDto.prototype, "location");
    return SearchCompanionsDto;
}());
exports.SearchCompanionsDto = SearchCompanionsDto;
