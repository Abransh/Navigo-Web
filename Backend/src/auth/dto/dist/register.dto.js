"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RegisterDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var user_role_enum_1 = require("../../users/enums/user-role.enum");
var RegisterDto = /** @class */ (function () {
    function RegisterDto() {
    }
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsNotEmpty()
    ], RegisterDto.prototype, "firstName");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsNotEmpty()
    ], RegisterDto.prototype, "lastName");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsEmail()
    ], RegisterDto.prototype, "email");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.MinLength(6)
    ], RegisterDto.prototype, "password");
    __decorate([
        swagger_1.ApiProperty({ "enum": user_role_enum_1.UserRole, "default": user_role_enum_1.UserRole.TOURIST }),
        class_validator_1.IsEnum(user_role_enum_1.UserRole),
        class_validator_1.IsOptional()
    ], RegisterDto.prototype, "role");
    __decorate([
        swagger_1.ApiProperty({ required: false }),
        class_validator_1.IsOptional()
    ], RegisterDto.prototype, "phoneNumber");
    __decorate([
        swagger_1.ApiProperty({ required: false }),
        class_validator_1.IsOptional()
    ], RegisterDto.prototype, "nationality");
    return RegisterDto;
}());
exports.RegisterDto = RegisterDto;
