"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
// Backend/src/app.module.ts
var common_1 = require("@nestjs/common");
var config_1 = require("@nestjs/config");
var throttler_1 = require("@nestjs/throttler");
var app_controller_1 = require("./app.controller");
var app_service_1 = require("./app.service");
var database_module_1 = require("./database/database.module");
var users_module_1 = require("./users/users.module");
var auth_module_1 = require("./auth/auth.module");
var bookings_module_1 = require("./bookings/bookings.module");
var companions_module_1 = require("./companions/companions.module");
var chat_module_1 = require("./chat/chat.module");
var payments_module_1 = require("./payments/payments.module");
var reviews_module_1 = require("./reviews/reviews.module");
var notifications_module_1 = require("./notifications/notifications.module");
var schedule_1 = require("@nestjs/schedule");
var email_module_1 = require("./email/email.module");
var destinations_module_1 = require("./destinations/destinations.module"); // Add this
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        common_1.Module({
            imports: [
                config_1.ConfigModule.forRoot({
                    isGlobal: true
                }),
                throttler_1.ThrottlerModule.forRoot({
                    ttl: 60,
                    limit: 10
                }),
                schedule_1.ScheduleModule.forRoot(),
                database_module_1.DatabaseModule,
                users_module_1.UsersModule,
                auth_module_1.AuthModule,
                bookings_module_1.BookingsModule,
                companions_module_1.CompanionsModule,
                chat_module_1.ChatModule,
                payments_module_1.PaymentsModule,
                reviews_module_1.ReviewsModule,
                notifications_module_1.NotificationsModule,
                email_module_1.EmailModule,
                destinations_module_1.DestinationsModule,
            ],
            controllers: [app_controller_1.AppController],
            providers: [app_service_1.AppService]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
