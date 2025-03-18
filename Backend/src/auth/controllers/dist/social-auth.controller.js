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
/**
 * Social Auth Controller
 *
 * Handles OAuth authentication flows with social providers like
 * Google, Facebook, and Apple.
 */
var SocialAuthController = /** @class */ (function () {
    function SocialAuthController(configService) {
        this.configService = configService;
    }
    /**
     * Google Authentication
     *
     * This endpoint initiates the Google OAuth flow by redirecting to Google's login page.
     * The user is prompted to select their Google account and grant permissions.
     */
    SocialAuthController.prototype.googleAuth = function () {
        // This route initiates Google OAuth flow
        // The actual logic is handled by the GoogleStrategy
    };
    /**
     * Google Authentication Callback
     *
     * This endpoint handles the callback from Google after successful authentication.
     * It receives the authorization code, exchanges it for tokens, and redirects to the frontend.
     */
    SocialAuthController.prototype.googleAuthCallback = function (req, res) {
        // Extract the access token from the authenticated user
        var token = req.user.access_token;
        // Get the frontend URL from environment variables
        var frontendUrl = this.configService.get('FRONTEND_URL', 'http://localhost:3000');
        // Redirect to the frontend with the token as a URL parameter
        return res.redirect(frontendUrl + "/auth/callback?token=" + token);
    };
    /**
     * Facebook Authentication
     *
     * This endpoint initiates the Facebook OAuth flow by redirecting to Facebook's login page.
     * The user is prompted to login to Facebook and grant permissions.
     */
    SocialAuthController.prototype.facebookAuth = function () {
        // This route initiates Facebook OAuth flow
        // The actual logic is handled by the FacebookStrategy
    };
    /**
     * Facebook Authentication Callback
     *
     * This endpoint handles the callback from Facebook after successful authentication.
     * It receives the authorization code, exchanges it for tokens, and redirects to the frontend.
     */
    SocialAuthController.prototype.facebookAuthCallback = function (req, res) {
        var token = req.user.access_token;
        var frontendUrl = this.configService.get('FRONTEND_URL', 'http://localhost:3000');
        // Redirect to the frontend with the token as a URL parameter
        return res.redirect(frontendUrl + "/auth/callback?token=" + token);
    };
    /**
     * Apple Authentication
     *
     * This endpoint initiates the Apple Sign In flow by redirecting to Apple's sign-in page.
     * The user is prompted to sign in with their Apple ID and grant permissions.
     */
    SocialAuthController.prototype.appleAuth = function () {
        // This route initiates Apple OAuth flow
        // The actual logic is handled by the AppleStrategy
    };
    /**
     * Apple Authentication Callback
     *
     * This endpoint handles the callback from Apple after successful authentication.
     * It receives the user data and token, and redirects to the frontend.
     */
    SocialAuthController.prototype.appleAuthCallback = function (req, res) {
        var token = req.user.access_token;
        var frontendUrl = this.configService.get('FRONTEND_URL', 'http://localhost:3000');
        // Redirect to the frontend with the token as a URL parameter
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
        swagger_1.ApiOperation({ summary: 'Handle Google OAuth callback' }),
        swagger_1.ApiResponse({
            status: 302,
            description: 'Redirect to frontend with auth token'
        }),
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
        swagger_1.ApiOperation({ summary: 'Handle Facebook OAuth callback' }),
        swagger_1.ApiResponse({ status: 302, description: 'Redirect to frontend with auth token' }),
        __param(0, common_1.Req()), __param(1, common_1.Res())
    ], SocialAuthController.prototype, "facebookAuthCallback");
    __decorate([
        common_1.Get('apple'),
        common_1.UseGuards(passport_1.AuthGuard('apple')),
        swagger_1.ApiOperation({ summary: 'Initiate Apple Sign In' }),
        swagger_1.ApiResponse({ status: 302, description: 'Redirect to Apple Sign In page' })
    ], SocialAuthController.prototype, "appleAuth");
    __decorate([
        common_1.Get('apple/callback'),
        common_1.UseGuards(passport_1.AuthGuard('apple')),
        swagger_1.ApiOperation({ summary: 'Handle Apple Sign In callback' }),
        swagger_1.ApiResponse({ status: 302, description: 'Redirect to frontend with auth token' }),
        __param(0, common_1.Req()), __param(1, common_1.Res())
    ], SocialAuthController.prototype, "appleAuthCallback");
    SocialAuthController = __decorate([
        swagger_1.ApiTags('auth'),
        common_1.Controller('auth')
    ], SocialAuthController);
    return SocialAuthController;
}());
exports.SocialAuthController = SocialAuthController;
