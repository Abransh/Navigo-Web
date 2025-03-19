"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ConfigModule = void 0;
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
                    envFilePath: [
                        ".env." + (process.env.NODE_ENV || 'development'),
                        '.env'
                    ],
                    validate: env_validation_1.validate
                }),
            ],
            exports: [config_1.ConfigModule]
        })
    ], ConfigModule);
    return ConfigModule;
}());
exports.ConfigModule = ConfigModule;
