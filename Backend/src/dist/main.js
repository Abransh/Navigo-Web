"use strict";
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
// src/main.ts
var core_1 = require("@nestjs/core");
var app_module_1 = require("./app.module");
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var helmet_1 = require("helmet");
var compression = require("compression");
var config_1 = require("@nestjs/config");
var common_2 = require("@nestjs/common");
function bootstrap() {
    return __awaiter(this, void 0, void 0, function () {
        var logger, app, configService, frontendUrl, corsOriginsStr, corsOrigins, apiPrefix, swaggerConfig, document, port;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logger = new common_2.Logger('Bootstrap');
                    return [4 /*yield*/, core_1.NestFactory.create(app_module_1.AppModule)];
                case 1:
                    app = _a.sent();
                    configService = app.get(config_1.ConfigService);
                    // Security settings
                    app.use(helmet_1["default"]({
                        // Allow OAuth redirects by not blocking iframe loading
                        contentSecurityPolicy: false,
                        crossOriginEmbedderPolicy: false
                    }));
                    app.use(compression()); // Response compression
                    frontendUrl = configService.get('FRONTEND_URL', 'http://localhost:3000');
                    corsOriginsStr = configService.get('CORS_ORIGINS', 'http://localhost:3000');
                    corsOrigins = corsOriginsStr.split(',').map(function (origin) { return origin.trim(); });
                    logger.log("Configuring CORS for origins: " + corsOrigins.join(', '));
                    app.enableCors({
                        origin: corsOrigins,
                        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
                        credentials: true,
                        allowedHeaders: ['Authorization', 'Content-Type'],
                        maxAge: 86400
                    });
                    apiPrefix = configService.get('API_PREFIX', 'api');
                    // Apply global prefix but DO NOT exclude the auth routes
                    // This way, all routes will have the /api prefix
                    app.setGlobalPrefix('api');
                    // Set up global validation pipe
                    app.useGlobalPipes(new common_1.ValidationPipe({
                        whitelist: true,
                        forbidNonWhitelisted: true,
                        transform: true,
                        transformOptions: {
                            enableImplicitConversion: true
                        }
                    }));
                    // Setup Swagger documentation
                    if (configService.get('NODE_ENV') !== 'production' || configService.get('SWAGGER_ENABLED', false)) {
                        swaggerConfig = new swagger_1.DocumentBuilder()
                            .setTitle('Navigo API')
                            .setDescription('The Navigo travel platform API documentation')
                            .setVersion('1.0')
                            .addBearerAuth()
                            .build();
                        document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
                        swagger_1.SwaggerModule.setup('docs', app, document);
                        logger.log("Swagger documentation enabled at /docs");
                    }
                    port = configService.get('PORT', 3001);
                    return [4 /*yield*/, app.listen(port)];
                case 2:
                    _a.sent();
                    logger.log("Application is running on: http://localhost:" + port);
                    logger.log("Environment: " + configService.get('NODE_ENV', 'development'));
                    // Log important information for OAuth debugging
                    logger.log("API URL with prefix: http://localhost:" + port + "/" + apiPrefix);
                    logger.log("Google Auth URL: http://localhost:" + port + "/" + apiPrefix + "/auth/google");
                    logger.log("Google Callback URL: " + configService.get('GOOGLE_CALLBACK_URL'));
                    return [2 /*return*/];
            }
        });
    });
}
bootstrap();
