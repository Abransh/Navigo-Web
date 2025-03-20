"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.GoogleStrategy = void 0;
// src/auth/strategies/google.strategy.ts - Updated version with better error handling
var passport_1 = require("@nestjs/passport");
var passport_google_oauth20_1 = require("passport-google-oauth20");
var common_1 = require("@nestjs/common");
var GoogleStrategy = /** @class */ (function (_super) {
    __extends(GoogleStrategy, _super);
    function GoogleStrategy(configService, authService) {
        var _this = this;
        var clientID = configService.get('GOOGLE_CLIENT_ID');
        var clientSecret = configService.get('GOOGLE_CLIENT_SECRET');
        var callbackURL = configService.get('GOOGLE_CALLBACK_URL');
        var missingConfigs = [];
        if (!clientID)
            missingConfigs.push('GOOGLE_CLIENT_ID');
        if (!clientSecret)
            missingConfigs.push('GOOGLE_CLIENT_SECRET');
        if (!callbackURL)
            missingConfigs.push('GOOGLE_CALLBACK_URL');
        if (missingConfigs.length > 0) {
            var errorMsg = "Missing required Google OAuth configuration: " + missingConfigs.join(', ');
            _this.logger.error(errorMsg);
            throw new Error(errorMsg);
        }
        _this = _super.call(this, {
            clientID: clientID,
            clientSecret: clientSecret,
            callbackURL: callbackURL,
            scope: ['email', 'profile'],
            passReqToCallback: true
        }) || this;
        _this.configService = configService;
        _this.authService = authService;
        _this.logger = new common_1.Logger(GoogleStrategy_1.name);
        _this.logger.log("Initializing Google Strategy with callback URL: " + callbackURL);
        return _this;
    }
    GoogleStrategy_1 = GoogleStrategy;
    GoogleStrategy.prototype.validate = function (req, accessToken, refreshToken, profile, done) {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var name, emails, photos, user;
            return __generator(this, function (_b) {
                try {
                    this.logger.log("Validating Google profile for user: " + ((_a = profile.emails[0]) === null || _a === void 0 ? void 0 : _a.value));
                    name = profile.name, emails = profile.emails, photos = profile.photos;
                    if (!emails || emails.length === 0) {
                        this.logger.error('No email provided in Google profile');
                        throw new Error('No email provided from Google');
                    }
                    user = {
                        email: emails[0].value,
                        firstName: name.givenName,
                        lastName: name.familyName,
                        picture: photos && photos[0] ? photos[0].value : undefined,
                        accessToken: accessToken,
                        provider: 'google'
                    };
                    return [2 /*return*/, this.authService.validateSocialLogin(user)];
                }
                catch (error) {
                    this.logger.error("Google authentication error: " + error.message, error.stack);
                    throw error;
                }
                return [2 /*return*/];
            });
        });
    };
    var GoogleStrategy_1;
    GoogleStrategy = GoogleStrategy_1 = __decorate([
        common_1.Injectable()
    ], GoogleStrategy);
    return GoogleStrategy;
}(passport_1.PassportStrategy(passport_google_oauth20_1.Strategy, 'google')));
exports.GoogleStrategy = GoogleStrategy;
