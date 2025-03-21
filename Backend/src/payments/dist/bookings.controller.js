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
exports.PaymentsController = void 0;
// src/payments/payments.controller.ts
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
var roles_guard_1 = require("../auth/guards/roles.guard");
var roles_decorator_1 = require("../auth/decorators/roles.decorator");
var user_role_enum_1 = require("../users/enums/user-role.enum");
var PaymentsController = /** @class */ (function () {
    function PaymentsController(paymentsService) {
        this.paymentsService = paymentsService;
    }
    PaymentsController.prototype.createPayment = function (createPaymentDto, req) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.paymentsService.createPayment(createPaymentDto, req.user.userId)];
            });
        });
    };
    PaymentsController.prototype.getPaymentsByBooking = function (bookingId, req) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.paymentsService.getPaymentsByBooking(bookingId, req.user.userId, req.user.role)];
            });
        });
    };
    PaymentsController.prototype.handleWebhook = function (webhookDto) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.paymentsService.handleWebhook(webhookDto)];
            });
        });
    };
    __decorate([
        common_1.Post(),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
        roles_decorator_1.Roles(user_role_enum_1.UserRole.TOURIST),
        swagger_1.ApiBearerAuth(),
        swagger_1.ApiOperation({ summary: 'Create a payment intent' }),
        swagger_1.ApiResponse({ status: 201, description: 'Payment intent created' }),
        __param(0, common_1.Body()), __param(1, common_1.Request())
    ], PaymentsController.prototype, "createPayment");
    __decorate([
        common_1.Get(':bookingId'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        swagger_1.ApiBearerAuth(),
        swagger_1.ApiOperation({ summary: 'Get payments for a booking' }),
        swagger_1.ApiResponse({ status: 200, description: 'Returns payments for the booking' }),
        __param(0, common_1.Param('bookingId', common_1.ParseUUIDPipe)),
        __param(1, common_1.Request())
    ], PaymentsController.prototype, "getPaymentsByBooking");
    __decorate([
        common_1.Post('webhook'),
        swagger_1.ApiOperation({ summary: 'Handle payment webhook from Stripe' }),
        swagger_1.ApiResponse({ status: 200, description: 'Webhook processed' }),
        __param(0, common_1.Body())
    ], PaymentsController.prototype, "handleWebhook");
    PaymentsController = __decorate([
        swagger_1.ApiTags('payments'),
        common_1.Controller('payments')
    ], PaymentsController);
    return PaymentsController;
}());
exports.PaymentsController = PaymentsController;
