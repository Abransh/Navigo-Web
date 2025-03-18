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
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var booking_entity_1 = require("./entities/booking.entity");
var booking_status_enum_1 = require("./enums/booking-status.enum");
var BookingsService = /** @class */ (function () {
    function BookingsService(bookingsRepository, usersService, companionsService) {
        this.bookingsRepository = bookingsRepository;
        this.usersService = usersService;
        this.companionsService = companionsService;
    }
    BookingsService.prototype.create = function (createBookingDto, touristId) {
        return __awaiter(this, void 0, Promise, function () {
            var tourist, companion, startDate, endDate, hours, totalAmount, booking;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.usersService.findOne(touristId)];
                    case 1:
                        tourist = _a.sent();
                        if (!tourist) {
                            throw new common_1.NotFoundException('Tourist not found');
                        }
                        return [4 /*yield*/, this.companionsService.findOne(createBookingDto.companionId)];
                    case 2:
                        companion = _a.sent();
                        if (!companion) {
                            throw new common_1.NotFoundException('Companion not found');
                        }
                        if (!companion.isAvailable) {
                            throw new common_1.BadRequestException('Companion is not available for booking');
                        }
                        startDate = new Date(createBookingDto.startDate);
                        endDate = new Date(createBookingDto.endDate);
                        hours = Math.abs(endDate.getTime() - startDate.getTime()) / 36e5;
                        totalAmount = hours * companion.hourlyRate;
                        booking = this.bookingsRepository.create({
                            tourist: tourist,
                            companion: companion,
                            startDate: startDate,
                            endDate: endDate,
                            location: createBookingDto.location,
                            notes: createBookingDto.notes,
                            totalAmount: totalAmount,
                            status: booking_status_enum_1.BookingStatus.PENDING
                        });
                        return [2 /*return*/, this.bookingsRepository.save(booking)];
                }
            });
        });
    };
    BookingsService.prototype.findAll = function (userId, role) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                if (role === 'tourist') {
                    return [2 /*return*/, this.bookingsRepository.find({
                            where: { tourist: { id: userId } },
                            relations: ['companion', 'companion.user']
                        })];
                }
                else if (role === 'companion') {
                    // Get companion profile by user ID first
                    // Then find bookings for that companion
                    // This requires an additional query to find the companion profile
                    // Implementation depends on your specific relationship structure
                }
                throw new common_1.BadRequestException('Invalid role for booking retrieval');
            });
        });
    };
    BookingsService.prototype.findOne = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            var booking;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.bookingsRepository.findOne({
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
                        return [2 /*return*/, booking];
                }
            });
        });
    };
    BookingsService.prototype.update = function (id, updateBookingDto) {
        return __awaiter(this, void 0, Promise, function () {
            var booking;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findOne(id)];
                    case 1:
                        booking = _a.sent();
                        if (!booking) {
                            throw new common_1.NotFoundException('Booking not found');
                        }
                        // Don't allow updating completed bookings
                        if (booking.status === booking_status_enum_1.BookingStatus.COMPLETED) {
                            throw new common_1.BadRequestException('Cannot update completed bookings');
                        }
                        Object.assign(booking, updateBookingDto);
                        return [2 /*return*/, this.bookingsRepository.save(booking)];
                }
            });
        });
    };
    BookingsService = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_1.InjectRepository(booking_entity_1.Booking))
    ], BookingsService);
    return BookingsService;
}());
exports.BookingsService = BookingsService;
