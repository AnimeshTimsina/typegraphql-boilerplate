"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthResolver = void 0;
const type_graphql_1 = require("type-graphql");
const typedi_1 = require("typedi");
const input_1 = require("./input");
const types_1 = require("./types");
const bcrypt_1 = require("bcrypt");
const model_1 = require("../entity/User/model");
const services_1 = require("./services");
const graphql_types_1 = require("../shared/types/graphql-types");
const emailService_1 = require("../shared/services/emailService");
let AuthResolver = class AuthResolver {
    constructor(authService) {
        this.authService = authService;
    }
    login(loginInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.authService.getByEmail(loginInput.email);
            if (!user)
                throw ('User doesn\'t exist');
            const isValid = yield bcrypt_1.compare(loginInput.password, user.password);
            if (!isValid)
                throw ('Invalid credentials');
            return ({
                user: user,
                accessToken: this.authService.createAccessToken(user),
                refreshToken: this.authService.createRefreshToken(user)
            });
        });
    }
    getNewToken(getNewTokenInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.authService.getUserFromRefreshToken(getNewTokenInput.refreshToken);
            if (!user)
                throw ('Incorrect refresh token');
            if (yield this.authService.refreshTokenIsRevoked(getNewTokenInput.refreshToken, user))
                throw ('Incorrect refresh token');
            return ({
                user: user,
                accessToken: this.authService.createAccessToken(user),
                refreshToken: this.authService.createRefreshToken(user)
            });
        });
    }
    revokeRefreshTokensForUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return { ok: yield this.authService.revokeRefreshTokensForUser(userId) };
        });
    }
    changePassword(userId, changePasswordInput) {
        return __awaiter(this, void 0, void 0, function* () {
            return { ok: yield this.authService.changePassword(userId, Object.assign({}, changePasswordInput)) };
        });
    }
    sendPasswordResetMail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.authService.getByEmail(email);
            if (!user)
                throw ('User with this email doesn\'t exist');
            const token = this.authService.createPasswordResetToken(user);
            try {
                yield emailService_1.emailService.sendMail({
                    to: user.email,
                    subject: 'Password Reset',
                    text: `Click on this link to reset your password: https://localhost:5000/passwordreset/${token}`
                });
                return {
                    ok: true
                };
            }
            catch (_a) {
                return {
                    ok: false
                };
            }
        });
    }
    resetPassword(resetPasswordInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const { token, newPassword, confirmNewPassword } = resetPasswordInput;
            if (newPassword !== confirmNewPassword)
                throw ('Passwords don\'t match');
            const user = yield this.authService.getUserFromPasswordResetToken(token);
            if (!user)
                throw ('Invalid token');
            const success = yield this.authService.setPassword(user, confirmNewPassword);
            return {
                ok: success
            };
        });
    }
};
__decorate([
    type_graphql_1.Mutation((_) => types_1.LoginResponse),
    __param(0, type_graphql_1.Arg('LoginInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [input_1.LoginInput]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "login", null);
__decorate([
    type_graphql_1.Mutation((_) => types_1.GetNewTokenResponse),
    __param(0, type_graphql_1.Arg('getNewTokenInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [input_1.GetNewTokenInput]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "getNewToken", null);
__decorate([
    type_graphql_1.Mutation((_) => graphql_types_1.BoolResponse),
    __param(0, type_graphql_1.Arg('userId', () => type_graphql_1.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "revokeRefreshTokensForUser", null);
__decorate([
    type_graphql_1.Mutation((_) => graphql_types_1.BoolResponse),
    __param(0, type_graphql_1.Arg('userId', () => type_graphql_1.ID)),
    __param(1, type_graphql_1.Arg('ChangePassworInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, input_1.ChangePasswordInput]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "changePassword", null);
__decorate([
    type_graphql_1.Mutation((_) => graphql_types_1.BoolResponse),
    __param(0, type_graphql_1.Arg('email', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "sendPasswordResetMail", null);
__decorate([
    type_graphql_1.Mutation((_) => graphql_types_1.BoolResponse),
    __param(0, type_graphql_1.Arg('resetPasswordInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [input_1.ResetPasswordInput]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "resetPassword", null);
AuthResolver = __decorate([
    typedi_1.Service(),
    type_graphql_1.Resolver(_ => model_1.User),
    __metadata("design:paramtypes", [services_1.AuthService])
], AuthResolver);
exports.AuthResolver = AuthResolver;
//# sourceMappingURL=resolvers.js.map