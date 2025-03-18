"use strict";
exports.__esModule = true;
exports.Roles = exports.ROLES_KEY = void 0;
// src/auth/decorators/roles.decorator.ts
var common_1 = require("@nestjs/common");
exports.ROLES_KEY = 'roles';
exports.Roles = function () {
    var roles = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        roles[_i] = arguments[_i];
    }
    return common_1.SetMetadata(exports.ROLES_KEY, roles);
};
