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
exports.BookingsService = void 0;
// src/bookings/bookings.service.ts
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var typeorm_2 = require("typeorm");
var booking_entity_1 = require("./entities/booking.entity");
var booking_status_enum_1 = require("./enums/booking-status.enum");
var user_role_enum_1 = require("../users/enums/user-role.enum");
var BookingsService = /** @class */ (function () {
    function BookingsService(bookingsRepository, usersService, companionsService, emailService, notificationsService, connection) {
        this.bookingsRepository = bookingsRepository;
        this.usersService = usersService;
        this.companionsService = companionsService;
        this.emailService = emailService;
        this.notificationsService = notificationsService;
        this.connection = connection;
        this.logger = new common_1.Logger(BookingsService_1.name);
    }
    BookingsService_1 = BookingsService;
    /**
     * Create a new booking
     */
    BookingsService.prototype.create = function (createBookingDto, touristId) {
        return __awaiter(this, void 0, Promise, function () {
            var queryRunner, tourist, companion, companionUser, startDate, endDate, hours, totalAmount, booking, savedBooking, error_1, error_2, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        queryRunner = this.connection.createQueryRunner();
                        return [4 /*yield*/, queryRunner.connect()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.startTransaction()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 16, 18, 20]);
                        this.logger.log("Creating booking for tourist " + touristId + " with companion " + createBookingDto.companionId);
                        return [4 /*yield*/, this.usersService.findById(touristId)];
                    case 4:
                        tourist = _a.sent();
                        return [4 /*yield*/, this.companionsService.findOne(createBookingDto.companionId)];
                    case 5:
                        companion = _a.sent();
                        if (!companion) {
                            throw new common_1.NotFoundException('Companion not found');
                        }
                        if (!companion.isAvailable) {
                            throw new common_1.BadRequestException('Companion is not available for booking');
                        }
                        return [4 /*yield*/, this.usersService.findById(companion.user.id)];
                    case 6:
                        companionUser = _a.sent();
                        startDate = new Date(createBookingDto.startDate);
                        endDate = new Date(createBookingDto.endDate);
                        if (startDate >= endDate) {
                            throw new common_1.BadRequestException('End date must be after start date');
                        }
                        hours = Math.max(0.5, Math.abs(endDate.getTime() - startDate.getTime()) / 36e5);
                        totalAmount = parseFloat((hours * companion.hourlyRate).toFixed(2));
                        booking = queryRunner.manager.create(booking_entity_1.Booking, {
                            tourist: tourist,
                            companion: companion,
                            startDate: startDate,
                            endDate: endDate,
                            location: createBookingDto.location,
                            notes: createBookingDto.notes,
                            totalAmount: totalAmount,
                            status: booking_status_enum_1.BookingStatus.PENDING
                        });
                        return [4 /*yield*/, queryRunner.manager.save(booking)];
                    case 7:
                        savedBooking = _a.sent();
                        // Commit the transaction
                        return [4 /*yield*/, queryRunner.commitTransaction()];
                    case 8:
                        // Commit the transaction
                        _a.sent();
                        this.logger.log("Successfully created booking with ID " + savedBooking.id);
                        _a.label = 9;
                    case 9:
                        _a.trys.push([9, 11, , 12]);
                        return [4 /*yield*/, this.emailService.sendBookingConfirmation(tourist.email, tourist.firstName, {
                                id: savedBooking.id,
                                companion: {
                                    name: companionUser.firstName + " " + companionUser.lastName,
                                    profilePicture: companionUser.profilePicture
                                },
                                startDate: savedBooking.startDate,
                                endDate: savedBooking.endDate,
                                location: savedBooking.location,
                                totalAmount: savedBooking.totalAmount
                            })];
                    case 10:
                        _a.sent();
                        return [3 /*break*/, 12];
                    case 11:
                        error_1 = _a.sent();
                        this.logger.error("Failed to send booking confirmation email: " + error_1.message);
                        return [3 /*break*/, 12];
                    case 12:
                        _a.trys.push([12, 14, , 15]);
                        return [4 /*yield*/, this.notificationsService.sendNotification(companion.user.id, 'New Booking', "You have a new booking request from " + tourist.firstName + " " + tourist.lastName, 'NEW_BOOKING')];
                    case 13:
                        _a.sent();
                        return [3 /*break*/, 15];
                    case 14:
                        error_2 = _a.sent();
                        this.logger.error("Failed to send booking notification: " + error_2.message);
                        return [3 /*break*/, 15];
                    case 15: return [2 /*return*/, savedBooking];
                    case 16:
                        error_3 = _a.sent();
                        // Rollback transaction on error
                        return [4 /*yield*/, queryRunner.rollbackTransaction()];
                    case 17:
                        // Rollback transaction on error
                        _a.sent();
                        // Rethrow specific exceptions
                        if (error_3 instanceof common_1.BadRequestException ||
                            error_3 instanceof common_1.NotFoundException) {
                            throw error_3;
                        }
                        // Log and throw internal server error for unexpected errors
                        this.logger.error("Error creating booking: " + error_3.message, error_3.stack);
                        throw new common_1.InternalServerErrorException('Failed to create booking');
                    case 18: 
                    // Release query runner
                    return [4 /*yield*/, queryRunner.release()];
                    case 19:
                        // Release query runner
                        _a.sent();
                        return [7 /*endfinally*/];
                    case 20: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Find all bookings for a user
     */
    BookingsService.prototype.findAll = function (userId, role) {
        return __awaiter(this, void 0, Promise, function () {
            var companion, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        if (!(role === user_role_enum_1.UserRole.TOURIST)) return [3 /*break*/, 1];
                        return [2 /*return*/, this.bookingsRepository.find({
                                where: { tourist: { id: userId } },
                                relations: ['companion', 'companion.user'],
                                order: { createdAt: 'DESC' }
                            })];
                    case 1:
                        if (!(role === user_role_enum_1.UserRole.COMPANION)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.companionsService.findByUserId(userId)];
                    case 2:
                        companion = _a.sent();
                        if (!companion) {
                            return [2 /*return*/, []];
                        }
                        return [2 /*return*/, this.bookingsRepository.find({
                                where: { companion: { id: companion.id } },
                                relations: ['tourist'],
                                order: { createdAt: 'DESC' }
                            })];
                    case 3:
                        if (role === user_role_enum_1.UserRole.ADMIN) {
                            // Admins can see all bookings with pagination
                            return [2 /*return*/, this.bookingsRepository.find({
                                    relations: ['tourist', 'companion', 'companion.user'],
                                    order: { createdAt: 'DESC' },
                                    take: 100
                                })];
                        }
                        _a.label = 4;
                    case 4: throw new common_1.BadRequestException('Invalid role for booking retrieval');
                    case 5:
                        error_4 = _a.sent();
                        if (error_4 instanceof common_1.BadRequestException) {
                            throw error_4;
                        }
                        this.logger.error("Error finding bookings for user " + userId + ": " + error_4.message, error_4.stack);
                        throw new common_1.InternalServerErrorException('Failed to retrieve bookings');
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Find a booking by ID
     */
    BookingsService.prototype.findOne = function (id, userId, role) {
        return __awaiter(this, void 0, Promise, function () {
            var booking, companion, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.bookingsRepository.findOne({
                                where: { id: id },
                                relations: [
                                    'tourist',
                                    'companion',
                                    'companion.user',
                                    'payments',
                                    'reviews',
                                ]
                            })];
                    case 1:
                        booking = _a.sent();
                        if (!booking) {
                            throw new common_1.NotFoundException('Booking not found');
                        }
                        if (!(userId && role)) return [3 /*break*/, 3];
                        if (role === user_role_enum_1.UserRole.TOURIST && booking.tourist.id !== userId) {
                            throw new common_1.ForbiddenException('You do not have access to this booking');
                        }
                        if (!(role === user_role_enum_1.UserRole.COMPANION)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.companionsService.findByUserId(userId)];
                    case 2:
                        companion = _a.sent();
                        if (!companion || booking.companion.id !== companion.id) {
                            throw new common_1.ForbiddenException('You do not have access to this booking');
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/, booking];
                    case 4:
                        error_5 = _a.sent();
                        if (error_5 instanceof common_1.NotFoundException || error_5 instanceof common_1.ForbiddenException) {
                            throw error_5;
                        }
                        this.logger.error("Error finding booking " + id + ": " + error_5.message, error_5.stack);
                        throw new common_1.InternalServerErrorException('Failed to retrieve booking details');
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Update a booking
     */
    BookingsService.prototype.update = function (id, updateBookingDto, userId, role) {
        return __awaiter(this, void 0, Promise, function () {
            var queryRunner, booking, companion, startDate, endDate, hours, oldStatus, updatedBooking, error_6, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        queryRunner = this.connection.createQueryRunner();
                        return [4 /*yield*/, queryRunner.connect()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.startTransaction()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 18, 20, 22]);
                        return [4 /*yield*/, this.findOne(id)];
                    case 4:
                        booking = _a.sent();
                        if (!(userId && role)) return [3 /*break*/, 7];
                        if (role === user_role_enum_1.UserRole.TOURIST && booking.tourist.id !== userId) {
                            throw new common_1.ForbiddenException('You do not have access to this booking');
                        }
                        if (!(role === user_role_enum_1.UserRole.COMPANION)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.companionsService.findByUserId(userId)];
                    case 5:
                        companion = _a.sent();
                        if (!companion || booking.companion.id !== companion.id) {
                            throw new common_1.ForbiddenException('You do not have access to this booking');
                        }
                        _a.label = 6;
                    case 6:
                        // Additional rules for specific status updates
                        if (updateBookingDto.status) {
                            // Only companions can mark as IN_PROGRESS or COMPLETED
                            if ((updateBookingDto.status === booking_status_enum_1.BookingStatus.IN_PROGRESS ||
                                updateBookingDto.status === booking_status_enum_1.BookingStatus.COMPLETED) &&
                                role !== user_role_enum_1.UserRole.COMPANION &&
                                role !== user_role_enum_1.UserRole.ADMIN) {
                                throw new common_1.ForbiddenException('Only companions can update to this status');
                            }
                            // Only tourists can cancel a booking (or admins)
                            if (updateBookingDto.status === booking_status_enum_1.BookingStatus.CANCELLED &&
                                role !== user_role_enum_1.UserRole.TOURIST &&
                                role !== user_role_enum_1.UserRole.ADMIN) {
                                throw new common_1.ForbiddenException('Only tourists can cancel a booking');
                            }
                        }
                        _a.label = 7;
                    case 7:
                        // Don't allow updating completed or cancelled bookings
                        if (booking.status === booking_status_enum_1.BookingStatus.COMPLETED ||
                            booking.status === booking_status_enum_1.BookingStatus.CANCELLED) {
                            throw new common_1.BadRequestException("Cannot update " + booking.status.toLowerCase() + " bookings");
                        }
                        // If updating dates, validate and recalculate total amount
                        if (updateBookingDto.startDate || updateBookingDto.endDate) {
                            startDate = new Date(updateBookingDto.startDate || booking.startDate);
                            endDate = new Date(updateBookingDto.endDate || booking.endDate);
                            if (startDate >= endDate) {
                                throw new common_1.BadRequestException('End date must be after start date');
                            }
                            hours = Math.max(0.5, Math.abs(endDate.getTime() - startDate.getTime()) / 36e5);
                            booking.totalAmount = parseFloat((hours * booking.companion.hourlyRate).toFixed(2));
                            booking.startDate = startDate;
                            booking.endDate = endDate;
                        }
                        // Update fields
                        if (updateBookingDto.location !== undefined) {
                            booking.location = updateBookingDto.location;
                        }
                        if (updateBookingDto.notes !== undefined) {
                            booking.notes = updateBookingDto.notes;
                        }
                        oldStatus = null;
                        // Handle status change
                        if (updateBookingDto.status && updateBookingDto.status !== booking.status) {
                            oldStatus = booking.status;
                            booking.status = updateBookingDto.status;
                            this.logger.log("Updating booking " + id + " status from " + oldStatus + " to " + booking.status);
                        }
                        return [4 /*yield*/, queryRunner.manager.save(booking)];
                    case 8:
                        updatedBooking = _a.sent();
                        // Commit transaction
                        return [4 /*yield*/, queryRunner.commitTransaction()];
                    case 9:
                        // Commit transaction
                        _a.sent();
                        if (!(updateBookingDto.status && oldStatus && updateBookingDto.status !== oldStatus)) return [3 /*break*/, 17];
                        _a.label = 10;
                    case 10:
                        _a.trys.push([10, 16, , 17]);
                        if (!(updateBookingDto.status === booking_status_enum_1.BookingStatus.CONFIRMED)) return [3 /*break*/, 12];
                        return [4 /*yield*/, this.notificationsService.sendBookingConfirmation(booking.tourist.id, booking.id)];
                    case 11:
                        _a.sent();
                        return [3 /*break*/, 15];
                    case 12:
                        if (!(updateBookingDto.status === booking_status_enum_1.BookingStatus.CANCELLED)) return [3 /*break*/, 15];
                        return [4 /*yield*/, this.notificationsService.sendBookingCancellation(booking.tourist.id, booking.id)];
                    case 13:
                        _a.sent();
                        // Also notify companion
                        return [4 /*yield*/, this.notificationsService.sendBookingCancellation(booking.companion.user.id, booking.id)];
                    case 14:
                        // Also notify companion
                        _a.sent();
                        _a.label = 15;
                    case 15: return [3 /*break*/, 17];
                    case 16:
                        error_6 = _a.sent();
                        this.logger.error("Failed to send status update notification: " + error_6.message);
                        return [3 /*break*/, 17];
                    case 17: return [2 /*return*/, updatedBooking];
                    case 18:
                        error_7 = _a.sent();
                        // Rollback transaction on error
                        return [4 /*yield*/, queryRunner.rollbackTransaction()];
                    case 19:
                        // Rollback transaction on error
                        _a.sent();
                        if (error_7 instanceof common_1.BadRequestException ||
                            error_7 instanceof common_1.ForbiddenException ||
                            error_7 instanceof common_1.NotFoundException) {
                            throw error_7;
                        }
                        this.logger.error("Error updating booking " + id + ": " + error_7.message, error_7.stack);
                        throw new common_1.InternalServerErrorException('Failed to update booking');
                    case 20: 
                    // Release query runner
                    return [4 /*yield*/, queryRunner.release()];
                    case 21:
                        // Release query runner
                        _a.sent();
                        return [7 /*endfinally*/];
                    case 22: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Calculate price for a booking
     */
    BookingsService.prototype.calculatePrice = function (companionId, startDate, endDate) {
        return __awaiter(this, void 0, Promise, function () {
            var companion, start, end, hours, totalAmount, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.companionsService.findOne(companionId)];
                    case 1:
                        companion = _a.sent();
                        if (!companion) {
                            throw new common_1.NotFoundException('Companion not found');
                        }
                        start = new Date(startDate);
                        end = new Date(endDate);
                        if (start >= end) {
                            throw new common_1.BadRequestException('End date must be after start date');
                        }
                        hours = Math.max(0.5, Math.abs(end.getTime() - start.getTime()) / 36e5);
                        totalAmount = parseFloat((hours * companion.hourlyRate).toFixed(2));
                        return [2 /*return*/, { totalAmount: totalAmount, hours: parseFloat(hours.toFixed(1)) }];
                    case 2:
                        error_8 = _a.sent();
                        if (error_8 instanceof common_1.BadRequestException || error_8 instanceof common_1.NotFoundException) {
                            throw error_8;
                        }
                        this.logger.error("Error calculating price: " + error_8.message, error_8.stack);
                        throw new common_1.InternalServerErrorException('Failed to calculate price');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Cancel a booking
     */
    BookingsService.prototype.cancel = function (id, userId, reason) {
        return __awaiter(this, void 0, Promise, function () {
            var queryRunner, booking, cancelledBooking, companionUser, error_9, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        queryRunner = this.connection.createQueryRunner();
                        return [4 /*yield*/, queryRunner.connect()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.startTransaction()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 13, 15, 17]);
                        return [4 /*yield*/, this.findOne(id)];
                    case 4:
                        booking = _a.sent();
                        // Verify the user is the tourist who made the booking
                        if (booking.tourist.id !== userId) {
                            throw new common_1.ForbiddenException('You are not authorized to cancel this booking');
                        }
                        // Verify booking can be cancelled
                        if (booking.status === booking_status_enum_1.BookingStatus.COMPLETED ||
                            booking.status === booking_status_enum_1.BookingStatus.CANCELLED) {
                            throw new common_1.BadRequestException("Cannot cancel a " + booking.status.toLowerCase() + " booking");
                        }
                        // Add reason to notes if provided
                        if (reason) {
                            booking.notes = booking.notes
                                ? booking.notes + "\n\nCancellation reason: " + reason
                                : "Cancellation reason: " + reason;
                        }
                        // Update booking status
                        booking.status = booking_status_enum_1.BookingStatus.CANCELLED;
                        return [4 /*yield*/, queryRunner.manager.save(booking)];
                    case 5:
                        cancelledBooking = _a.sent();
                        // Commit transaction
                        return [4 /*yield*/, queryRunner.commitTransaction()];
                    case 6:
                        // Commit transaction
                        _a.sent();
                        this.logger.log("Booking " + id + " cancelled by user " + userId);
                        _a.label = 7;
                    case 7:
                        _a.trys.push([7, 11, , 12]);
                        return [4 /*yield*/, this.notificationsService.sendBookingCancellation(booking.companion.user.id, booking.id)];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, this.usersService.findById(booking.companion.user.id)];
                    case 9:
                        companionUser = _a.sent();
                        return [4 /*yield*/, this.emailService.sendBookingCancellation(companionUser.email, companionUser.firstName, {
                                id: booking.id,
                                startDate: booking.startDate,
                                endDate: booking.endDate,
                                location: booking.location,
                                reason: reason || 'No reason provided'
                            })];
                    case 10:
                        _a.sent();
                        return [3 /*break*/, 12];
                    case 11:
                        error_9 = _a.sent();
                        this.logger.error("Failed to send cancellation notification: " + error_9.message);
                        return [3 /*break*/, 12];
                    case 12: return [2 /*return*/, cancelledBooking];
                    case 13:
                        error_10 = _a.sent();
                        // Rollback transaction on error
                        return [4 /*yield*/, queryRunner.rollbackTransaction()];
                    case 14:
                        // Rollback transaction on error
                        _a.sent();
                        if (error_10 instanceof common_1.BadRequestException ||
                            error_10 instanceof common_1.ForbiddenException ||
                            error_10 instanceof common_1.NotFoundException) {
                            throw error_10;
                        }
                        this.logger.error("Error cancelling booking " + id + ": " + error_10.message, error_10.stack);
                        throw new common_1.InternalServerErrorException('Failed to cancel booking');
                    case 15: 
                    // Release query runner
                    return [4 /*yield*/, queryRunner.release()];
                    case 16:
                        // Release query runner
                        _a.sent();
                        return [7 /*endfinally*/];
                    case 17: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get total count of bookings
     */
    BookingsService.prototype.getTotalBookingCount = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                try {
                    return [2 /*return*/, this.bookingsRepository.count()];
                }
                catch (error) {
                    this.logger.error("Error getting total booking count: " + error.message, error.stack);
                    return [2 /*return*/, 0]; // Return 0 instead of throwing to prevent dashboard failures
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Get upcoming bookings for a user in the next N hours
     */
    BookingsService.prototype.findUpcomingBookings = function (hoursAhead) {
        if (hoursAhead === void 0) { hoursAhead = 24; }
        return __awaiter(this, void 0, Promise, function () {
            var now, future;
            return __generator(this, function (_a) {
                now = new Date();
                future = new Date(now.getTime() + hoursAhead * 60 * 60 * 1000);
                try {
                    return [2 /*return*/, this.bookingsRepository.find({
                            where: {
                                startDate: typeorm_2.Between(now, future),
                                status: typeorm_2.In([booking_status_enum_1.BookingStatus.CONFIRMED, booking_status_enum_1.BookingStatus.PENDING])
                            },
                            relations: ['tourist', 'companion', 'companion.user'],
                            order: { startDate: 'ASC' }
                        })];
                }
                catch (error) {
                    this.logger.error("Error finding upcoming bookings: " + error.message, error.stack);
                    throw new common_1.InternalServerErrorException('Failed to retrieve upcoming bookings');
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Update expired booking statuses
     */
    BookingsService.prototype.updateExpiredBookingStatuses = function () {
        return __awaiter(this, void 0, Promise, function () {
            var queryRunner, now, expiredBookings, _i, expiredBookings_1, booking, error_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        queryRunner = this.connection.createQueryRunner();
                        return [4 /*yield*/, queryRunner.connect()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.startTransaction()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 10, 12, 14]);
                        now = new Date();
                        return [4 /*yield*/, this.bookingsRepository.find({
                                where: {
                                    endDate: typeorm_2.LessThan(now),
                                    status: booking_status_enum_1.BookingStatus.CONFIRMED
                                }
                            })];
                    case 4:
                        expiredBookings = _a.sent();
                        _i = 0, expiredBookings_1 = expiredBookings;
                        _a.label = 5;
                    case 5:
                        if (!(_i < expiredBookings_1.length)) return [3 /*break*/, 8];
                        booking = expiredBookings_1[_i];
                        booking.status = booking_status_enum_1.BookingStatus.COMPLETED;
                        return [4 /*yield*/, queryRunner.manager.save(booking)];
                    case 6:
                        _a.sent();
                        this.logger.log("Auto-completed booking " + booking.id + " as end date has passed");
                        _a.label = 7;
                    case 7:
                        _i++;
                        return [3 /*break*/, 5];
                    case 8: return [4 /*yield*/, queryRunner.commitTransaction()];
                    case 9:
                        _a.sent();
                        return [3 /*break*/, 14];
                    case 10:
                        error_11 = _a.sent();
                        return [4 /*yield*/, queryRunner.rollbackTransaction()];
                    case 11:
                        _a.sent();
                        this.logger.error("Error updating expired bookings: " + error_11.message, error_11.stack);
                        return [3 /*break*/, 14];
                    case 12: return [4 /*yield*/, queryRunner.release()];
                    case 13:
                        _a.sent();
                        return [7 /*endfinally*/];
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get paginated bookings with optional filtering
     */
    BookingsService.prototype.getPaginatedBookings = function (page, limit, filter) {
        if (page === void 0) { page = 1; }
        if (limit === void 0) { limit = 10; }
        if (filter === void 0) { filter = ''; }
        return __awaiter(this, void 0, void 0, function () {
            var skip, queryBuilder, _a, bookings, total, error_12;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        skip = (page - 1) * limit;
                        queryBuilder = this.bookingsRepository
                            .createQueryBuilder('booking')
                            .leftJoinAndSelect('booking.tourist', 'tourist')
                            .leftJoinAndSelect('booking.companion', 'companion')
                            .leftJoinAndSelect('companion.user', 'companionUser');
                        if (filter) {
                            queryBuilder.where('booking.id LIKE :filter OR tourist.firstName LIKE :filter OR tourist.lastName LIKE :filter OR companionUser.firstName LIKE :filter OR companionUser.lastName LIKE :filter', { filter: "%" + filter + "%" });
                        }
                        return [4 /*yield*/, queryBuilder
                                .skip(skip)
                                .take(limit)
                                .orderBy('booking.createdAt', 'DESC')
                                .getManyAndCount()];
                    case 1:
                        _a = _b.sent(), bookings = _a[0], total = _a[1];
                        return [2 /*return*/, {
                                bookings: bookings,
                                total: total,
                                page: page,
                                limit: limit,
                                totalPages: Math.ceil(total / limit)
                            }];
                    case 2:
                        error_12 = _b.sent();
                        this.logger.error("Error getting paginated bookings: " + error_12.message, error_12.stack);
                        throw new common_1.InternalServerErrorException('Failed to retrieve bookings');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    var BookingsService_1;
    BookingsService = BookingsService_1 = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_1.InjectRepository(booking_entity_1.Booking))
    ], BookingsService);
    return BookingsService;
}());
exports.BookingsService = BookingsService;
