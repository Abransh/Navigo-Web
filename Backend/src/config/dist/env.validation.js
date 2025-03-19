"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.validate = exports.Environment = void 0;
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var Environment;
(function (Environment) {
    Environment["Development"] = "development";
    Environment["Production"] = "production";
    Environment["Test"] = "test";
})(Environment = exports.Environment || (exports.Environment = {}));
var EnvironmentVariables = /** @class */ (function () {
    function EnvironmentVariables() {
        this.NODE_ENV = Environment.Development;
        this.PORT = 3001;
        this.API_PREFIX = 'api';
        this.CORS_ORIGINS = 'http://localhost:3000,http://localhost:3001';
        this.THROTTLE_TTL = 60;
        this.THROTTLE_LIMIT = 10;
        this.SWAGGER_ENABLED = true;
        // Database configurations
        this.DB_HOST = 'localhost';
        this.DB_PORT = 5432;
        this.DB_USERNAME = 'postgres';
        this.DB_PASSWORD = 'postgres';
        this.DB_DATABASE = 'navigo';
    }
    __decorate([
        class_validator_1.IsEnum(Environment),
        class_validator_1.IsOptional()
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
        class_validator_1.IsString(),
        class_validator_1.IsOptional()
    ], EnvironmentVariables.prototype, "CORS_ORIGINS");
    __decorate([
        class_validator_1.IsNumber(),
        class_validator_1.IsOptional()
    ], EnvironmentVariables.prototype, "THROTTLE_TTL");
    __decorate([
        class_validator_1.IsNumber(),
        class_validator_1.IsOptional()
    ], EnvironmentVariables.prototype, "THROTTLE_LIMIT");
    __decorate([
        class_validator_1.IsBoolean(),
        class_validator_1.IsOptional()
    ], EnvironmentVariables.prototype, "SWAGGER_ENABLED");
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
        throw new Error("Configuration validation failed: " + errors.toString());
    }
    return validatedConfig;
}
exports.validate = validate;
