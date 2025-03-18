"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ResetPasswordDto = exports.PasswordResetRequestDto = exports.LoginDto = exports.RegisterDto = exports.UpdateUserDto = exports.CreateUserDto = void 0;
// Backend/src/users/dto/create-user.dto.ts
var class_validator_1 = require("class-validator");
var user_role_enum_1 = require("../enums/user-role.enum");
var swagger_1 = require("@nestjs/swagger");
var CreateUserDto = /** @class */ (function () {
    function CreateUserDto() {
    }
    __decorate([
        swagger_1.ApiProperty({ description: 'User\'s first name' }),
        class_validator_1.IsNotEmpty({ message: 'First name is required' }),
        class_validator_1.IsString({ message: 'First name must be a string' }),
        class_validator_1.MaxLength(50, { message: 'First name cannot exceed 50 characters' })
    ], create_user_dto_1.CreateUserDto.prototype, "firstName");
    __decorate([
        swagger_1.ApiProperty({ description: 'User\'s last name' }),
        class_validator_1.IsNotEmpty({ message: 'Last name is required' }),
        class_validator_1.IsString({ message: 'Last name must be a string' }),
        class_validator_1.MaxLength(50, { message: 'Last name cannot exceed 50 characters' })
    ], create_user_dto_1.CreateUserDto.prototype, "lastName");
    __decorate([
        swagger_1.ApiProperty({ description: 'User\'s email address' }),
        class_validator_1.IsNotEmpty({ message: 'Email is required' }),
        class_validator_1.IsEmail({}, { message: 'Email must be valid' }),
        class_validator_1.MaxLength(100, { message: 'Email cannot exceed 100 characters' })
    ], create_user_dto_1.CreateUserDto.prototype, "email");
    __decorate([
        swagger_1.ApiProperty({ description: 'User\'s password' }),
        class_validator_1.IsNotEmpty({ message: 'Password is required' }),
        class_validator_2.MinLength(8, { message: 'Password must be at least 8 characters long' }),
        class_validator_1.MaxLength(100, { message: 'Password cannot exceed 100 characters' }),
        class_validator_1.Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\W]{8,}$/, {
            message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
        })
    ], create_user_dto_1.CreateUserDto.prototype, "password");
    __decorate([
        swagger_1.ApiPropertyOptional({ description: 'User\'s phone number', example: '+1234567890' }),
        class_validator_1.IsOptional(),
        class_validator_1.Matches(/^\+?[0-9]{10,15}$/, { message: 'Phone number must be valid' })
    ], create_user_dto_1.CreateUserDto.prototype, "phoneNumber");
    __decorate([
        swagger_1.ApiPropertyOptional({ "enum": user_role_enum_1.UserRole, "default": user_role_enum_1.UserRole.TOURIST }),
        class_validator_1.IsOptional(),
        class_validator_1.IsEnum(user_role_enum_1.UserRole, { message: 'Role must be valid' })
    ], create_user_dto_1.CreateUserDto.prototype, "role");
    return CreateUserDto;
}());
exports.CreateUserDto = CreateUserDto;
// Backend/src/users/dto/update-user.dto.ts
var class_validator_2 = require("class-validator");
var UpdateUserDto = /** @class */ (function () {
    function UpdateUserDto() {
    }
    __decorate([
        swagger_1.ApiPropertyOptional({ description: 'User\'s first name' }),
        class_validator_1.IsOptional(),
        class_validator_1.IsString({ message: 'First name must be a string' }),
        class_validator_1.MaxLength(50, { message: 'First name cannot exceed 50 characters' })
    ], UpdateUserDto.prototype, "firstName");
    __decorate([
        swagger_1.ApiPropertyOptional({ description: 'User\'s last name' }),
        class_validator_1.IsOptional(),
        class_validator_1.IsString({ message: 'Last name must be a string' }),
        class_validator_1.MaxLength(50, { message: 'Last name cannot exceed 50 characters' })
    ], UpdateUserDto.prototype, "lastName");
    __decorate([
        swagger_1.ApiPropertyOptional({ description: 'User\'s email address' }),
        class_validator_1.IsOptional(),
        class_validator_1.IsEmail({}, { message: 'Email must be valid' }),
        class_validator_1.MaxLength(100, { message: 'Email cannot exceed 100 characters' })
    ], UpdateUserDto.prototype, "email");
    __decorate([
        swagger_1.ApiPropertyOptional({ description: 'User\'s phone number', example: '+1234567890' }),
        class_validator_1.IsOptional(),
        class_validator_1.Matches(/^\+?[0-9]{10,15}$/, { message: 'Phone number must be valid' })
    ], UpdateUserDto.prototype, "phoneNumber");
    __decorate([
        swagger_1.ApiPropertyOptional({ description: 'URL to user\'s profile picture' }),
        class_validator_1.IsOptional(),
        class_validator_2.IsUrl({}, { message: 'Profile picture URL must be valid' })
    ], UpdateUserDto.prototype, "profilePicture");
    __decorate([
        swagger_1.ApiPropertyOptional({ description: 'User\'s bio or about me text' }),
        class_validator_1.IsOptional(),
        class_validator_1.IsString({ message: 'Bio must be a string' }),
        class_validator_1.MaxLength(500, { message: 'Bio cannot exceed 500 characters' })
    ], UpdateUserDto.prototype, "bio");
    return UpdateUserDto;
}());
exports.UpdateUserDto = UpdateUserDto;
var create_user_dto_1 = require("../../users/dto/create-user.dto");
exports.CreateUserDto = create_user_dto_1.CreateUserDto;
var RegisterDto = /** @class */ (function (_super) {
    __extends(RegisterDto, _super);
    function RegisterDto() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.role = user_role_enum_1.UserRole.TOURIST;
        return _this;
    }
    __decorate([
        swagger_1.ApiPropertyOptional({ "enum": user_role_enum_1.UserRole, "default": user_role_enum_1.UserRole.TOURIST }),
        class_validator_1.IsOptional(),
        class_validator_1.IsEnum(user_role_enum_1.UserRole, { message: 'Role must be a valid user role' })
    ], RegisterDto.prototype, "role");
    return RegisterDto;
}(create_user_dto_1.CreateUserDto));
exports.RegisterDto = RegisterDto;
var LoginDto = /** @class */ (function () {
    function LoginDto() {
    }
    __decorate([
        swagger_1.ApiProperty({ example: 'user@example.com' }),
        class_validator_1.IsNotEmpty({ message: 'Email is required' }),
        class_validator_1.IsEmail({}, { message: 'Email must be valid' })
    ], LoginDto.prototype, "email");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsNotEmpty({ message: 'Password is required' }),
        class_validator_1.IsString({ message: 'Password must be a string' })
    ], LoginDto.prototype, "password");
    return LoginDto;
}());
exports.LoginDto = LoginDto;
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
        class_validator_2.MinLength(8, { message: 'Password must be at least 8 characters long' }),
        class_validator_1.MaxLength(100, { message: 'Password cannot exceed 100 characters' }),
        class_validator_1.Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\W]{8,}$/, {
            message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
        })
    ], ResetPasswordDto.prototype, "password");
    return ResetPasswordDto;
}());
exports.ResetPasswordDto = ResetPasswordDto;
