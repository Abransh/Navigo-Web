"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Payment = void 0;
var typeorm_1 = require("typeorm");
var booking_entity_1 = require("../../bookings/entities/booking.entity");
var payment_status_enum_1 = require("../enums/payment-status.enum");
var payment_method_enum_1 = require("../enums/payment-method.enum");
var Payment = /** @class */ (function () {
    function Payment() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid')
    ], Payment.prototype, "id");
    __decorate([
        typeorm_1.ManyToOne(function () { return booking_entity_1.Booking; }, function (booking) { return booking.payments; })
    ], Payment.prototype, "booking");
    __decorate([
        typeorm_1.Column({ type: 'decimal', precision: 10, scale: 2 })
    ], Payment.prototype, "amount");
    __decorate([
        typeorm_1.Column({
            type: 'enum',
            "enum": payment_status_enum_1.PaymentStatus,
            "default": payment_status_enum_1.PaymentStatus.PENDING
        })
    ], Payment.prototype, "status");
    __decorate([
        typeorm_1.Column({
            type: 'enum',
            "enum": payment_method_enum_1.PaymentMethod
        })
    ], Payment.prototype, "method");
    __decorate([
        typeorm_1.Column({ nullable: true })
    ], Payment.prototype, "transactionId");
    __decorate([
        typeorm_1.CreateDateColumn()
    ], Payment.prototype, "createdAt");
    __decorate([
        typeorm_1.UpdateDateColumn()
    ], Payment.prototype, "updatedAt");
    Payment = __decorate([
        typeorm_1.Entity('payments')
    ], Payment);
    return Payment;
}());
exports.Payment = Payment;
