"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BookingsModule = void 0;
// src/bookings/bookings.module.ts
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var bookings_controller_1 = require("./bookings.controller");
var bookings_service_1 = require("./bookings.service");
var booking_entity_1 = require("./entities/booking.entity");
var users_module_1 = require("../users/users.module");
var companions_module_1 = require("../companions/companions.module");
var email_module_1 = require("../email/email.module");
var notifications_module_1 = require("../notifications/notifications.module");
var BookingsModule = /** @class */ (function () {
    function BookingsModule() {
    }
    BookingsModule = __decorate([
        common_1.Module({
            imports: [
                typeorm_1.TypeOrmModule.forFeature([booking_entity_1.Booking]),
                users_module_1.UsersModule,
                companions_module_1.CompanionsModule,
                email_module_1.EmailModule,
                notifications_module_1.NotificationsModule,
            ],
            controllers: [bookings_controller_1.BookingsController],
            providers: [bookings_service_1.BookingsService],
            exports: [bookings_service_1.BookingsService]
        })
    ], BookingsModule);
    return BookingsModule;
}());
exports.BookingsModule = BookingsModule;
