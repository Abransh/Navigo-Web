"use strict";
// // src/app.module.ts
// import { Module } from '@nestjs/common';
// import { ConfigModule } from './config/config.module';
// import { ThrottlerModule } from '@nestjs/throttler';
// import { ConfigService } from '@nestjs/config';
// import { ScheduleModule } from '@nestjs/schedule';
// import { ServeStaticModule } from '@nestjs/serve-static';
// import { join } from 'path';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
// // Controllers & Services
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// // Core Modules
// import { DatabaseModule } from './database/database.module';
// import { UsersModule } from './users/users.module';
// import { AuthModule } from './auth/auth.module';
// import { EmailModule } from './email/email.module';
// // Feature Modules
// import { BookingsModule } from './bookings/bookings.module';
// import { CompanionsModule } from './companions/companions.module';
// import { ChatModule } from './chat/chat.module';
// import { PaymentsModule } from './payments/payments.module';
// import { ReviewsModule } from './reviews/reviews.module';
// import { NotificationsModule } from './notifications/notifications.module';
// import { DestinationsModule } from './destinations/destinations.module';
// // Tasks Module
// import { TasksModule } from './tasks/tasks.module';
// import { TypeOrmModule } from '@nestjs/typeorm';
// @Module({
//   imports: [
//     ScheduleModule.forRoot(),
//     // Config first for initialization
//     ConfigModule,
//     // Rate limiting
//     ThrottlerModule.forRootAsync({
//       imports: [ConfigModule],
//       inject: [ConfigService],
//       useFactory: (configService: ConfigService) => ({
//         throttlers: [
//           {
//             ttl: configService.get<number>('THROTTLE_TTL', 60),
//             limit: configService.get<number>('THROTTLE_LIMIT', 10),
//           },
//         ],
//       }),
//     }),
//     // Scheduled tasks
//     ScheduleModule.forRoot(),
//     // Static file serving (for uploaded content)
//     ServeStaticModule.forRoot({
//       rootPath: join(__dirname, '..', 'uploads'),
//       serveRoot: '/uploads',
//     }),
//     // Core modules
//     DatabaseModule,
//     UsersModule,
//     AuthModule,
//     EmailModule,
//     // Feature modules
//     BookingsModule,
//     CompanionsModule,
//     ChatModule,
//     PaymentsModule,
//     ReviewsModule,
//     NotificationsModule,
//     DestinationsModule,
//     // Tasks module
//     TasksModule,
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}
// src/app.module.ts - SIMPLIFIED VERSION
var common_1 = require("@nestjs/common");
var config_1 = require("@nestjs/config");
var typeorm_1 = require("@nestjs/typeorm");
var typeorm_config_1 = require("./config/typeorm.config");
// Core controllers and services
var app_controller_1 = require("./app.controller");
var app_service_1 = require("./app.service");
// Core modules - only keep essential ones
var users_module_1 = require("./users/users.module");
var auth_module_1 = require("./auth/auth.module");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        common_1.Module({
            imports: [
                config_1.ConfigModule.forRoot({
                    isGlobal: true
                }),
                typeorm_1.TypeOrmModule.forRoot(typeorm_config_1.dataSourceOptions),
                users_module_1.UsersModule,
                auth_module_1.AuthModule,
            ],
            controllers: [app_controller_1.AppController],
            providers: [app_service_1.AppService]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
