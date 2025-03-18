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
var testing_1 = require("@nestjs/testing");
var common_1 = require("@nestjs/common");
var request = require("supertest");
var app_module_1 = require("../src/app.module");
var typeorm_1 = require("@nestjs/typeorm");
var user_entity_1 = require("../src/users/entities/user.entity");
var bcrypt = require("bcrypt");
describe('AuthController (e2e)', function () {
    var app;
    var userRepository;
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var moduleFixture;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testing_1.Test.createTestingModule({
                        imports: [app_module_1.AppModule]
                    }).compile()];
                case 1:
                    moduleFixture = _a.sent();
                    app = moduleFixture.createNestApplication();
                    app.useGlobalPipes(new common_1.ValidationPipe());
                    userRepository = moduleFixture.get(typeorm_1.getRepositoryToken(user_entity_1.User));
                    return [4 /*yield*/, app.init()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // Clear the user repository before each test
                return [4 /*yield*/, userRepository.clear()];
                case 1:
                    // Clear the user repository before each test
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, app.close()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('/auth/register (POST)', function () {
        it('should register a new user and return access token', function () {
            return request(app.getHttpServer())
                .post('/auth/register')
                .send({
                firstName: 'Test',
                lastName: 'User',
                email: 'test@example.com',
                password: 'password123',
                role: 'tourist'
            })
                .expect(201)
                .expect(function (res) {
                expect(res.body).toHaveProperty('access_token');
                expect(res.body).toHaveProperty('user');
                expect(res.body.user).toHaveProperty('id');
                expect(res.body.user.email).toBe('test@example.com');
            });
        });
        it('should return 400 when email is already in use', function () { return __awaiter(void 0, void 0, void 0, function () {
            var hashedPassword;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bcrypt.hash('password123', 10)];
                    case 1:
                        hashedPassword = _a.sent();
                        return [4 /*yield*/, userRepository.save({
                                firstName: 'Existing',
                                lastName: 'User',
                                email: 'test@example.com',
                                password: hashedPassword,
                                role: 'tourist'
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, request(app.getHttpServer())
                                .post('/auth/register')
                                .send({
                                firstName: 'Test',
                                lastName: 'User',
                                email: 'test@example.com',
                                password: 'password123',
                                role: 'tourist'
                            })
                                .expect(400)];
                }
            });
        }); });
    });
    describe('/auth/login (POST)', function () {
        it('should return access token when credentials are valid', function () { return __awaiter(void 0, void 0, void 0, function () {
            var hashedPassword;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bcrypt.hash('password123', 10)];
                    case 1:
                        hashedPassword = _a.sent();
                        return [4 /*yield*/, userRepository.save({
                                firstName: 'Test',
                                lastName: 'User',
                                email: 'test@example.com',
                                password: hashedPassword,
                                role: 'tourist'
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, request(app.getHttpServer())
                                .post('/auth/login')
                                .send({
                                email: 'test@example.com',
                                password: 'password123'
                            })
                                .expect(200)
                                .expect(function (res) {
                                expect(res.body).toHaveProperty('access_token');
                                expect(res.body).toHaveProperty('user');
                            })];
                }
            });
        }); });
        it('should return 401 when credentials are invalid', function () { return __awaiter(void 0, void 0, void 0, function () {
            var hashedPassword;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bcrypt.hash('password123', 10)];
                    case 1:
                        hashedPassword = _a.sent();
                        return [4 /*yield*/, userRepository.save({
                                firstName: 'Test',
                                lastName: 'User',
                                email: 'test@example.com',
                                password: hashedPassword,
                                role: 'tourist'
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, request(app.getHttpServer())
                                .post('/auth/login')
                                .send({
                                email: 'test@example.com',
                                password: 'wrong-password'
                            })
                                .expect(401)];
                }
            });
        }); });
    });
});
