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
var auth_service_1 = require("./auth.service");
var users_service_1 = require("../users/users.service");
var jwt_1 = require("@nestjs/jwt");
var bcrypt = require("bcrypt");
describe('AuthService', function () {
    var service;
    var usersService;
    var jwtService;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        var module;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testing_1.Test.createTestingModule({
                        providers: [
                            auth_service_1.AuthService,
                            {
                                provide: users_service_1.UsersService,
                                useValue: {
                                    findByEmail: jest.fn(),
                                    create: jest.fn()
                                }
                            },
                            {
                                provide: jwt_1.JwtService,
                                useValue: {
                                    sign: jest.fn(function () { return 'test-token'; })
                                }
                            },
                        ]
                    }).compile()];
                case 1:
                    module = _a.sent();
                    service = module.get(auth_service_1.AuthService);
                    usersService = module.get(users_service_1.UsersService);
                    jwtService = module.get(jwt_1.JwtService);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should be defined', function () {
        expect(service).toBeDefined();
    });
    describe('validateUser', function () {
        it('should return user object when credentials are valid', function () { return __awaiter(void 0, void 0, void 0, function () {
            var user, _a, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = {
                            id: 'test-id',
                            email: 'test@example.com'
                        };
                        return [4 /*yield*/, bcrypt.hash('test-password', 10)];
                    case 1:
                        user = (_a.password = _b.sent(),
                            _a);
                        jest.spyOn(usersService, 'findByEmail').mockResolvedValue(user);
                        return [4 /*yield*/, service.validateUser('test@example.com', 'test-password')];
                    case 2:
                        result = _b.sent();
                        expect(result).toEqual({
                            id: user.id,
                            email: user.email
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return null when credentials are invalid', function () { return __awaiter(void 0, void 0, void 0, function () {
            var user, _a, result, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = {
                            id: 'test-id',
                            email: 'test@example.com'
                        };
                        return [4 /*yield*/, bcrypt.hash('test-password', 10)];
                    case 1:
                        user = (_a.password = _b.sent(),
                            _a);
                        jest.spyOn(usersService, 'findByEmail').mockResolvedValue(user);
                        return [4 /*yield*/, ];
                    case 2:
                        result = _b.sent();
                        return [4 /*yield*/, service.validateUser('test@example.com', 'wrong-password')];
                    case 3:
                        result = _b.sent();
                        expect(result).toBeNull();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return null when user does not exist', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jest.spyOn(usersService, 'findByEmail').mockResolvedValue(null);
                        return [4 /*yield*/, service.validateUser('nonexistent@example.com', 'test-password')];
                    case 1:
                        result = _a.sent();
                        expect(result).toBeNull();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('login', function () {
        it('should return access token and user when credentials are valid', function () { return __awaiter(void 0, void 0, void 0, function () {
            var user, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = {
                            id: 'test-id',
                            email: 'test@example.com',
                            role: 'tourist'
                        };
                        jest.spyOn(service, 'validateUser').mockResolvedValue(user);
                        jest.spyOn(jwtService, 'sign').mockReturnValue('test-token');
                        return [4 /*yield*/, service.login({ email: 'test@example.com', password: 'test-password' })];
                    case 1:
                        result = _a.sent();
                        expect(result).toEqual({
                            access_token: 'test-token',
                            user: user
                        });
                        expect(jwtService.sign).toHaveBeenCalledWith({
                            email: user.email,
                            sub: user.id,
                            role: user.role
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
