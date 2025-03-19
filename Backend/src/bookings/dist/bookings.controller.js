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
exports.BookingsController = void 0;
// src/bookings/bookings.controller.ts
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
var roles_guard_1 = require("../auth/guards/roles.guard");
var roles_decorator_1 = require("../auth/decorators/roles.decorator");
var create_booking_dto_1 = require("./dto/create-booking.dto");
var update_booking_dto_1 = require("./dto/update-booking.dto");
var cancel_booking_dto_1 = require("./dto/cancel-booking.dto");
var cancel_booking_dto_2 = require("./dto/cancel-booking.dto");
var booking_status_enum_1 = require("./enums/booking-status.enum");
var user_role_enum_1 = require("../users/enums/user-role.enum");
var BookingsController = /** @class */ (function () {
    function BookingsController(bookingsService) {
        this.bookingsService = bookingsService;
    }
    BookingsController.prototype.create = function (createBookingDto, req) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.bookingsService.create(createBookingDto, req.user.userId)];
            });
        });
    };
    BookingsController.prototype.findAll = function (req, status) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.bookingsService.findAll(req.user.userId, req.user.role)];
            });
        });
    };
    BookingsController.prototype.findOne = function (id, req) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.bookingsService.findOne(id, req.user.userId, req.user.role)];
            });
        });
    };
    BookingsController.prototype.update = function (id, updateBookingDto, req) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.bookingsService.update(id, updateBookingDto, req.user.userId, req.user.role)];
            });
        });
    };
    BookingsController.prototype.cancel = function (id, cancelBookingDto, req) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.bookingsService.cancel(id, req.user.userId, cancelBookingDto.reason)];
            });
        });
    };
    BookingsController.prototype.calculatePrice = function (calculatePriceDto) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.bookingsService.calculatePrice(calculatePriceDto.companionId, calculatePriceDto.startDate, calculatePriceDto.endDate)];
            });
        });
    };
    __decorate([
        common_1.Post(),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
        roles_decorator_1.Roles(user_role_enum_1.UserRole.TOURIST),
        swagger_1.ApiBearerAuth(),
        swagger_1.ApiOperation({ summary: 'Create a new booking' }),
        swagger_1.ApiResponse({ status: 201, description: 'Booking created successfully' }),
        swagger_1.ApiResponse({ status: 400, description: 'Invalid input' }),
        swagger_1.ApiResponse({ status: 404, description: 'Companion not found' }),
        swagger_1.ApiBody({ type: create_booking_dto_1.CreateBookingDto }),
        __param(0, common_1.Body()), __param(1, common_1.Request())
    ], BookingsController.prototype, "create");
    __decorate([
        common_1.Get(),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        swagger_1.ApiBearerAuth(),
        swagger_1.ApiOperation({ summary: 'Get all bookings for the current user' }),
        swagger_1.ApiResponse({ status: 200, description: 'Returns all bookings' }),
        swagger_1.ApiQuery({ name: 'status', "enum": booking_status_enum_1.BookingStatus, required: false }),
        __param(0, common_1.Request()), __param(1, common_1.Query('status'))
    ], BookingsController.prototype, "findAll");
    __decorate([
        common_1.Get(':id'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        swagger_1.ApiBearerAuth(),
        swagger_1.ApiOperation({ summary: 'Get a booking by ID' }),
        swagger_1.ApiResponse({ status: 200, description: 'Returns the booking' }),
        swagger_1.ApiResponse({ status: 404, description: 'Booking not found' }),
        swagger_1.ApiParam({ name: 'id', type: 'string', format: 'uuid' }),
        __param(0, common_1.Param('id', common_1.ParseUUIDPipe)), __param(1, common_1.Request())
    ], BookingsController.prototype, "findOne");
    __decorate([
        common_1.Patch(':id'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        swagger_1.ApiBearerAuth(),
        swagger_1.ApiOperation({ summary: 'Update a booking' }),
        swagger_1.ApiResponse({ status: 200, description: 'Booking updated successfully' }),
        swagger_1.ApiResponse({ status: 400, description: 'Invalid input or booking cannot be updated' }),
        swagger_1.ApiResponse({ status: 404, description: 'Booking not found' }),
        swagger_1.ApiParam({ name: 'id', type: 'string', format: 'uuid' }),
        swagger_1.ApiBody({ type: update_booking_dto_1.UpdateBookingDto }),
        __param(0, common_1.Param('id', common_1.ParseUUIDPipe)),
        __param(1, common_1.Body()),
        __param(2, common_1.Request())
    ], BookingsController.prototype, "update");
    __decorate([
        common_1.Post(':id/cancel'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
        roles_decorator_1.Roles(user_role_enum_1.UserRole.TOURIST),
        swagger_1.ApiBearerAuth(),
        swagger_1.ApiOperation({ summary: 'Cancel a booking' }),
        swagger_1.ApiResponse({ status: 200, description: 'Booking cancelled successfully' }),
        swagger_1.ApiResponse({ status: 400, description: 'Booking cannot be cancelled' }),
        swagger_1.ApiResponse({ status: 404, description: 'Booking not found' }),
        swagger_1.ApiParam({ name: 'id', type: 'string', format: 'uuid' }),
        swagger_1.ApiBody({ type: cancel_booking_dto_1.CancelBookingDto }),
        __param(0, common_1.Param('id', common_1.ParseUUIDPipe)),
        __param(1, common_1.Body()),
        __param(2, common_1.Request())
    ], BookingsController.prototype, "cancel");
    __decorate([
        common_1.Post('calculate-price'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
        roles_decorator_1.Roles(user_role_enum_1.UserRole.TOURIST),
        swagger_1.ApiBearerAuth(),
        swagger_1.ApiOperation({ summary: 'Calculate booking price without creating a booking' }),
        swagger_1.ApiResponse({ status: 200, description: 'Returns calculated price' }),
        swagger_1.ApiResponse({ status: 400, description: 'Invalid input' }),
        swagger_1.ApiResponse({ status: 404, description: 'Companion not found' }),
        swagger_1.ApiBody({ type: cancel_booking_dto_2.CalculatePriceDto }),
        __param(0, common_1.Body())
    ], BookingsController.prototype, "calculatePrice");
    BookingsController = __decorate([
        swagger_1.ApiTags('bookings'),
        common_1.Controller('bookings')
    ], BookingsController);
    return BookingsController;
}());
exports.BookingsController = BookingsController;
