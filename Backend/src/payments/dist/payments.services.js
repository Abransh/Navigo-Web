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
exports.PaymentsService = void 0;
// src/payments/payments.services.ts
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var payment_entity_1 = require("./entities/payment.entity");
var payment_status_enum_1 = require("./enums/payment-status.enum");
var user_role_enum_1 = require("../users/enums/user-role.enum");
var booking_status_enum_1 = require("../bookings/enums/booking-status.enum");
var PaymentsService = /** @class */ (function () {
    function PaymentsService(paymentRepository, bookingsService, stripeService, notificationsService, connection) {
        this.paymentRepository = paymentRepository;
        this.bookingsService = bookingsService;
        this.stripeService = stripeService;
        this.notificationsService = notificationsService;
        this.connection = connection;
        this.logger = new common_1.Logger(PaymentsService_1.name);
    }
    PaymentsService_1 = PaymentsService;
    /**
     * Get total revenue from all completed payments
     */
    PaymentsService.prototype.getTotalRevenue = function () {
        return __awaiter(this, void 0, Promise, function () {
            var result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.paymentRepository
                                .createQueryBuilder('payment')
                                .select('SUM(payment.amount)', 'total')
                                .where('payment.status = :status', { status: payment_status_enum_1.PaymentStatus.COMPLETED })
                                .getRawOne()];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.total || 0];
                    case 2:
                        error_1 = _a.sent();
                        this.logger.error("Failed to get total revenue: " + error_1.message, error_1.stack);
                        return [2 /*return*/, 0]; // Return 0 instead of throwing error to prevent dashboard failures
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get paginated payments with optional filtering
     */
    PaymentsService.prototype.getPaginatedPayments = function (page, limit, filter) {
        if (page === void 0) { page = 1; }
        if (limit === void 0) { limit = 10; }
        if (filter === void 0) { filter = ''; }
        return __awaiter(this, void 0, void 0, function () {
            var skip, queryBuilder, _a, payments, total, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        skip = (page - 1) * limit;
                        queryBuilder = this.paymentRepository
                            .createQueryBuilder('payment')
                            .leftJoinAndSelect('payment.booking', 'booking')
                            .leftJoinAndSelect('booking.tourist', 'tourist')
                            .leftJoinAndSelect('booking.companion', 'companion');
                        if (filter) {
                            queryBuilder.where('payment.transactionId LIKE :filter OR tourist.firstName LIKE :filter OR tourist.lastName LIKE :filter', { filter: "%" + filter + "%" });
                        }
                        return [4 /*yield*/, queryBuilder
                                .skip(skip)
                                .take(limit)
                                .orderBy('payment.createdAt', 'DESC')
                                .getManyAndCount()];
                    case 1:
                        _a = _b.sent(), payments = _a[0], total = _a[1];
                        return [2 /*return*/, {
                                payments: payments,
                                total: total,
                                page: page,
                                limit: limit,
                                totalPages: Math.ceil(total / limit)
                            }];
                    case 2:
                        error_2 = _b.sent();
                        this.logger.error("Failed to get paginated payments: " + error_2.message, error_2.stack);
                        throw new common_1.InternalServerErrorException('Failed to retrieve payments');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Create a payment intent for a booking
     */
    PaymentsService.prototype.createPayment = function (createPaymentDto, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var queryRunner, booking, paymentIntent, payment, savedPayment, error_3;
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
                        _a.trys.push([3, 8, 10, 12]);
                        return [4 /*yield*/, this.bookingsService.findOne(createPaymentDto.bookingId)];
                    case 4:
                        booking = _a.sent();
                        // Verify the user is the tourist who made the booking
                        if (booking.tourist.id !== userId) {
                            throw new common_1.ForbiddenException('You are not authorized to make a payment for this booking');
                        }
                        // Verify booking is in a state where payment is allowed
                        if (booking.status === booking_status_enum_1.BookingStatus.CANCELLED || booking.status === booking_status_enum_1.BookingStatus.COMPLETED) {
                            throw new common_1.BadRequestException("Cannot make a payment for a " + booking.status.toLowerCase() + " booking");
                        }
                        // Verify payment amount is valid
                        if (createPaymentDto.amount <= 0 || createPaymentDto.amount > booking.totalAmount) {
                            throw new common_1.BadRequestException('Invalid payment amount');
                        }
                        return [4 /*yield*/, this.stripeService.createPaymentIntent(createPaymentDto.amount, 'usd')];
                    case 5:
                        paymentIntent = _a.sent();
                        payment = queryRunner.manager.create(payment_entity_1.Payment, {
                            booking: booking,
                            amount: createPaymentDto.amount,
                            method: createPaymentDto.method,
                            status: payment_status_enum_1.PaymentStatus.PENDING,
                            transactionId: paymentIntent.id
                        });
                        return [4 /*yield*/, queryRunner.manager.save(payment)];
                    case 6:
                        savedPayment = _a.sent();
                        // Commit the transaction
                        return [4 /*yield*/, queryRunner.commitTransaction()];
                    case 7:
                        // Commit the transaction
                        _a.sent();
                        this.logger.log("Created payment intent " + paymentIntent.id + " for booking " + booking.id);
                        // Return the client secret for the frontend to complete the payment
                        return [2 /*return*/, {
                                clientSecret: paymentIntent.client_secret,
                                paymentId: savedPayment.id
                            }];
                    case 8:
                        error_3 = _a.sent();
                        // Rollback transaction on error
                        return [4 /*yield*/, queryRunner.rollbackTransaction()];
                    case 9:
                        // Rollback transaction on error
                        _a.sent();
                        if (error_3 instanceof common_1.BadRequestException ||
                            error_3 instanceof common_1.ForbiddenException ||
                            error_3 instanceof common_1.NotFoundException) {
                            throw error_3;
                        }
                        this.logger.error("Failed to create payment: " + error_3.message, error_3.stack);
                        throw new common_1.InternalServerErrorException('Failed to process payment');
                    case 10: 
                    // Release the query runner regardless of outcome
                    return [4 /*yield*/, queryRunner.release()];
                    case 11:
                        // Release the query runner regardless of outcome
                        _a.sent();
                        return [7 /*endfinally*/];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get payments for a specific booking
     */
    PaymentsService.prototype.getPaymentsByBooking = function (bookingId, userId, role) {
        return __awaiter(this, void 0, void 0, function () {
            var booking, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.bookingsService.findOne(bookingId)];
                    case 1:
                        booking = _a.sent();
                        // Check authorization
                        if (role !== user_role_enum_1.UserRole.ADMIN &&
                            booking.tourist.id !== userId &&
                            booking.companion.user.id !== userId) {
                            throw new common_1.ForbiddenException('You are not authorized to view payments for this booking');
                        }
                        // Get payments for the booking
                        return [2 /*return*/, this.paymentRepository.find({
                                where: { booking: { id: bookingId } },
                                order: { createdAt: 'DESC' }
                            })];
                    case 2:
                        error_4 = _a.sent();
                        if (error_4 instanceof common_1.ForbiddenException || error_4 instanceof common_1.NotFoundException) {
                            throw error_4;
                        }
                        this.logger.error("Failed to get payments for booking " + bookingId + ": " + error_4.message, error_4.stack);
                        throw new common_1.InternalServerErrorException('Failed to retrieve payment information');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Handle webhook events from payment processor
     */
    PaymentsService.prototype.handleWebhook = function (webhookDto) {
        return __awaiter(this, void 0, void 0, function () {
            var type, data, paymentIntentId, payment, queryRunner, booking, notificationError_1, error_5, paymentIntentId, payment, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 23, , 24]);
                        type = webhookDto.type, data = webhookDto.data;
                        this.logger.log("Processing webhook event: " + type);
                        if (!(type === 'payment_intent.succeeded')) return [3 /*break*/, 19];
                        paymentIntentId = data.object.id;
                        return [4 /*yield*/, this.paymentRepository.findOne({
                                where: { transactionId: paymentIntentId },
                                relations: ['booking', 'booking.tourist']
                            })];
                    case 1:
                        payment = _a.sent();
                        if (!payment) return [3 /*break*/, 18];
                        queryRunner = this.connection.createQueryRunner();
                        return [4 /*yield*/, queryRunner.connect()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.startTransaction()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 13, 15, 17]);
                        // Update payment status
                        payment.status = payment_status_enum_1.PaymentStatus.COMPLETED;
                        return [4 /*yield*/, queryRunner.manager.save(payment)];
                    case 5:
                        _a.sent();
                        booking = payment.booking;
                        if (!(booking.status === booking_status_enum_1.BookingStatus.PENDING)) return [3 /*break*/, 7];
                        booking.status = booking_status_enum_1.BookingStatus.CONFIRMED;
                        return [4 /*yield*/, queryRunner.manager.save(booking)];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: 
                    // Commit transaction
                    return [4 /*yield*/, queryRunner.commitTransaction()];
                    case 8:
                        // Commit transaction
                        _a.sent();
                        _a.label = 9;
                    case 9:
                        _a.trys.push([9, 11, , 12]);
                        return [4 /*yield*/, this.notificationsService.sendPaymentReceipt(booking.tourist.id, booking.id, payment.amount)];
                    case 10:
                        _a.sent();
                        return [3 /*break*/, 12];
                    case 11:
                        notificationError_1 = _a.sent();
                        this.logger.error("Failed to send payment notification: " + notificationError_1.message);
                        return [3 /*break*/, 12];
                    case 12: return [2 /*return*/, { success: true, message: 'Payment processed successfully' }];
                    case 13:
                        error_5 = _a.sent();
                        // Rollback transaction on error
                        return [4 /*yield*/, queryRunner.rollbackTransaction()];
                    case 14:
                        // Rollback transaction on error
                        _a.sent();
                        throw error_5;
                    case 15: 
                    // Release query runner
                    return [4 /*yield*/, queryRunner.release()];
                    case 16:
                        // Release query runner
                        _a.sent();
                        return [7 /*endfinally*/];
                    case 17: return [3 /*break*/, 19];
                    case 18:
                        this.logger.warn("Payment not found for intent ID: " + paymentIntentId);
                        _a.label = 19;
                    case 19:
                        if (!(type === 'payment_intent.payment_failed')) return [3 /*break*/, 22];
                        paymentIntentId = data.object.id;
                        return [4 /*yield*/, this.paymentRepository.findOne({
                                where: { transactionId: paymentIntentId }
                            })];
                    case 20:
                        payment = _a.sent();
                        if (!payment) return [3 /*break*/, 22];
                        // Update payment status
                        payment.status = payment_status_enum_1.PaymentStatus.FAILED;
                        return [4 /*yield*/, this.paymentRepository.save(payment)];
                    case 21:
                        _a.sent();
                        return [2 /*return*/, { success: true, message: 'Payment failure recorded' }];
                    case 22: return [2 /*return*/, { success: true, message: 'Webhook received' }];
                    case 23:
                        error_6 = _a.sent();
                        this.logger.error("Error processing webhook: " + error_6.message, error_6.stack);
                        // Return success to acknowledge receipt (Stripe will retry otherwise)
                        return [2 /*return*/, { success: true, message: 'Webhook received with errors' }];
                    case 24: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Refund a payment
     */
    PaymentsService.prototype.refundPayment = function (paymentId, userId, role, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var queryRunner, payment, refund, error_7;
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
                        _a.trys.push([3, 8, 10, 12]);
                        return [4 /*yield*/, this.paymentRepository.findOne({
                                where: { id: paymentId },
                                relations: ['booking', 'booking.tourist']
                            })];
                    case 4:
                        payment = _a.sent();
                        if (!payment) {
                            throw new common_1.NotFoundException('Payment not found');
                        }
                        // Verify the user is authorized (admin or the tourist who made the payment)
                        if (payment.booking.tourist.id !== userId && role !== user_role_enum_1.UserRole.ADMIN) {
                            throw new common_1.ForbiddenException('You are not authorized to refund this payment');
                        }
                        // Verify payment is completed
                        if (payment.status !== payment_status_enum_1.PaymentStatus.COMPLETED) {
                            throw new common_1.BadRequestException('Only completed payments can be refunded');
                        }
                        return [4 /*yield*/, this.stripeService.createRefund(payment.transactionId, amount)];
                    case 5:
                        refund = _a.sent();
                        // Update payment status
                        payment.status = payment_status_enum_1.PaymentStatus.REFUNDED;
                        return [4 /*yield*/, queryRunner.manager.save(payment)];
                    case 6:
                        _a.sent();
                        // Commit transaction
                        return [4 /*yield*/, queryRunner.commitTransaction()];
                    case 7:
                        // Commit transaction
                        _a.sent();
                        this.logger.log("Refunded payment " + paymentId + " with refund ID " + refund.id);
                        // Return refund details
                        return [2 /*return*/, {
                                paymentId: payment.id,
                                refundId: refund.id,
                                amount: amount || payment.amount
                            }];
                    case 8:
                        error_7 = _a.sent();
                        // Rollback transaction on error
                        return [4 /*yield*/, queryRunner.rollbackTransaction()];
                    case 9:
                        // Rollback transaction on error
                        _a.sent();
                        if (error_7 instanceof common_1.BadRequestException ||
                            error_7 instanceof common_1.ForbiddenException ||
                            error_7 instanceof common_1.NotFoundException) {
                            throw error_7;
                        }
                        this.logger.error("Failed to process refund: " + error_7.message, error_7.stack);
                        throw new common_1.InternalServerErrorException('Failed to process refund');
                    case 10: 
                    // Release query runner
                    return [4 /*yield*/, queryRunner.release()];
                    case 11:
                        // Release query runner
                        _a.sent();
                        return [7 /*endfinally*/];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get a single payment by ID
     */
    PaymentsService.prototype.findOne = function (id, userId, role) {
        return __awaiter(this, void 0, Promise, function () {
            var payment, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.paymentRepository.findOne({
                                where: { id: id },
                                relations: ['booking', 'booking.tourist', 'booking.companion', 'booking.companion.user']
                            })];
                    case 1:
                        payment = _a.sent();
                        if (!payment) {
                            throw new common_1.NotFoundException('Payment not found');
                        }
                        // Check authorization
                        if (role !== user_role_enum_1.UserRole.ADMIN &&
                            payment.booking.tourist.id !== userId &&
                            payment.booking.companion.user.id !== userId) {
                            throw new common_1.ForbiddenException('You are not authorized to view this payment');
                        }
                        return [2 /*return*/, payment];
                    case 2:
                        error_8 = _a.sent();
                        if (error_8 instanceof common_1.ForbiddenException || error_8 instanceof common_1.NotFoundException) {
                            throw error_8;
                        }
                        this.logger.error("Failed to find payment " + id + ": " + error_8.message, error_8.stack);
                        throw new common_1.InternalServerErrorException('Failed to retrieve payment');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    var PaymentsService_1;
    PaymentsService = PaymentsService_1 = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_1.InjectRepository(payment_entity_1.Payment))
    ], PaymentsService);
    return PaymentsService;
}());
exports.PaymentsService = PaymentsService;
