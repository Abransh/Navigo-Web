"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.validate = exports.ConfigModule = void 0;
// src/config/config.module.ts
var common_1 = require("@nestjs/common");
var config_1 = require("@nestjs/config");
var env_validation_1 = require("./env.validation");
var ConfigModule = /** @class */ (function () {
    function ConfigModule() {
    }
    ConfigModule = __decorate([
        common_1.Module({
            imports: [
                config_1.ConfigModule.forRoot({
                    isGlobal: true,
                    envFilePath: ".env." + (process.env.NODE_ENV || 'development'),
                    validate: env_validation_1.validate
                }),
            ]
        })
    ], ConfigModule);
    return ConfigModule;
}());
exports.ConfigModule = ConfigModule;
// src/config/env.validation.ts
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var Environment;
(function (Environment) {
    Environment["Development"] = "development";
    Environment["Production"] = "production";
    Environment["Test"] = "test";
})(Environment || (Environment = {}));
var EnvironmentVariables = /** @class */ (function () {
    function EnvironmentVariables() {
    }
    __decorate([
        class_validator_1.IsEnum(Environment)
    ], EnvironmentVariables.prototype, "NODE_ENV");
    __decorate([
        class_validator_1.IsNumber(),
        class_validator_1.IsOptional()
    ], EnvironmentVariables.prototype, "PORT");
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional()
    ], EnvironmentVariables.prototype, "API_PREFIX");
    __decorate([
        class_validator_1.IsBoolean(),
        class_validator_1.IsOptional()
    ], EnvironmentVariables.prototype, "SWAGGER_ENABLED");
    __decorate([
        class_validator_1.IsString()
    ], EnvironmentVariables.prototype, "JWT_SECRET");
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional()
    ], EnvironmentVariables.prototype, "JWT_EXPIRES_IN");
    __decorate([
        class_validator_1.IsString()
    ], EnvironmentVariables.prototype, "DB_HOST");
    __decorate([
        class_validator_1.IsNumber()
    ], EnvironmentVariables.prototype, "DB_PORT");
    __decorate([
        class_validator_1.IsString()
    ], EnvironmentVariables.prototype, "DB_USERNAME");
    __decorate([
        class_validator_1.IsString()
    ], EnvironmentVariables.prototype, "DB_PASSWORD");
    __decorate([
        class_validator_1.IsString()
    ], EnvironmentVariables.prototype, "DB_DATABASE");
    __decorate([
        class_validator_1.IsBoolean(),
        class_validator_1.IsOptional()
    ], EnvironmentVariables.prototype, "DB_SYNC");
    __decorate([
        class_validator_1.IsBoolean(),
        class_validator_1.IsOptional()
    ], EnvironmentVariables.prototype, "DB_LOGGING");
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional()
    ], EnvironmentVariables.prototype, "CORS_ORIGINS");
    __decorate([
        class_validator_1.IsString()
    ], EnvironmentVariables.prototype, "FRONTEND_URL");
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional()
    ], EnvironmentVariables.prototype, "APP_NAME");
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional()
    ], EnvironmentVariables.prototype, "SUPPORT_EMAIL");
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional()
    ], EnvironmentVariables.prototype, "MAIL_HOST");
    __decorate([
        class_validator_1.IsNumber(),
        class_validator_1.IsOptional()
    ], EnvironmentVariables.prototype, "MAIL_PORT");
    __decorate([
        class_validator_1.IsBoolean(),
        class_validator_1.IsOptional()
    ], EnvironmentVariables.prototype, "MAIL_SECURE");
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional()
    ], EnvironmentVariables.prototype, "MAIL_USER");
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional()
    ], EnvironmentVariables.prototype, "MAIL_PASSWORD");
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsOptional()
    ], EnvironmentVariables.prototype, "MAIL_FROM");
    return EnvironmentVariables;
}());
function validate(config) {
    var validatedConfig = class_transformer_1.plainToClass(EnvironmentVariables, config, {
        enableImplicitConversion: true
    });
    var errors = class_validator_1.validateSync(validatedConfig, {
        skipMissingProperties: false
    });
    if (errors.length > 0) {
        throw new Error("Environment validation failed: " + errors.toString());
    }
    return validatedConfig;
}
exports.validate = validate;
