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
exports.__esModule = true;
exports.EmailService = void 0;
// src/email/email.service.ts
var common_1 = require("@nestjs/common");
var EmailService = /** @class */ (function () {
    function EmailService(mailerService, configService) {
        this.mailerService = mailerService;
        this.configService = configService;
    }
    EmailService.prototype.getAppUrl = function () {
        return this.configService.get('FRONTEND_URL', 'http://localhost:3000');
    };
    EmailService.prototype.getAppName = function () {
        return this.configService.get('APP_NAME', 'Navigo');
    };
    EmailService.prototype.getSupportEmail = function () {
        return this.configService.get('SUPPORT_EMAIL', 'support@navigo.com');
    };
    EmailService.prototype.sendMail = function (to, subject, template, context) {
        return __awaiter(this, void 0, Promise, function () {
            var commonContext;
            return __generator(this, function (_a) {
                commonContext = __assign({ appName: this.getAppName(), appUrl: this.getAppUrl(), supportEmail: this.getSupportEmail(), year: new Date().getFullYear() }, context);
                return [2 /*return*/, this.mailerService.sendMail({
                        to: to,
                        subject: subject,
                        template: template,
                        context: commonContext
                    })];
            });
        });
    };
    EmailService.prototype.sendWelcomeEmail = function (email, firstName) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sendMail(email, "Welcome to " + this.getAppName() + "!", 'welcome', {
                            firstName: firstName,
                            loginUrl: this.getAppUrl() + "/login"
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    EmailService.prototype.sendPasswordResetEmail = function (email, firstName, resetLink) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sendMail(email, this.getAppName() + " - Password Reset Request", 'password-reset', {
                            firstName: firstName,
                            resetLink: resetLink
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    EmailService.prototype.sendPasswordResetConfirmationEmail = function (email, firstName) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sendMail(email, this.getAppName() + " - Password Reset Successful", 'password-reset-confirmation', {
                            firstName: firstName
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    EmailService.prototype.sendBookingConfirmation = function (email, firstName, bookingDetails) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sendMail(email, this.getAppName() + " - Booking Confirmation", 'booking-confirmation', {
                            sendBookingCancellation: function (email, firstName, bookingDetails) {
                                return __awaiter(this, void 0, Promise, function () {
                                    return __generator(this, function (_a) {
                                        return [2 /*return*/];
                                    });
                                });
                            },
                            sendBookingCancellation: function (email, firstName, bookingDetails) {
                                return __awaiter(this, void 0, Promise, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, this.sendMail(email, this.getAppName() + " - Booking Cancelled", 'booking-cancellation', {
                                                    firstName: firstName,
                                                    booking: bookingDetails,
                                                    myBookingsUrl: this.getAppUrl() + "/bookings"
                                                })];
                                            case 1:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                });
                            }
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    EmailService = __decorate([
        common_1.Injectable()
    ], EmailService);
    return EmailService;
}());
exports.EmailService = EmailService;
