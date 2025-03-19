"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthModule = void 0;
// src/auth/auth.module.ts
var common_1 = require("@nestjs/common");
var jwt_1 = require("@nestjs/jwt");
var passport_1 = require("@nestjs/passport");
var config_1 = require("@nestjs/config");
var typeorm_1 = require("@nestjs/typeorm");
// Controllers
var auth_controller_1 = require("./auth.controller");
var social_auth_controller_1 = require("./controllers/social-auth.controller");
var routes_debug_controller_1 = require("./controllers/routes-debug.controller");
// Services
var auth_service_1 = require("./auth.service");
// Strategies
var jwt_strategy_1 = require("./strategies/jwt.strategy");
var google_strategy_1 = require("./strategies/google.strategy");
var facebook_strategy_1 = require("./strategies/facebook.strategy");
var apple_strategy_1 = require("./strategies/apple.strategy");
// Repositories
var password_reset_repository_1 = require("./repositories/password-reset.repository");
// Entities
var password_reset_entity_1 = require("./entities/password-reset.entity");
var social_profile_entity_1 = require("./entities/social-profile.entity");
// Modules
var users_module_1 = require("../users/users.module");
var email_module_1 = require("../email/email.module");
var AuthModule = /** @class */ (function () {
    function AuthModule() {
    }
    AuthModule = __decorate([
        common_1.Module({
            imports: [
                users_module_1.UsersModule,
                email_module_1.EmailModule,
                passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
                typeorm_1.TypeOrmModule.forFeature([password_reset_entity_1.PasswordReset, social_profile_entity_1.SocialProfile]),
                jwt_1.JwtModule.registerAsync({
                    imports: [config_1.ConfigModule],
                    inject: [config_1.ConfigService],
                    useFactory: function (configService) { return ({
                        secret: configService.get('JWT_SECRET'),
                        signOptions: {
                            expiresIn: configService.get('JWT_EXPIRES_IN', '1d')
                        }
                    }); }
                }),
            ],
            controllers: [auth_controller_1.AuthController, social_auth_controller_1.SocialAuthController, routes_debug_controller_1.RoutesDebugController],
            providers: [
                auth_service_1.AuthService,
                jwt_strategy_1.JwtStrategy,
                google_strategy_1.GoogleStrategy,
                facebook_strategy_1.FacebookStrategy,
                apple_strategy_1.AppleStrategy,
                password_reset_repository_1.PasswordResetRepository,
            ],
            exports: [auth_service_1.AuthService,
                password_reset_repository_1.PasswordResetRepository,
                jwt_1.JwtModule,
                passport_1.PassportModule,
            ]
        })
    ], AuthModule);
    return AuthModule;
}());
exports.AuthModule = AuthModule;
