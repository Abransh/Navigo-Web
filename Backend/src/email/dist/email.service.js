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
exports.EmailModule = exports.EmailService = void 0;
// src/email/email.service.ts
var common_1 = require("@nestjs/common");
var nodemailer = require("nodemailer");
var EmailService = /** @class */ (function () {
    function EmailService(configService) {
        this.configService = configService;
        this.transporter = nodemailer.createTransport({
            host: configService.get('MAIL_HOST'),
            port: configService.get('MAIL_PORT'),
            secure: configService.get('MAIL_SECURE', false),
            auth: {
                user: configService.get('MAIL_USER'),
                pass: configService.get('MAIL_PASSWORD')
            }
        });
    }
    EmailService.prototype.sendMail = function (to, subject, html) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.transporter.sendMail({
                        from: "\"Navigo\" <" + this.configService.get('MAIL_FROM') + ">",
                        to: to,
                        subject: subject,
                        html: html
                    })];
            });
        });
    };
    EmailService.prototype.sendWelcomeEmail = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var subject, html;
            return __generator(this, function (_a) {
                subject = 'Welcome to Navigo!';
                html = "\n      <h1>Welcome to Navigo, " + user.firstName + "!</h1>\n      <p>Thank you for joining our community. We're excited to help you explore India with local companions.</p>\n      <p>Get started by:</p>\n      <ul>\n        <li>Completing your profile</li>\n        <li>Browsing available companions</li>\n        <li>Making your first booking</li>\n      </ul>\n      <p>Safe travels!</p>\n      <p>The Navigo Team</p>\n    ";
                return [2 /*return*/, this.sendMail(user.email, subject, html)];
            });
        });
    };
    EmailService.prototype.sendBookingConfirmation = function (booking, userEmail) {
        return __awaiter(this, void 0, void 0, function () {
            var subject, html;
            return __generator(this, function (_a) {
                subject = 'Booking Confirmation';
                html = "\n      <h1>Your Booking is Confirmed!</h1>\n      <p>Your booking with " + booking.companion.user.firstName + " has been confirmed.</p>\n      <p><strong>Details:</strong></p>\n      <ul>\n        <li>Date: " + new Date(booking.startDate).toLocaleDateString() + " - " + new Date(booking.endDate).toLocaleDateString() + "</li>\n        <li>Location: " + booking.location + "</li>\n        <li>Total Amount: \u20B9" + booking.totalAmount + "</li>\n      </ul>\n      <p>You can contact your companion through the chat in our app.</p>\n      <p>Enjoy your experience!</p>\n      <p>The Navigo Team</p>\n    ";
                return [2 /*return*/, this.sendMail(userEmail, subject, html)];
            });
        });
    };
    EmailService = __decorate([
        common_1.Injectable()
    ], EmailService);
    return EmailService;
}());
exports.EmailService = EmailService;
// src/email/email.module.ts
var common_2 = require("@nestjs/common");
var email_service_1 = require("./email.service");
exports.EmailService = email_service_1.EmailService;
var config_1 = require("@nestjs/config");
var EmailModule = /** @class */ (function () {
    function EmailModule() {
    }
    EmailModule = __decorate([
        common_2.Module({
            imports: [config_1.ConfigModule],
            providers: [email_service_1.EmailService],
            exports: [email_service_1.EmailService]
        })
    ], EmailModule);
    return EmailModule;
}());
exports.EmailModule = EmailModule;
