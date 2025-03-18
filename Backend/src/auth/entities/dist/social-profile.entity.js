"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SocialProfile = void 0;
// Backend/src/auth/entities/social-profile.entity.ts
var typeorm_1 = require("typeorm");
var user_entity_1 = require("../../users/entities/user.entity");
var SocialProfile = /** @class */ (function () {
    function SocialProfile() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid')
    ], SocialProfile.prototype, "id");
    __decorate([
        typeorm_1.Column()
    ], SocialProfile.prototype, "provider");
    __decorate([
        typeorm_1.Column()
    ], SocialProfile.prototype, "providerId");
    __decorate([
        typeorm_1.Column({ nullable: true })
    ], SocialProfile.prototype, "accessToken");
    __decorate([
        typeorm_1.Column()
    ], SocialProfile.prototype, "userId");
    __decorate([
        typeorm_1.ManyToOne(function () { return user_entity_1.User; }, function (user) { return user.socialProfiles; })
    ], SocialProfile.prototype, "user");
    __decorate([
        typeorm_1.CreateDateColumn()
    ], SocialProfile.prototype, "createdAt");
    __decorate([
        typeorm_1.UpdateDateColumn()
    ], SocialProfile.prototype, "updatedAt");
    SocialProfile = __decorate([
        typeorm_1.Entity('social_profiles')
    ], SocialProfile);
    return SocialProfile;
}());
exports.SocialProfile = SocialProfile;
