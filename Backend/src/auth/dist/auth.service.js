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
exports.AuthService = void 0;
var common_1 = require("@nestjs/common");
var bcrypt = require("bcrypt");
var uuid_1 = require("uuid");
var AuthService = /** @class */ (function () {
    function AuthService(usersService, jwtService, mailService, passwordResetRepository) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.mailService = mailService;
        this.passwordResetRepository = passwordResetRepository;
    }
    AuthService = __decorate([
        common_1.Injectable()
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
async;
validateUser(email, string, password, string);
Promise < any > {
    "const": user = await this.usersService.findByEmail(email),
    "if": function (user) { }
} && await bcrypt.compare(password, user.password);
{
    var password = user.password, result = __rest(user, ["password"]);
    return result;
}
return null;
async;
login(loginDto, LoginDto);
{
    var user_1 = await this.validateUser(loginDto.email, loginDto.password);
    if (!user_1) {
        throw new common_1.UnauthorizedException('Invalid credentials');
    }
    var payload_1 = { email: user_1.email, sub: user_1.id, role: user_1.role };
    return {
        access_token: this.jwtService.sign(payload_1),
        user: user_1
    };
}
async;
register(registerDto, RegisterDto);
{
    // Hash the password
    var hashedPassword_1 = await bcrypt.hash(registerDto.password, 10);
    // Create the user
    var newUser = await this.usersService.create(__assign(__assign({}, registerDto), { password: hashedPassword_1 }));
    async;
    requestPasswordReset(email, string);
    Promise < void  > {
        // Check if user exists
        "const": user = await this.usersService.findByEmail(email)["catch"](function () { return null; }),
        // Even if user doesn't exist, don't reveal that for security
        "if": function (, user) {
            return;
        }
        // Generate unique token
        ,
        // Generate unique token
        "const": token = uuid_1.v4(),
        // Hash token for storage
        "const": hashedToken = await bcrypt.hash(token, 10),
        // Set expiration to 1 hour from now
        "const": expires = new Date(),
        expires: expires,
        : .setHours(expires.getHours() + 1),
        // Save token
        await: await, "this": .passwordResetRepository.save({
            email: user.email,
            token: hashedToken,
            expires: expires
        }),
        // Send email with reset link
        "const": resetLink = (process.env.FRONTEND_URL || 'http://localhost:3000') + "/reset-password/" + token,
        await: await,
        "this": .mailService.sendPasswordResetEmail(user.email, user.firstName, resetLink)
    };
    async;
    verifyResetToken(token, string);
    Promise < boolean > {
        // Find all reset records for comparison
        "const": resetRecords = await this.passwordResetRepository.find({
            where: { expires: { $gt: new Date() } }
        }),
        // No need to continue if no records found
        "if": function (, resetRecords) { }
    } || resetRecords.length === 0;
    {
        throw new common_1.BadRequestException('Invalid or expired token');
    }
    // Check if token matches any of the hashed tokens
    for (var _i = 0, resetRecords_1 = resetRecords; _i < resetRecords_1.length; _i++) {
        var record = resetRecords_1[_i];
        var isMatch = await bcrypt.compare(token, record.token);
        if (isMatch) {
            return true;
        }
    }
    throw new common_1.BadRequestException('Invalid or expired token');
}
async;
resetPassword(token, string, newPassword, string);
Promise < void  > {
    // Find all reset records for comparison
    "const": resetRecords = await this.passwordResetRepository.find({
        where: { expires: { $gt: new Date() } }
    }),
    // No need to continue if no records found
    "if": function (, resetRecords) { }
} || resetRecords.length === 0;
{
    throw new common_1.BadRequestException('Invalid or expired token');
}
// Find matching record
var matchedRecord = null;
for (var _a = 0, resetRecords_2 = resetRecords; _a < resetRecords_2.length; _a++) {
    var record = resetRecords_2[_a];
    var isMatch = await bcrypt.compare(token, record.token);
    if (isMatch) {
        matchedRecord = record;
        break;
    }
}
if (!matchedRecord) {
    throw new common_1.BadRequestException('Invalid or expired token');
}
// Get user by email
var user = await this.usersService.findByEmail(matchedRecord.email);
// Hash new password
var hashedPassword = await bcrypt.hash(newPassword, 10);
// Update user password
await this.usersService.update(user.id, { password: hashedPassword });
// Delete all reset records for this user
await this.passwordResetRepository["delete"]({ email: user.email });
// Send confirmation email
await this.mailService.sendPasswordResetConfirmationEmail(user.email, user.firstName);
// Generate JWT token
var payload = { email: newUser.email, sub: newUser.id, role: newUser.role };
return {
    access_token: this.jwtService.sign(payload),
    user: newUser
};
async;
validateSocialLogin(socialUser, SocialUser);
{
    try {
        // Check if user exists by email
        var user_2 = await this.usersService.findByEmail(socialUser.email)["catch"](function () { return null; });
        // If user doesn't exist, create a new one
        if (!user_2) {
            user_2 = await this.usersService.create({
                email: socialUser.email,
                firstName: socialUser.firstName,
                lastName: socialUser.lastName,
                profilePicture: socialUser.picture,
                password: await bcrypt.hash(uuid_1.v4(), 10),
                role: UserRole.TOURIST
            });
            // Create social profile link
            await this.socialProfileRepository.save({
                provider: socialUser.provider,
                providerId: socialUser.email,
                accessToken: socialUser.accessToken,
                userId: user_2.id
            });
            // Send welcome email to new user
            await this.mailService.sendWelcomeEmail(user_2.email, user_2.firstName);
        }
        else {
            // Check if social profile exists
            var socialProfile = await this.socialProfileRepository.findOne({
                where: {
                    provider: socialUser.provider,
                    userId: user_2.id
                }
            })["catch"](function () { return null; });
            // If not, create it
            if (!socialProfile) {
                await this.socialProfileRepository.save({
                    provider: socialUser.provider,
                    providerId: socialUser.email,
                    accessToken: socialUser.accessToken,
                    userId: user_2.id
                });
            }
            else {
                // Update access token
                await this.socialProfileRepository.update({ id: socialProfile.id }, { accessToken: socialUser.accessToken });
            }
            // Update profile pic if not set
            if (!user_2.profilePicture && socialUser.picture) {
                await this.usersService.update(user_2.id, {
                    profilePicture: socialUser.picture
                });
            }
        }
        // Generate JWT token
        var payload_2 = {
            sub: user_2.id,
            email: user_2.email,
            role: user_2.role
        };
        return {
            access_token: this.jwtService.sign(payload_2),
            user: {
                id: user_2.id,
                email: user_2.email,
                firstName: user_2.firstName,
                lastName: user_2.lastName,
                role: user_2.role,
                profilePicture: user_2.profilePicture
            }
        };
    }
    catch (error) {
        console.error('Social login error:', error);
        throw new InternalServerErrorException('Social login failed');
    }
}
;
