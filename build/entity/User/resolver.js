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
exports.UserResolver = void 0;
const type_graphql_1 = require("type-graphql");
const typedi_1 = require("typedi");
const service_1 = require("./service");
const input_1 = require("./input");
const model_1 = require("./model");
const graphql_types_1 = require("../../shared/types/graphql-types");
const services_1 = require("../../auth/services");
let UserResolver = class UserResolver {
    constructor(userService) {
        this.userService = userService;
    }
    allUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userService.getAll();
        });
    }
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userService.getOne(id);
        });
    }
    registerUser(createUserInput) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userService.create(createUserInput);
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleted = yield this.userService.delete(id);
            if (!deleted.success)
                throw ('User with this id doesn\'t exist');
            return deleted;
        });
    }
    me({ user }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userService.getOne(user.id);
        });
    }
    updateUser(id, updateUserInput) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userService.update(id, updateUserInput);
        });
    }
};
__decorate([
    type_graphql_1.Query((_) => [model_1.User], { nullable: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "allUsers", null);
__decorate([
    type_graphql_1.Query((_) => model_1.User, { nullable: true }),
    type_graphql_1.UseMiddleware(services_1.authService.isAuthenticated),
    __param(0, type_graphql_1.Arg('id', () => type_graphql_1.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUser", null);
__decorate([
    type_graphql_1.Mutation((_) => model_1.User),
    __param(0, type_graphql_1.Arg('UserInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [input_1.CreateUserInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "registerUser", null);
__decorate([
    type_graphql_1.Mutation((_) => graphql_types_1.DeleteResponse),
    type_graphql_1.UseMiddleware(services_1.authService.userIsAdmin),
    __param(0, type_graphql_1.Arg('id', () => type_graphql_1.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "deleteUser", null);
__decorate([
    type_graphql_1.Query((_) => model_1.User),
    type_graphql_1.UseMiddleware(services_1.authService.isAuthenticated),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "me", null);
__decorate([
    type_graphql_1.Mutation((_) => model_1.User),
    __param(0, type_graphql_1.Arg('id', () => type_graphql_1.ID)),
    __param(1, type_graphql_1.Arg('UpdateUserInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, input_1.UpdateUserInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "updateUser", null);
UserResolver = __decorate([
    typedi_1.Service(),
    type_graphql_1.Resolver(_ => model_1.User),
    __metadata("design:paramtypes", [service_1.UserService])
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=resolver.js.map