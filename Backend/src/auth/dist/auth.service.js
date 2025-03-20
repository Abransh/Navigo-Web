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
// src/auth/auth.service.ts
var common_1 = require("@nestjs/common");
var user_role_enum_1 = require("../users/enums/user-role.enum");
var bcrypt = require("bcrypt");
var uuid_1 = require("uuid");
var AuthService = /** @class */ (function () {
    function AuthService(usersService, jwtService, emailService, passwordResetRepository, configService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.emailService = emailService;
        this.passwordResetRepository = passwordResetRepository;
        this.configService = configService;
    }
    // src/auth/auth.service.ts
    AuthService.prototype.validateUser = function (email, password) {
        return __awaiter(this, void 0, Promise, function () {
            var user, _a, password_1, result, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.usersService.findByEmail(email)];
                    case 1:
                        user = _b.sent();
                        _a = user && user.password;
                        if (!_a) return [3 /*break*/, 3];
                        return [4 /*yield*/, bcrypt.compare(password, user.password)];
                    case 2:
                        _a = (_b.sent());
                        _b.label = 3;
                    case 3:
                        // Add null check for password
                        if (_a) {
                            password_1 = user.password, result = __rest(user, ["password"]);
                            return [2 /*return*/, result];
                        }
                        return [2 /*return*/, null];
                    case 4:
                        error_1 = _b.sent();
                        if (error_1 instanceof common_1.NotFoundException) {
                            return [2 /*return*/, null]; // User not found, return null for auth flow
                        }
                        throw error_1; // Rethrow unexpected errors
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
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
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.register = function (registerDto) {
        return __awaiter(this, void 0, void 0, function () {
            var error_2, hashedPassword, newUser, error_3, payload, password, userWithoutPassword, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 11, , 12]);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.usersService.findByEmail(registerDto.email)];
                    case 2:
                        _a.sent();
                        throw new common_1.BadRequestException('User with this email already exists');
                    case 3:
                        error_2 = _a.sent();
                        if (!(error_2 instanceof common_1.NotFoundException)) {
                            throw error_2;
                        }
                        return [3 /*break*/, 4];
                    case 4: return [4 /*yield*/, bcrypt.hash(registerDto.password, 10)];
                    case 5:
                        hashedPassword = _a.sent();
                        return [4 /*yield*/, this.usersService.create(__assign(__assign({}, registerDto), { password: hashedPassword, role: registerDto.role || user_role_enum_1.UserRole.TOURIST }))];
                    case 6:
                        newUser = _a.sent();
                        _a.label = 7;
                    case 7:
                        _a.trys.push([7, 9, , 10]);
                        return [4 /*yield*/, this.emailService.sendWelcomeEmail(newUser.email, newUser.firstName)];
                    case 8:
                        _a.sent();
                        return [3 /*break*/, 10];
                    case 9:
                        error_3 = _a.sent();
                        console.error('Failed to send welcome email:', error_3);
                        return [3 /*break*/, 10];
                    case 10:
                        payload = { email: newUser.email, sub: newUser.id, role: newUser.role };
                        password = newUser.password, userWithoutPassword = __rest(newUser, ["password"]);
                        return [2 /*return*/, {
                                access_token: this.jwtService.sign(payload),
                                user: userWithoutPassword
                            }];
                    case 11:
                        error_4 = _a.sent();
                        if (error_4 instanceof common_1.BadRequestException) {
                            throw error_4;
                        }
                        throw new common_1.InternalServerErrorException('Failed to register user');
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.validateSocialLogin = function (socialUser) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_5, _a, _b, _c, payload, password, userWithoutPassword, error_6;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 9, , 10]);
                        user = void 0;
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 3, , 6]);
                        return [4 /*yield*/, this.usersService.findByEmail(socialUser.email)];
                    case 2:
                        user = _d.sent();
                        return [3 /*break*/, 6];
                    case 3:
                        error_5 = _d.sent();
                        if (!(error_5 instanceof common_1.NotFoundException)) {
                            throw error_5;
                        }
                        _b = (_a = this.usersService).create;
                        _c = {
                            email: socialUser.email,
                            firstName: socialUser.firstName,
                            lastName: socialUser.lastName,
                            profilePicture: socialUser.picture
                        };
                        return [4 /*yield*/, bcrypt.hash(uuid_1.v4(), 10)];
                    case 4: return [4 /*yield*/, _b.apply(_a, [(_c.password = _d.sent(),
                                _c.role = user_role_enum_1.UserRole.TOURIST,
                                _c)])];
                    case 5:
                        // User doesn't exist, create a new one
                        user = _d.sent();
                        return [3 /*break*/, 6];
                    case 6:
                        if (!(!user.profilePicture && socialUser.picture)) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.usersService.update(user.id, {
                                profilePicture: socialUser.picture
                            })];
                    case 7:
                        _d.sent();
                        _d.label = 8;
                    case 8:
                        payload = {
                            sub: user.id,
                            email: user.email,
                            role: user.role
                        };
                        password = user.password, userWithoutPassword = __rest(user, ["password"]);
                        return [2 /*return*/, {
                                access_token: this.jwtService.sign(payload),
                                user: userWithoutPassword
                            }];
                    case 9:
                        error_6 = _d.sent();
                        console.error('Social login error:', error_6);
                        throw new common_1.InternalServerErrorException('Social login failed');
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.requestPasswordReset = function (email) {
        return __awaiter(this, void 0, Promise, function () {
            var user, error_7, token, hashedToken, expires, frontendUrl, resetLink, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.usersService.findByEmail(email)];
                    case 1:
                        user = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_7 = _a.sent();
                        if (error_7 instanceof common_1.NotFoundException) {
                            // Don't reveal if user exists for security
                            return [2 /*return*/];
                        }
                        throw error_7;
                    case 3:
                        token = uuid_1.v4();
                        return [4 /*yield*/, bcrypt.hash(token, 10)];
                    case 4:
                        hashedToken = _a.sent();
                        expires = new Date();
                        expires.setHours(expires.getHours() + 1);
                        // Save token to database
                        return [4 /*yield*/, this.passwordResetRepository.save({
                                email: user.email,
                                token: hashedToken,
                                expires: expires
                            })];
                    case 5:
                        // Save token to database
                        _a.sent();
                        frontendUrl = this.configService.get('FRONTEND_URL', 'http://localhost:3000');
                        resetLink = frontendUrl + "/reset-password/" + token;
                        _a.label = 6;
                    case 6:
                        _a.trys.push([6, 8, , 9]);
                        return [4 /*yield*/, this.emailService.sendPasswordResetEmail(user.email, user.firstName, resetLink)];
                    case 7:
                        _a.sent();
                        return [3 /*break*/, 9];
                    case 8:
                        error_8 = _a.sent();
                        console.error('Failed to send password reset email:', error_8);
                        throw new common_1.InternalServerErrorException('Failed to send password reset email');
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.verifyResetToken = function (token) {
        return __awaiter(this, void 0, Promise, function () {
            var now, resetRecords, _i, resetRecords_1, record, isMatch;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        now = new Date();
                        return [4 /*yield*/, this.passwordResetRepository.find({
                                where: { expires: { $gt: now } }
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
                        return [4 /*yield*/, bcrypt.compare(token, record.token)];
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
    AuthService.prototype.resetPassword = function (token, newPassword) {
        return __awaiter(this, void 0, Promise, function () {
            var now, resetRecords, matchedRecord, _i, resetRecords_2, record, isMatch, user, error_9, hashedPassword, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        now = new Date();
                        return [4 /*yield*/, this.passwordResetRepository.find({
                                where: { expires: { $gt: now } }
                            })];
                    case 1:
                        resetRecords = _a.sent();
                        // No need to continue if no records found
                        if (!resetRecords || resetRecords.length === 0) {
                            throw new common_1.BadRequestException('Invalid or expired token');
                        }
                        matchedRecord = null;
                        _i = 0, resetRecords_2 = resetRecords;
                        _a.label = 2;
                    case 2:
                        if (!(_i < resetRecords_2.length)) return [3 /*break*/, 5];
                        record = resetRecords_2[_i];
                        return [4 /*yield*/, bcrypt.compare(token, record.token)];
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
                        // If no match found, token is invalid
                        if (!matchedRecord) {
                            throw new common_1.BadRequestException('Invalid or expired token');
                        }
                        _a.label = 6;
                    case 6:
                        _a.trys.push([6, 8, , 9]);
                        return [4 /*yield*/, this.usersService.findByEmail(matchedRecord.email)];
                    case 7:
                        user = _a.sent();
                        return [3 /*break*/, 9];
                    case 8:
                        error_9 = _a.sent();
                        throw new common_1.BadRequestException('Invalid or expired token');
                    case 9: return [4 /*yield*/, bcrypt.hash(newPassword, 10)];
                    case 10:
                        hashedPassword = _a.sent();
                        // Update user password
                        return [4 /*yield*/, this.usersService.update(user.id, { password: hashedPassword })];
                    case 11:
                        // Update user password
                        _a.sent();
                        // Delete all reset records for this user (for security)
                        return [4 /*yield*/, this.passwordResetRepository["delete"]({ email: user.email })];
                    case 12:
                        // Delete all reset records for this user (for security)
                        _a.sent();
                        _a.label = 13;
                    case 13:
                        _a.trys.push([13, 15, , 16]);
                        return [4 /*yield*/, this.emailService.sendPasswordResetConfirmationEmail(user.email, user.firstName)];
                    case 14:
                        _a.sent();
                        return [3 /*break*/, 16];
                    case 15:
                        error_10 = _a.sent();
                        console.error('Failed to send password reset confirmation email:', error_10);
                        return [3 /*break*/, 16];
                    case 16: return [2 /*return*/];
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
