"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PasswordReset = void 0;
// Backend/src/auth/entities/password-reset.entity.ts
var typeorm_1 = require("typeorm");
var PasswordReset = /** @class */ (function () {
    function PasswordReset() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid')
    ], PasswordReset.prototype, "id");
    __decorate([
        typeorm_1.Column()
    ], PasswordReset.prototype, "email");
    __decorate([
        typeorm_1.Column()
    ], PasswordReset.prototype, "token");
    __decorate([
        typeorm_1.Column()
    ], PasswordReset.prototype, "expires");
    __decorate([
        typeorm_1.CreateDateColumn()
    ], PasswordReset.prototype, "createdAt");
    PasswordReset = __decorate([
        typeorm_1.Entity('password_resets')
    ], PasswordReset);
    return PasswordReset;
}());
exports.PasswordReset = PasswordReset;
