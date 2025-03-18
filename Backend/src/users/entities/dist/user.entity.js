"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.User = void 0;
var typeorm_1 = require("typeorm");
var user_role_enum_1 = require("../enums/user-role.enum");
var companion_entity_1 = require("../../companions/entities/companion.entity");
var booking_entity_1 = require("../../bookings/entities/booking.entity");
var social_profile_entity_1 = require("../../auth/entities/social-profile.entity");
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid')
    ], User.prototype, "id");
    __decorate([
        typeorm_1.Column({ type: 'text', nullable: true })
    ], User.prototype, "bio");
    __decorate([
        typeorm_1.Column()
    ], User.prototype, "firstName");
    __decorate([
        typeorm_1.Column()
    ], User.prototype, "lastName");
    __decorate([
        typeorm_1.Column({ unique: true })
    ], User.prototype, "email");
    __decorate([
        typeorm_1.Column({ select: false })
    ], User.prototype, "password");
    __decorate([
        typeorm_1.Column({ nullable: true })
    ], User.prototype, "phoneNumber");
    __decorate([
        typeorm_1.Column({
            type: 'enum',
            "enum": user_role_enum_1.UserRole,
            "default": user_role_enum_1.UserRole.TOURIST
        })
    ], User.prototype, "role");
    __decorate([
        typeorm_1.Column({ nullable: true })
    ], User.prototype, "nationality");
    __decorate([
        typeorm_1.Column({ nullable: true })
    ], User.prototype, "profilePicture");
    __decorate([
        typeorm_1.Column({ "default": false })
    ], User.prototype, "isVerified");
    __decorate([
        typeorm_1.Column({ nullable: true })
    ], User.prototype, "verificationToken");
    __decorate([
        typeorm_1.Column({ "default": true })
    ], User.prototype, "isActive");
    __decorate([
        typeorm_1.CreateDateColumn()
    ], User.prototype, "createdAt");
    __decorate([
        typeorm_1.UpdateDateColumn()
    ], User.prototype, "updatedAt");
    __decorate([
        typeorm_1.OneToMany(function () { return booking_entity_1.Booking; }, function (booking) { return booking.tourist; })
    ], User.prototype, "bookings");
    __decorate([
        typeorm_1.OneToMany(function () { return companion_entity_1.Companion; }, function (companion) { return companion.user; })
    ], User.prototype, "companionProfiles");
    __decorate([
        typeorm_1.OneToMany(function () { return social_profile_entity_1.SocialProfile; }, function (socialProfile) { return socialProfile.user; })
    ], User.prototype, "socialProfiles");
    User = __decorate([
        typeorm_1.Entity('users')
    ], User);
    return User;
}());
exports.User = User;
