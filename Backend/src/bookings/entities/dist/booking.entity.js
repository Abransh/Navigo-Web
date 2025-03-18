"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Booking = void 0;
var typeorm_1 = require("typeorm");
var user_entity_1 = require("../../users/entities/user.entity");
var compantion_entity_1 = require("../../companions/entities/compantion.entity"); // Ensure this path is correct and the file exists
var booking_status_enum_1 = require("../enums/booking-status.enum");
var payment_entity_1 = require("../../payments/entities/payment.entity");
var Booking = /** @class */ (function () {
    function Booking() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid')
    ], Booking.prototype, "id");
    __decorate([
        typeorm_1.ManyToOne(function () { return user_entity_1.User; }, function (user) { return user.bookings; })
    ], Booking.prototype, "tourist");
    __decorate([
        typeorm_1.ManyToOne(function () { return compantion_entity_1.Companion; }, function (companion) { return companion.bookings; })
    ], Booking.prototype, "companion");
    __decorate([
        typeorm_1.Column({ type: 'timestamp' })
    ], Booking.prototype, "startDate");
    __decorate([
        typeorm_1.Column({ type: 'timestamp' })
    ], Booking.prototype, "endDate");
    __decorate([
        typeorm_1.Column({ nullable: true })
    ], Booking.prototype, "location");
    __decorate([
        typeorm_1.Column({ type: 'text', nullable: true })
    ], Booking.prototype, "notes");
    __decorate([
        typeorm_1.Column({
            type: 'enum',
            "enum": booking_status_enum_1.BookingStatus,
            "default": booking_status_enum_1.BookingStatus.PENDING
        })
    ], Booking.prototype, "status");
    __decorate([
        typeorm_1.Column({ type: 'decimal', precision: 10, scale: 2 })
    ], Booking.prototype, "totalAmount");
    __decorate([
        typeorm_1.CreateDateColumn()
    ], Booking.prototype, "createdAt");
    __decorate([
        typeorm_1.UpdateDateColumn()
    ], Booking.prototype, "updatedAt");
    __decorate([
        typeorm_1.OneToMany(function () { return payment_entity_1.Payment; }, function (payment) { return payment.booking; })
    ], Booking.prototype, "payments");
    __decorate([
        typeorm_1.OneToMany(function () { return Review; }, function (review) { return review.booking; })
    ], Booking.prototype, "reviews");
    Booking = __decorate([
        typeorm_1.Entity('bookings')
    ], Booking);
    return Booking;
}());
exports.Booking = Booking;
