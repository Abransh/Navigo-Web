"use strict";
// src/auth/controllers/routes-debug.controller.ts
// Add this file to your Backend/src/auth/controllers folder
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RoutesDebugController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var RoutesDebugController = /** @class */ (function () {
    function RoutesDebugController() {
    }
    RoutesDebugController.prototype.checkAuthRoutes = function () {
        return {
            status: 'success',
            message: 'Auth routes debug endpoint is accessible',
            routes: [
                '/api/auth/google',
                '/api/auth/facebook',
                '/api/auth/apple',
                '/api/auth/login',
                '/api/auth/register'
            ]
        };
    };
    __decorate([
        common_1.Get('auth-routes'),
        swagger_1.ApiOperation({ summary: 'Check if auth routes are available' })
    ], RoutesDebugController.prototype, "checkAuthRoutes");
    RoutesDebugController = __decorate([
        swagger_1.ApiTags('debug'),
        common_1.Controller('debug')
    ], RoutesDebugController);
    return RoutesDebugController;
}());
exports.RoutesDebugController = RoutesDebugController;
// Then add this controller to your auth.module.ts:
// controllers: [AuthController, SocialAuthController, RoutesDebugController],
