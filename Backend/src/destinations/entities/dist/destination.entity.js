"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Destination = void 0;
// Backend/src/destinations/entities/destination.entity.ts
var typeorm_1 = require("typeorm");
var Destination = /** @class */ (function () {
    function Destination() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid')
    ], Destination.prototype, "id");
    __decorate([
        typeorm_1.Column()
    ], Destination.prototype, "name");
    __decorate([
        typeorm_1.Column()
    ], Destination.prototype, "slug");
    __decorate([
        typeorm_1.Column({ type: 'text' })
    ], Destination.prototype, "description");
    __decorate([
        typeorm_1.Column()
    ], Destination.prototype, "image");
    __decorate([
        typeorm_1.Column('simple-array', { nullable: true })
    ], Destination.prototype, "highlights");
    __decorate([
        typeorm_1.Column({ type: 'jsonb', nullable: true })
    ], Destination.prototype, "attractions");
    __decorate([
        typeorm_1.CreateDateColumn()
    ], Destination.prototype, "createdAt");
    __decorate([
        typeorm_1.UpdateDateColumn()
    ], Destination.prototype, "updatedAt");
    Destination = __decorate([
        typeorm_1.Entity('destinations')
    ], Destination);
    return Destination;
}());
exports.Destination = Destination;
