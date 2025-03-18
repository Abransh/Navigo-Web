"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Message = void 0;
var typeorm_1 = require("typeorm");
var user_entity_1 = require("../../users/entities/user.entity");
var Message = /** @class */ (function () {
    function Message() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid')
    ], Message.prototype, "id");
    __decorate([
        typeorm_1.ManyToOne(function () { return user_entity_1.User; })
    ], Message.prototype, "sender");
    __decorate([
        typeorm_1.ManyToOne(function () { return user_entity_1.User; })
    ], Message.prototype, "recipient");
    __decorate([
        typeorm_1.Column({ type: 'text' })
    ], Message.prototype, "content");
    __decorate([
        typeorm_1.Column({ "default": false })
    ], Message.prototype, "isRead");
    __decorate([
        typeorm_1.CreateDateColumn()
    ], Message.prototype, "sentAt");
    Message = __decorate([
        typeorm_1.Entity('messages')
    ], Message);
    return Message;
}());
exports.Message = Message;
