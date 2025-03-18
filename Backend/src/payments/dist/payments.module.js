"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PaymentsModule = void 0;
// src/payments/payments.module.ts
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var payments_controller_1 = require("./payments.controller");
var payments_service_1 = require("./payments.service");
var payment_entity_1 = require("./entities/payment.entity");
var bookings_module_1 = require("../bookings/bookings.module");
var stripe_service_1 = require("./services/stripe.service");
var notifications_module_1 = require("../notifications/notifications.module");
var PaymentsModule = /** @class */ (function () {
    function PaymentsModule() {
    }
    PaymentsModule = __decorate([
        common_1.Module({
            imports: [
                typeorm_1.TypeOrmModule.forFeature([payment_entity_1.Payment]),
                bookings_module_1.BookingsModule,
                notifications_module_1.NotificationsModule,
            ],
            controllers: [payments_controller_1.PaymentsController],
            providers: [payments_service_1.PaymentsService, stripe_service_1.StripeService],
            exports: [payments_service_1.PaymentsService]
        })
    ], PaymentsModule);
    return PaymentsModule;
}());
exports.PaymentsModule = PaymentsModule;
