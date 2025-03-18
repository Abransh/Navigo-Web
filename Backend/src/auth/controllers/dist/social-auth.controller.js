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
exports.__esModule = true;
exports.SocialAuthController = void 0;
// Backend/src/auth/controllers/social-auth.controller.ts
var common_1 = require("@nestjs/common");
var passport_1 = require("@nestjs/passport");
var swagger_1 = require("@nestjs/swagger");
var SocialAuthController = /** @class */ (function () {
    function SocialAuthController(configService) {
        this.configService = configService;
    }
    // Google Authentication
    SocialAuthController.prototype.googleAuth = function () {
        // This route initiates Google OAuth flow
        // The actual logic is handled by the GoogleStrategy
    };
    SocialAuthController.prototype.googleAuthCallback = function (req, res) {
        var token = req.user.access_token;
        var frontendUrl = this.configService.get('FRONTEND_URL', 'http://localhost:3000');
        // Redirect to frontend with token
        return res.redirect(frontendUrl + "/auth/callback?token=" + token);
    };
    // Facebook Authentication
    SocialAuthController.prototype.facebookAuth = function () {
        // This route initiates Facebook OAuth flow
        // The actual logic is handled by the FacebookStrategy
    };
    SocialAuthController.prototype.facebookAuthCallback = function (req, res) {
        var token = req.user.access_token;
        var frontendUrl = this.configService.get('FRONTEND_URL', 'http://localhost:3000');
        // Redirect to frontend with token
        return res.redirect(frontendUrl + "/auth/callback?token=" + token);
    };
    // Apple Authentication
    SocialAuthController.prototype.appleAuth = function () {
        // This route initiates Apple OAuth flow
        // The actual logic is handled by the AppleStrategy
    };
    SocialAuthController.prototype.appleAuthCallback = function (req, res) {
        var token = req.user.access_token;
        var frontendUrl = this.configService.get('FRONTEND_URL', 'http://localhost:3000');
        // Redirect to frontend with token
        return res.redirect(frontendUrl + "/auth/callback?token=" + token);
    };
    __decorate([
        common_1.Get('google'),
        common_1.UseGuards(passport_1.AuthGuard('google')),
        swagger_1.ApiOperation({ summary: 'Initiate Google OAuth login' }),
        swagger_1.ApiResponse({ status: 302, description: 'Redirect to Google OAuth page' })
    ], SocialAuthController.prototype, "googleAuth");
    __decorate([
        common_1.Get('google/callback'),
        common_1.UseGuards(passport_1.AuthGuard('google')),
        swagger_1.ApiOperation({ summary: 'Google OAuth callback' }),
        swagger_1.ApiResponse({ status: 302, description: 'Redirect to frontend with token' }),
        __param(0, common_1.Req()), __param(1, common_1.Res())
    ], SocialAuthController.prototype, "googleAuthCallback");
    __decorate([
        common_1.Get('facebook'),
        common_1.UseGuards(passport_1.AuthGuard('facebook')),
        swagger_1.ApiOperation({ summary: 'Initiate Facebook OAuth login' }),
        swagger_1.ApiResponse({ status: 302, description: 'Redirect to Facebook OAuth page' })
    ], SocialAuthController.prototype, "facebookAuth");
    __decorate([
        common_1.Get('facebook/callback'),
        common_1.UseGuards(passport_1.AuthGuard('facebook')),
        swagger_1.ApiOperation({ summary: 'Facebook OAuth callback' }),
        swagger_1.ApiResponse({ status: 302, description: 'Redirect to frontend with token' }),
        __param(0, common_1.Req()), __param(1, common_1.Res())
    ], SocialAuthController.prototype, "facebookAuthCallback");
    __decorate([
        common_1.Get('apple'),
        common_1.UseGuards(passport_1.AuthGuard('apple')),
        swagger_1.ApiOperation({ summary: 'Initiate Apple OAuth login' }),
        swagger_1.ApiResponse({ status: 302, description: 'Redirect to Apple OAuth page' })
    ], SocialAuthController.prototype, "appleAuth");
    __decorate([
        common_1.Get('apple/callback'),
        common_1.UseGuards(passport_1.AuthGuard('apple')),
        swagger_1.ApiOperation({ summary: 'Apple OAuth callback' }),
        swagger_1.ApiResponse({ status: 302, description: 'Redirect to frontend with token' }),
        __param(0, common_1.Req()), __param(1, common_1.Res())
    ], SocialAuthController.prototype, "appleAuthCallback");
    SocialAuthController = __decorate([
        swagger_1.ApiTags('auth'),
        common_1.Controller('auth')
    ], SocialAuthController);
    return SocialAuthController;
}());
exports.SocialAuthController = SocialAuthController;
