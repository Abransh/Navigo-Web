"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Review = void 0;
var typeorm_1 = require("typeorm");
var user_entity_1 = require("../../users/entities/user.entity");
var booking_entity_1 = require("../../bookings/entities/booking.entity");
var Review = /** @class */ (function () {
    function Review() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid')
    ], Review.prototype, "id");
    __decorate([
        typeorm_1.ManyToOne(function () { return booking_entity_1.Booking; }, function (booking) { return booking.reviews; })
    ], Review.prototype, "booking");
    __decorate([
        typeorm_1.ManyToOne(function () { return user_entity_1.User; })
    ], Review.prototype, "reviewer");
    __decorate([
        typeorm_1.Column({ type: 'int' })
    ], Review.prototype, "rating");
    __decorate([
        typeorm_1.Column({ type: 'text' })
    ], Review.prototype, "comment");
    __decorate([
        typeorm_1.Column({ "default": true })
    ], Review.prototype, "isVisible");
    __decorate([
        typeorm_1.CreateDateColumn()
    ], Review.prototype, "createdAt");
    __decorate([
        typeorm_1.UpdateDateColumn()
    ], Review.prototype, "updatedAt");
    Review = __decorate([
        typeorm_1.Entity('reviews')
    ], Review);
    return Review;
}());
exports.Review = Review;
