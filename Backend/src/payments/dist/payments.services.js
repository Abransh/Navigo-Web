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
// src/payments/payments.service.ts
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var payment_entity_1 = require("./entities/payment.entity");
var payment_status_enum_1 = require("./enums/payment-status.enum");
var user_role_enum_1 = require("../users/enums/user-role.enum");
var booking_status_enum_1 = require("../bookings/enums/booking-status.enum");
var PaymentsService = /** @class */ (function () {
    function PaymentsService(paymentRepository, bookingsService, stripeService, notificationsService) {
        this.paymentRepository = paymentRepository;
        this.bookingsService = bookingsService;
        this.stripeService = stripeService;
        this.notificationsService = notificationsService;
    }
    PaymentsService.prototype.createPayment = function (createPaymentDto, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var booking, paymentIntent, payment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.bookingsService.findOne(createPaymentDto.bookingId)];
                    case 1:
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
                    case 2:
                        paymentIntent = _a.sent();
                        payment = this.paymentRepository.create({
                            booking: booking,
                            amount: createPaymentDto.amount,
                            method: createPaymentDto.method,
                            status: payment_status_enum_1.PaymentStatus.PENDING,
                            transactionId: paymentIntent.id
                        });
                        return [4 /*yield*/, this.paymentRepository.save(payment)];
                    case 3:
                        _a.sent();
                        // Return the client secret for the frontend to complete the payment
                        return [2 /*return*/, {
                                clientSecret: paymentIntent.client_secret,
                                paymentId: payment.id
                            }];
                }
            });
        });
    };
    PaymentsService.prototype.getPaymentsByBooking = function (bookingId, userId, role) {
        return __awaiter(this, void 0, void 0, function () {
            var booking;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.bookingsService.findOne(bookingId)];
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
                }
            });
        });
    };
    PaymentsService.prototype.handleWebhook = function (webhookDto) {
        return __awaiter(this, void 0, void 0, function () {
            var type, data, paymentIntentId, payment, booking, paymentIntentId, payment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        type = webhookDto.type, data = webhookDto.data;
                        if (!(type === 'payment_intent.succeeded')) return [3 /*break*/, 6];
                        paymentIntentId = data.object.id;
                        return [4 /*yield*/, this.paymentRepository.findOne({
                                where: { transactionId: paymentIntentId },
                                relations: ['booking', 'booking.tourist']
                            })];
                    case 1:
                        payment = _a.sent();
                        if (!payment) return [3 /*break*/, 6];
                        // Update payment status
                        payment.status = payment_status_enum_1.PaymentStatus.COMPLETED;
                        return [4 /*yield*/, this.paymentRepository.save(payment)];
                    case 2:
                        _a.sent();
                        booking = payment.booking;
                        if (!(booking.status === booking_status_enum_1.BookingStatus.PENDING)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.bookingsService.update(booking.id, { status: booking_status_enum_1.BookingStatus.CONFIRMED })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: 
                    // Send notification to tourist
                    return [4 /*yield*/, this.notificationsService.sendPaymentReceipt(booking.tourist.id, booking.id, payment.amount)];
                    case 5:
                        // Send notification to tourist
                        _a.sent();
                        return [2 /*return*/, { success: true, message: 'Payment processed successfully' }];
                    case 6:
                        if (!(type === 'payment_intent.payment_failed')) return [3 /*break*/, 9];
                        paymentIntentId = data.object.id;
                        return [4 /*yield*/, this.paymentRepository.findOne({
                                where: { transactionId: paymentIntentId }
                            })];
                    case 7:
                        payment = _a.sent();
                        if (!payment) return [3 /*break*/, 9];
                        // Update payment status
                        payment.status = payment_status_enum_1.PaymentStatus.FAILED;
                        return [4 /*yield*/, this.paymentRepository.save(payment)];
                    case 8:
                        _a.sent();
                        return [2 /*return*/, { success: true, message: 'Payment failure recorded' }];
                    case 9: return [2 /*return*/, { success: true, message: 'Webhook received' }];
                }
            });
        });
    };
    PaymentsService.prototype.refundPayment = function (paymentId, userId, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var payment, refund;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.paymentRepository.findOne({
                            where: { id: paymentId },
                            relations: ['booking', 'booking.tourist']
                        })];
                    case 1:
                        payment = _a.sent();
                        if (!payment) {
                            throw new common_1.NotFoundException('Payment not found');
                        }
                        // Verify the user is authorized (admin or the tourist who made the payment)
                        if (payment.booking.tourist.id !== userId /* && role !== UserRole.ADMIN */) {
                            throw new common_1.ForbiddenException('You are not authorized to refund this payment');
                        }
                        // Verify payment is completed
                        if (payment.status !== payment_status_enum_1.PaymentStatus.COMPLETED) {
                            throw new common_1.BadRequestException('Only completed payments can be refunded');
                        }
                        return [4 /*yield*/, this.stripeService.createRefund(payment.transactionId, amount)];
                    case 2:
                        refund = _a.sent();
                        // Update payment status
                        payment.status = payment_status_enum_1.PaymentStatus.REFUNDED;
                        return [4 /*yield*/, this.paymentRepository.save(payment)];
                    case 3:
                        _a.sent();
                        // Return refund details
                        return [2 /*return*/, {
                                paymentId: payment.id,
                                refundId: refund.id,
                                amount: amount || payment.amount
                            }];
                }
            });
        });
    };
    PaymentsService = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_1.InjectRepository(payment_entity_1.Payment))
    ], PaymentsService);
    return PaymentsService;
}());
exports.PaymentsService = PaymentsService;
