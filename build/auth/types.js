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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetNewTokenResponse = exports.LoginResponse = void 0;
const type_graphql_1 = require("type-graphql");
const model_1 = require("../entity/User/model");
let LoginResponse = class LoginResponse {
};
__decorate([
    type_graphql_1.Field((_) => model_1.User),
    __metadata("design:type", model_1.User)
], LoginResponse.prototype, "user", void 0);
__decorate([
    type_graphql_1.Field((_) => String),
    __metadata("design:type", String)
], LoginResponse.prototype, "accessToken", void 0);
__decorate([
    type_graphql_1.Field((_) => String),
    __metadata("design:type", String)
], LoginResponse.prototype, "refreshToken", void 0);
LoginResponse = __decorate([
    type_graphql_1.ObjectType()
], LoginResponse);
exports.LoginResponse = LoginResponse;
let GetNewTokenResponse = class GetNewTokenResponse extends LoginResponse {
};
GetNewTokenResponse = __decorate([
    type_graphql_1.ObjectType()
], GetNewTokenResponse);
exports.GetNewTokenResponse = GetNewTokenResponse;
//# sourceMappingURL=types.js.map