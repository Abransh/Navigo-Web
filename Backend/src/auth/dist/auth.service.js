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
var common_1 = require("@nestjs/common");
var bcrypt = require("bcrypt");
var uuid_1 = require("uuid");
var AuthService = /** @class */ (function () {
    function AuthService(usersService, jwtService, mailService, passwordResetRepository) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.mailService = mailService;
        this.passwordResetRepository = passwordResetRepository;
    }
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
                        return [4 /*yield*/, bcrypt.compare(password, user.password)];
                    case 2:
                        _a = (_b.sent());
                        _b.label = 3;
                    case 3:
                        if (_a) {
                            password_1 = user.password, result = __rest(user, ["password"]);
                            return [2 /*return*/, result];
                        }
                        return [2 /*return*/, null];
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
                        payload = { email: user.email, sub: user.id, role: user.role };
                        return [2 /*return*/, {
                                access_token: this.jwtService.sign(payload),
                                user: user
                            }];
                }
            });
        });
    };
    AuthService.prototype.register = function (registerDto) {
        return __awaiter(this, void 0, void 0, function () {
            var hashedPassword, newUser, _a, _b, _c, _d, _i, resetRecords_1, record, isMatch;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, bcrypt.hash(registerDto.password, 10)];
                    case 1:
                        hashedPassword = _e.sent();
                        return [4 /*yield*/, this.usersService.create(__assign(__assign({}, registerDto), { password: hashedPassword }))];
                    case 2:
                        newUser = _e.sent();
                        async;
                        requestPasswordReset(email, string);
                        _a = Promise < void ;
                        _b = {};
                        return [4 /*yield*/, this.usersService.findByEmail(email)["catch"](function () { return null; })];
                    case 3:
                        // Check if user exists
                        _b["const"] = user = _e.sent(),
                            // Even if user doesn't exist, don't reveal that for security
                            _b["if"] = function (, user) {
                                return;
                            },
                            // Generate unique token
                            _b["const"] = token = uuid_1.v4();
                        return [4 /*yield*/, bcrypt.hash(token, 10)];
                    case 4:
                        _a > 
                        // Hash token for storage
                        _b["const"] = hashedToken = _e.sent(),
                            // Set expiration to 1 hour from now
                            _b["const"] = expires = new Date(),
                            _b.expires = expires,
                            _b. = .setHours(expires.getHours() + 1),
                            // Save token
                            _b.await = this.passwordResetRepository.save({
                                email: user.email,
                                token: hashedToken,
                                expires: expires
                            }),
                            // Send email with reset link
                            _b["const"] = resetLink = (process.env.FRONTEND_URL || 'http://localhost:3000') + "/reset-password/" + token,
                            _b.await = this.mailService.sendPasswordResetEmail(user.email, user.firstName, resetLink),
                            _b;
                        async;
                        verifyResetToken(token, string);
                        _c = Promise < boolean;
                        _d = {};
                        return [4 /*yield*/, this.passwordResetRepository.find({
                                where: { expires: { $gt: new Date() } }
                            })];
                    case 5:
                        _c > 
                        // Find all reset records for comparison
                        _d["const"] = resetRecords = _e.sent(),
                            // No need to continue if no records found
                            _d["if"] = function (, resetRecords) { },
                            _d || resetRecords.length === 0;
                        {
                            throw new common_1.BadRequestException('Invalid or expired token');
                        }
                        _i = 0, resetRecords_1 = resetRecords;
                        _e.label = 6;
                    case 6:
                        if (!(_i < resetRecords_1.length)) return [3 /*break*/, 9];
                        record = resetRecords_1[_i];
                        return [4 /*yield*/, bcrypt.compare(token, record.token)];
                    case 7:
                        isMatch = _e.sent();
                        if (isMatch) {
                            return [2 /*return*/, true];
                        }
                        _e.label = 8;
                    case 8:
                        _i++;
                        return [3 /*break*/, 6];
                    case 9: throw new common_1.BadRequestException('Invalid or expired token');
                }
            });
        });
    };
    AuthService.prototype.resetPassword = function (token, newPassword) {
        return __awaiter(this, void 0, Promise, function () {
            var resetRecords, matchedRecord, _i, resetRecords_2, record, isMatch, user, hashedPassword;
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
                        if (!matchedRecord) {
                            throw new common_1.BadRequestException('Invalid or expired token');
                        }
                        return [4 /*yield*/, this.usersService.findByEmail(matchedRecord.email)];
                    case 6:
                        user = _a.sent();
                        return [4 /*yield*/, bcrypt.hash(newPassword, 10)];
                    case 7:
                        hashedPassword = _a.sent();
                        // Update user password
                        return [4 /*yield*/, this.usersService.update(user.id, { password: hashedPassword })];
                    case 8:
                        // Update user password
                        _a.sent();
                        // Delete all reset records for this user
                        return [4 /*yield*/, this.passwordResetRepository["delete"]({ email: user.email })];
                    case 9:
                        // Delete all reset records for this user
                        _a.sent();
                        // Send confirmation email
                        return [4 /*yield*/, this.mailService.sendPasswordResetConfirmationEmail(user.email, user.firstName)];
                    case 10:
                        // Send confirmation email
                        _a.sent();
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
// Generate JWT token
var payload = { email: newUser.email, sub: newUser.id, role: newUser.role };
return {
    access_token: this.jwtService.sign(payload),
    user: newUser
};
