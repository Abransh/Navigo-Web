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
exports.UsersController = void 0;
// Backend/src/users/users.controller.ts
var common_1 = require("@nestjs/common");
var jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
var platform_express_1 = require("@nestjs/platform-express");
var multer_1 = require("multer");
var path_1 = require("path");
var uuid_1 = require("uuid");
var swagger_1 = require("@nestjs/swagger");
var UsersController = /** @class */ (function () {
    function UsersController(usersService) {
        this.usersService = usersService;
    }
    UsersController.prototype.getProfile = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.usersService.findById(req.user.userId)];
            });
        });
    };
    UsersController.prototype.updateProfile = function (req, updateUserDto) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.usersService.update(req.user.userId, updateUserDto)];
            });
        });
    };
    UsersController.prototype.uploadProfilePicture = function (req, file) {
        return __awaiter(this, void 0, void 0, function () {
            var fileUrl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!file) {
                            throw new common_1.BadRequestException('File is required');
                        }
                        fileUrl = (process.env.API_URL || 'http://localhost:3001') + "/uploads/profiles/" + file.filename;
                        return [4 /*yield*/, this.usersService.update(req.user.userId, { profilePicture: fileUrl })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, { url: fileUrl }];
                }
            });
        });
    };
    UsersController.prototype.changePassword = function (req, changePasswordDto) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.usersService.changePassword(req.user.userId, changePasswordDto.currentPassword, changePasswordDto.newPassword)];
            });
        });
    };
    __decorate([
        common_1.Get('profile'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        swagger_1.ApiBearerAuth(),
        swagger_1.ApiOperation({ summary: 'Get current user profile' }),
        swagger_1.ApiResponse({ status: 200, description: 'Profile retrieved successfully' }),
        swagger_1.ApiResponse({ status: 401, description: 'Unauthorized' }),
        __param(0, common_1.Req())
    ], UsersController.prototype, "getProfile");
    __decorate([
        common_1.Patch('profile'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        swagger_1.ApiBearerAuth(),
        swagger_1.ApiOperation({ summary: 'Update user profile' }),
        swagger_1.ApiResponse({ status: 200, description: 'Profile updated successfully' }),
        swagger_1.ApiResponse({ status: 400, description: 'Bad request' }),
        swagger_1.ApiResponse({ status: 401, description: 'Unauthorized' }),
        __param(0, common_1.Req()), __param(1, common_1.Body())
    ], UsersController.prototype, "updateProfile");
    __decorate([
        common_1.Post('profile/upload'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        common_1.UseInterceptors(platform_express_1.FileInterceptor('file', {
            storage: multer_1.diskStorage({
                destination: './uploads/profiles',
                filename: function (req, file, cb) {
                    // Generate unique filename
                    var fileExtName = path_1.extname(file.originalname);
                    var fileName = "" + uuid_1.v4() + fileExtName;
                    cb(null, fileName);
                }
            }),
            fileFilter: function (req, file, cb) {
                // Check if file is an image
                if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
                    return cb(new common_1.BadRequestException('Only image files are allowed!'), false);
                }
                cb(null, true);
            },
            limits: {
                fileSize: 5 * 1024 * 1024
            }
        })),
        swagger_1.ApiBearerAuth(),
        swagger_1.ApiOperation({ summary: 'Upload profile picture' }),
        swagger_1.ApiConsumes('multipart/form-data'),
        swagger_1.ApiBody({
            schema: {
                type: 'object',
                properties: {
                    file: {
                        type: 'string',
                        format: 'binary'
                    }
                }
            }
        }),
        swagger_1.ApiResponse({ status: 201, description: 'File uploaded successfully' }),
        swagger_1.ApiResponse({ status: 400, description: 'Bad request' }),
        swagger_1.ApiResponse({ status: 401, description: 'Unauthorized' }),
        __param(0, common_1.Req()), __param(1, common_1.UploadedFile())
    ], UsersController.prototype, "uploadProfilePicture");
    __decorate([
        common_1.Post('change-password'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        swagger_1.ApiBearerAuth(),
        swagger_1.ApiOperation({ summary: 'Change user password' }),
        swagger_1.ApiResponse({ status: 200, description: 'Password changed successfully' }),
        swagger_1.ApiResponse({ status: 400, description: 'Bad request' }),
        swagger_1.ApiResponse({ status: 401, description: 'Unauthorized' }),
        __param(0, common_1.Req()), __param(1, common_1.Body())
    ], UsersController.prototype, "changePassword");
    UsersController = __decorate([
        swagger_1.ApiTags('users'),
        common_1.Controller('users')
    ], UsersController);
    return UsersController;
}());
exports.UsersController = UsersController;
