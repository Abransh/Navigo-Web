"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
// src/app.module.ts
var common_1 = require("@nestjs/common");
var core_module_1 = require("./core/core.module");
var config_1 = require("@nestjs/config");
var throttler_1 = require("@nestjs/throttler");
var schedule_1 = require("@nestjs/schedule");
var serve_static_1 = require("@nestjs/serve-static");
var path_1 = require("path");
var core_1 = require("@nestjs/core");
var admin_module_1 = require("./admin/admin.module");
// Controllers & Services
var app_controller_1 = require("./app.controller");
var app_service_1 = require("./app.service");
// Core Modules
var database_module_1 = require("./database/database.module");
var users_module_1 = require("./users/users.module");
var auth_module_1 = require("./auth/auth.module");
var email_module_1 = require("./email/email.module");
// Feature Modules
var bookings_module_1 = require("./bookings/bookings.module");
var companions_module_1 = require("./companions/companions.module");
var chat_module_1 = require("./chat/chat.module");
var payments_module_1 = require("./payments/payments.module");
var reviews_module_1 = require("./reviews/reviews.module");
var notifications_module_1 = require("./notifications/notifications.module");
var destinations_module_1 = require("./destinations/destinations.module");
// Task and Schedule Modules
var tasks_module_1 = require("./tasks/tasks.module");
var schedule_module_1 = require("./schedule/schedule.module");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        common_1.Module({
            imports: [
                // Core module with globally available Reflector
                core_module_1.CoreModule,
                // Config first for initialization
                config_1.ConfigModule.forRoot({
                    isGlobal: true,
                    envFilePath: [".env." + (process.env.NODE_ENV || 'development'), '.env']
                }),
                // Scheduler module - ensure it's loaded after CoreModule
                schedule_1.ScheduleModule.forRoot(),
                admin_module_1.AdminModule,
                // Rate limiting
                throttler_1.ThrottlerModule.forRootAsync({
                    imports: [config_1.ConfigModule],
                    inject: [config_1.ConfigService],
                    useFactory: function (configService) { return ({
                        throttlers: [
                            {
                                ttl: configService.get('THROTTLE_TTL', 60),
                                limit: configService.get('THROTTLE_LIMIT', 10)
                            },
                        ]
                    }); }
                }),
                // Static file serving (for uploaded content)
                serve_static_1.ServeStaticModule.forRoot({
                    rootPath: path_1.join(__dirname, '..', 'uploads'),
                    serveRoot: '/uploads'
                }),
                // Core modules
                database_module_1.DatabaseModule,
                users_module_1.UsersModule,
                auth_module_1.AuthModule,
                email_module_1.EmailModule,
                // Feature modules
                bookings_module_1.BookingsModule,
                companions_module_1.CompanionsModule,
                chat_module_1.ChatModule,
                payments_module_1.PaymentsModule,
                reviews_module_1.ReviewsModule,
                notifications_module_1.NotificationsModule,
                destinations_module_1.DestinationsModule,
                // Tasks module
                tasks_module_1.TasksModule,
                // Our custom scheduler module
                schedule_module_1.AppSchedulerModule,
            ],
            controllers: [app_controller_1.AppController],
            providers: [
                app_service_1.AppService,
                // Apply rate limiting globally
                {
                    provide: core_1.APP_GUARD,
                    useClass: throttler_1.ThrottlerGuard
                },
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
