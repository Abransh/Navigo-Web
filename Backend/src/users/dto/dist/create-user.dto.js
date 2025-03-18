"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateUserDto = void 0;
// src/users/dto/create-user.dto.ts
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var user_role_enum_1 = require("../enums/user-role.enum");
var CreateUserDto = /** @class */ (function () {
    function CreateUserDto() {
    }
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsNotEmpty({ message: 'First name is required' }),
        class_validator_1.IsString({ message: 'First name must be a string' }),
        class_validator_1.MaxLength(50, { message: 'First name cannot exceed 50 characters' })
    ], CreateUserDto.prototype, "firstName");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsNotEmpty({ message: 'Last name is required' }),
        class_validator_1.IsString({ message: 'Last name must be a string' }),
        class_validator_1.MaxLength(50, { message: 'Last name cannot exceed 50 characters' })
    ], CreateUserDto.prototype, "lastName");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsNotEmpty({ message: 'Email is required' }),
        class_validator_1.IsEmail({}, { message: 'Email must be valid' }),
        class_validator_1.MaxLength(100, { message: 'Email cannot exceed 100 characters' })
    ], CreateUserDto.prototype, "email");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsNotEmpty({ message: 'Password is required' }),
        class_validator_1.MinLength(8, { message: 'Password must be at least 8 characters long' }),
        class_validator_1.MaxLength(100, { message: 'Password cannot exceed 100 characters' }),
        class_validator_1.Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\W]{8,}$/, {
            message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
        })
    ], CreateUserDto.prototype, "password");
    __decorate([
        swagger_1.ApiPropertyOptional({ example: '+919876543210' }),
        class_validator_1.IsOptional(),
        class_validator_1.IsPhoneNumber(undefined, { message: 'Phone number must be valid' })
    ], CreateUserDto.prototype, "phoneNumber");
    __decorate([
        swagger_1.ApiPropertyOptional({ "enum": user_role_enum_1.UserRole, "default": user_role_enum_1.UserRole.TOURIST }),
        class_validator_1.IsOptional(),
        class_validator_1.IsEnum(user_role_enum_1.UserRole, { message: 'Role must be valid' })
    ], CreateUserDto.prototype, "role");
    __decorate([
        swagger_1.ApiPropertyOptional({ example: 'India' }),
        class_validator_1.IsOptional(),
        class_validator_1.IsString(),
        class_validator_1.MaxLength(100)
    ], CreateUserDto.prototype, "nationality");
    __decorate([
        swagger_1.ApiPropertyOptional(),
        class_validator_1.IsOptional(),
        class_validator_1.IsString()
    ], CreateUserDto.prototype, "profilePicture");
    return CreateUserDto;
}());
exports.CreateUserDto = CreateUserDto;
