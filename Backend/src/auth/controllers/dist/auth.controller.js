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
exports.AuthController = void 0;
// src/auth/controllers/auth.controller.ts
var common_1 = require("@nestjs/common");
var bcrypt = require("bcrypt");
var swagger_1 = require("@nestjs/swagger");
var jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
// DTOs
var login_dto_1 = require("../dto/login.dto");
var register_dto_1 = require("../dto/register.dto");
var password_reset_dto_1 = require("../dto/password-reset.dto");
/**
 * Auth Controller - Handles all authentication-related endpoints
 */
var AuthController = /** @class */ (function () {
    function AuthController(authService, usersService) {
        this.authService = authService;
        this.usersService = usersService;
        this.logger = new common_1.Logger(AuthController_1.name);
    }
    AuthController_1 = AuthController;
    // Add a simple debug endpoint to test if the controller is registered
    AuthController.prototype.debug = function () {
        this.logger.log('Auth debug endpoint accessed');
        return {
            status: 'ok',
            message: 'Auth controller is working',
            timestamp: new Date().toISOString()
        };
    };
    // Add a user profile endpoint without guards for testing
    AuthController.prototype.testProfile = function () {
        this.logger.log('Test profile endpoint accessed');
        return {
            status: 'ok',
            message: 'Profile endpoint is accessible',
            timestamp: new Date().toISOString()
        };
    };
    /**
     * Login endpoint - Authenticates user with email/password
     */
    AuthController.prototype.login = function (loginDto) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.logger.log("Login attempt for email: " + loginDto.email);
                return [2 /*return*/, this.authService.login(loginDto)];
            });
        });
    };
    /**
     * Register endpoint - Creates a new user account
     */
    AuthController.prototype.register = function (registerDto) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.logger.log("Registration attempt for email: " + registerDto.email);
                return [2 /*return*/, this.authService.register(registerDto)];
            });
        });
    };
    /**
     * Forgot Password endpoint - Initiates password reset process
     */
    AuthController.prototype.forgotPassword = function (dto) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.authService.requestPasswordReset(dto.email)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, {
                                message: 'If your email exists in our system, you will receive a password reset link.'
                            }];
                }
            });
        });
    };
    /**
     * Verify Token endpoint - Validates a password reset token
     */
    AuthController.prototype.verifyResetToken = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.authService.verifyResetToken(token)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, { valid: true }];
                }
            });
        });
    };
    /**
     * Reset Password endpoint - Changes user password using a valid token
     */
    AuthController.prototype.resetPassword = function (dto) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.authService.resetPassword(dto.token, dto.password)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, { message: 'Password reset successful' }];
                }
            });
        });
    };
    /**
     * Get Current User endpoint - Returns the authenticated user's profile
     */
    AuthController.prototype.getCurrentUser = function (req) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var userId;
            return __generator(this, function (_c) {
                this.logger.debug('getCurrentUser called with user:', req.user);
                userId = ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) || ((_b = req.user) === null || _b === void 0 ? void 0 : _b.sub);
                this.logger.debug("Finding user with ID: " + userId);
                if (!userId) {
                    this.logger.error('User ID not found in request. Request user object:', req.user);
                    throw new Error('User ID not found in request');
                }
                return [2 /*return*/, this.usersService.findById(userId)];
            });
        });
    };
    AuthController.prototype.getCurrentUserAlt = function (req) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var userId;
            return __generator(this, function (_c) {
                this.logger.debug('getCurrentUserAlt called with user:', req.user);
                userId = ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) || ((_b = req.user) === null || _b === void 0 ? void 0 : _b.sub);
                if (!userId) {
                    this.logger.error('User ID not found in request', req.user);
                    throw new Error('User ID not found in request');
                }
                this.logger.debug("Finding user with ID: " + userId);
                return [2 /*return*/, this.usersService.findById(userId)];
            });
        });
    };
    AuthController.prototype.testLogin = function () {
        return __awaiter(this, void 0, void 0, function () {
            var hashedPassword, user, error_1, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        return [4 /*yield*/, bcrypt.hash('Admin123!', 10)];
                    case 1:
                        hashedPassword = _a.sent();
                        user = void 0;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 6]);
                        return [4 /*yield*/, this.usersService.findByEmail('admin@navigo.com')];
                    case 3:
                        user = _a.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        error_1 = _a.sent();
                        return [4 /*yield*/, this.usersService.create({
                                firstName: 'Admin',
                                lastName: 'Test',
                                email: 'admin@navigo.com',
                                password: hashedPassword,
                                role: 'admin'
                            })];
                    case 5:
                        // Create the user if not found
                        user = _a.sent();
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/, {
                            message: 'Test admin user created/verified',
                            loginWith: { email: 'admin@navigo.com', password: 'Admin123!' }
                        }];
                    case 7:
                        error_2 = _a.sent();
                        return [2 /*return*/, { error: error_2.message }];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    var AuthController_1;
    __decorate([
        common_1.Get('debug')
    ], AuthController.prototype, "debug");
    __decorate([
        common_1.Get('profile')
    ], AuthController.prototype, "testProfile");
    __decorate([
        common_1.Post('login'),
        common_1.HttpCode(common_1.HttpStatus.OK),
        swagger_1.ApiOperation({ summary: 'User login with email and password' }),
        swagger_1.ApiResponse({ status: 200, description: 'Login successful' }),
        swagger_1.ApiResponse({ status: 401, description: 'Invalid credentials' }),
        swagger_1.ApiBody({ type: login_dto_1.LoginDto }),
        __param(0, common_1.Body())
    ], AuthController.prototype, "login");
    __decorate([
        common_1.Post('register'),
        swagger_1.ApiOperation({ summary: 'Register a new user' }),
        swagger_1.ApiResponse({ status: 201, description: 'User successfully registered' }),
        swagger_1.ApiResponse({ status: 400, description: 'Bad request - validation failed or email already exists' }),
        swagger_1.ApiBody({ type: register_dto_1.RegisterDto }),
        __param(0, common_1.Body())
    ], AuthController.prototype, "register");
    __decorate([
        common_1.Post('forgot-password'),
        common_1.HttpCode(common_1.HttpStatus.OK),
        swagger_1.ApiOperation({ summary: 'Request password reset email' }),
        swagger_1.ApiResponse({ status: 200, description: 'Password reset email sent' }),
        swagger_1.ApiBody({ type: password_reset_dto_1.PasswordResetRequestDto }),
        __param(0, common_1.Body())
    ], AuthController.prototype, "forgotPassword");
    __decorate([
        common_1.Get('reset-password/verify/:token'),
        swagger_1.ApiOperation({ summary: 'Verify password reset token' }),
        swagger_1.ApiResponse({ status: 200, description: 'Token is valid' }),
        swagger_1.ApiResponse({ status: 400, description: 'Invalid or expired token' }),
        __param(0, common_1.Param('token'))
    ], AuthController.prototype, "verifyResetToken");
    __decorate([
        common_1.Post('reset-password'),
        common_1.HttpCode(common_1.HttpStatus.OK),
        swagger_1.ApiOperation({ summary: 'Reset password using token' }),
        swagger_1.ApiResponse({ status: 200, description: 'Password reset successful' }),
        swagger_1.ApiResponse({ status: 400, description: 'Invalid or expired token' }),
        swagger_1.ApiBody({ type: password_reset_dto_1.ResetPasswordDto }),
        __param(0, common_1.Body())
    ], AuthController.prototype, "resetPassword");
    __decorate([
        common_1.Get('me'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        swagger_1.ApiBearerAuth(),
        swagger_1.ApiOperation({ summary: 'Get current user profile' }),
        swagger_1.ApiResponse({ status: 200, description: 'Returns user profile' }),
        swagger_1.ApiResponse({ status: 401, description: 'Unauthorized' }),
        __param(0, common_1.Req())
    ], AuthController.prototype, "getCurrentUser");
    __decorate([
        common_1.Get('current-user'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        swagger_1.ApiBearerAuth(),
        swagger_1.ApiOperation({ summary: 'Alternative endpoint to get current user profile' }),
        swagger_1.ApiResponse({ status: 200, description: 'Returns user profile' }),
        swagger_1.ApiResponse({ status: 401, description: 'Unauthorized' }),
        __param(0, common_1.Req())
    ], AuthController.prototype, "getCurrentUserAlt");
    __decorate([
        common_1.Get('test-login'),
        swagger_1.ApiOperation({ summary: 'Test login endpoint' })
    ], AuthController.prototype, "testLogin");
    AuthController = AuthController_1 = __decorate([
        swagger_1.ApiTags('auth'),
        common_1.Controller('auth')
    ], AuthController);
    return AuthController;
}());
exports.AuthController = AuthController;
