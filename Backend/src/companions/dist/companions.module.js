"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CompanionsModule = void 0;
// src/companions/companions.module.ts
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var companions_controller_1 = require("./companions.controller");
var companions_service_1 = require("./companions.service");
var companion_entity_1 = require("./entities/companion.entity");
var users_module_1 = require("../users/users.module");
var CompanionsModule = /** @class */ (function () {
    function CompanionsModule() {
    }
    CompanionsModule = __decorate([
        common_1.Module({
            imports: [
                typeorm_1.TypeOrmModule.forFeature([companion_entity_1.Companion]),
                users_module_1.UsersModule
            ],
            controllers: [companions_controller_1.CompanionsController],
            providers: [companions_service_1.CompanionsService],
            exports: [companions_service_1.CompanionsService]
        })
    ], CompanionsModule);
    return CompanionsModule;
}());
exports.CompanionsModule = CompanionsModule;
