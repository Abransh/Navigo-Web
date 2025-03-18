"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.AuthService = void 0;
// Backend/src/auth/services/auth.service.ts
var common_1 = require("@nestjs/common");
var bcrypt_1 = require("bcrypt");
var uuid_1 = require("uuid");
var user_role_enum_1 = require("../../users/enums/user-role.enum");
/**
 * Auth Service - Core service for all authentication-related functionality
 *
 * Handles:
 * - Login & registration
 * - Social authentication
 * - Password reset
 * - JWT token generation
 */
var AuthService = /** @class */ (function () {
    function AuthService(usersService, jwtService, mailService, passwordResetRepository) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.mailService = mailService;
        this.passwordResetRepository = passwordResetRepository;
    }
    /**
     * Validate user credentials
     * Used by the local authentication strategy
     */
    AuthService.prototype.validateUser = function (email, password) {
        return __awaiter(this, void 0, Promise, function () {
            var user, _a, password_1, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.usersService.findByEmail(email)];
                    case 1:
                        user = _b.sent();
                        _a = user;
                        if (!_a) return [3 /*break*/, 3];
                        return [4 /*yield*/, bcrypt_1["default"].compare(password, user.password)];
                    case 2:
                        _a = (_b.sent());
                        _b.label = 3;
                    case 3:
                        // If user exists and password matches, return user without password
                        if (_a) {
                            password_1 = user.password, result = __rest(user, ["password"]);
                            return [2 /*return*/, result];
                        }
                        // Return null if user not found or password doesn't match
                        return [2 /*return*/, null];
                }
            });
        });
    };
    /**
     * Login with email and password
     */
    AuthService.prototype.login = function (loginDto) {
        return __awaiter(this, void 0, void 0, function () {
            var user, payload;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.validateUser(loginDto.email, loginDto.password)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new common_1.UnauthorizedException('Invalid credentials');
                        }
                        payload = {
                            email: user.email,
                            sub: user.id,
                            role: user.role
                        };
                        // Return token and user data
                        return [2 /*return*/, {
                                access_token: this.jwtService.sign(payload),
                                user: user
                            }];
                }
            });
        });
    };
    /**
     * Register a new user
     */
    AuthService.prototype.register = function (registerDto) {
        return __awaiter(this, void 0, void 0, function () {
            var hashedPassword, newUser, payload;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bcrypt_1["default"].hash(registerDto.password, 10)];
                    case 1:
                        hashedPassword = _a.sent();
                        return [4 /*yield*/, this.usersService.create(__assign(__assign({}, registerDto), { password: hashedPassword }))];
                    case 2:
                        newUser = _a.sent();
                        payload = {
                            email: newUser.email,
                            sub: newUser.id,
                            role: newUser.role
                        };
                        // Return token and user data
                        return [2 /*return*/, {
                                access_token: this.jwtService.sign(payload),
                                user: newUser
                            }];
                }
            });
        });
    };
    /**
     * Validate and process social login
     * Used by OAuth strategies (Google, Facebook, Apple)
     */
    AuthService.prototype.validateSocialLogin = function (socialUser) {
        return __awaiter(this, void 0, void 0, function () {
            var user, _a, _b, _c, payload, error_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 8, , 9]);
                        return [4 /*yield*/, this.usersService.findByEmail(socialUser.email)["catch"](function () { return null; })];
                    case 1:
                        user = _d.sent();
                        if (!!user) return [3 /*break*/, 5];
                        _b = (_a = this.usersService).create;
                        _c = {
                            email: socialUser.email,
                            firstName: socialUser.firstName,
                            lastName: socialUser.lastName,
                            profilePicture: socialUser.picture
                        };
                        return [4 /*yield*/, bcrypt_1["default"].hash(uuid_1.v4(), 10)];
                    case 2: return [4 /*yield*/, _b.apply(_a, [(_c.password = _d.sent(),
                                _c.role = user_role_enum_1.UserRole.TOURIST,
                                _c)])];
                    case 3:
                        user = _d.sent();
                        // Create social profile link (in a real implementation this would be handled by a socialProfileRepository)
                        // await this.socialProfileRepository.save({
                        //   provider: socialUser.provider,
                        //   providerId: socialUser.email,
                        //   accessToken: socialUser.accessToken,
                        //   userId: user.id,
                        // });
                        // Send welcome email to new user
                        return [4 /*yield*/, this.mailService.sendWelcomeEmail(user.email, user.firstName)];
                    case 4:
                        // Create social profile link (in a real implementation this would be handled by a socialProfileRepository)
                        // await this.socialProfileRepository.save({
                        //   provider: socialUser.provider,
                        //   providerId: socialUser.email,
                        //   accessToken: socialUser.accessToken,
                        //   userId: user.id,
                        // });
                        // Send welcome email to new user
                        _d.sent();
                        return [3 /*break*/, 7];
                    case 5:
                        if (!(!user.profilePicture && socialUser.picture)) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.usersService.update(user.id, {
                                profilePicture: socialUser.picture
                            })];
                    case 6:
                        _d.sent();
                        _d.label = 7;
                    case 7:
                        payload = {
                            sub: user.id,
                            email: user.email,
                            role: user.role
                        };
                        // Return token and user data
                        return [2 /*return*/, {
                                access_token: this.jwtService.sign(payload),
                                user: {
                                    id: user.id,
                                    email: user.email,
                                    firstName: user.firstName,
                                    lastName: user.lastName,
                                    role: user.role,
                                    profilePicture: user.profilePicture
                                }
                            }];
                    case 8:
                        error_1 = _d.sent();
                        console.error('Social login error:', error_1);
                        throw new common_1.InternalServerErrorException('Social login failed');
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Request a password reset
     * Generates a token and sends an email with reset link
     */
    AuthService.prototype.requestPasswordReset = function (email) {
        return __awaiter(this, void 0, Promise, function () {
            var user, token, hashedToken, expires, resetLink;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.usersService.findByEmail(email)["catch"](function () { return null; })];
                    case 1:
                        user = _a.sent();
                        // Even if user doesn't exist, don't reveal that for security
                        if (!user) {
                            return [2 /*return*/];
                        }
                        token = uuid_1.v4();
                        return [4 /*yield*/, bcrypt_1["default"].hash(token, 10)];
                    case 2:
                        hashedToken = _a.sent();
                        expires = new Date();
                        expires.setHours(expires.getHours() + 1);
                        // Save token to database
                        return [4 /*yield*/, this.passwordResetRepository.save({
                                email: user.email,
                                token: hashedToken,
                                expires: expires
                            })];
                    case 3:
                        // Save token to database
                        _a.sent();
                        resetLink = (process.env.FRONTEND_URL || 'http://localhost:3000') + "/reset-password/" + token;
                        // Send email with reset link
                        return [4 /*yield*/, this.mailService.sendPasswordResetEmail(user.email, user.firstName, resetLink)];
                    case 4:
                        // Send email with reset link
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Verify a password reset token
     * Checks if the token exists and has not expired
     */
    AuthService.prototype.verifyResetToken = function (token) {
        return __awaiter(this, void 0, Promise, function () {
            var resetRecords, _i, resetRecords_1, record, isMatch;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.passwordResetRepository.find({
                            where: { expires: { $gt: new Date() } }
                        })];
                    case 1:
                        resetRecords = _a.sent();
                        // No need to continue if no records found
                        if (!resetRecords || resetRecords.length === 0) {
                            throw new common_1.BadRequestException('Invalid or expired token');
                        }
                        _i = 0, resetRecords_1 = resetRecords;
                        _a.label = 2;
                    case 2:
                        if (!(_i < resetRecords_1.length)) return [3 /*break*/, 5];
                        record = resetRecords_1[_i];
                        return [4 /*yield*/, bcrypt_1["default"].compare(token, record.token)];
                    case 3:
                        isMatch = _a.sent();
                        if (isMatch) {
                            return [2 /*return*/, true]; // Token is valid
                        }
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: 
                    // No match found
                    throw new common_1.BadRequestException('Invalid or expired token');
                }
            });
        });
    };
    /**
     * Reset password using token
     * Validates token, updates password, and cleans up tokens
     */
    AuthService.prototype.resetPassword = function (token, newPassword) {
        return __awaiter(this, void 0, Promise, function () {
            var now, resetRecords, matchedRecord, _i, resetRecords_2, record, isMatch, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        now = new Date();
                        return [4 /*yield*/, this.passwordResetRepository.find({
                                where: { expires: { $gt: now } }
                            })];
                    case 1:
                        resetRecords = _a.sent();
                        matchedRecord = null;
                        _i = 0, resetRecords_2 = resetRecords;
                        _a.label = 2;
                    case 2:
                        if (!(_i < resetRecords_2.length)) return [3 /*break*/, 5];
                        record = resetRecords_2[_i];
                        return [4 /*yield*/, bcrypt_1["default"].compare(token, record.token)];
                    case 3:
                        isMatch = _a.sent();
                        if (isMatch) {
                            matchedRecord = record;
                            return [3 /*break*/, 5];
                        }
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5:
                        // Null check before accessing email
                        if (!matchedRecord) {
                            throw new common_1.BadRequestException('Invalid or expired token');
                        }
                        return [4 /*yield*/, this.usersService.findByEmail(matchedRecord.email)];
                    case 6:
                        user = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthService = __decorate([
        common_1.Injectable()
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
