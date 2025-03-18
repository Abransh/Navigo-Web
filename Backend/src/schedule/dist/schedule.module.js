"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ScheduleModule = void 0;
// src/schedule/schedule.module.ts
var common_1 = require("@nestjs/common");
var schedule_1 = require("@nestjs/schedule");
var schedule_service_1 = require("./schedule.service");
var bookings_module_1 = require("../bookings/bookings.module");
var email_module_1 = require("../email/email.module");
var notifications_module_1 = require("../notifications/notifications.module");
var ScheduleModule = /** @class */ (function () {
    function ScheduleModule() {
    }
    ScheduleModule = __decorate([
        common_1.Module({
            imports: [
                schedule_1.ScheduleModule.forRoot(),
                bookings_module_1.BookingsModule,
                email_module_1.EmailModule,
                notifications_module_1.NotificationsModule,
            ],
            providers: [schedule_service_1.ScheduleService],
            exports: [schedule_service_1.ScheduleService]
        })
    ], ScheduleModule);
    return ScheduleModule;
}());
exports.ScheduleModule = ScheduleModule;
