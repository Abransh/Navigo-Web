"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ChangePasswordDto = void 0;
// Backend/src/users/dto/change-password.dto.ts
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var ChangePasswordDto = /** @class */ (function () {
    function ChangePasswordDto() {
    }
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsNotEmpty({ message: 'Current password is required' }),
        class_validator_1.IsString({ message: 'Current password must be a string' })
    ], ChangePasswordDto.prototype, "currentPassword");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsNotEmpty({ message: 'New password is required' }),
        class_validator_1.IsString({ message: 'New password must be a string' }),
        class_validator_1.MinLength(8, { message: 'New password must be at least 8 characters long' }),
        class_validator_1.Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\W]{8,}$/, {
            message: 'New password must contain at least one uppercase letter, one lowercase letter, and one number'
        })
    ], ChangePasswordDto.prototype, "newPassword");
    return ChangePasswordDto;
}());
exports.ChangePasswordDto = ChangePasswordDto;
