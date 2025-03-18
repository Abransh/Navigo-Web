"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Companion = void 0;
var typeorm_1 = require("typeorm");
var user_entity_1 = require("../../users/entities/user.entity");
var booking_entity_1 = require("../../bookings/entities/booking.entity");
var Companion = /** @class */ (function () {
    function Companion() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid')
    ], Companion.prototype, "id");
    __decorate([
        typeorm_1.ManyToOne(function () { return user_entity_1.User; }, function (user) { return user.companionProfiles; })
    ], Companion.prototype, "user");
    __decorate([
        typeorm_1.Column()
    ], Companion.prototype, "bio");
    __decorate([
        typeorm_1.Column('simple-array')
    ], Companion.prototype, "languages");
    __decorate([
        typeorm_1.Column('simple-array')
    ], Companion.prototype, "specialties");
    __decorate([
        typeorm_1.Column({ type: 'decimal', precision: 10, scale: 2 })
    ], Companion.prototype, "hourlyRate");
    __decorate([
        typeorm_1.Column({ "default": false })
    ], Companion.prototype, "isVerified");
    __decorate([
        typeorm_1.Column({ "default": true })
    ], Companion.prototype, "isAvailable");
    __decorate([
        typeorm_1.Column({ type: 'decimal', precision: 3, scale: 2, "default": 0 })
    ], Companion.prototype, "averageRating");
    __decorate([
        typeorm_1.Column({ "default": 0 })
    ], Companion.prototype, "totalReviews");
    __decorate([
        typeorm_1.CreateDateColumn()
    ], Companion.prototype, "createdAt");
    __decorate([
        typeorm_1.UpdateDateColumn()
    ], Companion.prototype, "updatedAt");
    __decorate([
        typeorm_1.OneToMany(function () { return booking_entity_1.Booking; }, function (booking) { return booking.companion; })
    ], Companion.prototype, "bookings");
    Companion = __decorate([
        typeorm_1.Entity('companions')
    ], Companion);
    return Companion;
}());
exports.Companion = Companion;
