"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AdminModule = void 0;
// src/admin/admin.module.ts
var common_1 = require("@nestjs/common");
var admin_controller_1 = require("./admin.controller");
var users_module_1 = require("../users/users.module");
var bookings_module_1 = require("../bookings/bookings.module");
var companions_module_1 = require("../companions/companions.module");
var payments_module_1 = require("../payments/payments.module"); // Add this import
var AdminModule = /** @class */ (function () {
    function AdminModule() {
    }
    AdminModule = __decorate([
        common_1.Module({
            imports: [
                users_module_1.UsersModule,
                bookings_module_1.BookingsModule,
                companions_module_1.CompanionsModule,
                payments_module_1.PaymentsModule,
            ],
            controllers: [admin_controller_1.AdminController],
            providers: []
        })
    ], AdminModule);
    return AdminModule;
}());
exports.AdminModule = AdminModule;
