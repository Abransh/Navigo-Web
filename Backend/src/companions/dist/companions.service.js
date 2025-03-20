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
exports.CompanionsService = void 0;
// src/companions/companions.service.ts
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var companion_entity_1 = require("./entities/companion.entity");
var CompanionsService = /** @class */ (function () {
    function CompanionsService(companionsRepository, usersService) {
        this.companionsRepository = companionsRepository;
        this.usersService = usersService;
    }
    CompanionsService.prototype.findAll = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.companionsRepository.find({
                        where: { isVerified: true, isAvailable: true },
                        relations: ['user']
                    })];
            });
        });
    };
    CompanionsService.prototype.findOne = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.companionsRepository.findOne({
                        where: { id: id },
                        relations: ['user']
                    })];
            });
        });
    };
    CompanionsService.prototype.findByUserId = function (userId) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.companionsRepository.findOne({
                        where: { user: { id: userId } },
                        relations: ['user']
                    })];
            });
        });
    };
    CompanionsService.prototype.search = function (searchDto) {
        return __awaiter(this, void 0, Promise, function () {
            var query;
            return __generator(this, function (_a) {
                query = this.companionsRepository.createQueryBuilder('companion')
                    .leftJoinAndSelect('companion.user', 'user')
                    .where('companion.isVerified = :isVerified', { isVerified: true })
                    .andWhere('companion.isAvailable = :isAvailable', { isAvailable: true });
                if (searchDto.languages && searchDto.languages.length > 0) {
                    query.andWhere('companion.languages && :languages', {
                        languages: searchDto.languages
                    });
                }
                if (searchDto.specialties && searchDto.specialties.length > 0) {
                    query.andWhere('companion.specialties && :specialties', {
                        specialties: searchDto.specialties
                    });
                }
                if (searchDto.minRating) {
                    query.andWhere('companion.averageRating >= :minRating', {
                        minRating: searchDto.minRating
                    });
                }
                if (searchDto.maxHourlyRate) {
                    query.andWhere('companion.hourlyRate <= :maxHourlyRate', {
                        maxHourlyRate: searchDto.maxHourlyRate
                    });
                }
                if (searchDto.location) {
                    query.andWhere('LOWER(user.location) LIKE LOWER(:location)', {
                        location: "%" + searchDto.location + "%"
                    });
                }
                return [2 /*return*/, query.getMany()];
            });
        });
    };
    CompanionsService.prototype.create = function (createCompanionDto) {
        return __awaiter(this, void 0, Promise, function () {
            var user, companion;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.usersService.findById(createCompanionDto.userId)];
                    case 1:
                        user = _a.sent();
                        companion = this.companionsRepository.create({
                            user: user,
                            bio: createCompanionDto.bio,
                            languages: createCompanionDto.languages,
                            specialties: createCompanionDto.specialties,
                            hourlyRate: createCompanionDto.hourlyRate,
                            isVerified: false,
                            isAvailable: true,
                            averageRating: 0,
                            totalReviews: 0
                        });
                        return [2 /*return*/, this.companionsRepository.save(companion)];
                }
            });
        });
    };
    CompanionsService.prototype.update = function (id, updateCompanionDto) {
        return __awaiter(this, void 0, Promise, function () {
            var companion;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findOne(id)];
                    case 1:
                        companion = _a.sent();
                        if (!companion) {
                            return [2 /*return*/, null];
                        }
                        if (updateCompanionDto.bio !== undefined) {
                            companion.bio = updateCompanionDto.bio;
                        }
                        if (updateCompanionDto.languages !== undefined) {
                            companion.languages = updateCompanionDto.languages;
                        }
                        if (updateCompanionDto.specialties !== undefined) {
                            companion.specialties = updateCompanionDto.specialties;
                        }
                        if (updateCompanionDto.hourlyRate !== undefined) {
                            companion.hourlyRate = updateCompanionDto.hourlyRate;
                        }
                        if (updateCompanionDto.isAvailable !== undefined) {
                            companion.isAvailable = updateCompanionDto.isAvailable;
                        }
                        if (updateCompanionDto.averageRating !== undefined) {
                            companion.averageRating = updateCompanionDto.averageRating;
                        }
                        if (updateCompanionDto.totalReviews !== undefined) {
                            companion.totalReviews = updateCompanionDto.totalReviews;
                        }
                        return [2 /*return*/, this.companionsRepository.save(companion)];
                }
            });
        });
    };
    // Add these methods to the existing CompanionsService class in src/companions/companions.service.ts
    /**
     * Get total count of companions
     */
    CompanionsService.prototype.getTotalCompanionCount = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.companionsRepository.count()];
            });
        });
    };
    /**
     * Get count of companions pending verification
     */
    CompanionsService.prototype.getPendingVerificationsCount = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.companionsRepository.count({
                        where: { isVerified: false }
                    })];
            });
        });
    };
    /**
     * Get count of pending companion applications
     */
    CompanionsService.prototype.getPendingApplicationsCount = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                // If there's a separate table for applications, use that repository
                // For this example, we're treating unverified companions as pending applications
                return [2 /*return*/, this.getPendingVerificationsCount()];
            });
        });
    };
    /**
     * Get paginated list of pending companion applications
     */
    CompanionsService.prototype.getPendingApplications = function (page, limit) {
        if (page === void 0) { page = 1; }
        if (limit === void 0) { limit = 10; }
        return __awaiter(this, void 0, void 0, function () {
            var skip, _a, applications, total;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        skip = (page - 1) * limit;
                        return [4 /*yield*/, this.companionsRepository.findAndCount({
                                where: { isVerified: false },
                                relations: ['user'],
                                skip: skip,
                                take: limit,
                                order: { createdAt: 'DESC' }
                            })];
                    case 1:
                        _a = _b.sent(), applications = _a[0], total = _a[1];
                        return [2 /*return*/, {
                                applications: applications,
                                total: total,
                                page: page,
                                limit: limit,
                                totalPages: Math.ceil(total / limit)
                            }];
                }
            });
        });
    };
    /**
     * Process a companion application (approve or reject)
     */
    CompanionsService.prototype.processApplication = function (applicationId, status) {
        return __awaiter(this, void 0, Promise, function () {
            var companion;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findOne(applicationId)];
                    case 1:
                        companion = _a.sent();
                        if (!companion) {
                            throw new Error('Companion application not found');
                        }
                        if (!(status === 'approved')) return [3 /*break*/, 3];
                        companion.isVerified = true;
                        return [4 /*yield*/, this.companionsRepository.save(companion)];
                    case 2:
                        _a.sent();
                        // Could also send a notification to the user here
                        return [2 /*return*/, { status: 'success', message: 'Application approved', companion: companion }];
                    case 3: 
                    // For rejected applications, you can either:
                    // 1. Delete the companion record
                    //await this.companionsRepository.remove(companion);
                    // 2. Or mark it as rejected (you'd need to add a 'status' field to the Companion entity)
                    // companion.status = 'rejected';
                    // await this.companionsRepository.save(companion);
                    // For this example, we'll just delete it
                    return [4 /*yield*/, this.companionsRepository.remove(companion)];
                    case 4:
                        // For rejected applications, you can either:
                        // 1. Delete the companion record
                        //await this.companionsRepository.remove(companion);
                        // 2. Or mark it as rejected (you'd need to add a 'status' field to the Companion entity)
                        // companion.status = 'rejected';
                        // await this.companionsRepository.save(companion);
                        // For this example, we'll just delete it
                        _a.sent();
                        return [2 /*return*/, { status: 'success', message: 'Application rejected' }];
                }
            });
        });
    };
    CompanionsService = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_1.InjectRepository(companion_entity_1.Companion))
    ], CompanionsService);
    return CompanionsService;
}());
exports.CompanionsService = CompanionsService;
