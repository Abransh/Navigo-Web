"use strict";
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
exports.MailService = void 0;
// Backend/src/mail/mail.service.ts
var common_1 = require("@nestjs/common");
var MailService = /** @class */ (function () {
    function MailService(mailerService, configService) {
        this.mailerService = mailerService;
        this.configService = configService;
    }
    MailService.prototype.sendPasswordResetEmail = function (email, firstName, resetLink) {
        return __awaiter(this, void 0, Promise, function () {
            var appName, supportEmail;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        appName = this.configService.get('APP_NAME', 'Navigo');
                        supportEmail = this.configService.get('MAIL_FROM', 'noreply@navigo.com');
                        return [4 /*yield*/, this.mailerService.sendMail({
                                to: email,
                                subject: appName + " - Password Reset Request",
                                template: 'password-reset',
                                context: {
                                    firstName: firstName,
                                    resetLink: resetLink,
                                    appName: appName,
                                    supportEmail: supportEmail,
                                    year: new Date().getFullYear()
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MailService.prototype.sendPasswordResetConfirmationEmail = function (email, firstName) {
        return __awaiter(this, void 0, Promise, function () {
            var appName, supportEmail, loginLink;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        appName = this.configService.get('APP_NAME', 'Navigo');
                        supportEmail = this.configService.get('MAIL_FROM', 'noreply@navigo.com');
                        loginLink = this.configService.get('FRONTEND_URL', 'http://localhost:3000') + '/login';
                        return [4 /*yield*/, this.mailerService.sendMail({
                                to: email,
                                subject: appName + " - Password Reset Successful",
                                template: 'password-reset-confirmation',
                                context: {
                                    firstName: firstName,
                                    loginLink: loginLink,
                                    appName: appName,
                                    supportEmail: supportEmail,
                                    year: new Date().getFullYear()
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MailService.prototype.sendWelcomeEmail = function (email, firstName) {
        return __awaiter(this, void 0, Promise, function () {
            var appName, supportEmail;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        appName = this.configService.get('APP_NAME', 'Navigo');
                        supportEmail = this.configService.get('MAIL_FROM', 'noreply@navigo.com');
                        return [4 /*yield*/, this.mailerService.sendMail({
                                to: email,
                                subject: "Welcome to " + appName + "!",
                                template: 'welcome',
                                context: {
                                    firstName: firstName,
                                    appName: appName,
                                    supportEmail: supportEmail,
                                    year: new Date().getFullYear()
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MailService = __decorate([
        common_1.Injectable()
    ], MailService);
    return MailService;
}());
exports.MailService = MailService;
