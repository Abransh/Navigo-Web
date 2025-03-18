"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.ReviewsService = void 0;
// src/reviews/reviews.service.ts
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var review_entity_1 = require("./entities/review.entity");
var booking_status_enum_1 = require("../bookings/enums/booking-status.enum");
var user_role_enum_1 = require("../users/enums/user-role.enum");
var ReviewsService = /** @class */ (function () {
    function ReviewsService(reviewRepository, bookingsService, companionsService) {
        this.reviewRepository = reviewRepository;
        this.bookingsService = bookingsService;
        this.companionsService = companionsService;
    }
    ReviewsService.prototype.create = function (createReviewDto, userId) {
        return __awaiter(this, void 0, Promise, function () {
            var booking, existingReview, review, savedReview;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.bookingsService.findOne(createReviewDto.bookingId)];
                    case 1:
                        booking = _a.sent();
                        // Verify the user is the tourist who made the booking
                        if (booking.tourist.id !== userId) {
                            throw new common_1.ForbiddenException('You can only review bookings you have made');
                        }
                        // Verify booking is completed
                        if (booking.status !== booking_status_enum_1.BookingStatus.COMPLETED) {
                            throw new common_1.BadRequestException('You can only review completed bookings');
                        }
                        return [4 /*yield*/, this.reviewRepository.findOne({
                                where: { booking: { id: booking.id } }
                            })];
                    case 2:
                        existingReview = _a.sent();
                        if (existingReview) {
                            throw new common_1.BadRequestException('You have already reviewed this booking');
                        }
                        review = this.reviewRepository.create({
                            booking: booking,
                            reviewer: booking.tourist,
                            rating: createReviewDto.rating,
                            comment: createReviewDto.comment
                        });
                        return [4 /*yield*/, this.reviewRepository.save(review)];
                    case 3:
                        savedReview = _a.sent();
                        // Update companion's average rating
                        return [4 /*yield*/, this.updateCompanionRating(booking.companion.id)];
                    case 4:
                        // Update companion's average rating
                        _a.sent();
                        return [2 /*return*/, savedReview];
                }
            });
        });
    };
    ReviewsService.prototype.getCompanionReviews = function (companionId, options) {
        return __awaiter(this, void 0, void 0, function () {
            var companion, limit, offset, reviews, totalCount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.companionsService.findOne(companionId)];
                    case 1:
                        companion = _a.sent();
                        if (!companion) {
                            throw new common_1.NotFoundException('Companion not found');
                        }
                        limit = (options === null || options === void 0 ? void 0 : options.limit) || 10;
                        offset = (options === null || options === void 0 ? void 0 : options.offset) || 0;
                        return [4 /*yield*/, this.reviewRepository
                                .createQueryBuilder('review')
                                .innerJoin('review.booking', 'booking')
                                .innerJoin('booking.companion', 'companion')
                                .leftJoin('review.reviewer', 'reviewer')
                                .select([
                                'review.id',
                                'review.rating',
                                'review.comment',
                                'review.createdAt',
                                'reviewer.id',
                                'reviewer.firstName',
                                'reviewer.lastName',
                                'reviewer.profilePicture',
                            ])
                                .where('companion.id = :companionId', { companionId: companionId })
                                .andWhere('review.isVisible = :isVisible', { isVisible: true })
                                .orderBy('review.createdAt', 'DESC')
                                .limit(limit)
                                .offset(offset)
                                .getMany()];
                    case 2:
                        reviews = _a.sent();
                        return [4 /*yield*/, this.reviewRepository
                                .createQueryBuilder('review')
                                .innerJoin('review.booking', 'booking')
                                .innerJoin('booking.companion', 'companion')
                                .where('companion.id = :companionId', { companionId: companionId })
                                .andWhere('review.isVisible = :isVisible', { isVisible: true })
                                .getCount()];
                    case 3:
                        totalCount = _a.sent();
                        return [2 /*return*/, {
                                reviews: reviews,
                                pagination: {
                                    total: totalCount,
                                    limit: limit,
                                    offset: offset
                                }
                            }];
                }
            });
        });
    };
    ReviewsService.prototype.getBookingReview = function (bookingId, userId, role) {
        return __awaiter(this, void 0, void 0, function () {
            var booking, review;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.bookingsService.findOne(bookingId)];
                    case 1:
                        booking = _a.sent();
                        // Check authorization
                        if (role !== user_role_enum_1.UserRole.ADMIN &&
                            booking.tourist.id !== userId &&
                            booking.companion.user.id !== userId) {
                            throw new common_1.ForbiddenException('You are not authorized to view this review');
                        }
                        return [4 /*yield*/, this.reviewRepository.findOne({
                                where: { booking: { id: bookingId } },
                                relations: ['reviewer']
                            })];
                    case 2:
                        review = _a.sent();
                        if (!review) {
                            throw new common_1.NotFoundException('No review found for this booking');
                        }
                        return [2 /*return*/, review];
                }
            });
        });
    };
    ReviewsService.prototype.update = function (id, updateReviewDto, userId) {
        return __awaiter(this, void 0, Promise, function () {
            var review, updatedReview;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.reviewRepository.findOne({
                            where: { id: id },
                            relations: ['reviewer', 'booking', 'booking.companion']
                        })];
                    case 1:
                        review = _a.sent();
                        if (!review) {
                            throw new common_1.NotFoundException('Review not found');
                        }
                        // Verify the user is the reviewer
                        if (review.reviewer.id !== userId) {
                            throw new common_1.ForbiddenException('You can only update your own reviews');
                        }
                        // Update review fields
                        if (updateReviewDto.rating !== undefined) {
                            review.rating = updateReviewDto.rating;
                        }
                        if (updateReviewDto.comment !== undefined) {
                            review.comment = updateReviewDto.comment;
                        }
                        return [4 /*yield*/, this.reviewRepository.save(review)];
                    case 2:
                        updatedReview = _a.sent();
                        // Update companion's average rating
                        return [4 /*yield*/, this.updateCompanionRating(review.booking.companion.id)];
                    case 3:
                        // Update companion's average rating
                        _a.sent();
                        return [2 /*return*/, updatedReview];
                }
            });
        });
    };
    ReviewsService.prototype.updateCompanionRating = function (companionId) {
        return __awaiter(this, void 0, Promise, function () {
            var reviews, totalRating, averageRating;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.reviewRepository
                            .createQueryBuilder('review')
                            .innerJoin('review.booking', 'booking')
                            .innerJoin('booking.companion', 'companion')
                            .where('companion.id = :companionId', { companionId: companionId })
                            .andWhere('review.isVisible = :isVisible', { isVisible: true })
                            .getMany()];
                    case 1:
                        reviews = _a.sent();
                        if (!(reviews.length > 0)) return [3 /*break*/, 3];
                        totalRating = reviews.reduce(function (sum, review) { return sum + review.rating; }, 0);
                        averageRating = totalRating / reviews.length;
                        // Update companion's rating
                        return [4 /*yield*/, this.companionsService.update(companionId, {
                                averageRating: averageRating,
                                totalReviews: reviews.length
                            })];
                    case 2:
                        // Update companion's rating
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ReviewsService = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_1.InjectRepository(review_entity_1.Review))
    ], ReviewsService);
    return ReviewsService;
}());
exports.ReviewsService = ReviewsService;
