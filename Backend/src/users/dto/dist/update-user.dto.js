"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UpdateUserDto = void 0;
// src/users/dto/update-user.dto.ts
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var UpdateUserDto = /** @class */ (function () {
    function UpdateUserDto() {
    }
    __decorate([
        swagger_1.ApiPropertyOptional({ example: 'John' }),
        class_validator_1.IsOptional(),
        class_validator_1.IsString(),
        class_validator_1.MaxLength(50)
    ], UpdateUserDto.prototype, "firstName");
    __decorate([
        swagger_1.ApiPropertyOptional({ example: 'Doe' }),
        class_validator_1.IsOptional(),
        class_validator_1.IsString(),
        class_validator_1.MaxLength(50)
    ], UpdateUserDto.prototype, "lastName");
    __decorate([
        swagger_1.ApiPropertyOptional({ example: 'john.doe@example.com' }),
        class_validator_1.IsOptional(),
        class_validator_1.IsEmail()
    ], UpdateUserDto.prototype, "email");
    __decorate([
        swagger_1.ApiPropertyOptional({ example: '+919876543210' }),
        class_validator_1.IsOptional(),
        class_validator_1.IsPhoneNumber()
    ], UpdateUserDto.prototype, "phoneNumber");
    __decorate([
        swagger_1.ApiPropertyOptional({ example: 'Avid traveler with a passion for photography.' }),
        class_validator_1.IsOptional(),
        class_validator_1.IsString(),
        class_validator_1.MaxLength(500)
    ], UpdateUserDto.prototype, "bio");
    __decorate([
        swagger_1.ApiPropertyOptional({ example: 'https://example.com/profile.jpg' }),
        class_validator_1.IsOptional(),
        class_validator_1.IsUrl()
    ], UpdateUserDto.prototype, "profilePicture");
    __decorate([
        swagger_1.ApiPropertyOptional({ example: 'India' }),
        class_validator_1.IsOptional(),
        class_validator_1.IsString(),
        class_validator_1.MaxLength(100)
    ], UpdateUserDto.prototype, "nationality");
    __decorate([
        swagger_1.ApiPropertyOptional(),
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], UpdateUserDto.prototype, "password");
    return UpdateUserDto;
}());
exports.UpdateUserDto = UpdateUserDto;
