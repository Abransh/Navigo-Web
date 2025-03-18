"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var LoginDto = /** @class */ (function () {
    function LoginDto() {
    }
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsEmail()
    ], LoginDto.prototype, "email");
    __decorate([
        swagger_1.ApiProperty(),
        class_validator_1.IsNotEmpty(),
        class_validator_1.MinLength(6)
    ], LoginDto.prototype, "password");
    return LoginDto;
}());
exports.LoginDto = LoginDto;
