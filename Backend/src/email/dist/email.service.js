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
exports.EmailService = void 0;
var common_1 = require("@nestjs/common");
var nodemailer = require("nodemailer");
var EmailService = /** @class */ (function () {
    function EmailService(configService) {
        this.configService = configService;
        this.transporter = nodemailer.createTransport({
            host: this.configService.get('SMTP_HOST'),
            port: this.configService.get('SMTP_PORT'),
            auth: {
                user: this.configService.get('SMTP_USER'),
                pass: this.configService.get('SMTP_PASS')
            }
        });
    }
    EmailService.prototype.sendRegistrationConfirmation = function (to, verificationLink) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.transporter.sendMail({
                            from: '"Navigo" <no-reply@navigo.com>',
                            to: to,
                            subject: 'Welcome to Navigo - Please Verify Your Email',
                            text: "Welcome to Navigo! Please verify your email by clicking the following link: " + verificationLink,
                            html: "\n        <div style=\"font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;\">\n          <h2>Welcome to Navigo!</h2>\n          <p>Thank you for joining our platform. To complete your registration, please verify your email address by clicking the button below:</p>\n          <p>\n            <a href=\"" + verificationLink + "\" style=\"display: inline-block; background-color: #F3A522; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 15px;\">\n              Verify Email\n            </a>\n          </p>\n          <p>If the button doesn't work, copy and paste this link into your browser:</p>\n          <p>" + verificationLink + "</p>\n          <p>If you didn't create an account with us, please ignore this email.</p>\n          <p>Best regards,<br>The Navigo Team</p>\n        </div>\n      "
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    EmailService.prototype.sendBookingConfirmation = function (to, bookingDetails) {
        return __awaiter(this, void 0, Promise, function () {
            var formatDate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        formatDate = function (date) {
                            return new Date(date).toLocaleString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            });
                        };
                        return [4 /*yield*/, this.transporter.sendMail({
                                from: '"Navigo" <no-reply@navigo.com>',
                                to: to,
                                subject: "Booking Confirmation - Navigo (ID: " + bookingDetails.id + ")",
                                text: "Your booking with " + bookingDetails.companionName + " has been confirmed! Details: From " + formatDate(bookingDetails.startDate) + " to " + formatDate(bookingDetails.endDate) + " at " + bookingDetails.location + ". Total amount: $" + bookingDetails.totalAmount.toFixed(2),
                                html: "\n        <div style=\"font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;\">\n          <h2>Booking Confirmation</h2>\n          <p>Your booking with <strong>" + bookingDetails.companionName + "</strong> has been confirmed!</p>\n          \n          <div style=\"background-color: #f7f7f7; padding: 15px; border-radius: 5px; margin: 20px 0;\">\n            <p><strong>Booking ID:</strong> " + bookingDetails.id + "</p>\n            <p><strong>Start:</strong> " + formatDate(bookingDetails.startDate) + "</p>\n            <p><strong>End:</strong> " + formatDate(bookingDetails.endDate) + "</p>\n            <p><strong>Location:</strong> " + bookingDetails.location + "</p>\n            <p><strong>Total Amount:</strong> $" + bookingDetails.totalAmount.toFixed(2) + "</p>\n          </div>\n          \n          <p>We hope you have a great experience with your local companion!</p>\n          <p>Best regards,<br>The Navigo Team</p>\n        </div>\n      "
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
