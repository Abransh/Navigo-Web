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
exports.RootAuthController = void 0;
// src/auth/controllers/root-auth.controller.ts
var common_1 = require("@nestjs/common");
var passport_1 = require("@nestjs/passport");
var swagger_1 = require("@nestjs/swagger");
/**
 * Special controller to handle auth routes at the root path (without the /api prefix)
 * This allows Google OAuth to work even if it redirects to /auth/google/callback
 * instead of /api/auth/google/callback
 */
var RootAuthController = /** @class */ (function () {
    function RootAuthController(configService) {
        this.configService = configService;
    }
    RootAuthController.prototype.googleAuth = function () {
        // This route initiates Google OAuth flow
        // The actual logic is handled by the GoogleStrategy
    };
    RootAuthController.prototype.googleAuthCallback = function (req, res) {
        try {
            if (!req.user) {
                console.error('Google callback: User not found in request');
                return res.redirect(this.configService.get('FRONTEND_URL') + "/auth/callback?error=authentication_failed");
            }
            var token = req.user.access_token;
            if (!token) {
                console.error('Google callback: Token not found in user object', req.user);
                return res.redirect(this.configService.get('FRONTEND_URL') + "/auth/callback?error=token_missing");
            }
            // Get the frontend URL from environment variables
            var frontendUrl = this.configService.get('FRONTEND_URL', 'http://localhost:3000');
            // Redirect to the frontend with the token as a URL parameter
            return res.redirect(frontendUrl + "/auth/callback?token=" + token);
        }
        catch (error) {
            console.error('Google callback error:', error);
            return res.redirect(this.configService.get('FRONTEND_URL') + "/auth/callback?error=server_error");
        }
    };
    __decorate([
        common_1.Get('auth/google'),
        common_1.UseGuards(passport_1.AuthGuard('google')),
        swagger_1.ApiExcludeEndpoint() // Hide from Swagger
    ], RootAuthController.prototype, "googleAuth");
    __decorate([
        common_1.Get('auth/google/callback'),
        common_1.UseGuards(passport_1.AuthGuard('google')),
        swagger_1.ApiExcludeEndpoint() // Hide from Swagger
        ,
        __param(0, common_1.Req()), __param(1, common_1.Res())
    ], RootAuthController.prototype, "googleAuthCallback");
    RootAuthController = __decorate([
        swagger_1.ApiTags('auth-root'),
        common_1.Controller()
    ], RootAuthController);
    return RootAuthController;
}());
exports.RootAuthController = RootAuthController;
