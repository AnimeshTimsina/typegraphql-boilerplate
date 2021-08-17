"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.authService = exports.AuthService = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const typedi_1 = __importStar(require("typedi"));
const service_1 = require("../entity/User/service");
let AuthService = class AuthService extends service_1.UserService {
    constructor() {
        super(...arguments);
        this.NOT_AUTHENTICATED_ERROR_MESSAGE = 'Not authenticated';
        this.NOT_AUTHORIZED_ERROR_MESSAGE = 'Not authorized';
        this.getUserFromHeader = (ctx) => __awaiter(this, void 0, void 0, function* () {
            const authHeader = (ctx.req).get('Authorization');
            if (!authHeader)
                return null;
            try {
                const token = authHeader.replace('Bearer ', '');
                const payload = jsonwebtoken_1.verify(token, process.env.ACCESS_TOKEN_SECRET);
                const user = yield this.getOne(payload.userId);
                return user !== null && user !== void 0 ? user : null;
            }
            catch (_a) {
                return null;
            }
        });
        this.getUserFromRefreshToken = (refreshToken) => __awaiter(this, void 0, void 0, function* () {
            if (!refreshToken)
                return null;
            try {
                const payload = jsonwebtoken_1.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
                const user = yield this.getOne(payload.userId);
                return user !== null && user !== void 0 ? user : null;
            }
            catch (_b) {
                return null;
            }
        });
        this.getUserFromPasswordResetToken = (passwordResetToken) => __awaiter(this, void 0, void 0, function* () {
            if (!passwordResetToken)
                return null;
            try {
                const payload = jsonwebtoken_1.verify(passwordResetToken, process.env.PASSWORD_RESET_TOKEN_SECRET);
                const user = yield this.getOne(payload.userId);
                return user !== null && user !== void 0 ? user : null;
            }
            catch (_c) {
                return null;
            }
        });
        this.createAccessToken = (user) => {
            const payload = {
                userId: user.id
            };
            return jsonwebtoken_1.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: "15m"
            });
        };
        this.createRefreshToken = (user) => {
            const payload = {
                userId: user.id,
                tokenVersion: user.tokenVersion
            };
            return jsonwebtoken_1.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
                expiresIn: "7d"
            });
        };
        this.createPasswordResetToken = (user) => {
            const payload = {
                userId: user.id
            };
            return jsonwebtoken_1.sign(payload, process.env.PASSWORD_RESET_TOKEN_SECRET, {
                expiresIn: "1d"
            });
        };
        this.isAuthenticated = ({ context }, next) => {
            if (!context.user)
                throw new apollo_server_express_1.AuthenticationError(this.NOT_AUTHENTICATED_ERROR_MESSAGE);
            return next();
        };
        this.userIsAdmin = ({ context }, next) => {
            if (!context.user)
                throw new apollo_server_express_1.AuthenticationError(this.NOT_AUTHENTICATED_ERROR_MESSAGE);
            if (!this.isAdmin(context.user))
                throw new apollo_server_express_1.ForbiddenError(this.NOT_AUTHORIZED_ERROR_MESSAGE);
            return next();
        };
        this.revokeRefreshTokensForUser = (userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.getOne(userId);
                if (!user)
                    throw ('User with this id doesn\'t exist');
                this.incrementTokenNumber(user);
                return true;
            }
            catch (_d) {
                return false;
            }
        });
        this.refreshTokenIsRevoked = (refreshToken, user) => __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = jsonwebtoken_1.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
                return user.tokenVersion !== payload.tokenVersion;
            }
            catch (_e) {
                throw ('Invalid refresh token');
            }
        });
        this.setPassword = (user, newPassword) => __awaiter(this, void 0, void 0, function* () {
            try {
                user.password = yield bcrypt_1.hash(newPassword, 12);
                user.save();
                user.tokenVersion += 1;
                return true;
            }
            catch (_f) {
                return false;
            }
        });
        this.changePassword = (userId, { currentPassword, newPassword }) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.getOne(userId);
                if (!user)
                    throw ('User with this id doesn\'t exist');
                const match = yield bcrypt_1.compare(currentPassword, user.password);
                if (!match)
                    throw ('Incorrect current password');
                user.password = yield bcrypt_1.hash(newPassword, 12);
                user.save();
                user.tokenVersion += 1;
                return true;
            }
            catch (_g) {
                return false;
            }
        });
    }
};
AuthService = __decorate([
    typedi_1.Service()
], AuthService);
exports.AuthService = AuthService;
exports.authService = typedi_1.default.get(AuthService);
//# sourceMappingURL=services.js.map