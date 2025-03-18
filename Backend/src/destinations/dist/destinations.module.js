"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DestinationsModule = void 0;
// Backend/src/destinations/destinations.module.ts
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var destinations_controller_1 = require("./destinations.controller");
var destinations_service_1 = require("./destinations.service");
var destination_entity_1 = require("./entities/destination.entity");
var DestinationsModule = /** @class */ (function () {
    function DestinationsModule() {
    }
    DestinationsModule = __decorate([
        common_1.Module({
            imports: [typeorm_1.TypeOrmModule.forFeature([destination_entity_1.Destination])],
            controllers: [destinations_controller_1.DestinationsController],
            providers: [destinations_service_1.DestinationsService],
            exports: [destinations_service_1.DestinationsService]
        })
    ], DestinationsModule);
    return DestinationsModule;
}());
exports.DestinationsModule = DestinationsModule;
