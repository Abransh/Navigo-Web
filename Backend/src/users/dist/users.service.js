"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.UsersService = void 0;
// Backend/src/users/users.service.ts
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var bcrypt = require("bcrypt");
var user_entity_1 = require("./entities/user.entity");
var UsersService = /** @class */ (function () {
    function UsersService(usersRepository) {
        this.usersRepository = usersRepository;
    }
    UsersService.prototype.create = function (createUserDto) {
        return __awaiter(this, void 0, Promise, function () {
            var existingUser, hashedPassword, user, savedUser, _, userWithoutPassword;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.usersRepository.findOne({ where: { email: createUserDto.email } })];
                    case 1:
                        existingUser = _a.sent();
                        if (existingUser) {
                            throw new common_1.ConflictException('User with this email already exists');
                        }
                        return [4 /*yield*/, bcrypt.hash(createUserDto.password, 10)];
                    case 2:
                        hashedPassword = _a.sent();
                        user = this.usersRepository.create(__assign(__assign({}, createUserDto), { password: hashedPassword }));
                        return [4 /*yield*/, this.usersRepository.save(user)];
                    case 3:
                        savedUser = _a.sent();
                        // Remove password from response
                        delete savedUser.password;
                        _ = savedUser.password, userWithoutPassword = __rest(savedUser, ["password"]);
                        return [2 /*return*/, userWithoutPassword];
                }
            });
        });
    };
    UsersService.prototype.findAll = function () {
        return __awaiter(this, void 0, Promise, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.usersRepository.find()];
                    case 1:
                        users = _a.sent();
                        // Remove password from each user
                        return [2 /*return*/, users.map(function (user) {
                                delete user.password;
                                return user;
                            })];
                }
            });
        });
    };
    UsersService.prototype.findById = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.usersRepository.findOne({ where: { id: id } })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new common_1.NotFoundException("User with ID " + id + " not found");
                        }
                        // Remove password from response
                        delete user.password;
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UsersService.prototype.findByEmail = function (email) {
        return __awaiter(this, void 0, Promise, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.usersRepository.findOne({ where: { email: email } })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new common_1.NotFoundException("User with email " + email + " not found");
                        }
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UsersService.prototype.update = function (id, updateUserDto) {
        return __awaiter(this, void 0, Promise, function () {
            var user, existingUser, updatedUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.usersRepository.findOne({ where: { id: id } })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new common_1.NotFoundException("User with ID " + id + " not found");
                        }
                        if (!(updateUserDto.email && updateUserDto.email !== user.email)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.usersRepository.findOne({ where: { email: updateUserDto.email } })];
                    case 2:
                        existingUser = _a.sent();
                        if (existingUser) {
                            throw new common_1.ConflictException('User with this email already exists');
                        }
                        _a.label = 3;
                    case 3: 
                    // Update user
                    return [4 /*yield*/, this.usersRepository.update(id, updateUserDto)];
                    case 4:
                        // Update user
                        _a.sent();
                        return [4 /*yield*/, this.usersRepository.findOne({ where: { id: id } })];
                    case 5:
                        updatedUser = _a.sent();
                        if (!updatedUser) {
                            throw new common_1.NotFoundException("User with ID " + id + " not found");
                        }
                        if (updatedUser.password) {
                            if (updatedUser.password) {
                                delete updatedUser.password;
                            }
                        }
                        return [2 /*return*/, updatedUser];
                }
            });
        });
    };
    UsersService.prototype.remove = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.usersRepository["delete"](id)];
                    case 1:
                        result = _a.sent();
                        if (result.affected === 0) {
                            throw new common_1.NotFoundException("User with ID " + id + " not found");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UsersService.prototype.changePassword = function (id, currentPassword, newPassword) {
        return __awaiter(this, void 0, Promise, function () {
            var user, isPasswordValid, hashedPassword;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.usersRepository.findOne({ where: { id: id } })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new common_1.NotFoundException("User with ID " + id + " not found");
                        }
                        return [4 /*yield*/, bcrypt.compare(currentPassword, user.password)];
                    case 2:
                        isPasswordValid = _a.sent();
                        if (!isPasswordValid) {
                            throw new common_1.BadRequestException('Current password is incorrect');
                        }
                        return [4 /*yield*/, bcrypt.hash(newPassword, 10)];
                    case 3:
                        hashedPassword = _a.sent();
                        // Update password
                        return [4 /*yield*/, this.usersRepository.update(id, { password: hashedPassword })];
                    case 4:
                        // Update password
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // Add these methods to the existing UsersService class in src/users/users.service.ts
    /**
     * Get total count of users
     */
    UsersService.prototype.getTotalUserCount = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.usersRepository.count()];
            });
        });
    };
    /**
     * Get paginated users with optional filtering
     */
    UsersService.prototype.getPaginatedUsers = function (page, limit, filter) {
        if (page === void 0) { page = 1; }
        if (limit === void 0) { limit = 10; }
        if (filter === void 0) { filter = ''; }
        return __awaiter(this, void 0, void 0, function () {
            var skip, queryBuilder, _a, users, total, usersWithoutPasswords;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        skip = (page - 1) * limit;
                        queryBuilder = this.usersRepository.createQueryBuilder('user');
                        if (filter) {
                            queryBuilder.where('user.firstName LIKE :filter OR user.lastName LIKE :filter OR user.email LIKE :filter', { filter: "%" + filter + "%" });
                        }
                        return [4 /*yield*/, queryBuilder
                                .skip(skip)
                                .take(limit)
                                .orderBy('user.createdAt', 'DESC')
                                .getManyAndCount()];
                    case 1:
                        _a = _b.sent(), users = _a[0], total = _a[1];
                        usersWithoutPasswords = users.map(function (user) {
                            var password = user.password, userWithoutPassword = __rest(user, ["password"]);
                            return userWithoutPassword;
                        });
                        return [2 /*return*/, {
                                users: usersWithoutPasswords,
                                total: total,
                                page: page,
                                limit: limit,
                                totalPages: Math.ceil(total / limit)
                            }];
                }
            });
        });
    };
    UsersService = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_1.InjectRepository(user_entity_1.User))
    ], UsersService);
    return UsersService;
}());
exports.UsersService = UsersService;
