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
exports.AdminController = void 0;
// src/admin/admin.controller.ts
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
// Guards
var jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
var roles_guard_1 = require("../auth/guards/roles.guard");
var roles_decorator_1 = require("../auth/decorators/roles.decorator");
// Enums
var user_role_enum_1 = require("../users/enums/user-role.enum");
var AdminController = /** @class */ (function () {
    function AdminController(usersService, bookingsService, companionsService, paymentsService) {
        this.usersService = usersService;
        this.bookingsService = bookingsService;
        this.companionsService = companionsService;
        this.paymentsService = paymentsService;
    }
    AdminController.prototype.getDashboardStats = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, totalUsers, totalCompanions, totalBookings, totalRevenue, pendingVerifications, companionApplications;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Promise.all([
                            this.usersService.getTotalUserCount(),
                            this.companionsService.getTotalCompanionCount(),
                            this.bookingsService.getTotalBookingCount(),
                            this.paymentsService.getTotalRevenue(),
                            this.companionsService.getPendingVerificationsCount(),
                            this.companionsService.getPendingApplicationsCount()
                        ])];
                    case 1:
                        _a = _b.sent(), totalUsers = _a[0], totalCompanions = _a[1], totalBookings = _a[2], totalRevenue = _a[3], pendingVerifications = _a[4], companionApplications = _a[5];
                        return [2 /*return*/, {
                                totalUsers: totalUsers,
                                totalCompanions: totalCompanions,
                                totalBookings: totalBookings,
                                totalRevenue: 0,
                                pendingVerifications: 0,
                                companionApplications: 0
                            }];
                }
            });
        });
    };
    AdminController.prototype.getUsers = function (page, limit, filter) {
        if (page === void 0) { page = 1; }
        if (limit === void 0) { limit = 10; }
        if (filter === void 0) { filter = ''; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.usersService.getPaginatedUsers(page, limit, filter)];
            });
        });
    };
    AdminController.prototype.updateUserStatus = function (userId, updateUserDto) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.usersService.update(userId, updateUserDto)];
            });
        });
    };
    AdminController.prototype.getBookings = function (page, limit, filter) {
        if (page === void 0) { page = 1; }
        if (limit === void 0) { limit = 10; }
        if (filter === void 0) { filter = ''; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.bookingsService.getPaginatedBookings(page, limit, filter)];
            });
        });
    };
    AdminController.prototype.getPayments = function (page, limit, filter) {
        if (page === void 0) { page = 1; }
        if (limit === void 0) { limit = 10; }
        if (filter === void 0) { filter = ''; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.paymentsService.getPaginatedPayments(page, limit, filter)];
            });
        });
    };
    AdminController.prototype.getCompanionApplications = function (page, limit) {
        if (page === void 0) { page = 1; }
        if (limit === void 0) { limit = 10; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.companionsService.getPendingApplications(page, limit)];
            });
        });
    };
    AdminController.prototype.processCompanionApplication = function (applicationId, status) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.companionsService.processApplication(applicationId, status)];
            });
        });
    };
    __decorate([
        common_1.Get('stats'),
        swagger_1.ApiOperation({ summary: 'Get admin dashboard statistics' }),
        swagger_1.ApiResponse({ status: 200, description: 'Dashboard statistics retrieved successfully' })
    ], AdminController.prototype, "getDashboardStats");
    __decorate([
        common_1.Get('users'),
        swagger_1.ApiOperation({ summary: 'Get paginated list of users' }),
        swagger_1.ApiResponse({ status: 200, description: 'Users retrieved successfully' }),
        __param(0, common_1.Query('page')),
        __param(1, common_1.Query('limit')),
        __param(2, common_1.Query('filter'))
    ], AdminController.prototype, "getUsers");
    __decorate([
        common_1.Patch('users/:id/status'),
        swagger_1.ApiOperation({ summary: 'Update user status' }),
        swagger_1.ApiResponse({ status: 200, description: 'User status updated successfully' }),
        __param(0, common_1.Param('id')),
        __param(1, common_1.Body())
    ], AdminController.prototype, "updateUserStatus");
    __decorate([
        common_1.Get('bookings'),
        swagger_1.ApiOperation({ summary: 'Get paginated list of bookings' }),
        swagger_1.ApiResponse({ status: 200, description: 'Bookings retrieved successfully' }),
        __param(0, common_1.Query('page')),
        __param(1, common_1.Query('limit')),
        __param(2, common_1.Query('filter'))
    ], AdminController.prototype, "getBookings");
    __decorate([
        common_1.Get('payments'),
        swagger_1.ApiOperation({ summary: 'Get paginated list of payments' }),
        swagger_1.ApiResponse({ status: 200, description: 'Payments retrieved successfully' }),
        __param(0, common_1.Query('page')),
        __param(1, common_1.Query('limit')),
        __param(2, common_1.Query('filter'))
    ], AdminController.prototype, "getPayments");
    __decorate([
        common_1.Get('companion-applications'),
        swagger_1.ApiOperation({ summary: 'Get paginated list of companion applications' }),
        swagger_1.ApiResponse({ status: 200, description: 'Companion applications retrieved successfully' }),
        __param(0, common_1.Query('page')),
        __param(1, common_1.Query('limit'))
    ], AdminController.prototype, "getCompanionApplications");
    __decorate([
        common_1.Patch('companion-applications/:id'),
        swagger_1.ApiOperation({ summary: 'Process companion application' }),
        swagger_1.ApiResponse({ status: 200, description: 'Companion application processed successfully' }),
        __param(0, common_1.Param('id')),
        __param(1, common_1.Body('status'))
    ], AdminController.prototype, "processCompanionApplication");
    AdminController = __decorate([
        swagger_1.ApiTags('admin'),
        common_1.Controller('admin'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
        roles_decorator_1.Roles(user_role_enum_1.UserRole.ADMIN)
    ], AdminController);
    return AdminController;
}());
exports.AdminController = AdminController;
