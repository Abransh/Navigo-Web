"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ReviewsModule = void 0;
// src/reviews/reviews.module.ts
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var reviews_controller_1 = require("./reviews.controller");
var reviews_service_1 = require("./reviews.service");
var review_entity_1 = require("./entities/review.entity");
var bookings_module_1 = require("../bookings/bookings.module");
var companions_module_1 = require("../companions/companions.module");
var ReviewsModule = /** @class */ (function () {
    function ReviewsModule() {
    }
    ReviewsModule = __decorate([
        common_1.Module({
            imports: [
                typeorm_1.TypeOrmModule.forFeature([review_entity_1.Review]),
                bookings_module_1.BookingsModule,
                companions_module_1.CompanionsModule,
            ],
            controllers: [reviews_controller_1.ReviewsController],
            providers: [reviews_service_1.ReviewsService],
            exports: [reviews_service_1.ReviewsService]
        })
    ], ReviewsModule);
    return ReviewsModule;
}());
exports.ReviewsModule = ReviewsModule;
