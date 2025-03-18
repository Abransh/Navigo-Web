"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ResetPasswordDto = exports.PasswordResetRequestDto = void 0;
// src/auth/dto/password-reset.dto.ts
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var PasswordResetRequestDto = /** @class */ (function () {
    function PasswordResetRequestDto() {
    }
    __decorate([
        swagger_1.ApiProperty({ example: 'user@example.com' }),
        class_validator_1.IsNotEmpty({ message: 'Email is required' }),
        class_validator_1.IsEmail({}, { message: 'Email must be valid' })
    ], PasswordResetRequestDto.prototype, "email");
    return PasswordResetRequestDto;
}());
exports.PasswordResetRequestDto = PasswordResetRequestDto;
var ResetPasswordDto = /** @class */ (function () {
    function ResetPasswordDto() {
    }
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsNotEmpty({ message: 'Token is required' }),
        class_validator_1.IsString({ message: 'Token must be a string' })
    ], ResetPasswordDto.prototype, "token");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsNotEmpty({ message: 'Password is required' }),
        class_validator_1.MinLength(8, { message: 'Password must be at least 8 characters long' }),
        class_validator_1.MaxLength(100, { message: 'Password cannot exceed 100 characters' }),
        class_validator_1.Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\W]{8,}$/, {
            message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
        })
    ], ResetPasswordDto.prototype, "password");
    return ResetPasswordDto;
}());
exports.ResetPasswordDto = ResetPasswordDto;
